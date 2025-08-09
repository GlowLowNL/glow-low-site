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
  // Base list intentionally left minimal; real data supplied by reference CSVs
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

// Reference dataset ingestion via public assets (no fs) ---------------------
const referenceDataState = { loaded: false };
let datasetsLoading: Promise<void> | null = null;

async function loadReferenceDatasetsPublic() {
  if (referenceDataState.loaded) return;
  if (datasetsLoading) return datasetsLoading;
  datasetsLoading = (async () => {
    try {
      // Discover dataset files via manifest.json (created in /public/datasets)
      const base = (typeof window !== 'undefined') ? '' : (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || '');
      const manifestRes = await fetch(`${base}/datasets/manifest.json`).catch(() => null);
      if (!manifestRes || !manifestRes.ok) { referenceDataState.loaded = true; return; }
      const manifest: { files: string[] } = await manifestRes.json().catch(() => ({ files: [] }));
      if (!manifest.files?.length) { referenceDataState.loaded = true; return; }

      interface Agg { base: Omit<ProductWithOffers, 'offers'|'lowestPrice'|'highestPrice'|'priceRange'> & { offers: PriceOffer[] } }
      const mapAgg = new Map<string, Agg>();
      const norm = (v: string) => v.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\w\s]/g,'').trim().toLowerCase();

      for (const file of manifest.files) {
        const csvRes = await fetch(`${base}/datasets/${file}`).catch(() => null);
        if (!csvRes || !csvRes.ok) continue;
        const raw = await csvRes.text();
        const lines = raw.split(/\r?\n/).filter(l => l.trim());
        if (lines.length < 2) continue;
        const header = lines[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(h => h.trim().toLowerCase());
        const idx = (name: string) => header.indexOf(name);
        for (let i = 1; i < lines.length; i++) {
          const rowLine = lines[i];
          const cols = rowLine.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
          if (cols.length !== header.length) continue;
          const get = (k: string) => { const j = idx(k); return j >= 0 ? cols[j].replace(/^\"|\"$/g,'').trim() : ''; };
          const name = get('name'); if (!name) continue;
          const brandRaw = get('brand'); if (!brandRaw) continue;
          const brandKey = brandRaw.toUpperCase();
          const brand = (BRAND_NORMALIZATION[brandKey] || brandRaw).trim();
          if (!mockBrands.some(b => b.name === brand)) {
            mockBrands.push({ id: (mockBrands.length+1).toString(), name: brand, slug: brand.toLowerCase().replace(/[^a-z0-9]+/g,'-'), logoUrl: undefined });
          }
          let categoryRaw = get('category') || get('top_category') || 'Parfum';
          categoryRaw = categoryRaw.replace(/_/g,' ').toLowerCase();
          if (categoryRaw === 'parfum' || categoryRaw === 'perfume') categoryRaw = 'Parfum';
          if (categoryRaw === 'make-up' || categoryRaw === 'make up') categoryRaw = 'Make-up';
            if (categoryRaw === 'huidverzorging' || categoryRaw === 'skincare') categoryRaw = 'Huidverzorging';
          const category = categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1);
          const subcategoryRaw = get('subcategory') || get('type') || '';
          const subcategory = subcategoryRaw ? subcategoryRaw.replace(/_/g,' ').replace(/\s+/g,' ').trim() : undefined;
          const size = get('size') || get('volume') || undefined;
          const idBase = get('internal_code') || get('internal_code2') || `${file.replace(/\.csv$/,'')}-${i}`;
          const urlVal = get('url');
          const hostMatch = urlVal.match(/https?:\/\/([^/]+)/);
          const host = (hostMatch ? hostMatch[1] : '').replace(/^www\./, '');
          const retailerId = host.split('.')[0] || 'retailer';
          const productUrl = urlVal || '#';
          const priceStr = get('price') || get('prijs');
          const parseEuro = (val: string): number | undefined => { if (!val) return undefined; const cleaned = val.replace(/[^0-9,\.]/g,'').replace(/,(\d{2})$/, '.$1'); const num = parseFloat(cleaned); return isNaN(num) ? undefined : num; };
          const price = parseEuro(priceStr) || 0;
          const wasPrice = parseEuro(get('originalprice') || get('was_price') || get('wasprice'));
          const rating = parseFloat(get('rating'));
          const reviewCount = parseInt(get('review_count') || get('reviewcount') || '0', 10) || 0;
          const imageUrl = get('image_url') || get('image') || get('imageurl') || 'https://via.placeholder.com/600x600.png?text=Product';
          const description = get('description') || undefined;
          const now = new Date().toISOString();
          const key = [norm(brand), norm(name), norm(size || '')].join('|');
          let agg = mapAgg.get(key);
          if (!agg) {
            const slugCore = `${brand}-${name}-${size||''}`.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-');
            const baseId = slugCore || key.replace(/\|/g,'-');
            agg = { base: { id: baseId, name, brand, category, subcategory, description, imageUrl, volume: size, sku: idBase, averageRating: isNaN(rating) ? undefined : rating, reviewCount: reviewCount || undefined, createdAt: now, updatedAt: now, offers: [] } };
            mapAgg.set(key, agg);
          } else {
            if (!isNaN(rating)) {
              const existing = agg.base.averageRating || rating;
              const existingCount = agg.base.reviewCount || 0;
              if (reviewCount > existingCount) {
                agg.base.averageRating = rating;
                agg.base.reviewCount = reviewCount || undefined;
              } else if (!agg.base.averageRating) {
                agg.base.averageRating = rating;
              }
            }
            agg.base.updatedAt = now;
          }
          const offer: PriceOffer = { id: `${agg.base.id}-offer-${agg.base.offers.length+1}`, productId: agg.base.id, retailerId, retailerName: retailerId.charAt(0).toUpperCase()+retailerId.slice(1), price, originalPrice: wasPrice, currency: 'EUR', isOnSale: !!(wasPrice && wasPrice > price), saleEndDate: undefined, stockStatus: 'in_stock', productUrl, lastUpdated: now };
          if (!agg.base.offers.some(o => o.retailerId === offer.retailerId && o.price === offer.price)) {
            agg.base.offers.push(offer);
          }
        }
      }

      if (mapAgg.size) {
        const merged: ProductWithOffers[] = [];
        for (const { base } of mapAgg.values()) {
          const prices = base.offers.map(o => o.price).filter(p => p > 0);
          const low = Math.min(...prices);
          const high = Math.max(...prices);
          const product: ProductWithOffers = { ...base, offers: base.offers, lowestPrice: low, highestPrice: high, priceRange: low === high ? `€${low.toFixed(2)}` : `€${low.toFixed(2)} - €${high.toFixed(2)}` };
          // Voorzie ieder product direct van een gegenereerde (deterministische) historie (180 dagen) zodat charts meteen data hebben
          generateDeterministicHistory(product.id, product.lowestPrice || (low || 40), 180);
          merged.push(product);
        }
        injectProducts(merged);
        devLog('Referentiedatasets (public) gemerged producten:', merged.length);
      }
      referenceDataState.loaded = true;
      syntheticGenerated.done = true;
    } catch (e) {
      devLog('Referentiedata (public) fout:', e);
      referenceDataState.loaded = true; // avoid retry loop in production
    }
  })();
  return datasetsLoading;
}

// CSV ingestion (legacy single CSV) ----------------------------------------
let csvLoaded = false;

async function loadCsvProductsOnce() {
  if (csvLoaded || !ENABLE_CSV) return;
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

// API simulation functions -------------------------------------------------

export const getProducts = async (
  filters: SearchFilters = {},
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<PaginatedResponse<ProductWithOffers>> => {
  // Load merged reference datasets (multi-offer) first
  await loadReferenceDatasetsPublic();
  await loadCsvProductsOnce();
  generateSyntheticProducts();
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
  await loadReferenceDatasetsPublic();
  await loadCsvProductsOnce();
  return mockProducts.find(p => p.id === id);
};

export const getPriceHistory = async (productId: string, days = 30): Promise<PriceHistory> => {
  await loadReferenceDatasetsPublic();
  await loadCsvProductsOnce();
  generateSyntheticProducts();
  const product = mockProducts.find(p => p.id === productId);
  const base = product?.lowestPrice || 40;
  const fullHistory = generateDeterministicHistory(productId, base);
  const slice = fullHistory.slice(-days);
  return { productId, history: slice };
};

export const getCategories = async (): Promise<Category[]> => {
  await loadReferenceDatasetsPublic();
  await loadCsvProductsOnce();
  // Dynamisch afleiden uit producten
  const mapCat: Record<string, { cat: Category; subs: Record<string, Category> }> = {};
  for (const p of mockProducts) {
    if (!p.category) continue;
    if (!mapCat[p.category]) {
      const id = 'cat-' + Object.keys(mapCat).length;
      mapCat[p.category] = { cat: { id, name: p.category, slug: p.category.toLowerCase().replace(/[^a-z0-9]+/g,'-'), description: undefined, children: [] }, subs: {} };
    }
    if (p.subcategory) {
      const bucket = mapCat[p.category];
      if (!bucket.subs[p.subcategory]) {
        const sid = bucket.cat.id + '-' + (Object.keys(bucket.subs).length+1);
        bucket.subs[p.subcategory] = { id: sid, name: p.subcategory, slug: p.subcategory.toLowerCase().replace(/[^a-z0-9]+/g,'-'), parentId: bucket.cat.id } as Category;
      }
    }
  }
  const out: Category[] = Object.values(mapCat).map(v => ({ ...v.cat, children: Object.values(v.subs) }));
  return out.length ? out : mockCategories;
};

export const getBrands = async (): Promise<Brand[]> => {
  await loadReferenceDatasetsPublic();
  await loadCsvProductsOnce();
  return mockBrands;
};

// Deterministic price history store
const priceHistoryMap = new Map<string, { date: string; price: number }[]>();

// Simple deterministic PRNG based on product id
function seedRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => {
    h = Math.imul(48271, h) + 0x7fffffff & 0x7fffffff;
    return (h & 0xfffffff) / 0xfffffff;
  };
}

function generateDeterministicHistory(productId: string, base: number, days = 120) {
  if (priceHistoryMap.has(productId)) return priceHistoryMap.get(productId)!;
  const rand = seedRandom(productId);
  const today = new Date();
  const history: { date: string; price: number }[] = [];
  let trend = base * (0.85 + rand() * 0.3); // start within ±15%
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // weekly pattern (weekend dips)
    const weekday = d.getDay();
    const weekendFactor = (weekday === 0 || weekday === 6) ? -0.012 : 0.006;
    const noise = (rand() - 0.5) * base * 0.015; // ~1.5%
    trend = trend * (1 + weekendFactor) + noise;
    const price = Math.max(2, parseFloat(trend.toFixed(2)));
    history.push({ date: d.toISOString().split('T')[0], price });
  }
  priceHistoryMap.set(productId, history);
  return history;
}

// Synthetic product generation ------------------------------------------------
const syntheticGenerated = { done: false };
function generateSyntheticProducts(targetTotal = 80) {
  if (referenceDataState.loaded) { syntheticGenerated.done = true; return; }
  const current = mockProducts.length;
  if (current >= targetTotal) { syntheticGenerated.done = true; return; }

  const brandPools = {
    'Huidverzorging': ['The Ordinary', 'CeraVe', 'Clinique', 'Estée Lauder', 'Garnier', 'NIVEA'],
    'Make-up': ['Maybelline', "L'Oréal Paris", 'Lancôme', 'Estée Lauder'],
    'Parfum': ['Lancôme', 'Yves Saint Laurent', 'Estée Lauder']
  } as Record<string, string[]>;

  const baseCatalog: Array<{ baseName: string; category: string; subcategory?: string; min: number; max: number; imageQuery: string; }> = [
    { baseName: 'Hydrating Facial Cleanser', category: 'Huidverzorging', subcategory: 'Reiniging', min: 7, max: 16, imageQuery: 'skincare,cleanser' },
    { baseName: 'Vitamin C Serum 15%', category: 'Huidverzorging', subcategory: 'Serums', min: 9, max: 28, imageQuery: 'skincare,serum' },
    { baseName: 'Retinol Night Treatment', category: 'Huidverzorging', subcategory: 'Anti-Aging', min: 12, max: 42, imageQuery: 'retinol,cosmetics' },
    { baseName: 'Mineral Sunscreen SPF50', category: 'Huidverzorging', subcategory: 'Zonnebescherming', min: 10, max: 24, imageQuery: 'sunscreen' },
    { baseName: 'Lightweight Gel Moisturizer', category: 'Huidverzorging', subcategory: 'Vochtinbrengende Crème', min: 8, max: 30, imageQuery: 'moisturizer' },
    { baseName: 'Long Wear Foundation', category: 'Make-up', subcategory: 'Foundation', min: 14, max: 50, imageQuery: 'foundation,makeup' },
    { baseName: 'Volumizing Mascara', category: 'Make-up', subcategory: 'Mascara', min: 8, max: 34, imageQuery: 'mascara' },
    { baseName: 'Matte Liquid Lipstick', category: 'Make-up', subcategory: 'Lipstick', min: 7, max: 32, imageQuery: 'lipstick' },
    { baseName: 'Ultra Black Eyeliner', category: 'Make-up', subcategory: 'Oogschaduw', min: 6, max: 24, imageQuery: 'eyeliner' },
    { baseName: 'Eau de Parfum 50ml', category: 'Parfum', subcategory: 'Damesparfum', min: 35, max: 110, imageQuery: 'perfume,bottle' },
    { baseName: 'Eau de Toilette 100ml', category: 'Parfum', subcategory: 'Herenparfum', min: 30, max: 90, imageQuery: 'cologne' },
  ];

  const retailers = mockRetailers;
  let idCounter = 1000;

  while (mockProducts.length < targetTotal) {
    for (const base of baseCatalog) {
      if (mockProducts.length >= targetTotal) break;
      const brandList = brandPools[base.category];
      const brand = brandList[Math.floor(Math.random() * brandList.length)];
      const id = `syn-${idCounter++}`;
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000).toISOString();
      const updatedAt = new Date().toISOString();
      const basePrice = parseFloat((base.min + Math.random() * (base.max - base.min)).toFixed(2));
      const discountFactor = Math.random();
      const offers: PriceOffer[] = [];
      // create 2-4 offers
      const offerCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < offerCount; i++) {
        const r = retailers[(Math.floor(Math.random() * retailers.length))];
        const priceVariation = (Math.random() - 0.5) * basePrice * 0.12; // ±12%
        let price = parseFloat(Math.max(2, basePrice + priceVariation).toFixed(2));
        let originalPrice: number | undefined;
        let isOnSale = false;
        if (discountFactor > 0.65 && i === 0) { // one main discounted retailer
          originalPrice = parseFloat((price * (1 + 0.25 + Math.random() * 0.25)).toFixed(2));
          isOnSale = true;
          price = parseFloat((originalPrice * (0.65 + Math.random() * 0.2)).toFixed(2));
        }
        offers.push({
          id: `${id}-offer-${i+1}`,
          productId: id,
          retailerId: r.id,
          retailerName: r.name,
          price,
          originalPrice,
          currency: 'EUR',
          isOnSale,
          saleEndDate: isOnSale ? new Date(Date.now() + (5 + Math.random()*20) * 86400000).toISOString() : undefined,
          stockStatus: 'in_stock',
          productUrl: `${r.url}/product/${id}`,
          lastUpdated: updatedAt
        });
      }
      const lowestPrice = Math.min(...offers.map(o => o.price));
      const highestPrice = Math.max(...offers.map(o => o.price));
      const priceRange = lowestPrice === highestPrice ? `€${lowestPrice.toFixed(2)}` : `€${lowestPrice.toFixed(2)} - €${highestPrice.toFixed(2)}`;
      const imageUrl = `https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=600&q=75&sig=${idCounter}`;
      mockProducts.push({
        id,
        name: `${brand} ${base.baseName}`,
        brand,
        category: base.category,
        subcategory: base.subcategory,
        description: `${base.baseName} van ${brand}. Vergelijk prijzen en bespaar.`,
        imageUrl,
        volume: base.subcategory?.includes('Parfum') ? '50ml' : undefined,
        sku: `${brand.slice(0,3).toUpperCase()}-${idCounter}`,
        averageRating: parseFloat((3.8 + Math.random()*1.2).toFixed(2)),
        reviewCount: 50 + Math.floor(Math.random()*1500),
        createdAt,
        updatedAt,
        offers,
        lowestPrice,
        highestPrice,
        priceRange
      });
      generateDeterministicHistory(id, lowestPrice);
    }
  }
  syntheticGenerated.done = true;
}
