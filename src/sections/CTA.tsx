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
          className="cta-final-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="cta-final-title">
            {cta.title}
          </h2>

          {/* Description */}
          <p className="cta-final-description">
            {cta.description}
          </p>

          {/* CTA Button */}
          <motion.a
            href={cta.button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-final-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{cta.button.label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          {/* Email fallback */}
          <p className="cta-final-fallback">
            O si prefieres, mándame un email a{' '}
            <a href={cta.fallback.href}>
              {cta.fallback.label}
            </a>
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
