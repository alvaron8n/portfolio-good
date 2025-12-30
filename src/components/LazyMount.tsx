import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

interface LazyMountProps {
  children: ReactNode
  threshold?: number // 0 to 1
  rootMargin?: string // e.g., "200px"
  minHeight?: string // Minimal height to reserve space
}

export function LazyMount({ 
  children, 
  threshold = 0.1, 
  rootMargin = "600px", // Generous margin to load before user sees it
  minHeight = "100px" 
}: LazyMountProps) {
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [isMounted, rootMargin, threshold])

  if (!isMounted) {
    return <div ref={ref} style={{ minHeight }} className="w-full" />
  }

  return <>{children}</>
}