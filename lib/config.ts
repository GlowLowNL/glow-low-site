// Central configuration for Glow-Low
export const DEFAULT_PAGE_SIZE = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || '10', 10);
export const MAX_PAGE_SIZE = 100;
export const CSV_PATH = process.env.CSV_PATH || `${process.cwd()}/public/products.csv`;
export const ENABLE_CSV = (process.env.ENABLE_CSV || 'true') === 'true';
export const CSV_FETCH_URL = '/products.csv';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

export const CANONICAL_CATEGORIES = [
  'Huidverzorging',
  'Make-up',
  'Parfum'
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
  'HUIDVERZORGING': 'Huidverzorging',
  'MAKEUP': 'Make-up',
  'MAKE-UP': 'Make-up',
  'PARFUM': 'Parfum'
};
