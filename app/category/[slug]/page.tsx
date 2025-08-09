import { getProducts } from '@/lib/mockApi';
import { ProductCard } from '@/components/product/product-card';
import { Metadata } from 'next';

interface Props { params: { slug: string }; searchParams: { page?: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = `${decodeURIComponent(params.slug)} | GlowLow`;
  return { title };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const productsResponse = await getProducts({ category: mapSlugToCategory(params.slug) }, page, 24);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize tracking-tight">{decodeURIComponent(params.slug)}</h1>
        <p className="text-muted-foreground mt-2 text-sm">Vergelijk prijzen en aanbiedingen voor {decodeURIComponent(params.slug)} producten.</p>
      </div>
      {productsResponse.data.length === 0 && (
        <p className="text-muted-foreground">Geen producten gevonden.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsResponse.data.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function mapSlugToCategory(slug: string) {
  switch (slug) {
    case 'huidverzorging': return 'Huidverzorging';
    case 'make-up': return 'Make-up';
    case 'parfum': return 'Parfum';
    default: return '';
  }
}
