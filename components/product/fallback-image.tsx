"use client";
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK_IMAGE = '/fallback-product.png';

interface FallbackImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export function FallbackImage({ src, alt, fallbackSrc = FALLBACK_IMAGE, ...rest }: FallbackImageProps) {
  const [broken, setBroken] = useState(false);
  const finalSrc = broken ? fallbackSrc : src;
  return (
    <Image
      {...rest}
      src={finalSrc}
      alt={alt}
      onError={() => setBroken(true)}
    />
  );
}
