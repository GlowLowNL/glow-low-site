import { loadAllProducts } from '@/lib/server-data';
import { ProductPage } from "@/components/product/product-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = {
  params: { id: string }
}

// Generate metadata for the product page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allProducts = await loadAllProducts();
  const product = allProducts.find(p => p.id === params.id);

  if (!product) {
    return { title: "Product niet gevonden" };
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl';
  const url = `${siteUrl}/product/${product.id}`;
  return {
    title: `${product.name} by ${product.brand} | GlowLow`,
    description: `Vergelijk prijzen voor ${product.name}. ${product.description}`,
    alternates: { canonical: url },
    openGraph: { title: product.name, description: `Vind de beste deal voor ${product.name}.`, url, images: [{ url: product.imageUrl, width: 800, height: 800, alt: product.name }] },
  };
}

export const revalidate = 300; // Revalidate product pages every 5 minutes for fresh pricing

// Statically generate routes for all products
export async function generateStaticParams() {
  try {
    const allProducts = await loadAllProducts();
    return allProducts.slice(0, 100).map((product: any) => ({ id: product.id })); // Limit to first 100 for build performance
  } catch (e) {
    console.error('Failed to generate static params', e);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const allProducts = await loadAllProducts();
  const product = allProducts.find(p => p.id === params.id);
  if (!product) {
    notFound();
  }
  const canonical = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl') + `/product/${product.id}`;
  return (
    <>
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={[
          { href: '/', label: 'Home' },
          { href: `/category/${product.category.toLowerCase()}`.replace(/\s+/g,'-'), label: product.category },
          { label: product.name }
        ]} />
      </div>
      <ProductPage product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: [product.imageUrl],
          description: product.description,
          sku: product.sku,
          brand: { '@type': 'Brand', name: product.brand },
          offers: product.offers?.map((o: any) => ({
            '@type': 'Offer',
            url: o.productUrl || canonical,
            priceCurrency: o.currency || 'EUR',
            price: o.price ? o.price.toFixed(2) : undefined,
            availability: 'https://schema.org/' + (o.stockStatus === 'in_stock' ? 'InStock' : 'OutOfStock'),
            seller: { '@type': 'Organization', name: o.retailerName }
          })),
          aggregateRating: product.averageRating ? {
            '@type': 'AggregateRating',
            ratingValue: product.averageRating,
            reviewCount: product.reviewCount || Math.max(1, Math.round(product.averageRating * 10))
          } : undefined
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl') + '/' },
            { '@type': 'ListItem', position: 2, name: product.category, item: (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://glowlow.nl') + `/category/${product.category.toLowerCase().replace(/\s+/g,'-')}` },
            { '@type': 'ListItem', position: 3, name: product.name, item: canonical }
          ]
        }) }}
      />
    </>
  );
}
