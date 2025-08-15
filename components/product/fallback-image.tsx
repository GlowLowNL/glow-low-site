"use client";
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

// Placeholder images for different product types
const PLACEHOLDER_IMAGES = {
  parfum: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
  eau_de_parfum: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop',
  body_spray: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
  hair_fragrance: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop'
};

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  productType?: string;
}

function getPlaceholderImage(productType?: string, alt?: string): string {
  if (productType) {
    const key = productType.toLowerCase().replace(/\s+/g, '_');
    if (key in PLACEHOLDER_IMAGES) {
      return PLACEHOLDER_IMAGES[key as keyof typeof PLACEHOLDER_IMAGES];
    }
  }
  
  // Try to infer from alt text
  if (alt) {
    const altLower = alt.toLowerCase();
    if (altLower.includes('eau de parfum')) return PLACEHOLDER_IMAGES.eau_de_parfum;
    if (altLower.includes('body') || altLower.includes('lichaam')) return PLACEHOLDER_IMAGES.body_spray;
    if (altLower.includes('haar') || altLower.includes('hair')) return PLACEHOLDER_IMAGES.hair_fragrance;
  }
  
  return PLACEHOLDER_IMAGES.default;
}

export function FallbackImage({ src, alt, fallbackSrc, productType, fill, priority, ...rest }: FallbackImageProps) {
  // Check if src is a Douglas URL (they block hotlinking)
  const isDouglasSrc = src?.includes('douglas.nl') || src?.includes('douglas.de');
  
  const [imgSrc, setImgSrc] = useState(() => {
    if (isDouglasSrc) {
      return getPlaceholderImage(productType, alt);
    }
    return src;
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isDouglasSrc) {
      setImgSrc(getPlaceholderImage(productType, alt));
      setIsError(false);
    } else {
      setImgSrc(src);
      setIsError(false);
    }
  }, [src, productType, alt, isDouglasSrc]);

  const finalFallbackSrc = fallbackSrc || getPlaceholderImage(productType, alt);

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
