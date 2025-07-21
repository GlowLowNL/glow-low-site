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
  { id: '2', name: 'CeraVe', slug: 'cerave', logoUrl: '/brands/cerave.png' },
  { id: '3', name: 'Lancôme', slug: 'lancome', logoUrl: '/brands/lancome.png' },
  { id: '4', name: 'Yves Saint Laurent', slug: 'ysl', logoUrl: '/brands/ysl.png' },
  { id: '5', name: 'NIVEA', slug: 'nivea', logoUrl: '/brands/nivea.png' },
  { id: '6', name: 'L\'Oréal Paris', slug: 'loreal', logoUrl: '/brands/loreal.png' },
  { id: '7', name: 'Maybelline', slug: 'maybelline', logoUrl: '/brands/maybelline.png' },
  { id: '8', name: 'Garnier', slug: 'garnier', logoUrl: '/brands/garnier.png' },
  { id: '9', name: 'Clinique', slug: 'clinique', logoUrl: '/brands/clinique.png' },
  { id: '10', name: 'Estée Lauder', slug: 'estee-lauder', logoUrl: '/brands/estee.png' },
];

const mockRetailers = [
  { id: 'douglas', name: 'Douglas', url: 'https://douglas.nl' },
  { id: 'sephora', name: 'Sephora', url: 'https://sephora.nl' },
  { id: 'etos', name: 'Etos', url: 'https://etos.nl' },
  { id: 'kruidvat', name: 'Kruidvat', url: 'https://kruidvat.nl' },
  { id: 'bijenkorf', name: 'De Bijenkorf', url: 'https://bijenkorf.nl' },
  { id: 'parfumerie', name: 'Parfumerie', url: 'https://parfumerie.nl' },
  { id: 'ah', name: 'Albert Heijn', url: 'https://ah.nl' },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Huidverzorging',
    slug: 'huidverzorging',
    description: 'Gezichts- en lichaamsverzorging',
    children: [
      { id: '1a', name: 'Reiniging', slug: 'reiniging', parentId: '1' },
      { id: '1b', name: 'Vochtinbrengende Crème', slug: 'moisturizer', parentId: '1' },
      { id: '1c', name: 'Serums', slug: 'serums', parentId: '1' },
      { id: '1d', name: 'Zonnebescherming', slug: 'sunscreen', parentId: '1' },
      { id: '1e', name: 'Anti-Aging', slug: 'anti-aging', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Make-up',
    slug: 'make-up',
    description: 'Gezichts- en oogmake-up',
    children: [
      { id: '2a', name: 'Foundation', slug: 'foundation', parentId: '2' },
      { id: '2b', name: 'Concealer', slug: 'concealer', parentId: '2' },
      { id: '2c', name: 'Lipstick', slug: 'lipstick', parentId: '2' },
      { id: '2d', name: 'Mascara', slug: 'mascara', parentId: '2' },
      { id: '2e', name: 'Oogschaduw', slug: 'eyeshadow', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Parfum',
    slug: 'parfum',
    description: 'Dames-, heren- en unisex geuren',
    children: [
      { id: '3a', name: 'Damesparfum', slug: 'damesparfum', parentId: '3' },
      { id: '3b', name: 'Herenparfum', slug: 'herenparfum', parentId: '3' },
      { id: '3c', name: 'Unisex', slug: 'unisex', parentId: '3' },
    ],
  },
];

const mockProducts: ProductWithOffers[] = [
  {
    id: '1',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Huidverzorging',
    subcategory: 'Serums',
    description: 'Serum ter verbetering van de zichtbaarheid van poriën en onregelmatigheden',
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
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 6.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:00:00Z',
      },
      {
        id: '1b',
        productId: '1',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 7.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://sephora.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:15:00Z',
      },
      {
        id: '1c',
        productId: '1',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 6.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/the-ordinary-niacinamide',
        lastUpdated: '2024-07-21T08:30:00Z',
      },
    ],
    lowestPrice: 6.90,
    highestPrice: 7.50,
    priceRange: '€6.90 - €7.50',
  },
  {
    id: '2',
    name: 'Foaming Facial Cleanser',
    brand: 'CeraVe',
    category: 'Huidverzorging',
    subcategory: 'Reiniging',
    description: 'Schuimende gezichtsreiniger voor de normale tot vette huid',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/3b82f6?text=CeraVe',
    volume: '236ml',
    sku: 'CV-FOAM-236',
    averageRating: 4.5,
    reviewCount: 3421,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '2a',
        productId: '2',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 11.99,
        originalPrice: 13.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-31T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/cerave-foaming-cleanser',
        lastUpdated: '2024-07-21T09:00:00Z',
      },
      {
        id: '2b',
        productId: '2',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 12.49,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/cerave-foaming-cleanser',
        lastUpdated: '2024-07-21T09:15:00Z',
      },
    ],
    lowestPrice: 11.99,
    highestPrice: 12.49,
    priceRange: '€11.99 - €12.49',
  },
  {
    id: '3',
    name: 'La Vie Est Belle Eau de Parfum',
    brand: 'Lancôme',
    category: 'Parfum',
    subcategory: 'Damesparfum',
    description: 'Iconische damesparfum met iris, jasmijn en oranjebloesem',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/ec4899?text=Lancôme',
    volume: '50ml',
    sku: 'LC-LVEB-50',
    averageRating: 4.7,
    reviewCount: 5632,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '3a',
        productId: '3',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 89.95,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/lancome-la-vie-est-belle',
        lastUpdated: '2024-07-21T10:00:00Z',
      },
      {
        id: '3b',
        productId: '3',
        retailerId: 'bijenkorf',
        retailerName: 'De Bijenkorf',
        price: 89.95,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://bijenkorf.nl/lancome-la-vie-est-belle',
        lastUpdated: '2024-07-21T10:15:00Z',
      },
      {
        id: '3c',
        productId: '3',
        retailerId: 'parfumerie',
        retailerName: 'Parfumerie',
        price: 92.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://parfumerie.nl/lancome-la-vie-est-belle',
        lastUpdated: '2024-07-21T10:30:00Z',
      },
    ],
    lowestPrice: 89.95,
    highestPrice: 92.50,
    priceRange: '€89.95 - €92.50',
  },
  {
    id: '4',
    name: 'Rouge Pur Couture Lipstick',
    brand: 'Yves Saint Laurent',
    category: 'Make-up',
    subcategory: 'Lipstick',
    description: 'Luxe lipstick met intense kleur en langdurige formule',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/ef4444?text=YSL',
    volume: '3.8g',
    sku: 'YSL-RPC-01',
    averageRating: 4.6,
    reviewCount: 1234,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '4a',
        productId: '4',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 42.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/ysl-rouge-pur-couture',
        lastUpdated: '2024-07-21T11:00:00Z',
      },
      {
        id: '4b',
        productId: '4',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 42.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'low_stock',
        productUrl: 'https://sephora.nl/ysl-rouge-pur-couture',
        lastUpdated: '2024-07-21T11:15:00Z',
      },
    ],
    lowestPrice: 42.99,
    highestPrice: 42.99,
    priceRange: '€42.99',
  },
  {
    id: '5',
    name: 'Soft Vochtinbrengende Crème',
    brand: 'NIVEA',
    category: 'Huidverzorging',
    subcategory: 'Vochtinbrengende Crème',
    description: 'Lichte, snelabsorberende crème voor gezicht, lichaam en handen',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/0ea5e9?text=NIVEA',
    volume: '200ml',
    sku: 'NV-SOFT-200',
    averageRating: 4.2,
    reviewCount: 8765,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '5a',
        productId: '5',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 3.49,
        originalPrice: 4.29,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-28T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/nivea-soft',
        lastUpdated: '2024-07-21T12:00:00Z',
      },
      {
        id: '5b',
        productId: '5',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 3.69,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/nivea-soft',
        lastUpdated: '2024-07-21T12:15:00Z',
      },
      {
        id: '5c',
        productId: '5',
        retailerId: 'ah',
        retailerName: 'Albert Heijn',
        price: 3.89,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://ah.nl/nivea-soft',
        lastUpdated: '2024-07-21T12:30:00Z',
      },
    ],
    lowestPrice: 3.49,
    highestPrice: 3.89,
    priceRange: '€3.49 - €3.89',
  },
  {
    id: '6',
    name: 'True Match Foundation',
    brand: 'L\'Oréal Paris',
    category: 'Make-up',
    subcategory: 'Foundation',
    description: 'Foundation die zich aanpast aan je natuurlijke huidskleur',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/f59e0b?text=L\'Oréal',
    volume: '30ml',
    sku: 'LOP-TM-1N',
    averageRating: 4.1,
    reviewCount: 2567,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '6a',
        productId: '6',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 14.99,
        originalPrice: 16.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-01T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/loreal-true-match',
        lastUpdated: '2024-07-21T13:00:00Z',
      },
      {
        id: '6b',
        productId: '6',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 16.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/loreal-true-match',
        lastUpdated: '2024-07-21T13:15:00Z',
      },
    ],
    lowestPrice: 14.99,
    highestPrice: 16.99,
    priceRange: '€14.99 - €16.99',
  },
  {
    id: '7',
    name: 'Sky High Mascara',
    brand: 'Maybelline',
    category: 'Make-up',
    subcategory: 'Mascara',
    description: 'Verlengend en volumegevend mascara voor dramatische wimpers',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/10b981?text=Maybelline',
    volume: '7.2ml',
    sku: 'MB-SKY-BLACK',
    averageRating: 4.4,
    reviewCount: 4321,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '7a',
        productId: '7',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 12.99,
        originalPrice: 14.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-30T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/maybelline-sky-high',
        lastUpdated: '2024-07-21T14:00:00Z',
      },
      {
        id: '7b',
        productId: '7',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 13.49,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/maybelline-sky-high',
        lastUpdated: '2024-07-21T14:15:00Z',
      },
    ],
    lowestPrice: 12.99,
    highestPrice: 13.49,
    priceRange: '€12.99 - €13.49',
  },
  {
    id: '8',
    name: 'Micellair Reinigingswater',
    brand: 'Garnier',
    category: 'Huidverzorging',
    subcategory: 'Reiniging',
    description: 'All-in-one micellair water voor het verwijderen van make-up',
    imageUrl: 'https://via.placeholder.com/400x400/f9fafb/06b6d4?text=Garnier',
    volume: '400ml',
    sku: 'GR-MIC-400',
    averageRating: 4.3,
    reviewCount: 6789,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '8a',
        productId: '8',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 5.99,
        originalPrice: 7.49,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-05T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/garnier-micellair',
        lastUpdated: '2024-07-21T15:00:00Z',
      },
      {
        id: '8b',
        productId: '8',
        retailerId: 'ah',
        retailerName: 'Albert Heijn',
        price: 6.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://ah.nl/garnier-micellair',
        lastUpdated: '2024-07-21T15:15:00Z',
      },
    ],
    lowestPrice: 5.99,
    highestPrice: 6.99,
    priceRange: '€5.99 - €6.99',
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
