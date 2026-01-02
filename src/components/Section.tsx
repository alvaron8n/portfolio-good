import { forwardRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'

export interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  tight?: boolean
  style?: CSSProperties
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ children, className = '', id, tight = false, style }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={`${tight ? 'py-10 md:py-12' : 'py-12 md:py-16'} ${className}`}
        style={style}
      >
        {children}
      </section>
    )
  }
)
