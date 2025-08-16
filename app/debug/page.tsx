import { loadAllProducts } from '@/lib/server-data';
import { DebugImage } from '@/components/debug/debug-image';

export default async function DebugPage() {
  const products = await loadAllProducts();
  const first10 = products.slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Debug: Product Images</h1>
      <p className="mb-6">Total products: {products.length}</p>
      
      <div className="space-y-4">
        {first10.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-sm"><strong>Category:</strong> {product.subcategory}</p>
            <p className="text-sm"><strong>Image URL:</strong> {product.imageUrl}</p>
            
            <div className="mt-4 flex gap-4">
              <DebugImage 
                src={product.imageUrl} 
                alt={product.name}
              />
              <div className="text-xs space-y-1">
                <p><strong>Image exists:</strong> {product.imageUrl ? 'Yes' : 'No'}</p>
                <p><strong>Is SVG:</strong> {product.imageUrl?.includes('.svg') ? 'Yes' : 'No'}</p>
                <p><strong>Is fallback:</strong> {product.imageUrl?.includes('fallback') ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
