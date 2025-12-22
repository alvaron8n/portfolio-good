import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  tilt?: boolean
  variant?: 'default' | 'glass' | 'gradient'
}

export function Card({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  tilt = false,
  variant = 'default'
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 300, damping: 30 })
  const glowX = useTransform(mouseX, [0, 1], [0, 100])
  const glowY = useTransform(mouseY, [0, 1], [0, 100])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !tilt) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }

  const variantStyles = {
    default: 'bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]',
    glass: 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/[0.1]',
    gradient: 'bg-gradient-to-br from-violet-500/10 to-cyan-500/5 backdrop-blur-sm border border-violet-500/20',
  }

  const hoverStyles = hover 
    ? 'transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]' 
    : ''

  if (tilt) {
    return (
      <motion.div
        ref={cardRef}
        className={`
          relative rounded-2xl p-6 md:p-8 overflow-hidden
          ${variantStyles[variant]}
          ${hoverStyles}
          ${className}
        `}
        style={{
          perspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: tilt ? rotateX : 0,
            rotateY: tilt ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {/* Glow effect */}
        {glow && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Shine effect */}
        {hover && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
      </motion.div>
    )
  }

  return (
    <div
      className={`
        relative rounded-2xl p-6 md:p-8 overflow-hidden
        ${variantStyles[variant]}
        ${hoverStyles}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Specialized card for stats/metrics
export function StatCard({ 
  value, 
  label, 
  icon,
  color = 'violet' 
}: { 
  value: string
  label: string
  icon?: ReactNode
  color?: 'violet' | 'cyan' | 'emerald'
}) {
  const colors = {
    violet: {
      text: '#A78BFA',
      glow: 'rgba(139, 92, 246, 0.2)',
      border: 'rgba(139, 92, 246, 0.3)',
    },
    cyan: {
      text: '#22D3EE',
      glow: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)',
    },
    emerald: {
      text: '#10B981',
      glow: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
  }

  const colorConfig = colors[color]

  return (
    <motion.div
      className="relative flex flex-col items-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden group"
      whileHover={{ y: -4, borderColor: colorConfig.border }}
      transition={{ duration: 0.2 }}
    >
      {icon && (
        <div className="mb-3 text-2xl" style={{ color: colorConfig.text }}>
          {icon}
        </div>
      )}
      <span 
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ color: colorConfig.text }}
      >
        {value}
      </span>
      <span className="text-sm text-white/50 text-center">
        {label}
      </span>
      
      {/* Glow on hover */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${colorConfig.glow} 0%, transparent 70%)`,
          transform: 'translateX(-50%) translateY(50%)',
        }}
      />
    </motion.div>
  )
}

// Feature card with icon
export function FeatureCard({
  icon,
  title,
  description,
  index = 0,
}: {
  icon: ReactNode
  title: string
  description: string
  index?: number
}) {
  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] group hover:border-violet-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="w-12 h-12 mb-4 text-violet-400 group-hover:text-violet-300 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-100 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
