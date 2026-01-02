import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { content } from '../content/content'
import { 
  ParticleField, 
  GradientOrbs,
  Constellation,
  AmbientGlow
} from '../components/backgrounds/AnimatedBackgrounds'

const AccentText = ({ children }: { children: React.ReactNode }) => (
  <span 
    style={{ 
      fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
      background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fb923c 70%, #fbbf24 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {children}
  </span>
)

export function About() {
  const { aboutMini } = content.home
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section 
      ref={sectionRef}
      id="sobre-mi" 
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Efectos de fondo sutiles con parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <GradientOrbs orbs={[
          { color: 'rgba(249, 115, 22, 0.1)', size: 450, x: '85%', y: '30%' },
          { color: 'rgba(251, 191, 36, 0.06)', size: 350, x: '10%', y: '70%' },
        ]} />
      </motion.div>
      
      <AmbientGlow color="rgba(249, 115, 22, 0.06)" position="top-right" />
      <Constellation nodeCount={8} color="rgba(249, 115, 22, 0.2)" />
      <ParticleField count={8} color="orange" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <motion.h2
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 leading-[1.2]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          No es magia. Es <AccentText>experiencia</AccentText> (y obsesión por hacerlo bien).
        </motion.h2>

        <div className="space-y-4 mb-8">
          <motion.p
            className="text-base md:text-lg text-white/55 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Antes de dedicarme a esto, tuve dos negocios propios: una marca de ropa (<strong className="text-white/75">Impale Clothing</strong>, 1.800 seguidores) y un ecommerce de zapatillas que llevé 4 años (<strong className="text-white/75">6.800 seguidores</strong>, facturación real).
          </motion.p>
          
          <motion.p
            className="text-base md:text-lg text-white/55 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Eso me enseñó algo que no se aprende en ningún curso: la tecnología solo vale si mejora el negocio.
          </motion.p>
          
          <motion.p
            className="text-base md:text-lg text-white/55 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            Hoy mezclo esa visión con código, <strong className="text-white/75">IA</strong> y diseño para construir sistemas que ahorran tiempo, reducen errores y ayudan a vender más.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            to={aboutMini.cta.href}
            className="inline-flex items-center gap-3 text-orange-400 hover:text-orange-300 transition-all font-medium text-sm uppercase tracking-wider group"
          >
            <span className="w-8 h-px bg-gradient-to-r from-orange-500/50 to-orange-500 group-hover:w-12 transition-all duration-300" />
            <span>{aboutMini.cta.label}</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
