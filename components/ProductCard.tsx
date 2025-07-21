import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductWithOffers } from '@/types/product';
import { Star, ExternalLink, Heart, TrendingDown, Eye } from 'lucide-react';

interface ProductCardProps {
  product: ProductWithOffers;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const lowestOffer = product.offers?.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest
  );
  
  const hasDiscount = lowestOffer?.isOnSale && lowestOffer?.originalPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((lowestOffer.originalPrice! - lowestOffer.price) / lowestOffer.originalPrice!) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-300">
              {product.brand?.charAt(0)}
            </div>
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              asChild 
              size="sm" 
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                Bekijk Details
              </Link>
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">
              -{discountPercentage}%
            </Badge>
          )}
          {product.offers && product.offers.length > 1 && (
            <Badge variant="secondary" className="bg-blue-500 text-white">
              {product.offers.length} winkels
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white border-0 shadow-md"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-600 mb-1 font-medium">{product.brand}</p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Volume */}
        {product.volume && (
          <p className="text-xs text-gray-500 mb-2">{product.volume}</p>
        )}
        
        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(product.averageRating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {product.averageRating} ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
              €{lowestOffer?.price.toFixed(2)}
            </span>
            {hasDiscount && lowestOffer?.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                €{lowestOffer.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.offers && product.offers.length > 1 && (
            <p className="text-xs text-gray-500">
              Vergelijk bij {product.offers.length} winkels
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1 bg-rose-600 hover:bg-rose-700">
            <Link href={`/products/${product.id}`}>
              Vergelijk Prijzen
            </Link>
          </Button>
          
          {lowestOffer && (
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="px-3"
            >
              <a 
                href={lowestOffer.productUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
