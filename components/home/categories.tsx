import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  const categories = [
    {
      name: "Huidverzorging",
      href: "/category/huidverzorging",
      description: "Reinigen, hydrateren en beschermen",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop"
    },
    {
      name: "Make-up",
      href: "/category/make-up", 
      description: "Foundation, lipstick en meer",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      name: "Parfum",
      href: "/category/parfum",
      description: "Dames, heren en unisex geuren",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Shop op categorie</h2>
          <p className="text-muted-foreground">Ontdek de beste deals in elke beautygroep</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group relative rounded-3xl border overflow-hidden bg-card/70 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-xl">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 400px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white text-xl font-semibold drop-shadow mb-1 flex items-center gap-2">
                    {category.name}
                    <span className="inline-block h-5 w-5 rounded-full bg-white/20 text-[10px] leading-5 text-center font-medium">→</span>
                  </h3>
                  <p className="text-white/80 text-sm leading-snug line-clamp-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
