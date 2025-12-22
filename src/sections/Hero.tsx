import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'

// Types
interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  hue: number
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  parallaxDepth: number
}

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

// Custom hook for mouse tracking with spring physics
function useMouseTracking(containerRef: React.RefObject<HTMLElement>, enabled: boolean) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const normalizedX = (x / rect.width - 0.5) * 2
      const normalizedY = (y / rect.height - 0.5) * 2

      mouseX.set(normalizedX * 15)
      mouseY.set(normalizedY * 15)
      setPosition({ x, y, normalizedX, normalizedY })
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    return () => container?.removeEventListener('mousemove', handleMouseMove)
  }, [enabled, containerRef, mouseX, mouseY])

  return { position, smoothX, smoothY, mouseX, mouseY }
}

// Custom hook for reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// Particle system component
function ParticleField({ mousePosition, enabled }: { mousePosition: MousePosition; enabled: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!enabled) return

    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 230,
    }))
    setParticles(initialParticles)

    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX
          let newY = p.y + p.speedY

          // Mouse repulsion effect
          const dx = mousePosition.normalizedX * 50 + 50 - p.x
          const dy = mousePosition.normalizedY * 50 + 50 - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 20) {
            newX -= (dx / dist) * 0.3
            newY -= (dy / dist) * 0.3
          }

          // Wrap around edges
          if (newX < 0) newX = 100
          if (newX > 100) newX = 0
          if (newY < 0) newY = 100
          if (newY > 100) newY = 0

          return { ...p, x: newX, y: newY }
        })
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [enabled, mousePosition.normalizedX, mousePosition.normalizedY])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: `hsla(${p.hue}, 80%, 70%, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px hsla(${p.hue}, 80%, 70%, ${p.opacity * 0.5})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: p.id * 0.01 }}
        />
      ))}
    </div>
  )
}

// Star field with parallax effect
function StarField({ mousePosition, enabled }: { mousePosition: MousePosition; enabled: boolean }) {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 3 + 2,
      parallaxDepth: Math.random() * 0.5 + 0.1, // 0.1 to 0.6
    })),
    []
  )

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star) => {
        const offsetX = enabled ? mousePosition.normalizedX * star.parallaxDepth * 30 : 0
        const offsetY = enabled ? mousePosition.normalizedY * star.parallaxDepth * 30 : 0

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `calc(${star.x}% + ${offsetX}px)`,
              top: `calc(${star.y}% + ${offsetY}px)`,
              width: star.size,
              height: star.size,
              boxShadow: star.size > 1.5
                ? `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.5), 0 0 ${star.size * 6}px rgba(139, 92, 246, 0.3)`
                : 'none',
            }}
            initial={{ opacity: 0 }}
            animate={enabled ? {
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
              scale: star.size > 1.5 ? [1, 1.2, 1] : 1,
            } : { opacity: star.opacity }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        )
      })}

      {/* Shooting star effect - occasional */}
      {enabled && (
        <motion.div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: '0 0 6px #fff, -20px 0 15px rgba(255,255,255,0.5), -40px 0 25px rgba(139,92,246,0.3)',
          }}
          initial={{ x: '120%', y: '-10%', opacity: 0 }}
          animate={{
            x: '-20%',
            y: '110%',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: 'easeIn',
          }}
        />
      )}
    </div>
  )
}

// Aurora/Nebula background component
function AuroraBackground({ mousePosition, enabled }: { mousePosition: MousePosition; enabled: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(15, 10, 40, 1) 0%, rgba(5, 5, 15, 1) 100%)',
        }}
      />

      {/* Animated aurora layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at ${50 + (enabled ? mousePosition.normalizedX * 10 : 0)}% ${40 + (enabled ? mousePosition.normalizedY * 10 : 0)}%, 
              rgba(99, 102, 241, 0.15) 0%, 
              transparent 50%),
            radial-gradient(ellipse 100% 60% at ${30 + (enabled ? mousePosition.normalizedX * 5 : 0)}% ${60 + (enabled ? mousePosition.normalizedY * 5 : 0)}%, 
              rgba(139, 92, 246, 0.12) 0%, 
              transparent 40%),
            radial-gradient(ellipse 80% 50% at ${70 - (enabled ? mousePosition.normalizedX * 8 : 0)}% ${30 - (enabled ? mousePosition.normalizedY * 8 : 0)}%, 
              rgba(34, 211, 238, 0.08) 0%, 
              transparent 45%)
          `,
        }}
        animate={
          enabled
            ? {
                opacity: [0.8, 1, 0.8],
              }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      {enabled && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
              left: '10%',
              top: '20%',
            }}
            animate={{
              x: [0, 50, 0, -50, 0],
              y: [0, -30, 0, 30, 0],
              scale: [1, 1.1, 1, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              right: '5%',
              bottom: '10%',
            }}
            animate={{
              x: [0, -40, 0, 40, 0],
              y: [0, 40, 0, -40, 0],
              scale: [1, 0.95, 1, 1.05, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  )
}

// Enhanced Saturn ring with orbiting particles
function SaturnRing({
  layer,
  smoothX,
  smoothY,
  enabled,
}: {
  layer: 'back' | 'front'
  smoothX: ReturnType<typeof useSpring>
  smoothY: ReturnType<typeof useSpring>
  enabled: boolean
}) {
  const rotateX = useTransform(smoothY, [-15, 15], [8, -8])
  const rotateY = useTransform(smoothX, [-15, 15], [-8, 8])

  const isBack = layer === 'back'
  const clipPath = isBack ? 'url(#afpClipBack2)' : 'url(#afpClipFront2)'
  const gradientId = isBack ? 'afpRingGradBack2' : 'afpRingGradFront2'
  const strokeWidth = isBack ? 2 : 4
  const baseOpacity = isBack ? 0.6 : 1

  // Orbiting dots
  const orbitDots = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        size: Math.random() * 3 + 2,
        speed: 15 + Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    []
  )

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ zIndex: isBack ? 2 : 18 }}
    >
      <motion.div
        className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] xl:w-[950px] xl:h-[950px]"
        initial={{ opacity: 0, rotate: -25, scale: 0.7 }}
        animate={{ opacity: baseOpacity, rotate: -16, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: isBack ? 0 : 0.2 }}
        style={{
          rotateX: enabled ? rotateX : 0,
          rotateY: enabled ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.8)">
                {enabled && (
                  <animate attributeName="stop-color" values="rgba(99, 102, 241, 0.8);rgba(139, 92, 246, 0.9);rgba(99, 102, 241, 0.8)" dur="4s" repeatCount="indefinite" />
                )}
              </stop>
              <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)">
                {enabled && (
                  <animate attributeName="stop-color" values="rgba(34, 211, 238, 0.6);rgba(99, 102, 241, 0.7);rgba(34, 211, 238, 0.6)" dur="4s" repeatCount="indefinite" />
                )}
              </stop>
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)">
                {enabled && (
                  <animate attributeName="stop-color" values="rgba(139, 92, 246, 0.8);rgba(34, 211, 238, 0.7);rgba(139, 92, 246, 0.8)" dur="4s" repeatCount="indefinite" />
                )}
              </stop>
            </linearGradient>
            <clipPath id="afpClipBack2">
              <rect x="0" y="0" width="400" height="200" />
            </clipPath>
            <clipPath id="afpClipFront2">
              <rect x="0" y="200" width="400" height="200" />
            </clipPath>
            <filter id="afpGlow2">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="50"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            clipPath={clipPath}
            filter="url(#afpGlow2)"
          />

          {/* Secondary thinner ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="155"
            ry="42"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth * 0.4}
            strokeDasharray="8 12"
            clipPath={clipPath}
            opacity={0.5}
          />

          {/* Orbiting particles */}
          {enabled &&
            !isBack &&
            orbitDots.map((dot) => (
              <g key={dot.id}>
                <ellipse cx="200" cy="200" rx="170" ry="50" fill="none" stroke="none">
                  <animateMotion dur={`${dot.speed}s`} repeatCount="indefinite" rotate="auto">
                    <mpath xlinkHref="#orbitPath2" />
                  </animateMotion>
                </ellipse>
                <circle r={dot.size} fill={`rgba(255, 255, 255, ${dot.opacity})`}>
                  <animateMotion dur={`${dot.speed}s`} repeatCount="indefinite" begin={`${(dot.angle / 360) * dot.speed}s`}>
                    <mpath xlinkHref="#orbitPath2" />
                  </animateMotion>
                </circle>
              </g>
            ))}
          <path id="orbitPath2" d="M 30,200 A 170,50 0 1,1 370,200 A 170,50 0 1,1 30,200" fill="none" />
        </svg>
      </motion.div>
    </div>
  )
}

// Animated text with character-by-character reveal
function AnimatedTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const characters = text.split('')

  return (
    <motion.span className={`inline-block ${className}`} aria-label={text}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Magnetic button wrapper
function MagneticElement({
  children,
  className,
  strength = 0.3,
  enabled,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  enabled: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !enabled) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) * strength)
      y.set((e.clientY - centerY) * strength)
    },
    [enabled, strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div ref={ref} className={className} style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  )
}

// Click ripple effect
function ClickRipple({ enabled }: { enabled: boolean }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (!enabled) return

    const handleClick = (e: MouseEvent) => {
      const id = Date.now()
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [enabled])

  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none rounded-full border-2 border-violet-400/50"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  )
}

// Floating geometric shapes
function FloatingShapes({ enabled }: { enabled: boolean }) {
  const shapes = useMemo(
    () => [
      { type: 'triangle', x: 8, y: 20, size: 24, delay: 0.2, duration: 12, rotate: 45 },
      { type: 'square', x: 88, y: 15, size: 18, delay: 0.4, duration: 14, rotate: -30 },
      { type: 'circle', x: 5, y: 65, size: 20, delay: 0.3, duration: 10, rotate: 0 },
      { type: 'hexagon', x: 92, y: 55, size: 22, delay: 0.5, duration: 15, rotate: 20 },
      { type: 'diamond', x: 12, y: 85, size: 16, delay: 0.6, duration: 11, rotate: -15 },
      { type: 'cross', x: 85, y: 80, size: 20, delay: 0.7, duration: 13, rotate: 45 },
    ],
    []
  )

  const renderShape = (type: string, size: number) => {
    const baseClass = 'stroke-current fill-none stroke-[1.5]'
    switch (type) {
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <polygon points="12,2 22,20 2,20" />
          </svg>
        )
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        )
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        )
      case 'hexagon':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
          </svg>
        )
      case 'diamond':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <polygon points="12,2 22,12 12,22 2,12" />
          </svg>
        )
      case 'cross':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className={baseClass}>
            <path d="M12 2v20M2 12h20" />
          </svg>
        )
      default:
        return null
    }
  }

  if (!enabled) return null

  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute text-white/10 pointer-events-none"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            zIndex: i % 2 === 0 ? 1 : 25,
          }}
          initial={{ opacity: 0, scale: 0, rotate: shape.rotate - 180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: shape.rotate,
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay },
            scale: { duration: 0.8, delay: shape.delay },
            rotate: { duration: 0.8, delay: shape.delay },
            y: { duration: shape.duration, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: shape.duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {renderShape(shape.type, shape.size)}
        </motion.div>
      ))}
    </>
  )
}

// 3D Title component (separated to fix hooks order)
function Title3D({
  enabled,
  smoothX,
  smoothY,
}: {
  enabled: boolean
  smoothX: ReturnType<typeof useSpring>
  smoothY: ReturnType<typeof useSpring>
}) {
  const rotateX = useTransform(smoothY, [-15, 15], [4, -4])
  const rotateY = useTransform(smoothX, [-15, 15], [-4, 4])

  return (
    <motion.div
      style={{
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <h1 className="font-display font-black tracking-tighter select-none">
        {/* Portfolio line */}
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white/95 mb-4">
          <AnimatedTitle text={content.home.hero.headline} delay={0.3} />
        </span>

        {/* Year - the star of the show */}
        <motion.span
          className="relative block text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[15rem] leading-[0.85]"
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Base gradient text */}
          <span
            style={{
              background: `linear-gradient(
                135deg,
                #818cf8 0%,
                #a78bfa 20%,
                #22d3ee 40%,
                #34d399 50%,
                #22d3ee 60%,
                #a78bfa 80%,
                #818cf8 100%
              )`,
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: enabled ? 'afpGradientFlow 6s ease infinite' : 'none',
            }}
          >
            {content.home.hero.year}
          </span>

          {/* Shimmer overlay effect */}
          {enabled && (
            <span
              className="absolute inset-0 overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <span
                className="block w-full h-full"
                style={{
                  background: `linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.4) 45%,
                    rgba(255, 255, 255, 0.6) 50%,
                    rgba(255, 255, 255, 0.4) 55%,
                    transparent 100%
                  )`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 100%',
                  animation: 'afpShimmer 3s ease-in-out infinite',
                }}
              >
                {content.home.hero.year}
              </span>
            </span>
          )}

          {/* Glow effect behind */}
          <span
            className="absolute inset-0 blur-[60px] opacity-40 -z-10"
            aria-hidden="true"
            style={{
              background: `linear-gradient(
                135deg,
                #8b5cf6 0%,
                #06b6d4 50%,
                #8b5cf6 100%
              )`,
              backgroundSize: '200% 200%',
              animation: enabled ? 'afpGradientFlow 4s ease infinite' : 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {content.home.hero.year}
          </span>
        </motion.span>
      </h1>
    </motion.div>
  )
}

// Main Hero component
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { position, smoothX, smoothY } = useMouseTracking(heroRef as React.RefObject<HTMLElement>, !prefersReducedMotion)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const enabled = !prefersReducedMotion && isLoaded

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-0" style={{ background: '#050510' }}>
      {/* Star field background with parallax */}
      <StarField mousePosition={position} enabled={enabled} />

      {/* Aurora background */}
      <AuroraBackground mousePosition={position} enabled={enabled} />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 70%)',
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particle field */}
      <ParticleField mousePosition={position} enabled={enabled} />

      {/* Floating shapes - some behind content */}
      <FloatingShapes enabled={enabled} />

      {/* Saturn ring - back layer */}
      <SaturnRing layer="back" smoothX={smoothX} smoothY={smoothY} enabled={enabled} />

      {/* Main content */}
      <Container className="relative" style={{ zIndex: 10 }}>
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Availability badge */}
          <MagneticElement className="inline-block mb-8 sm:mb-12" strength={0.2} enabled={enabled}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-md hover:border-white/20 transition-all duration-500 cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                </span>
                <span className="text-xs sm:text-sm text-white/80 font-medium tracking-wider sm:tracking-widest uppercase">{content.site.availability}</span>
              </span>
            </motion.div>
          </MagneticElement>

          {/* Title block with 3D perspective */}
          <div className="relative" style={{ perspective: '1200px' }}>
            <Title3D enabled={enabled} smoothX={smoothX} smoothY={smoothY} />
          </div>

          {/* Saturn ring - front layer */}
          <SaturnRing layer="front" smoothX={smoothX} smoothY={smoothY} enabled={enabled} />

          {/* Name and subtitle */}
          <motion.div
            className="mt-8 sm:mt-12 space-y-3 sm:space-y-4 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold tracking-wide">{content.site.name}</p>
            <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed font-light px-2 sm:px-0">{content.home.hero.subtitle}</p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mt-10 sm:mt-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticElement strength={0.15} enabled={enabled} className="w-full sm:w-auto">
              <Button href={content.site.whatsappUrl} external className="w-full sm:w-auto">
                Hablemos por WhatsApp
              </Button>
            </MagneticElement>
            <MagneticElement strength={0.15} enabled={enabled} className="w-full sm:w-auto">
              <Button href="/proyectos" variant="secondary" className="w-full sm:w-auto">
                Ver proyectos
              </Button>
            </MagneticElement>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="text-xs text-white/30 uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
              animate={enabled ? { borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-white/50"
                animate={enabled ? { y: [0, 8, 0], opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Click ripple effect */}
      <ClickRipple enabled={enabled} />

      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(5, 5, 16, 0.6) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />

      {/* Keyframes */}
      <style>{`
        @keyframes afpGradientFlow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
        }

        @keyframes afpShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}