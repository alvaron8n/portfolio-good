import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Apple-like
// ============================================
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

function GlassPanel({ children, className = '', intensity = 'medium' }: GlassPanelProps) {
  const styles = {
    light: 'bg-[#080810]/40 backdrop-blur-lg border-white/[0.06]',
    medium: 'bg-[#080810]/55 backdrop-blur-xl border-white/[0.08]',
    strong: 'bg-[#080810]/70 backdrop-blur-2xl border-white/[0.12]',
  }

  return (
    <div
      className={`
        relative rounded-2xl lg:rounded-3xl overflow-hidden
        ${styles[intensity]}
        border
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {children}
    </div>
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
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <section 
      ref={sectionRef} 
      className="hero-section min-h-[100dvh] relative overflow-hidden flex items-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </motion.div>

      {/* Watermark */}
      <motion.span 
        className="absolute top-28 right-8 z-20 hidden lg:block font-mono text-[11px] tracking-[0.2em] text-white/30 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        Álvaro Fernández — Portfolio 2026
      </motion.span>

      {/* Content */}
      <div className="relative z-10 w-full px-5 md:px-10 lg:px-16 xl:px-24">
        <motion.div className="max-w-3xl" style={{ opacity, y }}>
          
          {/* Card 1: Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel intensity="strong" className="p-6 md:p-10 lg:p-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {hero.badge}
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight leading-[1.1] text-white">
                Sistemas que te
              </h1>
              <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mt-1">
                devuelven el
              </h1>
            </GlassPanel>
          </motion.div>

          {/* Card 2: Accent Word "Tiempo" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4"
          >
            <GlassPanel intensity="medium" className="p-6 md:p-8 inline-block">
              <h2 
                className="text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500"
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}
              >
                Tiempo.
              </h2>
            </GlassPanel>
          </motion.div>

          {/* Card 3: Subheadline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4"
          >
            <GlassPanel intensity="light" className="p-6 md:p-8 max-w-xl">
              <p className="text-[15px] md:text-base text-white/50 font-light leading-relaxed mb-6">
                {hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <MagneticButton strength={0.12}>
                  <a
                    href={hero.cta.href}
                    className="inline-block px-7 py-3.5 bg-white text-[#0a0a14] font-semibold font-mono uppercase tracking-wider text-[11px] rounded-lg hover:bg-cyan-400 transition-colors duration-300"
                  >
                    {hero.cta.label}
                  </a>
                </MagneticButton>
                
                <MagneticButton strength={0.08}>
                  <a
                    href={hero.secondaryCta.href}
                    className="inline-block px-5 py-3.5 text-white/40 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-colors duration-300"
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
        className="absolute bottom-6 left-0 right-0 z-20 lg:hidden text-center font-mono text-[9px] tracking-[0.15em] text-white/25 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        Portfolio 2026
      </motion.span>
    </section>
  )
}
