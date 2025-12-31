import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { content } from '../content/content'

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)'
  },
  enter: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'beforeChildren' as const,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    filter: 'blur(5px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
}

// ============================================
// ANIMATED NAV LINK WITH WRITING UNDERLINE
// ============================================
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      to={href}
      className="relative font-mono text-xs uppercase tracking-wider py-2 px-4 rounded transition-all duration-300 group overflow-hidden"
    >
      {/* Hover background */}
      <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Active Bracket Indicators */}
      {isActive && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
        </>
      )}

      {/* Text */}
      <span className={`relative z-10 transition-colors duration-300 ${
        isActive ? 'text-cyan-400' : 'text-white/60 group-hover:text-white'
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
      className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400 origin-left shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      style={{ scaleX }}
    />
  )
}

// ============================================
// HAMBURGER ICON
// ============================================
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-6 h-0.5 bg-current rounded-full origin-center"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="w-6 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-6 h-0.5 bg-current rounded-full origin-center"
      />
    </div>
  )
}

// ============================================
// MOBILE DRAWER MENU (PREMIUM - PORTAL BASED)
// ============================================
function MobileDrawerMenu({ 
  isOpen, 
  onClose, 
  currentPath 
}: { 
  isOpen: boolean
  onClose: () => void
  currentPath: string 
}) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/60"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            aria-hidden="true"
          />

          {/* Drawer panel from top */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed top-0 left-0 right-0 z-[9999] max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Glass panel */}
            <div 
              className="relative mx-4 mt-4 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
              style={{ 
                background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(5,5,10,0.98) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />
              
              {/* Decorative glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-40 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />

              {/* Header row */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ÁF</span>
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400 tracking-widest">ONLINE</span>
                  </div>
                </div>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Navigation links */}
              <nav className="px-6 py-6">
                <ul className="flex flex-col gap-1">
                  {content.nav.map((item, index) => {
                    const isActive = currentPath === item.href
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ 
                          delay: 0.1 + index * 0.05, 
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/20' 
                              : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          {/* Index number */}
                          <span className={`font-mono text-xs w-6 transition-colors ${
                            isActive ? 'text-orange-500' : 'text-white/30 group-hover:text-orange-400'
                          }`}>
                            0{index + 1}
                          </span>
                          
                          {/* Label */}
                          <span 
                            className={`text-2xl font-semibold tracking-tight transition-colors ${
                              isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                            }`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {item.label}
                          </span>
                          
                          {/* Active indicator */}
                          {isActive && (
                            <motion.span
                              layoutId="mobileNavActive"
                              className="ml-auto w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"
                            />
                          )}
                          
                          {/* Arrow on hover */}
                          {!isActive && (
                            <span className="ml-auto text-white/0 group-hover:text-white/40 transition-colors">
                              →
                            </span>
                          )}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* CTA Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="px-6 pb-6"
              >
                <a
                  href={content.site.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl overflow-hidden"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {/* Button gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <svg className="relative z-10 w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span className="relative z-10 text-white font-semibold">Reservar llamada</span>
                </a>
                
                {/* Secondary CTA */}
                <a
                  href={`mailto:${content.site.email}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Escribir email</span>
                </a>
              </motion.div>

              {/* Footer info */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/30 tracking-wider">
                  © 2025 ÁF
                </span>
                <div className="flex items-center gap-4">
                  <a href={content.site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href={content.site.social.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-orange-500/20" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Render via portal to escape stacking context
  if (typeof document === 'undefined') return null
  return createPortal(menuContent, document.body)
}

// ============================================
// CONTEXT-AWARE HEADER
// ============================================
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Determine if we're on a project page for breadcrumb
  const isProjectPage = location.pathname.startsWith('/proyectos/') && location.pathname !== '/proyectos'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
      >
        <nav
          className={`relative flex items-center justify-between px-4 rounded border transition-all duration-500 ${
            isScrolled
              ? 'h-14 border-cyan-900/30 bg-[#030304]/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
              : 'h-16 border-white/5 bg-[#030304]/60'
          }`}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Tech Decor */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />

          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Logo />
            </motion.div>
            
            {/* System Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 border-l border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500/80 tracking-widest">ONLINE</span>
            </div>
          </div>

          {/* Breadcrumb for project pages */}
          {isProjectPage && (
            <Link
              to="/proyectos"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-900/30 rounded bg-cyan-950/10"
            >
              <span className="text-[10px]">{`<`}</span>
              <span>RETURN_TO_BASE</span>
            </Link>
          )}

          {/* Main Nav - Hidden on project pages to save space */}
          {!isProjectPage && (
            <ul className="hidden md:flex items-center gap-1">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    isActive={location.pathname === item.href}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-4">
            {/* CTA */}
            <div className="hidden md:block">
              <a
                href={content.site.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-2 overflow-hidden font-mono text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors clip-path-slant"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
              >
                <span>INITIATE_CONTACT</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </a>
            </div>

            {/* Mobile Menu Button - 44px tap target */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>

          {/* Progress bar when scrolled */}
          {isScrolled && <ScrollProgress />}
        </nav>
      </motion.header>

      {/* Mobile Menu - Rendered via Portal (outside header stacking context) */}
      <MobileDrawerMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        currentPath={location.pathname}
      />
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
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
// FOOTER - MINIMAL
// ============================================
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050508] relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,black,transparent)] pointer-events-none" />

      <div className="py-16 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12 mb-12">
            
            {/* Column 1: Identity */}
            <div className="md:col-span-2 flex flex-col items-start gap-6">
              <Logo />
              <p className="font-mono text-xs text-white/40 max-w-xs leading-relaxed">
                {`// SYSTEM STATUS: OPTIMAL`}<br/>
                {`// LOCATION: MADRID, ES`}<br/>
                {`// VERSION: 2026.1.0`}
              </p>
              <p className="text-sm text-white/60 max-w-sm">
                {content.footer.tagline}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs text-cyan-500 uppercase tracking-widest mb-2">Navigation</h4>
              {content.nav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Column 3: Connect */}
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-xs text-cyan-500 uppercase tracking-widest mb-2">Connect_Node</h4>
              {content.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[10px] text-white/20 group-hover:text-cyan-400 font-mono transition-colors">0{link.href.length % 9}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/30 uppercase tracking-wider">
            <span>{content.footer.copyright}</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 border border-white/20 rounded-full" />
              All Systems Operational
            </span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

// ============================================
// MAIN LAYOUT WITH PAGE TRANSITIONS
// ============================================
export function Layout() {
  const location = useLocation()

  // Scroll to top on route change
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
