import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from '@/lib/mockApi';

export default async function Categories() {
  const categories = await getCategories();
  if (!categories.length) return null;

  // Build category cards with representative product image from dataset
  const cards = await Promise.all(categories.map(async cat => {
    // fetch 1 top rated (or first) product for this category
    const resp = await getProducts({ category: cat.name, sortBy: 'rating_desc' }, 1, 1).catch(() => null);
    const img = resp?.data[0]?.imageUrl || '/fallback-product.png';
    return { 
      name: cat.name, 
      slug: cat.slug, 
      href: `/category/${cat.slug}`, 
      image: img
    };
  }));

  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Shop op categorie</h2>
          <p className="text-muted-foreground">Hoofdcategorieën uit de dataset</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(category => (
            <Link key={category.slug} href={category.href} className="group relative rounded-3xl border overflow-hidden bg-card/70 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-xl">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 400px"
                  priority={false}
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white text-xl font-semibold drop-shadow mb-2 flex items-center gap-2">
                    {category.name}
                    <span className="inline-block h-5 w-5 rounded-full bg-white/25 text-[10px] leading-5 text-center font-medium">→</span>
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
