import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

export function About() {
  const { aboutMini } = content.home

  return (
    <Section id="sobre-mi" className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative subtle gradient */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-500/[0.03] to-transparent pointer-events-none" />

      <Container>
        <div className="max-w-4xl">
          {/* Header */}
          <motion.h2
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-10 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {aboutMini.title}
          </motion.h2>

          {/* Paragraphs */}
          <div className="space-y-6 mb-10">
            {aboutMini.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-base md:text-lg text-white/60 leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to={aboutMini.cta.href}
              className="inline-flex items-center gap-3 text-orange-400 hover:text-orange-300 transition-colors font-medium text-sm uppercase tracking-wider group"
            >
              <span className="w-8 h-px bg-orange-500/50 group-hover:w-12 transition-all duration-300" />
              <span>{aboutMini.cta.label}</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
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
