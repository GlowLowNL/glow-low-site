"use client";
import { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  quality?: number;
  productType?: string;
}

export function FallbackImage({ 
  src, 
  alt, 
  className, 
  style, 
  loading = 'lazy',
  ...rest 
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Handle image load errors
  const handleError = () => {
    console.log('Image failed to load:', currentSrc);
    if (!hasError) {
      setHasError(true);
      // If the original src fails, try to determine the right fallback based on the path
      if (src.includes('fallback-')) {
        // If it's already a fallback SVG that failed, use the generic fallback
        setCurrentSrc('/images/fallback-product.svg');
      } else {
        // For any other failure, the src should already be the correct fallback from the API
        setCurrentSrc('/images/fallback-product.svg');
      }
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        ...style,
      }}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
