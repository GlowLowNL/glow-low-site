import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { loadAllProducts } from "@/lib/server-data";
import { ProductCard } from "@/components/product/product-card";

export const metadata = {
  title: "Alle Producten | GlowLow",
  description: "Ontdek alle beautyproducten van topmerken zoals DIOR, LANCÔME, ARMANI en meer. Vergelijk prijzen en vind de beste deals.",
};

async function ProductsGrid() {
  const products = await loadAllProducts();
  
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {products.length} producten gevonden
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm"
        >
          <div className="aspect-square bg-gray-100 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Alle Producten', href: '/products' }
          ]} 
        />
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Alle Producten
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Ontdek onze complete collectie beautyproducten van topmerken. 
            Van parfums tot huidverzorging - vind alles wat je nodig hebt voor jouw beauty routine.
          </p>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
