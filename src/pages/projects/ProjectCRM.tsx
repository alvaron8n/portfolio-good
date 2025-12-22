import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'

export function ProjectCRM() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
      if (!hasStarted) return
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [hasStarted, end, duration])

    return { count, start: () => setHasStarted(true) }
  }

  const stat1 = useCounter(85)
  const stat2 = useCounter(100)
  const stat3 = useCounter(24)

  const workflows = [
    {
      number: '01',
      title: 'Generación de Facturas',
      type: 'n8n Automation',
      steps: [
        { icon: '⚡', text: 'Trigger: Clic en "Generar Factura" desde el CRM' },
        { icon: '⚙️', text: 'Proceso: n8n genera PDF estructurado con datos del cliente' },
        { icon: '💾', text: 'Storage: Guarda en Supabase + actualiza estado en CRM' },
        { icon: '📧', text: 'Notificación: Email automático al cliente con factura adjunta' },
      ],
    },
    {
      number: '02',
      title: 'Registro de Comerciales',
      type: 'Forms Sync',
      steps: [
        { icon: '📝', text: 'Input: Comercial rellena formulario Tally con venta extra' },
        { icon: '🔗', text: 'Webhook: n8n recibe datos y valida información' },
        { icon: '📊', text: 'Update: Crea nuevo deal en CRM vinculado al cliente' },
        { icon: '💰', text: 'Cálculo: Sistema calcula comisión y actualiza totales' },
      ],
    },
  ]

  const techStack = [
    { name: 'Lovable.dev', color: '#EC4899' },
    { name: 'Supabase', color: '#3ECF8E' },
    { name: 'n8n', color: '#EA4B71' },
    { name: 'Tally Forms', color: '#8B5CF6' },
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
  ]

  return (
    <div className="crm-project-page">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="crm-hero"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="crm-hero-bg">
          <div className="crm-grid-overlay" />
          <div className="crm-glow crm-glow--1" />
          <div className="crm-glow crm-glow--2" />
          <div className="crm-glow crm-glow--3" />
          
          {/* Floating nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="crm-node"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${15 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Connection lines */}
          <svg className="crm-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M10,20 Q30,10 50,25 T90,20"
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M10,50 Q40,40 60,55 T90,45"
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.path
              d="M10,80 Q35,70 55,85 T90,75"
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.1 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Container>
          <div className="crm-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/proyectos" className="crm-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a proyectos
              </Link>
            </motion.div>

            <motion.span 
              className="crm-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Automatización · IA · Software
            </motion.span>

            <motion.h1 
              className="crm-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Custom CRM &<br />
              <span className="crm-title-gradient">Automation</span>
            </motion.h1>

            <motion.p 
              className="crm-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Centro de comando para agencia de marketing con automatizaciones 24/7
            </motion.p>

            <motion.div 
              className="crm-tags"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {['Lovable', 'Supabase', 'n8n', 'Tally Forms'].map((tag, i) => (
                <span key={tag} className="crm-tag">{tag}</span>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div 
          className="crm-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll</span>
          <motion.div 
            className="crm-scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.section>

      {/* Dashboard Mockup Section */}
      <Section className="crm-mockup-section">
        <Container>
          <motion.div
            className="crm-mockup-wrapper"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="crm-mockup-frame">
              <div className="crm-mockup-header">
                <div className="crm-mockup-dots">
                  <span /><span /><span />
                </div>
                <span className="crm-mockup-url">crm.agencia.es — Agency Master CRM</span>
              </div>
              <div className="crm-mockup-content">
                {/* Simulated dashboard */}
                <div className="crm-dashboard">
                  <div className="crm-dashboard-sidebar">
                    <div className="crm-sidebar-item active" />
                    <div className="crm-sidebar-item" />
                    <div className="crm-sidebar-item" />
                    <div className="crm-sidebar-item" />
                  </div>
                  <div className="crm-dashboard-main">
                    <div className="crm-dashboard-cards">
                      <div className="crm-dash-card" />
                      <div className="crm-dash-card" />
                      <div className="crm-dash-card" />
                    </div>
                    <div className="crm-dashboard-table">
                      <div className="crm-table-row" />
                      <div className="crm-table-row" />
                      <div className="crm-table-row" />
                      <div className="crm-table-row" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="crm-mockup-badge"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="crm-badge-icon">⚡</span>
              En Producción
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Problem / Solution Section */}
      <Section className="crm-overview">
        <Container>
          <div className="crm-overview-grid">
            <motion.div
              className="crm-overview-card crm-overview-problem"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="crm-overview-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <h3>El Problema</h3>
              <p>
                La agencia gestionaba clientes en Excel, facturas manuales en Word, y los 
                comerciales comunicaban ventas por WhatsApp. <strong>Horas perdidas en 
                tareas que no generaban valor</strong>, errores frecuentes y cero visibilidad 
                del estado real del negocio.
              </p>
            </motion.div>

            <motion.div
              className="crm-overview-card crm-overview-solution"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="crm-overview-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <h3>La Solución</h3>
              <p>
                Un CRM construido con <strong>Lovable + Supabase</strong> que centraliza 
                toda la información, y automatizaciones <strong>n8n</strong> que eliminan 
                las tareas repetitivas por completo. Todo en un solo lugar, funcionando 
                sin intervención humana.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="crm-features">
        <Container>
          <motion.div
            className="crm-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="crm-section-label">Lo que construí</span>
            <h2>Funcionalidades Clave</h2>
          </motion.div>

          <div className="crm-features-grid">
            {[
              {
                icon: '📊',
                title: 'CRM Personalizado',
                desc: 'Gestión completa de clientes, proyectos activos, servicios contratados y facturación integrada. Diseñado exactamente para el flujo de trabajo de la agencia.',
              },
              {
                icon: '🧾',
                title: 'Facturación Automática',
                desc: 'Un clic genera PDF estructurado con los datos del cliente, lo guarda en Supabase y envía email automáticamente. De 30 minutos a 10 segundos.',
              },
              {
                icon: '🔄',
                title: 'Sync Formularios → CRM',
                desc: 'Los comerciales registran ventas extra en Tally y el sistema actualiza deals en tiempo real, calcula comisiones y notifica al equipo.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="crm-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className="crm-feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Workflows Section */}
      <Section className="crm-workflows">
        <Container>
          <motion.div
            className="crm-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="crm-section-label">Automatizaciones</span>
            <h2>Flujos n8n</h2>
            <p className="crm-section-desc">
              Dos flujos clave que transformaron la operativa diaria de la agencia.
            </p>
          </motion.div>

          <div className="crm-workflows-grid">
            {workflows.map((workflow, wIndex) => (
              <motion.div
                key={workflow.number}
                className="crm-workflow-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: wIndex * 0.2 }}
              >
                <div className="crm-workflow-header">
                  <span className="crm-workflow-number">{workflow.number}</span>
                  <div>
                    <h3>{workflow.title}</h3>
                    <span className="crm-workflow-type">{workflow.type}</span>
                  </div>
                </div>
                
                <div className="crm-workflow-steps">
                  {workflow.steps.map((step, sIndex) => (
                    <motion.div
                      key={sIndex}
                      className="crm-workflow-step"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + sIndex * 0.1 }}
                    >
                      <span className="crm-step-icon">{step.icon}</span>
                      <span className="crm-step-text">{step.text}</span>
                      {sIndex < workflow.steps.length - 1 && (
                        <div className="crm-step-connector" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results Section */}
      <Section className="crm-results">
        <Container>
          <motion.div
            className="crm-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="crm-section-label">✦ Impacto Real</span>
            <h2>Resultados del Proyecto</h2>
          </motion.div>

          <motion.div 
            className="crm-stats-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            onViewportEnter={() => {
              stat1.start()
              stat2.start()
              stat3.start()
            }}
          >
            {[
              { value: stat1.count, suffix: '%', label: 'Reducción en tiempo de facturación', color: '#8B5CF6' },
              { value: stat2.count, suffix: '%', label: 'Datos centralizados en un solo lugar', color: '#06B6D4' },
              { value: stat3.count, suffix: '/7', label: 'Automatizaciones funcionando', color: '#10B981' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="crm-stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="crm-stat-value" style={{ color: stat.color }}>
                  {stat.value}<span className="crm-stat-suffix">{stat.suffix}</span>
                </span>
                <span className="crm-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="crm-zero-errors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="crm-zero-value">0</span>
            <span className="crm-zero-label">Errores humanos en facturas</span>
          </motion.div>
        </Container>
      </Section>

      {/* Tech Stack Section */}
      <Section className="crm-tech">
        <Container>
          <motion.div
            className="crm-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="crm-section-label">Stack Tecnológico</span>
            <h2>Herramientas Utilizadas</h2>
          </motion.div>

          <motion.div 
            className="crm-tech-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="crm-tech-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{ '--tech-color': tech.color } as React.CSSProperties}
              >
                <span className="crm-tech-dot" />
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="crm-cta">
        <Container>
          <motion.div
            className="crm-cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>¿Necesitas algo similar?</h2>
            <p>
              Si tu negocio pierde tiempo en tareas manuales, hablemos de cómo automatizarlo.
            </p>
            <div className="crm-cta-buttons">
              <Link to="/contacto" className="crm-btn crm-btn--primary">
                Hablemos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/proyectos/webs-locales" className="crm-btn crm-btn--secondary">
                Siguiente proyecto
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Navigation between projects */}
      <Section className="crm-nav-projects">
        <Container>
          <div className="crm-nav-grid">
            <Link to="/proyectos" className="crm-nav-item crm-nav-item--prev">
              <span className="crm-nav-label">← Volver</span>
              <span className="crm-nav-title">Todos los proyectos</span>
            </Link>
            <Link to="/proyectos/webs-locales" className="crm-nav-item crm-nav-item--next">
              <span className="crm-nav-label">Siguiente →</span>
              <span className="crm-nav-title">Webs para Negocios Locales</span>
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        .crm-project-page {
          --crm-violet: #8B5CF6;
          --crm-violet-light: #A78BFA;
          --crm-cyan: #06B6D4;
          --crm-cyan-light: #22D3EE;
          --crm-green: #10B981;
          --crm-pink: #EC4899;
          --crm-dark: #0A0A0F;
          --crm-dark-lighter: #12121A;
          --crm-glass: rgba(255, 255, 255, 0.03);
          --crm-glass-border: rgba(255, 255, 255, 0.08);
        }

        /* Hero */
        .crm-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
        }

        .crm-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, var(--crm-dark) 0%, var(--crm-dark-lighter) 100%);
        }

        .crm-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        }

        .crm-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .crm-glow--1 {
          width: 600px;
          height: 600px;
          background: var(--crm-violet);
          top: -20%;
          right: -10%;
          opacity: 0.15;
        }

        .crm-glow--2 {
          width: 400px;
          height: 400px;
          background: var(--crm-cyan);
          bottom: -10%;
          left: -5%;
          opacity: 0.1;
        }

        .crm-glow--3 {
          width: 300px;
          height: 300px;
          background: var(--crm-green);
          top: 30%;
          left: 20%;
          opacity: 0.08;
        }

        .crm-node {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--crm-cyan);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--crm-cyan);
        }

        .crm-connections {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
        }

        .crm-hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }

        .crm-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.2s;
        }

        .crm-back-link:hover {
          color: white;
        }

        .crm-back-link svg {
          width: 18px;
          height: 18px;
        }

        .crm-category {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--crm-cyan-light);
          margin-bottom: 16px;
        }

        .crm-title {
          font-size: clamp(40px, 8vw, 80px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .crm-title-gradient {
          background: linear-gradient(135deg, var(--crm-cyan) 0%, var(--crm-violet) 50%, var(--crm-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .crm-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin: 0 0 32px;
          max-width: 500px;
        }

        .crm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .crm-tag {
          padding: 8px 16px;
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .crm-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .crm-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--crm-violet), transparent);
          transform-origin: top;
        }

        /* Mockup Section */
        .crm-mockup-section {
          padding: 80px 0;
          background: var(--crm-dark-lighter);
        }

        .crm-mockup-wrapper {
          position: relative;
        }

        .crm-mockup-frame {
          background: #1a1a24;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }

        .crm-mockup-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .crm-mockup-dots {
          display: flex;
          gap: 6px;
        }

        .crm-mockup-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }

        .crm-mockup-dots span:first-child { background: #FF5F57; }
        .crm-mockup-dots span:nth-child(2) { background: #FFBD2E; }
        .crm-mockup-dots span:last-child { background: #28CA41; }

        .crm-mockup-url {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
        }

        .crm-mockup-content {
          padding: 24px;
          min-height: 400px;
        }

        .crm-dashboard {
          display: flex;
          gap: 20px;
          height: 350px;
        }

        .crm-dashboard-sidebar {
          width: 60px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .crm-sidebar-item {
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .crm-sidebar-item.active {
          background: linear-gradient(135deg, var(--crm-violet), var(--crm-cyan));
        }

        .crm-dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .crm-dashboard-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .crm-dash-card {
          height: 80px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
        }

        .crm-dashboard-table {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .crm-table-row {
          height: 40px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .crm-mockup-badge {
          position: absolute;
          top: -20px;
          right: -20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          color: var(--crm-green);
          backdrop-filter: blur(10px);
        }

        .crm-badge-icon {
          font-size: 16px;
        }

        /* Overview Section */
        .crm-overview {
          padding: 100px 0;
        }

        .crm-overview-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .crm-overview-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        .crm-overview-card {
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--crm-glass-border);
        }

        .crm-overview-problem {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 50%);
        }

        .crm-overview-solution {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
        }

        .crm-overview-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .crm-overview-problem .crm-overview-icon {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }

        .crm-overview-solution .crm-overview-icon {
          background: rgba(16, 185, 129, 0.1);
          color: var(--crm-green);
        }

        .crm-overview-icon svg {
          width: 24px;
          height: 24px;
        }

        .crm-overview-card h3 {
          font-size: 24px;
          font-weight: 600;
          color: white;
          margin: 0 0 16px;
        }

        .crm-overview-card p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .crm-overview-card strong {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Section headers */
        .crm-section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .crm-section-label {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--crm-violet-light);
          margin-bottom: 16px;
        }

        .crm-section-header h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .crm-section-desc {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 16px 0 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Features */
        .crm-features {
          padding: 100px 0;
          background: var(--crm-dark-lighter);
        }

        .crm-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .crm-features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .crm-feature-card {
          padding: 32px;
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .crm-feature-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.05);
        }

        .crm-feature-icon {
          font-size: 32px;
          display: block;
          margin-bottom: 20px;
        }

        .crm-feature-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: white;
          margin: 0 0 12px;
        }

        .crm-feature-card p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        /* Workflows */
        .crm-workflows {
          padding: 100px 0;
        }

        .crm-workflows-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .crm-workflows-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .crm-workflow-card {
          padding: 32px;
          background: linear-gradient(135deg, var(--crm-glass) 0%, rgba(139, 92, 246, 0.03) 100%);
          border: 1px solid var(--crm-glass-border);
          border-radius: 24px;
        }

        .crm-workflow-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 32px;
        }

        .crm-workflow-number {
          font-size: 14px;
          font-weight: 700;
          color: var(--crm-cyan);
          padding: 8px 14px;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 8px;
        }

        .crm-workflow-header h3 {
          font-size: 22px;
          font-weight: 600;
          color: white;
          margin: 0 0 4px;
        }

        .crm-workflow-type {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }

        .crm-workflow-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .crm-workflow-step {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 0;
        }

        .crm-step-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .crm-step-text {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .crm-step-connector {
          position: absolute;
          left: 9px;
          top: 44px;
          width: 2px;
          height: calc(100% - 28px);
          background: linear-gradient(to bottom, var(--crm-violet) 0%, transparent 100%);
          opacity: 0.3;
        }

        /* Results */
        .crm-results {
          padding: 100px 0;
          background: var(--crm-dark-lighter);
        }

        .crm-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (min-width: 768px) {
          .crm-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .crm-stat-card {
          padding: 40px 32px;
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          border-radius: 20px;
          text-align: center;
        }

        .crm-stat-value {
          font-size: clamp(48px, 8vw, 64px);
          font-weight: 700;
          line-height: 1;
          display: block;
        }

        .crm-stat-suffix {
          font-size: 0.5em;
        }

        .crm-stat-label {
          display: block;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 12px;
        }

        .crm-zero-errors {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 16px;
        }

        .crm-zero-value {
          font-size: 48px;
          font-weight: 700;
          color: var(--crm-green);
        }

        .crm-zero-label {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Tech Stack */
        .crm-tech {
          padding: 100px 0;
        }

        .crm-tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .crm-tech-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .crm-tech-item:hover {
          border-color: var(--tech-color);
          box-shadow: 0 0 20px color-mix(in srgb, var(--tech-color) 20%, transparent);
        }

        .crm-tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--tech-color);
        }

        /* CTA */
        .crm-cta {
          padding: 100px 0;
          background: var(--crm-dark-lighter);
        }

        .crm-cta-card {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 32px;
        }

        .crm-cta-card h2 {
          font-size: clamp(28px, 5vw, 40px);
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .crm-cta-card p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 32px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .crm-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .crm-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .crm-btn svg {
          width: 18px;
          height: 18px;
        }

        .crm-btn--primary {
          background: linear-gradient(135deg, var(--crm-violet) 0%, var(--crm-pink) 100%);
          color: white;
        }

        .crm-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        }

        .crm-btn--secondary {
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          color: rgba(255, 255, 255, 0.8);
        }

        .crm-btn--secondary:hover {
          border-color: var(--crm-violet);
          color: white;
        }

        /* Navigation */
        .crm-nav-projects {
          padding: 60px 0;
          border-top: 1px solid var(--crm-glass-border);
        }

        .crm-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .crm-nav-item {
          padding: 24px;
          background: var(--crm-glass);
          border: 1px solid var(--crm-glass-border);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .crm-nav-item:hover {
          border-color: var(--crm-violet);
          background: rgba(139, 92, 246, 0.05);
        }

        .crm-nav-item--next {
          text-align: right;
        }

        .crm-nav-label {
          display: block;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .crm-nav-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .crm-hero {
            padding: 100px 0 60px;
            min-height: auto;
          }

          .crm-title {
            font-size: 36px;
          }

          .crm-subtitle {
            font-size: 16px;
          }

          .crm-mockup-content {
            padding: 16px;
            min-height: 250px;
          }

          .crm-dashboard {
            height: 200px;
          }

          .crm-dashboard-cards {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .crm-dash-card {
            height: 40px;
          }

          .crm-overview-card {
            padding: 24px;
          }

          .crm-workflow-card {
            padding: 24px;
          }

          .crm-cta-card {
            padding: 40px 24px;
          }

          .crm-nav-grid {
            grid-template-columns: 1fr;
          }

          .crm-nav-item--next {
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}