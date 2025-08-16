#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing Image Quality...');

const imageDir = 'public/images/products';
const files = fs.readdirSync(imageDir).filter(f => f.startsWith('ICI_') && f.endsWith('.jpg'));

console.log(`📊 Found ${files.length} ICI images to analyze`);

let sizeGroups = {
  'tiny': { count: 0, files: [], range: '< 2KB' },
  'small': { count: 0, files: [], range: '2-5KB' }, 
  'medium': { count: 0, files: [], range: '5-10KB' },
  'large': { count: 0, files: [], range: '10KB+' }
};

let totalSize = 0;

files.forEach(fileName => {
  const filePath = path.join(imageDir, fileName);
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;
  
  totalSize += stats.size;
  
  if (sizeKB < 2) {
    sizeGroups.tiny.count++;
    sizeGroups.tiny.files.push({ name: fileName, size: sizeKB });
  } else if (sizeKB < 5) {
    sizeGroups.small.count++;
    sizeGroups.small.files.push({ name: fileName, size: sizeKB });
  } else if (sizeKB < 10) {
    sizeGroups.medium.count++;
    sizeGroups.medium.files.push({ name: fileName, size: sizeKB });
  } else {
    sizeGroups.large.count++;
    sizeGroups.large.files.push({ name: fileName, size: sizeKB });
  }
});

console.log('\n📊 Image Size Analysis:');
console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
console.log(`📏 Average size: ${(totalSize / files.length / 1024).toFixed(1)}KB`);

console.log('\n📈 Size Distribution:');
Object.entries(sizeGroups).forEach(([category, data]) => {
  const percentage = ((data.count / files.length) * 100).toFixed(1);
  console.log(`   ${category.toUpperCase()}: ${data.count} files (${percentage}%) - ${data.range}`);
  
  if (data.files.length > 0 && data.files.length <= 3) {
    data.files.forEach(file => {
      console.log(`      • ${file.name} (${file.size.toFixed(1)}KB)`);
    });
  } else if (data.files.length > 3) {
    console.log(`      • ${data.files[0].name} (${data.files[0].size.toFixed(1)}KB)`);
    console.log(`      • ${data.files[1].name} (${data.files[1].size.toFixed(1)}KB)`);
    console.log(`      • ... and ${data.files.length - 2} more`);
  }
});

console.log('\n🎯 Quality Assessment:');
const lowQuality = sizeGroups.tiny.count + sizeGroups.small.count;
const mediumQuality = sizeGroups.medium.count;
const highQuality = sizeGroups.large.count;

console.log(`   🔴 Low Quality (< 5KB): ${lowQuality} files (${((lowQuality/files.length)*100).toFixed(1)}%)`);
console.log(`   🟡 Medium Quality (5-10KB): ${mediumQuality} files (${((mediumQuality/files.length)*100).toFixed(1)}%)`);
console.log(`   🟢 Good Quality (10KB+): ${highQuality} files (${((highQuality/files.length)*100).toFixed(1)}%)`);

console.log('\n💡 Recommendations:');
if (lowQuality > files.length * 0.7) {
  console.log('   • Most images are low quality - enhanced CSS display will help');
  console.log('   • Consider using object-fit: contain instead of cover');
  console.log('   • Add padding and background gradients to improve appearance');
} else if (mediumQuality > files.length * 0.5) {
  console.log('   • Mix of quality levels - use adaptive display strategies');
} else {
  console.log('   • Good overall image quality');
}

console.log('\n✨ Enhanced Display Features Applied:');
console.log('   ✅ CSS image sharpening (crisp-edges)');
console.log('   ✅ Contrast and saturation enhancement filters');
console.log('   ✅ object-fit: contain for better small image display');
console.log('   ✅ Background gradients to improve visual appeal');
console.log('   ✅ Reduced scaling on hover to prevent blur');
console.log('   ✅ Loading states and error handling');
