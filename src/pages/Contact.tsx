import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

// Contact method card with 3D tilt effect
function MethodCard({ method, index, isPrimary }: {
  method: typeof content.contact.methods[0]
  index: number
  isPrimary: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })
  const glowX = useSpring(useMotionValue(50), { stiffness: 300, damping: 30 })
  const glowY = useSpring(useMotionValue(50), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    glowX.set(50)
    glowY.set(50)
    setIsHovered(false)
  }

  const colors = {
    whatsapp: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', glow: '#10B981', icon: '#10B981' },
    email: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', glow: '#8B5CF6', icon: '#A78BFA' },
    linkedin: { bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)', glow: '#06B6D4', icon: '#22D3EE' },
  }

  const color = colors[method.type as keyof typeof colors] || colors.email

  return (
    <motion.a
      ref={cardRef}
      href={method.href}
      target={method.type !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="relative block"
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative p-7 rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: isPrimary ? color.bg : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isHovered ? color.border : 'rgba(255,255,255,0.08)'}`,
        }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cursor-following glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(300px circle at ${x}% ${y}%, ${color.glow}20 0%, transparent 50%)`
            ),
          }}
        />

        {/* Content */}
        <div className="relative flex items-start gap-5">
          {/* Icon with animated background */}
          <motion.div
            className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: `${color.glow}15`,
              border: `1px solid ${color.glow}30`,
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {method.type === 'whatsapp' && (
              <motion.svg
                viewBox="0 0 24 24"
                fill={color.icon}
                className="w-7 h-7"
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </motion.svg>
            )}
            {method.type === 'email' && (
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={color.icon}
                strokeWidth="2"
                className="w-7 h-7"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <motion.path
                  d="M22 6L12 13L2 6"
                  animate={{ pathLength: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.svg>
            )}
            {method.type === 'linkedin' && (
              <motion.svg
                viewBox="0 0 24 24"
                fill={color.icon}
                className="w-6 h-6"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </motion.svg>
            )}
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
              {method.label}
            </h3>
            <p className="text-sm text-white/60 mb-1 truncate">{method.value}</p>
            <p className="text-xs text-white/40">{method.description}</p>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
            style={{
              background: isHovered ? `${color.glow}20` : 'rgba(255,255,255,0.05)',
            }}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={isHovered ? color.icon : 'rgba(255,255,255,0.4)'}
              strokeWidth="2"
              className="w-5 h-5 transition-colors"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Recommendation badge for primary */}
        {isPrimary && (
          <motion.div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${color.glow}20`,
              color: color.icon,
              border: `1px solid ${color.glow}30`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Recomendado
          </motion.div>
        )}
      </motion.div>
    </motion.a>
  )
}

// FAQ item with expandable animation
function FAQItem({ item, index }: {
  item: { question: string; answer: string }
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:border-violet-500/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        className="w-full p-6 flex items-start justify-between gap-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
          {item.question}
        </h3>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-white/60 leading-relaxed">
          {item.answer}
        </p>
      </motion.div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  )
}

export function Contact() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-16" ref={heroRef}>
        <Container>
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                className="w-4 h-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </motion.svg>
              <span className="text-sm font-semibold text-emerald-400">Contacto</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {content.contact.hero.title.split(' ').slice(0, 1).join(' ')}{' '}
              <motion.span
                className="inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {content.contact.hero.title.split(' ').slice(1).join(' ')}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.contact.hero.subtitle}
            </motion.p>
          </motion.div>
        </Container>

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '-20%',
              left: '-15%',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
              filter: 'blur(80px)',
              bottom: '-10%',
              right: '-10%',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />
        </div>
      </Section>

      {/* Contact Methods */}
      <Section className="py-12 md:py-20">
        <Container>
          <motion.p
            className="text-center text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {content.contact.intro.text}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.contact.methods.map((method, i) => (
              <MethodCard
                key={method.type}
                method={method}
                index={i}
                isPrimary={method.primary || false}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Info Section */}
      <Section className="py-16 md:py-24" style={{ background: 'rgba(139, 92, 246, 0.02)' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Location */}
            <motion.div
              className="group relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
                }}
              />

              <div className="relative flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    className="w-6 h-6"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </motion.div>
                <div>
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                    {content.contact.info.location.label}
                  </span>
                  <p className="text-lg font-semibold text-white mt-1">
                    {content.contact.info.location.value}
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    {content.contact.info.location.note}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="group relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
                }}
              />

              <div className="relative flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    className="w-6 h-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </motion.svg>
                </motion.div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {content.contact.info.availability.label}
                  </span>
                  <p className="text-lg font-semibold text-emerald-400 mt-1 flex items-center gap-2">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {content.contact.info.availability.value}
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    {content.contact.info.availability.note}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 md:py-28">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {content.contact.faq.title}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.contact.faq.items.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-20 md:py-28">
        <Container>
          <motion.div
            className="relative text-center p-12 md:p-16 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl p-px"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-px rounded-3xl bg-[#0A0A0F]" />
            </motion.div>

            {/* Background glow */}
            <div
              className="absolute inset-px rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
              }}
            />

            <div className="relative">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg viewBox="0 0 24 24" fill="#10B981" className="w-8 h-8">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Empieza tu proyecto hoy
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto">
                Una conversación sin compromiso puede ser el primer paso hacia la transformación digital de tu negocio.
              </p>

              <motion.a
                href={content.contact.methods.find(m => m.type === 'whatsapp')?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escríbeme por WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
