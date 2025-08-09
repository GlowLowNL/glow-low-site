import Hero from '@/components/home/hero';
import FeaturedProducts, { FeaturedProductsSkeleton } from '@/components/home/featured-products';
import Categories from '@/components/home/categories';
import Brands from '@/components/home/brands';
import Newsletter from '@/components/home/newsletter';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedProductsSkeleton />}> 
        <FeaturedProducts />
      </Suspense>
      <Categories />
      <Brands />
      <Newsletter />
    </>
  );
}
