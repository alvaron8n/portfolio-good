import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { content } from '../content/content'
import heroVideo from '../lib/KLING 2.mp4'

// ============================================
// GLASS PANEL - Premium unified style
// ============================================
function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.08)
        `,
      }}
    >
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.2) 50%, transparent 95%)' }}
      />
      {children}
    </div>
  )
}

// ============================================
// MINI PROOF CARD - Compact highlight
// ============================================
function MiniProofCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div 
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-md bg-orange-500/15 flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-white/90 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {value}
        </p>
        <p className="text-[10px] text-white/40 leading-tight truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {label}
        </p>
      </div>
    </div>
  )
}

// ============================================
// MAIN HERO - Unified layout
// ============================================
export function Hero() {
  const { hero } = content.home
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 40])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <section 
      ref={sectionRef} 
      className="hero-section min-h-[100dvh] relative overflow-hidden flex items-end pb-10 md:pb-12 lg:pb-16"
    >
      {/* Video Background con overlay más fuerte */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay más fuerte para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        {/* Vignette sutil */}
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
        />
      </motion.div>

      {/* Watermark */}
      <motion.span 
        className="absolute top-24 right-6 lg:right-10 z-20 hidden md:block text-[10px] tracking-[0.2em] text-white/15 uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        Álvaro Fernández — Portfolio 2026
      </motion.span>

      {/* Content - Unified Card */}
      <div className="relative z-10 w-full px-4 md:px-6 lg:px-10">
        <motion.div style={{ opacity, y }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="p-5 md:p-6 lg:p-7 max-w-4xl">
              <div className="flex flex-col lg:flex-row lg:gap-8">
                
                {/* Left: Main content */}
                <div className="flex-1 min-w-0">
                  {/* Badge / Eyebrow */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                    </span>
                    <span 
                      className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/50"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      {hero.eyebrow}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="mb-4">
                    <span 
                      className="block text-[clamp(1.5rem,4vw,2.25rem)] uppercase tracking-tight leading-[1.1] text-white font-bold"
                    >
                      {hero.headline.line1}
                    </span>
                    <span 
                      className="block text-[clamp(1.5rem,4vw,2.25rem)] uppercase tracking-tight leading-[1.1] mt-0.5 font-bold"
                    >
                      <span className="text-white">Menos caos. </span>
                      <span 
                        style={{ 
                          background: 'linear-gradient(135deg, #ea580c 0%, #f97316 35%, #fb923c 70%, #fbbf24 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Mejor ROI.
                      </span>
                    </span>
                  </h1>

                  {/* Subheadline - mejor contraste */}
                  <p 
                    className="text-sm md:text-[15px] text-white/60 leading-relaxed mb-5 max-w-lg"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    {hero.subheadline}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <MagneticButton strength={0.1}>
                      <a
                        href={hero.cta.href}
                        className="inline-block px-5 py-2.5 bg-white text-[#0a0a14] font-semibold uppercase tracking-wider text-[10px] rounded-lg hover:bg-orange-400 transition-colors duration-300"
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
                        className="inline-block px-3 py-2.5 text-white/50 hover:text-white text-[11px] uppercase tracking-wider transition-colors duration-300"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {hero.secondaryCta.label}
                      </a>
                    </MagneticButton>
                  </div>

                  {/* Microcopy - mejor contraste */}
                  <p 
                    className="text-[11px] md:text-xs text-white/40 leading-relaxed max-w-md"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {hero.microcopy}
                  </p>
                </div>

                {/* Right: Mini proof cards - Solo visible en desktop */}
                <div className="hidden lg:flex flex-col gap-2.5 pt-8 lg:pt-0 lg:w-56 lg:flex-shrink-0 lg:border-l lg:border-white/10 lg:pl-6">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Track record
                  </p>
                  
                  <MiniProofCard 
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7L9 18l-5-5"/></svg>}
                    value="4 años"
                    label="Ecommerce propio"
                  />
                  
                  <MiniProofCard 
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                    value="+8.600"
                    label="Seguidores reales"
                  />
                  
                  <MiniProofCard 
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                    value="15 min"
                    label="Sin compromiso"
                  />
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile watermark */}
      <motion.span 
        className="absolute bottom-2 left-0 right-0 z-20 md:hidden text-center text-[8px] tracking-[0.12em] text-white/12 uppercase"
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
