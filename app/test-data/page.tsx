import { loadAllProducts, getAllCategories } from '@/lib/server-data';

export default async function TestDataPage() {
  const allProducts = await loadAllProducts();
  const products = allProducts.slice(0, 10); // Get first 10 for display
  const categories = await getAllCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Data Test Page</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories ({categories.length})</h2>
        {categories.map(cat => (
          <div key={cat.id} className="mb-2 p-3 border rounded">
            <strong>{cat.name}</strong> (slug: {cat.slug})
            {cat.children && cat.children.length > 0 && (
              <ul className="ml-4 mt-2">
                {cat.children.map(sub => (
                  <li key={sub.id}>- {sub.name} (slug: {sub.slug})</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Products ({allProducts.length})</h2>
        {products.map(product => (
          <div key={product.id} className="mb-4 p-4 border rounded">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0">
                {product.imageUrl && (
                  <img 
                    src={product.imageUrl || '/fallback-product.png'} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand} | {product.category}</p>
                {product.subcategory && <p className="text-xs text-gray-500">Subcategory: {product.subcategory}</p>}
                <p className="text-sm">{product.priceRange}</p>
                <p className="text-xs text-gray-400">Image: {product.imageUrl ? 'Yes' : 'No'}</p>
                <p className="text-xs text-gray-400">Offers: {product.offers?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
