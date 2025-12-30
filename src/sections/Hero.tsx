import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { content } from '../content/content'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 50])

  const { hero } = content.home

  return (
    <section ref={sectionRef} className="hero-section-wrap">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-grad1" />
        <div className="hero-bg-grad2" />
        <div className="hero-bg-grid" />
      </div>

      {/* Content */}
      <Container className="hero-content-container">
        <motion.div 
          className="hero-content-inner"
          style={prefersReducedMotion ? {} : { opacity, y }}
        >
          {/* Main content - centered */}
          <div className="hero-copy-block">
            {/* Availability badge */}
            <motion.div
              className="hero-availability-badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="hero-availability-dot" />
              <span>Disponible para proyectos</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="hero-main-name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {hero.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="hero-main-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {hero.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              className="hero-main-description"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <a
                href={hero.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary"
              >
                <span>{hero.cta.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              
              <Link
                to={hero.ctaSecondary.href}
                className="hero-cta-secondary"
              >
                <span>{hero.ctaSecondary.label}</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Fade bottom */}
      <div className="hero-fade" />
    </section>
  )
}
