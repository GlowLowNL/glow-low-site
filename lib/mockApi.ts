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
  {
    id: '3',
    name: 'La Vie Est Belle Eau de Parfum',
    brand: 'Lancôme',
    category: 'Parfum',
    subcategory: 'Damesparfum',
    description: 'Iconische damesparfum met iris, jasmijn en oranjebloesem',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1631214540230-9ed1af41b0e7?w=400&h=400&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
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
    ],
    lowestPrice: 5.99,
    highestPrice: 6.99,
    priceRange: '€5.99 - €6.99',
  },
  // Nieuwe producten vanaf hier
  {
    id: '9',
    name: 'Dramatically Different Moisturizing Lotion+',
    brand: 'Clinique',
    category: 'Huidverzorging',
    subcategory: 'Vochtinbrengende Crème',
    description: 'Versterkte versie van de iconische vochtinbrengende lotion',
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    volume: '125ml',
    sku: 'CL-DDML-125',
    averageRating: 4.5,
    reviewCount: 2156,
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '9a',
        productId: '9',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 32.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/clinique-dramatically-different',
        lastUpdated: '2024-07-21T16:00:00Z',
      },
      {
        id: '9b',
        productId: '9',
        retailerId: 'bijenkorf',
        retailerName: 'De Bijenkorf',
        price: 32.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://bijenkorf.nl/clinique-dramatically-different',
        lastUpdated: '2024-07-21T16:15:00Z',
      },
    ],
    lowestPrice: 32.50,
    highestPrice: 32.50,
    priceRange: '€32.50',
  },
  {
    id: '10',
    name: 'Double Wear Stay-in-Place Foundation',
    brand: 'Estée Lauder',
    category: 'Make-up',
    subcategory: 'Foundation',
    description: '24-uurs langdurige foundation met medium tot full coverage',
    imageUrl: 'https://images.unsplash.com/photo-1457972851602-65906c22e0a4?w=400&h=400&fit=crop',
    volume: '30ml',
    sku: 'EL-DW-1W1',
    averageRating: 4.6,
    reviewCount: 3891,
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '10a',
        productId: '10',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 46.95,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/estee-lauder-double-wear',
        lastUpdated: '2024-07-21T17:00:00Z',
      },
      {
        id: '10b',
        productId: '10',
        retailerId: 'bijenkorf',
        retailerName: 'De Bijenkorf',
        price: 46.95,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'low_stock',
        productUrl: 'https://bijenkorf.nl/estee-lauder-double-wear',
        lastUpdated: '2024-07-21T17:15:00Z',
      },
    ],
    lowestPrice: 46.95,
    highestPrice: 46.95,
    priceRange: '€46.95',
  },
  {
    id: '11',
    name: 'Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'Huidverzorging',
    subcategory: 'Serums',
    description: 'Hydraterende serum met hyaluronzuur voor alle huidtypen',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    volume: '30ml',
    sku: 'TO-HA-30',
    averageRating: 4.4,
    reviewCount: 8934,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '11a',
        productId: '11',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 8.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/the-ordinary-hyaluronic-acid',
        lastUpdated: '2024-07-21T18:00:00Z',
      },
      {
        id: '11b',
        productId: '11',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 9.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://sephora.nl/the-ordinary-hyaluronic-acid',
        lastUpdated: '2024-07-21T18:15:00Z',
      },
    ],
    lowestPrice: 8.90,
    highestPrice: 9.50,
    priceRange: '€8.90 - €9.50',
  },
  {
    id: '12',
    name: 'Lash Sensational Mascara',
    brand: 'Maybelline',
    category: 'Make-up',
    subcategory: 'Mascara',
    description: 'Waaier-vormige wimperborsteltje voor volle, gedefinieerde wimpers',
    imageUrl: 'https://images.unsplash.com/photo-1631214540230-9ed1af41b0e7?w=400&h=400&fit=crop',
    volume: '9.5ml',
    sku: 'MB-LS-BLACK',
    averageRating: 4.2,
    reviewCount: 5432,
    createdAt: '2024-02-28T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '12a',
        productId: '12',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 10.99,
        originalPrice: 12.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-10T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/maybelline-lash-sensational',
        lastUpdated: '2024-07-21T19:00:00Z',
      },
      {
        id: '12b',
        productId: '12',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 11.49,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/maybelline-lash-sensational',
        lastUpdated: '2024-07-21T19:15:00Z',
      },
    ],
    lowestPrice: 10.99,
    highestPrice: 11.49,
    priceRange: '€10.99 - €11.49',
  },
  {
    id: '13',
    name: 'Color Riche Lipstick',
    brand: 'L\'Oréal Paris',
    category: 'Make-up',
    subcategory: 'Lipstick',
    description: 'Intense kleur en verzorging in één luxe lipstick',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    volume: '3.6g',
    sku: 'LOP-CR-RED',
    averageRating: 4.3,
    reviewCount: 3210,
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '13a',
        productId: '13',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 9.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/loreal-color-riche',
        lastUpdated: '2024-07-21T20:00:00Z',
      },
      {
        id: '13b',
        productId: '13',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 11.99,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/loreal-color-riche',
        lastUpdated: '2024-07-21T20:15:00Z',
      },
    ],
    lowestPrice: 9.99,
    highestPrice: 11.99,
    priceRange: '€9.99 - €11.99',
  },
  {
    id: '14',
    name: 'Fructis Fortifying Shampoo',
    brand: 'Garnier',
    category: 'Haarverzorging',
    subcategory: 'Shampoo',
    description: 'Versterkende shampoo met vitamine B3 en appel extract',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-6e6c2e7b3b85?w=400&h=400&fit=crop',
    volume: '250ml',
    sku: 'GR-FR-FORT-250',
    averageRating: 4.1,
    reviewCount: 1897,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '14a',
        productId: '14',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 2.99,
        originalPrice: 3.49,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-07-25T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/garnier-fructis-shampoo',
        lastUpdated: '2024-07-21T21:00:00Z',
      },
      {
        id: '14b',
        productId: '14',
        retailerId: 'ah',
        retailerName: 'Albert Heijn',
        price: 3.29,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://ah.nl/garnier-fructis-shampoo',
        lastUpdated: '2024-07-21T21:15:00Z',
      },
    ],
    lowestPrice: 2.99,
    highestPrice: 3.29,
    priceRange: '€2.99 - €3.29',
  },
  {
    id: '15',
    name: 'Chanel N°5 Eau de Parfum',
    brand: 'Chanel',
    category: 'Parfum',
    subcategory: 'Damesparfum',
    description: 'De meest iconische parfum ter wereld, tijdloos en elegant',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    volume: '50ml',
    sku: 'CH-N5-50',
    averageRating: 4.8,
    reviewCount: 9876,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '15a',
        productId: '15',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 129.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/chanel-no5',
        lastUpdated: '2024-07-21T22:00:00Z',
      },
      {
        id: '15b',
        productId: '15',
        retailerId: 'bijenkorf',
        retailerName: 'De Bijenkorf',
        price: 129.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://bijenkorf.nl/chanel-no5',
        lastUpdated: '2024-07-21T22:15:00Z',
      },
    ],
    lowestPrice: 129.00,
    highestPrice: 129.00,
    priceRange: '€129.00',
  },
  {
    id: '16',
    name: 'SuperStay Matte Ink Liquid Lipstick',
    brand: 'Maybelline',
    category: 'Make-up',
    subcategory: 'Lipstick',
    description: '16-uurs matte liquid lipstick die niet afgeeft',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    volume: '5ml',
    sku: 'MB-SMI-PIONEER',
    averageRating: 4.4,
    reviewCount: 6543,
    createdAt: '2024-03-18T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '16a',
        productId: '16',
        retailerId: 'kruidvat',
        retailerName: 'Kruidvat',
        price: 8.99,
        originalPrice: 10.99,
        currency: 'EUR',
        isOnSale: true,
        saleEndDate: '2024-08-15T23:59:59Z',
        stockStatus: 'in_stock',
        productUrl: 'https://kruidvat.nl/maybelline-superstay-matte-ink',
        lastUpdated: '2024-07-21T23:00:00Z',
      },
      {
        id: '16b',
        productId: '16',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 9.49,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/maybelline-superstay-matte-ink',
        lastUpdated: '2024-07-21T23:15:00Z',
      },
    ],
    lowestPrice: 8.99,
    highestPrice: 9.49,
    priceRange: '€8.99 - €9.49',
  },
  {
    id: '17',
    name: 'Retinol 0.2% in Squalane',
    brand: 'The Ordinary',
    category: 'Huidverzorging',
    subcategory: 'Serums',
    description: 'Introductie retinol serum voor beginners',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    volume: '30ml',
    sku: 'TO-RET-02',
    averageRating: 4.2,
    reviewCount: 4567,
    createdAt: '2024-02-22T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '17a',
        productId: '17',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 9.90,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/the-ordinary-retinol',
        lastUpdated: '2024-07-22T00:00:00Z',
      },
      {
        id: '17b',
        productId: '17',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 10.50,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://sephora.nl/the-ordinary-retinol',
        lastUpdated: '2024-07-22T00:15:00Z',
      },
    ],
    lowestPrice: 9.90,
    highestPrice: 10.50,
    priceRange: '€9.90 - €10.50',
  },
  {
    id: '18',
    name: 'Better Than Sex Mascara',
    brand: 'Too Faced',
    category: 'Make-up',
    subcategory: 'Mascara',
    description: 'Volumegevende mascara voor dramatisch volle wimpers',
    imageUrl: 'https://images.unsplash.com/photo-1631214540230-9ed1af41b0e7?w=400&h=400&fit=crop',
    volume: '8.5ml',
    sku: 'TF-BTS-BLACK',
    averageRating: 4.5,
    reviewCount: 7890,
    createdAt: '2024-03-08T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '18a',
        productId: '18',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 26.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/too-faced-better-than-sex',
        lastUpdated: '2024-07-22T01:00:00Z',
      },
      {
        id: '18b',
        productId: '18',
        retailerId: 'sephora',
        retailerName: 'Sephora',
        price: 26.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'low_stock',
        productUrl: 'https://sephora.nl/too-faced-better-than-sex',
        lastUpdated: '2024-07-22T01:15:00Z',
      },
    ],
    lowestPrice: 26.00,
    highestPrice: 26.00,
    priceRange: '€26.00',
  },
  {
    id: '19',
    name: 'Salicylic Acid 2% Solution',
    brand: 'The Ordinary',
    category: 'Huidverzorging',
    subcategory: 'Serums',
    description: 'Exfoliërende behandeling voor verstopte poriën',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    volume: '30ml',
    sku: 'TO-SA-30',
    averageRating: 4.3,
    reviewCount: 5432,
    createdAt: '2024-01-30T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '19a',
        productId: '19',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 7.20,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/the-ordinary-salicylic-acid',
        lastUpdated: '2024-07-22T02:00:00Z',
      },
      {
        id: '19b',
        productId: '19',
        retailerId: 'etos',
        retailerName: 'Etos',
        price: 7.20,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://etos.nl/the-ordinary-salicylic-acid',
        lastUpdated: '2024-07-22T02:15:00Z',
      },
    ],
    lowestPrice: 7.20,
    highestPrice: 7.20,
    priceRange: '€7.20',
  },
  {
    id: '20',
    name: 'Sauvage Eau de Toilette',
    brand: 'Dior',
    category: 'Parfum',
    subcategory: 'Herenparfum',
    description: 'Frisse en intense herenparfum met bergamot en peper',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    volume: '60ml',
    sku: 'DI-SAU-60',
    averageRating: 4.7,
    reviewCount: 8765,
    createdAt: '2024-02-14T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z',
    offers: [
      {
        id: '20a',
        productId: '20',
        retailerId: 'douglas',
        retailerName: 'Douglas',
        price: 89.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://douglas.nl/dior-sauvage',
        lastUpdated: '2024-07-22T03:00:00Z',
      },
      {
        id: '20b',
        productId: '20',
        retailerId: 'bijenkorf',
        retailerName: 'De Bijenkorf',
        price: 89.00,
        currency: 'EUR',
        isOnSale: false,
        stockStatus: 'in_stock',
        productUrl: 'https://bijenkorf.nl/dior-sauvage',
        lastUpdated: '2024-07-22T03:15:00Z',
      },
    ],
    lowestPrice: 89.00,
    highestPrice: 89.00,
    priceRange: '€89.00',
  }
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
