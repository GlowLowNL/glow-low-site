import { PriceOffer } from "@/types/product";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface OffersListProps {
  offers: PriceOffer[];
}

export function OffersList({ offers }: OffersListProps) {
  if (!offers || offers.length === 0) {
    return <p className="text-muted-foreground">Momenteel geen aanbiedingen gevonden.</p>;
  }

  // Sort offers by price, ascending
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);

  return (
    <div className="space-y-3">
      {sortedOffers.map((offer) => (
        <a
          key={offer.id}
          href={offer.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground transition-shadow hover:shadow-md"
        >
          <div>
            <p className="font-semibold">{offer.retailerName}</p>
            {offer.isOnSale && offer.originalPrice && (
              <p className="text-sm text-muted-foreground">
                Was <span className="line-through">€{offer.originalPrice.toFixed(2)}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold text-primary">€{offer.price.toFixed(2)}</p>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </a>
      ))}
    </div>
  );
}
