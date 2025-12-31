import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'
import '../styles/hero.css'

// ============================================
// GLASS PANEL - Premium Apple/Stripe style
// ============================================
function GlassPanel({ 
  children, 
  className = '',
  variant = 'default'
}: { 
  children: React.ReactNode
  className?: string
  variant?: 'headline' | 'cta' | 'default'
}) {
  const variantClass = variant === 'headline' 
    ? 'hero-glass-card--headline' 
    : variant === 'cta' 
    ? 'hero-glass-card--cta' 
    : ''

  return (
    <div className={`hero-glass-card relative rounded-2xl overflow-hidden ${variantClass} ${className}`}>
      {/* Inner warm glow - visible on mobile */}
      <div className="hero-glass-glow" />
      
      {/* Desktop styles via inline (mobile overridden by CSS) */}
      <style>{`
        @media (min-width: 641px) {
          .hero-glass-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
            backdrop-filter: blur(24px) saturate(200%);
            -webkit-backdrop-filter: blur(24px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          }
          .hero-glass-card--headline { padding: 1.25rem; }
          .hero-glass-card--cta { padding: 1.25rem; }
          .hero-glass-glow { display: none; }
        }
        @media (min-width: 1024px) {
          .hero-glass-card--headline { padding: 1.5rem; }
          .hero-glass-card--cta { padding: 1.25rem; }
        }
      `}</style>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// ============================================
// ICONS for buttons
// ============================================
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// ============================================
// MAIN HERO
// ============================================
export function Hero() {
  const { hero } = content.home
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <section 
      ref={sectionRef} 
      className="hero-section min-h-[100dvh] relative overflow-hidden flex items-end pb-8 md:pb-10 lg:pb-12"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </motion.div>

      {/* Watermark - Desktop */}
      <motion.span 
        className="absolute top-28 right-6 lg:right-10 z-20 hidden md:block text-[10px] tracking-[0.2em] text-white/20 uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        Álvaro Fernández — Portfolio 2026
      </motion.span>

      {/* Content - Bottom Left */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <motion.div className="max-w-lg hero-cards-wrapper" style={{ opacity, y }}>
          
          {/* Card 1: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel variant="headline">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                <span 
                  className="text-[10px] md:text-[10px] uppercase tracking-[0.12em] text-white/50"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  {hero.badge}
                </span>
              </div>

              {/* Headline - 3 lines */}
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="block text-[1rem] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-tight leading-[1.15] text-white font-bold">
                  Sistemas que te
                </span>
                <span className="block text-[1rem] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-tight leading-[1.15] text-white font-bold mt-1">
                  devuelven el
                </span>
                <span className="block mt-1">
                  <span className="hero-tiempo text-[1.1rem] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">TIEMPO.</span>
                </span>
              </h1>
            </GlassPanel>
          </motion.div>

          {/* Card 2: Subheadline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel variant="cta" className="max-w-md">
              <p 
                className="text-[12px] sm:text-xs md:text-sm text-white/60 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                {hero.subheadline}
              </p>

              {/* Buttons */}
              <div className="hero-buttons">
                {/* Primary - Mobile uses CSS classes */}
                <MagneticButton strength={0.1}>
                  <a href={hero.cta.href} className="hero-btn-primary sm:hidden">
                    <SearchIcon />
                    {hero.cta.label}
                  </a>
                  {/* Desktop button */}
                  <a
                    href={hero.cta.href}
                    className="hidden sm:inline-block px-5 py-2.5 bg-white text-[#0a0a14] font-semibold uppercase tracking-wider text-[10px] rounded-lg hover:bg-orange-400 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {hero.cta.label}
                  </a>
                </MagneticButton>
                
                {/* Secondary - Mobile uses CSS classes */}
                <MagneticButton strength={0.08}>
                  <a href={hero.secondaryCta.href} className="hero-btn-secondary sm:hidden">
                    <ChatIcon />
                    {hero.secondaryCta.label}
                  </a>
                  {/* Desktop button */}
                  <a
                    href={hero.secondaryCta.href}
                    className="hidden sm:inline-block px-3 py-2.5 text-white/50 hover:text-white text-[10px] uppercase tracking-wider transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {hero.secondaryCta.label}
                  </a>
                </MagneticButton>
              </div>
            </GlassPanel>
          </motion.div>

        </motion.div>
      </div>

      {/* Mobile watermark */}
      <motion.span 
        className="absolute bottom-3 left-0 right-0 z-20 md:hidden text-center text-[8px] tracking-[0.12em] text-white/15 uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Portfolio 2026
      </motion.span>
    </section>
  )
}
