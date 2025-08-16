const { loadAllProducts } = require('../lib/server-data.ts');

async function testDouglasIntegration() {
  console.log('🧪 Testing Douglas data integration...\n');
  
  try {
    const products = await loadAllProducts();
    console.log(`📦 Total products loaded: ${products.length}`);
    
    // Analyze categories
    const categories = {};
    const brands = new Set();
    const sources = new Set();
    
    products.forEach(product => {
      const cat = product.category;
      if (!categories[cat]) categories[cat] = 0;
      categories[cat]++;
      brands.add(product.brand);
      sources.add(product.sku?.split('-')[0] || 'unknown');
    });
    
    console.log('\n📊 Category breakdown:');
    Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count} products`);
      });
    
    console.log(`\n🏢 Unique brands: ${brands.size}`);
    console.log(`📄 Data sources: ${Array.from(sources).join(', ')}`);
    
    // Show sample products
    console.log('\n🎯 Sample Douglas products:');
    const douglasProducts = products.filter(p => p.sku?.startsWith('DGL_')).slice(0, 3);
    douglasProducts.forEach(product => {
      console.log(`  • ${product.brand} - ${product.name}`);
      console.log(`    Category: ${product.category} | Price: ${product.priceRange}`);
      console.log(`    Rating: ${product.averageRating} (${product.reviewCount} reviews)`);
      console.log(`    Image: ${product.imageUrl.substring(0, 50)}...`);
      console.log('');
    });
    
    // Test price ranges
    const priceRanges = products.map(p => {
      const priceMatch = p.priceRange.match(/[\d,]+/);
      return priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;
    }).filter(p => p > 0);
    
    if (priceRanges.length > 0) {
      const avgPrice = priceRanges.reduce((a, b) => a + b, 0) / priceRanges.length;
      const minPrice = Math.min(...priceRanges);
      const maxPrice = Math.max(...priceRanges);
      
      console.log(`💰 Price analysis:`);
      console.log(`  Average: €${avgPrice.toFixed(2)}`);
      console.log(`  Range: €${minPrice.toFixed(2)} - €${maxPrice.toFixed(2)}`);
    }
    
    console.log('\n✅ Douglas integration test completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  }
}

// Run the test
testDouglasIntegration();
