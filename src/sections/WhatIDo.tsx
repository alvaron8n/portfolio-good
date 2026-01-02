import { motion } from 'framer-motion'
import { content } from '../content/content'
import { 
  ParticleField, 
  GeometricShapes, 
  GridPattern,
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function WhatIDo() {
  const { whatIDo } = content.home

  return (
    <section 
      id="que-hago" 
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}
    >
      {/* Efectos de fondo sutiles */}
      <GridPattern size={80} color="rgba(249, 115, 22, 0.03)" />
      <GeometricShapes variant="default" />
      <AmbientGlow color="rgba(249, 115, 22, 0.08)" position="top-right" />
      <AmbientGlow color="rgba(251, 191, 36, 0.06)" position="bottom-left" />
      <ParticleField count={10} color="orange" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Lo que hago <AccentText>(sin palabras vacías)</AccentText>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {whatIDo.items.map((item, index) => (
            <motion.article
              key={item.id}
              className="group relative rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 16, 24, 0.8) 0%, rgba(16, 16, 24, 0.4) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                borderColor: 'rgba(249, 115, 22, 0.3)',
                y: -4,
              }}
            >
              {/* Number badge */}
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <span className="font-mono text-sm font-bold text-orange-400/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 leading-tight group-hover:text-orange-400 transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="font-body text-sm md:text-base text-white/55 leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
