import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { content } from '../content/content'
import AlvaroPhoto from '../lib/Alvaro.jpg'

// Icons from react-icons
import { 
  SiN8N, SiZapier, SiOpenai, SiNotion, SiReact, SiTypescript, SiNodedotjs, 
  SiSupabase, SiNextdotjs, SiAstro, SiWordpress, SiTailwindcss, SiFigma, 
  SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiGit, SiShopify,
  SiGoogleanalytics, SiFramer
} from 'react-icons/si'
import { HiOutlineCog, HiOutlineCode, HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineColorSwatch, HiOutlineCollection } from 'react-icons/hi'
import { BsRobot } from 'react-icons/bs'

// ============================================
// TOOL ICON MAP
// ============================================
const toolIcons: Record<string, React.ReactNode> = {
  'n8n': <SiN8N />,
  'Make': <HiOutlineCog />,
  'Zapier': <SiZapier />,
  'OpenAI API': <SiOpenai />,
  'Notion API': <SiNotion />,
  'Webhooks': <HiOutlineLightningBolt />,
  'React': <SiReact />,
  'TypeScript': <SiTypescript />,
  'Node.js': <SiNodedotjs />,
  'Supabase': <SiSupabase />,
  'HTML/CSS': <HiOutlineCode />,
  'GPT-4': <SiOpenai />,
  'Claude': <BsRobot />,
  'Llama': <BsRobot />,
  'Prompt Engineering': <BsRobot />,
  'Integraciones LLM': <BsRobot />,
  'Next.js': <SiNextdotjs />,
  'Astro': <SiAstro />,
  'WordPress': <SiWordpress />,
  'Elementor': <SiWordpress />,
  'Tailwind CSS': <SiTailwindcss />,
  'Framer Motion': <SiFramer />,
  'Figma': <SiFigma />,
  'Photoshop': <SiAdobephotoshop />,
  'Illustrator': <SiAdobeillustrator />,
  'Premiere Pro': <SiAdobepremierepro />,
  'Diseño UI/UX': <HiOutlineColorSwatch />,
  'Git': <SiGit />,
  'Notion': <SiNotion />,
  'Shopify': <SiShopify />,
  'Google Analytics': <SiGoogleanalytics />,
  'SEO On-Page': <HiOutlineGlobe />,
  'CRM Automation': <HiOutlineCollection />,
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Automatización': <HiOutlineCog className="w-5 h-5" />,
  'Desarrollo': <HiOutlineCode className="w-5 h-5" />,
  'IA': <BsRobot className="w-5 h-5" />,
  'Web': <HiOutlineGlobe className="w-5 h-5" />,
  'Diseño': <HiOutlineColorSwatch className="w-5 h-5" />,
  'Otras': <HiOutlineCollection className="w-5 h-5" />,
}


// ============================================
// GLASS PANEL COMPONENT
// ============================================
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
    >
      {children}
    </div>
  )
}



// ============================================
// TOOL CARD - Premium tool category card
// ============================================
function ToolCard({ category, index }: { category: { name: string; items: readonly string[] }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group relative p-5 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(20, 20, 24, 0.8) 0%, rgba(10, 10, 15, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ 
        borderColor: 'rgba(6, 182, 212, 0.3)',
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.1)',
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-cyan-500/10 text-orange-400">
          {categoryIcons[category.name] || <HiOutlineCog className="w-5 h-5" />}
        </div>
        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
          {category.name}
        </h3>
      </div>

      {/* Tools grid */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((tool, i) => (
          <motion.div
            key={tool}
            className="group/tool flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
            whileHover={{ 
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(6, 182, 212, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.2, delay: index * 0.08 + i * 0.02 }}
          >
            <span className="text-cyan-400 text-sm opacity-70 group-hover/tool:opacity-100">
              {toolIcons[tool] || <HiOutlineCog />}
            </span>
            <span>{tool}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}


// ============================================
// TIMELINE ITEM - Improved with gradient line
// ============================================
function TimelineItem({ item, index, isLast }: {
  item: { period: string; role: string; company: string; description: string; highlights?: readonly string[] }
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const icons = ['⚙️', '💡', '🎨', '📊', '🚀']

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Animated gradient line */}
      {!isLast && (
        <motion.div
          className="absolute left-[15px] top-8 w-0.5 origin-top"
          style={{
            background: 'linear-gradient(to bottom, #06B6D4 0%, #f97316 50%, rgba(249, 115, 22, 0.2) 100%)',
            height: 'calc(100% - 16px)',
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        />
      )}

      {/* Node marker */}
      <motion.div
        className="absolute left-1.5 top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs"
        style={{ 
          background: 'linear-gradient(135deg, #06B6D4 0%, #f97316 100%)',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)',
        }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1, type: 'spring' }}
      >
        {icons[index % icons.length]}
      </motion.div>

      {/* Content card */}
      <GlassCard className="p-5 group hover:border-cyan-500/30 transition-all duration-300">
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
          {item.period}
        </span>
        <h3 className="text-lg font-semibold text-white mt-1.5 mb-0.5 group-hover:text-cyan-300 transition-colors">
          {item.role}
        </h3>
        <p className="text-xs text-white/40 mb-2">{item.company}</p>
        <p className="text-sm text-white/60 leading-relaxed mb-3">{item.description}</p>
        
        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.highlights.map((h, i) => (
              <span 
                key={i} 
                className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

// ============================================
// VISION CARD - For manifesto grid
// ============================================
function VisionCard({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 rounded-xl overflow-hidden cursor-default"
      style={{
        background: 'rgba(10, 10, 15, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        borderColor: 'rgba(249, 115, 22, 0.3)',
        background: 'rgba(15, 15, 20, 0.8)',
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.08) 0%, transparent 60%)',
        }}
      />
      <p className="relative text-sm md:text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors">
        "{text}"
      </p>
    </motion.div>
  )
}


// ============================================
// MAIN ABOUT PAGE
// ============================================
export function AboutPage() {
  const { about } = content

  return (
    <>
      {/* ============================================
          HERO SECTION - ShaderGradient + Photo
          ============================================ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* ShaderGradient Background */}
        <div className="absolute inset-0 z-0">
          <ShaderGradientCanvas
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            pointerEvents="none"
          >
            <ShaderGradient
              type="waterPlane"
              animate="on"
              uTime={0}
              uSpeed={0.1}
              uStrength={1.5}
              uDensity={1.2}
              uFrequency={5.5}
              uAmplitude={3}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              color1="#0a0a14"
              color2="#1a1a2e"
              color3="#16213e"
              reflection={0.1}
              wireframe={false}
              shader="defaults"
              cAzimuthAngle={180}
              cPolarAngle={90}
              cDistance={3.5}
              cameraZoom={1}
              lightType="3d"
              brightness={1}
              envPreset="city"
              grain="off"
            />
          </ShaderGradientCanvas>
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Fade-out bottom transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)' }}
        />

        {/* Content */}
        <Container className="relative z-10 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
                  {about.hero.eyebrow}
                </span>
              </div>

              {/* H1 */}
              <h1 className="mb-5">
                <span 
                  className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {about.hero.title}
                </span>
                <span 
                  className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-1"
                  style={{ 
                    fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
                    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))',
                  }}
                >
                  {about.hero.titleAccent}
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {about.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button href="/proyectos" variant="primary">
                  Ver proyectos
                </Button>
                <Button href="https://wa.me/34684005952" variant="secondary">
                  Contactar
                </Button>
              </div>
            </motion.div>

            {/* Right: Photo */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #06B6D4 0%, #f97316 50%, #06B6D4 100%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Photo container */}
                <div className="relative p-1.5 rounded-2xl bg-[#0a0a0f]">
                  <img
                    src={AlvaroPhoto}
                    alt="Álvaro Fernández"
                    className="w-64 h-80 md:w-72 md:h-96 object-cover rounded-xl"
                  />
                  
                  {/* Glass overlay effect */}
                  <div 
                    className="absolute inset-1.5 rounded-xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(10, 10, 15, 0.5) 100%)',
                    }}
                  />
                </div>

                {/* Disponible badge */}
                <motion.div
                  className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full backdrop-blur-md"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Disponible
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>


      {/* ============================================
          HISTORIA / PERFIL SECTION
          ============================================ */}
      <Section className="py-16 md:py-24" style={{ background: '#0a0a0f' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            
            {/* Left: Main text (3 cols) */}
            <div className="lg:col-span-3">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {about.intro.headline}
              </motion.h2>

              <div className="space-y-5">
                {about.intro.paragraphs.map((p, i) => {
                  // Add highlights to specific phrases
                  let enhanced: string = String(p)
                  if (i === 0) {
                    enhanced = enhanced.replace('Impale Clothing', '<highlight>Impale Clothing</highlight>')
                      .replace('1.800 seguidores', '<highlight>1.800 seguidores</highlight>')
                  }
                  if (i === 1) {
                    enhanced = enhanced.replace('4 años', '<highlight>4 años</highlight>')
                      .replace('6.800 seguidores', '<highlight>6.800 seguidores</highlight>')
                  }
                  if (i === 2) {
                    enhanced = enhanced.replace('la tecnología solo vale si mejora el negocio', '<highlight>la tecnología solo vale si mejora el negocio</highlight>')
                  }
                  if (i === 3) {
                    enhanced = enhanced.replace('código, IA y diseño', '<highlight>código, IA y diseño</highlight>')
                  }

                  return (
                    <motion.p
                      key={i}
                      className="text-sm md:text-base text-white/55 leading-relaxed"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      dangerouslySetInnerHTML={{
                        __html: enhanced.replace(/<highlight>(.*?)<\/highlight>/g, 
                          '<span class="text-orange-400 font-medium">$1</span>')
                      }}
                    />
                  )
                })}
              </div>

              {/* Mini CTA */}
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href="/proyectos" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                >
                  Ver mis proyectos
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Right: Photo card (2 cols) - Only on desktop */}
            <motion.div 
              className="hidden lg:block lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-5 sticky top-24">
                <img
                  src={AlvaroPhoto}
                  alt="Álvaro Fernández"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Álvaro Fernández</h3>
                  <p className="text-xs text-white/50">Consultor de Automatización & Estratega Digital</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
                      Automatización
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                      IA Aplicada
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                      Web & Diseño
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ============================================
          VISIÓN Y VALORES SECTION (NEW)
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}>
        <Container>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2 block">
              Filosofía
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {about.vision.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {about.vision.items.map((item, i) => (
              <VisionCard key={i} text={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>


      {/* ============================================
          HERRAMIENTAS SECTION
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: '#0a0a0f' }}>
        <Container>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2 block">
              Stack
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {about.skills.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {about.skills.categories.map((category, i) => (
              <ToolCard key={category.name} category={category} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================
          TRAYECTORIA SECTION
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0b0b10 100%)' }}>
        <Container>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2 block">
              Experiencia
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {about.experience.title}
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {about.experience.items.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isLast={i === about.experience.items.length - 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================
          FORMACIÓN SECTION
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: '#0a0a0f' }}>
        <Container>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2 block">
              Educación
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {about.education.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {about.education.items.map((item, i) => (
              <motion.div
                key={i}
                className="group p-5 rounded-xl"
                style={{
                  background: 'rgba(15, 15, 20, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ borderColor: 'rgba(249, 115, 22, 0.25)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎓</span>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/40">{item.institution}</p>
                {item.note && (
                  <p className="text-[10px] text-white/30 mt-2 italic">{item.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>


      {/* ============================================
          IDIOMAS & EXTRAS (Compact row)
          ============================================ */}
      <Section className="py-10 md:py-14" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Idiomas */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span>🌍</span> {about.languages.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.languages.items.map((lang, i) => (
                  <span 
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10"
                  >
                    {lang.language} · <span className="text-cyan-400">{lang.level}</span>
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Extras */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span>📋</span> {about.extras.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.extras.items.map((item, i) => (
                  <span 
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: '#0a0a0f' }}>
        <Container>
          <motion.div
            className="relative text-center p-10 md:p-14 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl p-px"
              style={{
                background: 'linear-gradient(135deg, #06B6D4 0%, #f97316 50%, #06B6D4 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-px rounded-2xl bg-[#0a0a0f]" />
            </motion.div>

            {/* Background glow */}
            <div
              className="absolute inset-px rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(249, 115, 22, 0.05) 100%)',
              }}
            />

            <div className="relative">
              <h2 
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {about.cta.title}
              </h2>
              <p className="text-sm md:text-base text-white/50 mb-6 max-w-md mx-auto">
                {about.cta.text}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {about.cta.buttons.map((btn) => (
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
