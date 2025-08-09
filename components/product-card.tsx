import Link from "next/link";
import Image from "next/image";
import { ProductWithOffers } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithOffers;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ease-in-out group-hover:shadow-lg">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="p-4">
          <p className="mb-1 text-sm font-medium text-muted-foreground">{product.brand}</p>
          <h3 className="mb-2 font-semibold leading-tight text-card-foreground">{product.name}</h3>
          <p className="font-bold text-primary">{product.priceRange}</p>
        </div>
      </div>
    </Link>
  );
}
