import Link from "next/link";
import Image from "next/image";
import { ProductWithOffers } from "@/types/product";
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface ProductCardProps {
  product: ProductWithOffers;
  className?: string;
}

const FALLBACK_IMAGE = "/fallback-product.png";

export function ProductCard({ product, className }: ProductCardProps) {
  const [broken, setBroken] = useState(false);
  const raw = product.imageUrl || FALLBACK_IMAGE;
  const httpSrc = raw.startsWith('http') ? raw : FALLBACK_IMAGE;
  const base = broken ? FALLBACK_IMAGE : httpSrc;
  const finalSrc = base.includes('unsplash.com') ? `${base}&auto=format&fit=crop&w=600&h=600&q=80` : base;
  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative aspect-square w-full">
          <Image
            src={finalSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 [image-rendering:high-quality]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            priority={false}
            onError={() => setBroken(true)}
            placeholder="empty"
            quality={80}
          />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <div className="p-4">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{product.brand}</p>
          <h3 className="mb-2 font-semibold leading-snug text-sm text-card-foreground line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
          <p className="font-bold text-sm text-primary">{product.priceRange}</p>
        </div>
      </div>
    </Link>
  );
}
