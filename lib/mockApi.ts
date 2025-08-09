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
import type { Product as BaseProduct } from '../types/product';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, CSV_PATH, ENABLE_CSV, BRAND_NORMALIZATION, CATEGORY_NORMALIZATION, CANONICAL_BRANDS, CANONICAL_CATEGORIES } from './config';

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

const mockRetailers = [
  { id: 'douglas', name: 'Douglas', url: 'https://douglas.nl' },
  { id: 'sephora', name: 'Sephora', url: 'https://sephora.nl' },
  { id: 'etos', name: 'Etos', url: 'https://etos.nl' },
  { id: 'kruidvat', name: 'Kruidvat', url: 'https://kruidvat.nl' },
  { id: 'bijenkorf', name: 'De Bijenkorf', url: 'https://bijenkorf.nl' },
  { id: 'parfumerie', name: 'Parfumerie', url: 'https://parfumerie.nl' },
  { id: 'ah', name: 'Albert Heijn', url: 'https://ah.nl' },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Huidverzorging',
    slug: 'huidverzorging',
    description: 'Gezichts- en lichaamsverzorging',
    children: [
      { id: '1a', name: 'Reiniging', slug: 'reiniging', parentId: '1' },
      { id: '1b', name: 'Vochtinbrengende Crème', slug: 'moisturizer', parentId: '1' },
      { id: '1c', name: 'Serums', slug: 'serums', parentId: '1' },
      { id: '1d', name: 'Zonnebescherming', slug: 'sunscreen', parentId: '1' },
      { id: '1e', name: 'Anti-Aging', slug: 'anti-aging', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Make-up',
    slug: 'make-up',
    description: 'Gezichts- en oogmake-up',
    children: [
      { id: '2a', name: 'Foundation', slug: 'foundation', parentId: '2' },
      { id: '2b', name: 'Concealer', slug: 'concealer', parentId: '2' },
      { id: '2c', name: 'Lipstick', slug: 'lipstick', parentId: '2' },
      { id: '2d', name: 'Mascara', slug: 'mascara', parentId: '2' },
      { id: '2e', name: 'Oogschaduw', slug: 'eyeshadow', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Parfum',
    slug: 'parfum',
    description: 'Dames-, heren- en unisex geuren',
    children: [
      { id: '3a', name: 'Damesparfum', slug: 'damesparfum', parentId: '3' },
      { id: '3b', name: 'Herenparfum', slug: 'herenparfum', parentId: '3' },
      { id: '3c', name: 'Unisex', slug: 'unisex', parentId: '3' },
    ],
  },
];

const mockProducts: ProductWithOffers[] = [
  {
    id: '1',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Huidverzorging',
    subcategory: 'Serums',
    description: 'Serum ter verbetering van de zichtbaarheid van poriën en onregelmatigheden',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    volume: '30ml',
    sku: 'TO-NIA-30',
    averageRating: 4.3,
    reviewCount: 12847,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '1a',
        productId: '1',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 6.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:00:00Z',
      },
      {
        id: '1b',
        productId: '1',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 7.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://sephora.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:15:00Z',
      },
      {
        id: '1c',
        productId: '1',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 6.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:30:00Z',
      },
    ],
    lowestPrice: 6.90,
    highestPrice: 7.50,
    priceRange: '€6.90 - €7.50',
  },
  {
    id: '2',
    name: 'Foaming Facial Cleanser',
    brand: 'CeraVe',
    category: 'Huidverzorging',
    subcategory: 'Reiniging',
    description: 'Schuimende gezichtsreiniger voor de normale tot vette huid',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    volume: '236ml',
    sku: 'CV-FOAM-236',
    averageRating: 4.5,
    reviewCount: 3421,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '2a',
        productId: '2',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 11.99,
        originalPrice: 13.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-31T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/cerave-foaming-cleanser',
        lastUpdated: '2024-07-21T09:00:00Z',
      },
      {
        id: '2b',
        productId: '2',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 12.49,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/cerave-foaming-cleanser',
        lastUpdated: '2024-07-21T09:15:00Z',
      },
    ],
    lowestPrice: 11.99,
    highestPrice: 12.49,
    priceRange: '€11.99 - €12.49',
  },
  {
    id: 'csv-1090394',
    name: 'My Way Eau De Parfum (Navulbaar)',
    brand: 'ARMANI',
    category: 'Parfum',
    subcategory: 'Damesparfum',
    description: "Premium damesparfum met bloemige noten.",
    imageUrl: 'https://www.iciparisxl.nl/medias/prd-front-1090394-201x201.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjU3Mzh8aW1hZ2UvanBlZ3xhRFk0TDJobE1pOHhNVEEzT0RVeU1qWXpOREkzTUM5d2NtUXRabkp2Ym5RdE1UQTVNRE01TkY4eU1ERjRNakF4TG1wd1p3fGVmOTk1MDhkYmEzNWZiM2NhMDJhMzYwMDAxNmU0ZGJjMTc1NmRlMjhkYWIwNDNmZDI3ZThkNDM3MmFiYzNlODc',
    volume: '30ml',
    sku: 'BP_1090394',
    averageRating: 4.93,
    reviewCount: 670,
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
    offers: [
      {
        id: 'csv-1090394-offer-1',
        productId: 'csv-1090394',
        retailerId: 'iciparis',
        retailerName: 'ICI PARIS XL',
        price: 60.99,
        originalPrice: 90.00,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-31T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://www.iciparisxl.nl/armani/my-way/eau-de-parfum-navulbaar-damesparfum/p/BP_1090394',
        lastUpdated: '2024-07-21T08:00:00Z'
      }
    ],
    lowestPrice: 60.99,
    highestPrice: 60.99,
    priceRange: '€60.99'
  },
  {
    id: 'csv-1173052',
    name: 'FAME Eau de Parfum',
    brand: 'RABANNE',
    category: 'Parfum',
    subcategory: 'Damesparfum',
    description: 'Sprankelende moderne geur met een iconische fles.',
    imageUrl: 'https://www.iciparisxl.nl/medias/prd-front-1173052-201x201.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTE3MjN8aW1hZ2UvanBlZ3xhREl3TDJnMk9TOHhNVFV4TkRBeE9ETTVPREl6T0M5d2NtUXRabkp2Ym5RdE1URTNNekExTWw4eU1ERjRNakF4TG1wd1p3fDEwNzhjZjg1YTY3ZDJlMjE3NTUxYzE1NmE4MjUyOWM0YTQ5NjVhOWI5YjU2ZGE5ZWE4N2M4YzA4NmM2NDA2OGE',
    volume: '30ml',
    sku: 'BP_1173052',
    averageRating: 4.94,
    reviewCount: 625,
    createdAt: '2024-06-02T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
    offers: [
      {
        id: 'csv-1173052-offer-1',
        productId: 'csv-1173052',
        retailerId: 'iciparis',
        retailerName: 'ICI PARIS XL',
        price: 59.52,
        originalPrice: 74.40,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-31T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://www.iciparisxl.nl/rabanne/fame/eau-de-parfum/p/BP_1173052',
        lastUpdated: '2024-07-21T08:00:00Z'
      }
    ],
    lowestPrice: 59.52,
    highestPrice: 59.52,
    priceRange: '€59.52'
  }
];

// Lightweight conditional logger
const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production' && (process.env.LOG_LEVEL || 'debug') !== 'silent') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

// Helper to inject additional products at runtime (e.g. parsed from CSV)
export const injectProducts = (items: ProductWithOffers[]) => {
  for (const p of items) {
    if (!mockProducts.some(mp => mp.id === p.id)) {
      mockProducts.push(p);
    }
  }
};

// CSV ingestion -------------------------------------------------------------
let csvLoaded = false;
async function loadCsvProductsOnce() {
  if (csvLoaded || !ENABLE_CSV) return;
  // Prefer server-side loader using fs (never bundled client-side)
  if (typeof window === 'undefined') {
    try {
      // @ts-ignore dynamic server-only import
      const mod = await import('./server/csv-loader').catch(() => null as any);
      if (mod && typeof mod.loadServerCsv === 'function') {
        const added = await mod.loadServerCsv({ inject: injectProducts });
        csvLoaded = true;
        if (added) devLog(`CSV (server) geladen: ${added} producten.`);
        return;
      }
    } catch (err) {
      devLog('Server CSV loader fout, fallback naar public fetch:', err);
    }
  }
  // Fallback: public fetch (works both server/client but no fs)
  try {
    const base = (typeof window !== 'undefined') ? '' : (process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || '');
    const url = `${base}/products.csv`;
    const res = await fetch(url).catch(() => null);
    if (!res || !res.ok) { csvLoaded = true; return; }
    const raw = await res.text();
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) { csvLoaded = true; return; }
    const header = lines[0].split(/[,;]\s*/).map(h => h.trim());
    const out: ProductWithOffers[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(/[,;]\s*/);
      if (cols.length !== header.length) continue;
      const row: Record<string, string> = {};
      header.forEach((h, idx) => (row[h.toLowerCase()] = cols[idx]));
      if (!row.name && !row.title) continue;
      const rawBrand = (row.brand || row.merk || '').trim();
      const brandNormKey = rawBrand.toUpperCase();
      const brand = (BRAND_NORMALIZATION[brandNormKey] || rawBrand || 'Onbekend merk') as string;
      const rawCategory = (row.category || row.categorie || '').trim();
      const catNormKey = rawCategory.toUpperCase();
      const category = (CATEGORY_NORMALIZATION[catNormKey] || rawCategory || 'Parfum') as string;
      if (brand && !CANONICAL_BRANDS.includes(brand as any)) continue;
      if (category && !CANONICAL_CATEGORIES.includes(category as any)) continue;
      const id = row.id || row.sku || `csv-${i}`;
      if (mockProducts.some(p => p.id === id)) continue;
      const name = row.name || row.title || 'Onbekend product';
      const subcategory = row.subcategory || row.subcategorie || undefined;
      const description = row.description || row.omschrijving || '';
      const imageUrl = row.imageurl || row.image || row.afbeelding || 'https://via.placeholder.com/400x400.png?text=Product';
      const volume = row.volume || row.inhoud || undefined;
      const sku = row.sku || row.code || undefined;
      const now = new Date().toISOString();
      const priceNum = parseFloat(row.price || row.prijs || '');
      const price = !isNaN(priceNum) && priceNum > 0 ? priceNum : undefined;
      const currency = row.currency || 'EUR';
      const offers: PriceOffer[] = price ? [{ id: `${id}-offer-1`, productId: id, retailerId: 'csvimport', retailerName: 'CSV Retailer', price, currency, isOnSale: false, stockStatus: 'in_stock', productUrl: row.url || row.link || '#', lastUpdated: now }] : [];
      const lowestPrice = offers.length ? offers[0].price : undefined;
      out.push({ id, name, brand, category, subcategory, description, imageUrl, volume, sku, createdAt: now, updatedAt: now, offers, lowestPrice, highestPrice: lowestPrice, priceRange: lowestPrice ? `€${lowestPrice.toFixed(2)}` : undefined });
    }
    if (out.length) { injectProducts(out); devLog(`CSV (public fallback) geladen: ${out.length} producten.`); }
  } catch (e) {
    devLog('CSV fetch fout:', e);
  } finally {
    csvLoaded = true;
  }
}

// Initial load CSV (if enabled)
// if (ENABLE_CSV) { loadCsvProductsOnce(); }

// Debug: show all products (mock + injected)
// setTimeout(() => { devLog('Alle producten:', JSON.stringify(mockProducts, null, 2)); }, 1000);

// API simulation functions -------------------------------------------------

export const getProducts = async (
  filters: SearchFilters = {},
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<PaginatedResponse<ProductWithOffers>> => {
  await loadCsvProductsOnce();
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
      case 'price_asc': filteredProducts.sort((a, b) => (a.lowestPrice ?? Infinity) - (b.lowestPrice ?? Infinity)); break;
      case 'price_desc': filteredProducts.sort((a, b) => (b.lowestPrice ?? -Infinity) - (a.lowestPrice ?? -Infinity)); break;
      case 'rating_desc': filteredProducts.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0)); break;
      case 'newest': filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
  }
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / size);
  const paginatedData = filteredProducts.slice((page - 1) * size, page * size);
  return { data: paginatedData, page, pageSize: size, total, totalPages };
};

export const getProductById = async (id: string): Promise<ProductWithOffers | undefined> => {
  await loadCsvProductsOnce();
  return mockProducts.find(p => p.id === id);
};

export const getPriceHistory = async (productId: string, days = 30): Promise<PriceHistory> => {
  await loadCsvProductsOnce();
  const history: { date: string; price: number }[] = [];
  const today = new Date();
  const basePrice = mockProducts.find(p => p.id === productId)?.lowestPrice || 50;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const fluctuation = (Math.random() - 0.5) * (basePrice * 0.1);
    const price = parseFloat((basePrice + fluctuation).toFixed(2));
    history.push({ date: date.toISOString().split('T')[0], price });
  }
  return { productId, history };
};

export const getCategories = async (): Promise<Category[]> => {
  await loadCsvProductsOnce();
  return mockCategories;
};

export const getBrands = async (): Promise<Brand[]> => {
  await loadCsvProductsOnce();
  return mockBrands;
};
