#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load our products data
const datasets = [
  'public/datasets/douglas_sample.csv',
  'public/datasets/iciparis_products_enhanced.csv',
  'public/datasets/multi_shop_parfum.csv'
];

console.log('🏢 Starting High-Quality ICI Paris XL Image Download...');

// Parse CSV files with proper handling of quoted values
function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];
  
  // Proper CSV parsing that handles quoted values with commas
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }
  
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

// Get all ICI Paris products
let allProducts = [];
datasets.forEach(dataset => {
  const products = parseCSV(dataset);
  allProducts = allProducts.concat(products);
});

// Filter for ICI Paris products with images
const iciProducts = allProducts.filter(product => 
  product.source === 'iciparisxl.nl' && 
  product.image_url && 
  product.image_url.includes('iciparisxl.nl')
);

console.log(`📊 Found ${iciProducts.length} ICI Paris products with images`);

// Create output directory
const outputDir = 'public/images/products';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let successful = 0;
let failed = 0;
let skipped = 0;

// Function to generate multiple quality URLs
function generateQualityUrls(originalUrl) {
  const urls = [originalUrl];
  
  // Try different size parameters
  const sizeVariations = [
    originalUrl.replace(/width=\d+/g, 'width=600').replace(/height=\d+/g, 'height=600'),
    originalUrl.replace(/w=\d+/g, 'w=600').replace(/h=\d+/g, 'h=600'),
    originalUrl.replace(/size=\d+/g, 'size=600'),
    originalUrl + (originalUrl.includes('?') ? '&' : '?') + 'w=600&h=600',
    originalUrl + (originalUrl.includes('?') ? '&' : '?') + 'width=600&height=600',
    originalUrl + (originalUrl.includes('?') ? '&' : '?') + 'size=600',
    originalUrl.replace(/\/small\//, '/medium/'),
    originalUrl.replace(/\/small\//, '/large/'),
    originalUrl.replace(/\/thumb\//, '/medium/'),
    originalUrl.replace(/\/thumb\//, '/large/'),
    originalUrl.replace(/\/s\//, '/m/'),
    originalUrl.replace(/\/s\//, '/l/'),
    originalUrl.replace(/_s\./, '_m.'),
    originalUrl.replace(/_s\./, '_l.'),
    originalUrl.replace(/_small\./, '_medium.'),
    originalUrl.replace(/_small\./, '_large.')
  ];
  
  // Remove duplicates and invalid URLs
  return [...new Set(urls.concat(sizeVariations))].filter(url => url && url.includes('http'));
}

async function downloadImage(product, index) {
  const productName = `${product.brand || 'Unknown'} - ${product.name || 'Product'}`.substring(0, 50);
  const safeFileName = `ICI_${product.internal_code || index}-${(product.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '')}${(product.name || '').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 30)}.jpg`;
  const outputPath = path.join(outputDir, safeFileName);
  
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${safeFileName} (already exists)`);
    skipped++;
    return;
  }
  
  console.log(`\n📥 [${index + 1}/${iciProducts.length}] ${productName}...`);
  
  const qualityUrls = generateQualityUrls(product.image_url);
  let bestImage = null;
  let bestSize = 0;
  
  // Try each URL and keep the largest successful download
  for (const url of qualityUrls) {
    try {
      const tempPath = `${outputPath}.tmp`;
      const command = `curl -s -L --max-time 10 \
        -H "Referer: https://www.iciparisxl.nl/" \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
        -H "Accept: image/webp,image/avif,image/*,*/*;q=0.8" \
        -H "Accept-Language: nl-NL,nl;q=0.9,en;q=0.8" \
        -H "Cache-Control: no-cache" \
        "${url}" -o "${tempPath}"`;
      
      execSync(command, { stdio: 'pipe' });
      
      if (fs.existsSync(tempPath)) {
        const stats = fs.statSync(tempPath);
        
        // Check if this is a better quality image
        if (stats.size > bestSize && stats.size > 1000) { // At least 1KB
          if (bestImage) {
            fs.unlinkSync(bestImage); // Remove previous temp file
          }
          bestImage = tempPath;
          bestSize = stats.size;
          console.log(`📈 Better quality found: ${(stats.size / 1024).toFixed(1)}KB from ${url.substring(0, 80)}...`);
        } else {
          fs.unlinkSync(tempPath); // Remove smaller/bad image
        }
      }
    } catch (error) {
      // Continue with next URL
    }
  }
  
  // Save the best image we found
  if (bestImage && bestSize > 1000) {
    fs.renameSync(bestImage, outputPath);
    console.log(`✅ Downloaded: ${safeFileName} (${(bestSize / 1024).toFixed(1)}KB)`);
    successful++;
  } else {
    console.log(`❌ Failed to download quality image for ${productName}`);
    failed++;
    if (bestImage) fs.unlinkSync(bestImage);
  }
  
  console.log(`📊 Progress: ${successful}/${successful + failed + skipped} successful, ${failed} failed, ${skipped} skipped`);
}

async function main() {
  console.log(`📸 Processing ${iciProducts.length} ICI Paris images`);
  console.log(`⏱️  Estimated time: ${Math.ceil(iciProducts.length * 2 / 60)} minutes\n`);
  
  for (let i = 0; i < iciProducts.length; i++) {
    await downloadImage(iciProducts[i], i);
    
    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show progress every 25 items
    if ((i + 1) % 25 === 0) {
      console.log(`\n🎯 Milestone: ${i + 1}/${iciProducts.length} processed`);
      console.log(`📊 Success rate: ${((successful / (successful + failed)) * 100).toFixed(1)}%`);
    }
  }
  
  console.log('\n🎉 High-Quality Download Complete!');
  console.log(`📊 Final Results:`);
  console.log(`   ✅ ${successful} successful downloads`);
  console.log(`   ❌ ${failed} failed downloads`);
  console.log(`   ⏭️  ${skipped} already existed`);
  console.log(`   📈 Success rate: ${((successful / (successful + failed)) * 100).toFixed(1)}%`);
  console.log(`   💾 Total images: ${successful + skipped}`);
}

main().catch(console.error);
