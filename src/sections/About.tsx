import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

export function About() {
  const { about } = content.home

  return (
    <Section id="sobre-mi" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          {/* Headline con accent handwritten */}
          <motion.h2
            className="font-display font-bold text-white leading-tight tracking-tight mb-8"
            style={{ fontSize: 'var(--text-4xl)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/50">{about.line1}</span>
            <br />
            <span className="text-white/50">{about.line2}</span>
            <br />
            <span className="text-white/50">{about.line3}</span>{' '}
            <span 
              className="font-accent text-violet-400 inline-block -rotate-2"
              style={{ fontSize: '1.1em' }}
            >
              {about.accent}
            </span>
            <span className="text-white/50">.</span>
          </motion.h2>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to={about.cta.href}
              className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <span>{about.cta.label}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
