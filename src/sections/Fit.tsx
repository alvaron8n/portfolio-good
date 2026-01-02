import { motion } from 'framer-motion'
import { content } from '../content/content'
import { 
  GeometricShapes,
  GradientOrbs,
  ParticleField
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

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3 }
  })
}

export function Fit() {
  const { fit } = content.home

  return (
    <section 
      id="encajamos" 
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}
    >
      {/* Efectos de fondo sutiles */}
      <GeometricShapes variant="minimal" />
      
      {/* Orbes verde y rojo sutiles */}
      <GradientOrbs orbs={[
        { color: 'rgba(34, 197, 94, 0.08)', size: 400, x: '15%', y: '50%' },
        { color: 'rgba(239, 68, 68, 0.08)', size: 400, x: '85%', y: '50%' },
      ]} />
      
      <ParticleField count={6} color="emerald" className="opacity-50" />
      <ParticleField count={6} color="red" className="opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        <motion.h2
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Antes de escribirme, mira si <AccentText>encajamos</AccentText>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          
          {/* Encaja si - Green */}
          <motion.div
            className="relative rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(34, 197, 94, 0.02) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.15)',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-emerald-400">
                Encaja si
              </h3>
            </div>

            <ul className="space-y-2.5">
              {fit.fits.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2.5"
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0" />
                  <span className="text-sm md:text-base text-white/65 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* No encajamos si - Red */}
          <motion.div
            className="relative rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(239, 68, 68, 0.02) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center border border-red-500/25">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-400">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-red-400">
                No encajamos si
              </h3>
            </div>

            <ul className="space-y-2.5">
              {fit.notFits.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2.5"
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2 flex-shrink-0" />
                  <span className="text-sm md:text-base text-white/65 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
