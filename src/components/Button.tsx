import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glow'
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
    bg-gradient-to-r from-violet-600 to-violet-500 
    text-white 
    shadow-[0_0_20px_rgba(139,92,246,0.3)]
    hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
    hover:from-violet-500 hover:to-violet-400
    border border-violet-500/50
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
    bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500
    text-white
    shadow-[0_0_30px_rgba(139,92,246,0.3)]
    hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]
    border border-white/10
    background-size: 200% 200%
    animate-gradient
  `,
  glow: `
    bg-gradient-to-r from-emerald-500 to-emerald-400
    text-white
    shadow-[0_4px_20px_rgba(16,185,129,0.4)]
    hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)]
    border border-emerald-400/50
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
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
    font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a12]
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

  // Motion wrapper for animations
  const MotionComponent = ({ children: motionChildren }: { children: ReactNode }) => (
    <motion.span
      className="inline-block"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {motionChildren}
    </motion.span>
  )

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <MotionComponent>
          <a
            href={href}
            className={`group ${combinedStyles}`}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>
        </MotionComponent>
      )
    }

    return (
      <MotionComponent>
        <Link to={href} className={`group ${combinedStyles}`}>
          {content}
        </Link>
      </MotionComponent>
    )
  }

  return (
    <MotionComponent>
      <button
        type={type}
        className={`group ${combinedStyles}`}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </MotionComponent>
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
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
  `

  const variantMap: Record<ButtonVariant, string> = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/20',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    ghost: 'text-white/60 hover:text-white hover:bg-white/5',
    gradient: 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white',
    glow: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30',
  }

  const Component = href ? (external ? 'a' : Link) : 'button'
  const linkProps = href ? (external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: href }) : {}

  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Component
        {...(linkProps as any)}
        className={`${baseStyles} ${variantMap[variant]} ${className}`}
        onClick={onClick}
        aria-label={label}
      >
        <span className={iconSizeMap[size]}>{icon}</span>
      </Component>
    </motion.span>
  )
}
