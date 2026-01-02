import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { ProfileCard } from '../components/ui/ProfileCard'
import { content } from '../content/content'
import AlvaroPhoto from '../lib/Alvaro.jpg'

// Icons
import { 
  SiN8N, SiZapier, SiOpenai, SiNotion, SiReact, SiTypescript, SiNodedotjs, 
  SiSupabase, SiNextdotjs, SiAstro, SiWordpress, SiTailwindcss, SiFigma, 
  SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiGit, SiShopify,
  SiGoogleanalytics, SiFramer, SiLinkedin, SiWhatsapp
} from 'react-icons/si'
import { HiOutlineCog, HiOutlineCode, HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineColorSwatch, HiOutlineCollection, HiOutlineMail } from 'react-icons/hi'
import { BsRobot } from 'react-icons/bs'

// ============================================
// TOOL ICONS MAP
// ============================================
const toolIcons: Record<string, React.ReactNode> = {
  'n8n': <SiN8N />, 'Make': <HiOutlineCog />, 'Zapier': <SiZapier />,
  'OpenAI API': <SiOpenai />, 'Notion API': <SiNotion />, 'Webhooks': <HiOutlineLightningBolt />,
  'React': <SiReact />, 'TypeScript': <SiTypescript />, 'Node.js': <SiNodedotjs />,
  'Supabase': <SiSupabase />, 'HTML/CSS': <HiOutlineCode />, 'GPT-4': <SiOpenai />,
  'Claude': <BsRobot />, 'Llama': <BsRobot />, 'Prompt Engineering': <BsRobot />,
  'Integraciones LLM': <BsRobot />, 'Next.js': <SiNextdotjs />, 'Astro': <SiAstro />,
  'WordPress': <SiWordpress />, 'Elementor': <SiWordpress />, 'Tailwind CSS': <SiTailwindcss />,
  'Framer Motion': <SiFramer />, 'Figma': <SiFigma />, 'Photoshop': <SiAdobephotoshop />,
  'Illustrator': <SiAdobeillustrator />, 'Premiere Pro': <SiAdobepremierepro />,
  'Diseño UI/UX': <HiOutlineColorSwatch />, 'Git': <SiGit />, 'Notion': <SiNotion />,
  'Shopify': <SiShopify />, 'Google Analytics': <SiGoogleanalytics />,
  'SEO On-Page': <HiOutlineGlobe />, 'CRM Automation': <HiOutlineCollection />,
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
// ANIMATED MESH GRADIENT BACKGROUND
// ============================================
function MeshGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0a0a12 0%, #0c0c18 50%, #0a0a14 100%)' }}
      />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          top: '20%',
          right: '-5%',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          bottom: '10%',
          left: '30%',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}


// ============================================
// GLASS CARD COMPONENT
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
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-cyan-500/10 text-orange-400">
          {categoryIcons[category.name] || <HiOutlineCog className="w-5 h-5" />}
        </div>
        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
          {category.name}
        </h3>
      </div>

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
// TIMELINE ITEM
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
// PREMIUM VISION CARD - Enhanced with 3D effect
// ============================================
function VisionCard({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const icons = ['💡', '🎯', '🧠', '⚡']

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(145deg, rgba(18, 18, 24, 0.9) 0%, rgba(10, 10, 14, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      }}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 8px 40px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Spotlight effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.12), transparent 50%)`,
          }}
        />
      )}

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.span 
          className="text-2xl mb-3 block"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {icons[index % icons.length]}
        </motion.span>
        <p 
          className="text-sm md:text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          "{text}"
        </p>
      </div>

      {/* Bottom line accent on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent, #f97316, #06B6D4, transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}


// ============================================
// MAIN ABOUT PAGE
// ============================================
export function AboutPage() {
  const { about } = content

  // ProfileCard skills
  const profileSkills = [
    { name: 'n8n', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'OpenAI', icon: <SiOpenai className="w-4 h-4 text-emerald-400" /> },
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/alvaro-fp', icon: <SiLinkedin className="w-4 h-4 text-white/70 hover:text-white" /> },
    { name: 'WhatsApp', url: 'https://wa.me/34684005952', icon: <SiWhatsapp className="w-4 h-4 text-white/70 hover:text-white" /> },
    { name: 'Email', url: 'mailto:alferpri@gmail.com', icon: <HiOutlineMail className="w-4 h-4 text-white/70 hover:text-white" /> },
  ]

  return (
    <>
      {/* ============================================
          HERO SECTION - Sin foto, con mesh gradient
          ============================================ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <MeshGradientBg />

        {/* Fade-out bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)' }}
        />

        <Container className="relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div 
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.25em]">
                {about.hero.eyebrow}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span 
                className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {about.hero.title}
              </span>
              <span 
                className="block text-3xl md:text-4xl lg:text-5xl font-bold mt-2"
                style={{ 
                  fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 40%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(249, 115, 22, 0.4))',
                }}
              >
                {about.hero.titleAccent}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-base md:text-lg text-white/55 leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {about.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button href="/proyectos" variant="primary">
                Ver proyectos
              </Button>
              <Button href="https://wa.me/34684005952" variant="secondary">
                Contactar
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>


      {/* ============================================
          HISTORIA / PERFIL SECTION - Con ProfileCard
          ============================================ */}
      <Section className="py-16 md:py-24" style={{ background: '#0a0a0f' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            
            {/* Left: ProfileCard (2 cols) */}
            <motion.div 
              className="lg:col-span-2 flex justify-center lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCard
                spotlight={true}
                spotlightColor="249, 115, 22"
                img={AlvaroPhoto}
                name="Álvaro Fernández"
                position="Consultor de Automatización & Estratega Digital"
                bio="Combino visión de negocio con código, IA y diseño. Vengo de montar mis propios proyectos, no solo de tutoriales."
                skills={profileSkills}
                socialLinks={socialLinks}
              />
            </motion.div>

            {/* Right: Main text (3 cols) */}
            <div className="lg:col-span-3">
              {/* Headline with accent */}
              <motion.h2 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span 
                  className="block text-xl md:text-2xl text-white/80 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Vengo del
                </span>
                <span 
                  className="block text-3xl md:text-4xl font-bold"
                  style={{ 
                    fontFamily: "'BBH Bartle', 'Space Grotesk', sans-serif",
                    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  negocio real.
                </span>
                <span 
                  className="block text-lg md:text-xl text-white/50 mt-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  No solo de tutoriales.
                </span>
              </motion.h2>

              <div className="space-y-5">
                {about.intro.paragraphs.map((p, i) => {
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
          </div>
        </Container>
      </Section>

      {/* ============================================
          VISIÓN Y VALORES SECTION - Premium cards
          ============================================ */}
      <Section className="py-14 md:py-20" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}>
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2 block">
              Filosofía
            </span>
            <h2 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {about.vision.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
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
          IDIOMAS & EXTRAS
          ============================================ */}
      <Section className="py-10 md:py-14" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
