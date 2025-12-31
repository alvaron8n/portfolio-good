import { useEffect, useRef } from 'react'

export function SpotlightEffect() {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return
      const x = e.clientX
      const y = e.clientY
      
      divRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 240, 255, 0.06), transparent 40%)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={divRef}
      className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-500"
      style={{
        background: 'radial-gradient(600px circle at 50% 50%, rgba(0, 240, 255, 0.06), transparent 40%)'
      }}
    />
  )
}