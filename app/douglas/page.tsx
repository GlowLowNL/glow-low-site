import { Suspense } from "react";
import { loadAllProducts } from "@/lib/server-data";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata = {
  title: "Douglas Producten | Premium Beauty & Lifestyle | GlowLow",
  description: "Ontdek de nieuwste Douglas producten met uitgebreide prijsvergelijking, reviews en multi-shop aanbiedingen. Van make-up tot parfums.",
};

interface CategoryStats {
  [key: string]: {
    count: number;
    brands: Set<string>;
    avgPrice: number;
  };
}

async function DouglasProductsGrid() {
  const allProducts = await loadAllProducts();
  
  // Filter only Douglas products
  const douglasProducts = allProducts.filter(product => 
    product.sku?.startsWith('DGL_') || product.id?.startsWith('DGL_')
  );
  
  // Calculate category statistics
  const categoryStats: CategoryStats = {};
  douglasProducts.forEach(product => {
    const cat = product.category;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { count: 0, brands: new Set<string>(), avgPrice: 0 };
    }
    categoryStats[cat].count++;
    categoryStats[cat].brands.add(product.brand);
    
    // Parse price for average calculation
    const priceMatch = product.priceRange?.match(/[\d,]+/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[0].replace(',', '.'));
      categoryStats[cat].avgPrice += price;
    }
  });
  
  // Finalize statistics
  const finalStats: { [key: string]: { count: number; brands: number; avgPrice: number } } = {};
  Object.keys(categoryStats).forEach(cat => {
    const stats = categoryStats[cat];
    finalStats[cat] = {
      count: stats.count,
      brands: stats.brands.size,
      avgPrice: stats.avgPrice / stats.count
    };
  });
  
  const topCategories = Object.entries(finalStats)
    .sort(([,a], [,b]) => b.count - a.count)
    .slice(0, 6);
  
  const featuredProducts = douglasProducts.slice(0, 12);
  
  return (
    <div className="space-y-8">
      {/* Statistics Overview */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Douglas Collectie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topCategories.map(([category, stats]) => (
            <div key={category} className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{stats.count}</div>
              <div className="text-sm font-medium text-gray-900">{category}</div>
              <div className="text-xs text-gray-500">{stats.brands} merken</div>
              <div className="text-xs text-purple-600">Ø €{stats.avgPrice.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Features Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Features</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✨ Historische prijsanalyse</li>
              <li>🏪 Multi-shop vergelijking</li>
              <li>⭐ Geverifieerde reviews</li>
              <li>📊 Real-time voorraad status</li>
            </ul>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>
      
      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Alle Douglas Producten
          </h2>
          <span className="text-sm text-gray-500">
            {douglasProducts.length} producten
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {douglasProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-gray-100 rounded-2xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 space-y-2">
              <div className="h-8 w-12 bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
              <div className="h-3 w-14 bg-gray-200 rounded mx-auto"></div>
              <div className="h-3 w-10 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DouglasPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Douglas Producten', href: '/douglas' }
          ]} 
        />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Douglas Premium Collectie
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            Ontdek de volledige Douglas collectie met geavanceerde prijsvergelijking, 
            historische prijsdata en multi-shop aanbiedingen. Van luxe parfums tot 
            professionele make-up - alles voor jouw beauty routine.
          </p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <DouglasProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
