"use client";

import { ProductWithOffers } from "@/types/product";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports (code splitting)
const OffersList = dynamic(
  () => import("./offers-list").then((m) => m.OffersList),
  {
    loading: () => (
      <div className="h-32 rounded-xl border bg-muted/40 animate-pulse" />
    ),
    ssr: true,
  }
);
const PriceHistoryChart = dynamic(
  () => import("./price-history-chart").then((m) => m.PriceHistoryChart),
  {
    loading: () => (
      <div className="h-72 rounded-xl border bg-muted/40 animate-pulse" />
    ),
    ssr: false, // chart can be client only
  }
);

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
        {/* Product Image */}
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

        {/* Details */}
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
            <Suspense
              fallback={
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl border bg-muted/40 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <OffersList offers={product.offers} />
            </Suspense>
          </div>

          <div className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">
              Prijsgeschiedenis (30 dagen)
            </h2>
            <PriceHistoryChart 
              productId={product.id} 
              currentPrice={product.offers[0]?.price} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
