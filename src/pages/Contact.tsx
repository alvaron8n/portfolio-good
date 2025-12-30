import { motion } from 'framer-motion'
import { useState } from 'react'
import { Container } from '../components/Container'
import { content } from '../content/content'

// ============================================
// CONTACT METHOD CARD
// ============================================
function ContactCard({ 
  type, 
  label, 
  href, 
  value,
  description,
  isPrimary,
  index 
}: { 
  type: string
  label: string
  href: string
  value: string
  description: string
  isPrimary: boolean
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const config: Record<string, { color: string; icon: JSX.Element }> = {
    calendar: {
      color: '#8B5CF6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      )
    },
    whatsapp: {
      color: '#10B981',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
    email: {
      color: '#06B6D4',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6L12 13L2 6" />
        </svg>
      )
    }
  }

  const { color, icon } = config[type] || config.email

  return (
    <motion.a
      href={href}
      target={type !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="contact-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--card-color': color,
        '--card-color-10': `${color}1A`,
        '--card-color-20': `${color}33`,
      } as React.CSSProperties}
    >
      {/* Primary badge */}
      {isPrimary && (
        <span className="contact-card-badge">
          Recomendado
        </span>
      )}

      {/* Icon */}
      <motion.div 
        className="contact-card-icon"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div className="contact-card-content">
        <h3 className="contact-card-title">{label}</h3>
        <p className="contact-card-value">{value}</p>
        <p className="contact-card-desc">{description}</p>
      </div>

      {/* Arrow */}
      <motion.div 
        className="contact-card-arrow"
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.a>
  )
}

// ============================================
// MAIN CONTACT PAGE
// ============================================
export function Contact() {
  const methods = [
    {
      type: 'calendar',
      label: 'Reservar llamada',
      href: content.site.calendarUrl,
      value: '15 min · Google Meet',
      description: 'Elige el horario que mejor te venga',
      primary: true,
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      href: content.site.whatsappUrl,
      value: content.site.phone,
      description: 'Respuesta en menos de 2h',
      primary: false,
    },
    {
      type: 'email',
      label: 'Email',
      href: `mailto:${content.site.email}`,
      value: content.site.email,
      description: 'Para propuestas detalladas',
      primary: false,
    },
  ]

  return (
    <main className="contact-page">
      {/* Background */}
      <div className="contact-bg">
        <div className="contact-bg-grad1" />
        <div className="contact-bg-grad2" />
      </div>

      <Container className="contact-container">
        {/* Header */}
        <motion.header 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="contact-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Contacto
          </motion.span>
          
          <h1 className="contact-title">
            {content.contact.hero.title}
          </h1>
          
          <p className="contact-subtitle">
            {content.contact.hero.subtitle}
          </p>
        </motion.header>

        {/* Methods Grid */}
        <div className="contact-grid">
          {methods.map((method, i) => (
            <ContactCard
              key={method.type}
              type={method.type}
              label={method.label}
              href={method.href}
              value={method.value}
              description={method.description}
              isPrimary={method.primary}
              index={i}
            />
          ))}
        </div>

        {/* Info row */}
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="contact-info-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span>{content.site.location}</span>
          </div>
          
          <div className="contact-info-item contact-info-available">
            <span className="contact-info-dot" />
            <span>Disponible para proyectos</span>
          </div>
          
          <div className="contact-info-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Respuesta &lt; 24h</span>
          </div>
        </motion.div>

        {/* Accent text */}
        <motion.p 
          className="contact-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          sin compromiso
        </motion.p>
      </Container>
    </main>
  )
}
