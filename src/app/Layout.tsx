import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { content } from '../content/content'

// ============================================
// ANIMATED NAV LINK WITH UNDERLINE
// ============================================
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      to={href}
      className="relative text-sm font-medium py-2 px-1 group"
    >
      <span className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
        {label}
      </span>
      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet to-cyan transition-all duration-300 ease-out ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

// ============================================
// HAMBURGER ICON WITH MORPH ANIMATION
// ============================================
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-6 h-0.5 bg-current rounded-full origin-center"
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="w-6 h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-6 h-0.5 bg-current rounded-full origin-center"
      />
    </div>
  )
}

// ============================================
// WHATSAPP BUTTON WITH PULSE
// ============================================
function WhatsAppButton({ href, className = '' }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/90 hover:bg-emerald text-white text-sm font-medium transition-all duration-300 hover:scale-105 ${className}`}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-20" />
      <span className="absolute inset-0 rounded-full bg-emerald/50 animate-pulse" style={{ animationDuration: '2s' }} />

      {/* Icon */}
      <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="relative z-10">WhatsApp</span>
    </a>
  )
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ============================================
// MAIN LAYOUT COMPONENT
// ============================================
export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  // Scroll detection for header effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 50)

      // Hide/show header on scroll direction (only on mobile or when scrolled far)
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 10) {
          setHidden(true)
        } else if (lastScrollY.current - currentScrollY > 10) {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: hidden ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/70 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Container>
          <nav className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}>
            {/* Logo with glow effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <Logo />
            </motion.div>

            {/* Desktop Navigation with active indicator */}
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

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <WhatsAppButton href={content.site.whatsappUrl} />
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
          </nav>
        </Container>

        {/* Mobile Menu - Full screen overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-14 bg-bg/98 backdrop-blur-2xl z-40"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan/10 rounded-full blur-[100px]" />
              </div>

              <Container>
                <nav className="relative flex flex-col justify-center min-h-[calc(100vh-3.5rem)] py-8">
                  <ul className="space-y-2">
                    {content.nav.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-4 text-3xl font-display font-bold tracking-tight transition-all duration-300 ${
                            location.pathname === item.href
                              ? 'text-white'
                              : 'text-white/40 hover:text-white hover:translate-x-2'
                          }`}
                        >
                          <span className="inline-block">
                            {item.label}
                          </span>
                          {location.pathname === item.href && (
                            <motion.span
                              layoutId="mobile-active"
                              className="inline-block ml-3 w-2 h-2 bg-primary rounded-full"
                            />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="mt-12"
                  >
                    <WhatsAppButton href={content.site.whatsappUrl} className="w-full justify-center py-4 text-base" />
                  </motion.div>

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-8 flex items-center gap-6 text-white/40"
                  >
                    {content.footer.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                </nav>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-20 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.05] py-12 md:py-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <Container>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 sm:px-0">
            {/* Brand column */}
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-white/50 max-w-xs">
                {content.site.tagline}
              </p>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Navegación</h4>
              <ul className="space-y-2">
                {content.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Conecta</h4>
              <div className="flex items-center gap-4">
                {content.footer.links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    title={link.label}
                  >
                    {link.label === 'LinkedIn' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {link.label === 'GitHub' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {link.label === 'Behance' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.08-.16 1.44-.465.36-.31.54-.753.54-1.33 0-.35-.06-.64-.18-.87a1.39 1.39 0 00-.48-.56 1.98 1.98 0 00-.7-.305 3.56 3.56 0 00-.84-.09H3.38v3.62h3.165zm.34 5.75c.32 0 .62-.04.92-.12.3-.08.57-.21.8-.39.23-.17.42-.4.55-.69.13-.29.2-.65.2-1.06 0-.83-.23-1.44-.68-1.81-.46-.38-1.07-.56-1.84-.56H3.38v4.63h3.505zM15.29 4.52h6.04v1.57h-6.04V4.52zm3.02 12.74c.43.34 1.02.51 1.78.51.54 0 1.01-.13 1.42-.39.41-.26.67-.55.8-.86h2.62c-.42 1.26-1.05 2.17-1.9 2.72-.84.55-1.86.82-3.06.82-.82 0-1.58-.14-2.25-.42a4.98 4.98 0 01-1.73-1.2 5.54 5.54 0 01-1.1-1.87c-.26-.74-.39-1.55-.39-2.44 0-.87.13-1.67.4-2.4.27-.74.66-1.38 1.15-1.9.49-.53 1.08-.94 1.76-1.23.68-.28 1.44-.43 2.26-.43.93 0 1.74.18 2.44.55.7.38 1.28.88 1.73 1.53.45.65.78 1.39.98 2.24.2.84.27 1.73.22 2.65h-7.87c.03.89.33 1.58.77 1.92zm3.07-5.68c-.35-.32-.92-.49-1.59-.49-.44 0-.81.08-1.12.23-.31.15-.56.34-.76.56-.2.22-.34.47-.44.74-.09.27-.15.53-.17.79h5.04c-.08-.7-.31-1.24-.66-1.58l-.3-.25z"/>
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-white/40">{content.footer.location}</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-12 pt-8 border-t border-white/[0.05]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 px-4 sm:px-0">
              <p>{content.footer.copyright}</p>
              <p className="flex items-center gap-2">
                {content.footer.tagline}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              </p>
            </div>
          </div>
        </Container>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}
