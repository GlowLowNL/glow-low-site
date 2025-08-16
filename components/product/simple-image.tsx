"use client";
import { useState } from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  productType?: string;
}

// Category-based fallbacks
const CATEGORY_FALLBACKS = {
  'make-up': '/images/fallback-makeup.svg',
  'makeup': '/images/fallback-makeup.svg',
  'huidverzorging': '/images/fallback-skincare.svg',
  'skincare': '/images/fallback-skincare.svg',
  'lichaam': '/images/fallback-wellness.svg',
  'wellness': '/images/fallback-wellness.svg',
  'body': '/images/fallback-wellness.svg',
  'parfum': '/images/fallback-perfume.svg',
  'perfume': '/images/fallback-perfume.svg',
  'fragrance': '/images/fallback-perfume.svg',
  'haar': '/images/fallback-haircare.svg',
  'hair': '/images/fallback-haircare.svg',
  'haarverzorging': '/images/fallback-haircare.svg',
  'default': '/images/fallback-product.svg'
};

function getCategoryFallback(productType?: string, alt?: string): string {
  if (productType) {
    const key = productType.toLowerCase();
    for (const [pattern, fallback] of Object.entries(CATEGORY_FALLBACKS)) {
      if (key.includes(pattern)) {
        return fallback;
      }
    }
  }
  
  if (alt) {
    const altLower = alt.toLowerCase();
    for (const [pattern, fallback] of Object.entries(CATEGORY_FALLBACKS)) {
      if (altLower.includes(pattern)) {
        return fallback;
      }
    }
  }
  
  return CATEGORY_FALLBACKS.default;
}

export function SimpleImage({ src, alt, className, productType }: SimpleImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleError = () => {
    if (!hasError) {
      console.log('❌ Image failed, falling back:', src);
      setHasError(true);
      const fallback = getCategoryFallback(productType, alt);
      setCurrentSrc(fallback);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (src.startsWith('http')) {
      console.log('✅ Original image loaded successfully:', src);
    } else {
      console.log('✅ Fallback SVG loaded:', src);
    }
  };

  // Check if it's a small/low-quality image
  const isSmallImage = currentSrc.includes('/products/ICI_') || hasError;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <img
        src={currentSrc || '/images/fallback-product.svg'}
        alt={alt}
        className={`${className} transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          objectFit: isSmallImage ? 'contain' : 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'block',
          imageRendering: isSmallImage ? 'crisp-edges' : 'auto',
          filter: isSmallImage ? 'contrast(1.1) saturate(1.2) brightness(1.05)' : 'none',
          background: isSmallImage ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' : 'transparent',
          padding: isSmallImage ? '8px' : '0'
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Enhancement overlay for small images */}
      {isLoaded && isSmallImage && !hasError && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
        </div>
      )}
    </div>
  );
}
