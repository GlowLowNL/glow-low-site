import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductWithOffers } from '@/types/product';
import { ExternalLink, TrendingDown, Star } from 'lucide-react';

interface ProductCardProps {
  product: ProductWithOffers;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const lowestOffer = product.offers?.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest
  );
  
  const onSaleOffers = product.offers?.filter(offer => offer.isOnSale) || [];
  const hasDiscount = onSaleOffers.length > 0;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              <TrendingDown className="w-3 h-3 mr-1" />
              Sale
            </Badge>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
          <CardTitle className="text-sm leading-tight line-clamp-2">
            <Link href={`/products/${product.id}`} className="hover:text-primary">
              {product.name}
            </Link>
          </CardTitle>
          
          {product.volume && (
            <p className="text-xs text-muted-foreground">{product.volume}</p>
          )}
          
          {product.averageRating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {product.averageRating} ({product.reviewCount})
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              €{lowestOffer?.price.toFixed(2)}
            </span>
            {hasDiscount && lowestOffer?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{lowestOffer.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.offers && product.offers.length > 1 && (
            <p className="text-xs text-muted-foreground">
              {product.offers.length} stores • {product.priceRange}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/products/${product.id}`}>
              Compare Prices
            </Link>
          </Button>
          
          {lowestOffer && (
            <Button asChild variant="outline" size="sm">
              <a 
                href={lowestOffer.productUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                {lowestOffer.retailerName}
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
