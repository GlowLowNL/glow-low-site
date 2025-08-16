#!/usr/bin/env node

/**
 * ICI Paris XL Image Downloader
 * Specifically targets ICI Paris images since they work with our methods
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const csv = require('csv-parser');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const DATASETS_DIR = path.join(__dirname, '../public/datasets');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const DELAY_MS = 1500; // Respectful delay

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
];

let userAgentIndex = 0;

function getRandomUserAgent() {
  const agent = USER_AGENTS[userAgentIndex % USER_AGENTS.length];
  userAgentIndex++;
  return agent;
}

async function downloadICIParisWithCurl(url, filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (already exists)`);
    return filePath;
  }

  try {
    const userAgent = getRandomUserAgent();
    const command = `curl -s -L --max-time 30 --retry 2 \\
      -H "User-Agent: ${userAgent}" \\
      -H "Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" \\
      -H "Accept-Language: nl-NL,nl;q=0.9,en;q=0.8" \\
      -H "Accept-Encoding: gzip, deflate, br" \\
      -H "Referer: https://www.iciparisxl.nl/" \\
      -H "Cache-Control: no-cache" \\
      -H "Sec-Fetch-Dest: image" \\
      -H "Sec-Fetch-Mode: no-cors" \\
      -H "Sec-Fetch-Site: same-origin" \\
      -H "Connection: keep-alive" \\
      "${url}" -o "${filePath}"`;
    
    await execAsync(command);
    
    // Check if file was downloaded and has content
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) { // At least 1KB
        console.log(`✅ Downloaded: ${filename} (${Math.round(stats.size/1024)}KB)`);
        return filePath;
      } else {
        fs.unlinkSync(filePath);
        console.log(`❌ File too small: ${filename}`);
        return null;
      }
    }
    return null;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.log(`❌ Download failed: ${filename} - ${error.message}`);
    return null;
  }
}

async function downloadICIParisWithNode(url, filename) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    const filePath = path.join(IMAGES_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      resolve(filePath);
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    const options = {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.iciparisxl.nl/',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 30000
    };
    
    const request = protocol.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`🔄 Redirecting ${filename}`);
        file.destroy();
        fs.unlink(filePath, () => {});
        resolve(downloadICIParisWithNode(response.headers.location, filename));
        return;
      }
      
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          if (stats.size > 1000) {
            console.log(`✅ Downloaded: ${filename} (${Math.round(stats.size/1024)}KB)`);
            resolve(filePath);
          } else {
            fs.unlinkSync(filePath);
            console.log(`❌ File too small: ${filename}`);
            resolve(null);
          }
        });
      } else {
        file.destroy();
        fs.unlink(filePath, () => {});
        console.log(`❌ HTTP ${response.statusCode} for ${filename}`);
        resolve(null);
      }
    });

    request.on('error', (err) => {
      file.destroy();
      fs.unlink(filePath, () => {});
      console.log(`❌ Network error for ${filename}: ${err.message}`);
      resolve(null);
    });

    request.on('timeout', () => {
      request.destroy();
      file.destroy();
      fs.unlink(filePath, () => {});
      console.log(`❌ Timeout for ${filename}`);
      resolve(null);
    });
  });
}

async function downloadICIParisImage(url, filename) {
  // Try curl first, then Node.js
  let result = await downloadICIParisWithCurl(url, filename);
  if (!result) {
    console.log(`🔄 Trying Node.js method for ${filename}`);
    result = await downloadICIParisWithNode(url, filename);
  }
  return result;
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
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50);
  
  return `ICI_${id}-${safeName}${ext}`;
}

async function processICIParisCSV() {
  const csvPath = path.join(DATASETS_DIR, 'iciparis_products_enhanced.csv');
  const products = [];
  
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(csvPath)) {
      reject(new Error('ICI Paris CSV file not found'));
      return;
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.image_url && row.image_url.includes('iciparisxl.nl')) {
          products.push({
            id: row.internal_code || row.id || products.length + 1,
            name: row.name || 'Unknown Product',
            brand: row.brand || 'Unknown Brand',
            imageUrl: row.image_url,
            category: row.top_category || row.category || 'Unknown'
          });
        }
      })
      .on('end', () => {
        console.log(`📊 Found ${products.length} ICI Paris products with images`);
        resolve(products);
      })
      .on('error', reject);
  });
}

async function downloadICIParisImages() {
  console.log('🏢 Starting ICI Paris XL Image Download...\n');
  
  try {
    const products = await processICIParisCSV();
    
    if (products.length === 0) {
      console.log('❌ No ICI Paris images found to download');
      return;
    }
    
    console.log(`📸 Processing ${products.length} ICI Paris images`);
    console.log(`⏱️  Estimated time: ${Math.round(products.length * DELAY_MS / 1000 / 60)} minutes\n`);
    
    const results = [];
    let successful = 0;
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const filename = generateFilename(product.name, product.brand, product.id, product.imageUrl);
      
      console.log(`📥 [${i + 1}/${products.length}] ${product.brand} - ${product.name.substring(0, 30)}...`);
      
      const result = await downloadICIParisImage(product.imageUrl, filename);
      
      if (result) {
        successful++;
        results.push({
          ...product,
          localImage: `/images/products/${filename}`,
          filename,
          downloaded: true
        });
      } else {
        results.push({
          ...product,
          localImage: null,
          filename,
          downloaded: false
        });
      }
      
      console.log(`📊 Progress: ${successful}/${i + 1} successful\n`);
      
      // Respectful delay
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }
    
    // Update image mapping
    const mappingPath = path.join(__dirname, '../public/images/image-mapping.json');
    let existingMapping = {};
    
    if (fs.existsSync(mappingPath)) {
      existingMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }
    
    // Add successful downloads to mapping
    results.forEach(product => {
      if (product.downloaded) {
        existingMapping[product.imageUrl] = product.localImage;
      }
    });
    
    fs.writeFileSync(mappingPath, JSON.stringify(existingMapping, null, 2));
    
    // Generate summary
    const summaryPath = path.join(__dirname, '../public/images/ici-paris-summary.json');
    const summary = {
      totalProducts: products.length,
      successfulDownloads: successful,
      failedDownloads: products.length - successful,
      successRate: `${Math.round(successful / products.length * 100)}%`,
      downloadedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`\n✅ ICI Paris Download Complete!`);
    console.log(`📊 Successfully downloaded: ${successful}/${products.length} images (${summary.successRate})`);
    console.log(`💾 Updated image mapping: ${mappingPath}`);
    console.log(`📋 Summary saved: ${summaryPath}`);
    
    if (successful > 0) {
      console.log(`\n🎉 Success! ICI Paris images are now available on your website.`);
      console.log(`   You should see real product images for ICI Paris products.`);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  downloadICIParisImages();
}

module.exports = { downloadICIParisImages };
