const fs = require('fs');
const path = require('path');

// Enhanced category mapping for better organization
const CATEGORY_MAPPING = {
  'PARFUM': {
    name: 'Parfum',
    subcategories: ['Eau de parfum', 'Eau de toilette', 'Parfum', 'Aftershave'],
    icon: 'fragrance'
  },
  'MAKE-UP': {
    name: 'Make-up',
    subcategories: ['Foundation', 'Mascara', 'Lipstick', 'Oogschaduw', 'Eyeliner', 'Concealer', 'Blush', 'Bronzer', 'Primer', 'Lipgloss'],
    icon: 'makeup'
  },
  'HUIDVERZORGING': {
    name: 'Huidverzorging',
    subcategories: ['Gezichtscrème', 'Dagcrème', 'Anti-aging serum', 'Oogcrème', 'Reinigingsgel', 'Nachtcrème', 'Serum'],
    icon: 'skincare'
  },
  'HAAR': {
    name: 'Haarverzorging',
    subcategories: ['Haarshampoo', 'Conditioner', 'Haarstyling', 'Haarmasker', 'Haartonic'],
    icon: 'haircare'
  },
  'LICHAAM & WELLNESS': {
    name: 'Lichaam & Wellness',
    subcategories: ['Bodylotion', 'Douchegel', 'Deodorant', 'Lichaamsspray', 'Body scrub', 'Handcrème'],
    icon: 'wellness'
  },
  'SUMMER': {
    name: 'Zomer',
    subcategories: ['Zonnebrandcrème', 'Zonnespray', 'Zelfbruiner', 'After sun'],
    icon: 'summer'
  },
  'HOME & LIFESTYLE': {
    name: 'Home & Lifestyle',
    subcategories: ['Kamergeur', 'Kaars', 'Tas', 'Accessoires'],
    icon: 'lifestyle'
  },
  'NIEUW & TRENDING': {
    name: 'Nieuw & Trending',
    subcategories: [],
    icon: 'trending'
  }
};

// Price history generator for realistic price variations
function generatePriceHistory(currentPrice, wasPrice) {
  const price = parseFloat(currentPrice.replace('€ ', '').replace(',', '.'));
  const originalPrice = wasPrice ? parseFloat(wasPrice.replace('€ ', '').replace(',', '.')) : price;
  const history = [];
  
  // Generate 6 months of price history
  for (let i = 180; i >= 0; i -= 30) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create realistic price fluctuations
    let historicPrice = originalPrice;
    if (i > 90) {
      // Earlier prices - slightly higher or at original
      historicPrice = originalPrice * (0.95 + Math.random() * 0.1);
    } else if (i > 30) {
      // Recent prices - gradual decline to current
      const factor = 0.9 + (i / 90) * 0.1;
      historicPrice = originalPrice * factor;
    } else {
      // Current month - around current price
      historicPrice = price * (0.98 + Math.random() * 0.04);
    }
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(historicPrice * 100) / 100,
      shop: i % 2 === 0 ? 'Douglas' : 'Bol.com'
    });
  }
  
  return history;
}

// Multi-shop offers generator
function generateMultiShopOffers(basePrice, productName, brand) {
  const price = parseFloat(basePrice.replace('€ ', '').replace(',', '.'));
  const shops = [
    { name: 'Douglas', url: 'https://douglas.nl', trustScore: 4.5 },
    { name: 'Bol.com', url: 'https://bol.com', trustScore: 4.3 },
    { name: 'Kruidvat', url: 'https://kruidvat.nl', trustScore: 4.2 },
    { name: 'Etos', url: 'https://etos.nl', trustScore: 4.1 },
    { name: 'ICI PARIS XL', url: 'https://iciparisxl.nl', trustScore: 4.4 }
  ];
  
  return shops.map(shop => ({
    shop: shop.name,
    price: Math.round((price * (0.95 + Math.random() * 0.1)) * 100) / 100,
    originalPrice: Math.round((price * (1.05 + Math.random() * 0.15)) * 100) / 100,
    url: `${shop.url}/search?q=${encodeURIComponent(brand + ' ' + productName)}`,
    trustScore: shop.trustScore,
    shippingCost: Math.random() > 0.6 ? 0 : Math.round((2.95 + Math.random() * 2) * 100) / 100,
    deliveryTime: Math.floor(1 + Math.random() * 3) + '-' + Math.floor(2 + Math.random() * 4) + ' dagen'
  }));
}

// CSV parsing function to handle quoted fields properly
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"' && !inQuotes) {
      inQuotes = true;
    } else if (char === '"' && inQuotes) {
      if (nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip the next quote
      } else {
        inQuotes = false;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    i++;
  }
  
  result.push(current.trim());
  return result;
}

// Enhanced product processing
function processDouglasData() {
  console.log('🏃 Processing Douglas products data...');
  
  const csvPath = path.join(__dirname, '../public/datasets/douglas_products_final_optimized.csv');
  const outputPath = path.join(__dirname, '../public/datasets/douglas_enhanced.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ Douglas CSV file not found!');
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = parseCSVLine(lines[0]);
  
  console.log(`📊 Found ${lines.length - 1} products in Douglas dataset`);
  console.log(`📝 Headers:`, headers.slice(0, 8).join(', '), '...');
  
  // Group products by main category
  const productsByCategory = {};
  const processedProducts = [];
  let validProducts = 0;
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = parseCSVLine(lines[i]);
      const product = {};
      
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });
      
      // Skip products with missing essential data
      if (!product.name || !product.brand || !product.price || !product.image_url) {
        continue;
      }
      
      validProducts++;
      const topCategory = product.top_category;
      
      if (!productsByCategory[topCategory]) {
        productsByCategory[topCategory] = [];
      }
      productsByCategory[topCategory].push(product);
      
    } catch (error) {
      console.log(`⚠️  Error parsing line ${i}: ${error.message}`);
      continue;
    }
  }
  
  console.log(`✅ Found ${validProducts} valid products`);
  console.log(`📂 Categories found:`, Object.keys(productsByCategory).filter(cat => cat && cat.length > 0));
  
  // Sample 50 products per main category
  Object.keys(productsByCategory).forEach(category => {
    if (!category || category.length === 0) return;
    
    const products = productsByCategory[category];
    console.log(`  ${category}: ${products.length} products`);
    
    // Randomly sample 50 products (or all if less than 50)
    const sampleSize = Math.min(50, products.length);
    const sampledProducts = products
      .sort(() => Math.random() - 0.5)
      .slice(0, sampleSize);
    
    sampledProducts.forEach(product => {
      // Enhanced product data
      const enhancedProduct = {
        id: `DGL_${product.internal_code}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: product.name,
        brand: product.brand,
        brandLine: product.brand_line || '',
        category: CATEGORY_MAPPING[category]?.name || category,
        subcategory: product.type,
        price: product.price,
        originalPrice: product.was_price || product.price,
        discountPercentage: product.discount_percentage || 0,
        size: product.size || '',
        availability: product.availability,
        description: product.description,
        imageUrl: product.image_url,
        rating: parseFloat(product.rating) || 0,
        reviewCount: parseInt(product.review_count) || 0,
        source: 'douglas.nl',
        scrapedAt: new Date().toISOString(),
        url: product.url,
        
        // Enhanced features
        priceHistory: generatePriceHistory(product.price, product.was_price),
        offers: generateMultiShopOffers(product.price, product.name, product.brand),
        tags: [
          category.toLowerCase(),
          product.type.toLowerCase(),
          product.brand.toLowerCase(),
          ...(product.brand_line ? [product.brand_line.toLowerCase()] : [])
        ].filter(Boolean),
        
        // Calculated fields
        priceRange: product.price,
        lowestPrice: Math.min(...generateMultiShopOffers(product.price, product.name, product.brand).map(o => o.price)),
        averageRating: parseFloat(product.rating) || 0,
        
        // SEO enhancements
        slug: `${product.brand}-${product.name}`.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        metaTitle: `${product.name} - ${product.brand} | GlowLow`,
        metaDescription: `${product.name} van ${product.brand}. ${product.price}. Vergelijk prijzen van meerdere webshops en vind de beste deal.`
      };
      
      processedProducts.push(enhancedProduct);
    });
  });
  
  console.log(`✅ Processed ${processedProducts.length} enhanced products`);
  
  // Save enhanced data as JSON
  const jsonOutputPath = path.join(__dirname, '../public/datasets/douglas_enhanced.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(processedProducts, null, 2));
  
  // Create CSV output with enhanced headers
  const enhancedHeaders = [
    'id', 'name', 'brand', 'brandLine', 'category', 'subcategory', 
    'price', 'originalPrice', 'discountPercentage', 'size', 'availability',
    'description', 'imageUrl', 'rating', 'reviewCount', 'source', 'url',
    'priceRange', 'lowestPrice', 'averageRating', 'slug', 'metaTitle', 'metaDescription'
  ];
  
  const csvLines = [enhancedHeaders.join(',')];
  processedProducts.forEach(product => {
    const row = enhancedHeaders.map(header => {
      const value = product[header] || '';
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvLines.push(row.join(','));
  });
  
  fs.writeFileSync(outputPath, csvLines.join('\n'));
  
  // Generate category statistics
  const categoryStats = {};
  processedProducts.forEach(product => {
    const cat = product.category;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { count: 0, brands: new Set(), avgPrice: 0, totalPrice: 0 };
    }
    categoryStats[cat].count++;
    categoryStats[cat].brands.add(product.brand);
    
    // Parse price correctly
    let price = 0;
    if (product.price && typeof product.price === 'string') {
      const priceMatch = product.price.match(/[\d,]+/);
      if (priceMatch) {
        price = parseFloat(priceMatch[0].replace(',', '.'));
      }
    }
    categoryStats[cat].totalPrice += price;
  });
  
  Object.keys(categoryStats).forEach(cat => {
    const totalPrice = categoryStats[cat].totalPrice;
    const count = categoryStats[cat].count;
    if (count > 0 && totalPrice > 0) {
      categoryStats[cat].avgPrice = Math.round((totalPrice / count) * 100) / 100;
    } else {
      categoryStats[cat].avgPrice = 0;
    }
    categoryStats[cat].brands = categoryStats[cat].brands.size;
    delete categoryStats[cat].totalPrice;
  });
  
  const statsPath = path.join(__dirname, '../public/datasets/douglas_stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(categoryStats, null, 2));
  
  console.log('\n📈 Category Statistics:');
  Object.entries(categoryStats).forEach(([cat, stats]) => {
    console.log(`  ${cat}: ${stats.count} products, ${stats.brands} brands, avg €${stats.avgPrice}`);
  });
  
  console.log(`\n💾 Files created:`);
  console.log(`  📄 ${outputPath}`);
  console.log(`  📄 ${jsonOutputPath}`);
  console.log(`  📄 ${statsPath}`);
  
  return {
    products: processedProducts,
    stats: categoryStats,
    totalProducts: processedProducts.length
  };
}

// Run the processing
if (require.main === module) {
  processDouglasData();
}

module.exports = { processDouglasData, CATEGORY_MAPPING };
