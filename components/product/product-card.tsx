"use client";
import Link from "next/link";
import { ProductWithOffers } from "@/types/product";
import { cn } from "@/lib/utils";
import { SimpleImage } from './simple-image';

interface ProductCardProps {
  product: ProductWithOffers;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100">
          <SimpleImage
            src={product.imageUrl}
            alt={product.name}
            productType={product.subcategory}
            className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/10 via-transparent to-transparent" />
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
