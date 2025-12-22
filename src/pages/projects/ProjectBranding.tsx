import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'

export function ProjectBranding() {
  const cases = [
    {
      id: 'conservas-lolin',
      name: 'Conservas Lolín',
      type: 'Social Media Revamp',
      industry: 'Conservera tradicional · Cantabria',
      description: 'Modernizar la presencia digital de una conservera tradicional sin perder la esencia artesanal.',
      color: '#F59E0B',
    },
    {
      id: 'flama-aerials',
      name: 'Flama Aerials',
      type: 'Tech Branding',
      industry: 'Videografía aérea con drones',
      description: 'Identidad visual completa para empresa de videografía aérea. Sistema de logos adaptables y lenguaje visual tech-premium.',
      color: '#EF4444',
    },
    {
      id: 'logofolio',
      name: 'Logofolio',
      type: 'Experimentos de Diseño',
      industry: 'Proyectos ficticios',
      description: 'Colección de logos y experimentos visuales que demuestran versatilidad en diferentes industrias.',
      color: '#8B5CF6',
    },
    {
      id: 'adidas-stellar',
      name: 'Adidas × Stellar',
      type: 'Event Design',
      industry: 'Proyecto Universitario',
      description: 'Diseño integral de un evento deportivo ficticio para el lanzamiento de camisetas icónicas reimaginadas.',
      color: '#06B6D4',
    },
  ]

  return (
    <div className="brand-project-page">
      {/* Hero */}
      <section className="brand-hero">
        <div className="brand-hero-bg">
          <div className="brand-hero-pattern" />
          <motion.div 
            className="brand-hero-shape brand-hero-shape--1"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="brand-hero-shape brand-hero-shape--2"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <Container>
          <div className="brand-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/proyectos" className="brand-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a proyectos
              </Link>
            </motion.div>

            <motion.span 
              className="brand-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Branding · Identidad Visual · Diseño
            </motion.span>

            <motion.h1 
              className="brand-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Branding &<br />
              <span className="brand-title-gradient">Visual Ecosystems</span>
            </motion.h1>

            <motion.p 
              className="brand-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Desde identidad corporativa hasta activos de conversión. 
              Marcas memorables que venden.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Cases Grid */}
      <Section className="brand-cases">
        <Container>
          <div className="brand-cases-grid">
            {cases.map((c, i) => (
              <motion.div
                key={c.id}
                className="brand-case-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ '--case-color': c.color } as React.CSSProperties}
              >
                <div className="brand-case-visual">
                  <div className="brand-case-placeholder">
                    <span style={{ color: c.color }}>{c.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="brand-case-content">
                  <span className="brand-case-type">{c.type}</span>
                  <h3 className="brand-case-name">{c.name}</h3>
                  <p className="brand-case-industry">{c.industry}</p>
                  <p className="brand-case-desc">{c.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="brand-cta">
        <Container>
          <motion.div
            className="brand-cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Necesitas una identidad visual?</h2>
            <p>Hablemos de cómo hacer que tu marca se vea tan profesional como tus servicios.</p>
            <div className="brand-cta-buttons">
              <Link to="/contacto" className="brand-btn brand-btn--primary">
                Contactar
              </Link>
              <Link to="/proyectos/ecommerce-propio" className="brand-btn brand-btn--secondary">
                Siguiente proyecto
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Navigation */}
      <Section className="brand-nav">
        <Container>
          <div className="brand-nav-grid">
            <Link to="/proyectos/webs-locales" className="brand-nav-item">
              <span className="brand-nav-label">← Anterior</span>
              <span className="brand-nav-title">Webs Locales</span>
            </Link>
            <Link to="/proyectos/ecommerce-propio" className="brand-nav-item brand-nav-item--next">
              <span className="brand-nav-label">Siguiente →</span>
              <span className="brand-nav-title">E-commerce Propio</span>
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        .brand-project-page {
          --brand-amber: #F59E0B;
          --brand-violet: #8B5CF6;
          --brand-cyan: #06B6D4;
          --brand-dark: #0A0A0F;
          --brand-glass: rgba(255, 255, 255, 0.03);
          --brand-glass-border: rgba(255, 255, 255, 0.08);
        }

        .brand-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
          background: var(--brand-dark);
        }

        .brand-hero-bg {
          position: absolute;
          inset: 0;
        }

        .brand-hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }

        .brand-hero-shape {
          position: absolute;
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 50%;
        }

        .brand-hero-shape--1 {
          width: 500px;
          height: 500px;
          top: -20%;
          right: -10%;
        }

        .brand-hero-shape--2 {
          width: 300px;
          height: 300px;
          bottom: -10%;
          left: -5%;
        }

        .brand-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .brand-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.2s;
        }

        .brand-back-link:hover { color: white; }
        .brand-back-link svg { width: 18px; height: 18px; }

        .brand-category {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--brand-amber);
        }

        .brand-title {
          font-size: clamp(40px, 8vw, 72px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 16px 0 24px;
        }

        .brand-title-gradient {
          background: linear-gradient(135deg, var(--brand-amber) 0%, #EF4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
        }

        .brand-cases {
          padding: 100px 0;
          background: #0F0F14;
        }

        .brand-cases-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (max-width: 768px) {
          .brand-cases-grid {
            grid-template-columns: 1fr;
          }
        }

        .brand-case-card {
          background: var(--brand-glass);
          border: 1px solid var(--brand-glass-border);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .brand-case-card:hover {
          border-color: var(--case-color);
          transform: translateY(-5px);
        }

        .brand-case-visual {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, rgba(20, 20, 30, 1) 0%, rgba(10, 10, 20, 1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-case-placeholder {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-glass);
          border: 1px solid var(--brand-glass-border);
          border-radius: 20px;
        }

        .brand-case-placeholder span {
          font-size: 36px;
          font-weight: 700;
        }

        .brand-case-content {
          padding: 28px;
        }

        .brand-case-type {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--case-color);
        }

        .brand-case-name {
          font-size: 24px;
          font-weight: 600;
          color: white;
          margin: 8px 0;
        }

        .brand-case-industry {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 12px;
        }

        .brand-case-desc {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .brand-cta {
          padding: 100px 0;
          background: var(--brand-dark);
        }

        .brand-cta-card {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 32px;
        }

        .brand-cta-card h2 {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .brand-cta-card p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 32px;
        }

        .brand-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .brand-btn {
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .brand-btn--primary {
          background: var(--brand-amber);
          color: black;
        }

        .brand-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }

        .brand-btn--secondary {
          background: var(--brand-glass);
          border: 1px solid var(--brand-glass-border);
          color: white;
        }

        .brand-btn--secondary:hover {
          border-color: var(--brand-amber);
        }

        .brand-nav {
          padding: 60px 0;
          border-top: 1px solid var(--brand-glass-border);
        }

        .brand-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .brand-nav-item {
          padding: 24px;
          background: var(--brand-glass);
          border: 1px solid var(--brand-glass-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .brand-nav-item:hover { border-color: var(--brand-amber); }
        .brand-nav-item--next { text-align: right; }

        .brand-nav-label {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .brand-nav-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        @media (max-width: 640px) {
          .brand-hero { min-height: auto; padding: 100px 0 60px; }
          .brand-title { font-size: 36px; }
          .brand-nav-grid { grid-template-columns: 1fr; }
          .brand-nav-item--next { text-align: left; }
        }
      `}</style>
    </div>
  )
}