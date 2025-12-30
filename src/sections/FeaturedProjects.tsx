import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

const colors = ['#8B5CF6', '#06B6D4', '#F59E0B']

function ProjectCard({ 
  project, 
  index,
  isMobile
}: { 
  project: typeof content.home.projects.items[number]
  index: number
  isMobile: boolean
}) {
  const color = colors[index % colors.length]

  return (
    <Link
      to={`/proyectos/${project.slug}`}
      className={`flex-shrink-0 snap-start ${isMobile ? 'w-[80vw]' : 'w-[340px]'}`}
    >
      <motion.article
        className="group relative h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div 
          className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.06] p-6 flex flex-col justify-end transition-all duration-300 group-hover:border-white/[0.12]"
          style={{
            background: `linear-gradient(to top, ${color}10, transparent)`
          }}
        >
          {/* Number */}
          <span 
            className="absolute top-6 left-6 font-display text-6xl font-bold opacity-10 select-none"
            style={{ color }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Content */}
          <div className="relative z-10">
            <span 
              className="inline-block px-2 py-1 mb-3 text-xs font-mono uppercase tracking-wider rounded"
              style={{ 
                color,
                backgroundColor: `${color}15`
              }}
            >
              {project.category}
            </span>
            
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            
            <p className="text-white/50 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              {project.result}
            </p>
          </div>

          {/* Hover arrow */}
          <div 
            className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${color}20` }}
          >
            <svg className="w-4 h-4" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export function FeaturedProjects() {
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { projects } = content.home

  return (
    <Section id="proyectos" className="py-20 md:py-32 overflow-hidden">
      {/* Header */}
      <Container className="mb-8">
        <motion.div
          className="flex items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              {projects.title}
            </h2>
            <p className="text-white/40 text-sm">
              {projects.subtitle}
            </p>
          </div>
          
          <p className="hidden md:block text-white/30 text-xs">
            ← Desliza →
          </p>
        </motion.div>
      </Container>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{
          paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))',
          paddingRight: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))',
        }}
      >
        {projects.items.map((project, i) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            index={i}
            isMobile={isMobile}
          />
        ))}

        {/* Ver más */}
        <Link
          to={projects.cta.href}
          className={`flex-shrink-0 snap-start ${isMobile ? 'w-[50vw]' : 'w-[200px]'}`}
        >
          <div className="h-full aspect-[4/5] rounded-2xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center gap-3 hover:border-violet-500/30 transition-colors">
            <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="text-white/30 text-sm">{projects.cta.label}</span>
          </div>
        </Link>
      </div>
    </Section>
  )
}
