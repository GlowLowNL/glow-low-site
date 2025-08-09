"use client";
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/mockApi';
import { ProductWithOffers, PaginatedResponse } from '@/types/product';
import { ProductCard } from './product-card';

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useQuery<PaginatedResponse<ProductWithOffers>>({
    queryKey: ['products', { page: 1, pageSize: 4 }],
    queryFn: () => getProducts({}, 1, 4), // Fetch first 4 products for featured section
  });

  const products = data?.data;

  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold">Aanbevolen producten</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-80 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (isError) return <div className="text-center py-8 text-destructive">Fout bij laden producten.</div>;
  if (!products || products.length === 0) return null; // Don't show the section if there are no products

  return (
    <section className="py-12 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Aanbevolen producten</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
