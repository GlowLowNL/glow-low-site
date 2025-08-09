import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/mockApi';
import { MAX_PAGE_SIZE } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000';
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() }
  ];
  // Accumulate all products (paginate)
  let page = 1;
  const pageSize = Math.min(MAX_PAGE_SIZE, 100); // safeguard
  let totalPages = 1;
  const categoriesSet = new Set<string>();
  const productEntries: MetadataRoute.Sitemap = [];
  do {
    const res = await getProducts({}, page, pageSize);
    totalPages = res.totalPages;
    for (const p of res.data) {
      if (p.category) categoriesSet.add(p.category);
      productEntries.push({ url: `${base}/product/${p.id}`, lastModified: new Date(p.updatedAt || p.createdAt || Date.now()) });
    }
    page++;
  } while (page <= totalPages);

  const categoryEntries: MetadataRoute.Sitemap = Array.from(categoriesSet).map(c => ({
    url: `${base}/category/${c.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,
    lastModified: new Date()
  }));

  return [...routes, ...categoryEntries, ...productEntries];
}
