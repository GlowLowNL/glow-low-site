import { MetadataRoute } from 'next';
import { loadAllProducts, getAllCategories } from '@/lib/server-data';
import { MAX_PAGE_SIZE } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000';
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() }
  ];
  
  // Get all products and categories from server data
  const products = await loadAllProducts();
  const categories = await getAllCategories();

  const productEntries: MetadataRoute.Sitemap = products.map(p => ({
    url: `${base}/product/${p.id}`,
    lastModified: new Date(p.updatedAt || p.createdAt || Date.now())
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date()
  }));

  return [...routes, ...categoryEntries, ...productEntries];
}
