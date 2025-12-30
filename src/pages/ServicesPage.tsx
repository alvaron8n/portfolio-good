import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'
import { HeroParallax, ParallaxHeader } from '../components/ui/hero-parallax'

// ============================================
// SERVICE CARDS DATA - With Unsplash Images
// ============================================
const serviceCards = [
  // ROW 1: AUTOMATIZACIÓN (5 cards)
  {
    title: 'Workflows n8n',
    category: 'Automatización',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format',
    color: '#8B5CF6', // violet
  },
  {
    title: 'Integraciones API',
    category: 'Automatización',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format',
    color: '#8B5CF6',
  },
  {
    title: 'Dashboards',
    category: 'Automatización',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format',
    color: '#8B5CF6',
  },
  {
    title: 'Procesos 24/7',
    category: 'Automatización',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&auto=format',
    color: '#8B5CF6',
  },
  {
    title: 'Zero Errores',
    category: 'Automatización',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format',
    color: '#8B5CF6',
  },

  // ROW 2: DESARROLLO IA (5 cards)
  {
    title: 'IA Copilot',
    category: 'Desarrollo IA',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format',
    color: '#06B6D4', // cyan
  },
  {
    title: 'CRM a Medida',
    category: 'Desarrollo IA',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format',
    color: '#06B6D4',
  },
  {
    title: 'React + TypeScript',
    category: 'Desarrollo IA',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format',
    color: '#06B6D4',
  },
  {
    title: 'Supabase Backend',
    category: 'Desarrollo IA',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format',
    color: '#06B6D4',
  },
  {
    title: 'Software en Semanas',
    category: 'Desarrollo IA',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format',
    color: '#06B6D4',
  },

  // ROW 3: WEB + BRANDING (5 cards)
  {
    title: 'Webs Premium',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format',
    color: '#10B981', // emerald
  },
  {
    title: '+60% Conversiones',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80&auto=format',
    color: '#10B981',
  },
  {
    title: 'Identidad Visual',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&auto=format',
    color: '#F59E0B', // amber
  },
  {
    title: 'UI/UX Design',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format',
    color: '#10B981',
  },
  {
    title: 'Brand Guidelines',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80&auto=format',
    color: '#F59E0B',
  },
]

// ============================================
// SERVICE DETAIL CARDS (for mobile/after parallax)
// ============================================
const serviceThemes = [
  { primary: '#8B5CF6', secondary: '#A78BFA', name: 'Automatización' },
  { primary: '#06B6D4', secondary: '#22D3EE', name: 'Desarrollo IA' },
  { primary: '#10B981', secondary: '#34D399', name: 'Web' },
  { primary: '#F59E0B', secondary: '#FBBF24', name: 'Branding' },
]

// ============================================
// MOBILE SERVICE CARD
// ============================================
function MobileServiceCard({
  service,
  index,
}: {
  service: (typeof content.services.items)[number]
  index: number
}) {
  const theme = serviceThemes[index % serviceThemes.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c18] p-6"
    >
      {/* Number badge */}
      <div
        className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
        style={{
          background: `${theme.primary}15`,
          border: `1px solid ${theme.primary}30`,
          color: theme.secondary,
        }}
      >
        {service.number}
      </div>

      {/* Content */}
      <div className="pr-12">
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: theme.secondary }}>
          {service.tagline}
        </p>
        <p className="text-sm text-white/40 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg"
              style={{
                background: `${theme.primary}10`,
                color: theme.secondary,
                border: `1px solid ${theme.primary}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button href={service.cta.href} variant="secondary" size="sm">
          {service.cta.label}
        </Button>
      </div>
    </motion.article>
  )
}

// ============================================
// SERVICES PAGE
// ============================================
export function ServicesPage() {
  return (
    <>
      {/* Desktop: Hero Parallax */}
      <div className="hidden lg:block">
        <HeroParallax
          services={serviceCards}
          header={
            <ParallaxHeader
              eyebrow="Servicios"
              title={content.services.hero.title}
              subtitle={content.services.hero.subtitle}
            />
          }
        />
      </div>

      {/* Mobile: Simple Header + Cards */}
      <Section className="lg:hidden relative overflow-hidden bg-[#080810] pt-28 pb-12">
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-violet-400 mb-3">
              Servicios
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.services.hero.title}
            </h1>
            <p className="text-base text-white/50 max-w-lg">
              {content.services.hero.subtitle}
            </p>
          </motion.div>

          {/* Mobile Service Cards */}
          <div className="space-y-4">
            {content.services.items.map((service, index) => (
              <MobileServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>

        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-[30%] -left-[30%] w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      </Section>

      {/* Service Details Section (Desktop - after parallax) */}
      <Section className="hidden lg:block relative bg-[#080810] py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Detalle de servicios
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Cada servicio está diseñado para devolverte tiempo y generar resultados medibles.
            </p>
          </motion.div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.services.items.map((service, index) => {
              const theme = serviceThemes[index % serviceThemes.length]
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c18] p-8 hover:border-white/10 transition-colors duration-300"
                >
                  {/* Number */}
                  <div
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{
                      background: `${theme.primary}10`,
                      border: `1px solid ${theme.primary}25`,
                      color: theme.secondary,
                    }}
                  >
                    {service.number}
                  </div>

                  {/* Content */}
                  <div className="pr-16">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p
                      className="text-base font-medium mb-4"
                      style={{ color: theme.secondary }}
                    >
                      {service.tagline}
                    </p>
                    <p className="text-white/45 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-6">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                          <span style={{ color: theme.secondary }}>✓</span>
                          <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg"
                          style={{
                            background: `${theme.primary}08`,
                            color: theme.secondary,
                            border: `1px solid ${theme.primary}20`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button href={service.cta.href} variant="secondary" size="sm">
                      {service.cta.label}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 30% 0%, ${theme.primary}08 0%, transparent 50%)`,
                    }}
                  />
                </motion.article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden bg-[#080810]">
        <Container>
          <motion.div
            className="relative text-center max-w-2xl mx-auto py-16 lg:py-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
              }}
            />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 px-4">
              {content.services.cta.title}
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto px-4">
              {content.services.cta.subtitle}
            </p>
            <Button href={content.services.cta.button.href} variant="gradient" size="lg">
              {content.services.cta.button.label}
            </Button>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
