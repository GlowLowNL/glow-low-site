// Core types for Glowlow platform

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description?: string;
  imageUrl: string;
  volume?: string;
  color?: string;
  sku?: string;
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PriceOffer {
  id: string;
  productId: string;
  retailerId: string;
  retailerName: string;
  retailerLogo?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  isOnSale: boolean;
  saleEndDate?: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  productUrl: string;
  shippingInfo?: string;
  lastUpdated: string;
}

export interface PriceHistory {
  productId: string;
  retailerId: string;
  entries: PriceHistoryEntry[];
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
  isOnSale: boolean;
}

export interface ProductWithOffers extends Product {
  offers: PriceOffer[];
  lowestPrice?: number;
  highestPrice?: number;
  priceRange?: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  onSaleOnly?: boolean;
  inStockOnly?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'brand' | 'newest';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
}

export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
}

// API Response types
export type ProductsResponse = PaginatedResponse<ProductWithOffers>;
export type ProductDetailResponse = ProductWithOffers;
export type PriceHistoryResponse = PriceHistory;
export type CategoriesResponse = Category[];
export type BrandsResponse = Brand[];
