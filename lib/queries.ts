// React Query hooks for data fetching

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { 
  ProductWithOffers, 
  PriceHistory, 
  Category, 
  Brand, 
  SearchFilters,
  PaginatedResponse 
} from '../types/product';
import { mockApi } from './mockApi';

// Query keys
export const queryKeys = {
  products: (filters: SearchFilters, page: number, limit: number) => 
    ['products', filters, page, limit] as const,
  product: (id: string) => ['product', id] as const,
  priceHistory: (productId: string, retailerId: string, days: number) => 
    ['priceHistory', productId, retailerId, days] as const,
  categories: () => ['categories'] as const,
  brands: () => ['brands'] as const,
};

// Hooks
export const useProducts = (
  filters: SearchFilters = {},
  page = 1,
  limit = 20,
  options?: UseQueryOptions<PaginatedResponse<ProductWithOffers>>
) => {
  return useQuery({
    queryKey: queryKeys.products(filters, page, limit),
    queryFn: () => mockApi.getProducts(filters, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useProduct = (
  id: string,
  options?: UseQueryOptions<ProductWithOffers | null>
) => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => mockApi.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const usePriceHistory = (
  productId: string,
  retailerId: string,
  days = 30,
  options?: UseQueryOptions<PriceHistory>
) => {
  return useQuery({
    queryKey: queryKeys.priceHistory(productId, retailerId, days),
    queryFn: () => mockApi.getPriceHistory(productId, retailerId, days),
    enabled: !!productId && !!retailerId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

export const useCategories = (options?: UseQueryOptions<Category[]>) => {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: () => mockApi.getCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
};

export const useBrands = (options?: UseQueryOptions<Brand[]>) => {
  return useQuery({
    queryKey: queryKeys.brands(),
    queryFn: () => mockApi.getBrands(),
    staleTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
};
