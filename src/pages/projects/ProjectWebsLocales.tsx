import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'
import { GradientBackground } from '../../components/ui/GradientBackground'

// ============================================
// DATA
// ============================================
const caseStudies = [
  {
    id: 'bohemian',
    name: 'Bohemian Bar',
    type: 'Hostelería',
    location: 'Plasencia',
    year: '2024',
    tagline: 'Coctelería de autor con reservas inteligentes',
    description: 'Web premium que captura la esencia de una coctelería exclusiva. El diseño oscuro y elegante refleja la atmósfera del local.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      text: 'Demasiadas llamadas para reservas saturaban al equipo. Necesitaban presencia digital que reflejara exclusividad sin perder cercanía.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      items: [
        'Diseño dark mode acorde a la marca',
        'Sistema de reservas con confirmación automática',
        'Menú digital interactivo con fotografía profesional',
        'SEO local optimizado para Plasencia'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      items: [
        { value: '-60%', label: 'Llamadas telefónicas' },
        { value: '+45%', label: 'Reservas de grupos' },
        { value: '#1', label: 'Google Maps local' },
        { value: '2x', label: 'Eficiencia operativa' }
      ]
    },
    services: ['Diseño Web', 'UI/UX', 'Reservas Online', 'Menú Digital', 'SEO Local']
  },
  {
    id: 'alba-plata',
    name: 'Alba Plata',
    type: 'Retail',
    location: 'Plasencia',
    year: '2024',
    tagline: 'Tienda gourmet con alcance regional',
    description: 'Diseño cálido que transmite artesanía y calidad. Catálogo digital que permite explorar productos sin perder el toque personal.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      text: 'Una tienda gourmet tradicional limitada a clientes locales. Necesitaban expandirse sin perder la esencia artesanal que les diferencia.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      items: [
        'Fotografía de producto premium',
        'Catálogo organizado por categorías',
        'Sistema de pedidos con recogida en tienda',
        'Blog de recetas para engagement'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      items: [
        { value: '+30%', label: 'Clientes nuevos' },
        { value: '500+', label: 'Suscriptores newsletter' },
        { value: 'B2B', label: 'Pedidos de empresas' },
        { value: '1er', label: 'Mes con ventas online' }
      ]
    },
    services: ['Diseño Web', 'E-commerce Lite', 'Catálogo Digital', 'Blog', 'Email Marketing']
  },
  {
    id: 'urban33',
    name: 'Urban 33',
    type: 'Servicios',
    location: 'Plasencia',
    year: '2023',
    tagline: 'Asesoría moderna que genera confianza',
    description: 'Transformación digital de una asesoría tradicional. Web profesional que transmite confianza y facilita el primer contacto.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      text: 'Imagen anticuada que no generaba confianza online. Competidores captaban leads digitales mientras ellos dependían del boca a boca.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      items: [
        'Rediseño con imagen corporativa moderna',
        'Landing pages para cada servicio',
        'Formularios optimizados para conversión',
        'Testimonios y casos de éxito destacados'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      items: [
        { value: '3x', label: 'Consultas online' },
        { value: '+25%', label: 'Nuevos clientes vía web' },
        { value: 'Top 3', label: 'Posicionamiento local' },
        { value: 'Premium', label: 'Percepción de marca' }
      ]
    },
    services: ['Diseño Web', 'Branding', 'Landing Pages', 'Lead Generation', 'Copywriting']
  },
  {
    id: 'health',
    name: 'Health Clinic',
    type: 'Salud',
    location: 'Plasencia',
    year: '2023',
    tagline: 'Fisioterapia accesible y humana',
    description: 'Web que humaniza la marca a través de su equipo. Sistema de citas que libera a recepción para atención presencial de calidad.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      text: 'Web obsoleta que no transmitía profesionalidad. Recepción saturada gestionando citas por teléfono en lugar de atender pacientes.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      items: [
        'Diseño limpio con colores relajantes',
        'Sistema de citas con calendario real-time',
        'Presentación del equipo para humanizar',
        'Blog de salud para SEO orgánico'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      items: [
        { value: '70%', label: 'Citas online' },
        { value: '+40%', label: 'Visitas orgánicas' },
        { value: '4.9★', label: 'Google Reviews' },
        { value: 'Libre', label: 'Recepción para pacientes' }
      ]
    },
    services: ['Diseño Web', 'Sistema de Citas', 'SEO', 'Blog Salud', 'Google My Business']
  }
]

// ============================================
// COMPONENTS
// ============================================
function VideoFrame() {
  return (
    <motion.div
      className="wl-video"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="wl-video-bar">
        <div className="wl-video-dots">
          <span style={{ background: '#FF5F57' }} />
          <span style={{ background: '#FFBD2E' }} />
          <span style={{ background: '#28CA41' }} />
        </div>
        <div className="wl-video-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          proyecto-demo.es
        </div>
      </div>
      <div className="wl-video-content">
        <div className="wl-video-play">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <span>Video demo próximamente</span>
      </div>
    </motion.div>
  )
}

function CaseStudyCard({ data, delay = 0, highlight = false }: { 
  data: { icon: string; title: string; text?: string; items?: string[] | { value: string; label: string }[] }
  delay?: number
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`wl-study-card ${highlight ? 'wl-study-card--highlight' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="wl-study-icon">{data.icon}</span>
      <h4 className="wl-study-title">{data.title}</h4>
      
      {data.text && <p className="wl-study-text">{data.text}</p>}
      
      {data.items && (
        <ul className="wl-study-list">
          {data.items.map((item, i) => (
            <li key={i}>
              {typeof item === 'string' ? (
                item
              ) : (
                <div className="wl-study-metric">
                  <span className="wl-study-value">{item.value}</span>
                  <span className="wl-study-label">{item.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

// ============================================
// MAIN
// ============================================
export function ProjectWebsLocales() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCase = caseStudies[activeIndex]

  return (
    <div className="wl-page">
      {/* Hero */}
      <section className="wl-hero">
        <GradientBackground opacity={0.45} />
        
        <Container>
          <div className="wl-hero-content">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/proyectos" className="wl-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Volver a proyectos
              </Link>
            </motion.div>

            <motion.div
              className="wl-badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span>Diseño Web</span>
              <span>UI/UX</span>
              <span>CRO</span>
            </motion.div>

            <motion.h1
              className="wl-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Local Business
              <motion.span
                className="wl-title-grad"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Web Collection
              </motion.span>
            </motion.h1>

            <motion.p
              className="wl-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              Webs que convierten visitantes en clientes.
              <br />
              Cada proyecto es un caso de éxito real.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <section className="wl-tabs-section">
        <Container>
          <div className="wl-tabs">
            {caseStudies.map((study, i) => (
              <button
                key={study.id}
                className={`wl-tab ${activeIndex === i ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="wl-tab-type">{study.type}</span>
                <span className="wl-tab-name">{study.name}</span>
                {activeIndex === i && (
                  <motion.div className="wl-tab-indicator" layoutId="tabIndicator" />
                )}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header + Video */}
          <Section className="wl-content">
            <Container>
              <div className="wl-case-header">
                <span className="wl-case-type">{activeCase.type}</span>
                <h2 className="wl-case-name">{activeCase.name}</h2>
                <div className="wl-case-meta">
                  <span>📍 {activeCase.location}</span>
                  <span>📅 {activeCase.year}</span>
                </div>
                <p className="wl-case-tagline">{activeCase.tagline}</p>
                <p className="wl-case-desc">{activeCase.description}</p>
              </div>

              <VideoFrame />
            </Container>
          </Section>

          {/* Study Grid */}
          <Section className="wl-study">
            <Container>
              <div className="wl-study-grid">
                <CaseStudyCard data={activeCase.challenge} delay={0} />
                <CaseStudyCard data={{ ...activeCase.solution, items: activeCase.solution.items as string[] }} delay={0.1} />
                <CaseStudyCard data={{ ...activeCase.results, items: activeCase.results.items }} delay={0.2} highlight />
              </div>
            </Container>
          </Section>

          {/* Services */}
          <Section className="wl-services">
            <Container>
              <h4 className="wl-services-title">Servicios aplicados</h4>
              <div className="wl-services-list">
                {activeCase.services.map((service) => (
                  <span key={service} className="wl-service">{service}</span>
                ))}
              </div>
            </Container>
          </Section>
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <Section className="wl-cta">
        <Container>
          <motion.div
            className="wl-cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Tienes un negocio local?</h2>
            <p>Hablemos de cómo una web bien diseñada puede traerte más clientes.</p>
            <div className="wl-cta-buttons">
              <Link to="/contacto" className="wl-btn wl-btn--primary">
                Contactar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/proyectos/branding" className="wl-btn wl-btn--secondary">
                Siguiente proyecto
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Nav */}
      <Section className="wl-nav">
        <Container>
          <div className="wl-nav-grid">
            <Link to="/proyectos/crm-automatizacion" className="wl-nav-item">
              <span className="wl-nav-label">← Anterior</span>
              <span className="wl-nav-name">CRM & Automatización</span>
            </Link>
            <Link to="/proyectos/branding" className="wl-nav-item wl-nav-item--next">
              <span className="wl-nav-label">Siguiente →</span>
              <span className="wl-nav-name">Branding</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Styles */}
      <style>{`
        .wl-page {
          --wl-orange: #f97316;
          --wl-amber: #fbbf24;
          --wl-dark: #0a0a0f;
          --wl-glass: rgba(255,255,255,0.03);
          --wl-border: rgba(255,255,255,0.08);
        }

        /* Hero */
        .wl-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          overflow: hidden;
        }

        .wl-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .wl-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.3s;
        }

        .wl-back:hover { color: var(--wl-orange); }

        .wl-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .wl-badges span {
          padding: 8px 16px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.3);
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--wl-orange);
        }

        .wl-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(36px, 8vw, 60px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .wl-title-grad {
          display: block;
          background: linear-gradient(135deg, var(--wl-orange), var(--wl-amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wl-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* Tabs */
        .wl-tabs-section {
          position: sticky;
          top: 80px;
          z-index: 20;
          padding: 20px 0;
          background: rgba(10,10,15,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--wl-border);
        }

        .wl-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .wl-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 14px 20px;
          background: var(--wl-glass);
          border: 1px solid var(--wl-border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
        }

        .wl-tab:hover { border-color: rgba(249,115,22,0.3); }

        .wl-tab.active { border-color: var(--wl-orange); }

        .wl-tab-indicator {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.05));
          z-index: -1;
        }

        .wl-tab-type {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.5);
        }

        .wl-tab.active .wl-tab-type { color: var(--wl-orange); }

        .wl-tab-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: white;
        }

        /* Content */
        .wl-content {
          padding: 60px 0 40px;
          background: var(--wl-dark);
        }

        .wl-case-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .wl-case-type {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--wl-orange);
          font-weight: 600;
        }

        .wl-case-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 700;
          color: white;
          margin: 8px 0 16px;
        }

        .wl-case-meta {
          display: flex;
          justify-content: center;
          gap: 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
        }

        .wl-case-tagline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin: 0 0 8px;
        }

        .wl-case-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Video */
        .wl-video {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(15,15,25,0.8);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--wl-border);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 80px -20px rgba(249,115,22,0.2);
        }

        .wl-video-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .wl-video-dots {
          display: flex;
          gap: 6px;
        }

        .wl-video-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .wl-video-url {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        .wl-video-content {
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(135deg, rgba(249,115,22,0.1), rgba(251,191,36,0.05), transparent);
        }

        .wl-video-play {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--wl-orange), var(--wl-amber));
          border-radius: 50%;
          box-shadow: 0 10px 40px rgba(249,115,22,0.4);
          cursor: pointer;
          transition: transform 0.3s;
        }

        .wl-video-play:hover { transform: scale(1.05); }

        .wl-video-content span {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.4);
        }

        /* Study Grid */
        .wl-study {
          padding: 60px 0;
          background: var(--wl-dark);
        }

        .wl-study-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .wl-study-grid { grid-template-columns: 1fr; gap: 16px; }
        }

        .wl-study-card {
          padding: 28px 24px;
          background: var(--wl-glass);
          border: 1px solid var(--wl-border);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: all 0.3s;
        }

        .wl-study-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
        }

        .wl-study-card--highlight {
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(251,191,36,0.06));
          border-color: rgba(249,115,22,0.25);
        }

        .wl-study-card--highlight:hover {
          border-color: rgba(249,115,22,0.4);
          box-shadow: 0 20px 40px rgba(249,115,22,0.15);
        }

        .wl-study-icon {
          font-size: 32px;
          display: block;
          margin-bottom: 16px;
        }

        .wl-study-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--wl-orange);
          margin: 0 0 16px;
        }

        .wl-study-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        .wl-study-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wl-study-list li {
          position: relative;
          padding-left: 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
        }

        .wl-study-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--wl-orange);
        }

        .wl-study-card--highlight .wl-study-list li::before {
          box-shadow: 0 0 10px var(--wl-orange);
        }

        .wl-study-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .wl-study-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .wl-study-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

        /* Services */
        .wl-services {
          padding: 40px 0 80px;
          background: var(--wl-dark);
        }

        .wl-services-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
          text-align: center;
          margin: 0 0 20px;
        }

        .wl-services-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .wl-service {
          padding: 10px 18px;
          background: var(--wl-glass);
          border: 1px solid var(--wl-border);
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          transition: all 0.3s;
        }

        .wl-service:hover {
          border-color: var(--wl-orange);
          color: var(--wl-orange);
        }

        /* CTA */
        .wl-cta {
          padding: 80px 0;
          background: linear-gradient(180deg, var(--wl-dark), #0f0f1a);
        }

        .wl-cta-card {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(249,115,22,0.1), transparent);
          border: 1px solid rgba(249,115,22,0.2);
          border-radius: 32px;
          backdrop-filter: blur(20px);
        }

        .wl-cta-card h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 5vw, 40px);
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .wl-cta-card p {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          color: rgba(255,255,255,0.55);
          margin: 0 0 32px;
        }

        .wl-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .wl-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }

        .wl-btn--primary {
          background: linear-gradient(135deg, var(--wl-orange), var(--wl-amber));
          color: white;
          box-shadow: 0 10px 30px rgba(249,115,22,0.3);
        }

        .wl-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(249,115,22,0.4);
        }

        .wl-btn--secondary {
          background: var(--wl-glass);
          border: 1px solid var(--wl-border);
          color: white;
        }

        .wl-btn--secondary:hover {
          border-color: var(--wl-orange);
          color: var(--wl-orange);
        }

        /* Nav */
        .wl-nav {
          padding: 60px 0;
          border-top: 1px solid var(--wl-border);
        }

        .wl-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .wl-nav-item {
          padding: 24px;
          background: var(--wl-glass);
          border: 1px solid var(--wl-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .wl-nav-item:hover {
          border-color: var(--wl-orange);
          transform: translateY(-2px);
        }

        .wl-nav-item--next { text-align: right; }

        .wl-nav-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
        }

        .wl-nav-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .wl-hero { min-height: auto; padding: 120px 0 60px; }
          .wl-tabs { justify-content: flex-start; overflow-x: auto; padding-bottom: 8px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .wl-tabs::-webkit-scrollbar { display: none; }
          .wl-tab { flex-shrink: 0; }
          .wl-cta-card { padding: 40px 24px; }
          .wl-nav-grid { grid-template-columns: 1fr; }
          .wl-nav-item--next { text-align: left; }
          .wl-video-play { width: 60px; height: 60px; }
          .wl-video-play svg { width: 28px; height: 28px; }
        }
      `}</style>
    </div>
  )
}
