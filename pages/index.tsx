import { useState, type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingDown, Star, ExternalLink, ShoppingCart, Heart, Users, Zap, Shield, Clock } from "lucide-react";

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
      id: "1",
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      originalPrice: 7.50,
      currentPrice: 6.90,
      discount: 8,
      rating: 4.3,
      reviews: 1247,
      stores: 3
    },
    {
      id: "2", 
      name: "CeraVe Foaming Facial Cleanser",
      brand: "CeraVe",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      originalPrice: 13.99,
      currentPrice: 11.99,
      discount: 14,
      rating: 4.5,
      reviews: 892,
      stores: 4
    },
    {
      id: "3",
      name: "Maybelline Sky High Mascara", 
      brand: "Maybelline",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
      originalPrice: 14.99,
      currentPrice: 12.99,
      discount: 13,
      rating: 4.4,
      reviews: 756,
      stores: 5
    },
    {
      id: "4",
      name: "NIVEA Soft Vochtinbrengende Crème",
      brand: "NIVEA", 
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
      originalPrice: 4.29,
      currentPrice: 3.49,
      discount: 19,
      rating: 4.2,
      reviews: 1834,
      stores: 6
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
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Vind de <span className="text-rose-600">beste prijzen</span> voor je
              <br />
              <span className="text-pink-600">favoriete beauty producten</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Vergelijk prijzen van duizenden beauty producten bij alle Nederlandse webshops. 
              Bespaar tot 40% op make-up, huidverzorging en parfum.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative flex">
                <Input
                  type="text"
                  placeholder="Zoek naar producten, merken of categorieën..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-14 text-lg pr-4 pl-6 rounded-l-full border-2 border-rose-200 focus:border-rose-400 focus:ring-0"
                />
                <Button 
                  type="submit" 
                  className="h-14 px-8 rounded-r-full bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Zoeken
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-rose-600" />
                <span>5,000+ producten</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                <span>15+ webshops</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-rose-600" />
                <span>Tot 40% besparing</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>Dagelijks bijgewerkt</span>
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
          <h2 className="text-3xl font-bold text-center mb-12">Populaire Merken</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {topBrands.map((brand) => (
              <Link key={brand.name} href={`/products?brand=${encodeURIComponent(brand.name)}`}>
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors text-center">
                  <img src={brand.logo} alt={brand.name} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{brand.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom GlowLow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Altijd de Laagste Prijs</h3>
                <p className="text-gray-600">
                  We vergelijken prijzen van alle grote Nederlandse beauty retailers om je gegarandeerd de beste deal te bieden.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                <p className="text-gray-600">
                  Onze prijzen worden elk uur bijgewerkt, zodat je altijd de meest actuele informatie hebt.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">100% Gratis</h3>
                <p className="text-gray-600">
                  Geen verborgen kosten, geen account nodig. Vergelijk en bespaar direct zonder gedoe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mis Geen Enkele Deal</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Krijg wekelijks de beste beauty deals direct in je inbox. Geen spam, alleen echte besparingen.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Je e-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-gray-900"
              />
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                Aanmelden
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              Geen spam. Uitschrijven kan altijd.
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
