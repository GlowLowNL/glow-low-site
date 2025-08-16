#!/usr/bin/env node

/**
 * Image Download Script for GlowLow
 * Downloads product images from CSV data to host locally
 * Usage: node scripts/download-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const csv = require('csv-parser');

const DATASETS_DIR = path.join(__dirname, '../public/datasets');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const MAX_CONCURRENT = 5; // Limit concurrent downloads
const DELAY_MS = 1000; // Delay between downloads to be respectful

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const filePath = path.join(IMAGES_DIR, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      resolve(filePath);
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve(filePath);
        });
      } else {
        file.destroy();
        fs.unlink(filePath, () => {}); // Delete partial file
        console.log(`❌ Failed to download ${filename}: HTTP ${response.statusCode}`);
        resolve(null); // Don't reject, just return null
      }
    }).on('error', (err) => {
      file.destroy();
      fs.unlink(filePath, () => {}); // Delete partial file
      console.log(`❌ Error downloading ${filename}: ${err.message}`);
      resolve(null); // Don't reject, just return null
    });
  });
}

function getImageExtension(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;
  const ext = path.extname(pathname).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
}

function generateFilename(productName, brand, id, imageUrl) {
  const ext = getImageExtension(imageUrl);
  const safeName = `${brand}-${productName}`
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase()
    .substring(0, 50); // Limit length
  
  return `${id}-${safeName}${ext}`;
}

async function processCSV(csvPath) {
  const products = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.image_url || row.imageUrl) {
          products.push({
            id: row.internal_code || row.id || products.length + 1,
            name: row.name || 'Unknown Product',
            brand: row.brand || 'Unknown Brand',
            imageUrl: row.image_url || row.imageUrl,
            category: row.top_category || row.category || 'Unknown'
          });
        }
      })
      .on('end', () => {
        console.log(`📊 Found ${products.length} products with images in ${path.basename(csvPath)}`);
        resolve(products);
      })
      .on('error', reject);
  });
}

async function downloadWithQueue(products) {
  const queue = [...products];
  const results = [];
  let completed = 0;
  
  async function worker() {
    while (queue.length > 0) {
      const product = queue.shift();
      if (!product) break;
      
      try {
        const filename = generateFilename(product.name, product.brand, product.id, product.imageUrl);
        const result = await downloadImage(product.imageUrl, filename);
        
        results.push({
          ...product,
          localImage: result ? `/images/products/${filename}` : null,
          filename: filename
        });
        
        completed++;
        console.log(`📈 Progress: ${completed}/${products.length} (${Math.round(completed/products.length*100)}%)`);
        
        // Respectful delay
        if (queue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
      } catch (error) {
        console.error(`❌ Error processing ${product.name}: ${error.message}`);
      }
    }
  }
  
  // Start concurrent workers
  const workers = Array(MAX_CONCURRENT).fill().map(() => worker());
  await Promise.all(workers);
  
  return results;
}

async function main() {
  console.log('🚀 Starting GlowLow Image Download Process...\n');
  
  try {
    // Process all CSV files
    const csvFiles = fs.readdirSync(DATASETS_DIR)
      .filter(file => file.endsWith('.csv'))
      .map(file => path.join(DATASETS_DIR, file));
    
    console.log(`📁 Found ${csvFiles.length} CSV files to process\n`);
    
    let allProducts = [];
    
    for (const csvFile of csvFiles) {
      const products = await processCSV(csvFile);
      allProducts = allProducts.concat(products);
    }
    
    console.log(`\n📊 Total products to download: ${allProducts.length}`);
    console.log(`⏱️  Estimated time: ${Math.round(allProducts.length * DELAY_MS / 1000 / 60)} minutes\n`);
    
    // Download images
    const results = await downloadWithQueue(allProducts);
    
    // Generate mapping file
    const mapping = {};
    results.forEach(product => {
      if (product.localImage) {
        mapping[product.imageUrl] = product.localImage;
      }
    });
    
    const mappingPath = path.join(__dirname, '../public/images/image-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    
    const successful = results.filter(r => r.localImage).length;
    console.log(`\n✅ Download completed!`);
    console.log(`📊 Successfully downloaded: ${successful}/${allProducts.length} images`);
    console.log(`💾 Image mapping saved to: ${mappingPath}`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { downloadImage, processCSV, downloadWithQueue };
