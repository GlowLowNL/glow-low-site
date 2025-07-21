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
        <title>GlowLow – Dé cosmetica prijsvergelijker van Nederland</title>
        <meta
          name="description"
          content="Vergelijk cosmetica prijzen van alle Nederlandse webshops. Vind de beste deals op make-up, huidverzorging en parfum van merken zoals The Ordinary, Glossier en meer."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-6xl font-extrabold text-rose-600 mb-6">
            GlowLow
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Vergelijk cosmetica prijzen van alle Nederlandse webshops. 
            <br />
            Vind de beste deals op huidverzorging, make-up en parfum – alles op één plek.
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Zoek producten of merken..."
                className="pl-12 py-3 text-lg rounded-full border-2 border-rose-200 focus:border-rose-400"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const query = e.currentTarget.value;
                    window.location.href = `/products?q=${encodeURIComponent(query)}`;
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/products">
                Alle Producten Bekijken
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/products?onSale=true">
                <TrendingDown className="w-4 h-4 mr-2" />
                Bekijk Aanbiedingen
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Slim Zoeken</h3>
              <p className="text-gray-600">
                Vind elk cosmetica product direct met onze slimme zoekmachine door duizenden artikelen.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prijsbeweging</h3>
              <p className="text-gray-600">
                Volg prijsveranderingen en ontvang meldingen wanneer je favoriete producten in de aanbieding zijn.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Kopen</h3>
              <p className="text-gray-600">
                Klik direct door naar webshops om te kopen tegen de beste beschikbare prijs.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Krijg Vroege Toegang
            </h2>
            <p className="text-gray-600 mb-6">
              Wees de eerste die het weet wanneer we live gaan met alle prijsvergelijkingsfuncties.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Input
                required
                type="email"
                placeholder="jij@voorbeeld.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 rounded-full px-5 py-3 text-lg shadow border border-gray-300"
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8 py-3 text-lg font-semibold"
              >
                Houd me op de hoogte
              </Button>
            </form>

            <p className="mt-3 text-sm text-gray-500">
              Geen spam. Één e-mail zodra we live gaan.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
