#!/usr/bin/env node

/**
 * Generate Category-Specific Fallback Images
 * Creates beautiful SVG placeholders for each category
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Category configurations
const CATEGORIES = {
  'fallback-makeup': {
    emoji: '💄',
    color: '#FF6B9D',
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',
    name: 'Make-up'
  },
  'fallback-skincare': {
    emoji: '🧴',
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    name: 'Huidverzorging'
  },
  'fallback-wellness': {
    emoji: '🌸',
    color: '#FFB6C1',
    gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)',
    name: 'Lichaam & Wellness'
  },
  'fallback-perfume': {
    emoji: '🌺',
    color: '#DDA0DD',
    gradient: 'linear-gradient(135deg, #DDA0DD 0%, #DA70D6 100%)',
    name: 'Parfum'
  },
  'fallback-haircare': {
    emoji: '💇‍♀️',
    color: '#87CEEB',
    gradient: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
    name: 'Haarverzorging'
  },
  'fallback-product': {
    emoji: '✨',
    color: '#F0F0F0',
    gradient: 'linear-gradient(135deg, #F0F0F0 0%, #D3D3D3 100%)',
    name: 'Product'
  }
};

function createSVGPlaceholder(config, filename) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.05"/>
    </linearGradient>
    <linearGradient id="main-${filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.6"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="url(#bg-${filename})"/>
  
  <!-- Main container -->
  <rect x="30" y="30" width="340" height="340" fill="url(#main-${filename})" rx="20" ry="20"/>
  
  <!-- Inner frame -->
  <rect x="50" y="50" width="300" height="300" fill="white" rx="15" ry="15" opacity="0.9"/>
  
  <!-- Emoji -->
  <text x="200" y="160" font-family="Arial, sans-serif" font-size="72" text-anchor="middle" fill="${config.color}">${config.emoji}</text>
  
  <!-- Category name -->
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="${config.color}">${config.name}</text>
  
  <!-- Subtitle -->
  <text x="200" y="260" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#666" opacity="0.7">GlowLow Beauty</text>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="320" r="3" fill="${config.color}" opacity="0.3"/>
  <circle cx="300" cy="320" r="3" fill="${config.color}" opacity="0.3"/>
  <circle cx="200" cy="310" r="2" fill="${config.color}" opacity="0.5"/>
</svg>`;

  return svg;
}

function main() {
  console.log('🎨 Creating beautiful category fallback images...\n');
  
  // Ensure images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  let created = 0;
  
  Object.entries(CATEGORIES).forEach(([filename, config]) => {
    const svg = createSVGPlaceholder(config, filename);
    const filePath = path.join(IMAGES_DIR, `${filename}.png`);
    
    // For SVG, we'll save as SVG for now (can convert to PNG later if needed)
    const svgPath = path.join(IMAGES_DIR, `${filename}.svg`);
    fs.writeFileSync(svgPath, svg);
    
    // Also create a simple PNG fallback reference
    fs.writeFileSync(filePath + '.svg', svg);
    
    console.log(`✅ Created: ${filename}.svg`);
    created++;
  });
  
  console.log(`\n🎉 Created ${created} fallback images!`);
  console.log(`📁 Images saved in: ${IMAGES_DIR}`);
  
  // Create a simple HTML preview
  const previewHtml = `<!DOCTYPE html>
<html>
<head>
    <title>GlowLow Fallback Images Preview</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .image-card { background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .image-card img { width: 150px; height: 150px; object-fit: cover; border-radius: 8px; }
        h1 { text-align: center; color: #333; }
    </style>
</head>
<body>
    <h1>🎨 GlowLow Category Fallback Images</h1>
    <div class="container">
        ${Object.entries(CATEGORIES).map(([filename, config]) => `
            <div class="image-card">
                <img src="/images/${filename}.svg" alt="${config.name}">
                <h3>${config.name}</h3>
                <p>${config.emoji}</p>
            </div>
        `).join('')}
    </div>
</body>
</html>`;
  
  const previewPath = path.join(IMAGES_DIR, 'preview.html');
  fs.writeFileSync(previewPath, previewHtml);
  console.log(`🌐 Preview created: ${previewPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { createSVGPlaceholder, CATEGORIES };
