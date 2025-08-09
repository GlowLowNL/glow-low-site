"use client";
import { Search } from "../search";
import Link from "next/link";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: '/category/huidverzorging', label: 'Huidverzorging' },
    { href: '/category/make-up', label: 'Make-up' },
    { href: '/category/parfum', label: 'Parfum' }
  ];
  return (
    <header className="py-4 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 gap-4">
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">GlowLow</Link>
        </div>
        <div className="flex-1 flex justify-center px-4 max-w-xl w-full">
          <Search />
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-gray-600 hover:text-purple-600 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-white/70"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-700 hover:text-purple-600"
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
