import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className = '', hoverEffect = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-premium rounded-2xl relative group ${className}`}
      {...props}
    >
      {/* Specular Gradient Overlay (follows mouse logic to be added if needed, static for now) */}
      {hoverEffect && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)'
          }}
        />
      )}
      
      {children}
    </motion.div>
  )
}