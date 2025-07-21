import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProduct, usePriceHistory } from '@/lib/queries';
import { ExternalLink, TrendingDown, TrendingUp, Star, ArrowLeft, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedRetailer, setSelectedRetailer] = useState<string>('');
  
  const { data: product, isLoading, error } = useProduct(String(id));
  const { data: priceHistory } = usePriceHistory(
    String(id), 
    selectedRetailer, 
    30
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Product not found</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const lowestOffer = product.offers?.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest
  );
  
  const highestOffer = product.offers?.reduce((highest, current) => 
    current.price > highest.price ? current : highest
  );

  const onSaleOffers = product.offers?.filter(offer => offer.isOnSale) || [];
  const inStockOffers = product.offers?.filter(offer => offer.stockStatus === 'in_stock') || [];

  // Prepare price chart data
  const chartData = priceHistory?.entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' }),
    price: entry.price,
    isOnSale: entry.isOnSale,
  })) || [];

  return (
    <Layout>
      <Head>
        <title>{product.name} by {product.brand} | Glowlow</title>
        <meta 
          name="description" 
          content={`Compare prices for ${product.name} by ${product.brand}. Find the best deals from ${product.offers?.length || 0} retailers.`} 
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {onSaleOffers.length > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                <TrendingDown className="w-3 h-3 mr-1" />
                {onSaleOffers.length} Sale{onSaleOffers.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-lg text-muted-foreground font-medium">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {product.volume && (
                <p className="text-muted-foreground">{product.volume}</p>
              )}
              
              {product.averageRating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.averageRating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Lowest Price:</span>
                    <span className="text-2xl font-bold text-green-600">
                      €{lowestOffer?.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {product.offers && product.offers.length > 1 && (
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Price Range:</span>
                      <span>€{lowestOffer?.price.toFixed(2)} - €{highestOffer?.price.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Available at:</span>
                    <span>{inStockOffers.length} store{inStockOffers.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price History Chart */}
        {selectedRetailer && chartData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                30-Day Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      domain={['dataMin - 1', 'dataMax + 1']}
                      tickFormatter={(value) => `€${value}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`€${value.toFixed(2)}`, 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#e11d48" 
                      strokeWidth={2}
                      dot={{ fill: '#e11d48', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Store Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Where to Buy
              <Badge variant="secondary">{product.offers?.length || 0} stores</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.offers?.map((offer) => (
                <div 
                  key={offer.id} 
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedRetailer === offer.retailerId ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{offer.retailerName}</h4>
                        {offer.isOnSale && (
                          <Badge variant="destructive">Sale</Badge>
                        )}
                        {offer.stockStatus === 'in_stock' ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Out of Stock</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold">
                          €{offer.price.toFixed(2)}
                        </span>
                        {offer.originalPrice && offer.isOnSale && (
                          <>
                            <span className="text-lg text-muted-foreground line-through">
                              €{offer.originalPrice.toFixed(2)}
                            </span>
                            <Badge variant="destructive" className="text-xs">
                              Save €{(offer.originalPrice - offer.price).toFixed(2)}
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      {offer.shippingInfo && (
                        <p className="text-sm text-muted-foreground mb-2">{offer.shippingInfo}</p>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date(offer.lastUpdated).toLocaleString('nl-NL')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button asChild>
                        <a 
                          href={offer.productUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Store
                        </a>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRetailer(
                          selectedRetailer === offer.retailerId ? '' : offer.retailerId
                        )}
                      >
                        {selectedRetailer === offer.retailerId ? 'Hide' : 'Show'} Price History
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
