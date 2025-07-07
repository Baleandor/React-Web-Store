import React, { useState, useEffect } from 'react';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ImageWithLoading({ 
  src, 
  alt, 
  className = "", 
  onLoad,
  onError 
}: ImageWithLoadingProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Preload the image
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
    img.src = src;
  }, [src, onLoad, onError]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-zinc-700 border border-lime-600 rounded ${className}`}>
        <div className="text-lime-300 text-center p-4">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">Image failed to load</div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-zinc-700 border border-lime-600 rounded ${className}`}>
        <div className="text-lime-300 text-center p-4">
          <div className="animate-spin text-2xl mb-2">⚙️</div>
          <div className="text-sm">Loading image...</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  );
} 