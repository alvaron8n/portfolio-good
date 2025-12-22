import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'

export function ProjectEcommerce() {
  const brands = [
    {
      id: 'pikete',
      name: 'Pikete Lowcost',
      tagline: 'E-commerce de Zapatillas & Cultura Urbana',
      period: '2019 – 2022',
      description: 'Fundé y escalé este e-commerce desde cero, gestionando un catálogo de +50 referencias. No fue solo dropshipping; creé una marca con comunidad propia.',
      stats: [
        { value: '6K+', label: 'Seguidores' },
        { value: '50+', label: 'Referencias' },
        { value: '3', label: 'Años' },
      ],
      skills: ['Shopify', 'Meta Ads', 'Logística', 'Growth'],
      color: '#10B981',
    },
    {
      id: 'impale',
      name: 'Impale Clothing',
      tagline: 'Brand Identity & Streetwear',
      period: '2019 – 2021',
      description: 'Más que ropa, una identidad visual. Diseñé cada prenda y logotipo, dirigí sesiones de fotos y gestioné la venta directa D2C.',
      stats: [
        { value: '1K+', label: 'Seguidores' },
        { value: '20+', label: 'Diseños' },
        { value: '2', label: 'Eventos' },
      ],
      skills: ['Branding', 'Illustrator', 'IG Marketing', 'Eventos'],
      color: '#EF4444',
    },
  ]

  const learnings = [
    'Gestión integral de un negocio: desde producto hasta postventa',
    'Community management real: construir audiencia desde cero',
    'El tiempo es el recurso más valioso (por eso ahora automatizo)',
    'Meta Ads y estrategias de crecimiento orgánico',
    'Logística y atención al cliente',
  ]

  return (
    <div className="ecom-project-page">
      {/* Hero */}
      <section className="ecom-hero">
        <div className="ecom-hero-bg">
          <div className="ecom-hero-gradient" />
          {/* Floating stickers */}
          {['🔥', '💯', '⚡', '🚀', '✨'].map((emoji, i) => (
            <motion.div
              key={i}
              className="ecom-sticker"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <Container>
          <div className="ecom-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/proyectos" className="ecom-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a proyectos
              </Link>
            </motion.div>

            <motion.span 
              className="ecom-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              E-commerce · Emprendimiento · Community
            </motion.span>

            <motion.h1 
              className="ecom-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Pikete Lowcost &<br />
              <span className="ecom-title-gradient">Impale Clothing</span>
            </motion.h1>

            <motion.p 
              className="ecom-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Dos marcas que fundé, escalé y gestioné íntegramente. 
              Mi escuela práctica de emprendimiento digital.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <Section className="ecom-intro">
        <Container>
          <motion.div
            className="ecom-intro-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>
              Antes de especializarme en automatización y desarrollo, emprendí con dos marcas de e-commerce. 
              Estas experiencias me enseñaron el <strong>valor del tiempo</strong>, la importancia de la 
              <strong> eficiencia operativa</strong> y cómo gestionar una comunidad desde cero.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Brands */}
      <Section className="ecom-brands">
        <Container>
          <div className="ecom-brands-grid">
            {brands.map((brand, bIndex) => (
              <motion.div
                key={brand.id}
                className="ecom-brand-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: bIndex * 0.2 }}
                style={{ '--brand-color': brand.color } as React.CSSProperties}
              >
                <div className="ecom-brand-header">
                  <span className="ecom-brand-period">{brand.period}</span>
                  <h3 className="ecom-brand-name">{brand.name}</h3>
                  <p className="ecom-brand-tagline">{brand.tagline}</p>
                </div>

                <p className="ecom-brand-desc">{brand.description}</p>

                <div className="ecom-brand-stats">
                  {brand.stats.map((stat) => (
                    <div key={stat.label} className="ecom-stat">
                      <span className="ecom-stat-value">{stat.value}</span>
                      <span className="ecom-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="ecom-brand-skills">
                  {brand.skills.map((skill) => (
                    <span key={skill} className="ecom-skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Learnings */}
      <Section className="ecom-learnings">
        <Container>
          <motion.div
            className="ecom-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Lo que aprendí</h2>
          </motion.div>

          <div className="ecom-learnings-list">
            {learnings.map((item, i) => (
              <motion.div
                key={i}
                className="ecom-learning-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="ecom-learning-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="ecom-learning-text">{item}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="ecom-cta">
        <Container>
          <motion.div
            className="ecom-cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Tienes un e-commerce?</h2>
            <p>Puedo ayudarte a automatizar procesos y escalar sin multiplicar tu carga de trabajo.</p>
            <div className="ecom-cta-buttons">
              <Link to="/contacto" className="ecom-btn ecom-btn--primary">
                Hablemos
              </Link>
              <Link to="/proyectos/crm-automatizacion" className="ecom-btn ecom-btn--secondary">
                Ver automatizaciones
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Navigation */}
      <Section className="ecom-nav">
        <Container>
          <div className="ecom-nav-grid">
            <Link to="/proyectos/branding" className="ecom-nav-item">
              <span className="ecom-nav-label">← Anterior</span>
              <span className="ecom-nav-title">Branding</span>
            </Link>
            <Link to="/proyectos" className="ecom-nav-item ecom-nav-item--next">
              <span className="ecom-nav-label">Ver todos →</span>
              <span className="ecom-nav-title">Proyectos</span>
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        .ecom-project-page {
          --ecom-green: #10B981;
          --ecom-red: #EF4444;
          --ecom-violet: #8B5CF6;
          --ecom-dark: #0A0A0F;
          --ecom-glass: rgba(255, 255, 255, 0.03);
          --ecom-glass-border: rgba(255, 255, 255, 0.08);
        }

        .ecom-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
          background: linear-gradient(135deg, #0A0A0F 0%, #1A0A1A 50%, #0A0A0F 100%);
        }

        .ecom-hero-bg {
          position: absolute;
          inset: 0;
        }

        .ecom-hero-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(239, 68, 68, 0.15) 0%, transparent 50%);
        }

        .ecom-sticker {
          position: absolute;
          font-size: 32px;
          opacity: 0.6;
          pointer-events: none;
        }

        .ecom-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .ecom-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          margin-bottom: 32px;
        }

        .ecom-back-link:hover { color: white; }
        .ecom-back-link svg { width: 18px; height: 18px; }

        .ecom-category {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--ecom-green);
        }

        .ecom-title {
          font-size: clamp(36px, 7vw, 64px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 16px 0 24px;
        }

        .ecom-title-gradient {
          background: linear-gradient(135deg, var(--ecom-green) 0%, var(--ecom-red) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ecom-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
        }

        .ecom-intro {
          padding: 80px 0;
          background: var(--ecom-dark);
        }

        .ecom-intro-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .ecom-intro-content p {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .ecom-intro-content strong { color: white; }

        .ecom-brands {
          padding: 80px 0;
          background: #0F0F14;
        }

        .ecom-brands-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .ecom-brands-grid { grid-template-columns: 1fr; }
        }

        .ecom-brand-card {
          padding: 40px;
          background: var(--ecom-glass);
          border: 1px solid var(--ecom-glass-border);
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .ecom-brand-card:hover {
          border-color: var(--brand-color);
        }

        .ecom-brand-header {
          margin-bottom: 20px;
        }

        .ecom-brand-period {
          font-size: 12px;
          color: var(--brand-color);
          font-weight: 600;
        }

        .ecom-brand-name {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin: 8px 0 4px;
        }

        .ecom-brand-tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .ecom-brand-desc {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 24px;
        }

        .ecom-brand-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .ecom-stat {
          text-align: center;
        }

        .ecom-stat-value {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: var(--brand-color);
        }

        .ecom-stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .ecom-brand-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ecom-skill-tag {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .ecom-learnings {
          padding: 100px 0;
          background: var(--ecom-dark);
        }

        .ecom-section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .ecom-section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: white;
        }

        .ecom-learnings-list {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ecom-learning-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: var(--ecom-glass);
          border: 1px solid var(--ecom-glass-border);
          border-radius: 16px;
        }

        .ecom-learning-number {
          font-size: 14px;
          font-weight: 700;
          color: var(--ecom-green);
          opacity: 0.5;
        }

        .ecom-learning-text {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
        }

        .ecom-cta {
          padding: 100px 0;
          background: #0F0F14;
        }

        .ecom-cta-card {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 32px;
        }

        .ecom-cta-card h2 {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .ecom-cta-card p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 32px;
        }

        .ecom-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ecom-btn {
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .ecom-btn--primary {
          background: var(--ecom-green);
          color: black;
        }

        .ecom-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }

        .ecom-btn--secondary {
          background: var(--ecom-glass);
          border: 1px solid var(--ecom-glass-border);
          color: white;
        }

        .ecom-btn--secondary:hover { border-color: var(--ecom-green); }

        .ecom-nav {
          padding: 60px 0;
          border-top: 1px solid var(--ecom-glass-border);
        }

        .ecom-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .ecom-nav-item {
          padding: 24px;
          background: var(--ecom-glass);
          border: 1px solid var(--ecom-glass-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .ecom-nav-item:hover { border-color: var(--ecom-green); }
        .ecom-nav-item--next { text-align: right; }

        .ecom-nav-label {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .ecom-nav-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        @media (max-width: 640px) {
          .ecom-hero { min-height: auto; padding: 100px 0 60px; }
          .ecom-title { font-size: 32px; }
          .ecom-brand-card { padding: 24px; }
          .ecom-brand-name { font-size: 22px; }
          .ecom-nav-grid { grid-template-columns: 1fr; }
          .ecom-nav-item--next { text-align: left; }
        }
      `}</style>
    </div>
  )
}