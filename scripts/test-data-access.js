#!/usr/bin/env node

const fs = require('fs');

// Test data loading
console.log('🔍 Testing data access...');

// Load ICI Paris data
const filePath = 'public/datasets/iciparis_products_enhanced.csv';
if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n').filter(line => line.trim());

console.log(`📊 Total lines: ${lines.length}`);
console.log(`📋 Headers: ${lines[0]}`);

// Parse first few products
const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
console.log(`🏷️  Column count: ${headers.length}`);

// Check first 3 products
for (let i = 1; i <= Math.min(3, lines.length - 1); i++) {
  const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
  const product = {};
  headers.forEach((header, index) => {
    product[header] = values[index] || '';
  });
  
  console.log(`\n📦 Product ${i}:`);
  console.log(`   Brand: ${product.brand}`);
  console.log(`   Name: ${product.name}`);
  console.log(`   Source: ${product.source}`);
  console.log(`   Image URL: ${product.image_url ? product.image_url.substring(0, 80) + '...' : 'None'}`);
}

// Count products with images
let withImages = 0;
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
  const product = {};
  headers.forEach((header, index) => {
    product[header] = values[index] || '';
  });
  
  if (product.image_url && product.image_url.includes('iciparisxl.nl')) {
    withImages++;
  }
}

console.log(`\n📸 Products with ICI Paris images: ${withImages}`);
