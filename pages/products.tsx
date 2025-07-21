import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { ProductGrid } from '@/components/ProductGrid';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { Button } from '@/components/ui/button';
import { SearchFilters } from '@/types/product';
import { useProducts } from '@/lib/queries';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 20;

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({});

  // Parse URL parameters on mount
  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      const urlFilters: SearchFilters = {};
      
      if (query.q) urlFilters.query = String(query.q);
      if (query.category) urlFilters.category = String(query.category);
      if (query.brand) {
        urlFilters.brand = Array.isArray(query.brand) 
          ? query.brand.map(String) 
          : [String(query.brand)];
      }
      if (query.priceMin) urlFilters.priceMin = Number(query.priceMin);
      if (query.priceMax) urlFilters.priceMax = Number(query.priceMax);
      if (query.onSale) urlFilters.onSaleOnly = query.onSale === 'true';
      if (query.inStock) urlFilters.inStockOnly = query.inStock === 'true';
      if (query.sort) urlFilters.sortBy = String(query.sort) as any;
      
      setFilters(urlFilters);
      
      if (query.page) {
        setPage(Number(query.page) || 1);
      }
    }
  }, [router.isReady, router.query]);

  // Update URL when filters change
  const updateURL = (newFilters: SearchFilters, newPage = 1) => {
    const query: any = {};
    
    if (newFilters.query) query.q = newFilters.query;
    if (newFilters.category) query.category = newFilters.category;
    if (newFilters.brand?.length) query.brand = newFilters.brand;
    if (newFilters.priceMin) query.priceMin = newFilters.priceMin;
    if (newFilters.priceMax) query.priceMax = newFilters.priceMax;
    if (newFilters.onSaleOnly) query.onSale = 'true';
    if (newFilters.inStockOnly) query.inStock = 'true';
    if (newFilters.sortBy) query.sort = newFilters.sortBy;
    if (newPage > 1) query.page = newPage;

    router.push({ pathname: '/products', query }, undefined, { shallow: true });
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1);
    updateURL(newFilters, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL(filters, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, isLoading, error } = useProducts(filters, page, PRODUCTS_PER_PAGE);

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    handleFiltersChange(newFilters);
  };

  return (
    <Layout>
      <Head>
        <title>
          {filters.query 
            ? `"${filters.query}" - Beauty Products | Glowlow`
            : 'Beauty Products | Glowlow'
          }
        </title>
        <meta 
          name="description" 
          content="Compare prices on thousands of beauty and skincare products from top European retailers. Find the best deals on makeup, skincare, and fragrance." 
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {filters.query ? `Search results for "${filters.query}"` : 'Beauty Products'}
          </h1>
          <p className="text-muted-foreground">
            Compare prices across multiple retailers and find the best deals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchAndFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
        </div>

        {/* Results Header */}
        {data && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {data.data.length} of {data.pagination.total} products
              {data.pagination.page > 1 && ` (page ${data.pagination.page})`}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={filters.sortBy || ''} 
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="border border-input rounded-md px-3 py-1 text-sm bg-background"
              >
                <option value="">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="brand">Brand</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load products</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={data?.data || []} loading={isLoading} />

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(
                  data.pagination.totalPages - 4,
                  page - 2
                )) + i;
                
                if (pageNum <= data.pagination.totalPages) {
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= data.pagination.totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
