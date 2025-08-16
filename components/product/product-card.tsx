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
    <Link 
      href={`/product/${product.id}`} 
      className={cn("group block transform transition-transform duration-200 hover:scale-[1.02]", className)}
    >
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        {/* Clean Image Container - Perfect Square */}
        <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          <SimpleImage
            src={product.imageUrl}
            alt={product.name}
            productType={product.subcategory}
            className="w-full h-full"
          />
        </div>
        
        {/* Clean Content Area */}
        <div className="p-4 space-y-2">
          {/* Brand - Subtle but clear */}
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
            {product.brand}
          </div>
          
          {/* Product Name - Clean typography */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-5 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          {/* Price - Prominent but elegant */}
          <div className="pt-1">
            <span className="text-base font-bold text-gray-900">
              {product.priceRange}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
