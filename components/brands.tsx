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
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Populaire merken
          </h2>
          <p className="text-muted-foreground">
            Van luxe tot toegankelijk - vergelijk alle topmerken
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <div key={brand.name} className="group cursor-pointer">
              <div className="bg-white rounded-xl p-4 text-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold text-muted-foreground">
                  {brand.logo}
                </div>
                <p className="text-sm font-medium text-card-foreground">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
