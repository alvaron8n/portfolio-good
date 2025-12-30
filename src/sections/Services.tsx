import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof content.home.services.items[0]
  index: number 
}) {
  return (
    <motion.div
      className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Number */}
      <span className="absolute top-6 right-6 font-display text-5xl font-bold text-white/[0.04] select-none group-hover:text-white/[0.08] transition-colors">
        {service.number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          {service.title}
        </h3>
        
        <p className="text-white/50 text-sm mb-4">
          {service.result}
        </p>

        {/* Accent handwritten (solo en el primero) */}
        {service.accent && (
          <span 
            className="inline-block font-accent text-violet-400/60 text-sm -rotate-2"
          >
            {service.accent}
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg 
          className="w-5 h-5 text-violet-400" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </motion.div>
  )
}

export function Services() {
  const { services } = content.home

  return (
    <Section id="servicios" className="py-20 md:py-32">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {services.title}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {services.items.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to={services.cta.href}
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span>{services.cta.label}</span>
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
      </Container>
    </Section>
  )
}
