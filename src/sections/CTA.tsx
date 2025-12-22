import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

// Floating particle component
function FloatingParticle({ delay, duration, x, y, size }: {
  delay: number
  duration: number
  x: number
  y: number
  size: number
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Animated rocket icon with particles
function RocketIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-20 h-20">
      {/* Glow behind */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Rocket SVG */}
      <motion.svg
        viewBox="0 0 64 64"
        fill="none"
        className="relative w-full h-full"
        animate={{
          y: isHovered ? -4 : 0,
          rotate: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      >
        {/* Exhaust flame */}
        <motion.path
          d="M32 52 L28 62 L32 58 L36 62 Z"
          fill="url(#flameGradient)"
          animate={{
            scaleY: isHovered ? [1, 1.3, 1] : 1,
            opacity: isHovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
          style={{ transformOrigin: 'center top' }}
        />

        {/* Rocket body */}
        <motion.path
          d="M32 8 C32 8 22 20 22 36 C22 44 26 50 32 52 C38 50 42 44 42 36 C42 20 32 8 32 8Z"
          fill="url(#bodyGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* Window */}
        <motion.circle
          cx="32"
          cy="28"
          r="6"
          fill="#0A0A0F"
          stroke="url(#windowGradient)"
          strokeWidth="2"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        />
        <motion.circle
          cx="32"
          cy="28"
          r="3"
          fill="url(#windowInnerGradient)"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
        />

        {/* Fins */}
        <path
          d="M22 38 L14 48 L22 46 Z"
          fill="url(#finGradient)"
        />
        <path
          d="M42 38 L50 48 L42 46 Z"
          fill="url(#finGradient)"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGradient" x1="22" y1="8" x2="42" y2="52">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="windowGradient" x1="26" y1="22" x2="38" y2="34">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="windowInnerGradient">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </radialGradient>
          <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="flameGradient" x1="32" y1="52" x2="32" y2="62">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Particle trail when hovered */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: '50%',
                bottom: -10 - i * 8,
                background: i % 2 === 0 ? '#F59E0B' : '#EF4444',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.8, 0],
                scale: [1, 0.5],
                y: [0, 20],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const spotlightY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  // Particles configuration
  const particles = [
    { delay: 0, duration: 4, x: 10, y: 20, size: 4 },
    { delay: 1, duration: 5, x: 85, y: 30, size: 6 },
    { delay: 2, duration: 4.5, x: 20, y: 70, size: 5 },
    { delay: 0.5, duration: 5.5, x: 75, y: 80, size: 4 },
    { delay: 1.5, duration: 4, x: 50, y: 15, size: 3 },
    { delay: 2.5, duration: 5, x: 90, y: 60, size: 5 },
    { delay: 0.8, duration: 4.2, x: 5, y: 50, size: 4 },
    { delay: 1.8, duration: 5.2, x: 60, y: 85, size: 6 },
  ]

  return (
    <Section className="relative py-20 md:py-32 lg:py-40 overflow-hidden" ref={sectionRef}>
      {/* Animated background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Main gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            y,
            rotate,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            y: useTransform(y, v => -v * 0.5),
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '-15%',
            left: '-10%',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            y: useTransform(y, v => v * 0.3),
            rotate: useTransform(rotate, v => -v),
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-5%',
          }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />

        {/* Animated gradient lines */}
        <div className="absolute inset-0 hidden lg:flex justify-center gap-48 opacity-20">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-px h-full"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #8B5CF6 50%, transparent 100%)',
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      <Container>
        <motion.div
          ref={cardRef}
          className="relative max-w-4xl mx-auto"
          style={{ scale }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card with animated border */}
          <div className="relative p-10 md:p-16 rounded-3xl overflow-hidden">
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl p-px"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #10B981 100%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="absolute inset-px rounded-3xl bg-[#0A0A0F]" />
            </motion.div>

            {/* Glassmorphism background */}
            <div
              className="absolute inset-px rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(139, 92, 246, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            />

            {/* Spotlight effect following mouse */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 400,
                height: 400,
                x: spotlightX,
                y: spotlightY,
                translateX: '-50%',
                translateY: '-50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ opacity: { duration: 0.3 } }}
            />

            {/* Decorative animated corners */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <motion.span
                key={i}
                className={`absolute w-6 h-6 ${pos}`}
                style={{
                  borderTop: i < 2 ? '2px solid #8B5CF6' : 'none',
                  borderBottom: i >= 2 ? '2px solid #8B5CF6' : 'none',
                  borderLeft: i % 2 === 0 ? '2px solid #8B5CF6' : 'none',
                  borderRight: i % 2 === 1 ? '2px solid #8B5CF6' : 'none',
                  borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 2 ? '0 0 0 12px' : '0 0 12px 0',
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Content */}
            <div className="relative flex flex-col items-center text-center z-10">
              {/* Animated rocket icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                <RocketIcon isHovered={isHovered} />
              </motion.div>

              {/* Title with animated gradient */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {content.home.cta.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === 2 || i === 3 ? (
                      <motion.span
                        className="inline-block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {word}
                      </motion.span>
                    ) : (
                      word
                    )}{' '}
                  </span>
                ))}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-white/60 max-w-lg mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {content.home.cta.subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Primary button - WhatsApp */}
                <motion.a
                  href={content.home.cta.primaryButton.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                  }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut',
                    }}
                  />
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="relative">{content.home.cta.primaryButton.label}</span>
                </motion.a>

                {/* Secondary button - Email */}
                <motion.a
                  href={content.home.cta.secondaryButton.href}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                  whileHover={{ scale: 1.03, y: -2, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 transition-transform group-hover:scale-110">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6L12 13L2 6" />
                  </svg>
                  <span>{content.home.cta.secondaryButton.label}</span>
                </motion.a>
              </motion.div>

              {/* Trust indicators with animated icons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.span
                  className="flex items-center gap-2 text-sm text-white/50"
                  whileHover={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-emerald-400"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </motion.svg>
                  Respuesta en menos de 24h
                </motion.span>

                <span className="hidden sm:block text-white/20">•</span>

                <motion.span
                  className="flex items-center gap-2 text-sm text-white/50"
                  whileHover={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-emerald-400"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </motion.svg>
                  Sin compromiso
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
