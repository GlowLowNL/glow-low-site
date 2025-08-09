// Server-only CSV loader using fs/promises (not imported in client bundles)
import { promises as fs } from 'fs';
import { CSV_PATH, BRAND_NORMALIZATION, CATEGORY_NORMALIZATION, CANONICAL_BRANDS, CANONICAL_CATEGORIES } from '../config';
import type { ProductWithOffers, PriceOffer } from '@/types/product';

export async function loadServerCsv(opts: { inject: (items: ProductWithOffers[]) => void }): Promise<number> {
  try {
    const exists = await fs.stat(CSV_PATH).then(() => true).catch(() => false);
    if (!exists) return 0;
    const raw = await fs.readFile(CSV_PATH, 'utf8');
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) return 0;
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
    if (out.length) opts.inject(out);
    return out.length;
  } catch {
    return 0;
  }
}
