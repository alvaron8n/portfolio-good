import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Layout } from './Layout'
import { Home } from '../pages/Home'
import { ServicesPage } from '../pages/ServicesPage'
import { Projects } from '../pages/Projects'
import { AboutPage } from '../pages/AboutPage'
import { Contact } from '../pages/Contact'

// Project detail pages
import { ProjectCRM } from '../pages/projects/ProjectCRM'
import { ProjectWebsLocales } from '../pages/projects/ProjectWebsLocales'
import { ProjectBranding } from '../pages/projects/ProjectBranding'
import { ProjectEcommerce } from '../pages/projects/ProjectEcommerce'

// Scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.3 }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Animated routes component
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/servicios" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ServicesPage />
              </motion.div>
            } />
            <Route path="/proyectos" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/sobre-mi" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AboutPage />
              </motion.div>
            } />
            <Route path="/contacto" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Contact />
              </motion.div>
            } />

            {/* Project detail pages */}
            <Route path="/proyectos/crm-automatizacion" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCRM />
              </motion.div>
            } />
            <Route path="/proyectos/webs-locales" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectWebsLocales />
              </motion.div>
            } />
            <Route path="/proyectos/branding" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectBranding />
              </motion.div>
            } />
            <Route path="/proyectos/ecommerce-propio" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectEcommerce />
              </motion.div>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
