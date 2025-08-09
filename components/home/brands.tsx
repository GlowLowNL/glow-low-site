export default function Brands() {
  const brands = [
    { name: "The Ordinary", logo: "TO" },
    { name: "CeraVe", logo: "CV" },
    { name: "Lancôme", logo: "LC" },
    { name: "YSL", logo: "YSL" },
    { name: "NIVEA", logo: "NV" },
    { name: "L'Oréal", logo: "LO" },
    { name: "Maybelline", logo: "MB" },
    { name: "Clinique", logo: "CL" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Populaire merken
          </h2>
          <p className="text-muted-foreground">
            Van luxe tot toegankelijk – vergelijk alle topmerken
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {brands.map((brand) => (
            <div key={brand.name} className="group relative">
              <div className="rounded-2xl border bg-card/60 backdrop-blur p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-muted to-muted/40 text-xs font-bold text-muted-foreground ring-1 ring-border group-hover:scale-105 transition-transform">
                  {brand.logo}
                </div>
                <p className="text-sm font-medium text-foreground/90 group-hover:text-foreground">
                  {brand.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
