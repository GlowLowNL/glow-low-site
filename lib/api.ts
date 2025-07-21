// API configuration and endpoints

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  products: '/products',
  productDetail: (id: string) => `/products/${id}`,
  priceHistory: (id: string) => `/price-history/${id}`,
  categories: '/categories',
  brands: '/brands',
  search: '/search',
} as const;

export const buildApiUrl = (endpoint: string, params?: Record<string, any>) => {
  const url = new URL(endpoint, API_BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};
