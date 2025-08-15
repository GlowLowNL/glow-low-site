"use client";
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

const FALLBACK_IMAGE = '/fallback-product.png';

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export function FallbackImage({ src, alt, fallbackSrc = FALLBACK_IMAGE, ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  // Use regular img element to avoid Next.js Image onError issues during SSG
  return (
    <img
      {...(rest as any)}
      src={isError ? fallbackSrc : imgSrc}
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
