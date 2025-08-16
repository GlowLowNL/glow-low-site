// Mock data service for development - replace with real API calls later

import { 
  Product, 
  ProductWithOffers, 
  PriceOffer, 
  PriceHistory, 
  Category, 
  Brand, 
  SearchFilters,
  PaginatedResponse 
} from '../types/product';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from './config';

// Mock data
const mockBrands: Brand[] = [
  { id: '1', name: 'The Ordinary', slug: 'the-ordinary', logoUrl: '/brands/ordinary.png' },
  { id: '2', name: 'CeraVe', slug: 'cerave', logoUrl: '/brands/cerave.png' },
  { id: '3', name: 'Lancôme', slug: 'lancome', logoUrl: '/brands/lancome.png' },
  { id: '4', name: 'Yves Saint Laurent', slug: 'ysl', logoUrl: '/brands/ysl.png' },
  { id: '5', name: 'NIVEA', slug: 'nivea', logoUrl: '/brands/nivea.png' },
  { id: '6', name: 'L\'Oréal Paris', slug: 'loreal', logoUrl: '/brands/loreal.png' },
  { id: '7', name: 'Maybelline', slug: 'maybelline', logoUrl: '/brands/maybelline.png' },
  { id: '8', name: 'Garnier', slug: 'garnier', logoUrl: '/brands/garnier.png' },
  { id: '9', name: 'Clinique', slug: 'clinique', logoUrl: '/brands/clinique.png' },
  { id: '10', name: 'Estée Lauder', slug: 'estee-lauder', logoUrl: '/brands/estee.png' },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Huidverzorging',
    slug: 'huidverzorging',
    description: 'Gezichts- en lichaamsverzorging',
    children: [],
  },
  {
    id: '2',
    name: 'Make-up',
    slug: 'make-up',
    description: 'Gezichts- en oogmake-up',
    children: [],
  },
  {
    id: '3',
    name: 'Parfum',
    slug: 'parfum',
    description: 'Dames-, heren- en unisex geuren',
    children: [],
  },
];

const mockProducts: ProductWithOffers[] = [];

// Lightweight conditional logger
const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[MOCKAPI]', ...args);
  }
};

// Reference dataset ingestion
const referenceDataState = { loaded: false };
let datasetsLoading: Promise<void> | null = null;

async function loadReferenceDatasetsPublic() {
  if (referenceDataState.loaded) return;
  if (datasetsLoading) return datasetsLoading;
  
  devLog('Starting CSV dataset loading...');
  
  datasetsLoading = (async () => {
    try {
      // Only load on server side
      if (typeof window === 'undefined') {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        // Use process.cwd() which works better in Vercel builds
        const publicDir = path.join(process.cwd(), 'public');
        const datasetsDir = path.join(publicDir, 'datasets');
        
        devLog(`Looking for datasets in: ${datasetsDir}`);
        
        // Check if datasets directory exists
        try {
          await fs.access(datasetsDir);
          devLog('Datasets directory exists');
        } catch (e) {
          devLog('Datasets directory not found, trying alternative paths...');
          // Try alternative path for Vercel
          const altPath = path.join(process.cwd(), 'datasets');
          try {
            await fs.access(altPath);
            devLog(`Found alternative path: ${altPath}`);
          } catch (e2) {
            devLog('No datasets directory found, using fallback data');
            referenceDataState.loaded = true;
            return;
          }
        }
        
        const files = ['douglas_sample.csv', 'multi_shop_parfum.csv'];
        
        for (const file of files) {
          try {
            const filePath = path.join(datasetsDir, file);
            devLog(`Attempting to read: ${filePath}`);
            
            const csvContent = await fs.readFile(filePath, 'utf-8');
            devLog(`Loaded ${file}, ${csvContent.length} chars`);
            
            const lines = csvContent.split(/\r?\n/).filter(l => l.trim());
            if (lines.length < 2) {
              devLog(`File ${file} has insufficient data (${lines.length} lines)`);
              continue;
            }
            
            const header = lines[0].split(',').map(h => h.trim().toLowerCase());
            devLog(`Headers: ${header.join(', ')}`);
            
            for (let i = 1; i < lines.length; i++) {
              const row = lines[i].split(',');
              if (row.length !== header.length) {
                devLog(`Skipping malformed row ${i} in ${file}`);
                continue;
              }
              
              const get = (key: string) => {
                const idx = header.indexOf(key);
                return idx >= 0 ? row[idx].replace(/^"|"$/g, '').trim() : '';
              };
              
              const name = get('name') || get('product_name');
              const brand = get('brand');
              const mainCategory = get('category') || 'Parfum';
              const subcategory = get('subcategory');
              // Use subcategory as the main category for better navigation
              const category = subcategory || mainCategory;
              const price = parseFloat(get('price')) || Math.random() * 50 + 10;
              const imageUrl = get('imageurl') || get('image_url') || '/fallback-product.png';
              const rating = parseFloat(get('rating')) || 0;
              const reviewCount = parseInt(get('reviewcount')) || 0;
              
              if (!name || !brand) {
                devLog(`Skipping row ${i} in ${file}: missing name or brand`);
                continue;
              }
              
              const productId = `${brand.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}-${i}`;
              
              const product: ProductWithOffers = {
                id: productId,
                name,
                brand,
                category,
                subcategory: subcategory !== category ? subcategory : undefined,
                description: `${name} by ${brand}`,
                imageUrl,
                averageRating: rating > 0 ? rating : undefined,
                reviewCount: reviewCount > 0 ? reviewCount : undefined,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                offers: [{
                  id: `${productId}-offer-1`,
                  productId,
                  retailerId: 'douglas',
                  retailerName: 'Douglas',
                  price,
                  currency: 'EUR',
                  isOnSale: false,
                  stockStatus: 'in_stock' as const,
                  productUrl: get('url') || '#',
                  lastUpdated: new Date().toISOString()
                }],
                lowestPrice: price,
                highestPrice: price,
                priceRange: `€${price.toFixed(2)}`
              };
              
              mockProducts.push(product);
            }
          } catch (e) {
            devLog(`Error loading ${file}:`, e);
            // Continue with other files even if one fails
          }
        }
        
        devLog(`Total products loaded: ${mockProducts.length}`);
        
        // If no products loaded, add some fallback data
        if (mockProducts.length === 0) {
          devLog('No products loaded from CSV, adding fallback products');
          // Add a few hardcoded products as fallback
          const fallbackProducts = [
            {
              id: 'fallback-product-1',
              name: 'Sample Product 1',
              brand: 'Sample Brand',
              category: 'Parfum',
              description: 'Fallback product for testing',
              imageUrl: '/fallback-product.png',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              offers: [{
                id: 'fallback-offer-1',
                productId: 'fallback-product-1',
                retailerId: 'sample',
                retailerName: 'Sample Store',
                price: 25.99,
                currency: 'EUR',
                isOnSale: false,
                stockStatus: 'in_stock' as const,
                productUrl: '#',
                lastUpdated: new Date().toISOString()
              }],
              lowestPrice: 25.99,
              highestPrice: 25.99,
              priceRange: '€25.99'
            }
          ];
          mockProducts.push(...fallbackProducts);
        }
      }
      
      referenceDataState.loaded = true;
    } catch (e) {
      devLog('Error loading datasets:', e);
      referenceDataState.loaded = true;
    }
  })();
  
  return datasetsLoading;
}

// API functions
export const getProducts = async (
  filters: SearchFilters = {},
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<PaginatedResponse<ProductWithOffers>> => {
  await loadReferenceDatasetsPublic();
  
  const size = Math.min(Math.max(pageSize, 1), MAX_PAGE_SIZE);
  let filteredProducts = [...mockProducts];
  
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      (p.description?.toLowerCase().includes(query) ?? false)
    );
  }
  
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  if (filters.brand?.length) {
    filteredProducts = filteredProducts.filter(p => filters.brand!.includes(p.brand));
  }
  
  if (filters.minPrice != null || filters.maxPrice != null) {
    filteredProducts = filteredProducts.filter(p => {
      const lp = p.lowestPrice ?? Infinity;
      if (filters.minPrice != null && lp < filters.minPrice) return false;
      if (filters.maxPrice != null && lp > filters.maxPrice) return false;
      return true;
    });
  }
  
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => (a.lowestPrice ?? Infinity) - (b.lowestPrice ?? Infinity));
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => (b.lowestPrice ?? -Infinity) - (a.lowestPrice ?? -Infinity));
        break;
      case 'rating_desc':
        filteredProducts.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }
  
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / size);
  const paginatedData = filteredProducts.slice((page - 1) * size, page * size);
  
  devLog(`getProducts: ${total} total, returning ${paginatedData.length} items`);
  
  return { data: paginatedData, page, pageSize: size, total, totalPages };
};

export const getProductById = async (id: string): Promise<ProductWithOffers | undefined> => {
  await loadReferenceDatasetsPublic();
  const product = mockProducts.find(p => p.id === id);
  devLog(`getProductById(${id}): ${product ? 'found' : 'not found'}`);
  return product;
};

export const getPriceHistory = async (productId: string, days = 30): Promise<PriceHistory> => {
  await loadReferenceDatasetsPublic();
  const product = mockProducts.find(p => p.id === productId);
  const basePrice = product?.lowestPrice || 40;
  
  // Generate simple price history
  const history: { date: string; price: number }[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const price = Math.max(1, basePrice * (1 + variation));
    history.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return { productId, history };
};

export const getCategories = async (): Promise<Category[]> => {
  await loadReferenceDatasetsPublic();
  
  // Get unique categories from loaded products
  const uniqueCategories = [...new Set(mockProducts.map(p => p.category))];
  
  const categories: Category[] = uniqueCategories.map((cat, idx) => ({
    id: `cat-${idx}`,
    name: cat,
    slug: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: undefined,
    children: []
  }));
  
  devLog(`getCategories: ${categories.length} categories found`);
  
  return categories.length ? categories : mockCategories;
};

export const getBrands = async (): Promise<Brand[]> => {
  await loadReferenceDatasetsPublic();
  return mockBrands;
};

export const getFeaturedProducts = async (limit = 8): Promise<ProductWithOffers[]> => {
  await loadReferenceDatasetsPublic();
  return mockProducts.slice(0, limit);
};

export const getProductsByCategory = async (categorySlug: string): Promise<ProductWithOffers[]> => {
  await loadReferenceDatasetsPublic();
  
  const categoryName = categorySlug.replace(/-/g, ' ');
  return mockProducts.filter(p => 
    p.category.toLowerCase().includes(categoryName.toLowerCase())
  );
};
