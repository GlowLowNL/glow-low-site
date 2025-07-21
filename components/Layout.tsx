import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              GlowLow
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Alle Producten
              </Link>
              <Link href="/products?onSale=true" className="text-muted-foreground hover:text-foreground transition-colors">
                Aanbiedingen
              </Link>
              <Link href="/products?category=Huidverzorging" className="text-muted-foreground hover:text-foreground transition-colors">
                Huidverzorging
              </Link>
              <Link href="/products?category=Make-up" className="text-muted-foreground hover:text-foreground transition-colors">
                Make-up
              </Link>
              <Link href="/products?category=Parfum" className="text-muted-foreground hover:text-foreground transition-colors">
                Parfum
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Zoeken</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Verlanglijst</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>{children}</main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GlowLow</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nederland's toonaangevende cosmetica prijsvergelijker. 
                Vind de beste deals op huidverzorging, make-up en parfum.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorieën</h4>
              <div className="space-y-2 text-sm">
                <Link href="/products?category=Huidverzorging" className="block text-muted-foreground hover:text-foreground">
                  Huidverzorging
                </Link>
                <Link href="/products?category=Make-up" className="block text-muted-foreground hover:text-foreground">
                  Make-up
                </Link>
                <Link href="/products?category=Parfum" className="block text-muted-foreground hover:text-foreground">
                  Parfum
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Populaire Merken</h4>
              <div className="space-y-2 text-sm">
                <Link href="/products?brand=The+Ordinary" className="block text-muted-foreground hover:text-foreground">
                  The Ordinary
                </Link>
                <Link href="/products?brand=Glossier" className="block text-muted-foreground hover:text-foreground">
                  Glossier
                </Link>
                <Link href="/products?brand=Lancôme" className="block text-muted-foreground hover:text-foreground">
                  Lancôme
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Bedrijf</h4>
              <div className="space-y-2 text-sm">
                <Link href="/disclaimer" className="block text-muted-foreground hover:text-foreground">
                  Disclaimer
                </Link>
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                  Privacybeleid
                </Link>
                <a href="mailto:info@glowlow.nl" className="block text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} GlowLow. Alle rechten voorbehouden.
            </p>
            <p className="mt-2">
              Deze site gebruikt <strong>affiliate links</strong> om commissie te verdienen op aankopen.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
