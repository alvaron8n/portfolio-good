import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'

export function ProjectWebsLocales() {
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    { id: 'bohemian', name: 'Bohemian Bar', type: 'Hostelería', location: 'Plasencia', description: 'Web premium para coctelería de autor. Diseño oscuro y elegante.', keyFeature: 'Sistema de reservas online integrado', result: 'Redujo llamadas un 60% y aumentó reservas de grupos.', tags: ['Reservas', 'Menú Digital'], color: '#8B5CF6' },
    { id: 'alba-plata', name: 'Alba Plata', type: 'Retail', location: 'Plasencia', description: 'Tienda gourmet con diseño cálido y artesanal.', keyFeature: 'Catálogo digital con sistema de pedidos', result: 'Expandió ventas más allá de la tienda física.', tags: ['Catálogo', 'Pedidos'], color: '#F59E0B' },
    { id: 'urban33', name: 'Urban 33', type: 'Servicios', location: 'Plasencia', description: 'Asesoría fiscal moderna que transmite confianza.', keyFeature: 'Formulario de contacto optimizado', result: 'Triplicó consultas online.', tags: ['Corporativa', 'Lead Gen'], color: '#06B6D4' },
    { id: 'health', name: 'Health Clinic', type: 'Salud', location: 'Plasencia', description: 'Clínica de fisioterapia con diseño limpio y profesional.', keyFeature: 'Sistema de citas online', result: 'Humanizó la marca y mejoró conversiones.', tags: ['Citas Online', 'Equipo'], color: '#10B981' },
  ]

  return (
    <div className="wl-page">
      {/* Hero */}
      <section className="wl-hero">
        <Container>
          <div className="wl-hero-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/proyectos" className="wl-back">← Volver a proyectos</Link>
            </motion.div>
            <motion.span className="wl-cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Diseño Web · UI/UX · CRO</motion.span>
            <motion.h1 className="wl-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Local Business<br /><span className="wl-grad">Web Collection</span>
            </motion.h1>
            <motion.p className="wl-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Experiencias digitales para negocios locales, enfocadas en conversión.
            </motion.p>
          </div>
        </Container>
        <div className="wl-hero-bg"><div className="wl-orb wl-orb--1" /><div className="wl-orb wl-orb--2" /></div>
      </section>

      {/* Tabs */}
      <Section className="wl-tabs-section">
        <Container>
          <div className="wl-tabs">
            {cases.map((c, i) => (
              <button key={c.id} className={`wl-tab ${activeCase === i ? 'active' : ''}`} onClick={() => setActiveCase(i)} style={{ '--tc': c.color } as React.CSSProperties}>
                <span className="wl-tab-type">{c.type}</span>
                <span className="wl-tab-name">{c.name}</span>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Active Case */}
      <Section className="wl-case">
        <Container>
          <motion.div key={activeCase} className="wl-case-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ '--cc': cases[activeCase].color } as React.CSSProperties}>
            <div className="wl-case-grid">
              <div className="wl-case-visual">
                <div className="wl-mockup">
                  <div className="wl-mockup-bar"><span /><span /><span /></div>
                  <div className="wl-mockup-content" style={{ background: `linear-gradient(135deg, ${cases[activeCase].color}30, transparent)` }}>
                    <div className="wl-mock-nav" /><div className="wl-mock-hero" /><div className="wl-mock-cards"><div /><div /><div /></div>
                  </div>
                </div>
              </div>
              <div className="wl-case-info">
                <span className="wl-case-type" style={{ color: cases[activeCase].color }}>{cases[activeCase].type}</span>
                <h2 className="wl-case-name">{cases[activeCase].name}</h2>
                <span className="wl-case-loc">📍 {cases[activeCase].location}</span>
                <p className="wl-case-desc">{cases[activeCase].description}</p>
                <div className="wl-feature"><span className="wl-feature-label">Característica clave</span><span className="wl-feature-value">{cases[activeCase].keyFeature}</span></div>
                <div className="wl-result"><span>📈</span><span>{cases[activeCase].result}</span></div>
                <div className="wl-tags">{cases[activeCase].tags.map(t => <span key={t} className="wl-tag" style={{ borderColor: cases[activeCase].color, color: cases[activeCase].color }}>{t}</span>)}</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="wl-cta">
        <Container>
          <motion.div className="wl-cta-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2>¿Tienes un negocio local?</h2>
            <p>Hablemos de cómo una web bien diseñada puede traerte más clientes.</p>
            <div className="wl-cta-btns">
              <Link to="/contacto" className="wl-btn wl-btn--pri">Contactar</Link>
              <Link to="/proyectos/branding" className="wl-btn wl-btn--sec">Siguiente proyecto</Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Nav */}
      <Section className="wl-nav">
        <Container>
          <div className="wl-nav-grid">
            <Link to="/proyectos/crm-automatizacion" className="wl-nav-item"><span className="wl-nav-label">← Anterior</span><span className="wl-nav-title">CRM & Automatización</span></Link>
            <Link to="/proyectos/branding" className="wl-nav-item wl-nav-item--next"><span className="wl-nav-label">Siguiente →</span><span className="wl-nav-title">Branding</span></Link>
          </div>
        </Container>
      </Section>

      <style>{`
        .wl-page { --wl-dark: #0A0A0F; --wl-glass: rgba(255,255,255,0.03); --wl-border: rgba(255,255,255,0.08); }
        .wl-hero { position: relative; min-height: 70vh; display: flex; align-items: center; padding: 120px 0 80px; overflow: hidden; background: linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%); }
        .wl-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .wl-orb { position: absolute; border-radius: 50%; filter: blur(100px); }
        .wl-orb--1 { width: 400px; height: 400px; background: #06B6D4; top: -20%; left: -10%; opacity: 0.15; }
        .wl-orb--2 { width: 300px; height: 300px; background: #8B5CF6; bottom: -10%; right: -5%; opacity: 0.1; }
        .wl-hero-content { position: relative; z-index: 2; max-width: 600px; }
        .wl-back { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; margin-bottom: 32px; }
        .wl-back:hover { color: white; }
        .wl-cat { display: block; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #06B6D4; margin-bottom: 16px; }
        .wl-title { font-size: clamp(36px, 7vw, 64px); font-weight: 700; color: white; line-height: 1.1; margin: 0 0 24px; }
        .wl-grad { background: linear-gradient(135deg, #06B6D4, #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .wl-sub { font-size: 18px; color: rgba(255,255,255,0.6); line-height: 1.7; }
        .wl-tabs-section { padding: 40px 0; background: #12121A; position: sticky; top: 80px; z-index: 10; }
        .wl-tabs { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .wl-tab { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px 20px; background: var(--wl-glass); border: 1px solid var(--wl-border); border-radius: 12px; cursor: pointer; transition: all 0.3s; }
        .wl-tab:hover { border-color: var(--tc); }
        .wl-tab.active { background: color-mix(in srgb, var(--tc) 15%, transparent); border-color: var(--tc); }
        .wl-tab-type { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); }
        .wl-tab-name { font-size: 15px; font-weight: 600; color: white; }
        .wl-case { padding: 60px 0 100px; background: #12121A; }
        .wl-case-card { background: var(--wl-glass); border: 1px solid var(--wl-border); border-radius: 24px; overflow: hidden; }
        .wl-case-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        @media (max-width: 768px) { .wl-case-grid { grid-template-columns: 1fr; } }
        .wl-case-visual { padding: 32px; display: flex; align-items: center; justify-content: center; }
        .wl-mockup { width: 100%; max-width: 400px; background: #1a1a24; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .wl-mockup-bar { display: flex; gap: 6px; padding: 10px 14px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .wl-mockup-bar span { width: 10px; height: 10px; border-radius: 50%; }
        .wl-mockup-bar span:nth-child(1) { background: #FF5F57; }
        .wl-mockup-bar span:nth-child(2) { background: #FFBD2E; }
        .wl-mockup-bar span:nth-child(3) { background: #28CA41; }
        .wl-mockup-content { padding: 20px; min-height: 200px; }
        .wl-mock-nav { width: 100%; height: 12px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 20px; }
        .wl-mock-hero { width: 70%; height: 16px; background: rgba(255,255,255,0.2); border-radius: 4px; margin-bottom: 24px; }
        .wl-mock-cards { display: flex; gap: 10px; }
        .wl-mock-cards div { flex: 1; height: 50px; background: rgba(255,255,255,0.05); border-radius: 8px; }
        .wl-case-info { padding: 32px; display: flex; flex-direction: column; justify-content: center; }
        .wl-case-type { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .wl-case-name { font-size: 28px; font-weight: 700; color: white; margin: 8px 0; }
        .wl-case-loc { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 16px; display: block; }
        .wl-case-desc { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.6); margin: 0 0 20px; }
        .wl-feature { padding: 14px; background: rgba(255,255,255,0.03); border-radius: 10px; margin-bottom: 12px; }
        .wl-feature-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .wl-feature-value { font-size: 14px; font-weight: 500; color: white; }
        .wl-result { display: flex; align-items: flex-start; gap: 10px; padding: 14px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 10px; margin-bottom: 20px; font-size: 14px; color: rgba(255,255,255,0.8); }
        .wl-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .wl-tag { padding: 6px 12px; border: 1px solid; border-radius: 100px; font-size: 12px; font-weight: 500; }
        .wl-cta { padding: 100px 0; background: var(--wl-dark); }
        .wl-cta-card { text-align: center; padding: 60px 40px; background: linear-gradient(135deg, rgba(6,182,212,0.1), transparent); border: 1px solid rgba(6,182,212,0.2); border-radius: 32px; }
        .wl-cta-card h2 { font-size: 36px; font-weight: 700; color: white; margin: 0 0 16px; }
        .wl-cta-card p { font-size: 18px; color: rgba(255,255,255,0.6); margin: 0 0 32px; }
        .wl-cta-btns { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .wl-btn { padding: 16px 32px; border-radius: 100px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
        .wl-btn--pri { background: linear-gradient(135deg, #06B6D4, #8B5CF6); color: white; }
        .wl-btn--pri:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(6,182,212,0.3); }
        .wl-btn--sec { background: var(--wl-glass); border: 1px solid var(--wl-border); color: white; }
        .wl-btn--sec:hover { border-color: #06B6D4; }
        .wl-nav { padding: 60px 0; border-top: 1px solid var(--wl-border); }
        .wl-nav-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .wl-nav-item { padding: 24px; background: var(--wl-glass); border: 1px solid var(--wl-border); border-radius: 16px; text-decoration: none; transition: all 0.3s; }
        .wl-nav-item:hover { border-color: #06B6D4; }
        .wl-nav-item--next { text-align: right; }
        .wl-nav-label { display: block; font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
        .wl-nav-title { font-size: 16px; font-weight: 600; color: white; }
        @media (max-width: 640px) { .wl-hero { min-height: auto; padding: 100px 0 60px; } .wl-title { font-size: 32px; } .wl-tabs { justify-content: flex-start; overflow-x: auto; } .wl-case-info { padding: 24px; } .wl-nav-grid { grid-template-columns: 1fr; } .wl-nav-item--next { text-align: left; } }
      `}</style>
    </div>
  )
}