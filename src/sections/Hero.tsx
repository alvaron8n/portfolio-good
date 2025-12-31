import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { InteractiveBackground } from '../components/ui/InteractiveBackground'
import { MagneticButton } from '../components/ui/MagneticButton'
import { NoiseOverlay } from '../components/ui/NoiseOverlay'
import { SpotlightEffect } from '../components/ui/SpotlightEffect'
import { GlassCard } from '../components/ui/GlassCard'
import { useScrollVelocity } from '../hooks/useScrollVelocity'

// ============================================
// IDENTITY REVEAL CARD
// ============================================
function IdentityCard() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // 3D Parallax Spring
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10"
      >
        <GlassCard className="w-[320px] p-6 flex flex-col gap-6 backdrop-blur-2xl bg-white/[0.03]">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">ID_AUTH_01</span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/20" />
              <span className="w-2 h-2 rounded-full bg-amber-500/20" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/20" />
            </div>
          </div>

          {/* Profile Visual */}
          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 mix-blend-overlay z-10" />
            <img 
              src="/hero-phone.png" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
              <p className="font-mono text-xs text-white">Full Stack Developer</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Experience</p>
              <p className="font-display text-xl text-white">5+ Yrs</p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Projects</p>
              <p className="font-display text-xl text-white">40+</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Floating Elements (Parallax) */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full border border-cyan-500/10 -z-10"
        style={{ translateZ: -50, rotateX: 60 }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// ============================================
// MAIN HERO
// ============================================
export function Hero() {
  const { hero } = content.home
  const sectionRef = useRef<HTMLElement>(null)
  const skew = useScrollVelocity(2) // Physics-based skew
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={sectionRef} className="hero min-h-[100dvh] relative overflow-hidden flex items-center">
      {/* Global Effects */}
      <NoiseOverlay />
      <SpotlightEffect />
      <InteractiveBackground />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030304_90%)] z-0 pointer-events-none" />

      {/* Content */}
      <Container className="relative z-10 pt-20 md:pt-0">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity, y }}
        >
          {/* LEFT: Copy */}
          <div className="flex flex-col gap-8 text-center lg:text-left relative z-20">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mx-auto lg:mx-0 w-fit group cursor-default hover:border-white/10 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {hero.badge}
              </span>
            </motion.div>

            {/* Headline with Mask Reveal & Skew */}
            <div className="flex flex-col gap-1 overflow-hidden perspective-1000">
              <div className="overflow-hidden">
                <motion.h1
                  className="heading-hero text-white"
                  style={{ skewX: skew }}
                  initial={{ y: "100%", skewY: 5 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {hero.line1}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="heading-hero text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-300 animate-gradient pb-2"
                  style={{ skewX: skew }}
                  initial={{ y: "100%", skewY: 5 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {hero.line2}
                </motion.h1>
              </div>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {hero.subheadline}
            </motion.p>

            {/* Actions */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MagneticButton strength={0.2}>
                <a
                  href={hero.cta.href}
                  className="relative px-8 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors"
                >
                  {hero.cta.label}
                </a>
              </MagneticButton>
              
              <MagneticButton strength={0.1}>
                <a
                  href={hero.secondaryCta.href}
                  className="px-6 py-4 text-white/50 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors relative group"
                >
                  <span className="absolute left-0 bottom-2 w-full h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  {hero.secondaryCta.label}
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT: Visual (Identity Card) */}
          <motion.div 
            className="hero-right relative z-0"
            initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            <IdentityCard />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
