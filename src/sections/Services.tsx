import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { MagneticButton } from '../components/ui/MagneticButton'

// ============================================
// TEXT SCRAMBLE EFFECT (GSAP)
// ============================================
const scrambleChars = '!<>-_\\/[]{}—=+*^?#アイウエオカキクケコ'

function useTextScramble(originalText: string) {
  const [displayText, setDisplayText] = useState(originalText)
  const [isScrambling, setIsScrambling] = useState(false)
  const frameRef = useRef(0)
  const iterationRef = useRef(0)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    iterationRef.current = 0
    
    const totalIterations = originalText.length * 2
    
    const animate = () => {
      iterationRef.current += 1
      const progress = iterationRef.current / totalIterations
      const revealIndex = Math.floor(progress * originalText.length)
      
      const newText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealIndex) return originalText[index]
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        })
        .join('')
      
      setDisplayText(newText)
      
      if (iterationRef.current < totalIterations) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayText(originalText)
        setIsScrambling(false)
      }
    }
    
    frameRef.current = requestAnimationFrame(animate)
  }, [originalText, isScrambling])

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    setDisplayText(originalText)
    setIsScrambling(false)
  }, [originalText])

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return { displayText, scramble, reset }
}

// ============================================
// EPIC SERVICE CARD
// ============================================
function EpicServiceCard({ 
  service, 
  index 
}: { 
  service: typeof content.home.services.items[number]
  index: number 
}) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const { displayText, scramble, reset } = useTextScramble(service.title)

  // GSAP number glow
  useGSAP(() => {
    if (!numberRef.current || !isHovered) return
    
    gsap.to(numberRef.current, {
      textShadow: '0 0 20px rgba(249, 115, 22, 0.9), 0 0 40px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
      color: '#fb923c',
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
    
    return () => {
      if (numberRef.current) {
        gsap.to(numberRef.current, {
          textShadow: '0 0 0px rgba(249, 115, 22, 0)',
          color: '#f97316',
          scale: 1,
          duration: 0.3
        })
      }
    }
  }, [isHovered])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.12
      }
    }
  }

  return (
    <motion.div
      className="svc-epic__card group relative h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); scramble() }}
      onMouseLeave={() => { setIsHovered(false); reset() }}
    >
      {/* Outer glow border */}
      <motion.div
        className="svc-epic__border absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.6),
              transparent 40%
            )
          `
        }}
      />

      {/* Main card */}
      <div className="svc-epic__inner relative h-full rounded-2xl bg-[#0a0a0b] border border-white/[0.06] overflow-hidden">
        
        {/* Inner spotlight */}
        <motion.div
          className="svc-epic__spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(249, 115, 22, 0.1),
                transparent 50%
              )
            `
          }}
        />

        {/* Scan line */}
        <div className="svc-epic__scan absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent svc-scanline-y" />
        </div>

        {/* Content */}
        <div className="relative h-full p-5 md:p-6 flex flex-col z-10">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <span 
              ref={numberRef}
              className="svc-epic__number font-mono text-xl md:text-2xl font-black text-orange-500 tracking-tight transition-transform duration-300"
            >
              {service.number}
            </span>
            <div className="svc-epic__icon w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 group-hover:text-orange-400 group-hover:border-orange-500/30 group-hover:bg-orange-500/5 transition-all duration-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="svc-epic__title font-display text-lg md:text-xl font-bold text-white mb-3 group-hover:text-orange-50 transition-colors duration-300 min-h-[52px]">
            <span className="font-mono tracking-tight">{displayText}</span>
          </h3>
          
          {/* Description */}
          <p className="svc-epic__desc text-xs md:text-sm text-white/45 mb-5 flex-grow leading-relaxed group-hover:text-white/60 transition-colors duration-400">
            {service.description}
          </p>

          {/* Tags */}
          <div className="svc-epic__tags flex flex-wrap gap-1.5 mt-auto">
            {service.tags.map((tag, i) => (
              <motion.span 
                key={tag}
                className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-white/25 bg-white/[0.02] px-2 py-1 rounded border border-white/[0.04] group-hover:text-orange-400/60 group-hover:border-orange-500/20 group-hover:bg-orange-500/5 transition-all duration-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.05) + (index * 0.1) }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent group-hover:border-orange-500/50 transition-colors duration-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-orange-500/50 transition-colors duration-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-transparent group-hover:border-orange-500/50 transition-colors duration-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-transparent group-hover:border-orange-500/50 transition-colors duration-400" />
      </div>
    </motion.div>
  )
}

// ============================================
// MAIN SERVICES SECTION
// ============================================
export function Services() {
  const { services } = content.home
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  }

  return (
    <Section id="servicios" className="svc-epic py-16 md:py-24 relative overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.012]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px'
        }}
      />
      
      {/* Ambient glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-500/[0.025] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="svc-epic__heading font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {services.title}
              </h2>
              {services.subtitle && (
                <p className="text-sm md:text-base text-white/40 max-w-lg leading-relaxed">
                  {services.subtitle}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:mt-2"
            >
              <MagneticButton strength={0.15}>
                <Link
                  to={services.cta.href}
                  className="group flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {services.cta.label}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {services.items.map((service, i) => (
              <EpicServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Animations CSS */}
      <style>{`
        @keyframes svc-scan-y {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        
        .svc-scanline-y {
          animation: svc-scan-y 2.5s ease-in-out infinite;
        }
        
        .svc-epic__number {
          font-feature-settings: 'tnum' on, 'lnum' on;
        }
      `}</style>
    </Section>
  )
}
