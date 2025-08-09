"use client";

import { ProductWithOffers } from "@/types/product";
import Image from "next/image";
import { OffersList } from "./offers-list";
import { PriceHistoryChart } from "./price-history-chart";

interface ProductPageProps {
  product: ProductWithOffers;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image Gallery */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Details */}
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mb-6 text-muted-foreground">{product.description}</p>
          
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Verkooppunten</h2>
            <OffersList offers={product.offers} />
          </div>

          <div className="mb-8">
             <h2 className="mb-3 text-lg font-semibold">Prijsgeschiedenis (30 dagen)</h2>
             <PriceHistoryChart productId={product.id} />
          </div>

        </div>
      </div>
    </div>
  );
}
