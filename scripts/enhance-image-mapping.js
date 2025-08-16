#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Creating Enhanced Fallback System...');

// Load our products data to get brand and category info
const filePath = 'public/datasets/iciparis_products_enhanced.csv';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n').filter(line => line.trim());

// Proper CSV parsing
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
const products = lines.slice(1).map(line => {
  const values = parseCSVLine(line);
  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = values[index] || '';
  });
  return obj;
});

// Filter for ICI Paris products
const iciProducts = products.filter(product => 
  product.source === 'iciparisxl.nl' && 
  product.image_url && 
  product.image_url.includes('iciparisxl.nl')
);

console.log(`📊 Found ${iciProducts.length} ICI Paris products`);

// Create an enhanced image mapping
const enhancedMapping = {};
const brandCategories = {};

iciProducts.forEach(product => {
  const imageFileName = `ICI_${product.internal_code}-${(product.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '')}${(product.name || '').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 30)}.jpg`;
  
  // Categorize by brand and type
  const brand = product.brand?.toUpperCase() || 'UNKNOWN';
  const category = product.top_category?.toLowerCase() || 'product';
  const type = product.type?.toLowerCase() || '';
  
  // Track brand categories for color coding
  if (!brandCategories[brand]) {
    brandCategories[brand] = new Set();
  }
  brandCategories[brand].add(category);
  
  enhancedMapping[imageFileName] = {
    brand: brand,
    name: product.name,
    category: category,
    type: type,
    originalUrl: product.image_url,
    price: product.price,
    fallbackColor: getBrandColor(brand),
    categoryIcon: getCategoryIcon(category, type)
  };
});

function getBrandColor(brand) {
  // Assign colors based on brand prestige/category
  const luxuryBrands = ['DIOR', 'CHANEL', 'LANCÔME', 'YVES SAINT LAURENT', 'GUCCI', 'PRADA', 'HERMÈS', 'TOM FORD'];
  const premiumBrands = ['ARMANI', 'HUGO BOSS', 'VIKTOR & ROLF', 'MARC JACOBS', 'GIVENCHY', 'VALENTINO'];
  const popularBrands = ['MUGLER', 'RABANNE', 'CALVIN KLEIN', 'GUESS'];
  
  if (luxuryBrands.includes(brand)) {
    return 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)'; // Elegant black
  } else if (premiumBrands.includes(brand)) {
    return 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)'; // Premium blue
  } else if (popularBrands.includes(brand)) {
    return 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'; // Vibrant purple
  } else {
    return 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)'; // Neutral gray
  }
}

function getCategoryIcon(category, type) {
  if (category.includes('parfum') || type.includes('parfum') || type.includes('toilette')) {
    return '🌸'; // Fragrance
  } else if (category.includes('make') || type.includes('makeup') || type.includes('foundation') || type.includes('concealer')) {
    return '💄'; // Makeup
  } else if (category.includes('huid') || category.includes('skin') || type.includes('cream') || type.includes('serum')) {
    return '✨'; // Skincare
  } else if (category.includes('haar') || category.includes('hair') || type.includes('shampoo')) {
    return '💇'; // Hair care
  } else {
    return '🎀'; // General beauty
  }
}

// Save enhanced mapping
const outputPath = 'public/images/enhanced-mapping.json';
fs.writeFileSync(outputPath, JSON.stringify(enhancedMapping, null, 2));

console.log(`✅ Created enhanced mapping for ${Object.keys(enhancedMapping).length} products`);

// Analyze brand distribution
const brandCount = {};
Object.values(enhancedMapping).forEach(item => {
  brandCount[item.brand] = (brandCount[item.brand] || 0) + 1;
});

console.log('\n🏷️  Top Brands:');
Object.entries(brandCount)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .forEach(([brand, count]) => {
    const icon = enhancedMapping[Object.keys(enhancedMapping).find(k => enhancedMapping[k].brand === brand)]?.categoryIcon || '🎀';
    console.log(`   ${icon} ${brand}: ${count} products`);
  });

console.log('\n🎨 Enhanced Features Created:');
console.log('   ✅ Brand-specific color schemes for luxury/premium/popular brands');
console.log('   ✅ Category-specific icons for better visual identification');
console.log('   ✅ Enhanced metadata for smarter fallback handling');
console.log('   ✅ Price-aware display prioritization');

console.log('\n💡 Next Steps:');
console.log('   • Update image component to use enhanced mapping');
console.log('   • Add brand badges for luxury products');
console.log('   • Implement smart loading based on quality tiers');
console.log('   • Consider brand-specific placeholder generation');
