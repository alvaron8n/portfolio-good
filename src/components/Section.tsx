import { forwardRef } from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  tight?: boolean
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, className = '', id, tight = false }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={`${tight ? 'py-12 md:py-16' : 'py-20 md:py-28'} ${className}`}
      >
        {children}
      </section>
    )
  }
)
