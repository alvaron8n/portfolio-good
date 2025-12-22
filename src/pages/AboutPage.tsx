import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      setDisplayValue(Math.floor(easeOutExpo * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

// Timeline item with animated connector
function TimelineItem({ item, index, isLast }: {
  item: { period: string; role: string; company: string; description: string }
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Connector line */}
      {!isLast && (
        <motion.div
          className="absolute left-[22px] top-8 w-0.5 origin-top"
          style={{
            background: 'linear-gradient(to bottom, #8B5CF6 0%, rgba(139, 92, 246, 0.2) 100%)',
            height: 'calc(100% - 24px)',
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        />
      )}

      {/* Marker */}
      <motion.div
        className="absolute left-3 top-1 w-5 h-5 rounded-full border-4 border-[#0A0A0F]"
        style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)' }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.1, type: 'spring' }}
      />

      {/* Content */}
      <motion.div
        className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300"
        whileHover={{ x: 8 }}
      >
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          {item.period}
        </span>
        <h3 className="text-xl font-semibold text-white mt-2 mb-1 group-hover:text-violet-300 transition-colors">
          {item.role}
        </h3>
        <p className="text-sm text-white/50 mb-3">{item.company}</p>
        <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Skill category with animated items
function SkillCategory({ category, index }: {
  category: { name: string; items: string[] }
  index: number
}) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillColors: Record<string, string> = {
    'React': '#61DAFB',
    'TypeScript': '#3178C6',
    'Next.js': '#FFFFFF',
    'Tailwind': '#06B6D4',
    'Framer Motion': '#FF0055',
    'n8n': '#EA4B71',
    'Make': '#6366F1',
    'Zapier': '#FF4A00',
    'Supabase': '#3ECF8E',
    'Python': '#3776AB',
    'Lovable': '#EC4899',
    'Cursor AI': '#8B5CF6',
    'GPT-4': '#10A37F',
    'Claude': '#CC785C',
    'Figma': '#F24E1E',
    'Photoshop': '#31A8FF',
    'Illustrator': '#FF9A00',
    'Premiere': '#9999FF',
  }

  return (
    <motion.div
      className="relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
    >
      {/* Category icon glow */}
      <motion.div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl"
        style={{ background: 'rgba(139, 92, 246, 0.15)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-5">
        {category.name}
      </h3>

      <div className="flex flex-wrap gap-2.5 relative">
        {category.items.map((item, i) => {
          const color = skillColors[item] || '#A78BFA'
          const isHovered = hoveredSkill === item

          return (
            <motion.span
              key={item}
              className="relative px-4 py-2 rounded-full text-sm font-medium cursor-default transition-all duration-200"
              style={{
                background: isHovered ? `${color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isHovered ? `${color}60` : 'rgba(255,255,255,0.1)'}`,
                color: isHovered ? color : 'rgba(255,255,255,0.7)',
              }}
              onMouseEnter={() => setHoveredSkill(item)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0])

  // Photo magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const photoX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const photoY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return
    const rect = photoRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) * 0.1)
    mouseY.set((e.clientY - centerY) * 0.1)
  }

  const handlePhotoMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Stats for the intro section
  const stats = [
    { value: 5, suffix: '+', label: 'Años de experiencia' },
    { value: 50, suffix: '+', label: 'Proyectos completados' },
    { value: 100, suffix: '%', label: 'Clientes satisfechos' },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-16" ref={heroRef}>
        <Container>
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A78BFA"
                strokeWidth="2"
                className="w-4 h-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </motion.svg>
              <span className="text-sm font-semibold text-violet-300">Sobre mí</span>
            </motion.div>

            {/* Title with animated gradient */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {content.about.hero.title.split(' ').slice(0, 2).join(' ')}{' '}
              <motion.span
                className="inline-block bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {content.about.hero.title.split(' ').slice(2).join(' ')}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.about.hero.subtitle}
            </motion.p>
          </motion.div>
        </Container>

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '-20%',
              right: '-15%',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
              filter: 'blur(80px)',
              bottom: '-10%',
              left: '-10%',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />
        </div>
      </Section>

      {/* Intro Section with Photo and Stats */}
      <Section className="py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Photo with magnetic effect */}
            <motion.div
              ref={photoRef}
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
            >
              <motion.div
                className="relative"
                style={{ x: photoX, y: photoY }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #8B5CF6 100%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />

                <div className="relative p-3 rounded-3xl bg-[#0A0A0F]">
                  <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl bg-gradient-to-br from-[#12121A] to-[#0A0A0F] flex items-center justify-center overflow-hidden">
                    {/* Placeholder initials */}
                    <motion.span
                      className="text-7xl md:text-8xl font-black bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent"
                      animate={{ opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ÁF
                    </motion.span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Disponible
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {content.about.intro.headline}
                </span>
              </h2>

              <div className="space-y-4 mb-10">
                {content.about.intro.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    className="text-white/60 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Skills Section */}
      <Section className="py-20 md:py-28" style={{ background: 'rgba(139, 92, 246, 0.02)' }}>
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3 block">
              Habilidades
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {content.about.skills.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.skills.categories.map((category, i) => (
              <SkillCategory key={category.name} category={category} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience Section with Animated Timeline */}
      <Section className="py-20 md:py-28">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 block">
              Trayectoria
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {content.about.experience.title}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {content.about.experience.items.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isLast={i === content.about.experience.items.length - 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Education Section */}
      <Section className="py-20 md:py-28" style={{ background: 'rgba(6, 182, 212, 0.02)' }}>
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3 block">
              Formación
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {content.about.education.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.about.education.items.map((item, i) => (
              <motion.div
                key={i}
                className="group relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: 'rgba(6, 182, 212, 0.3)', y: -5 }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)',
                  }}
                />

                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {item.period}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50">{item.institution}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Languages & Interests */}
      <Section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Languages */}
            <motion.div
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                {content.about.languages.title}
              </h3>
              <div className="space-y-4">
                {content.about.languages.items.map((lang, i) => (
                  <motion.div
                    key={lang.language}
                    className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-white/80 font-medium">{lang.language}</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-violet-500/20 text-violet-300">
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                {content.about.interests.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {content.about.interests.items.map((interest, i) => (
                  <motion.span
                    key={interest}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-white/80 hover:border-violet-500/40 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 md:py-28">
        <Container>
          <motion.div
            className="relative text-center p-12 md:p-16 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl p-px"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #10B981 100%)',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-px rounded-3xl bg-[#0A0A0F]" />
            </motion.div>

            {/* Background glow */}
            <div
              className="absolute inset-px rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
              }}
            />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.about.cta.title}
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-lg mx-auto">
                {content.about.cta.text}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {content.about.cta.buttons.map((btn) => (
                  <Button
                    key={btn.label}
                    href={btn.href}
                    variant={btn.variant === 'primary' ? 'primary' : 'secondary'}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
