import { motion } from 'framer-motion'
import { useMemo, memo, useState } from 'react'

// Simple seeded pseudo-random generator for stable values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// ===========================================
// PARTICLE FIELD - Sutil y optimizado
// ===========================================
interface ParticleFieldProps {
  count?: number
  color?: string
  className?: string
}

export const ParticleField = memo(({ 
  count = 12, 
  color = 'orange',
  className = '',
}: ParticleFieldProps) => {
  // Use lazy state initializer - only runs once on mount
  const [randomValues] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      x: seededRandom(i * 1) * 100,
      y: seededRandom(i * 2) * 100,
      size: 2 + seededRandom(i * 3) * 2,
      duration: 15 + seededRandom(i * 4) * 10,
      delay: seededRandom(i * 5) * 5,
    }))
  )
  
  const particles = useMemo(() => 
    randomValues.slice(0, count).map((p, i) => ({ ...p, id: i })), 
    [count, randomValues]
  )

  const colorValue = {
    orange: 'rgba(249, 115, 22, 0.4)',
    amber: 'rgba(251, 191, 36, 0.4)',
    emerald: 'rgba(34, 197, 94, 0.4)',
    red: 'rgba(239, 68, 68, 0.4)',
  }[color] || 'rgba(249, 115, 22, 0.4)'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: colorValue,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
})

ParticleField.displayName = 'ParticleField'

// ===========================================
// GEOMETRIC SHAPES - Sutil con CSS
// ===========================================
interface GeometricShapesProps {
  variant?: 'default' | 'minimal'
  className?: string
}

export const GeometricShapes = memo(({ 
  variant = 'default',
  className = '',
}: GeometricShapesProps) => {
  const shapes = {
    default: [
      { type: 'hexagon', size: 200, x: '88%', y: '5%', duration: 60 },
      { type: 'hexagon', size: 140, x: '2%', y: '65%', duration: 50 },
      { type: 'circle', size: 100, x: '92%', y: '55%', duration: 40 },
    ],
    minimal: [
      { type: 'hexagon', size: 160, x: '90%', y: '10%', duration: 55 },
      { type: 'circle', size: 90, x: '5%', y: '70%', duration: 45 },
    ],
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes[variant].map((shape, i) => (
        <motion.svg
          key={i}
          className="absolute opacity-[0.04] will-change-transform"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {shape.type === 'hexagon' && (
            <polygon 
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="0.8"
            />
          )}
          {shape.type === 'circle' && (
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="0.8" />
          )}
        </motion.svg>
      ))}
    </div>
  )
})

GeometricShapes.displayName = 'GeometricShapes'

// ===========================================
// GRADIENT ORBS - Optimizado con CSS
// ===========================================
interface OrbConfig {
  color: string
  size: number
  x: string
  y: string
}

interface GradientOrbsProps {
  orbs?: OrbConfig[]
  className?: string
}

export const GradientOrbs = memo(({ orbs, className = '' }: GradientOrbsProps) => {
  const defaultOrbs: OrbConfig[] = [
    { color: 'rgba(249, 115, 22, 0.12)', size: 400, x: '80%', y: '20%' },
    { color: 'rgba(251, 191, 36, 0.08)', size: 300, x: '10%', y: '70%' },
  ]

  const orbsToRender = orbs || defaultOrbs

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbsToRender.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  )
})

GradientOrbs.displayName = 'GradientOrbs'

// ===========================================
// GRID PATTERN - CSS puro, sin animación JS
// ===========================================
interface GridPatternProps {
  size?: number
  color?: string
  className?: string
}

export const GridPattern = memo(({
  size = 80,
  color = 'rgba(249, 115, 22, 0.04)',
  className = ''
}: GridPatternProps) => (
  <div
    className={`absolute inset-0 ${className}`}
    style={{
      backgroundImage: `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `,
      backgroundSize: `${size}px ${size}px`,
      maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 70%)',
    }}
  />
))

GridPattern.displayName = 'GridPattern'

// ===========================================
// GLOW PULSE - Simple y elegante
// ===========================================
interface GlowPulseProps {
  color?: string
  size?: number
  className?: string
}

export const GlowPulse = memo(({
  color = 'rgba(249, 115, 22, 0.15)',
  size = 500,
  className = ''
}: GlowPulseProps) => (
  <motion.div
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform ${className}`}
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
))

GlowPulse.displayName = 'GlowPulse'

// ===========================================
// CONSTELLATION - Reducido y optimizado
// ===========================================
interface ConstellationProps {
  nodeCount?: number
  color?: string
  className?: string
}

export const Constellation = memo(({
  nodeCount = 10,
  color = 'rgba(249, 115, 22, 0.3)',
  className = ''
}: ConstellationProps) => {
  // Use lazy state initializer - only runs once on mount
  const [randomValues] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      x: 10 + seededRandom(i * 100 + 1) * 80,
      y: 10 + seededRandom(i * 100 + 2) * 80,
      size: 2 + seededRandom(i * 100 + 3) * 2,
    }))
  )
  
  const nodes = useMemo(() => 
    randomValues.slice(0, nodeCount).map((p, i) => ({ ...p, id: i })), 
    [nodeCount, randomValues]
  )

  const connections = useMemo(() => {
    const conns: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        const dist = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + 
          Math.pow(node.y - otherNode.y, 2)
        )
        if (dist < 30 && conns.length < 15) {
          conns.push({ x1: node.x, y1: node.y, x2: otherNode.x, y2: otherNode.y })
        }
      })
    })
    return conns
  }, [nodes])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full">
        {connections.map((conn, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={color}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
        
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={color}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.id * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  )
})

Constellation.displayName = 'Constellation'

// ===========================================
// AMBIENT GLOW - Efecto simple de ambiente
// ===========================================
interface AmbientGlowProps {
  color?: string
  position?: 'top-right' | 'bottom-left' | 'center'
  className?: string
}

export const AmbientGlow = memo(({
  color = 'rgba(249, 115, 22, 0.1)',
  position = 'top-right',
  className = ''
}: AmbientGlowProps) => {
  const positionStyles = {
    'top-right': { top: '-10%', right: '-10%' },
    'bottom-left': { bottom: '-10%', left: '-10%' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  }

  return (
    <motion.div
      className={`absolute w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform ${className}`}
      style={{
        ...positionStyles[position],
        background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
        filter: 'blur(80px)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
})

AmbientGlow.displayName = 'AmbientGlow'
