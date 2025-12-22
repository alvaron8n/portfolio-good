import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Link } from 'react-router-dom'

// Animated counter component
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return

    // Parse the value - handle special cases like "24/7"
    if (value.includes('/')) {
      setDisplayValue(value)
      return
    }

    const numericValue = parseInt(value.replace(/\D/g, ''), 10)
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    const duration = 2000
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(startValue + (numericValue - startValue) * eased)

      setDisplayValue(current.toString())

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// Magnetic hover effect for elements
function useMagneticEffect(strength: number = 0.3) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave }
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 100])
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [45, -15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])

  // Magnetic effect for photo
  const photoMagnetic = useMagneticEffect(0.15)

  const stats = [
    { value: '10', label: 'Proyectos completados', prefix: '+', icon: '🚀' },
    { value: '5', label: 'Años de experiencia', suffix: '+', icon: '📅' },
    { value: '24/7', label: 'Automatizaciones activas', icon: '⚡' },
  ]

  const skills = [
    { name: 'n8n', color: '#EA4B71' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'Claude AI', color: '#8B5CF6' },
    { name: 'WordPress', color: '#21759B' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Supabase', color: '#3ECF8E' },
    { name: 'Tailwind', color: '#06B6D4' },
  ]

  return (
    <Section id="sobre-mi" className="relative overflow-hidden py-24 md:py-32">
      <div ref={sectionRef} className="relative">

        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs with parallax */}
          <motion.div
            style={{ y: y1, rotate: rotate1 }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-30"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-violet/40 to-transparent blur-[100px]" />
          </motion.div>

          <motion.div
            style={{ y: y2, rotate: rotate2 }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-25"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan/40 to-transparent blur-[80px]" />
          </motion.div>

          <motion.div
            style={{ y: y3, scale }}
            className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full opacity-20"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/30 to-transparent blur-[60px]" />
          </motion.div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            }}
          />
        </div>

        <Container>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left column - Photo & Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Photo container */}
              <motion.div
                ref={photoRef}
                style={{ y: photoY, x: photoMagnetic.x, ...{ '--mouse-y': photoMagnetic.y } as React.CSSProperties }}
                onMouseMove={photoMagnetic.handleMouseMove}
                onMouseLeave={photoMagnetic.handleMouseLeave}
                className="relative max-w-md mx-auto lg:mx-0"
              >
                {/* Decorative ring behind photo */}
                <motion.div
                  className="absolute -inset-8 rounded-3xl border border-white/5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Main photo frame */}
                <motion.div
                  className="relative p-3 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Corner accents */}
                  {['top-0 left-0 border-t border-l rounded-tl-lg',
                    'top-0 right-0 border-t border-r rounded-tr-lg',
                    'bottom-0 left-0 border-b border-l rounded-bl-lg',
                    'bottom-0 right-0 border-b border-r rounded-br-lg'
                  ].map((position, i) => (
                    <motion.span
                      key={i}
                      className={`absolute w-6 h-6 ${position} border-primary/60`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    />
                  ))}

                  {/* Photo */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-bg-light to-bg">
                    <img
                      src="/images/alvaro-placeholder.jpg"
                      alt="Álvaro Fernández"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    {/* Fallback */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-bold text-gradient opacity-60">ÁF</span>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                  </div>

                  {/* Animated border gradient */}
                  <div
                    className="absolute -inset-px rounded-2xl -z-10 opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan), var(--color-violet))',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-rotate 4s ease infinite',
                    }}
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:bottom-4 md:-right-8 flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald/10 border border-emerald/30 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
                  </span>
                  <span className="text-xs font-medium text-emerald whitespace-nowrap">
                    Disponible para proyectos
                  </span>
                </motion.div>
              </motion.div>

              {/* Skills cloud */}
              <motion.div
                className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 cursor-default transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: `${skill.color}20`,
                      borderColor: `${skill.color}40`,
                      color: skill.color,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Section label */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="w-10 h-0.5 bg-gradient-to-r from-violet to-cyan rounded-full" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                  Sobre mí
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                De la publicidad a la{' '}
                <span className="text-gradient">automatización</span>
              </motion.h2>

              {/* Bio text */}
              <motion.div
                className="space-y-4 text-white/60 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>
                  Soy un profesional del Marketing que evolucionó hacia la{' '}
                  <span className="text-white/90 font-medium">Automatización e IA</span>.{' '}
                  Mi experiencia emprendiendo con marcas propias me enseñó que el tiempo es el recurso más valioso.
                </p>
                <p>
                  Ahora combino creatividad y estrategia con herramientas que transforman
                  tareas manuales en{' '}
                  <span className="text-white/90 font-medium">procesos que trabajan solos</span>.{' '}
                  Sin humo, solo resultados.
                </p>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                className="grid grid-cols-3 gap-3 md:gap-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative group p-4 md:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm text-center overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      y: -5,
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary/30 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </span>
                      <span className="block mt-2 text-[10px] md:text-xs text-white/50 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer with location and CTA */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.06]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <svg className="w-4 h-4 text-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <span>Plasencia / Málaga, España</span>
                </div>

                <Link
                  to="/sobre-mi"
                  className="group flex items-center gap-2 text-sm font-medium text-violet hover:text-cyan transition-colors"
                >
                  Conoce mi historia completa
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes gradient-rotate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </Section>
  )
}
