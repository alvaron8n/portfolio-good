import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { content } from '../content/content'

// ============================================
// ANIMATED NAV LINK
// ============================================
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      to={href}
      className="relative font-mono text-xs uppercase tracking-wider py-2 px-4 rounded transition-all duration-300 group overflow-hidden"
    >
      <span className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {isActive && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />
        </>
      )}
      <span className={`relative z-10 transition-colors duration-300 ${
        isActive ? 'text-orange-500' : 'text-white/60 group-hover:text-white'
      }`}>
        {isActive ? `> ${label}` : label}
      </span>
    </Link>
  )
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 h-[1px] bg-orange-500 origin-left shadow-[0_0_10px_rgba(249,115,22,0.5)]"
      style={{ scaleX }}
    />
  )
}

// ============================================
// HAMBURGER ICON
// ============================================
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-center items-center relative">
      <span
        className={`absolute w-6 h-0.5 bg-orange-500 rounded-full transition-all duration-300 ease-out ${
          isOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-0'
        }`}
      />
      <span
        className={`absolute w-6 h-0.5 bg-orange-500 rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      />
      <span
        className={`absolute w-6 h-0.5 bg-orange-500 rounded-full transition-all duration-300 ease-out ${
          isOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-0'
        }`}
      />
    </div>
  )
}

// ============================================
// MOBILE MENU CONTENT - PREMIUM MINIMAL DESIGN
// ============================================
function MobileMenuContent({ onClose }: { onClose: () => void }) {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!containerRef.current || !linksRef.current) return

    const ctx = gsap.context(() => {
      // Animate the accent line
      gsap.fromTo('.menu-accent-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power4.out', delay: 0.3 }
      )

      // Animate nav links with elegant stagger
      gsap.fromTo(linksRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )

      // Animate CTA
      gsap.fromTo('.menu-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.6 }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex flex-col overflow-hidden bg-white"
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(249,115,22,0.03) 0%, transparent 40%, rgba(249,115,22,0.02) 100%)'
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-gray-900">ÁF</span>
          <div className="w-px h-6 bg-gray-200" />
          <span className="text-xs font-medium text-orange-500 tracking-widest uppercase">Menú</span>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 active:bg-gray-50 transition-colors"
          aria-label="Cerrar menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Orange accent line */}
      <div className="px-6">
        <div 
          className="menu-accent-line h-px origin-left"
          style={{ background: 'linear-gradient(90deg, #f97316 0%, #fbbf24 50%, transparent 100%)' }}
        />
      </div>

      {/* Navigation Links */}
      <nav className="relative flex-1 flex flex-col justify-center px-6">
        <ul ref={linksRef} className="space-y-1">
          {content.nav.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="group relative flex items-center py-5 transition-all duration-300"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavMobile"
                      className="absolute left-0 w-1 h-8 rounded-full bg-gradient-to-b from-orange-500 to-amber-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <span 
                    className={`text-3xl font-semibold tracking-tight transition-all duration-300 ${
                      isActive 
                        ? 'text-gray-900 pl-5' 
                        : 'text-gray-400 group-active:text-gray-600'
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.label}
                  </span>

                  {/* Arrow on active */}
                  {isActive && (
                    <svg 
                      className="ml-auto w-5 h-5 text-orange-500"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>

                {/* Separator line */}
                <div className="h-px bg-gray-100" />
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom CTA */}
      <div className="menu-cta relative px-6 pb-8 pt-4">
        <a
          href={content.site.calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl text-white transition-all duration-300 active:scale-[0.98]"
          style={{ 
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          }}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Agenda una llamada</span>
            <span className="text-lg font-semibold">Hablemos de tu proyecto</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-gray-400">Disponible para nuevos proyectos</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MOBILE MENU PORTAL
// ============================================
function MobileMenuPortal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[9999]"
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <MobileMenuContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ============================================
// HEADER
// ============================================
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isProjectPage = location.pathname.startsWith('/proyectos/') && location.pathname !== '/proyectos'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4"
      >
        <nav
          className={`relative flex items-center justify-between px-4 rounded border transition-all duration-500 ${
            isScrolled
              ? 'h-11 border-orange-900/20 bg-[#030304]/95 shadow-[0_0_15px_rgba(0,0,0,0.4)]'
              : 'h-12 border-white/[0.04] bg-[#030304]/80'
          }`}
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-orange-500/40" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-orange-500/40" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-orange-500/40" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-orange-500/40" />

          {/* Logo */}
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 border-l border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500/80 tracking-widest">DISPONIBLE</span>
            </div>
          </div>

          {/* Breadcrumb */}
          {isProjectPage && (
            <Link
              to="/proyectos"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors border border-orange-900/30 rounded bg-orange-950/10"
            >
              <span>{`<`}</span>
              <span>VOLVER</span>
            </Link>
          )}

          {/* Desktop Nav */}
          {!isProjectPage && (
            <ul className="hidden md:flex items-center gap-1">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} label={item.label} isActive={location.pathname === item.href} />
                </li>
              ))}
            </ul>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href={content.site.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 font-mono text-xs font-bold text-black bg-orange-400 hover:bg-orange-300 transition-colors rounded-lg"
            >
              HABLEMOS
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 text-orange-400 active:text-orange-300"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>

          {isScrolled && <ScrollProgress />}
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenuPortal isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}

// ============================================
// SCROLL TO TOP
// ============================================
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Volver arriba"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,black,transparent)] pointer-events-none" />

      <div className="py-16 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12 mb-12">
            <div className="md:col-span-2 flex flex-col items-start gap-6">
              <Logo />
              <p className="font-mono text-xs text-white/40 max-w-xs leading-relaxed">
                Automatización · Desarrollo · IA<br/>
                Madrid, España
              </p>
              <p className="text-sm text-white/60 max-w-sm">{content.footer.tagline}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Navegación</h4>
              {content.nav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-white/20 group-hover:bg-orange-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Conectar</h4>
              {content.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[10px] text-white/20 group-hover:text-orange-400 font-mono transition-colors">→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/30 uppercase tracking-wider">
            <span>{content.footer.copyright}</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
              Disponible para proyectos
            </span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

// ============================================
// LAYOUT
// ============================================
export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
