import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { MagneticButton } from '../components/ui/MagneticButton'

export function CTA() {
  const { cta } = content.home

  return (
    <Section className="py-20 md:py-32 lg:py-48 relative overflow-hidden bg-black">
      {/* Background Grid - Warp Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <Container>
        <motion.div
          className="text-center max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <span className="py-1 px-3 rounded border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-mono text-xs tracking-widest uppercase">
              System_Ready
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white px-4">
            {cta.headline}
          </h2>

          <p className="text-xl md:text-2xl text-white/50 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            {cta.subheadline}
          </p>

          <div className="flex flex-col items-center gap-8">
            <MagneticButton strength={0.4}>
              <motion.a
                href={cta.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold font-mono uppercase tracking-wider text-sm transition-all duration-300 hover:bg-cyan-400 hover:scale-105"
                whileTap={{ scale: 0.95 }}
              >
                <span>{cta.button.label}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </MagneticButton>

            <div className="text-white/30 text-xs font-mono uppercase tracking-widest mt-4">
              {cta.emailText}{' '}
              <a 
                href={`mailto:${cta.email}`}
                className="text-white/60 hover:text-cyan-400 transition-colors border-b border-white/10 hover:border-cyan-400 pb-0.5"
              >
                {cta.email}
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
