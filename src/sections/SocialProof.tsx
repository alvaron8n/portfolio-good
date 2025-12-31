import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { GlassCard } from '../components/ui/GlassCard'

export function SocialProof() {
  const { socialProof } = content.home

  return (
    <Section className="py-20 border-b border-white/[0.05] overflow-hidden relative">
      <Container>
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            {/* Left: Intro */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
                Trusted By
              </p>
              <div className="h-px w-12 bg-cyan-500/50 mx-auto md:mx-0" />
            </div>

            {/* Right: Marquee / Grid */}
            <div className="w-full md:w-2/3 relative mask-fade-edges">
              <motion.div
                className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
                animate={{ x: [0, -100] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  duration: 20, 
                  ease: "linear" 
                }}
              >
                {[...socialProof.logos, ...socialProof.logos].map((logo, i) => (
                  <span 
                    key={`${logo.name}-${i}`}
                    className="font-display font-bold text-xl md:text-2xl text-white/30 hover:text-white/80 transition-colors cursor-default"
                  >
                    {logo.name}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Quote - Glass Card */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-10 md:p-12 text-center max-w-4xl mx-auto">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[var(--color-bg-base)] p-3 rounded-full border border-white/10 text-cyan-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 9L8 15" />
                  <path d="M16 9L14 15" />
                </svg>
              </div>
              
              <blockquote className="relative z-10">
                <p className="font-display text-2xl md:text-3xl font-medium leading-relaxed text-white/90 mb-6">
                  "{socialProof.quote.text}"
                </p>
                <footer className="flex items-center justify-center gap-3 text-sm">
                  <span className="text-white/60 font-mono uppercase tracking-wider">{socialProof.quote.author}</span>
                </footer>
              </blockquote>
            </GlassCard>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
