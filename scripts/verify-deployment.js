#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks that all image fallbacks and mappings are correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying GlowLow deployment readiness...\n');

// Check 1: SVG Fallback Files
console.log('📂 Checking SVG fallback files...');
const requiredSVGs = [
  'fallback-makeup.svg',
  'fallback-skincare.svg', 
  'fallback-wellness.svg',
  'fallback-perfume.svg',
  'fallback-haircare.svg',
  'fallback-product.svg'
];

let svgCount = 0;
for (const svg of requiredSVGs) {
  const svgPath = path.join(__dirname, '../public/images', svg);
  if (fs.existsSync(svgPath)) {
    const stats = fs.statSync(svgPath);
    console.log(`✅ ${svg} (${Math.round(stats.size/1024)}KB)`);
    svgCount++;
  } else {
    console.log(`❌ ${svg} - MISSING!`);
  }
}

// Check 2: Image Mapping File
console.log('\n📋 Checking image mapping...');
const mappingPath = path.join(__dirname, '../public/images/image-mapping.json');
if (fs.existsSync(mappingPath)) {
  const mappingData = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  const mappingCount = Object.keys(mappingData).length;
  console.log(`✅ Image mapping exists with ${mappingCount} entries`);
  
  // Count different fallback types
  const fallbackCounts = {};
  Object.values(mappingData).forEach(url => {
    if (url.includes('fallback-')) {
      const type = url.match(/fallback-(\w+)\.svg/)?.[1] || 'unknown';
      fallbackCounts[type] = (fallbackCounts[type] || 0) + 1;
    }
  });
  
  console.log('📊 Fallback distribution:');
  Object.entries(fallbackCounts).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} products`);
  });
} else {
  console.log('❌ Image mapping file missing!');
}

// Check 3: Dataset Files
console.log('\n📊 Checking dataset files...');
const datasetsPath = path.join(__dirname, '../public/datasets');
const csvFiles = fs.readdirSync(datasetsPath).filter(file => file.endsWith('.csv'));
console.log(`✅ Found ${csvFiles.length} CSV files:`);
csvFiles.forEach(file => {
  const filePath = path.join(datasetsPath, file);
  const stats = fs.statSync(filePath);
  console.log(`   ${file} (${Math.round(stats.size/1024)}KB)`);
});

// Check 4: Real Product Images
console.log('\n🖼️  Checking real product images...');
const productsPath = path.join(__dirname, '../public/images/products');
if (fs.existsSync(productsPath)) {
  const realImages = fs.readdirSync(productsPath).filter(file => 
    file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')
  );
  console.log(`✅ Found ${realImages.length} real product images`);
  realImages.forEach(img => console.log(`   ${img}`));
} else {
  console.log('⚠️  No real product images found (using fallbacks only)');
}

// Summary
console.log('\n🎯 Deployment Readiness Summary:');
console.log(`✅ SVG Fallbacks: ${svgCount}/${requiredSVGs.length}`);
console.log(`✅ Image Mapping: ${fs.existsSync(mappingPath) ? 'Ready' : 'Missing'}`);
console.log(`✅ Datasets: ${csvFiles.length} files`);
console.log(`✅ Build Status: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}`);

if (svgCount === requiredSVGs.length && fs.existsSync(mappingPath) && csvFiles.length > 0) {
  console.log('\n🚀 DEPLOYMENT READY! All systems go for AWIN partnership.');
} else {
  console.log('\n⚠️  Some issues detected. Please review above.');
}
