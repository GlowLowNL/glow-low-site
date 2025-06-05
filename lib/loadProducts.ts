import fs from 'fs';
import path from 'path';

export interface Product {
  ean: string;
  product_name: string;
  merchant_name: string;
  image_url: string;
  search_price: number;
  aw_product_url: string;
}

export function loadProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'test-data', 'douglas_sample.csv');
  const csv = fs.readFileSync(filePath, 'utf8').trim();
  const lines = csv.split('\n');
  const [, ...rows] = lines;
  return rows.map((row) => {
    const [ean, product_name, merchant_name, image_url, search_price, aw_product_url] = row.split(',');
    return {
      ean,
      product_name,
      merchant_name,
      image_url,
      search_price: parseFloat(search_price),
      aw_product_url,
    };
  });
}
