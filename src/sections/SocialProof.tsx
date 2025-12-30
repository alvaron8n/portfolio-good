import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

export function SocialProof() {
  const { socialProof } = content.home

  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Logos */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {socialProof.logos.map((logo) => (
              <span 
                key={logo.name}
                className="text-white/20 font-display font-semibold text-sm tracking-wide hover:text-white/30 transition-colors"
              >
                {logo.name}
              </span>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              "{socialProof.quote.text}"
              {/* Handwritten accent */}
              <span 
                className="inline-block font-accent text-violet-400 ml-2 rotate-2"
                style={{ fontSize: '0.6em' }}
              >
                {socialProof.quote.accent}
              </span>
            </p>
            <cite className="not-italic text-white/40 text-sm">
              — {socialProof.quote.author}
            </cite>
          </motion.blockquote>
        </div>
      </Container>
    </Section>
  )
}
