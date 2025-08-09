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
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
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
];

// --- API Simulation Functions ---

/**
 * Fetches a paginated list of all products.
 * In a real app, this would be an async API call.
 */
export const getProducts = async (
  filters: SearchFilters = {},
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<ProductWithOffers>> => {
  console.log('Fetching products with filters:', filters);

  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  // Apply filters (simple implementation)
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredProducts = filteredProducts.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }

  if (filters.brand && filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(p => filters.brand?.includes(p.brand));
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case 'rating_desc':
        filteredProducts.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  // Paginate results
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginatedData = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  return {
    data: paginatedData,
    page,
    pageSize,
    total,
    totalPages,
  };
};

/**
 * Fetches a single product by its ID.
 */
export const getProductById = async (id: string): Promise<ProductWithOffers | undefined> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = mockProducts.find(p => p.id === id);
  console.log(`Fetching product by id: ${id}`, product);
  return product;
};

/**
 * Fetches the price history for a product.
 */
export const getPriceHistory = async (productId: string, days = 30): Promise<PriceHistory> => {
  // Simulate async delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const history: { date: string; price: number }[] = [];
  const today = new Date();
  const basePrice = mockProducts.find(p => p.id === productId)?.lowestPrice || 50;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Simulate price fluctuation
    const fluctuation = (Math.random() - 0.5) * (basePrice * 0.1);
    const price = parseFloat((basePrice + fluctuation).toFixed(2));
    
    history.push({
      date: date.toISOString().split('T')[0],
      price,
    });
  }

  console.log(`Fetching price history for product: ${productId} (last ${days} days)`);

  return {
    productId,
    history,
  };
};

/**
 * Fetches all available categories.
 */
export const getCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories;
}

/**
 * Fetches all available brands.
 */
export const getBrands = async (): Promise<Brand[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockBrands;
}
