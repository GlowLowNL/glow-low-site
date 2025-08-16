"use client";
import { useState } from 'react';

interface DebugImageProps {
  src: string;
  alt: string;
}

export function DebugImage({ src, alt }: DebugImageProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const handleLoad = () => {
    console.log('Image loaded successfully:', src);
    setStatus('success');
  };

  const handleError = () => {
    console.log('Image failed to load:', src);
    setStatus('error');
  };

  return (
    <div className="w-32 h-32 border" style={{ 
      borderColor: status === 'success' ? 'green' : status === 'error' ? 'red' : '#ccc',
      borderWidth: '2px'
    }}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
