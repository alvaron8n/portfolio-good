import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { Container } from '../components/Container'
import { content } from '../content/content'

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
      delay: 0.3 + i * 0.1
    }
  })
}

// ============================================
// CONTACT METHOD CARD - PREMIUM VERSION
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
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const config: Record<string, { color: string; icon: ReactNode }> = {
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

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.a
      href={href}
      target={type !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="cnt-card group relative flex flex-col items-center text-center h-full"
      custom={index}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Border glow on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${color}40,
              transparent 40%
            )
          `
        }}
      />

      {/* Main card body */}
      <div className="relative w-full h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden p-6 lg:p-8 flex flex-col items-center gap-5 transition-all duration-300 group-hover:bg-white/[0.04] group-hover:border-white/[0.12]">
        
        {/* Inner spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                ${color}10,
                transparent 50%
              )
            `
          }}
        />

        {/* Primary badge - Glassmorphism */}
        {isPrimary && (
          <motion.span 
            className="cnt-badge absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider backdrop-blur-md"
            style={{
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              color: '#fb923c',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.2)'
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 4px 25px rgba(249, 115, 22, 0.4)' 
                : '0 4px 15px rgba(249, 115, 22, 0.2)'
            }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Recomendado
            </span>
          </motion.span>
        )}

        {/* Icon with glow */}
        <motion.div 
          className="cnt-icon relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}20`,
            color: color
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 0 30px ${color}30, 0 0 60px ${color}15`
              : `0 0 0px ${color}00`
          }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="cnt-content relative z-10 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
            {label}
          </h3>
          <p className="text-sm text-white/50 mb-1 group-hover:text-white/70 transition-colors">
            {value}
          </p>
          <p className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <motion.div 
          className="cnt-arrow absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color }}
          animate={{ x: isHovered ? 0 : -8 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent group-hover:border-white/20 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-white/20 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-transparent group-hover:border-white/20 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-transparent group-hover:border-white/20 transition-colors duration-300" />
      </div>
    </motion.a>
  )
}

// ============================================
// INFO CHIP COMPONENT
// ============================================
function InfoChip({ 
  icon, 
  text, 
  highlight = false 
}: { 
  icon: ReactNode
  text: string
  highlight?: boolean 
}) {
  return (
    <motion.div 
      className={`cnt-chip flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
        highlight 
          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
          : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white/70 hover:border-white/10'
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <span className={highlight ? 'text-emerald-400' : 'text-white/30'}>
        {icon}
      </span>
      <span>{text}</span>
    </motion.div>
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
    <main className="cnt-page relative min-h-dvh flex items-center justify-center py-24 overflow-hidden" style={{ background: '#050508' }}>
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 w-full max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.header 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block font-mono text-xs text-orange-500 uppercase tracking-[0.2em] mb-4"
              variants={itemVariants}
            >
              Contacto
            </motion.span>
            
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
              variants={itemVariants}
            >
              {content.contact.hero.title}
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-white/45 max-w-md mx-auto"
              variants={itemVariants}
            >
              {content.contact.hero.subtitle}
            </motion.p>
          </motion.header>

          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12"
            variants={itemVariants}
          >
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
          </motion.div>

          {/* Info chips row */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 py-6 border-t border-b border-white/[0.06]"
            variants={itemVariants}
          >
            <InfoChip
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              }
              text={content.site.location}
            />
            
            <InfoChip
              icon={
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              }
              text="Disponible para proyectos"
              highlight
            />
            
            <InfoChip
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              text="Respuesta < 24h"
            />
          </motion.div>

          {/* Accent text */}
          <motion.p 
            className="text-center mt-10 font-display text-2xl md:text-3xl tracking-tight"
            style={{
              fontFamily: "'BBH Bartle', sans-serif",
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.6
            }}
            variants={itemVariants}
          >
            sin compromiso
          </motion.p>
        </motion.div>
      </Container>
    </main>
  )
}
