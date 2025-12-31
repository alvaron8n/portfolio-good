import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'
import { VideoFrame } from '../../components/case-study/VideoFrame'
import { CaseStudyGrid } from '../../components/case-study/CaseStudyGrid'

// ============================================
// CASE STUDIES DATA
// ============================================
const caseStudies = [
  {
    id: 'bohemian',
    name: 'Bohemian Bar',
    type: 'Hostelería',
    location: 'Plasencia',
    year: '2024',
    color: '#F97316',
    description: 'Web premium para coctelería de autor con sistema de reservas integrado.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      content: 'El cliente recibía demasiadas llamadas para reservas, perdiendo tiempo valioso. Necesitaba una presencia digital que reflejara la exclusividad de su coctelería.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      content: [
        'Diseño oscuro y elegante acorde a la marca',
        'Sistema de reservas online con confirmación automática',
        'Menú digital interactivo con fotos profesionales',
        'SEO local optimizado para Plasencia'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      content: [
        '60% menos llamadas telefónicas',
        '+45% reservas de grupos',
        'Posición #1 en Google Maps local',
        'Tiempo de gestión reducido a la mitad'
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
    color: '#F97316',
    description: 'Tienda gourmet con catálogo digital y sistema de pedidos.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      content: 'Una tienda gourmet tradicional que necesitaba expandir su alcance más allá de los clientes locales y modernizar su imagen sin perder el toque artesanal.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      content: [
        'Diseño cálido con fotografía de producto premium',
        'Catálogo digital organizado por categorías',
        'Sistema de pedidos con recogida en tienda',
        'Blog de recetas para engagement'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      content: [
        'Ventas online desde el primer mes',
        '+30% clientes nuevos de otras localidades',
        'Pedidos de empresas locales',
        'Newsletter con 500+ suscriptores'
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
    color: '#F97316',
    description: 'Asesoría fiscal moderna que transmite confianza y profesionalidad.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      content: 'Una asesoría tradicional con imagen anticuada que no generaba confianza online. Los competidores captaban leads digitales mientras ellos dependían del boca a boca.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      content: [
        'Rediseño completo con imagen corporativa moderna',
        'Landing pages para cada servicio',
        'Formularios de contacto optimizados para conversión',
        'Testimonios y casos de éxito destacados'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      content: [
        '3x consultas online en 3 meses',
        '25% nuevos clientes vía web',
        'Mejor posicionamiento vs competencia',
        'Percepción de marca premium'
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
    color: '#F97316',
    description: 'Clínica de fisioterapia con sistema de citas online y diseño humano.',
    challenge: {
      icon: '🎯',
      title: 'El Reto',
      content: 'La clínica tenía una web obsoleta que no transmitía profesionalidad. Los pacientes llamaban para pedir cita, saturando la recepción.'
    },
    solution: {
      icon: '💡',
      title: 'Solución',
      content: [
        'Diseño limpio y profesional con colores relajantes',
        'Sistema de citas online con calendario en tiempo real',
        'Presentación del equipo para humanizar la marca',
        'Blog de salud para posicionamiento SEO'
      ]
    },
    results: {
      icon: '📈',
      title: 'Resultados',
      content: [
        '70% citas reservadas online',
        'Recepción liberada para atención presencial',
        '+40% visitas orgánicas mensuales',
        'Mejor valoración en Google Reviews'
      ]
    },
    services: ['Diseño Web', 'Sistema de Citas', 'SEO', 'Blog Salud', 'Google My Business']
  }
]

// ============================================
// MAIN COMPONENT
// ============================================
export function ProjectWebsLocales() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCase = caseStudies[activeIndex]

  return (
    <div className="pwl-page">
      {/* ========== HERO ========== */}
      <section className="pwl-hero">
        <Container>
          <motion.div 
            className="pwl-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/proyectos" className="pwl-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Volver a proyectos
            </Link>

            <div className="pwl-meta">
              <span className="pwl-badge">Diseño Web</span>
              <span className="pwl-badge">UI/UX</span>
              <span className="pwl-badge">CRO</span>
            </div>

            <h1 className="pwl-title">
              Local Business
              <span className="pwl-grad">Web Collection</span>
            </h1>

            <p className="pwl-subtitle">
              Experiencias digitales para negocios locales, diseñadas para convertir visitantes en clientes.
            </p>
          </motion.div>
        </Container>

        {/* Background effects */}
        <div className="pwl-hero-bg">
          <div className="pwl-orb pwl-orb--1" />
          <div className="pwl-orb pwl-orb--2" />
        </div>
      </section>

      {/* ========== TABS ========== */}
      <section className="pwl-tabs-section">
        <Container>
          <div className="pwl-tabs">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveIndex(index)}
                className={`pwl-tab ${activeIndex === index ? 'active' : ''}`}
              >
                <span className="pwl-tab-type">{study.type}</span>
                <span className="pwl-tab-name">{study.name}</span>
                {activeIndex === index && (
                  <motion.div 
                    className="pwl-tab-indicator" 
                    layoutId="tabIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== CASE STUDY CONTENT ========== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Video Section */}
          <Section className="pwl-video-section">
            <Container>
              <div className="pwl-case-header">
                <div className="pwl-case-info">
                  <span className="pwl-case-type">{activeCase.type}</span>
                  <h2 className="pwl-case-name">{activeCase.name}</h2>
                  <div className="pwl-case-meta">
                    <span>📍 {activeCase.location}</span>
                    <span>📅 {activeCase.year}</span>
                  </div>
                  <p className="pwl-case-desc">{activeCase.description}</p>
                </div>
              </div>
              
              <VideoFrame placeholder accentColor={activeCase.color} />
            </Container>
          </Section>

          {/* Case Study Grid */}
          <Section className="pwl-study-section">
            <Container>
              <CaseStudyGrid
                challenge={activeCase.challenge}
                solution={activeCase.solution}
                results={activeCase.results}
                accentColor={activeCase.color}
              />
            </Container>
          </Section>

          {/* Services */}
          <Section className="pwl-services-section">
            <Container>
              <h3 className="pwl-services-title">Servicios aplicados</h3>
              <div className="pwl-services">
                {activeCase.services.map((service) => (
                  <span key={service} className="pwl-service">{service}</span>
                ))}
              </div>
            </Container>
          </Section>
        </motion.div>
      </AnimatePresence>

      {/* ========== CTA ========== */}
      <Section className="pwl-cta-section">
        <Container>
          <motion.div 
            className="pwl-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>¿Tienes un negocio local?</h2>
            <p>Hablemos de cómo una web bien diseñada puede traerte más clientes.</p>
            <div className="pwl-cta-buttons">
              <Link to="/contacto" className="pwl-btn pwl-btn--primary">
                Contactar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/proyectos/branding" className="pwl-btn pwl-btn--secondary">
                Siguiente proyecto
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ========== NAVIGATION ========== */}
      <Section className="pwl-nav-section">
        <Container>
          <div className="pwl-nav">
            <Link to="/proyectos/crm-automatizacion" className="pwl-nav-item">
              <span className="pwl-nav-label">← Anterior</span>
              <span className="pwl-nav-title">CRM & Automatización</span>
            </Link>
            <Link to="/proyectos/branding" className="pwl-nav-item pwl-nav-item--next">
              <span className="pwl-nav-label">Siguiente →</span>
              <span className="pwl-nav-title">Branding</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ========== STYLES ========== */}
      <style>{`
        .pwl-page {
          --pwl-orange: #F97316;
          --pwl-orange-light: #FB923C;
          --pwl-dark: #0A0A0F;
          --pwl-glass: rgba(255, 255, 255, 0.04);
          --pwl-border: rgba(255, 255, 255, 0.08);
        }

        /* Hero */
        .pwl-hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          overflow: hidden;
          background: linear-gradient(180deg, #0F0F1A 0%, #0A0A0F 100%);
        }

        .pwl-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .pwl-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .pwl-orb--1 {
          width: 500px;
          height: 500px;
          background: var(--pwl-orange);
          top: -30%;
          right: -10%;
          opacity: 0.12;
        }

        .pwl-orb--2 {
          width: 400px;
          height: 400px;
          background: var(--pwl-orange-light);
          bottom: -20%;
          left: -10%;
          opacity: 0.08;
        }

        .pwl-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .pwl-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.3s;
        }

        .pwl-back:hover {
          color: var(--pwl-orange);
        }

        .pwl-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pwl-badge {
          padding: 6px 14px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--pwl-orange);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pwl-title {
          font-size: clamp(36px, 8vw, 56px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .pwl-grad {
          display: block;
          background: linear-gradient(135deg, var(--pwl-orange), var(--pwl-orange-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pwl-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* Tabs */
        .pwl-tabs-section {
          position: sticky;
          top: 80px;
          z-index: 20;
          padding: 20px 0;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--pwl-border);
        }

        .pwl-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pwl-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 14px 20px;
          background: var(--pwl-glass);
          border: 1px solid var(--pwl-border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
        }

        .pwl-tab:hover {
          border-color: rgba(249, 115, 22, 0.3);
        }

        .pwl-tab.active {
          border-color: var(--pwl-orange);
        }

        .pwl-tab-indicator {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.05));
          border-radius: 11px;
          z-index: -1;
        }

        .pwl-tab-type {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
        }

        .pwl-tab.active .pwl-tab-type {
          color: var(--pwl-orange);
        }

        .pwl-tab-name {
          font-size: 15px;
          font-weight: 600;
          color: white;
        }

        /* Video Section */
        .pwl-video-section {
          padding: 60px 0 40px;
          background: var(--pwl-dark);
        }

        .pwl-case-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .pwl-case-type {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--pwl-orange);
          font-weight: 600;
        }

        .pwl-case-name {
          font-size: clamp(28px, 5vw, 40px);
          font-weight: 700;
          color: white;
          margin: 8px 0 12px;
        }

        .pwl-case-meta {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 16px;
        }

        .pwl-case-desc {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Study Section */
        .pwl-study-section {
          padding: 60px 0;
          background: var(--pwl-dark);
        }

        /* Services */
        .pwl-services-section {
          padding: 40px 0 80px;
          background: var(--pwl-dark);
        }

        .pwl-services-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          margin: 0 0 20px;
        }

        .pwl-services {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .pwl-service {
          padding: 10px 18px;
          background: var(--pwl-glass);
          border: 1px solid var(--pwl-border);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s;
        }

        .pwl-service:hover {
          border-color: var(--pwl-orange);
          color: var(--pwl-orange);
        }

        /* CTA */
        .pwl-cta-section {
          padding: 80px 0;
          background: linear-gradient(180deg, var(--pwl-dark) 0%, #0F0F1A 100%);
        }

        .pwl-cta {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), transparent);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 32px;
          backdrop-filter: blur(20px);
        }

        .pwl-cta h2 {
          font-size: clamp(28px, 5vw, 40px);
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .pwl-cta p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 32px;
        }

        .pwl-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .pwl-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }

        .pwl-btn--primary {
          background: linear-gradient(135deg, var(--pwl-orange), var(--pwl-orange-light));
          color: white;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
        }

        .pwl-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.4);
        }

        .pwl-btn--secondary {
          background: var(--pwl-glass);
          border: 1px solid var(--pwl-border);
          color: white;
        }

        .pwl-btn--secondary:hover {
          border-color: var(--pwl-orange);
          color: var(--pwl-orange);
        }

        /* Navigation */
        .pwl-nav-section {
          padding: 60px 0;
          border-top: 1px solid var(--pwl-border);
        }

        .pwl-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .pwl-nav-item {
          padding: 24px;
          background: var(--pwl-glass);
          border: 1px solid var(--pwl-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .pwl-nav-item:hover {
          border-color: var(--pwl-orange);
          transform: translateY(-2px);
        }

        .pwl-nav-item--next {
          text-align: right;
        }

        .pwl-nav-label {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 6px;
        }

        .pwl-nav-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .pwl-hero {
            min-height: auto;
            padding: 120px 0 60px;
          }

          .pwl-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .pwl-tabs::-webkit-scrollbar {
            display: none;
          }

          .pwl-tab {
            flex-shrink: 0;
          }

          .pwl-cta {
            padding: 40px 24px;
          }

          .pwl-nav {
            grid-template-columns: 1fr;
          }

          .pwl-nav-item--next {
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}
