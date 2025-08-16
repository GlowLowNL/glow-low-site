import { loadAllProducts } from '@/lib/server-data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const query = searchParams.get('query') || undefined;
    const category = searchParams.get('category') || undefined;
    const brand = searchParams.get('brand')?.split(',') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const sortBy = searchParams.get('sortBy') as any || undefined;

    const allProducts = await loadAllProducts();
    let filteredProducts = allProducts;

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(p => 
        brand.some(b => p.brand.toLowerCase().includes(b.toLowerCase()))
      );
    }

    if (query) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => {
        const price = p.offers?.[0]?.price || 0;
        return price >= minPrice;
      });
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => {
        const price = p.offers?.[0]?.price || Infinity;
        return price <= maxPrice;
      });
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => (a.offers?.[0]?.price || 0) - (b.offers?.[0]?.price || 0));
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => (b.offers?.[0]?.price || 0) - (a.offers?.[0]?.price || 0));
          break;
        case 'rating_desc':
          filteredProducts.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
    
    const result = {
      data: paginatedProducts,
      page,
      pageSize,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / pageSize)
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}
