import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { GlassCard } from '../components/ui/GlassCard'

// ============================================
// ABSTRACT CUBE
// ============================================
function AbstractCube() {
  return (
    <div className="relative w-64 h-64 perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Wireframe Faces */}
        <div className="absolute inset-0 border-[0.5px] border-cyan-500/20 bg-cyan-500/5 translate-z-32" />
        <div className="absolute inset-0 border-[0.5px] border-cyan-500/20 bg-cyan-500/5 translate-z-[-32px]" />
        <div className="absolute inset-0 border-[0.5px] border-violet-500/20 bg-violet-500/5 rotate-y-90" />
        <div className="absolute inset-0 border-[0.5px] border-violet-500/20 bg-violet-500/5 rotate-x-90" />
      </motion.div>
      
      {/* Inner Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/10 blur-2xl rounded-full" />
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
          
          {/* Visual / Accent (Left on Desktop) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative">
             <AbstractCube />
             
             {/* Floating Code Snippets using GlassCard */}
             <motion.div 
               className="absolute -right-10 top-10 w-fit"
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
               <GlassCard className="p-4 font-mono text-[10px] text-emerald-400">
                 {`> initializing_core_systems...`}<br/>
                 {`> optimization_level: MAX`}<br/>
                 {`> status: ONLINE`}
               </GlassCard>
             </motion.div>
          </div>

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
