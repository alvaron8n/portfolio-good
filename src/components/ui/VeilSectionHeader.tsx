import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================
type VeilVariant = 'services' | 'projects' | 'about' | 'contact'

interface VeilSectionHeaderProps {
  variant: VeilVariant
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  className?: string
}

// ============================================
// VARIANT PRESETS
// ============================================
const variantPresets: Record<
  VeilVariant,
  {
    hueShift: number
    noiseIntensity: number
    scanlineIntensity: number
    scanlineFrequency: number
    warpAmount: number
    speed: number
    accentColor: string
    accentGlow: string
  }
> = {
  services: {
    hueShift: 280, // Violet
    noiseIntensity: 0.18,
    scanlineIntensity: 0.01,
    scanlineFrequency: 0.3,
    warpAmount: 0.04,
    speed: 0.12,
    accentColor: 'rgba(139, 92, 246, 0.6)',
    accentGlow: 'rgba(139, 92, 246, 0.25)',
  },
  projects: {
    hueShift: 195, // Cyan
    noiseIntensity: 0.16,
    scanlineIntensity: 0.01,
    scanlineFrequency: 0.3,
    warpAmount: 0.035,
    speed: 0.10,
    accentColor: 'rgba(6, 182, 212, 0.55)',
    accentGlow: 'rgba(6, 182, 212, 0.20)',
  },
  about: {
    hueShift: 155, // Teal/Emerald
    noiseIntensity: 0.14,
    scanlineIntensity: 0.008,
    scanlineFrequency: 0.25,
    warpAmount: 0.03,
    speed: 0.08,
    accentColor: 'rgba(16, 185, 129, 0.50)',
    accentGlow: 'rgba(16, 185, 129, 0.18)',
  },
  contact: {
    hueShift: 295, // Purple/Magenta
    noiseIntensity: 0.20,
    scanlineIntensity: 0.012,
    scanlineFrequency: 0.35,
    warpAmount: 0.045,
    speed: 0.14,
    accentColor: 'rgba(168, 85, 247, 0.60)',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
  },
}

// ============================================
// COMPONENT
// ============================================
export function VeilSectionHeader({
  variant,
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className,
}: VeilSectionHeaderProps) {
  // We keep the preset logic for accent colors, but remove the canvas rendering entirely
  const preset = variantPresets[variant]

  return (
    <motion.div
      className={cn(
        'relative isolate w-full overflow-visible',
        'py-12 sm:py-16 lg:py-20',
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Canvas removed to ensure clean text-only look as requested */}

      {/* === CONTENT === z-20 */}
      <div
        className={cn(
          'relative z-20 flex flex-col bg-transparent',
          'px-4 sm:px-6 lg:px-8',
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        )}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <motion.div
            className="flex items-center gap-3 mb-4 sm:mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {align === 'center' && (
              <span
                className="w-8 sm:w-10 h-px rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${preset.accentColor})`,
                }}
              />
            )}
            <span
              className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: preset.accentColor }}
            >
              {eyebrow}
            </span>
            {align === 'center' && (
              <span
                className="w-8 sm:w-10 h-px rounded-full"
                style={{
                  background: `linear-gradient(to left, transparent, ${preset.accentColor})`,
                }}
              />
            )}
          </motion.div>
        )}

        {/* Title */}
        <motion.h2
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className={cn(
              'mt-3 sm:mt-4 text-base sm:text-lg text-white/65 leading-relaxed',
              align === 'center' ? 'max-w-xl' : 'max-w-2xl'
            )}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export default VeilSectionHeader
