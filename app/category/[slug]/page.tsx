import { getProducts } from '@/lib/mockApi';
import { ProductCard } from '@/components/product/product-card';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
// Temporary stub (replace with real component when created)
function ClientCategoryFilters(_props: any) { return null; }

interface Props { params: { slug: string }; searchParams: { page?: string; brand?: string | string[]; min?: string; max?: string; sort?: string } }

function categoryMeta(slug: string) {
  const map: Record<string, { title: string; description: string }> = {
    'huidverzorging': {
      title: 'Huidverzorging prijzen vergelijken | GlowLow',
      description: 'Vergelijk prijzen van serums, moisturizers en meer huidverzorging en vind de beste deals.'
    },
    'make-up': {
      title: 'Make-up deals & prijzen | GlowLow',
      description: 'Foundation, mascara, lipstick en meer – vergelijk make-up prijzen en aanbiedingen.'
    },
    'parfum': {
      title: 'Parfum aanbiedingen vergelijken | GlowLow',
      description: 'Ontdek dames-, heren- en unisex geuren en vind de laagste parfumprijzen.'
    }
  };
  return map[slug] || { title: `${slug} | GlowLow`, description: 'Vergelijk prijzen en aanbiedingen.' };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = categoryMeta(params.slug);
  const site = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl';
  const url = `${site}/category/${params.slug}`;
  return { title: meta.title, description: meta.description, alternates: { canonical: url }, openGraph: { title: meta.title, description: meta.description, url } };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const readable = decodeURIComponent(params.slug);
  const brands = (searchParams.brand ? (Array.isArray(searchParams.brand) ? searchParams.brand : searchParams.brand.split(',')) : undefined) as string[] | undefined;
  const minPrice = searchParams.min ? Number(searchParams.min) : undefined;
  const maxPrice = searchParams.max ? Number(searchParams.max) : undefined;
  const sortBy = (searchParams.sort as any) || undefined;
  const productsResponse = await getProducts({ category: mapSlugToCategory(params.slug), brand: brands, minPrice, maxPrice, sortBy }, page, 24);
  const site = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl';
  const canonical = `${site}/category/${params.slug}` + (page > 1 ? `?page=${page}` : '');
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site + '/' },
      { '@type': 'ListItem', position: 2, name: readable, item: canonical }
    ]
  };
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: readable,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: productsResponse.total,
    itemListElement: productsResponse.data.map((p, idx) => ({
      '@type': 'ListItem',
      position: (page - 1) * 24 + idx + 1,
      url: `${site}/product/${p.id}`,
      name: p.name
    }))
  };
  const meta = categoryMeta(params.slug);
  return (
    <div className="container mx-auto px-4 py-10">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: readable }]} className="mb-6" />
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize tracking-tight">{readable}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{meta.description}</p>
        </div>
        <div className="md:min-w-[300px]">
          <ClientCategoryFilters variant="sort" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 md:shrink-0">
          <ClientCategoryFilters />
        </aside>
        <main className="flex-1">
          {productsResponse.data.length === 0 && (
            <p className="text-muted-foreground">Geen producten gevonden.</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsResponse.data.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </div>
  );
}

function mapSlugToCategory(slug: string) {
  switch (slug) {
    case 'huidverzorging': return 'Huidverzorging';
    case 'make-up': return 'Make-up';
    case 'parfum': return 'Parfum';
    default:
      return slug.replace(/-/g,' ') // hyphens to spaces
        .replace(/\b(\w)/g, s => s.toUpperCase()); // capitalize words
  }
}
