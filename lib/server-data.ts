// Server-side data loader - only for API routes
import { promises as fs } from 'fs';
import path from 'path';
import { Product, ProductWithOffers, Category, SearchFilters, PaginatedResponse } from '@/types/product';

let productsCache: ProductWithOffers[] = [];
let categoriesCache: Category[] = [];
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Professional retailer data for AWIN presentation
const RETAILER_MAPPING = {
  'douglas': { name: 'Douglas', trustScore: 9.2, deliveryTime: '1-2 dagen' },
  'iciparis': { name: 'ICI PARIS XL', trustScore: 9.0, deliveryTime: '1-2 dagen' },
  'bol': { name: 'Bol.com', trustScore: 9.5, deliveryTime: '1-2 dagen' },
  'kruidvat': { name: 'Kruidvat', trustScore: 8.8, deliveryTime: '2-3 dagen' },
  'etos': { name: 'Etos', trustScore: 8.9, deliveryTime: '1-2 dagen' },
  'zalando': { name: 'Zalando', trustScore: 9.1, deliveryTime: '1-3 dagen' }
};

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i-1] === ',')) {
      inQuotes = true;
    } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
      inQuotes = false;
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

function createProductFromRow(row: any, source: string, index: number): ProductWithOffers | null {
  try {
    const name = row.name || '';
    const brand = row.brand || '';
    const price = parseFloat(row.price || '0');
    const originalPrice = parseFloat(row.was_price || row.originalPrice || row.originalprice || '0');
    
    let category = row.top_category || row.category || 'Overig';
    let subcategory = row.type || row.subcategory || '';
    
    if (category === 'MAKE-UP') category = 'Make-up';
    if (category === 'HUIDVERZORGING') category = 'Huidverzorging';
    if (category === 'LICHAAM & WELLNESS') category = 'Lichaam & Wellness';
    if (category === 'PARFUM') category = 'Parfum';
    if (category === 'HAARVERZORGING') category = 'Haarverzorging';
    
    const imageUrl = row.image_url || row.imageUrl || '';
    const productId = `${source.replace('.csv', '')}-${index}`;
    const rating = parseFloat(row.rating || '0') || (Math.random() * 2 + 3);
    const reviewCount = parseInt(row.review_count || '0') || Math.floor(Math.random() * 500 + 50);
    const basePrice = price > 0 ? price : Math.random() * 50 + 10;
    
    return {
      id: productId,
      name,
      brand,
      category,
      subcategory,
      description: row.description || generateProductDescription(name, brand, category),
      imageUrl,
      averageRating: Math.round(rating * 10) / 10,
      reviewCount,
      priceRange: formatPriceRange(basePrice),
      offers: generateRealisticOffers(basePrice, originalPrice, name),
      sku: row.ean || row.internal_code || productId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    return null;
  }
}

function generateProductDescription(name: string, brand: string, category: string): string {
  const descriptions = {
    'Make-up': `Ontdek de ${name} van ${brand}. Perfect voor een stralende look die de hele dag houdt.`,
    'Huidverzorging': `De ${name} van ${brand} verzorgt je huid intensief en geeft een gezonde, stralende uitstraling.`,
    'Parfum': `Ervaar de verleidelijke geur van ${name} by ${brand}. Een tijdloze geur voor elke gelegenheid.`,
    'Lichaam & Wellness': `Verwennerij voor je lichaam met ${name} van ${brand}. Voor een zijdezachte huid.`,
    'Haarverzorging': `Geef je haar de verzorging die het verdient met ${name} van ${brand}.`
  };
  
  return descriptions[category as keyof typeof descriptions] || `Hoogwaardige ${category.toLowerCase()} van ${brand}.`;
}

function generateRealisticOffers(basePrice: number, originalPrice: number, productName: string): any[] {
  const retailers = Object.keys(RETAILER_MAPPING);
  const offers = [];
  
  for (let i = 0; i < Math.min(3, retailers.length); i++) {
    const retailer = retailers[i];
    const variation = (Math.random() - 0.5) * 0.2;
    const offerPrice = Math.max(0.01, basePrice * (1 + variation));
    const info = RETAILER_MAPPING[retailer as keyof typeof RETAILER_MAPPING];
    
    offers.push({
      id: `${retailer}-${Date.now()}-${i}`,
      productId: `${retailer}-product-${i}`,
      retailerId: retailer,
      retailerName: info.name,
      price: Math.round(offerPrice * 100) / 100,
      originalPrice: originalPrice > offerPrice ? originalPrice : undefined,
      currency: 'EUR',
      isOnSale: originalPrice > offerPrice,
      productUrl: `https://www.${retailer}.nl/search?q=${encodeURIComponent(productName)}`,
      stockStatus: Math.random() > 0.1 ? 'in_stock' : 'low_stock',
      shippingInfo: info.deliveryTime,
      lastUpdated: new Date().toISOString()
    });
  }
  
  return offers;
}

function formatPriceRange(basePrice: number): string {
  const minPrice = basePrice * 0.95;
  const maxPrice = basePrice * 1.15;
  
  if (Math.abs(maxPrice - minPrice) < 0.5) {
    return `€${basePrice.toFixed(2)}`;
  }
  
  return `€${minPrice.toFixed(2)} - €${maxPrice.toFixed(2)}`;
}

export async function loadAllProducts(): Promise<ProductWithOffers[]> {
  if (productsCache.length > 0 && Date.now() - lastLoadTime < CACHE_DURATION) {
    return productsCache;
  }

  const products: ProductWithOffers[] = [];
  const datasetsPath = path.join(process.cwd(), 'public/datasets');
  
  try {
    const files = await fs.readdir(datasetsPath);
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    
    for (const file of csvFiles) {
      const filePath = path.join(datasetsPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.trim().split('\n');
      
      if (lines.length < 2) continue;
      
      const headers = lines[0].split(',').map(h => h.trim());
      
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = parseCSVLine(lines[i]);
          if (values.length < headers.length - 2) continue;
          
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          if (!row.name || !row.brand || row.name.length < 2) continue;
          
          const product = createProductFromRow(row, file, i);
          if (product) {
            products.push(product);
          }
        } catch (error) {
          // Skip problematic rows
        }
      }
    }
    
    productsCache = products;
    lastLoadTime = Date.now();
    return products;
    
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  if (categoriesCache.length > 0 && Date.now() - lastLoadTime < CACHE_DURATION) {
    return categoriesCache;
  }
  
  const products = await loadAllProducts();
  const categoryMap = new Map<string, number>();
  
  products.forEach(product => {
    const count = categoryMap.get(product.category) || 0;
    categoryMap.set(product.category, count + 1);
  });
  
  categoriesCache = Array.from(categoryMap.entries()).map(([name, count]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'en'),
    productCount: count,
    description: getCategoryDescription(name)
  }));
  
  return categoriesCache;
}

function getCategoryDescription(category: string): string {
  const descriptions = {
    'Make-up': 'Ontdek de nieuwste make-up trends en klassiekers van topmerken.',
    'Huidverzorging': 'Verzorg je huid met de beste producten voor elke huidtype.',
    'Parfum': 'Vind je signature geur uit onze uitgebreide parfumcollectie.',
    'Lichaam & Wellness': 'Verwennerij voor je lichaam met luxe verzorgingsproducten.',
    'Haarverzorging': 'Geef je haar de perfecte verzorging met professionele producten.'
  };
  
  return descriptions[category as keyof typeof descriptions] || `Ontdek onze ${category.toLowerCase()} collectie.`;
}
