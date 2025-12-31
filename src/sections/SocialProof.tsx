import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { GlassCard } from '../components/ui/GlassCard'
import CurvedLoop from '../components/ui/CurvedLoop'

export function SocialProof() {
  const { socialProof } = content.home

  return (
    <Section className="pt-4 pb-20 border-b border-white/[0.05] overflow-hidden relative">
      
      {/* CurvedLoop Marquee - Top with minimal padding */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CurvedLoop
          marqueeText="IA ✦ RRSS ✦ WEB ✦ BRANDING ✦ ROI ✦ "
          speed={1.5}
          curveAmount={80}
          direction="left"
          interactive={true}
        />
      </motion.div>

      <Container>
        <div className="max-w-5xl mx-auto">
          
          {/* Quote - Glass Card */}
          <motion.div
            className="relative"
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
