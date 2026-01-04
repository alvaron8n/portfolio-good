import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FloatingIconProps {
  children: React.ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  z?: number
}

export function FloatingIcon({
  children,
  className = '',
  delay = 0,
  x = 0,
  y = 0,
  z = 0,
}: FloatingIconProps) {
  // Generate stable random duration on mount
  const randomDuration = useMemo(() => 3 + (((x * 17 + y * 31) % 100) / 100) * 2, [x, y])
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: z > 0 ? 20 : 5,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: z > 0 ? 0.9 : 0.4,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration: randomDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
    >
      <span
        className={`
          text-2xl md:text-3xl
          ${z > 0 ? 'drop-shadow-lg' : 'opacity-60'}
        `}
        style={{
          filter: z < 0 ? 'blur(1px)' : 'none',
        }}
      >
        {children}
      </span>
    </motion.div>
  )
}
