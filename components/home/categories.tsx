import Link from "next/link";
import Image from "next/image";
import { getCategories } from '@/lib/mockApi';

// Image map for categories & fallbacks
const CATEGORY_IMAGES: Record<string,string> = {
  'huidverzorging': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=70',
  'reiniging': 'https://images.unsplash.com/photo-1601040129700-222d5e9f5b09?auto=format&fit=crop&w=800&q=70',
  'vochtinbrengende-crème': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=70',
  'serums': 'https://images.unsplash.com/photo-1601040129665-c9c30a06a98c?auto=format&fit=crop&w=800&q=70',
  'zonnebescherming': 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa1?auto=format&fit=crop&w=800&q=70',
  'anti-aging': 'https://images.unsplash.com/photo-1585386959984-a41552265c25?auto=format&fit=crop&w=800&q=70',
  'make-up': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=70',
  'foundation': 'https://images.unsplash.com/photo-1604791986431-a8f58b88e6b2?auto=format&fit=crop&w=800&q=70',
  'mascara': 'https://images.unsplash.com/photo-1600185365809-297d5f06b19b?auto=format&fit=crop&w=800&q=70',
  'lipstick': 'https://images.unsplash.com/photo-1585386959984-a41552265c25?auto=format&fit=crop&w=800&q=70',
  'parfum': 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=70',
  'damesparfum': 'https://images.unsplash.com/photo-1600185365809-297d5f06b19b?auto=format&fit=crop&w=800&q=70',
  'herenparfum': 'https://images.unsplash.com/photo-1611934793324-04993999565e?auto=format&fit=crop&w=800&q=70',
  'unisex': 'https://images.unsplash.com/photo-1585386959984-a41552265c25?auto=format&fit=crop&w=800&q=70',
  'eau-de-parfum': 'https://images.unsplash.com/photo-1611934793324-04993999565e?auto=format&fit=crop&w=800&q=70',
  'eau-de-toilette': 'https://images.unsplash.com/photo-1595616810408-5b6b32eac34d?auto=format&fit=crop&w=800&q=70',
  'lichaamsspray': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=70',
  'haarparfum': 'https://images.unsplash.com/photo-1601040129700-222d5e9f5b09?auto=format&fit=crop&w=800&q=70'
};

export default async function Categories() {
  const categories = await getCategories();
  // Flatten into top-level objects with up to 4 subcategories to show
  const items = categories.map(cat => {
    const slug = cat.slug;
    const image = CATEGORY_IMAGES[slug] || CATEGORY_IMAGES['huidverzorging'];
    return { name: cat.name, slug, href: `/category/${slug}`, image, subs: (cat.children || []).slice(0,4) };
  });

  if (!items.length) return null;

  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Shop op categorie</h2>
          <p className="text-muted-foreground">Ontdek de beste deals in elke beautygroep</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(category => (
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
                  {category.subs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {category.subs.map(sc => (
                        <span key={sc.slug} className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white/90">
                          {sc.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
