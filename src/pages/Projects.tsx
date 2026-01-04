import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useMemo, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { ShaderBackground } from '../components/backgrounds/ShaderBackground'
import { PageDecoratives } from '../components/backgrounds/PageDecoratives'

// ============================================
// EXTENDED PROJECTS DATA
// ============================================
const allProjects = [
  {
    slug: 'crm-automatizacion',
    title: 'Automatización CRM Inmobiliario',
    shortDesc: 'Gestión automática de leads, contratos y seguimiento de clientes.',
    category: 'automatizacion',
    categoryLabel: 'Automatización',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'webs-locales',
    title: 'Plataforma de Reservas',
    shortDesc: 'Sistema de reservas inteligente para negocios locales.',
    category: 'web',
    categoryLabel: 'Web App',
    featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: 'branding',
    title: 'Rebranding Tech Startup',
    shortDesc: 'Identidad visual completa para empresa SaaS B2B.',
    category: 'branding',
    categoryLabel: 'Branding',
    featured: false,
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce Moda Sostenible',
    shortDesc: 'Tienda online con experiencia de compra premium.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    featured: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics SaaS',
    shortDesc: 'Panel de control con visualización de datos en tiempo real.',
    category: 'web',
    categoryLabel: 'Web App',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'app-fitness',
    title: 'App Fitness & Wellness',
    shortDesc: 'Aplicación móvil para seguimiento de entrenamientos.',
    category: 'web',
    categoryLabel: 'Mobile App',
    featured: false,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
  },
  {
    slug: 'automatizacion-email',
    title: 'Email Marketing Automation',
    shortDesc: 'Flujos automatizados de nurturing y conversión.',
    category: 'automatizacion',
    categoryLabel: 'Automatización',
    featured: false,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
  },
  {
    slug: 'branding-restaurante',
    title: 'Branding Gastronómico',
    shortDesc: 'Identidad de marca para restaurante fine dining.',
    category: 'branding',
    categoryLabel: 'Branding',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  },
  {
    slug: 'marketplace-arte',
    title: 'Marketplace de Arte Digital',
    shortDesc: 'Plataforma para compra-venta de obras digitales.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    featured: false,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
  },
  {
    slug: 'crm-legal',
    title: 'CRM Despacho Legal',
    shortDesc: 'Gestión de casos y clientes para bufete de abogados.',
    category: 'automatizacion',
    categoryLabel: 'Automatización',
    featured: false,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
  {
    slug: 'portal-inmobiliario',
    title: 'Portal Inmobiliario Premium',
    shortDesc: 'Buscador de propiedades con tours virtuales 360°.',
    category: 'web',
    categoryLabel: 'Web App',
    featured: false,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    slug: 'tienda-gourmet',
    title: 'Tienda Gourmet Online',
    shortDesc: 'E-commerce de productos delicatessen con suscripción.',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    featured: false,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
]

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'automatizacion', label: 'Automatización' },
  { id: 'web', label: 'Web & Apps' },
  { id: 'branding', label: 'Branding' },
  { id: 'ecommerce', label: 'E-commerce' },
]

// ============================================
// ANIMATED TITLE
// ============================================
function AnimatedTitle() {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line 1 animation
      gsap.fromTo(line1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
      
      // Line 2 animation
      gsap.fromTo(line2Ref.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Subtle floating
      gsap.to(containerRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <h1 ref={containerRef} className="prj-hero-title">
      <span ref={line1Ref} className="prj-title-line1">Proyectos que</span>
      <span ref={line2Ref} className="prj-hero-gradient">generan resultados</span>
    </h1>
  )
}

// ============================================
// PROJECT CARD - CLEAN & LEGIBLE
// ============================================
function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-200, 200], [8, -8])
  const rotateY = useTransform(x, [-200, 200], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="prj-card-wrap"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      layout
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <Link to={`/proyectos/${project.slug}`} className="prj-card-link">
        <motion.article
          className={`prj-card ${isHovered ? 'is-hovered' : ''}`}
          style={{ 
            rotateX: isHovered ? rotateX : 0, 
            rotateY: isHovered ? rotateY : 0 
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Image Section */}
          <div className="prj-card-image">
            <img
              src={project.image}
              alt={project.title}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="prj-card-image-overlay" />
            
            {/* Featured Badge */}
            {project.featured && (
              <span className="prj-badge">
                <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
                  <path d="M8 0l2.12 5.12L16 6.12l-4.24 4.12L12.96 16 8 12.88 3.04 16l1.2-5.76L0 6.12l5.88-1L8 0z" />
                </svg>
                Destacado
              </span>
            )}

            {/* Hover CTA */}
            <motion.div 
              className="prj-card-hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.span 
                className="prj-card-cta"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              >
                Ver proyecto
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="prj-card-content">
            <div className="prj-card-meta">
              <span className="prj-card-category">{project.categoryLabel}</span>
              <span className="prj-card-year">2024</span>
            </div>
            
            <h3 className="prj-card-title">{project.title}</h3>
            <p className="prj-card-desc">{project.shortDesc}</p>
            
            <div className="prj-card-footer">
              <span className="prj-card-action">
                Ver caso de estudio
                <motion.svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  width="14" 
                  height="14"
                  animate={{ x: isHovered ? 4 : 0 }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

// ============================================
// FILTER BUTTON
// ============================================
function FilterButton({ cat, isActive, onClick, count }: {
  cat: { id: string; label: string }
  isActive: boolean
  onClick: () => void
  count: number
}) {
  return (
    <motion.button
      className={`prj-filter ${isActive ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {cat.label}
      <span className="prj-filter-count">{count}</span>
      {isActive && <motion.div className="prj-filter-indicator" layoutId="activeFilter" />}
    </motion.button>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length }
    allProjects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="prj-page">
      {/* Fondo gris base + decorativos */}
      <div className="prj-base-bg" />
      <PageDecoratives page="projects" />

      {/* Hero con ShaderGradient contenido */}
      <section className="prj-hero relative overflow-hidden">
        <ShaderBackground preset="projects" />
        
        <Container className="relative z-10">
          <motion.div 
            className="prj-hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="prj-hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="prj-hero-line" />
              <span>Portfolio</span>
              <span className="prj-hero-line" />
            </motion.div>

            <AnimatedTitle />

            <motion.p
              className="prj-hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Cada proyecto es un caso de estudio real. Sin plantillas, sin atajos.
              <br />
              Soluciones diseñadas para objetivos de negocio específicos.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="prj-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="prj-stat">
                <span className="prj-stat-value">12+</span>
                <span className="prj-stat-label">Proyectos</span>
              </div>
              <div className="prj-stat-sep" />
              <div className="prj-stat">
                <span className="prj-stat-value">4</span>
                <span className="prj-stat-label">Categorías</span>
              </div>
              <div className="prj-stat-sep" />
              <div className="prj-stat">
                <span className="prj-stat-value">100%</span>
                <span className="prj-stat-label">Personalizados</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Projects Section */}
      <Section className="prj-section">
        <Container>
          {/* Filters */}
          <motion.div 
            className="prj-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {categories.map((cat) => (
              <FilterButton
                key={cat.id}
                cat={cat}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                count={categoryCounts[cat.id] || 0}
              />
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div className="prj-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.p 
                className="prj-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No hay proyectos en esta categoría.
              </motion.p>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* Styles */}
      <style>{`
        .prj-page {
          --orange: #f97316;
          --amber: #fbbf24;
          --dark: #0a0a0f;
          --surface: #101018;
          --border: rgba(255,255,255,0.08);
          --glass: rgba(16,16,24,0.8);
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .prj-base-bg {
          position: fixed;
          inset: 0;
          background: #18181b;
          z-index: -1;
        }

        /* ===== HERO ===== */
        .prj-hero {
          position: relative;
          z-index: 1;
          padding: 140px 0 80px;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }

        .prj-hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .prj-hero-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .prj-hero-eyebrow span:not(.prj-hero-line) {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: #10b981;
        }

        .prj-hero-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #10b981);
        }

        .prj-hero-line:last-child {
          background: linear-gradient(90deg, #10b981, transparent);
        }

        .prj-hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 28px;
        }

        .prj-title-line1 {
          display: block;
          color: white;
          font-size: clamp(32px, 6vw, 56px);
        }

        .prj-hero-gradient {
          display: block;
          font-family: 'BBH Bartle', 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          background: linear-gradient(135deg, var(--orange), var(--amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 8px;
        }

        .prj-hero-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          margin: 0 0 48px;
        }

        .prj-stats {
          display: inline-flex;
          align-items: center;
          gap: 36px;
          padding: 24px 44px;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 100px;
          backdrop-filter: blur(20px);
        }

        .prj-stat {
          text-align: center;
        }

        .prj-stat-value {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: white;
        }

        .prj-stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.45);
        }

        .prj-stat-sep {
          width: 1px;
          height: 40px;
          background: var(--border);
        }

        /* ===== SECTION ===== */
        .prj-section {
          position: relative;
          z-index: 1;
          padding: 60px 0 120px;
        }

        /* ===== FILTERS ===== */
        .prj-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 56px;
        }

        .prj-filter {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.3s;
          overflow: hidden;
        }

        .prj-filter:hover {
          border-color: rgba(249,115,22,0.4);
          color: white;
        }

        .prj-filter.active {
          border-color: var(--orange);
          color: var(--amber);
        }

        .prj-filter-count {
          padding: 2px 8px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
        }

        .prj-filter.active .prj-filter-count {
          background: rgba(249,115,22,0.2);
        }

        .prj-filter-indicator {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(251,191,36,0.06));
          border-radius: 100px;
          z-index: -1;
        }

        /* ===== GRID ===== */
        .prj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 1024px) {
          .prj-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        @media (max-width: 640px) {
          .prj-grid { grid-template-columns: 1fr; gap: 20px; }
          .prj-hero { padding: 120px 0 60px; }
          .prj-stats { 
            flex-direction: column; 
            gap: 20px; 
            padding: 28px 32px; 
            border-radius: 24px; 
          }
          .prj-stat-sep { width: 60px; height: 1px; }
          .prj-corner { display: none; }
        }

        /* ===== CARD ===== */
        .prj-card-wrap {
          position: relative;
        }

        .prj-card-link {
          display: block;
          text-decoration: none;
        }

        .prj-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          transform-style: preserve-3d;
        }

        .prj-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.08), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          z-index: 1;
          pointer-events: none;
        }

        .prj-card.is-hovered {
          border-color: rgba(249,115,22,0.3);
          box-shadow: 
            0 30px 60px rgba(0,0,0,0.4),
            0 0 0 1px rgba(249,115,22,0.15);
        }

        .prj-card.is-hovered::before {
          opacity: 1;
        }

        /* Card Image */
        .prj-card-image {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .prj-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .prj-card.is-hovered .prj-card-image img {
          transform: scale(1.08);
        }

        .prj-card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, var(--surface) 100%);
        }

        /* Badge */
        .prj-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: rgba(10,10,15,0.85);
          border: 1px solid rgba(249,115,22,0.5);
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--amber);
          backdrop-filter: blur(10px);
        }

        /* Hover CTA */
        .prj-card-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10,10,15,0.6);
          backdrop-filter: blur(4px);
          z-index: 5;
        }

        .prj-card-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--orange), var(--amber));
          border-radius: 100px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: white;
          box-shadow: 0 8px 24px rgba(249,115,22,0.4);
        }

        /* Card Content */
        .prj-card-content {
          position: relative;
          z-index: 2;
          padding: 24px;
        }

        .prj-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .prj-card-category {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          background: linear-gradient(90deg, var(--orange), var(--amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .prj-card-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
        }

        .prj-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: white;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .prj-card-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0 0 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prj-card-footer {
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .prj-card-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(90deg, var(--orange), var(--amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .prj-card-action svg {
          stroke: var(--orange);
        }

        /* Empty */
        .prj-empty {
          text-align: center;
          padding: 80px 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </div>
  )
}
