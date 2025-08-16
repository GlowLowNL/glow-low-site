"use client";
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

// Local SVG fallback images for different categories
const FALLBACK_IMAGES = {
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

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  productType?: string;
}

function getLocalFallbackImage(productType?: string, alt?: string): string {
  // Check product type first
  if (productType) {
    const key = productType.toLowerCase();
    for (const [pattern, fallback] of Object.entries(FALLBACK_IMAGES)) {
      if (key.includes(pattern)) {
        return fallback;
      }
    }
  }
  
  // Try to infer from alt text
  if (alt) {
    const altLower = alt.toLowerCase();
    for (const [pattern, fallback] of Object.entries(FALLBACK_IMAGES)) {
      if (altLower.includes(pattern)) {
        return fallback;
      }
    }
  }
  
  return FALLBACK_IMAGES.default;
}

export function FallbackImage({ src, alt, fallbackSrc, productType, fill, priority, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const finalFallbackSrc = fallbackSrc || getLocalFallbackImage(productType, alt);

  // Use regular img element to avoid Next.js Image onError issues during SSG
  return (
    <img
      {...(rest as any)}
      src={isError ? finalFallbackSrc : imgSrc}
      alt={alt}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        ...rest.style,
      }}
      onError={() => {
        if (!isError) {
          setIsError(true);
        }
      }}
      loading="lazy"
    />
  );
}
