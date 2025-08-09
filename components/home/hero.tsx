import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-sky-50" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]" />
      <div className="absolute -top-20 -left-24 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="relative container mx-auto px-4 pt-24 pb-28 md:pt-32 md:pb-40 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
          Vergelijk beauty prijzen slimmer
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-600 max-w-2xl mx-auto">
          Vind direct de beste prijs voor huidverzorging, make-up en parfum bij bekende winkels – zonder eindeloos tabbladen.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#featured" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 px-8 text-sm font-medium text-white shadow hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50">Bekijk deals</a>
          <a href="#categories" className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white/70 backdrop-blur px-8 text-sm font-medium text-neutral-700 shadow-sm hover:border-neutral-400 hover:bg-white transition-colors">Categorieën</a>
        </div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) { return null }
