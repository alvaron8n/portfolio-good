import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'
import { ShaderBackground } from '../components/backgrounds/ShaderBackground'
import { PageDecoratives } from '../components/backgrounds/PageDecoratives'

// ============================================
// BRAND COLORS
// ============================================
const brandTheme = {
  primary: '#f97316',      // Orange 500
  primaryLight: '#fb923c', // Orange 400
  primaryDark: '#ea580c',  // Orange 600
  accent: '#10b981',       // Emerald 500
}

// ============================================
// ACCORDION ITEM (MOBILE)
// ============================================
function MobileAccordionCard({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof content.services.items)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="svc-accordion-card"
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="svc-accordion-header"
        aria-expanded={isOpen}
      >
        <div className="svc-accordion-header__left">
          <span className="svc-accordion-number">{service.number}</span>
          <div>
            <h3 className="svc-accordion-title">{service.title}</h3>
            <p className="svc-accordion-tagline">{service.tagline}</p>
          </div>
        </div>
        <motion.span
          className="svc-accordion-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      {/* Content - Collapsible */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="svc-accordion-content"
          >
            <div className="svc-accordion-content__inner">
              <p className="svc-accordion-desc">{service.description}</p>
              
              {/* Benefits */}
              <ul className="svc-accordion-benefits">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="svc-accordion-benefit">
                    <svg className="svc-benefit-check" viewBox="0 0 20 20" fill="none">
                      <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="svc-accordion-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="svc-tag">{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <Button href={service.cta.href} variant="secondary" size="sm">
                {service.cta.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .svc-accordion-card {
          background: rgba(16, 16, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }
        
        .svc-accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          min-height: 72px;
        }
        
        .svc-accordion-header__left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .svc-accordion-number {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          background: rgba(249, 115, 22, 0.12);
          color: ${brandTheme.primaryLight};
          border: 1px solid rgba(249, 115, 22, 0.25);
          flex-shrink: 0;
        }
        
        .svc-accordion-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0 0 2px 0;
          font-family: var(--font-display);
        }
        
        .svc-accordion-tagline {
          font-size: 13px;
          color: ${brandTheme.primaryLight};
          margin: 0;
          line-height: 1.3;
        }
        
        .svc-accordion-chevron {
          color: rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }
        
        .svc-accordion-content {
          overflow: hidden;
        }
        
        .svc-accordion-content__inner {
          padding: 0 18px 20px 68px;
        }
        
        .svc-accordion-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.6;
          margin: 0 0 16px 0;
        }
        
        .svc-accordion-benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .svc-accordion-benefit {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
        }
        
        .svc-benefit-check {
          width: 16px;
          height: 16px;
          color: ${brandTheme.primary};
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .svc-accordion-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        
        .svc-tag {
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          border-radius: 6px;
          background: rgba(249, 115, 22, 0.1);
          color: ${brandTheme.primaryLight};
          border: 1px solid rgba(249, 115, 22, 0.2);
        }
      `}</style>
    </motion.article>
  )
}

// ============================================
// DESKTOP SERVICE CARD (PREMIUM)
// ============================================
function DesktopServiceCard({
  service,
  index,
}: {
  service: (typeof content.services.items)[number]
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="svc-desktop-card group"
    >
      {/* Number badge */}
      <div className="svc-desktop-number">{service.number}</div>

      {/* Content */}
      <div className="svc-desktop-content">
        <h3 className="svc-desktop-title">{service.title}</h3>
        <p className="svc-desktop-tagline">{service.tagline}</p>
        <p className="svc-desktop-desc">{service.description}</p>

        {/* Benefits */}
        <ul className="svc-desktop-benefits">
          {service.benefits.map((benefit, i) => (
            <li key={i} className="svc-desktop-benefit">
              <svg className="svc-desktop-check" viewBox="0 0 20 20" fill="none">
                <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="svc-desktop-tags">
          {service.tags.map((tag) => (
            <span key={tag} className="svc-desktop-tag">{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <Button href={service.cta.href} variant="secondary" size="sm">
          {service.cta.label}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>

      {/* Hover glow */}
      <div className="svc-desktop-glow" />

      <style>{`
        .svc-desktop-card {
          position: relative;
          padding: 32px;
          background: rgba(16, 16, 24, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        .svc-desktop-card:hover {
          border-color: rgba(249, 115, 22, 0.25);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(249, 115, 22, 0.1);
        }
        
        .svc-desktop-number {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          background: rgba(249, 115, 22, 0.1);
          color: ${brandTheme.primaryLight};
          border: 1px solid rgba(249, 115, 22, 0.25);
        }
        
        .svc-desktop-content {
          padding-right: 64px;
        }
        
        .svc-desktop-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
          font-family: var(--font-display);
        }
        
        .svc-desktop-tagline {
          font-size: 15px;
          font-weight: 500;
          color: ${brandTheme.primaryLight};
          margin: 0 0 16px 0;
        }
        
        .svc-desktop-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
          margin: 0 0 20px 0;
        }
        
        .svc-desktop-benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .svc-desktop-benefit {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
        }
        
        .svc-desktop-check {
          width: 18px;
          height: 18px;
          color: ${brandTheme.primary};
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .svc-desktop-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        
        .svc-desktop-tag {
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
          background: rgba(249, 115, 22, 0.08);
          color: ${brandTheme.primaryLight};
          border: 1px solid rgba(249, 115, 22, 0.18);
          transition: all 0.2s;
        }
        
        .svc-desktop-card:hover .svc-desktop-tag {
          background: rgba(249, 115, 22, 0.12);
          border-color: rgba(249, 115, 22, 0.25);
        }
        
        .svc-desktop-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 0%, rgba(249, 115, 22, 0.06) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        
        .svc-desktop-card:hover .svc-desktop-glow {
          opacity: 1;
        }
      `}</style>
    </motion.article>
  )
}

// ============================================
// SERVICES PAGE (MAIN)
// ============================================
export function ServicesPage() {
  const [openAccordion, setOpenAccordion] = useState<number>(0)

  return (
    <div className="svc-page-wrapper">
      {/* Fondo gris base + decorativos */}
      <div className="svc-base-bg" />
      <PageDecoratives page="services" />

      {/* HERO con ShaderGradient contenido */}
      <section className="svc-hero relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
        <ShaderBackground preset="services" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0"
          >
            {/* Eyebrow */}
            <motion.div 
              className="svc-hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="svc-hero-line" />
              <span>Servicios</span>
              <span className="svc-hero-line" />
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="svc-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="svc-hero-title-main">Soluciones que</span>
              <span className="svc-hero-highlight">escalan tu negocio.</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Automatización, desarrollo a medida e IA para eliminar el caos operativo y generar resultados medibles.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button href="/contacto" variant="primary">
                Hablemos de tu proyecto
              </Button>
              <Button href="/proyectos" variant="secondary">
                Ver casos de éxito
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Mobile: Accordion Cards */}
      <Section className="lg:hidden relative overflow-hidden py-12" style={{ background: 'transparent' }}>
        <Container>
          <div className="space-y-3">
            {content.services.items.map((service, index) => (
              <MobileAccordionCard
                key={service.id}
                service={service}
                index={index}
                isOpen={openAccordion === index}
                onToggle={() => setOpenAccordion(openAccordion === index ? -1 : index)}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Desktop: Service Details */}
      <Section className="hidden lg:block relative py-20" style={{ background: 'transparent' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Detalle de servicios
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base">
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

      {/* CTA Section - BRAND ORANGE */}
      <Section className="relative overflow-hidden py-16 lg:py-20" style={{ background: 'transparent' }}>
        <Container>
          <motion.div
            className="relative text-center max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Glass card */}
            <div className="svc-cta-card">
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ¿Hablamos de tu proyecto?
              </h2>
              <p className="text-white/50 mb-6 text-sm sm:text-base max-w-md mx-auto">
                Cuéntame qué necesitas y te propongo soluciones sin compromiso.
              </p>
              <Button href={content.services.cta.button.href} variant="brand" size="lg">
                Agendar llamada
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </motion.div>
        </Container>

        <style>{`
          .svc-cta-card {
            background: rgba(16, 16, 24, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px 32px;
            position: relative;
            overflow: hidden;
          }
          
          .svc-cta-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 50% 0%, rgba(249, 115, 22, 0.1) 0%, transparent 60%);
            pointer-events: none;
          }
          
          @media (min-width: 640px) {
            .svc-cta-card {
              padding: 56px 48px;
            }
          }

          .svc-page-wrapper {
            position: relative;
            min-height: 100vh;
          }
          
          .svc-base-bg {
            position: fixed;
            inset: 0;
            background: #18181b;
            z-index: -1;
          }

          .svc-hero {
            padding-top: 100px;
          }

          /* Hero Eyebrow */
          .svc-hero-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #3b82f6;
          }
          @media (min-width: 1024px) {
            .svc-hero-eyebrow {
              justify-content: flex-start;
            }
          }
          .svc-hero-line {
            width: 32px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #3b82f6);
          }
          .svc-hero-line:last-child {
            background: linear-gradient(90deg, #3b82f6, transparent);
          }

          /* Hero Highlight */
          .svc-hero-title {
            margin-bottom: 24px;
          }
          .svc-hero-title-main {
            display: block;
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(32px, 6vw, 56px);
            font-weight: 700;
            color: white;
            line-height: 1.1;
          }
          .svc-hero-highlight {
            display: block;
            font-family: 'BBH Bartle', 'Space Grotesk', sans-serif;
            font-size: clamp(28px, 5vw, 48px);
            font-weight: 700;
            background: linear-gradient(135deg, #f97316, #fb923c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-top: 8px;
          }
        `}</style>
      </Section>
    </div>
  )
}
