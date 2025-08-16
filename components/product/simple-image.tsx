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
  const [isLoading, setIsLoading] = useState(true);
  
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = getCategoryFallback(productType, alt);
      setCurrentSrc(fallback);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const isFallback = hasError || currentSrc.includes('/images/fallback-');
  
  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {isLoading && !isFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={currentSrc || '/images/fallback-product.svg'}
        alt={alt}
        className={`${className} ${
          isFallback 
            ? 'object-contain p-8 opacity-60' 
            : 'object-contain p-3'
        }`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          imageRendering: 'crisp-edges',
          WebkitImageSmoothing: false,
          filter: isFallback ? 'none' : 'contrast(1.1) saturate(1.05)',
          background: 'white'
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
}
