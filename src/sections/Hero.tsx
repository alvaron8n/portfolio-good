import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Premium Apple/Stripe style
// ============================================
function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      {/* Top edge highlight */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.25) 50%, transparent 90%)' }}
      />
      {/* Left edge subtle highlight */}
      <div 
        className="absolute inset-y-0 left-0 w-px"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)' }}
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
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <section 
      ref={sectionRef} 
      className="hero-section min-h-[100dvh] relative overflow-hidden flex items-end pb-12 md:pb-16 lg:pb-20"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </motion.div>

      {/* Watermark */}
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
        <motion.div className="max-w-xl" style={{ opacity, y }}>
          
          {/* Card 1: Headline - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="p-4 md:p-5 lg:p-6">
              {/* Badge / Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                <span 
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/45"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  {hero.eyebrow}
                </span>
              </div>

              {/* Headline - 2 líneas */}
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span 
                  className="block text-2xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight leading-[1.1] text-white font-bold"
                >
                  {hero.headline.line1}
                </span>
                
                <span 
                  className="block text-2xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight leading-[1.1] mt-0.5 font-bold"
                >
                  <span className="text-white">Menos caos. </span>
                  <span 
                    style={{ 
                      background: 'linear-gradient(135deg, #ea580c 0%, #f97316 35%, #fb923c 70%, #fbbf24 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    }}
                  >
                    Mejor ROI.
                  </span>
                </span>
              </h1>
            </GlassPanel>
          </motion.div>

          {/* Card 2: Subheadline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2.5 md:mt-3"
          >
            <GlassPanel className="p-4 md:p-5 max-w-md">
              <p 
                className="text-sm md:text-base text-white/50 leading-relaxed mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                {hero.subheadline}
              </p>

              <div className="flex items-center gap-3 mb-3">
                <MagneticButton strength={0.1}>
                  <a
                    href={hero.cta.href}
                    className="inline-block px-5 py-2.5 bg-white text-[#0a0a14] font-semibold uppercase tracking-wider text-[9px] md:text-[10px] rounded-lg hover:bg-orange-400 transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {hero.cta.label}
                  </a>
                </MagneticButton>
                
                <MagneticButton strength={0.08}>
                  <a
                    href={hero.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-2.5 text-white/40 hover:text-white text-[11px] md:text-xs uppercase tracking-wider transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {hero.secondaryCta.label}
                  </a>
                </MagneticButton>
              </div>

              {/* Microcopy */}
              <p 
                className="text-[11px] md:text-xs text-white/30 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {hero.microcopy}
              </p>
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
