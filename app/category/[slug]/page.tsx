import { getProducts } from '@/lib/mockApi';
import { ProductCard } from '@/components/product/product-card';
import { Metadata } from 'next';

interface Props { params: { slug: string }; searchParams: { page?: string } }

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
  return { title: meta.title, description: meta.description, openGraph: { title: meta.title, description: meta.description } };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const readable = decodeURIComponent(params.slug);
  const productsResponse = await getProducts({ category: mapSlugToCategory(params.slug) }, page, 24);
  const meta = categoryMeta(params.slug);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize tracking-tight">{readable}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{meta.description}</p>
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
