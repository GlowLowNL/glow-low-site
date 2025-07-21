// Mock data service for development - replace with real API calls later

import { 
  Product, 
  ProductWithOffers, 
  PriceOffer, 
  PriceHistory, 
  Category, 
  Brand, 
  SearchFilters,
  PaginatedResponse 
} from '../types/product';

// Mock data
const mockBrands: Brand[] = [
  { id: '1', name: 'The Ordinary', slug: 'the-ordinary', logoUrl: '/brands/ordinary.png' },
  { id: '2', name: 'Glossier', slug: 'glossier', logoUrl: '/brands/glossier.png' },
  { id: '3', name: 'Fenty Beauty', slug: 'fenty-beauty', logoUrl: '/brands/fenty.png' },
  { id: '4', name: 'Charlotte Tilbury', slug: 'charlotte-tilbury', logoUrl: '/brands/ct.png' },
  { id: '5', name: 'Drunk Elephant', slug: 'drunk-elephant', logoUrl: '/brands/de.png' },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Face and body skincare products',
    children: [
      { id: '1a', name: 'Cleansers', slug: 'cleansers', parentId: '1' },
      { id: '1b', name: 'Moisturizers', slug: 'moisturizers', parentId: '1' },
      { id: '1c', name: 'Serums', slug: 'serums', parentId: '1' },
      { id: '1d', name: 'Sunscreen', slug: 'sunscreen', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Makeup',
    slug: 'makeup',
    description: 'Face and eye makeup',
    children: [
      { id: '2a', name: 'Foundation', slug: 'foundation', parentId: '2' },
      { id: '2b', name: 'Concealer', slug: 'concealer', parentId: '2' },
      { id: '2c', name: 'Lipstick', slug: 'lipstick', parentId: '2' },
      { id: '2d', name: 'Mascara', slug: 'mascara', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Perfumes and body sprays',
  },
];

const mockProducts: ProductWithOffers[] = [
  {
    id: '1',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Skincare',
    subcategory: 'Serums',
    description: 'A high-strength vitamin and mineral blemish formula',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/e11d48?text=The+Ordinary',
    volume: '30ml',
    sku: 'TO-NIA-30',
    averageRating: 4.3,
    reviewCount: 12847,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '1a',
        productId: '1',
        retailerId: 'lookfantastic',
        retailerName: 'LookFantastic',
        price: 6.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://lookfantastic.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:00:00Z',
      },
      {
        id: '1b',
        productId: '1',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 7.99,
        originalPrice: 8.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-25T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://sephora.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:15:00Z',
      },
    ],
    lowestPrice: 6.90,
    highestPrice: 7.99,
    priceRange: '€6.90 - €7.99',
  },
  {
    id: '2',
    name: 'You Solid Perfume',
    brand: 'Glossier',
    category: 'Fragrance',
    description: 'A warm, spicy fragrance with notes of pink pepper and iris',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/ec4899?text=Glossier',
    volume: '8.5g',
    sku: 'GL-YOU-SOLID',
    averageRating: 4.5,
    reviewCount: 2341,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '2a',
        productId: '2',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 22.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/glossier-you-solid',
        lastUpdated: '2024-07-21T09:00:00Z',
      },
    ],
    lowestPrice: 22.00,
    highestPrice: 22.00,
    priceRange: '€22.00',
  },
];

// Mock price history data
const generatePriceHistory = (productId: string, retailerId: string): PriceHistory => {
  const entries = [];
  const basePrice = Math.random() * 20 + 10; // Random base price between 10-30
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const variation = (Math.random() - 0.5) * 4; // ±2 euro variation
    const price = Number((basePrice + variation).toFixed(2));
    const isOnSale = Math.random() < 0.2; // 20% chance of sale
    
    entries.push({
      date: date.toISOString().split('T')[0],
      price: isOnSale ? price * 0.8 : price,
      isOnSale,
    });
  }
  
  return { productId, retailerId, entries };
};

// API functions
export const mockApi = {
  async getProducts(filters: SearchFilters = {}, page = 1, limit = 20): Promise<PaginatedResponse<ProductWithOffers>> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }
    
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }
    
    if (filters.brand?.length) {
      filteredProducts = filteredProducts.filter(product => 
        filters.brand!.includes(product.brand)
      );
    }
    
    if (filters.priceMin !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        (product.lowestPrice || 0) >= filters.priceMin!
      );
    }
    
    if (filters.priceMax !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        (product.lowestPrice || 0) <= filters.priceMax!
      );
    }
    
    if (filters.onSaleOnly) {
      filteredProducts = filteredProducts.filter(product => 
        product.offers.some(offer => offer.isOnSale)
      );
    }
    
    if (filters.inStockOnly) {
      filteredProducts = filteredProducts.filter(product => 
        product.offers.some(offer => offer.stockStatus === 'in_stock')
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => (a.lowestPrice || 0) - (b.lowestPrice || 0));
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => (b.lowestPrice || 0) - (a.lowestPrice || 0));
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'brand':
          filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
          break;
        case 'newest':
          filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }
    
    // Pagination
    const total = filteredProducts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filteredProducts.slice(start, end);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
  
  async getProduct(id: string): Promise<ProductWithOffers | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(product => product.id === id) || null;
  },
  
  async getPriceHistory(productId: string, retailerId: string, days = 30): Promise<PriceHistory> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generatePriceHistory(productId, retailerId);
  },
  
  async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCategories;
  },
  
  async getBrands(): Promise<Brand[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockBrands;
  },
};
