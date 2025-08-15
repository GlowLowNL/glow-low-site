// Central configuration for Glow-Low
export const DEFAULT_PAGE_SIZE = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || '10', 10);
export const MAX_PAGE_SIZE = 100;
export const CSV_PATH = process.env.CSV_PATH || `${process.cwd()}/public/products.csv`;
export const ENABLE_CSV = (process.env.ENABLE_CSV || 'true') === 'true';
export const CSV_FETCH_URL = '/products.csv';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

export const CANONICAL_CATEGORIES = [
  // Hoofdcategorieën
  'Huidverzorging',
  'Make-up',
  'Parfum',
  // Subcategorieën (skincare)
  'Reiniging',
  'Vochtinbrengende Crème',
  'Serums',
  'Zonnebescherming',
  'Anti-Aging',
  // Subcategorieën (make-up)
  'Foundation',
  'Concealer',
  'Lipstick',
  'Mascara',
  'Oogschaduw',
  'Eyeliner',
  // Subcategorieën (parfum/geur)
  'Damesparfum',
  'Herenparfum',
  'Unisex',
  'Eau De Parfum',
  'Eau De Toilette',
  'Lichaamsspray',
  'Haarparfum'
] as const;
export type CanonicalCategory = typeof CANONICAL_CATEGORIES[number];

export const CANONICAL_BRANDS = [
  'The Ordinary',
  'CeraVe',
  'Lancôme',
  'Yves Saint Laurent',
  'NIVEA',
  "L'Oréal Paris",
  'Maybelline',
  'Garnier',
  'Clinique',
  'Estée Lauder'
] as const;
export type CanonicalBrand = typeof CANONICAL_BRANDS[number];

export const BRAND_NORMALIZATION: Record<string, CanonicalBrand> = {
  'YVES SAINT LAURENT': 'Yves Saint Laurent',
  'YSL': 'Yves Saint Laurent',
  'ESTEE LAUDER': 'Estée Lauder',
  'ESTE LAUDER': 'Estée Lauder',
  'LOREAL': "L'Oréal Paris",
  'L OREAL': "L'Oréal Paris",
  'MAYBELLINE': 'Maybelline'
};

export const CATEGORY_NORMALIZATION: Record<string, CanonicalCategory> = {
  // hoofd
  'HUIDVERZORGING': 'Huidverzorging',
  'MAKEUP': 'Make-up',
  'MAKE-UP': 'Make-up',
  'PARFUM': 'Parfum',
  // variants / accents removed
  'SKINCARE': 'Huidverzorging',
  'BEAUTY': 'Huidverzorging',
  // sub skincare
  'REINIGING': 'Reiniging',
  'CLEANSER': 'Reiniging',
  'MOISTURIZER': 'Vochtinbrengende Crème',
  'VOCHTINBRENGENDE CREME': 'Vochtinbrengende Crème',
  'SERUM': 'Serums',
  'SERUMS': 'Serums',
  'SUNSCREEN': 'Zonnebescherming',
  'SPF': 'Zonnebescherming',
  'ANTI-AGING': 'Anti-Aging',
  'ANTI AGING': 'Anti-Aging',
  // sub make-up
  'FOUNDATION': 'Foundation',
  'CONCEALER': 'Concealer',
  'LIPSTICK': 'Lipstick',
  'MASCARA': 'Mascara',
  'EYESHADOW': 'Oogschaduw',
  'OOGSCHADUW': 'Oogschaduw',
  'EYELINER': 'Eyeliner',
  // parfum
  'DAMESPARNUM': 'Damesparfum',
  'DAMESPARFUM': 'Damesparfum',
  'HERENPARFUM': 'Herenparfum',
  'UNISEX': 'Unisex',
  'EAU DE PARFUM': 'Eau De Parfum',
  'EAU DE TOILETTE': 'Eau De Toilette',
  'BODY SPRAY': 'Lichaamsspray',
  'BODYSPRAY': 'Lichaamsspray',
  'LICHAAMSSPRAY': 'Lichaamsspray',
  'HAIR PERFUME': 'Haarparfum',
  'HAIR MIST': 'Haarparfum',
  'HAARPARFUM': 'Haarparfum'
};
