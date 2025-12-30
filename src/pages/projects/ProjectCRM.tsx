import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Section } from '../../components/Section'
import { Container } from '../../components/Container'
import { ProjectHero } from '../../components/project/ProjectHero'
import { ProjectSectionHeader } from '../../components/project/ProjectSectionHeader'
import { ProjectCTA } from '../../components/project/ProjectCTA'
import { ProjectNavigation } from '../../components/project/ProjectNavigation'
import '../../styles/projects/project-crm.css'

export function ProjectCRM() {
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
      <ProjectHero
        category="Automatización · IA · Software"
        title={<>Custom CRM &<br /><span className="crm-title-gradient">Automation</span></>}
        subtitle="Centro de comando para agencia de marketing con automatizaciones 24/7"
        tags={['Lovable', 'Supabase', 'n8n', 'Tally Forms']}
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
      </ProjectHero>

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
          <ProjectSectionHeader
            label="Lo que construí"
            title="Funcionalidades Clave"
          />

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
          <ProjectSectionHeader
            label="Automatizaciones"
            title="Flujos n8n"
            description="Dos flujos clave que transformaron la operativa diaria de la agencia."
          />

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
          <ProjectSectionHeader
            label="✦ Impacto Real"
            title="Resultados del Proyecto"
          />

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
          <ProjectSectionHeader
            label="Stack Tecnológico"
            title="Herramientas Utilizadas"
          />

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

      <ProjectCTA
        title="¿Necesitas algo similar?"
        text="Si tu negocio pierde tiempo en tareas manuales, hablemos de cómo automatizarlo."
        primaryAction={{ label: 'Hablemos', href: '/contacto' }}
        secondaryAction={{ label: 'Siguiente proyecto', href: '/proyectos/webs-locales' }}
      />

      <ProjectNavigation
        nextProject={{ title: 'Webs para Negocios Locales', href: '/proyectos/webs-locales' }}
      />

    </div>
  )
}