import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

export function CTA() {
  const { cta } = content.home

  return (
    <Section className="py-24 md:py-40">
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Giant question */}
          <h2 
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'var(--text-giant)' }}
          >
            {cta.question}
          </h2>

          {/* Handwritten accent */}
          <p className="mb-10">
            <span 
              className="font-accent text-violet-400 text-3xl md:text-4xl -rotate-3 inline-block"
            >
              {cta.accent}
            </span>
          </p>

          {/* CTA Button */}
          <motion.a
            href={cta.button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#050508] font-semibold text-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>{cta.button.label}</span>
          </motion.a>

          {/* Email fallback */}
          <p className="mt-6 text-white/30 text-sm">
            <a 
              href={cta.fallback.href}
              className="hover:text-white/50 transition-colors"
            >
              {cta.fallback.label}
            </a>
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
