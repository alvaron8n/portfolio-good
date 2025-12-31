import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Apple-like (invisible, not showy)
// ============================================
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`
        relative rounded-2xl lg:rounded-3xl overflow-hidden
        bg-[#080810]/60
        backdrop-blur-xl
        border border-white/[0.1]
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        ${className}
      `}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  )
}

// ============================================
// MAIN HERO - Refined & Professional
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
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </motion.div>

      {/* Watermark - Simple text, no box */}
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
        <motion.div 
          className="max-w-6xl"
          style={{ opacity, y }}
        >
          {/* Single Unified Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="p-8 md:p-12 lg:p-14 max-w-2xl">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2.5 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {hero.badge}
                </span>
              </motion.div>

              {/* Headline - Unified */}
              <div className="mb-8">
                <motion.h1
                  className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight leading-[1.1] text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Sistemas que te
                </motion.h1>
                
                <motion.h1
                  className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold uppercase tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mt-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  devuelven el
                </motion.h1>
                
                <motion.h1
                  className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1] mt-2 font-serif italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  Tiempo.
                </motion.h1>
              </div>

              {/* Subheadline */}
              <motion.p
                className="text-[15px] md:text-base lg:text-lg text-white/50 font-light leading-relaxed max-w-lg mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {hero.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
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
              </motion.div>

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
