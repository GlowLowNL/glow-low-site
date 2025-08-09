import Hero from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import Categories from '@/components/home/categories';
import Brands from '@/components/home/brands';
import Newsletter from '@/components/home/newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Brands />
      <Newsletter />
    </>
  );
}
