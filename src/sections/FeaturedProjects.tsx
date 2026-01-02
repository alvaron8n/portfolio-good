import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'
import { GlassCard } from '../components/ui/GlassCard'

const CARD_WIDTH = 350
const CARD_GAP = 32

function DraggableCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 })

  const projects = content.home.projects.items

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
    const handleResize = () => {
        if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate drag constraints
  const totalWidth = projects.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
  const dragConstraintLeft = -(totalWidth - containerWidth) - 50 // Extra padding
  const dragConstraintRight = 50

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
    // Optional: Add snap logic here if needed
  }

  return (
    <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing py-10">
      <motion.div
        className="flex gap-8 px-[5vw]"
        drag="x"
        dragConstraints={{ left: dragConstraintLeft, right: dragConstraintRight }}
        style={{ x: springX }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {projects.map((project, index) => (
          <CarouselItem 
            key={project.slug} 
            project={project} 
            index={index} 
          />
        ))}
      </motion.div>
    </div>
  )
}

function CarouselItem({ 
  project, 
  index, 
}: { 
  project: typeof content.home.projects.items[number]
  index: number
}) {
  return (
    <motion.div
      className="flex-shrink-0 relative group"
      style={{ 
        width: CARD_WIDTH,
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/proyectos/${project.slug}`} className="block h-full">
        <GlassCard className="h-[450px] flex flex-col overflow-hidden transition-all duration-500 hover:border-orange-500/40">
          {/* Image Area */}
          <div className="h-1/2 relative overflow-hidden bg-black/20">
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />
             {/* Abstract project visual placeholder */}
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-20 h-20 rounded-full border border-white/10" />
             </div>
             
             <div className="absolute top-4 right-4 z-20">
               <span className="text-[10px] font-mono border border-white/10 bg-black/50 backdrop-blur px-2 py-1 rounded text-white/60">
                 {String(index + 1).padStart(2, '0')}
               </span>
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 flex flex-col relative z-20">
            <span className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-2 block">
              {project.category}
            </span>
            <h3 className="font-display text-2xl text-white mb-3 leading-tight group-hover:text-orange-100 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-4">
              {project.result}
            </p>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-white/30">View Case</span>
              <motion.span 
                className="text-white/80"
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

export function FeaturedProjects() {
  const { projects } = content.home

  return (
    <Section id="proyectos" className="py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2 block">
              Selected Works
            </span>
            <h2 className="heading-lg text-white">
              {projects.title}
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-white/50 text-sm max-w-xs md:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Drag to explore recent cases and experiments.
          </motion.p>
        </div>
      </Container>

      {/* Carousel */}
      <DraggableCarousel />
    </Section>
  )
}
