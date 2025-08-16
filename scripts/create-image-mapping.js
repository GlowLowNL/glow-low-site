#!/usr/bin/env node

/**
 * Create Image Mapping with Fallbacks
 * Maps all product images to either downloaded images or intelligent fallbacks
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const DATASETS_DIR = path.join(__dirname, '../public/datasets');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const FALLBACK_IMAGE = '/images/fallback-product.svg';

// Category-based fallback images
const CATEGORY_FALLBACKS = {
  'MAKE-UP': '/images/fallback-makeup.svg',
  'HUIDVERZORGING': '/images/fallback-skincare.svg', 
  'LICHAAM & WELLNESS': '/images/fallback-wellness.svg',
  'PARFUM': '/images/fallback-perfume.svg',
  'HAARVERZORGING': '/images/fallback-haircare.svg',
  'Parfum': '/images/fallback-perfume.svg'
};

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
        resolve(products);
      })
      .on('error', reject);
  });
}

function generateFilename(productName, brand, id, imageUrl) {
  const ext = getImageExtension(imageUrl);
  const safeName = `${brand}-${productName}`
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50);
  
  return `${id}-${safeName}${ext}`;
}

function getImageExtension(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;
  const ext = path.extname(pathname).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
}

async function main() {
  console.log('🎨 Creating comprehensive image mapping with fallbacks...\n');
  
  try {
    // Get list of downloaded images
    const downloadedImages = new Set();
    if (fs.existsSync(IMAGES_DIR)) {
      const files = fs.readdirSync(IMAGES_DIR);
      files.forEach(file => downloadedImages.add(file));
    }
    
    console.log(`📁 Found ${downloadedImages.size} downloaded images`);
    
    // Process all CSV files
    const csvFiles = fs.readdirSync(DATASETS_DIR)
      .filter(file => file.endsWith('.csv'))
      .map(file => path.join(DATASETS_DIR, file));
    
    let allProducts = [];
    
    for (const csvFile of csvFiles) {
      const products = await processCSV(csvFile);
      allProducts = allProducts.concat(products);
    }
    
    console.log(`📊 Processing ${allProducts.length} products`);
    
    // Create mapping
    const mapping = {};
    let downloadedCount = 0;
    let fallbackCount = 0;
    
    allProducts.forEach(product => {
      const filename = generateFilename(product.name, product.brand, product.id, product.imageUrl);
      
      if (downloadedImages.has(filename)) {
        // Use downloaded image
        mapping[product.imageUrl] = `/images/products/${filename}`;
        downloadedCount++;
      } else {
        // Use category-specific fallback
        const fallback = CATEGORY_FALLBACKS[product.category] || FALLBACK_IMAGE;
        mapping[product.imageUrl] = fallback;
        fallbackCount++;
      }
    });
    
    // Save mapping
    const mappingPath = path.join(__dirname, '../public/images/image-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    
    console.log(`\n✅ Image mapping created!`);
    console.log(`📊 ${downloadedCount} products use real images`);
    console.log(`🎨 ${fallbackCount} products use category fallbacks`);
    console.log(`💾 Mapping saved to: ${mappingPath}`);
    
    // Create summary for better understanding
    const summary = {
      totalProducts: allProducts.length,
      downloadedImages: downloadedCount,
      fallbackImages: fallbackCount,
      successRate: `${Math.round(downloadedCount/allProducts.length*100)}%`,
      categories: {}
    };
    
    // Category breakdown
    allProducts.forEach(product => {
      const category = product.category;
      if (!summary.categories[category]) {
        summary.categories[category] = { total: 0, downloaded: 0 };
      }
      summary.categories[category].total++;
      
      const filename = generateFilename(product.name, product.brand, product.id, product.imageUrl);
      if (downloadedImages.has(filename)) {
        summary.categories[category].downloaded++;
      }
    });
    
    const summaryPath = path.join(__dirname, '../public/images/image-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`📋 Image summary saved to: ${summaryPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { processCSV, generateFilename };
