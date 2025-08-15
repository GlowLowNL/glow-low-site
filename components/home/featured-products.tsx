import { getProducts } from '@/lib/mockApi';
import { ProductCard } from '../product/product-card';

export default async function FeaturedProducts() {
  try {
    const data = await getProducts({}, 1, 4); // Fetch first 4 products for featured section
    const products = data?.data;

    if (!products || products.length === 0) {
      return (
        <section id="featured" className="py-16 bg-gradient-to-b from-muted/40 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center py-8 text-muted-foreground">
              Geen producten gevonden ({data?.total || 0} totaal)
            </div>
          </div>
        </section>
      );
    }

    return (
      <section id="featured" className="py-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Aanbevolen producten</h2>
            <a href="#" className="text-sm text-primary hover:underline font-medium">Alle producten</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-4 text-xs text-muted-foreground">
            Toont {products.length} van {data?.total} producten
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading featured products:', error);
    return (
      <section id="featured" className="py-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-8 text-destructive">
            Fout bij laden producten: {String(error)}
          </div>
        </div>
      </section>
    );
  }
}

export function FeaturedProductsSkeleton() {
  return (
    <section id="featured" className="py-16 bg-gradient-to-b from-muted/40 to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Aanbevolen producten</h2>
          <div className="h-9 w-28 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative rounded-2xl bg-card/60 border p-4 h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/20 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
