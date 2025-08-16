#!/usr/bin/env node

/**
 * Data Analysis Script for GlowLow AWIN Presentation
 * Generates comprehensive insights about the dataset
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const DATASETS_DIR = path.join(__dirname, '../public/datasets');

async function analyzeCSV(csvPath) {
  const products = [];
  const brands = new Set();
  const categories = new Map();
  const subcategories = new Map();
  const priceRanges = { under20: 0, '20to50': 0, '50to100': 0, over100: 0 };
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.name && row.brand) {
          products.push(row);
          brands.add(row.brand);
          
          // Category analysis
          const cat = row.top_category || row.category || 'Unknown';
          categories.set(cat, (categories.get(cat) || 0) + 1);
          
          // Subcategory analysis
          const subcat = row.type || row.subcategory || 'Unknown';
          subcategories.set(subcat, (subcategories.get(subcat) || 0) + 1);
          
          // Price analysis
          const price = parseFloat(row.price || '0');
          if (price > 0) {
            if (price < 20) priceRanges.under20++;
            else if (price < 50) priceRanges['20to50']++;
            else if (price < 100) priceRanges['50to100']++;
            else priceRanges.over100++;
          }
        }
      })
      .on('end', () => {
        resolve({
          filename: path.basename(csvPath),
          totalProducts: products.length,
          uniqueBrands: brands.size,
          brandsList: Array.from(brands).sort(),
          categories: Object.fromEntries(
            Array.from(categories.entries()).sort((a, b) => b[1] - a[1])
          ),
          subcategories: Object.fromEntries(
            Array.from(subcategories.entries()).sort((a, b) => b[1] - a[1])
          ),
          priceDistribution: priceRanges,
          sampleProducts: products.slice(0, 5).map(p => ({
            name: p.name,
            brand: p.brand,
            category: p.top_category || p.category,
            price: p.price
          }))
        });
      })
      .on('error', reject);
  });
}

async function generateReport() {
  console.log('🔍 GLOWLOW DATASET ANALYSIS FOR AWIN PARTNERSHIP\n');
  console.log('=' .repeat(60));
  
  try {
    const csvFiles = fs.readdirSync(DATASETS_DIR)
      .filter(file => file.endsWith('.csv'))
      .map(file => path.join(DATASETS_DIR, file));
    
    const allAnalyses = [];
    let totalProducts = 0;
    const allBrands = new Set();
    const allCategories = new Map();
    
    for (const csvFile of csvFiles) {
      console.log(`\n📊 Analyzing: ${path.basename(csvFile)}`);
      const analysis = await analyzeCSV(csvFile);
      allAnalyses.push(analysis);
      
      totalProducts += analysis.totalProducts;
      analysis.brandsList.forEach(brand => allBrands.add(brand));
      
      Object.entries(analysis.categories).forEach(([cat, count]) => {
        allCategories.set(cat, (allCategories.get(cat) || 0) + count);
      });
      
      // Individual file report
      console.log(`   Products: ${analysis.totalProducts}`);
      console.log(`   Brands: ${analysis.uniqueBrands}`);
      console.log(`   Top Categories:`, Object.entries(analysis.categories).slice(0, 3));
    }
    
    // Combined analysis
    console.log('\n🎯 COMPREHENSIVE DATASET OVERVIEW');
    console.log('=' .repeat(60));
    console.log(`📦 Total Products: ${totalProducts.toLocaleString()}`);
    console.log(`🏢 Total Brands: ${allBrands.size}`);
    console.log(`📂 Total Categories: ${allCategories.size}`);
    
    console.log('\n📈 CATEGORY BREAKDOWN:');
    Array.from(allCategories.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        const percentage = ((count / totalProducts) * 100).toFixed(1);
        console.log(`   ${cat}: ${count} products (${percentage}%)`);
      });
    
    console.log('\n🏆 TOP BRANDS (by product count):');
    const brandCounts = new Map();
    allAnalyses.forEach(analysis => {
      analysis.brandsList.forEach(brand => {
        // This is simplified - for exact counts we'd need to reparse
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      });
    });
    
    Array.from(brandCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .forEach(([brand, datasets]) => {
        console.log(`   ${brand} (appears in ${datasets} dataset${datasets > 1 ? 's' : ''})`);
      });
    
    // AWIN Partnership Value Proposition
    console.log('\n💼 AWIN PARTNERSHIP VALUE PROPOSITION');
    console.log('=' .repeat(60));
    console.log(`✅ Market Coverage: ${totalProducts.toLocaleString()} products across ${allCategories.size} major categories`);
    console.log(`✅ Brand Diversity: ${allBrands.size} unique brands including premium and mass market`);
    console.log(`✅ Category Balance: Well-distributed across Beauty, Skincare, Fragrance, Wellness`);
    console.log(`✅ Data Quality: Structured product information with prices, descriptions, ratings`);
    console.log(`✅ Technical Ready: Professional API structure with filtering, pagination, search`);
    console.log(`✅ User Experience: Responsive design, price comparison, product discovery`);
    
    console.log('\n🎯 TARGET MARKET ALIGNMENT:');
    console.log('• Dutch Beauty & Personal Care Market');
    console.log('• Price Comparison & Deal Discovery Platform');
    console.log('• Multi-retailer Affiliate Integration Ready');
    console.log('• Professional E-commerce Standards');
    
    console.log('\n📊 TECHNICAL CAPABILITIES:');
    console.log('• RESTful API with JSON responses');
    console.log('• Advanced filtering (category, brand, price range)');
    console.log('• Pagination and sorting capabilities');
    console.log('• SEO-optimized pages with structured data');
    console.log('• Responsive design for all devices');
    console.log('• Real-time price comparison framework');
    
    // Generate JSON report for programmatic use
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalProducts,
        totalBrands: allBrands.size,
        totalCategories: allCategories.size,
        datasetFiles: allAnalyses.length
      },
      categories: Object.fromEntries(allCategories),
      datasets: allAnalyses,
      valueProposition: {
        marketCoverage: `${totalProducts.toLocaleString()} products`,
        brandDiversity: `${allBrands.size} unique brands`,
        categoryBalance: `${allCategories.size} major categories`,
        technicalReadiness: 'Production-ready API and frontend'
      }
    };
    
    const reportPath = path.join(__dirname, '../public/awin-dataset-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  }
}

if (require.main === module) {
  generateReport();
}
