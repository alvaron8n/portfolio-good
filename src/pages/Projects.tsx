import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { VeilSectionHeader } from '../components/ui/VeilSectionHeader'

type ProjectItem = (typeof content.projects.items)[number]

// Project card with 3D tilt and glow effects
function ProjectCard({ project, index, colors }: {
  project: ProjectItem
  index: number
  colors: { accent: string; light: string }
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  // Glow position
  const glowX = useSpring(useMotionValue(50), { stiffness: 300, damping: 30 })
  const glowY = useSpring(useMotionValue(50), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Category-specific visuals
  const CategoryVisual = useMemo(() => {
    const category = project.category
    if (category === 'automatizacion') {
      return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <motion.rect
            x="10" y="15" width="45" height="30" rx="4"
            stroke={colors.accent}
            strokeWidth="1.5"
            fill={`${colors.accent}10`}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          />
          <motion.rect
            x="65" y="15" width="45" height="30" rx="4"
            stroke={colors.accent}
            strokeWidth="1.5"
            fill={`${colors.accent}10`}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          />
          <motion.path
            d="M55 30 L65 30"
            stroke={colors.accent}
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ pathLength: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx="60" cy="30" r="4"
            fill={colors.accent}
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          />
          <motion.path
            d="M32 55 L60 55 L88 55"
            stroke={colors.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: isHovered ? [0, -16] : 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.rect
            x="50" y="48" width="20" height="14" rx="3"
            stroke={colors.accent}
            strokeWidth="1.5"
            fill={`${colors.accent}20`}
          />
        </svg>
      )
    } else if (category === 'web') {
      return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <motion.rect
            x="15" y="10" width="90" height="55" rx="6"
            stroke={colors.accent}
            strokeWidth="1.5"
            fill={`${colors.accent}08`}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          />
          <path d="M15 22 L105 22" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
          <circle cx="22" cy="16" r="2" fill={colors.accent} opacity="0.6" />
          <circle cx="29" cy="16" r="2" fill={colors.accent} opacity="0.6" />
          <circle cx="36" cy="16" r="2" fill={colors.accent} opacity="0.6" />
          <motion.rect
            x="22" y="28" width="30" height="4" rx="2"
            fill={colors.accent}
            animate={{ width: isHovered ? 40 : 30 }}
            transition={{ duration: 0.3 }}
          />
          <rect x="22" y="36" width="76" height="3" rx="1.5" fill={colors.accent} opacity="0.3" />
          <rect x="22" y="42" width="60" height="3" rx="1.5" fill={colors.accent} opacity="0.3" />
          <motion.rect
            x="22" y="52" width="24" height="8" rx="4"
            fill={colors.accent}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          />
        </svg>
      )
    } else if (category === 'branding') {
      return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <motion.circle
            cx="60" cy="40" r="28"
            stroke={colors.accent}
            strokeWidth="2"
            fill="none"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '60px 40px' }}
          />
          <motion.path
            d="M60 18 L60 62"
            stroke={colors.accent}
            strokeWidth="1.5"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          />
          <motion.path
            d="M38 40 L82 40"
            stroke={colors.accent}
            strokeWidth="1.5"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          />
          <motion.circle
            cx="60" cy="40" r="12"
            fill={`${colors.accent}30`}
            stroke={colors.accent}
            strokeWidth="1.5"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.text
            x="60" y="44"
            fill={colors.accent}
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            A
          </motion.text>
        </svg>
      )
    } else {
      // ecommerce
      return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
          <motion.path
            d="M25 25 L35 25 L45 55 L95 55 L100 35 L40 35"
            stroke={colors.accent}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ pathLength: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx="50" cy="62" r="4"
            fill={colors.accent}
            animate={{ scale: isHovered ? 1.2 : 1 }}
          />
          <motion.circle
            cx="85" cy="62" r="4"
            fill={colors.accent}
            animate={{ scale: isHovered ? 1.2 : 1 }}
          />
          <motion.rect
            x="55" y="40" width="25" height="10" rx="2"
            fill={`${colors.accent}30`}
            stroke={colors.accent}
            strokeWidth="1"
            animate={{ y: isHovered ? 38 : 40 }}
          />
          <motion.path
            d="M67 42 L67 48 M64 45 L70 45"
            stroke={colors.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  }, [project.category, colors, isHovered])

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        perspective: 1000,
      }}
      layout
      layoutId={project.slug}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-px rounded-2xl z-0"
          style={{
            background: `linear-gradient(135deg, ${colors.accent}40 0%, transparent 50%, ${colors.accent}20 100%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Card content */}
        <div
          className="relative z-10 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(10,10,15,0.9) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Cursor-following glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(400px circle at ${x}% ${y}%, ${colors.accent}15 0%, transparent 50%)`
              ),
            }}
          />

          {/* Featured badge */}
          {project.featured && (
            <motion.span
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: `${colors.accent}20`,
                border: `1px solid ${colors.accent}40`,
                color: colors.light,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3 h-3"
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M8 0l2.12 5.12L16 6.12l-4.24 4.12L12.96 16 8 12.88 3.04 16l1.2-5.76L0 6.12l5.88-1L8 0z" />
              </motion.svg>
              Destacado
            </motion.span>
          )}

          {/* Image area with visual */}
          <div
            className="relative aspect-video overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}08 0%, rgba(10,10,20,1) 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
              {CategoryVisual}
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)`,
              }}
            />

            {/* View indicator on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
                style={{
                  background: 'rgba(10,10,15,0.8)',
                  border: `1px solid ${colors.accent}60`,
                  color: colors.light,
                  backdropFilter: 'blur(8px)',
                }}
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: isHovered ? 1 : 0.8, y: isHovered ? 0 : 10 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Ver detalles
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Category */}
            <motion.span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.light }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.categoryLabel}
            </motion.span>

            {/* Title */}
            <h3 className="heading-sm text-text-primary mt-2 mb-3 group-hover:text-white/90 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="body-sm mb-5 line-clamp-2">
              {project.shortDesc}
            </p>

            {/* Link */}
            <Link
              to={`/proyectos/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
              style={{ color: colors.light }}
            >
              <span>Ver proyecto</span>
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Filter button with animated indicator
function FilterButton({ category, isActive, onClick, count }: {
  category: { id: string; label: string }
  isActive: boolean
  onClick: () => void
  count: number
}) {
  return (
    <motion.button
      className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255,255,255,0.08)'}`,
        color: isActive ? '#A78BFA' : 'rgba(255,255,255,0.6)',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {category.label}
        <motion.span
          className="px-1.5 py-0.5 rounded-full text-xs"
          style={{
            background: isActive ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)',
          }}
          animate={{ scale: isActive ? 1 : 0.9 }}
        >
          {count}
        </motion.span>
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          layoutId="activeFilter"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? content.projects.items
    : content.projects.items.filter(p => p.category === activeCategory)

  const colors: Record<string, { accent: string; light: string }> = {
    automatizacion: { accent: '#8B5CF6', light: '#A78BFA' },
    web: { accent: '#06B6D4', light: '#22D3EE' },
    branding: { accent: '#F59E0B', light: '#FBBF24' },
    ecommerce: { accent: '#10B981', light: '#34D399' },
  }

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: content.projects.items.length }
    content.projects.items.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <>
      {/* Hero Section with VeilSectionHeader */}
      <Section className="relative overflow-hidden pt-32 pb-8">
        <Container>
          <VeilSectionHeader
            variant="projects"
            eyebrow="Proyectos"
            title={content.projects.hero.title}
            subtitle={content.projects.hero.subtitle}
            align="center"
          />
        </Container>

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '-20%',
              left: '-15%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
              bottom: '-10%',
              right: '-10%',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="py-12 md:py-20">
        <Container>
          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {content.projects.categories.map((cat) => (
              <FilterButton
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                count={categoryCounts[cat.id] || 0}
              />
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const color = colors[project.category] || colors.automatizacion
                return (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                    colors={color}
                  />
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-white/40 text-lg">No hay proyectos en esta categoría.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
