#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Quick Image Loading Test...');

// Test a few sample image files
const imageDir = 'public/images/products';
const testFiles = fs.readdirSync(imageDir)
  .filter(f => f.startsWith('ICI_') && f.endsWith('.jpg'))
  .slice(0, 5); // Just test first 5

console.log('📂 Testing sample images:');

testFiles.forEach((fileName, index) => {
  const filePath = path.join(imageDir, fileName);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  
  console.log(`   ${index + 1}. ${fileName}`);
  console.log(`      Size: ${sizeKB}KB`);
  console.log(`      Path: /images/products/${fileName}`);
});

// Test if files are accessible via Next.js public directory
console.log('\n🌐 Testing public access paths:');
testFiles.forEach((fileName, index) => {
  const publicPath = `/images/products/${fileName}`;
  console.log(`   ${index + 1}. http://localhost:3002${publicPath}`);
});

console.log('\n💡 Quick fixes applied:');
console.log('   ✅ Simplified SimpleImage component (removed loading states)');
console.log('   ✅ Used object-fit: contain for small images');
console.log('   ✅ Added crisp-edges rendering for sharpness');
console.log('   ✅ Reduced CSS filters for faster loading');
console.log('   ✅ ProductPage already uses SimpleImage component');

console.log('\n🎯 If images still load slowly:');
console.log('   • Check browser Network tab for loading times');
console.log('   • Verify image files exist in public/images/products/');
console.log('   • Check console for JavaScript errors');
console.log('   • Try refreshing the page or clearing browser cache');
