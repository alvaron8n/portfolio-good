import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

// Project icons with unique designs
const projectVisuals = [
  // CRM/Automation visual
  () => (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Dashboard frame */}
      <rect x="20" y="20" width="160" height="110" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="20" y="20" width="160" height="24" rx="8" fill="currentColor" opacity="0.1" />

      {/* Stats cards */}
      <rect x="30" y="54" width="45" height="30" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="85" y="54" width="45" height="30" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="140" y="54" width="30" height="30" rx="4" fill="currentColor" opacity="0.15" />

      {/* Chart */}
      <path d="M30 115 L55 100 L80 108 L105 90 L130 95 L155 80 L170 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="55" cy="100" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="105" cy="90" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="155" cy="80" r="3" fill="currentColor" opacity="0.8" />

      {/* Decorative nodes */}
      <circle cx="40" cy="30" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="30" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="60" cy="30" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  // Web design visual
  () => (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Browser window */}
      <rect x="15" y="15" width="100" height="75" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="15" y="15" width="100" height="16" rx="6" fill="currentColor" opacity="0.1" />
      <circle cx="25" cy="23" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="33" cy="23" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="41" cy="23" r="2.5" fill="currentColor" opacity="0.3" />

      {/* Content blocks */}
      <rect x="22" y="38" width="40" height="6" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="22" y="50" width="86" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="22" y="58" width="70" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="22" y="66" width="50" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="22" y="78" width="25" height="8" rx="4" fill="currentColor" opacity="0.4" />

      {/* Mobile device */}
      <rect x="130" y="30" width="55" height="95" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="135" y="45" width="45" height="65" rx="2" fill="currentColor" opacity="0.08" />
      <rect x="140" y="55" width="35" height="4" rx="2" fill="currentColor" opacity="0.2" />
      <rect x="140" y="65" width="28" height="3" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="140" y="75" width="32" height="3" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="150" cy="38" width="15" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  // Branding visual
  () => (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Main logo shape */}
      <circle cx="100" cy="65" r="35" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <circle cx="100" cy="65" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="65" r="12" fill="currentColor" opacity="0.3" />

      {/* Logo variations */}
      <rect x="25" y="110" width="35" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="42" cy="122" r="6" fill="currentColor" opacity="0.2" />

      <rect x="70" y="110" width="35" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="78" y="118" width="18" height="10" rx="2" fill="currentColor" opacity="0.2" />

      <rect x="115" y="110" width="35" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M130 128 L140 118 L150 128" stroke="currentColor" strokeWidth="2" opacity="0.3" />

      {/* Color palette dots */}
      <circle cx="40" cy="30" r="8" fill="#8B5CF6" opacity="0.6" />
      <circle cx="62" cy="30" r="8" fill="#06B6D4" opacity="0.6" />
      <circle cx="138" cy="30" r="8" fill="#10B981" opacity="0.6" />
      <circle cx="160" cy="30" r="8" fill="#F59E0B" opacity="0.6" />
    </svg>
  ),
]

// Color schemes per project
const projectColors = [
  { primary: '#8B5CF6', secondary: '#6366F1', gradient: 'from-violet-500/20 to-indigo-500/20' },
  { primary: '#06B6D4', secondary: '#0891B2', gradient: 'from-cyan-500/20 to-teal-500/20' },
  { primary: '#F59E0B', secondary: '#D97706', gradient: 'from-amber-500/20 to-orange-500/20' },
]

// Project Card Component
function ProjectCard({
  project,
  index,
}: {
  project: typeof content.home.featuredProjects.items[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 400, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 400, damping: 30 })
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 400, damping: 30 })
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 400, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const colors = projectColors[index % projectColors.length]
  const Visual = projectVisuals[index % projectVisuals.length]

  return (
    <Link to={`/proyectos/${project.slug}`}>
      <motion.article
        ref={cardRef}
        className="relative h-full cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.08]"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow effect following cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${colors.primary}25 0%, transparent 50%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Border glow */}
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
              opacity: isHovered ? 0.7 : 0.2,
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{
              opacity: { duration: 0.3 },
              backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
            }}
          />

          {/* Image area */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}10 0%, transparent 50%, ${colors.secondary}10 100%)`,
              }}
            />

            {/* Project visual */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ color: colors.primary }}
              animate={{
                scale: isHovered ? 1.08 : 1,
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Visual />
            </motion.div>

            {/* Category badge */}
            <motion.span
              className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white rounded-full backdrop-blur-md border"
              style={{
                backgroundColor: `${colors.primary}20`,
                borderColor: `${colors.primary}40`,
              }}
              animate={{
                y: isHovered ? 0 : 4,
                opacity: isHovered ? 1 : 0.9,
              }}
            >
              {project.category}
            </motion.span>

            {/* View project indicator */}
            <motion.div
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border"
              style={{
                backgroundColor: `${colors.primary}20`,
                borderColor: `${colors.primary}40`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                rotate: isHovered ? 0 : -45,
              }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {project.shortDesc}
            </p>

            {/* Highlight badge */}
            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <span>{project.highlight}</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.article>
    </Link>
  )
}

export function FeaturedProjects() {
  return (
    <Section id="proyectos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan/10 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
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
          {/* Label pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Proyectos
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Proyectos{' '}
            <span className="text-gradient">destacados</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {content.home.featuredProjects.subtitle}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.home.featuredProjects.items.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
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
            to={content.home.featuredProjects.cta.href}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet/10 to-cyan/10 border border-violet/30 hover:border-violet/50 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]"
          >
            <span className="relative">
              {content.home.featuredProjects.cta.label}
            </span>
            <svg
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
