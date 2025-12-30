import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { Layout } from './Layout'
import { PageLoader } from '../components/ui/loader'

// Lazy load pages using named exports
const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })))
const ServicesPage = lazy(() => import('../pages/ServicesPage').then(module => ({ default: module.ServicesPage })))
const Projects = lazy(() => import('../pages/Projects').then(module => ({ default: module.Projects })))
const AboutPage = lazy(() => import('../pages/AboutPage').then(module => ({ default: module.AboutPage })))
const Contact = lazy(() => import('../pages/Contact').then(module => ({ default: module.Contact })))

// Lazy load project detail pages
const ProjectCRM = lazy(() => import('../pages/projects/ProjectCRM').then(module => ({ default: module.ProjectCRM })))
const ProjectWebsLocales = lazy(() => import('../pages/projects/ProjectWebsLocales').then(module => ({ default: module.ProjectWebsLocales })))
const ProjectBranding = lazy(() => import('../pages/projects/ProjectBranding').then(module => ({ default: module.ProjectBranding })))
const ProjectEcommerce = lazy(() => import('../pages/projects/ProjectEcommerce').then(module => ({ default: module.ProjectEcommerce })))

// Scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// Reusable Page Wrapper for transitions
function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
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
              <PageWrapper>
                <Home />
              </PageWrapper>
            } />
            <Route path="/servicios" element={
              <PageWrapper>
                <ServicesPage />
              </PageWrapper>
            } />
            <Route path="/proyectos" element={
              <PageWrapper>
                <Projects />
              </PageWrapper>
            } />
            <Route path="/sobre-mi" element={
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            } />
            <Route path="/contacto" element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            } />

            {/* Project detail pages */}
            <Route path="/proyectos/crm-automatizacion" element={
              <PageWrapper>
                <ProjectCRM />
              </PageWrapper>
            } />
            <Route path="/proyectos/webs-locales" element={
              <PageWrapper>
                <ProjectWebsLocales />
              </PageWrapper>
            } />
            <Route path="/proyectos/branding" element={
              <PageWrapper>
                <ProjectBranding />
              </PageWrapper>
            } />
            <Route path="/proyectos/ecommerce-propio" element={
              <PageWrapper>
                <ProjectEcommerce />
              </PageWrapper>
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
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
