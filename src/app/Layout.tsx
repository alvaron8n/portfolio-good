import { useState, useEffect } from 'react'
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
      className="relative font-body text-sm font-medium py-2 px-3 rounded-full transition-all duration-300 group"
    >
      {/* Hover background */}
      <span className="absolute inset-0 bg-white/[0.08] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Text */}
      <span className={`relative z-10 transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-white/50 group-hover:text-white'
      }`}>
        {label}
      </span>
      
      {/* Writing underline effect */}
      <span 
        className={`absolute bottom-1 left-3 h-[2px] bg-gradient-to-r from-violet to-cyan rounded-full transition-all duration-500 ease-out ${
          isActive ? 'right-3' : 'right-full group-hover:right-3'
        }`}
      />
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
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet via-cyan to-violet origin-left"
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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Determine if we're on a project page for breadcrumb
  const isProjectPage = location.pathname.startsWith('/proyectos/') && location.pathname !== '/proyectos'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <nav 
          className={`relative flex items-center gap-1 px-2 rounded-full border transition-all duration-500 ${
            isScrolled 
              ? 'h-10 border-white/15 bg-[#050510]/90 shadow-lg shadow-black/20' 
              : 'h-11 border-white/10 bg-[#050510]/70'
          }`}
          style={{ 
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
          }}
        >
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-2">
            <Logo />
          </motion.div>

          {/* Breadcrumb for project pages */}
          {isProjectPage && (
            <>
              <div className="w-px h-5 bg-white/10 hidden md:block" />
              <Link 
                to="/proyectos"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Proyectos</span>
              </Link>
            </>
          )}

          {/* Main Nav - Hidden on project pages to save space */}
          {!isProjectPage && (
            <>
              <div className="w-px h-5 bg-white/10 hidden md:block" />
              <ul className="hidden md:flex items-center">
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
            </>
          )}

          <div className="w-px h-5 bg-white/10 hidden md:block" />

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href={content.site.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Reservar</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            <HamburgerIcon isOpen={mobileMenuOpen} />
          </motion.button>

          {/* Progress bar when scrolled */}
          {isScrolled && <ScrollProgress />}
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-40 bg-[#050508]/98 backdrop-blur-3xl pt-24"
            >
              <nav className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-6">
                <ul className="flex flex-col items-center gap-6">
                  {content.nav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-4xl font-display font-bold tracking-tight transition-colors ${
                          location.pathname === item.href
                            ? 'text-white'
                            : 'text-white/30 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href={content.site.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Reservar llamada
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
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
    <footer className="border-t border-white/[0.05]">
      {/* Mini CTA */}
      <div className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              {content.footer.cta.line}
              <span className="font-accent text-violet-400 ml-2 inline-block rotate-3">
                {content.footer.cta.accent}
              </span>
            </p>
            
            <a
              href={content.footer.cta.button.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-[#050508] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {content.footer.cta.button.label}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-xs text-white/30">{content.footer.copyright}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {content.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
