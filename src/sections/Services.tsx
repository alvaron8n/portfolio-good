import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

// Icon components with animation paths
const ServiceIcons = {
  workflow: ({ isHovered }: { isHovered: boolean }) => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <motion.circle
        cx="12" cy="12" r="4"
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle
        cx="36" cy="12" r="4"
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.circle
        cx="12" cy="36" r="4"
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.circle
        cx="36" cy="36" r="4"
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.path
        d="M16 12h16M12 16v16M36 16v16M16 36h16"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.circle
        cx="24" cy="24" r="6"
        fill="currentColor" fillOpacity="0.2"
        stroke="currentColor" strokeWidth="2"
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
      />
    </svg>
  ),
  cpu: ({ isHovered }: { isHovered: boolean }) => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <motion.rect
        x="12" y="12" width="24" height="24" rx="4"
        stroke="currentColor" strokeWidth="2"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 2, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
        style={{ transformOrigin: '24px 24px' }}
      />
      <motion.rect
        x="18" y="18" width="12" height="12" rx="2"
        fill="currentColor" fillOpacity="0.2"
        stroke="currentColor" strokeWidth="2"
        animate={{ scale: isHovered ? [1, 0.9, 1] : 1 }}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
      />
      <motion.path
        d="M18 8v4M24 8v4M30 8v4M18 36v4M24 36v4M30 36v4M8 18h4M8 24h4M8 30h4M36 18h4M36 24h4M36 30h4"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 1 }}
        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  ),
  layout: ({ isHovered }: { isHovered: boolean }) => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <motion.rect
        x="6" y="10" width="36" height="28" rx="4"
        stroke="currentColor" strokeWidth="2"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M6 18h36"
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="10" y="22" width="16" height="12" rx="2"
        fill="currentColor" fillOpacity="0.2"
        stroke="currentColor" strokeWidth="2"
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.g animate={{ x: isHovered ? -2 : 0 }} transition={{ duration: 0.3 }}>
        <path d="M30 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <circle cx="10" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      <circle cx="20" cy="14" r="1.5" fill="currentColor" />
    </svg>
  ),
  palette: ({ isHovered }: { isHovered: boolean }) => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <motion.path
        d="M24 6C13.507 6 5 14.507 5 25s8.507 19 19 19c2.21 0 4-1.79 4-4 0-1.04-.39-1.99-1.03-2.71-.62-.7-.97-1.63-.97-2.62 0-2.21 1.79-4 4-4h4.71c5.79 0 10.29-4.5 10.29-10.29C43 14.507 35.493 6 24 6z"
        stroke="currentColor" strokeWidth="2"
        animate={{ rotate: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '24px 24px' }}
      />
      <motion.circle
        cx="14" cy="22" r="3" fill="#8B5CF6"
        animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4, delay: 0 }}
      />
      <motion.circle
        cx="20" cy="14" r="3" fill="#22D3EE"
        animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.circle
        cx="30" cy="14" r="3" fill="#10B981"
        animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.circle
        cx="36" cy="22" r="3" fill="#F59E0B"
        animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </svg>
  ),
}

// Card color schemes
const cardColors = [
  { primary: '#8B5CF6', secondary: '#6366F1', name: 'violet' },
  { primary: '#06B6D4', secondary: '#0891B2', name: 'cyan' },
  { primary: '#10B981', secondary: '#059669', name: 'emerald' },
  { primary: '#F59E0B', secondary: '#D97706', name: 'amber' },
]

// Service Card Component with expand effect
function ServiceCard({
  service,
  index,
  isExpanded,
  onHover,
}: {
  service: typeof content.home.servicesPreview.items[0]
  index: number
  isExpanded: boolean
  onHover: (index: number | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(index)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    onHover(null)
  }

  const colors = cardColors[index % cardColors.length]
  const IconComponent = ServiceIcons[service.icon as keyof typeof ServiceIcons] || ServiceIcons.workflow

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isExpanded ? 1.02 : isHovered ? 1.02 : 1,
          opacity: !isExpanded && index !== null ? (isHovered ? 1 : 0.7) : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${colors.primary}30 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl" />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
            backgroundSize: '200% 200%',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{
            opacity: { duration: 0.3 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col min-h-[320px]">
          {/* Header: Icon + Number */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16"
              style={{ color: colors.primary }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent isHovered={isHovered} />
            </motion.div>

            <motion.span
              className="text-3xl md:text-4xl font-bold opacity-20"
              style={{ color: colors.primary }}
              animate={{ opacity: isHovered ? 0.4 : 0.15 }}
            >
              0{index + 1}
            </motion.span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-white/60 leading-relaxed flex-1">
            {service.shortDesc}
          </p>

          {/* Expanded content - appears on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/10">
                  <Link
                    to="/servicios"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: colors.primary }}
                  >
                    Ver más detalles
                    <motion.svg
                      width="16" height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <svg
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Section id="servicios" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <Container>
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-10 h-0.5 bg-gradient-to-r from-transparent via-violet to-transparent rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet">
              Servicios
            </span>
            <span className="w-10 h-0.5 bg-gradient-to-r from-transparent via-violet to-transparent rounded-full" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {content.home.servicesPreview.title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {content.home.servicesPreview.subtitle}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {content.home.servicesPreview.items.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              isExpanded={hoveredIndex === i}
              onHover={setHoveredIndex}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to={content.home.servicesPreview.cta.href}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet/10 to-cyan/10 border border-violet/30 hover:border-violet/50 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          >
            {content.home.servicesPreview.cta.label}
            <motion.svg
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
