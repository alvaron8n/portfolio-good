import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: string // "16/9", "4/3", etc.
  className?: string
  priority?: boolean // If true, sets fetchPriority="high" and loading="eager"
}

export function SmartImage({
  src,
  alt,
  aspectRatio,
  className,
  priority = false,
  ...props
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Optimize Unsplash URLs if detected
  const optimizedSrc = useMemo(() => {
    if (src.includes('unsplash.com')) {
      const url = new URL(src)
      url.searchParams.set('auto', 'format')
      url.searchParams.set('fit', 'crop')
      url.searchParams.set('q', '80')
      // Default width if not present, to prevent downloading full res
      if (!url.searchParams.has('w')) {
        url.searchParams.set('w', '800')
      }
      return url.toString()
    }
    return src
  }, [src])

  return (
    <div
      className={cn("relative overflow-hidden bg-white/5", className)}
      style={{ aspectRatio }}
    >
      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error - fetchPriority is standard but missing in React types currently
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      
      {/* Simple skeleton loader while image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-white/10" />
      )}
    </div>
  )
}

import { useMemo } from 'react'