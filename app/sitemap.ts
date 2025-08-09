import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/mockApi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000';
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/category/huidverzorging`, lastModified: new Date() },
    { url: `${base}/category/make-up`, lastModified: new Date() },
    { url: `${base}/category/parfum`, lastModified: new Date() }
  ];
  // Fetch first 200 products (adjust if needed)
  const products = await getProducts({}, 1, 200);
  const productRoutes: MetadataRoute.Sitemap = products.data.map(p => ({ url: `${base}/product/${p.id}`, lastModified: new Date(p.updatedAt || p.createdAt || Date.now()) }));
  return [...staticRoutes, ...productRoutes];
}
