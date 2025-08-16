import { loadAllProducts } from "@/lib/server-data";
import { SimpleImage } from "@/components/product/simple-image";
import { PriceHistoryChart } from "@/components/product/price-history-chart";
import { OffersList } from "@/components/product/offers-list";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share } from 'lucide-react';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata = {
  title: "Enhanced Product Demo | GlowLow",
  description: "Demonstratie van geavanceerde productfuncties met prijshistorie en multi-shop vergelijking.",
};

export default async function EnhancedProductDemo() {
  const allProducts = await loadAllProducts();
  
  // Get a Douglas product with good data
  const douglasProducts = allProducts.filter(product => 
    product.sku?.startsWith('DGL_') || product.id?.startsWith('DGL_')
  );
  
  const demoProduct = douglasProducts.find(p => 
    p.offers && p.offers.length > 0
  ) || douglasProducts[0];

  if (!demoProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Geen Douglas product gevonden voor demo.</p>
      </div>
    );
  }

  // Generate mock price history for demo
  const mockPriceHistory = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const basePrice = 45; // Mock base price
    const variation = (Math.random() - 0.5) * 10;
    return {
      date: date.toISOString().split('T')[0],
      price: Math.max(25, basePrice + variation),
      shop: i % 2 === 0 ? 'Douglas' : 'ICI PARIS XL'
    };
  }).reverse();

  // Mock enhanced offers
  const mockOffers = [
    {
      id: 'douglas-1',
      productId: demoProduct.id,
      retailerId: 'douglas',
      retailerName: 'Douglas',
      price: 42.95,
      originalPrice: 49.95,
      currency: 'EUR',
      isOnSale: true,
      productUrl: 'https://douglas.nl',
      stockStatus: 'in_stock' as const,
      shippingInfo: '1-2 dagen',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'ici-1', 
      productId: demoProduct.id,
      retailerId: 'ici',
      retailerName: 'ICI PARIS XL',
      price: 45.99,
      originalPrice: 49.95,
      currency: 'EUR',
      isOnSale: true,
      productUrl: 'https://iciparisxl.nl',
      stockStatus: 'in_stock' as const,
      shippingInfo: '1-2 dagen',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'bol-1',
      productId: demoProduct.id,
      retailerId: 'bol',
      retailerName: 'Bol.com',
      price: 47.50,
      currency: 'EUR',
      isOnSale: false,
      productUrl: 'https://bol.com',
      stockStatus: 'in_stock' as const,
      shippingInfo: '1-2 dagen',
      lastUpdated: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Douglas Premium', href: '/douglas' },
            { label: 'Enhanced Demo', href: '/demo' }
          ]} 
        />
        
        {/* Enhanced Product Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🎯 Enhanced Features Demo
            </Badge>
            <Badge variant="outline">
              Premium Data
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Geavanceerde Productfuncties
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            Ontdek onze geavanceerde productfuncties met real-time prijsvergelijking, 
            historische prijsdata, multi-shop aanbiedingen en gedetailleerde productinformatie.
          </p>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image & Basic Info */}
          <div className="space-y-6">
            <div className="aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border">
              <SimpleImage
                src={demoProduct.imageUrl}
                alt={demoProduct.name}
                productType={demoProduct.subcategory}
                className="w-full h-full"
              />
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-2">
                {demoProduct.brand}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {demoProduct.name}
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(demoProduct.averageRating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {demoProduct.averageRating || 0} ({demoProduct.reviewCount || 0} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors">
                  <Heart className="w-4 h-4" />
                  Favorieten
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Share className="w-4 h-4" />
                  Delen
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Pricing & Offers */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prijsvergelijking
              </h3>
              <OffersList offers={mockOffers} />
              
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Besparing</span>
                  <span className="font-semibold text-green-600">
                    €{(Math.max(...mockOffers.map(o => o.price)) - Math.min(...mockOffers.map(o => o.price))).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Beste deal</span>
                  <span className="font-semibold text-purple-600">
                    {mockOffers.find(o => o.price === Math.min(...mockOffers.map(p => p.price)))?.retailerName}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Category & Tags */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Categorie</span>
                  <Badge variant="outline">{demoProduct.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <Badge variant="outline">{demoProduct.subcategory}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SKU</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">
                    {demoProduct.sku}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mb-8">
          <PriceHistoryChart 
            productId={demoProduct.id} 
            currentPrice={42.95}
          />
        </div>

        {/* Enhanced Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Prijshistorie
            </h3>
            <p className="text-sm text-gray-600">
              6 maanden historische prijsdata van meerdere webshops voor de beste deals.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6">
            <div className="text-3xl mb-3">🏪</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Multi-shop Vergelijking
            </h3>
            <p className="text-sm text-gray-600">
              Real-time prijzen van Douglas, ICI PARIS XL, Bol.com en meer winkels.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Geverifieerde Reviews
            </h3>
            <p className="text-sm text-gray-600">
              Echte klantbeoordelingen en ratings van geverifieerde aankopen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
