import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Container } from '../components/Container'
import CurvedLoop from '../components/ui/CurvedLoop'

// ============================================
// SVG FALLBACK - Sistema de nodos animado
// ============================================
function PhoneFallback() {
  return (
    <div className="phone-fallback">
      <svg viewBox="0 0 200 340" className="phone-fallback-svg">
        {/* Phone frame */}
        <rect 
          x="10" y="10" width="180" height="320" rx="24" 
          fill="url(#phoneGrad)" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1"
        />
        
        {/* Screen */}
        <rect 
          x="18" y="30" width="164" height="280" rx="16" 
          fill="#0a0a12"
        />
        
        {/* Notch */}
        <rect x="70" y="14" width="60" height="8" rx="4" fill="#0a0a12" />
        
        {/* Network diagram */}
        <g transform="translate(100, 170)">
          {/* Lines */}
          <line x1="0" y1="-50" x2="-40" y2="0" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="-50" x2="40" y2="0" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
          <line x1="-40" y1="0" x2="0" y2="50" stroke="#10b981" strokeWidth="1" opacity="0.4" />
          <line x1="40" y1="0" x2="0" y2="50" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
          
          {/* Nodes */}
          <circle cx="0" cy="-50" r="12" fill="#8b5cf6" opacity="0.2" />
          <circle cx="0" cy="-50" r="6" fill="#8b5cf6" />
          
          <circle cx="-40" cy="0" r="10" fill="#22d3ee" opacity="0.2" />
          <circle cx="-40" cy="0" r="5" fill="#22d3ee" />
          
          <circle cx="40" cy="0" r="10" fill="#10b981" opacity="0.2" />
          <circle cx="40" cy="0" r="5" fill="#10b981" />
          
          <circle cx="0" cy="50" r="12" fill="#f59e0b" opacity="0.2" />
          <circle cx="0" cy="50" r="6" fill="#f59e0b" />
          
          {/* Center node */}
          <circle cx="0" cy="0" r="16" fill="#ea4b71" opacity="0.15" />
          <circle cx="0" cy="0" r="8" fill="#ea4b71" />
          
          {/* Labels */}
          <text x="0" y="-65" textAnchor="middle" fill="white" fontSize="8" opacity="0.6">IA</text>
          <text x="-40" y="18" textAnchor="middle" fill="white" fontSize="7" opacity="0.6">React</text>
          <text x="40" y="18" textAnchor="middle" fill="white" fontSize="7" opacity="0.6">Supabase</text>
          <text x="0" y="70" textAnchor="middle" fill="white" fontSize="8" opacity="0.6">APIs</text>
          <text x="0" y="12" textAnchor="middle" fill="white" fontSize="7" opacity="0.6">n8n</text>
        </g>
        
        {/* Gradient defs */}
        <defs>
          <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a3e" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ============================================
// PHONE 3D COMPONENT
// ============================================
function Phone3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 80,
    damping: 25
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 80,
    damping: 25
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Preload image
  useEffect(() => {
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageError(true)
    img.src = '/hero-phone.png'
  }, [])

  return (
    <div
      ref={containerRef}
      className="phone3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow */}
      <div className="phone3d-glow" />
      
      {/* Phone wrapper */}
      <motion.div
        className="phone3d-wrapper"
        style={isMobile ? {} : { rotateX, rotateY }}
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1 
        }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="phone3d-float"
          animate={isMobile ? {} : { y: [0, -12, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Show image if loaded, fallback if error */}
          {imageLoaded && !imageError ? (
            <img 
              src="/hero-phone.png"
              alt="Dashboard de automatización con IA"
              className="phone3d-img"
            />
          ) : (
            <PhoneFallback />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ============================================
// MAIN HERO
// ============================================
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

  return (
    <section ref={sectionRef} className="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-grad1" />
        <div className="hero-bg-grad2" />
        <div className="hero-bg-grid" />
      </div>

      {/* Content */}
      <Container className="hero-container">
        <motion.div 
          className="hero-grid"
          style={prefersReducedMotion ? {} : { opacity, y }}
        >
          {/* LEFT: Copy */}
          <div className="hero-left">
            {/* Badge */}
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="hero-badge-dot" />
              <span>2 slots este mes</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="hero-line1">Tu equipo</span>
              <span className="hero-line2">odia Excel.</span>
            </motion.h1>

            {/* Accent */}
            <motion.p
              className="hero-accent"
              initial={{ opacity: 0, y: 16, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              yo lo automatizo.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="https://cal.com/alvarofp/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta"
              >
                <span>Reserva 15 min</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Visual */}
          <div className="hero-right">
            <Phone3D />
          </div>
        </motion.div>
      </Container>

      {/* Curved Loop */}
      <div className="hero-loop">
        <CurvedLoop
          marqueeText="n8n ✦ React ✦ Supabase ✦ IA ✦ Automatización ✦ Reserva 15 min ✦ "
          speed={1.2}
          curveAmount={100}
          direction="left"
          interactive={true}
        />
      </div>

      {/* Fade */}
      <div className="hero-fade" />
    </section>
  )
}
