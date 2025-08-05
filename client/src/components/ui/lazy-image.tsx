import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src?: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export function LazyImage({ 
  src, 
  webpSrc, 
  alt, 
  className, 
  width, 
  height, 
  placeholder 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {!isLoaded && placeholder && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse flex items-center justify-center"
        >
          <div className="text-slate-500 text-sm">Loading...</div>
        </div>
      )}
      
      {isInView && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={src || webpSrc}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={handleLoad}
            loading="lazy"
          />
        </picture>
      )}
    </div>
  );
}