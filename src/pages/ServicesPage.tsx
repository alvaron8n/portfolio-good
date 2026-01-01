import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'
import { HeroParallax, ParallaxHeader } from '../components/ui/hero-parallax'

// ============================================
// UNIFIED SERVICE DATA - Single source of truth
// ============================================
const servicesData = {
  parallaxCards: [
    // ROW 1: AUTOMATIZACIÓN (5 cards) - Orange tones
    { title: 'Workflows n8n', category: 'Automatización', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format', color: '#f97316' },
    { title: 'Integraciones API', category: 'Automatización', thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format', color: '#f97316' },
    { title: 'Dashboards', category: 'Automatización', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format', color: '#f97316' },
    { title: 'Procesos 24/7', category: 'Automatización', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&auto=format', color: '#f97316' },
    { title: 'Zero Errores', category: 'Automatización', thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format', color: '#f97316' },
    // ROW 2: DESARROLLO IA (5 cards) - Amber tones
    { title: 'IA Copilot', category: 'Desarrollo IA', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format', color: '#fb923c' },
    { title: 'CRM a Medida', category: 'Desarrollo IA', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format', color: '#fb923c' },
    { title: 'React + TypeScript', category: 'Desarrollo IA', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format', color: '#fb923c' },
    { title: 'Supabase Backend', category: 'Desarrollo IA', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format', color: '#fb923c' },
    { title: 'Software en Semanas', category: 'Desarrollo IA', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format', color: '#fb923c' },
    // ROW 3: WEB (5 cards) - Deep orange tones
    { title: 'Webs Premium', category: 'Web', thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format', color: '#ea580c' },
    { title: '+60% Conversiones', category: 'Web', thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80&auto=format', color: '#ea580c' },
    { title: 'SEO Técnico', category: 'Web', thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&auto=format', color: '#ea580c' },
    { title: 'UI/UX Design', category: 'Web', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format', color: '#ea580c' },
    { title: 'Core Web Vitals', category: 'Web', thumbnail: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80&auto=format', color: '#ea580c' },
  ],
  // Unified theme - all orange
  theme: {
    primary: '#f97316',
    secondary: '#fb923c', 
    accent: '#ea580c',
    light: '#fed7aa',
  }
}

// ============================================
// HOW I WORK SECTION
// ============================================
const workProcess = [
  { step: '01', title: 'Diagnóstico', desc: 'Analizamos tu situación actual y detectamos cuellos de botella.' },
  { step: '02', title: 'Diseño', desc: 'Creamos un plan técnico adaptado a tus necesidades y presupuesto.' },
  { step: '03', title: 'Implementación', desc: 'Desarrollamos, probamos e iteramos hasta tener un sistema robusto.' },
]

function HowIWorkSection() {
  return (
    <Section className="relative bg-[#080810] py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-orange-400/80 mb-3">
            Proceso
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Cómo trabajo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {workProcess.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 transition-colors duration-300"
            >
              <span 
                className="text-4xl font-bold mb-4 block"
                style={{ color: `${servicesData.theme.primary}30` }}
              >
                {item.step}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ============================================
// FAQ SECTION
// ============================================
const faqItems = [
  { q: '¿Cuánto tiempo lleva un proyecto típico?', a: 'Depende de la complejidad. Una automatización simple puede estar lista en 1-2 semanas, mientras que un software a medida suele llevar 4-8 semanas.' },
  { q: '¿Qué pasa si algo falla después de la entrega?', a: 'Ofrezco soporte post-lanzamiento y todos los proyectos incluyen documentación detallada. Además, el código siempre es tuyo.' },
  { q: '¿Trabajas con empresas de cualquier tamaño?', a: 'Principalmente con PYMEs y startups que buscan escalar sin aumentar costes operativos. Si tu equipo tiene más de 50 personas, hablemos.' },
  { q: '¿Necesito conocimientos técnicos?', a: 'No. Mi trabajo es traducir tus necesidades de negocio a soluciones técnicas que funcionen, sin jerga innecesaria.' },
]

function FAQItem({ item, isOpen, onToggle, index }: { 
  item: typeof faqItems[0]
  isOpen: boolean
  onToggle: () => void
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-5 flex items-center justify-between text-left group min-h-[56px]"
      >
        <span className="text-base font-medium text-white group-hover:text-orange-300 transition-colors pr-4">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-orange-400 text-xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/50 leading-relaxed pr-8">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section className="relative bg-[#080810] py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-orange-400/80 mb-3">
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Preguntas frecuentes
            </h2>
          </motion.div>

          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ============================================
// MOBILE SERVICE CARD (with Accordion)
// ============================================
function MobileServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof content.services.items)[number]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const { theme } = servicesData

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c18]"
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full p-5 flex items-start justify-between text-left min-h-[80px]"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-1">
            <span 
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: `${theme.primary}15`, color: theme.secondary }}
            >
              {service.number}
            </span>
            <h3 className="text-lg font-bold text-white">{service.title}</h3>
          </div>
          <p className="text-sm" style={{ color: theme.secondary }}>
            {service.tagline}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 flex-shrink-0"
          style={{ color: theme.primary }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-white/45 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Benefits - max 3 */}
              <ul className="space-y-2 mb-4">
                {service.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <span style={{ color: theme.secondary }}>✓</span>
                    <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
                  </li>
                ))}
              </ul>

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
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

// ============================================
// DESKTOP SERVICE CARD (Premium)
// ============================================
function DesktopServiceCard({
  service,
  index,
}: {
  service: (typeof content.services.items)[number]
  index: number
}) {
  const { theme } = servicesData

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c18]/80 backdrop-blur-sm p-7 hover:border-orange-500/20 transition-all duration-300"
    >
      {/* Number badge */}
      <div
        className="absolute top-6 right-6 w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold"
        style={{
          background: `${theme.primary}12`,
          border: `1px solid ${theme.primary}25`,
          color: theme.secondary,
        }}
      >
        {service.number}
      </div>

      {/* Content */}
      <div className="pr-14">
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-sm font-medium mb-4" style={{ color: theme.secondary }}>
          {service.tagline}
        </p>
        <p className="text-white/50 leading-relaxed mb-5 text-[15px]">
          {service.description}
        </p>

        {/* Benefits - max 3 */}
        <ul className="space-y-2 mb-5">
          {service.benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/60">
              <span style={{ color: theme.secondary }}>✓</span>
              <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-lg"
              style={{
                background: `${theme.primary}08`,
                color: theme.light,
                border: `1px solid ${theme.primary}15`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA - Always visible */}
        <Button href={service.cta.href} variant="secondary" size="sm">
          {service.cta.label}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${theme.primary}08 0%, transparent 50%)`,
        }}
      />
    </motion.article>
  )
}

// ============================================
// CTA SECTION (Premium Card)
// ============================================
function CTASection() {
  const { theme } = servicesData
  
  const trustPoints = [
    { icon: '⚡', text: 'Respuesta en menos de 24h' },
    { icon: '🤝', text: 'Sin compromiso ni letra pequeña' },
    { icon: '📋', text: 'Plan accionable tras la llamada' },
  ]

  return (
    <Section className="relative overflow-hidden bg-[#080810] py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Glass card */}
          <div 
            className="relative rounded-3xl p-8 md:p-10 text-center overflow-hidden"
            style={{
              background: 'rgba(16, 16, 24, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: `0 0 60px ${theme.primary}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 -z-10 opacity-30"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${theme.primary}20 0%, transparent 60%)`,
              }}
            />

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {content.services.cta.title}
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              {content.services.cta.subtitle}
            </p>

            {/* Trust points */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
              {trustPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="text-base">{point.icon}</span>
                  <span>{point.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button href={content.services.cta.button.href} variant="brand" size="lg">
              {content.services.cta.button.label}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

// ============================================
// SERVICES PAGE
// ============================================
export function ServicesPage() {
  const [expandedMobileCard, setExpandedMobileCard] = useState<number | null>(0)

  return (
    <>
      {/* Desktop: Hero Parallax (reduced height) */}
      <div className="hidden lg:block">
        <HeroParallax
          services={servicesData.parallaxCards}
          header={
            <ParallaxHeader
              title={content.services.hero.title}
              subtitle={content.services.hero.subtitle}
            />
          }
        />
      </div>

      {/* Mobile: Simple Header + Accordion Cards */}
      <Section className="lg:hidden relative overflow-hidden bg-[#080810] pt-24 pb-10">
        <Container>
          {/* Header - no eyebrow duplication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {content.services.hero.title}
            </h1>
            <p className="text-base text-white/50 max-w-lg">
              {content.services.hero.subtitle}
            </p>
          </motion.div>

          {/* Mobile Service Cards - Accordion */}
          <div className="space-y-3">
            {content.services.items.map((service, index) => (
              <MobileServiceCard 
                key={service.id} 
                service={service} 
                index={index}
                isExpanded={expandedMobileCard === index}
                onToggle={() => setExpandedMobileCard(expandedMobileCard === index ? null : index)}
              />
            ))}
          </div>
        </Container>

        {/* Background effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-[20%] -left-[20%] w-[300px] h-[300px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${servicesData.theme.primary}12 0%, transparent 60%)`,
              filter: 'blur(60px)',
            }}
          />
        </div>
      </Section>

      {/* Service Details Section (Desktop - after parallax) */}
      <Section className="hidden lg:block relative bg-[#080810] py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-orange-400/80 mb-3">
              En detalle
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Servicios principales
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Cada servicio está diseñado para devolverte tiempo y generar resultados medibles.
            </p>
          </motion.div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.services.items.map((service, index) => (
              <DesktopServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      {/* How I Work Section */}
      <HowIWorkSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section (Premium) */}
      <CTASection />
    </>
  )
}
