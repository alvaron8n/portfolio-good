import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container } from '../Container'
import { Section } from '../Section'

interface ProjectCTAProps {
  title: string
  text: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function ProjectCTA({
  title,
  text,
  primaryAction,
  secondaryAction,
  className = ''
}: ProjectCTAProps) {
  return (
    <Section className={`crm-cta ${className}`}>
      <Container>
        <motion.div
          className="crm-cta-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="crm-cta-buttons">
            <Link to={primaryAction.href} className="crm-btn crm-btn--primary">
              {primaryAction.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            {secondaryAction && (
              <Link to={secondaryAction.href} className="crm-btn crm-btn--secondary">
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}