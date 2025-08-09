import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,182,193,0.25),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(186,230,253,0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      <div className="relative container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center max-w-4xl">
        <span className="inline-flex items-center rounded-full border bg-white/60 px-4 py-1 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur shadow-sm mb-6">
          Beta • Altijd de laagste prijs ontdekken
        </span>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
          Vind & vergelijk beauty prijzen in seconden
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
          GlowLow doorzoekt top retailers zodat jij meteen ziet waar jouw favoriete huidverzorging, make-up of parfum het voordeligst is. Slim besparen zonder eindeloos tabbladen.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#featured" className="inline-flex h-11 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white shadow hover:bg-black/90 transition-colors">Bekijk deals</a>
          <a href="#categories" className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white/70 backdrop-blur px-8 text-sm font-medium text-neutral-700 shadow-sm hover:border-neutral-400 hover:bg-white transition-colors">Categorieën</a>
        </div>
      </div>
    </section>
  );
}
