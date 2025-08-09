import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl animate-pulse [animation-delay:1.5s]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white" />
      <div className="relative container mx-auto px-4 pt-24 pb-28 md:pt-32 md:pb-40 text-center max-w-5xl">
        <span className="inline-flex items-center rounded-full border bg-white/80 px-4 py-1 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur shadow-sm mb-6">
          Beta • Vergelijk live prijzen
        </span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance">
          <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent">Slim beauty shoppen</span>{' '}
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500">zonder eindeloos zoeken</span>
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-600">
          GlowLow vergelijkt actuele prijzen van top retailers voor huidverzorging, make-up en parfum. Ontdek meteen waar jouw favorieten het voordeligst zijn.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#featured" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 px-8 text-sm font-medium text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50">Bekijk deals</a>
          <a href="#categories" className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white/70 backdrop-blur px-8 text-sm font-medium text-neutral-700 shadow-sm hover:border-neutral-400 hover:bg-white transition-colors">Categorieën</a>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <Stat kpi="80+" label="Mock producten" />
          <Stat kpi="120 dagen" label="Prijsgeschiedenis" />
          <Stat kpi={"3"} label="Hoofdcategorieën" />
          <Stat kpi={"Realtime"} label="Mock aanbiedingen" />
        </div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-sky-600 bg-clip-text text-transparent">{kpi}</div>
      <div className="mt-1 text-[11px] tracking-wide uppercase text-neutral-500 font-medium text-center">{label}</div>
    </div>
  );
}
