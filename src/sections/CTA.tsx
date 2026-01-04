import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { content } from '../content/content'
import { MagneticButton } from '../components/ui/MagneticButton'

// ============================================
// ELEGANT FLOATING PARTICLES
// ============================================
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      opacity: number
      speed: number
      angle: number
      isOrange: boolean
    }

    const particles: Particle[] = []

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }

    const createParticles = () => {
      particles.length = 0
      const count = 40

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.0008 + 0.0003,
          angle: Math.random() * Math.PI * 2,
          isOrange: Math.random() > 0.6
        })
      }
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p, i) => {
        // Movimiento sinusoidal suave
        p.angle += p.speed
        p.x = p.baseX + Math.sin(p.angle + i) * 30
        p.y = p.baseY + Math.cos(p.angle * 0.7 + i) * 20

        // Wrap around edges suavemente
        if (p.x < -20) p.baseX = width + 20
        if (p.x > width + 20) p.baseX = -20
        if (p.y < -20) p.baseY = height + 20
        if (p.y > height + 20) p.baseY = -20

        // Movimiento lento hacia arriba
        p.baseY -= 0.15

        // Dibujar partícula
        const alpha = p.opacity * (0.7 + Math.sin(time * 0.001 + i) * 0.3)
        
        if (p.isOrange) {
          // Glow naranja
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6)
          gradient.addColorStop(0, `rgba(249, 115, 22, ${alpha * 0.8})`)
          gradient.addColorStop(0.4, `rgba(249, 115, 22, ${alpha * 0.2})`)
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2)
          ctx.fill()

          // Core
          ctx.fillStyle = `rgba(251, 146, 60, ${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Partícula blanca sutil
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ============================================
// ACCENT TEXT
// ============================================
const AccentText = ({ children }: { children: React.ReactNode }) => (
  <span 
    className="cta-accent inline-block"
    style={{ 
      fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
      background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fb923c 70%, #fbbf24 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    }}
  >
    {children}
  </span>
)

// ============================================
// MICRO CHIP
// ============================================
function MicroChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div 
      className="cta-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] text-white/50" 
      style={{ 
        background: 'rgba(255,255,255,0.04)', 
        border: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <span className="text-orange-500/60">{icon}</span>
      <span>{text}</span>
    </div>
  )
}

// ============================================
// MAIN CTA SECTION
// ============================================
export function CTA() {
  const { cta } = content.home

  return (
    <section className="cta-section relative py-14 md:py-20 overflow-hidden bg-[#050508]">
      {/* Floating particles */}
      <FloatingParticles />

      {/* Subtle radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 text-center">
        
        {/* Headline */}
        <motion.h2
          className="cta-headline font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white leading-[1.2]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Si tu negocio va a mil... tu <AccentText>sistema</AccentText> debería ayudarte, no frenarte.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="cta-subheadline text-sm md:text-base text-white/45 mb-6 leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          {cta.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <MagneticButton strength={0.25}>
            <motion.a
              href={cta.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary group inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-bold uppercase tracking-wider text-[10px] transition-all duration-300 hover:bg-orange-400 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>{cta.whatsapp.label}</span>
            </motion.a>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <motion.a
              href={cta.calendar.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary inline-flex items-center gap-2 px-4 py-3 text-white/50 hover:text-white uppercase tracking-wider text-[10px] transition-colors duration-300"
              whileTap={{ scale: 0.98 }}
            >
              <span>{cta.calendar.label}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Micro-proof chips */}
        <motion.div
          className="cta-chips flex flex-wrap items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.22 }}
        >
          <MicroChip 
            icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
            text="Respuesta < 24h"
          />
          <MicroChip 
            icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>}
            text="Sin compromiso"
          />
          <MicroChip 
            icon={<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            text="Propuesta clara"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          className="cta-email text-white/20 text-[10px] uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.28 }}
        >
          {cta.emailText}{' '}
          <a 
            href={`mailto:${cta.email}`}
            className="text-white/35 hover:text-orange-400 transition-colors border-b border-white/10 hover:border-orange-400 pb-0.5"
          >
            {cta.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
