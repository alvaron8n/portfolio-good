import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Apple-like (optimized values)
// ============================================
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        ${className}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Top edge highlight */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
      />
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
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
        <motion.div className="max-w-4xl" style={{ opacity, y }}>
          
          {/* Card 1: Full Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="p-8 md:p-12 lg:p-14">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                  {hero.badge}
                </span>
              </div>

              {/* Headline - 2 lines */}
              <div>
                {/* Line 1: SISTEMAS QUE TE DEVUELVEN EL */}
                <h1 className="text-[1.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.15] text-white">
                  Sistemas que te devuelven el
                </h1>
                
                {/* Line 2: TIEMPO with Noto Serif + orange gradient + black stroke */}
                <h2 
                  className="text-[3rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1] mt-3"
                  style={{ 
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontWeight: 700,
                    fontStyle: 'italic',
                    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 25%, #fb923c 50%, #fbbf24 75%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStroke: '1.5px #000',
                    paintOrder: 'stroke fill',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                  }}
                >
                  Tiempo.
                </h2>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Card 2: Subheadline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4"
          >
            <GlassPanel className="p-6 md:p-8 max-w-xl">
              <p className="text-[15px] md:text-base text-white/60 font-light leading-relaxed mb-6">
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
                    className="inline-block px-5 py-3.5 text-white/50 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-colors duration-300"
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
