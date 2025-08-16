import { loadAllProducts } from '@/lib/server-data';
import { ProductCard } from '../product/product-card';

export default async function FeaturedProducts() {
  try {
    const allProducts = await loadAllProducts();
    const products = allProducts.slice(0, 4); // Get first 4 products for featured section

    if (!products || products.length === 0) {
      return (
        <section id="featured" className="py-16 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center py-8 text-gray-500">
              Geen producten gevonden ({allProducts.length || 0} totaal)
            </div>
          </div>
        </section>
      );
    }

    return (
      <section id="featured" className="py-16 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Aanbevolen producten</h2>
            <a href="/products" className="text-sm text-gray-600 hover:text-gray-900 hover:underline font-medium transition-colors">Alle producten →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 text-xs text-gray-500">
            Toont {products.length} van {allProducts.length} producten
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading featured products:', error);
    return (
      <section id="featured" className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center py-8 text-red-500">
            Fout bij laden producten: {String(error)}
          </div>
        </div>
      </section>
    );
  }
}

export function FeaturedProductsSkeleton() {
  return (
    <section id="featured" className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Aanbevolen producten</h2>
          <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative rounded-lg bg-white border border-gray-200 p-3 h-64 overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse rounded mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
