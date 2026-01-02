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
// PROOF CHIP - Compact inline pill
// ============================================
function ProofChip({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[11px] font-semibold text-white/85" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {value}
        </span>
        <span className="text-[9px] text-white/40 hidden sm:inline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ============================================
// MAIN HERO - Editorial unified layout
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
      {/* Video Background con overlay */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
        />
      </motion.div>

      {/* Bottom fade transition to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)' }}
      />

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

      {/* Content - Single editorial card */}
      <div className="relative z-10 w-full px-4 md:px-6 lg:px-10">
        <motion.div style={{ opacity, y }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="p-5 md:p-6 lg:p-7 max-w-2xl">
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

              {/* Headline - MEJOR ROI con BBH Bartle */}
              <h1 className="mb-4">
                <span 
                  className="block text-[clamp(1.5rem,4vw,2.25rem)] uppercase tracking-tight leading-[1.1] text-white font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {hero.headline.line1}
                </span>
                <span 
                  className="block text-[clamp(1.5rem,4vw,2.25rem)] uppercase tracking-tight leading-[1.1] mt-0.5 font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="text-white">Menos caos. </span>
                  <span 
                    className="relative inline-block"
                    style={{ 
                      fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
                      background: 'linear-gradient(135deg, #ea580c 0%, #f97316 30%, #fb923c 60%, #fbbf24 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))',
                    }}
                  >
                    Mejor ROI.
                  </span>
                </span>
              </h1>

              {/* Subheadline */}
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

              {/* Proof chips - Inline horizontal */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <ProofChip 
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7L9 18l-5-5"/></svg>}
                  value="4 años"
                  label="ecommerce propio"
                />
                <ProofChip 
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
                  value="+8.600"
                  label="seguidores"
                />
                <ProofChip 
                  icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                  value="15 min"
                  label="sin compromiso"
                />
              </div>

              {/* Microcopy */}
              <p 
                className="text-[11px] md:text-xs text-white/40 leading-relaxed max-w-md"
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
