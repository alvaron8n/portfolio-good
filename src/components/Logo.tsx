import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`
        font-display font-bold text-xl
        text-white hover:text-white/90
        transition-colors duration-200
        ${className}
      `}
      aria-label="Ir al inicio"
    >
      ÁF
    </Link>
  )
}
