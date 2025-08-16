#!/usr/bin/env node

/**
 * Smart Image Downloader for GlowLow
 * Advanced image downloading with multiple fallback strategies
 * Usage: node scripts/smart-image-downloader.js
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
const PLACEHOLDER_DIR = path.join(__dirname, '../public/images/placeholders');
const MAX_CONCURRENT = 3; // Reduced for better success rate
const DELAY_MS = 2000; // Increased delay to be more respectful
const COOKIE_JAR = {}; // Simple cookie storage

// Ensure directories exist
[IMAGES_DIR, PLACEHOLDER_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multiple user agents to rotate
const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
];

let userAgentIndex = 0;

function getRandomUserAgent() {
  const agent = USER_AGENTS[userAgentIndex % USER_AGENTS.length];
  userAgentIndex++;
  return agent;
}

function getRefererForUrl(url) {
  if (url.includes('douglas.nl')) {
    return 'https://www.douglas.nl/';
  }
  if (url.includes('iciparisxl.nl')) {
    return 'https://www.iciparisxl.nl/';
  }
  if (url.includes('bol.com')) {
    return 'https://www.bol.com/';
  }
  if (url.includes('kruidvat.nl')) {
    return 'https://www.kruidvat.nl/';
  }
  
  // Generic referer for unknown domains
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}/`;
  } catch {
    return 'https://www.google.com/';
  }
}

async function downloadImageWithCurl(url, filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filename} (already exists)`);
    return filePath;
  }

  try {
    const userAgent = getRandomUserAgent();
    const command = `curl -s -L --max-time 30 --retry 2 -H "User-Agent: ${userAgent}" -H "Accept: image/*" -H "Referer: ${getRefererForUrl(url)}" -H "Accept-Language: nl-NL,nl;q=0.9,en;q=0.8" -H "Cache-Control: no-cache" -H "Sec-Fetch-Dest: image" -H "Sec-Fetch-Mode: no-cors" -H "Sec-Fetch-Site: same-origin" "${url}" -o "${filePath}"`;
    
    await execAsync(command);
    
    // Check if file was downloaded and has content
    const stats = fs.statSync(filePath);
    if (stats.size > 1000) { // At least 1KB
      console.log(`✅ Downloaded with curl: ${filename} (${Math.round(stats.size/1024)}KB)`);
      return filePath;
    } else {
      fs.unlinkSync(filePath);
      console.log(`❌ Downloaded file too small: ${filename}`);
      return null;
    }
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.log(`❌ Curl failed for ${filename}: ${error.message}`);
    return null;
  }
}

async function downloadImageWithNode(url, filename) {
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
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': getRefererForUrl(url),
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
        resolve(downloadImageWithNode(response.headers.location, filename));
        return;
      }
      
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          if (stats.size > 1000) {
            console.log(`✅ Downloaded with Node: ${filename} (${Math.round(stats.size/1024)}KB)`);
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

async function downloadImageWithPuppeteer(url, filename) {
  // Note: Requires 'npm install puppeteer' for this method
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set realistic browser headers
    await page.setUserAgent(getRandomUserAgent());
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
    });
    
    // Navigate to a product page first to get session cookies
    const referer = getRefererForUrl(url);
    await page.goto(referer, { waitUntil: 'networkidle0' });
    
    // Now download the image
    const response = await page.goto(url);
    if (response && response.ok()) {
      const buffer = await response.buffer();
      const filePath = path.join(IMAGES_DIR, filename);
      fs.writeFileSync(filePath, buffer);
      
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        console.log(`✅ Downloaded with Puppeteer: ${filename} (${Math.round(stats.size/1024)}KB)`);
        await browser.close();
        return filePath;
      }
    }
    
    await browser.close();
    return null;
  } catch (error) {
    console.log(`❌ Puppeteer failed for ${filename}: ${error.message}`);
    return null;
  }
}

function processImageUrl(url) {
  // Remove query parameters that might cause issues
  try {
    const urlObj = new URL(url);
    
    // Douglas images: Keep essential parameters only
    if (url.includes('douglas.nl')) {
      urlObj.searchParams.delete('context');
      urlObj.searchParams.delete('w');
      urlObj.searchParams.delete('h');
      urlObj.searchParams.set('grid', 'true'); // Keep this one
    }
    
    // ICI Paris: Clean up parameters
    if (url.includes('iciparisxl.nl')) {
      // Keep essential context parameters
      const context = urlObj.searchParams.get('context');
      if (context) {
        urlObj.search = `?context=${context}`;
      }
    }
    
    return urlObj.toString();
  } catch {
    return url; // Return original if URL parsing fails
  }
}

async function downloadImage(url, filename) {
  // Process URL first
  const processedUrl = processImageUrl(url);
  
  // Try curl first (often better with headers), then Node.js, then Puppeteer
  let result = await downloadImageWithCurl(processedUrl, filename);
  if (!result) {
    console.log(`🔄 Trying Node.js method for ${filename}`);
    result = await downloadImageWithNode(processedUrl, filename);
  }
  if (!result) {
    console.log(`🔄 Trying Puppeteer method for ${filename}`);
    result = await downloadImageWithPuppeteer(processedUrl, filename);
  }
  return result;
}

function generateCategoryPlaceholder(category) {
  const placeholders = {
    'MAKE-UP': '💄',
    'HUIDVERZORGING': '🧴',
    'LICHAAM & WELLNESS': '🌸',
    'PARFUM': '🌺',
    'HAARVERZORGING': '💇‍♀️',
    'Parfum': '🌺'
  };
  
  return placeholders[category] || '✨';
}

async function createPlaceholderImage(product, filename) {
  const placeholderPath = path.join(PLACEHOLDER_DIR, filename);
  const emoji = generateCategoryPlaceholder(product.category);
  
  // Create a simple SVG placeholder
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#f8f9fa"/>
  <rect x="20" y="20" width="360" height="360" fill="#e9ecef" rx="20"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" fill="#6c757d">${emoji}</text>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#6c757d">${product.brand}</text>
  <text x="200" y="250" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#6c757d">${product.name.substring(0, 30)}${product.name.length > 30 ? '...' : ''}</text>
  <text x="200" y="320" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#adb5bd">${product.category}</text>
</svg>`;

  fs.writeFileSync(placeholderPath, svg);
  console.log(`🎨 Created placeholder: ${filename}`);
  return `/images/placeholders/${filename}`;
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
  let successful = 0;
  
  async function worker() {
    while (queue.length > 0) {
      const product = queue.shift();
      if (!product) break;
      
      try {
        const filename = generateFilename(product.name, product.brand, product.id, product.imageUrl);
        const result = await downloadImage(product.imageUrl, filename);
        
        let localImage;
        if (result) {
          localImage = `/images/products/${filename}`;
          successful++;
        } else {
          // Create placeholder
          const placeholderFilename = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '.svg');
          localImage = await createPlaceholderImage(product, placeholderFilename);
        }
        
        results.push({
          ...product,
          localImage,
          filename,
          downloaded: !!result
        });
        
        completed++;
        console.log(`📈 Progress: ${completed}/${products.length} (${Math.round(completed/products.length*100)}%) | Success: ${successful}/${completed}`);
        
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
  console.log('🚀 Starting Smart GlowLow Image Download Process...\n');
  
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
    
    console.log(`\n📊 Total products to process: ${allProducts.length}`);
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
    
    const successful = results.filter(r => r.downloaded).length;
    const placeholders = results.filter(r => !r.downloaded).length;
    
    console.log(`\n✅ Process completed!`);
    console.log(`📊 Successfully downloaded: ${successful}/${allProducts.length} images`);
    console.log(`🎨 Created placeholders: ${placeholders}/${allProducts.length} images`);
    console.log(`💾 Image mapping saved to: ${mappingPath}`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Update your server-data.ts to use the image mapping`);
    console.log(`   2. Gradually retry failed downloads with different strategies`);
    console.log(`   3. Consider contacting retailers for official image feeds`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { downloadImage, processCSV, downloadWithQueue };
