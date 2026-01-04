import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glow' | 'brand'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  href?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-orange-600 to-orange-500 
    text-white 
    shadow-[0_0_20px_rgba(249,115,22,0.3)]
    hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]
    hover:from-orange-500 hover:to-orange-400
    border border-orange-500/50
  `,
  secondary: `
    bg-white/[0.05] 
    text-white 
    border border-white/[0.1] 
    hover:bg-white/[0.1] 
    hover:border-white/[0.2]
    backdrop-blur-sm
  `,
  ghost: `
    text-white/70 
    hover:text-white 
    hover:bg-white/[0.05]
  `,
  gradient: `
    bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
    text-white
    shadow-[0_0_30px_rgba(249,115,22,0.3)]
    hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]
    border border-white/10
    background-size: 200% 200%
  `,
  glow: `
    bg-gradient-to-r from-emerald-500 to-emerald-400
    text-white
    shadow-[0_4px_20px_rgba(16,185,129,0.4)]
    hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)]
    border border-emerald-400/50
  `,
  brand: `
    bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400
    text-white font-semibold
    shadow-[0_4px_24px_rgba(249,115,22,0.35)]
    hover:shadow-[0_8px_32px_rgba(249,115,22,0.5)]
    border border-orange-400/30
    hover:border-orange-400/50
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm gap-2 min-h-[44px]', /* Enhanced for touch targets */
  md: 'px-6 py-3 text-base gap-2 min-h-[48px]',
  lg: 'px-8 py-4 text-lg gap-3 min-h-[56px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  external,
  type = 'button',
  disabled,
  onClick,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-display font-semibold rounded-xl
    transition-all duration-250 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]
    disabled:opacity-50 disabled:pointer-events-none
    overflow-hidden
  `

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const content = (
    <>
      {/* Shine effect on hover */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full hover-shine bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      
      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </span>
    </>
  )

  // Motion props for animations
  const motionProps = {
    className: "inline-block",
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  }

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <motion.span {...motionProps}>
          <a
            href={href}
            className={`group ${combinedStyles}`}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>
        </motion.span>
      )
    }

    return (
      <motion.span {...motionProps}>
        <Link to={href} className={`group ${combinedStyles}`}>
          {content}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.span {...motionProps}>
      <button
        type={type}
        className={`group ${combinedStyles}`}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </motion.span>
  )
}

// Icon-only button variant
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  href,
  external,
  onClick,
}: {
  icon: ReactNode
  label: string
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  external?: boolean
  onClick?: () => void
}) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const baseStyles = `
    ${sizeMap[size]}
    inline-flex items-center justify-center
    rounded-xl
    transition-all duration-250
    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500
  `

  const variantMap: Record<ButtonVariant, string> = {
    primary: 'bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-500/20',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    ghost: 'text-white/60 hover:text-white hover:bg-white/5',
    gradient: 'bg-gradient-to-r from-orange-600 to-amber-500 text-white',
    glow: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30',
    brand: 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30',
  }

  const combinedClassName = `${baseStyles} ${variantMap[variant]} ${className}`
  const iconContent = <span className={iconSizeMap[size]}>{icon}</span>
  
  const motionWrapperProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 }
  }

  if (href) {
    if (external) {
      return (
        <motion.span {...motionWrapperProps}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
            aria-label={label}
          >
            {iconContent}
          </a>
        </motion.span>
      )
    }
    return (
      <motion.span {...motionWrapperProps}>
        <Link to={href} className={combinedClassName} aria-label={label}>
          {iconContent}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.span {...motionWrapperProps}>
      <button
        className={combinedClassName}
        onClick={onClick}
        aria-label={label}
      >
        {iconContent}
      </button>
    </motion.span>
  )
}
