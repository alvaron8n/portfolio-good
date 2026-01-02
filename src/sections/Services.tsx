import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { MagneticButton } from '../components/ui/MagneticButton'

function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof content.home.services.items[number]
  index: number 
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="group relative h-full rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.1),
              transparent 80%
            )
          `
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.4),
              transparent 40%
            )
          `,
          maskImage: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      />

      <div className="relative h-full p-5 md:p-6 flex flex-col z-10">
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-[10px] text-orange-400 border border-orange-500/20 bg-orange-500/5 rounded px-2 py-1">
            {service.number}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors duration-300">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M12 2L2 7L12 12L22 7L12 2Z" />
               <path d="M2 17L12 22L22 17" />
               <path d="M2 12L12 17L22 12" />
             </svg>
          </div>
        </div>

        <h3 className="font-display text-lg md:text-xl font-bold text-white mb-3 group-hover:text-orange-50 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-xs md:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/65 transition-colors">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {service.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider text-white/30 bg-white/[0.02] px-2 py-1 rounded border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const { services } = content.home

  return (
    <Section id="servicios" className="py-12 md:py-16 relative">
      <Container>
        {/* Header - Compacto y alineado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {services.title}
            </h2>
            {services.subtitle && (
              <p className="text-sm md:text-base text-white/45 mt-2 max-w-md">
                {services.subtitle}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <MagneticButton strength={0.15}>
              <Link
                to={services.cta.href}
                className="group flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
              >
                {services.cta.label}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Grid - Gap reducido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.items.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
