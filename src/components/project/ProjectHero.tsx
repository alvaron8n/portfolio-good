import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../Container'

interface ProjectHeroProps {
  category: string
  title: React.ReactNode
  subtitle: string
  tags: string[]
  backLink?: string
  className?: string
  children?: React.ReactNode // For extra elements like bg effects
}

export function ProjectHero({
  category,
  title,
  subtitle,
  tags,
  backLink = '/proyectos',
  className = '',
  children
}: ProjectHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section 
      ref={heroRef}
      className={`crm-hero ${className}`} // Keeping crm-hero for backward compatibility/specific styles
      style={{ y: heroY, opacity: heroOpacity }}
    >
      {children}

      <Container>
        <div className="crm-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={backLink} className="crm-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </Link>
          </motion.div>

          <motion.span 
            className="crm-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {category}
          </motion.span>

          <motion.h1 
            className="crm-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.p 
            className="crm-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>

          <motion.div 
            className="crm-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {tags.map((tag) => (
              <span key={tag} className="crm-tag">{tag}</span>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div 
        className="crm-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>Scroll</span>
        <motion.div 
          className="crm-scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.section>
  )
}