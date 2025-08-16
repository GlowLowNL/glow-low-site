"use client";

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SimpleImage({ src, alt, className }: SimpleImageProps) {
  console.log('SimpleImage rendering with src:', src);
  
  return (
    <img
      src={src || '/images/fallback-product.svg'}
      alt={alt}
      className={className}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        display: 'block'
      }}
      onLoad={() => console.log('✅ Image loaded:', src)}
      onError={(e) => {
        console.log('❌ Image failed:', src);
        e.currentTarget.src = '/images/fallback-product.svg';
      }}
    />
  );
}
