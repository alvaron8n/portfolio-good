import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ className = '', size = 'md', showText = false }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  }

  return (
    <Link
      to="/"
      className={`
        flex items-center gap-2
        transition-opacity duration-200
        hover:opacity-80
        ${className}
      `}
      aria-label="Ir al inicio"
    >
      <img 
        src="/logo-af.png" 
        alt="ÁF Logo" 
        className={`${sizes[size]} w-auto`}
      />
      {showText && (
        <span className="font-display font-bold text-white text-lg tracking-tight">
          Álvaro Fernández
        </span>
      )}
    </Link>
  )
}
