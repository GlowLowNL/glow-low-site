import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/types/product';
import { Search, Filter, X } from 'lucide-react';
import { useBrands, useCategories } from '@/lib/queries';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(filters.query || '');
  
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const handleSearch = useCallback(() => {
    onFiltersChange({ ...filters, query: localQuery });
  }, [filters, localQuery, onFiltersChange]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleBrand = (brandName: string) => {
    const currentBrands = filters.brand || [];
    const newBrands = currentBrands.includes(brandName)
      ? currentBrands.filter(b => b !== brandName)
      : [...currentBrands, brandName];
    
    onFiltersChange({ ...filters, brand: newBrands });
  };

  const setCategory = (categoryName: string) => {
    onFiltersChange({ 
      ...filters, 
      category: filters.category === categoryName ? undefined : categoryName 
    });
  };

  const setPriceRange = (min?: number, max?: number) => {
    onFiltersChange({ ...filters, priceMin: min, priceMax: max });
  };

  const toggleSaleOnly = () => {
    onFiltersChange({ ...filters, onSaleOnly: !filters.onSaleOnly });
  };

  const clearFilters = () => {
    onFiltersChange({ query: localQuery });
  };

  const activeFiltersCount = 
    (filters.brand?.length || 0) +
    (filters.category ? 1 : 0) +
    (filters.priceMin || filters.priceMax ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products, brands, or categories..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filters.category}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setCategory(filters.category!)}
              />
            </Badge>
          )}
          
          {filters.brand?.map(brand => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              {brand}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => toggleBrand(brand)}
              />
            </Badge>
          ))}
          
          {(filters.priceMin || filters.priceMax) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: €{filters.priceMin || 0} - €{filters.priceMax || '∞'}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setPriceRange()}
              />
            </Badge>
          )}
          
          {filters.onSaleOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              On Sale
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={toggleSaleOnly}
              />
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categories */}
            {categories && (
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={filters.category === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(category.name)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {brands && (
              <div>
                <h4 className="font-medium mb-3">Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <Button
                      key={brand.id}
                      variant={filters.brand?.includes(brand.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleBrand(brand.name)}
                    >
                      {brand.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => setPriceRange(Number(e.target.value) || undefined, filters.priceMax)}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => setPriceRange(filters.priceMin, Number(e.target.value) || undefined)}
                  className="w-20"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[10, 25, 50, 100].map(max => (
                  <Button
                    key={max}
                    variant="outline"
                    size="sm"
                    onClick={() => setPriceRange(undefined, max)}
                  >
                    Under €{max}
                  </Button>
                ))}
              </div>
            </div>

            {/* Special Filters */}
            <div>
              <h4 className="font-medium mb-3">Special Offers</h4>
              <div className="flex gap-2">
                <Button
                  variant={filters.onSaleOnly ? "default" : "outline"}
                  size="sm"
                  onClick={toggleSaleOnly}
                >
                  On Sale Only
                </Button>
                <Button
                  variant={filters.inStockOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFiltersChange({ ...filters, inStockOnly: !filters.inStockOnly })}
                >
                  In Stock Only
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
