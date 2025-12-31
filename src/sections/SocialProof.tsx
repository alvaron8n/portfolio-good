import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import CurvedLoop from '../components/ui/CurvedLoop'

// ============================================
// EPIC MANIFESTO CARD - Premium Glass with 3D
// ============================================
function EpicManifestoCard() {
  const { socialProof } = content.home
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Mouse tracking
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  // Spring physics for smooth movement
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  // 3D Tilt transforms
  const rotateX = useTransform(smoothMouseY, [0, 1], [12, -12])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-12, 12])
  
  // Parallax for inner elements
  const parallaxX = useTransform(smoothMouseX, [0, 1], [-20, 20])
  const parallaxY = useTransform(smoothMouseY, [0, 1], [-15, 15])
  
  // Light position for specular highlight
  const lightX = useTransform(smoothMouseX, [0, 1], [0, 100])
  const lightY = useTransform(smoothMouseY, [0, 1], [0, 100])
  
  // Dynamic gradients
  const spotlightGradient = useMotionTemplate`
    radial-gradient(
      800px circle at ${lightX}% ${lightY}%,
      rgba(249, 115, 22, 0.12),
      transparent 50%
    )
  `
  
  const specularGradient = useMotionTemplate`
    radial-gradient(
      400px circle at ${lightX}% ${lightY}%,
      rgba(255, 255, 255, 0.08),
      transparent 40%
    )
  `
  
  const borderGradient = useMotionTemplate`
    linear-gradient(
      ${useTransform(smoothMouseX, [0, 1], [135, 225])}deg,
      rgba(234, 88, 12, 0.6),
      rgba(249, 115, 22, 0.3) 30%,
      rgba(251, 191, 36, 0.1) 50%,
      rgba(249, 115, 22, 0.3) 70%,
      rgba(234, 88, 12, 0.6)
    )
  `

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  // Parse quote to highlight keywords
  const renderQuoteText = () => {
    const text = socialProof.quote.text
    const keywords = ['IA', 'persona']
    
    // Split by keywords while preserving them
    const parts: { text: string; isKeyword: boolean }[] = []
    let remaining = text
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi')
      remaining = remaining.replace(regex, '|||$1|||')
    })
    
    remaining.split('|||').forEach(part => {
      if (part) {
        const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase())
        parts.push({ text: part, isKeyword })
      }
    })
    
    return parts.map((part, i) => {
      if (part.isKeyword) {
        return (
          <motion.span
            key={i}
            className="epic-keyword"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="epic-keyword-text">{part.text}</span>
            <motion.span 
              className="epic-keyword-underline"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="epic-keyword-glow" />
          </motion.span>
        )
      }
      
      return (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
        >
          {part.text}
        </motion.span>
      )
    })
  }

  return (
    <motion.div
      className="epic-card-perspective"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        className="epic-card-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer glow */}
        <motion.div 
          className="epic-outer-glow"
          animate={{ 
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Animated border */}
        <motion.div 
          className="epic-border-wrapper"
          style={{ background: borderGradient }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <div className="epic-border-inner" />
        </motion.div>
        
        {/* Main glass card */}
        <div className="epic-glass-card">
          {/* Noise texture overlay */}
          <div className="epic-noise" />
          
          {/* Specular highlight */}
          <motion.div 
            className="epic-specular"
            style={{ background: specularGradient }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Spotlight effect */}
          <motion.div 
            className="epic-spotlight"
            style={{ background: spotlightGradient }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Top edge highlight */}
          <div className="epic-edge-top" />
          
          {/* Left edge highlight */}
          <div className="epic-edge-left" />
          
          {/* Content with parallax */}
          <motion.div 
            className="epic-content"
            style={{
              x: isHovered ? parallaxX : 0,
              y: isHovered ? parallaxY : 0,
            }}
          >
            {/* Decorative quote marks */}
            <motion.div 
              className="epic-quote-marks"
              animate={{ 
                opacity: isHovered ? 0.15 : 0.08,
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? -5 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 100 80" fill="none">
                <path 
                  d="M30 40C30 24.536 42.536 12 58 12V12C58 12 58 24 58 40C58 56 42 72 30 72V72C30 56 30 40 30 40Z" 
                  stroke="url(#quoteGrad)" 
                  strokeWidth="3"
                />
                <path 
                  d="M0 40C0 24.536 12.536 12 28 12V12C28 12 28 24 28 40C28 56 12 72 0 72V72C0 56 0 40 0 40Z" 
                  stroke="url(#quoteGrad)" 
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="quoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Main quote */}
            <blockquote className="epic-quote">
              <p className="epic-quote-text">
                {renderQuoteText()}
              </p>
            </blockquote>
            
            {/* Author section */}
            <motion.footer 
              className="epic-author"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="epic-author-line">
                <motion.span 
                  className="epic-author-line-inner"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </div>
              <span className="epic-author-name">{socialProof.quote.author}</span>
              <div className="epic-author-badge">
                <span className="epic-author-badge-dot" />
                <span className="epic-author-badge-text">Founder</span>
              </div>
            </motion.footer>
          </motion.div>
          
          {/* Corner accents */}
          <div className="epic-corner epic-corner-tl" />
          <div className="epic-corner epic-corner-tr" />
          <div className="epic-corner epic-corner-bl" />
          <div className="epic-corner epic-corner-br" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SocialProof() {
  return (
    <Section className="epic-section">
      {/* Curved marquee */}
      <motion.div
        className="mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <CurvedLoop
          marqueeText="AUTOMATIZACIÓN ✦ DESARROLLO WEB ✦ IA ✦ BRANDING ✦ EFICIENCIA ✦ "
          speed={1.5}
          curveAmount={80}
          direction="left"
          interactive={true}
        />
      </motion.div>

      <Container>
        <div className="max-w-5xl mx-auto">
          <EpicManifestoCard />
        </div>
      </Container>
    </Section>
  )
}
