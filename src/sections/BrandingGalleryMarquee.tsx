import { motion } from 'framer-motion'
import { ThreeDMarquee } from '@/components/ui/three-d-marquee'
import { LazyMount } from '@/components/LazyMount'

// Premium branding/design stock images from Unsplash
// Reduced to ~20 high quality images for performance
const brandingImages = [
  // Top tier - Brand Identity
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=75',
  // Packaging
  'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=600&q=75',
  // Digital
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&w=600&q=75',
  // Stationery
  'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=600&q=75',
  // Dark/Premium filler
  'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=75',
]

export function BrandingGalleryMarquee() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#0A0A0F]">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-amber-300 uppercase tracking-widest">
              Selected Work
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Visual{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ecosystem
            </span>{' '}
            Snapshots
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
            Un vistazo a mockups, identidades visuales y activos de marca creados para clientes
            reales y proyectos conceptuales.
          </p>
        </motion.div>

        {/* 3D Marquee Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LazyMount minHeight="400px">
            {/* Gallery frame with subtle border glow */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 0 60px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Inner padding wrapper */}
              <div className="p-1 sm:p-2">
                <ThreeDMarquee images={brandingImages} />
              </div>

              {/* Decorative corner accents */}
              <div
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  background: 'linear-gradient(-45deg, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
                }}
              />
            </div>
          </LazyMount>
        </motion.div>

        {/* Subtle divider line */}
        <motion.div
          className="mt-12 sm:mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/30" />
        </motion.div>
      </div>
    </section>
  )
}

export default BrandingGalleryMarquee
