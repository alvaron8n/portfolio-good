import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Apple-style blur
// ============================================
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`
        relative rounded-3xl overflow-hidden
        bg-[#0d0d18]/70
        backdrop-blur-2xl
        border border-white/[0.12]
        shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]
        ${className}
      `}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
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
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <section 
      ref={sectionRef} 
      className="hero-glass-section min-h-[100dvh] relative overflow-hidden flex items-center"
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
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Watermark - Desktop: top right, Mobile: hidden */}
      <motion.div 
        className="absolute top-24 right-8 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
          Álvaro Fernández — Portfolio 2026
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ opacity, y }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: Glass Panel with Content */}
            <div className="lg:col-span-7 xl:col-span-6">
              <GlassPanel className="p-8 md:p-10 lg:p-12">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                    {hero.badge}
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="mb-8">
                  <motion.h1
                    className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black uppercase tracking-tight leading-[1] text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    Sistemas que te
                  </motion.h1>
                  
                  <motion.h1
                    className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black uppercase tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mt-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    devuelven el
                  </motion.h1>
                  
                  <motion.h1
                    className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-serif italic text-white leading-[1.1] mt-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    Tiempo.
                  </motion.h1>
                </div>

                {/* Subheadline */}
                <motion.p
                  className="text-base md:text-lg text-white/50 font-light max-w-lg leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {hero.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row items-start gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <MagneticButton strength={0.15}>
                    <a
                      href={hero.cta.href}
                      className="relative px-7 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors duration-300"
                    >
                      {hero.cta.label}
                    </a>
                  </MagneticButton>
                  
                  <MagneticButton strength={0.1}>
                    <a
                      href={hero.secondaryCta.href}
                      className="px-4 py-4 text-white/50 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors relative group"
                    >
                      <span className="absolute left-0 bottom-2 w-full h-px bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      {hero.secondaryCta.label}
                    </a>
                  </MagneticButton>
                </motion.div>
              </GlassPanel>
            </div>

            {/* RIGHT: Empty space for video visibility */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
          </div>
        </motion.div>
      </div>

      {/* Mobile watermark - bottom center */}
      <motion.div 
        className="absolute bottom-6 left-0 right-0 z-20 lg:hidden text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
          Portfolio 2026
        </span>
      </motion.div>
    </section>
  )
}
