import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
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

// Animated routes component
function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/contacto" element={<Contact />} />

          {/* Project detail pages */}
          <Route path="/proyectos/crm-automatizacion" element={<ProjectCRM />} />
          <Route path="/proyectos/webs-locales" element={<ProjectWebsLocales />} />
          <Route path="/proyectos/branding" element={<ProjectBranding />} />
          <Route path="/proyectos/ecommerce-propio" element={<ProjectEcommerce />} />
        </Route>
      </Routes>
    </>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
