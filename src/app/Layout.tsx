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

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>

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
