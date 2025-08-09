"use client";

import { ProductWithOffers } from "@/types/product";
import Image from "next/image";
import { OffersList } from "./offers-list";
import { PriceHistoryChart } from "./price-history-chart";

interface ProductPageProps {
  product: ProductWithOffers;
}

export function ProductPage({ product }: ProductPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    image: product.imageUrl,
    description: product.description,
    offers: product.offers.map((o) => ({
      "@type": "Offer",
      priceCurrency: o.currency,
      price: o.price,
      url: o.productUrl,
      availability:
        "https://schema.org/" +
        (o.stockStatus === "in_stock" ? "InStock" : "OutOfStock"),
    })),
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Image Gallery */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-muted to-muted/40">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Product Details */}
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mb-5 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {product.name}
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">Verkooppunten</h2>
            <OffersList offers={product.offers} />
          </div>

          <div className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">
              Prijsgeschiedenis (30 dagen)
            </h2>
            <PriceHistoryChart productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
