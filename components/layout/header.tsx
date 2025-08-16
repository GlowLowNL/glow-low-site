"use client";
import { Search } from "../home/search";
import Link from "next/link";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: '/products', label: 'Alle Producten' },
    { href: '/douglas', label: 'Douglas Premium' },
    { href: '/demo', label: 'Demo Features' },
    { href: '/category/huidverzorging', label: 'Huidverzorging' },
    { href: '/category/make-up', label: 'Make-up' },
    { href: '/category/parfum', label: 'Parfum' }
  ];
  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-rose-50 to-sky-50 backdrop-blur supports-[backdrop-filter]:bg-white/40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-pink-200/60 via-fuchsia-200/50 to-sky-200/60" />
      <div className="container relative mx-auto flex justify-between items-center px-4 gap-4 py-3">
        <div className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-fuchsia-600 to-sky-600">
          <Link href="/">GlowLow</Link>
        </div>
        <div className="flex-1 flex justify-center px-4 max-w-xl w-full">
          <Search />
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-neutral-600 hover:text-neutral-900 hover:underline decoration-pink-400/60 underline-offset-4 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center rounded-md border border-pink-200/60 bg-white/60 px-3 py-2 text-neutral-700 shadow-sm hover:bg-white/80 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/60"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden backdrop-blur-sm bg-white/80 border-t border-pink-100/60">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-neutral-700 hover:text-neutral-900 hover:underline decoration-pink-400/60 underline-offset-4"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
