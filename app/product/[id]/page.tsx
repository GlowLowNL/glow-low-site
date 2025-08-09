import { getProductById, getProducts } from "@/lib/mockApi";
import { ProductPage } from "@/components/product/product-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: string }
}

// Generate metadata for the product page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Product niet gevonden",
    }
  }

  return {
    title: `${product.name} by ${product.brand} | GlowLow`,
    description: `Vergelijk prijzen voor ${product.name}. ${product.description}`,
    openGraph: {
      title: product.name,
      description: `Vind de beste deal voor ${product.name}.`,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  }
}

export const revalidate = 300; // Revalidate product pages every 5 minutes for fresh pricing

// Statically generate routes for all products
export async function generateStaticParams() {
  try {
    const productsResponse = await getProducts({}, 1, 100); // Fetch all products
    return productsResponse.data.map((product) => ({ id: product.id }));
  } catch (e) {
    console.error('Failed to generate static params', e);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
