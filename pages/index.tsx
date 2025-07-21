import { useState, type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingDown, Star, ExternalLink } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("emails").insert({ email });

    if (error) {
      alert("Oeps! Dit e-mailadres staat al op de lijst 🚀");
    } else {
      alert("Bedankt! Je hoort van ons bij de lancering 🥳");
      setEmail("");
    }
  };

  return (
    <>
      <Head>
        <title>GlowLow – Find the Best Beauty Deals Across Europe</title>
        <meta
          name="description"
          content="Compare beauty and skincare prices across European retailers. Find the lowest prices on makeup, skincare, and fragrance from brands like The Ordinary, Glossier, and more."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-rose-600">
              GlowLow
            </Link>
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products?onSale=true">Deals</Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-6xl font-extrabold text-rose-600 mb-6">
            GlowLow
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Compare beauty prices across Europe's top retailers. 
            <br />
            Find the best deals on skincare, makeup, and fragrance – all in one place.
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for products or brands..."
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
                Browse All Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/products?onSale=true">
                <TrendingDown className="w-4 h-4 mr-2" />
                View Sale Items
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
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find any beauty product instantly with our intelligent search across thousands of items.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Price Tracking</h3>
              <p className="text-gray-600">
                Monitor price changes and get alerts when your favorite products go on sale.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Purchase</h3>
              <p className="text-gray-600">
                Click through directly to retailers to purchase at the best available price.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Early Access
            </h2>
            <p className="text-gray-600 mb-6">
              Be the first to know when we launch with full price comparison features.
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
              Geen spam. Eén mailtje zodra we live gaan.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} GlowLow ·{" "}
            <a href="/disclaimer" className="underline mx-1">Disclaimer</a> ·{" "}
            <a href="/privacy" className="underline mx-1">Privacy</a> ·{" "}
            <a href="mailto:info@glowlow.nl" className="underline">Contact</a>
            <br />
            <span className="italic mt-2 block">
              Deze site gebruikt <strong>Awin</strong> affiliate-links.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
