import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { GlassCard } from '../components/ui/GlassCard'
import AlvaroImg from '../lib/Alvaro.jpg'

// ============================================
// PROFILE IMAGE WITH PREMIUM FRAME
// ============================================
function ProfileImage() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-transparent to-orange-500/20 blur-2xl rounded-3xl" />
      
      {/* Main image container */}
      <div className="relative">
        {/* Corner brackets - top left */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60" />
        {/* Corner brackets - top right */}
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-500/60" />
        {/* Corner brackets - bottom left */}
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500/60" />
        {/* Corner brackets - bottom right */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-500/60" />
        
        {/* Image with gradient overlay */}
        <div className="relative overflow-hidden rounded-lg border border-white/10">
          <img 
            src={AlvaroImg} 
            alt="Álvaro Fernández" 
            className="w-full aspect-[4/5] object-cover object-top"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030304]/60 via-transparent to-transparent" />
        </div>
        
        {/* Status indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0f]/90 border border-white/10 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-wider">AVAILABLE</span>
        </div>
      </div>
    </div>
  )
}

export function About() {
  const { about } = content.home

  return (
    <Section id="sobre-mi" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Profile Image (Left on Desktop, Top on Mobile) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative order-first"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <ProfileImage />
          </motion.div>

          {/* Content (Right on Desktop) */}
          <motion.div 
            className="lg:col-span-7 max-w-2xl relative z-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
               <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest px-2 py-1 border border-cyan-900/50 bg-cyan-950/20 rounded">
                 Operator_Profile
               </span>
            </div>

            <h2 className="heading-lg mb-6 text-white font-bold">
              {about.headline}
            </h2>
            
            <p className="body-lg mb-8 text-white/60 font-light leading-relaxed">
              {about.description}
            </p>

            {/* Tech Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <GlassCard className="p-4" hoverEffect={false}>
                <div className="text-3xl font-display font-bold text-white mb-1">5+</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Years Exp.</div>
              </GlassCard>
              <GlassCard className="p-4" hoverEffect={false}>
                <div className="text-3xl font-display font-bold text-white mb-1">100%</div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-wider">Commitment</div>
              </GlassCard>
            </div>

            <Link
              to={about.cta.href}
              className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm uppercase tracking-wider group"
            >
              <span className="w-8 h-px bg-cyan-500/50 group-hover:w-12 transition-all" />
              <span>{about.cta.label}</span>
            </Link>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
