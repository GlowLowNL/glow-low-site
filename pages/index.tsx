import { useState, type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingDown, Star, ExternalLink, ShoppingCart, Heart, Users, Zap, Shield, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    alert("Bedankt! Je hoort van ons bij de lancering 🥳");
    setEmail("");
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
  };

    const featuredProducts = [
    {
      id: 1,
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      currentPrice: "6.90",
      originalPrice: "7.50",
      discount: 8,
      rating: 4.3,
      reviews: "12.8k",
      stores: 3,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Foaming Facial Cleanser",
      brand: "CeraVe",
      currentPrice: "11.99",
      originalPrice: "13.99",
      discount: 14,
      rating: 4.5,
      reviews: "3.4k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "La Vie Est Belle EdP 50ml",
      brand: "Lancôme",
      currentPrice: "89.95",
      originalPrice: "92.50",
      discount: 3,
      rating: 4.7,
      reviews: "5.6k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Sky High Mascara",
      brand: "Maybelline",
      currentPrice: "12.99",
      originalPrice: "14.99",
      discount: 13,
      rating: 4.4,
      reviews: "4.3k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1631214540230-9ed1af41b0e7?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Soft Vochtinbrengende Crème",
      brand: "NIVEA",
      currentPrice: "3.49",
      originalPrice: "4.29",
      discount: 19,
      rating: 4.2,
      reviews: "8.7k",
      stores: 3,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Micellair Reinigingswater",
      brand: "Garnier",
      currentPrice: "5.99",
      originalPrice: "7.49",
      discount: 20,
      rating: 4.3,
      reviews: "6.7k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "True Match Foundation",
      brand: "L'Oréal Paris",
      currentPrice: "14.99",
      originalPrice: "16.99",
      discount: 12,
      rating: 4.1,
      reviews: "2.5k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "SuperStay Matte Ink Lipstick",
      brand: "Maybelline",
      currentPrice: "8.99",
      originalPrice: "10.99",
      discount: 18,
      rating: 4.4,
      reviews: "6.5k",
      stores: 2,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"
    }
  ];

  const topBrands = [
    { name: "The Ordinary", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=TO" },
    { name: "CeraVe", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=CV" },
    { name: "Lancôme", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=LC" },
    { name: "YSL", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=YSL" },
    { name: "L'Oréal", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=LOR" },
    { name: "Maybelline", logo: "https://via.placeholder.com/80x40/f8f8f8/333333?text=MB" }
  ];

  const categories = [
    { name: "Huidverzorging", icon: "💧", count: "2,341 producten", color: "bg-blue-50 text-blue-700" },
    { name: "Make-up", icon: "💄", count: "1,876 producten", color: "bg-pink-50 text-pink-700" },
    { name: "Parfum", icon: "🌸", count: "987 producten", color: "bg-purple-50 text-purple-700" },
    { name: "Haarverzorging", icon: "✨", count: "654 producten", color: "bg-green-50 text-green-700" }
  ];

  return (
    <Layout>
      <Head>
        <title>GlowLow – Nederland's Beste Beauty Prijsvergelijker</title>
        <meta
          name="description"
          content="Vergelijk prijzen van duizenden beauty producten. Vind de beste deals op make-up, huidverzorging en parfum van topmerken bij alle Nederlandse retailers."
        />
      </Head>

      {/* Hero Section */}
            {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-12 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 px-4 py-2 text-sm font-medium">
              🔥 Ontdek de beste beauty deals van Nederland
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Beauty voor de
              <br />
              <span className="relative">
                beste prijs
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-300" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8c30-6 60-6 90-2s60 4 90 2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Vergelijk prijzen van <strong className="text-rose-600">alle grote Nederlandse beauty retailers</strong> en bespaar gemiddeld <strong className="text-green-600">€247 per jaar</strong> op je favoriete producten.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Zoek je favoriete beauty product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-rose-400 focus:ring-rose-400 shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl px-6"
                  size="sm"
                >
                  Zoeken
                </Button>
              </div>
              
              {/* Popular Searches */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-sm text-gray-500 mr-2">Populair:</span>
                {['The Ordinary', 'Foundation', 'Mascara', 'Skincare', 'Parfum'].map((term, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs bg-white/60 border-gray-200 hover:bg-rose-50 hover:border-rose-300 rounded-full"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">50,000+</div>
                <p className="text-gray-600 font-medium">Beauty producten</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">€247</div>
                <p className="text-gray-600 font-medium">Gemiddelde besparing per jaar</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <p className="text-gray-600 font-medium">Nederlandse retailers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop per Categorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl mx-auto mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Populaire Producten</h2>
            <Button variant="outline" asChild>
              <Link href="/products">Alle Producten →</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">€{product.currentPrice}</span>
                          <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-500">{product.stores} winkels</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/products/${product.id}`}>
                          Vergelijk
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Populaire Merken</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Van betaalbare drugstore favorieten tot luxe premium merken - vind de beste prijzen voor al je favoriete beauty brands
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'The Ordinary', products: '12+ producten', color: 'bg-rose-100 text-rose-700' },
              { name: 'CeraVe', products: '8+ producten', color: 'bg-blue-100 text-blue-700' },
              { name: 'Lancôme', products: '5+ producten', color: 'bg-purple-100 text-purple-700' },
              { name: 'YSL', products: '3+ producten', color: 'bg-gray-100 text-gray-700' },
              { name: 'NIVEA', products: '6+ producten', color: 'bg-cyan-100 text-cyan-700' },
              { name: 'L\'Oréal Paris', products: '7+ producten', color: 'bg-orange-100 text-orange-700' },
              { name: 'Maybelline', products: '5+ producten', color: 'bg-green-100 text-green-700' },
              { name: 'Garnier', products: '4+ producten', color: 'bg-teal-100 text-teal-700' },
              { name: 'Clinique', products: '3+ producten', color: 'bg-emerald-100 text-emerald-700' },
              { name: 'Estée Lauder', products: '2+ producten', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Too Faced', products: '2+ producten', color: 'bg-pink-100 text-pink-700' },
              { name: 'Chanel', products: '1+ producten', color: 'bg-black text-white' },
            ].map((brand, index) => (
              <Link key={index} href={`/products?brand=${encodeURIComponent(brand.name)}`}>
                <div className={`${brand.color} rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 text-center group`}>
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="font-bold text-lg">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs opacity-75">{brand.products}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3">
              <Link href="/brands">
                Bekijk Alle Merken
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0">
              Waarom 100,000+ Nederlanders GlowLow vertrouwen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Slimmer Beauty Shoppen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek waarom GlowLow de #1 beauty prijsvergelijker van Nederland is
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Altijd de Laagste Prijs</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Onze geavanceerde algoritmes vergelijken real-time prijzen van 25+ Nederlandse beauty retailers. Gegarandeerd de beste deal, altijd.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-green-700 font-semibold text-sm">
                    💰 Gemiddeld €247 besparing per jaar
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Real-time Updates</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Prijzen worden elk uur bijgewerkt. Mis nooit meer een flash sale of tijdelijke korting van je favoriete beauty retailers.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-700 font-semibold text-sm">
                    ⚡ Updates elke 60 minuten
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">100% Gratis & Veilig</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Geen verborgen kosten, geen account vereist. Volledig gratis gebruiken en direct doorlinken naar betrouwbare Nederlandse retailers.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-emerald-700 font-semibold text-sm">
                    🔒 Privacy gegarandeerd
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">Vertrouwd door Nederlandse beauty liefhebbers</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Douglas', 'Kruidvat', 'Etos', 'Sephora', 'De Bijenkorf', 'Parfumerie.nl'].map((retailer) => (
                <div key={retailer} className="text-gray-400 font-semibold text-lg">
                  {retailer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-rose-900 to-pink-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-0 px-4 py-2">
            🎯 Exclusieve Beauty Deals
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mis Nooit Meer een Beauty Deal
          </h2>
          <p className="text-xl text-rose-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Krijg wekelijks een persoonlijke selectie van de beste beauty deals direct in je inbox. 
            <br />
            <strong className="text-white">Gemiddeld €50 besparing per maand!</strong>
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Je e-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 backdrop-blur-sm py-4 text-lg rounded-xl"
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 border-0 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Ja, ik wil besparen! 🚀
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-rose-100">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Geen spam
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                50,000+ subscribers
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Uitschrijven altijd mogelijk
              </span>
            </div>
          </form>
          
          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-rose-300 mb-2">€247</div>
              <p className="text-white/80">Gemiddelde jaarlijkse besparing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-pink-300 mb-2">50,000+</div>
              <p className="text-white/80">Tevreden newsletter abonnees</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-purple-300 mb-2">4.9/5</div>
              <p className="text-white/80">Beoordeling van onze service</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
