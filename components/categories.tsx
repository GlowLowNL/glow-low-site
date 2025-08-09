import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Huidverzorging",
      href: "/huidverzorging",
      description: "Reinigen, hydrateren en beschermen",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop"
    },
    {
      name: "Make-up",
      href: "/make-up", 
      description: "Foundation, lipstick en meer",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      name: "Parfum",
      href: "/parfum",
      description: "Dames, heren en unisex geuren",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Shop op categorie
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek de beste deals in elke beautygroep
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
