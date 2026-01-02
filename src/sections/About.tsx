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

// Highlight chip component
function HighlightChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div 
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{
        background: 'rgba(249, 115, 22, 0.06)',
        border: '1px solid rgba(249, 115, 22, 0.15)',
      }}
    >
      <div className="flex-shrink-0 w-6 h-6 rounded bg-orange-500/15 flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-white/40 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</p>
        <p className="text-xs font-semibold text-white/80 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
      </div>
    </div>
  )
}

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
      {/* Efectos de fondo sutiles */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <GradientOrbs orbs={[
          { color: 'rgba(249, 115, 22, 0.08)', size: 400, x: '90%', y: '30%' },
          { color: 'rgba(251, 191, 36, 0.05)', size: 300, x: '5%', y: '70%' },
        ]} />
      </motion.div>
      
      <AmbientGlow color="rgba(249, 115, 22, 0.05)" position="top-right" />
      <Constellation nodeCount={6} color="rgba(249, 115, 22, 0.15)" />
      <ParticleField count={6} color="orange" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Layout split en desktop */}
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-start">
          
          {/* Left: Título + Texto + CTA */}
          <div className="flex-1 lg:max-w-2xl">
            <motion.h2
              className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-5 leading-[1.25]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              No es magia. Es <AccentText>experiencia</AccentText> (y obsesión por hacerlo bien).
            </motion.h2>

            <div className="space-y-3 mb-6">
              <motion.p
                className="text-sm md:text-base text-white/55 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Antes de dedicarme a esto, tuve dos negocios propios: una marca de ropa (<strong className="text-white/70">Impale Clothing</strong>, 1.800 seguidores) y un ecommerce de zapatillas que llevé 4 años (<strong className="text-white/70">6.800 seguidores</strong>, facturación real).
              </motion.p>
              
              <motion.p
                className="text-sm md:text-base text-white/55 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 }}
              >
                Eso me enseñó algo que no se aprende en ningún curso: la tecnología solo vale si mejora el negocio.
              </motion.p>
              
              <motion.p
                className="text-sm md:text-base text-white/55 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                Hoy mezclo esa visión con código, <strong className="text-white/70">IA</strong> y diseño para construir sistemas que ahorran tiempo, reducen errores y ayudan a vender más.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link
                to={aboutMini.cta.href}
                className="inline-flex items-center gap-2.5 text-orange-400 hover:text-orange-300 transition-all font-medium text-xs uppercase tracking-wider group"
              >
                <span className="w-6 h-px bg-gradient-to-r from-orange-500/50 to-orange-500 group-hover:w-10 transition-all duration-300" />
                <span>{aboutMini.cta.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: Highlight chips - Solo visible en desktop */}
          <motion.div 
            className="hidden lg:flex flex-col gap-2.5 lg:w-64 lg:flex-shrink-0 mt-8 lg:mt-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Background
            </p>
            
            <HighlightChip 
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
              label="Ecommerce propio"
              value="4 años"
            />
            
            <HighlightChip 
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
              label="Comunidad real"
              value="+8.600 seguidores"
            />
            
            <HighlightChip 
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
              label="Stack actual"
              value="IA + Código + Diseño"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
