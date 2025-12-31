import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

type ProjectItem = (typeof content.projects.items)[number]

// Stock images from Unsplash for each category
const categoryImages: Record<string, string> = {
  automatizacion: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  branding: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
}

// ============================================
// PROJECT CARD - Premium with image
// ============================================
function ProjectCard({ project, index }: {
  project: ProjectItem
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageUrl = categoryImages[project.category] || categoryImages.automatizacion

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      layoutId={project.slug}
    >
      <Link to={`/proyectos/${project.slug}`}>
        <motion.div
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: isHovered 
              ? '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(249, 115, 22, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)' 
              : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Top highlight */}
          <div 
            className="absolute inset-x-0 top-0 h-px z-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
          />

          {/* Image area */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* Background image */}
            <img
              src={imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                filter: 'brightness(0.7) saturate(1.1)',
                opacity: imageLoaded ? 1 : 0,
              }}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
            <motion.div 
              className="absolute inset-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, transparent 60%)',
              }}
            />

            {/* Featured badge */}
            {project.featured && (
              <motion.span
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.35) 0%, rgba(251, 191, 36, 0.2) 100%)',
                  border: '1px solid rgba(249, 115, 22, 0.5)',
                  color: '#fbbf24',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                  <path d="M8 0l2.12 5.12L16 6.12l-4.24 4.12L12.96 16 8 12.88 3.04 16l1.2-5.76L0 6.12l5.88-1L8 0z" />
                </svg>
                Destacado
              </motion.span>
            )}

            {/* Hover CTA overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  background: 'rgba(10, 10, 15, 0.9)',
                  border: '1px solid rgba(249, 115, 22, 0.6)',
                  color: '#fbbf24',
                  backdropFilter: 'blur(16px)',
                }}
                initial={{ scale: 0.85, y: 12 }}
                animate={{ scale: isHovered ? 1 : 0.85, y: isHovered ? 0 : 12 }}
                transition={{ duration: 0.35 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Ver proyecto
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative p-5 md:p-6">
            {/* Category label */}
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.categoryLabel}
            </span>

            {/* Title */}
            <h3
              className="text-lg md:text-xl text-white mt-2 mb-2.5 leading-tight group-hover:text-white/90 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm text-white/45 leading-relaxed mb-5 line-clamp-2"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
            >
              {project.shortDesc}
            </p>

            {/* CTA Link */}
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ver proyecto
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#arrowGrad)"
                strokeWidth="2.5"
                className="w-4 h-4"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <defs>
                  <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ============================================
// FILTER BUTTON
// ============================================
function FilterButton({ category, isActive, onClick, count }: {
  category: { id: string; label: string }
  isActive: boolean
  onClick: () => void
  count: number
}) {
  return (
    <motion.button
      className="relative px-5 py-2.5 rounded-full text-sm transition-all duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
        background: isActive 
          ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.18) 0%, rgba(251, 191, 36, 0.1) 100%)' 
          : 'rgba(255, 255, 255, 0.03)',
        border: isActive 
          ? '1px solid rgba(249, 115, 22, 0.45)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        color: isActive ? '#fbbf24' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="flex items-center gap-2">
        {category.label}
        <span
          className="px-2 py-0.5 rounded-full text-xs"
          style={{
            background: isActive ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255, 255, 255, 0.08)',
            color: isActive ? '#fbbf24' : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {count}
        </span>
      </span>
    </motion.button>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? content.projects.items
    : content.projects.items.filter(p => p.category === activeCategory)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: content.projects.items.length }
    content.projects.items.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-28 md:pt-36 pb-6">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/50" />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  background: 'linear-gradient(90deg, #f97316, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Proyectos
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/50" />
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              {content.projects.hero.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base md:text-lg text-white/50 max-w-xl mx-auto"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
            >
              {content.projects.hero.subtitle}
            </p>
          </motion.div>
        </Container>

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute w-[450px] h-[450px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%)',
              filter: 'blur(90px)',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </Section>

      {/* Projects Grid */}
      <Section className="py-8 md:py-14">
        <Container>
          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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

          {/* Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
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
                <p 
                  className="text-white/35 text-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  No hay proyectos en esta categoría.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
