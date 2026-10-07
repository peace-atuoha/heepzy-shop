import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'; // Sleek abstract dark placeholder instead of a specific shoe

// Simple memory cache to prevent flickering on already loaded images
const imageCache = new Set();

const CachedImage = ({ src, alt, className, style, onClick }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(!imageCache.has(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    
    if (!imageCache.has(src)) {
      setIsLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(FALLBACK_IMAGE);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className || ''}`} style={style} onClick={onClick}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <img
        src={hasError ? FALLBACK_IMAGE : imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
      />
    </div>
  );
};

export default CachedImage;
