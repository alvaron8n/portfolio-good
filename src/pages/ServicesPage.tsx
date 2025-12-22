import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'

// Service detail card with full information
function ServiceDetailCard({ 
  service, 
  index 
}: { 
  service: typeof content.services.items[0]
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 300, damping: 30 })
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }

  const colors = [
    { accent: '#8B5CF6', light: '#A78BFA' },
    { accent: '#06B6D4', light: '#22D3EE' },
    { accent: '#10B981', light: '#34D399' },
    { accent: '#F59E0B', light: '#FBBF24' },
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={cardRef}
      className="afp-service-detail"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className="afp-service-detail-glow"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${color.accent}20 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Number */}
      <div className="afp-service-number" style={{ color: color.accent }}>
        {service.number}
      </div>

      {/* Content */}
      <div className="afp-service-detail-content">
        <h2 className="afp-service-detail-title">{service.title}</h2>
        <p className="afp-service-detail-tagline" style={{ color: color.light }}>
          {service.tagline}
        </p>
        <p className="afp-service-detail-desc">{service.description}</p>

        {/* Benefits */}
        <div className="afp-service-benefits">
          <h4>Beneficios:</h4>
          <ul>
            {service.benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={color.accent} strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tools & Tags */}
        <div className="afp-service-meta">
          <div className="afp-service-tools">
            <h4>Herramientas:</h4>
            <div className="afp-tools-list">
              {service.tools.map((tool) => (
                <span key={tool} className="afp-tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="afp-service-tags">
            {service.tags.map((tag) => (
              <span 
                key={tag} 
                className="afp-tag"
                style={{ borderColor: `${color.accent}40`, color: color.light }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={service.cta.href}
          className="afp-service-cta"
          style={{ color: color.light }}
          whileHover={{ x: 5 }}
        >
          {service.cta.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}

export function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="afp-services-page-hero">
        <Container>
          <motion.div
            className="afp-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="afp-hero-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Servicios
            </motion.div>

            <h1 className="afp-hero-title">
              {content.services.hero.title}
            </h1>
            <p className="afp-hero-subtitle">
              {content.services.hero.subtitle}
            </p>
          </motion.div>
        </Container>

        {/* Background elements */}
        <div className="afp-hero-bg">
          <div className="afp-hero-orb afp-hero-orb--1" />
          <div className="afp-hero-orb afp-hero-orb--2" />
          <div className="afp-hero-grid" />
        </div>
      </Section>

      {/* Services List */}
      <Section className="afp-services-list">
        <Container>
          <div className="afp-services-stack">
            {content.services.items.map((service, i) => (
              <ServiceDetailCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="afp-services-page-cta">
        <Container>
          <motion.div
            className="afp-cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{content.services.cta.title}</h2>
            <p>{content.services.cta.subtitle}</p>
            <Button href={content.services.cta.button.href} variant="gradient" size="lg">
              {content.services.cta.button.label}
            </Button>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        .afp-services-page-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 100px;
        }

        @media (min-width: 768px) {
          .afp-services-page-hero {
            padding-top: 120px;
          }
        }

        .afp-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .afp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          color: #A78BFA;
          margin-bottom: 24px;
        }

        .afp-hero-badge svg {
          width: 16px;
          height: 16px;
        }

        .afp-hero-title {
          font-size: clamp(40px, 8vw, 72px);
          font-weight: 700;
          color: white;
          margin: 0 0 24px;
          line-height: 1.1;
        }

        .afp-hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin: 0;
        }

        .afp-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .afp-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .afp-hero-orb--1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
          top: -30%;
          left: -10%;
          opacity: 0.3;
        }

        .afp-hero-orb--2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
          bottom: -20%;
          right: -10%;
          opacity: 0.2;
        }

        .afp-hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }

        .afp-services-list {
          padding: 40px 0 80px;
        }

        @media (min-width: 768px) {
          .afp-services-list {
            padding: 60px 0 120px;
          }
        }

        .afp-services-stack {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .afp-service-detail {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 40px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .afp-service-detail {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }

          .afp-service-detail-title {
            font-size: 22px;
          }

          .afp-service-detail-tagline {
            font-size: 15px;
          }

          .afp-service-detail-desc {
            font-size: 15px;
          }

          .afp-service-benefits ul {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .afp-hero-title {
            font-size: 32px;
          }

          .afp-hero-subtitle {
            font-size: 16px;
          }

          .afp-service-detail {
            padding: 18px;
          }

          .afp-service-number {
            font-size: 40px;
          }

          .afp-service-detail-title {
            font-size: 20px;
          }

          .afp-service-meta {
            flex-direction: column;
            gap: 16px;
          }

          .afp-services-page-cta {
            padding: 60px 0 80px;
          }

          .afp-cta-box {
            padding: 40px 24px;
          }
        }

        @media (max-width: 375px) {
          .afp-hero-title {
            font-size: 28px;
          }

          .afp-service-detail {
            padding: 16px;
          }

          .afp-service-number {
            font-size: 36px;
          }

          .afp-cta-box {
            padding: 32px 20px;
          }
        }

        .afp-service-detail-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .afp-service-number {
          font-size: 80px;
          font-weight: 800;
          opacity: 0.3;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .afp-service-number {
            font-size: 48px;
          }
        }

        .afp-service-detail-content {
          position: relative;
          z-index: 1;
        }

        .afp-service-detail-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 700;
          color: white;
          margin: 0 0 8px;
        }

        .afp-service-detail-tagline {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 20px;
        }

        .afp-service-detail-desc {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 24px;
        }

        .afp-service-benefits h4 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 12px;
        }

        .afp-service-benefits ul {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 8px;
        }

        .afp-service-benefits li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .afp-service-benefits svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .afp-service-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 24px;
        }

        .afp-service-tools h4 {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 10px;
        }

        .afp-tools-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .afp-tool-tag {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .afp-service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: flex-end;
        }

        .afp-tag {
          padding: 6px 14px;
          border: 1px solid;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
        }

        .afp-service-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
        }

        .afp-service-cta svg {
          width: 18px;
          height: 18px;
        }

        .afp-services-page-cta {
          padding: 60px 0 80px;
        }

        @media (min-width: 768px) {
          .afp-services-page-cta {
            padding: 80px 0 120px;
          }
        }

        .afp-cta-box {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 32px;
        }

        .afp-cta-box h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: white;
          margin: 0 0 16px;
        }

        .afp-cta-box p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 32px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  )
}

