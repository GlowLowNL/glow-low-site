import { PriceOffer } from "@/types/product";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OffersListProps {
  offers: PriceOffer[];
}

export function OffersList({ offers }: OffersListProps) {
  if (!offers || offers.length === 0) {
    return <p className="text-muted-foreground text-sm">Momenteel geen aanbiedingen gevonden.</p>;
  }

  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  const lowest = sortedOffers[0]?.price;

  return (
    <div className="space-y-3">
      {sortedOffers.map((offer) => {
        const isBest = offer.price === lowest;
        return (
          <a
            key={offer.id}
            href={offer.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("flex items-center justify-between rounded-xl border p-4 text-card-foreground transition-all duration-200 hover:shadow-md bg-card/70 backdrop-blur", isBest && "ring-1 ring-primary/40")}
          >
            <div>
              <p className="font-medium flex items-center gap-2">
                {offer.retailerName}
                {isBest && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Laagste</span>}
              </p>
              {offer.isOnSale && offer.originalPrice && (
                <p className="text-xs text-muted-foreground mt-1">
                  Was <span className="line-through">€{offer.originalPrice.toFixed(2)}</span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold text-primary">€{offer.price.toFixed(2)}</p>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Bekijk bij ${offer.retailerName}`}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </a>
        );
      })}
    </div>
  );
}
