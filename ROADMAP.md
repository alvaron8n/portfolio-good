# ROADMAP.md — Portfolio Alvaro Fernandez

## Vision

Transformar el portfolio actual en una experiencia web de nivel agencia: rápido (Lighthouse >90), visualmente impactante, accesible, y fácil de mantener.

---

## Fase 0: Critical Fixes (Bloquean Deploy)

**Objetivo**: Bundle < 400KB, LCP < 3s

| ID | Tarea | Archivo(s) | Esfuerzo | Impacto |
|----|-------|------------|----------|---------|
| P0-1 | Implementar React.lazy() en Router | `Router.tsx` | Medio | -300KB bundle inicial |
| P0-2 | Añadir Suspense wrapper con PageLoader | `Router.tsx` | Bajo | UX durante carga |
| P0-3 | Reducir imágenes Hero de 18 a 10-12 | `Hero.tsx`, `content.ts` | Bajo | -40% requests |
| P0-4 | Añadir loading="lazy" a imágenes | `hero-parallax.tsx`, `BrandingGalleryMarquee.tsx` | Bajo | LCP mejora |
| P0-5 | Extraer PageTransitionWrapper reutilizable | `Router.tsx` | Bajo | -100 líneas código |

**Checklist Done**:
- [ ] `npm run build` < 400KB
- [ ] Lighthouse Performance > 70
- [ ] No hay 18+ imágenes cargando en paralelo
- [ ] Las rutas cargan on-demand

---

## Fase 1: CSS Architecture

**Objetivo**: Eliminar CSS inline, unificar tokens

| ID | Tarea | Archivo(s) | Esfuerzo | Impacto |
|----|-------|------------|----------|---------|
| P1-1 | Extraer variables CSS de ProjectCRM | `ProjectCRM.tsx` → `project-detail.css` | Alto | Mantenibilidad |
| P1-2 | Extraer variables CSS de ProjectBranding | `ProjectBranding.tsx` → `project-detail.css` | Medio | Consistencia |
| P1-3 | Crear componentes compartidos para project pages | `components/ProjectComponents.tsx` | Alto | Reutilización |
| P1-4 | Migrar a clases tipográficas del sistema | Múltiples archivos | Medio | Consistencia visual |
| P1-5 | Verificar uso de tokens en Services, About | `Services.tsx`, `About.tsx` | Bajo | Alineación con design system |

**Checklist Done**:
- [ ] ProjectCRM.tsx < 400 líneas
- [ ] ProjectBranding.tsx < 300 líneas
- [ ] No hay `<style>` tags inline en páginas
- [ ] Todas las tipografías usan `.heading-*` o `.body-*`

---

## Fase 2: Performance & Images

**Objetivo**: LCP < 2.5s, CLS < 0.1

| ID | Tarea | Archivo(s) | Esfuerzo | Impacto |
|----|-------|------------|----------|---------|
| P2-1 | Crear componente Image con lazy + placeholder | `components/Image.tsx` | Medio | Mejor UX |
| P2-2 | Implementar Intersection Observer en marquee | `BrandingGalleryMarquee.tsx` | Medio | -32 requests iniciales |
| P2-3 | Añadir preload de fuentes críticas | `index.html` | Bajo | FOUT eliminado |
| P2-4 | Considerar WebP con fallback | Config build | Medio | -40% tamaño imágenes |
| P2-5 | Añadir blur placeholders inline SVG | `Image.tsx` | Medio | CLS = 0 |

**Checklist Done**:
- [ ] LCP < 2.5s en 3G throttled
- [ ] CLS < 0.1
- [ ] Fuentes no causan FOUT
- [ ] Imágenes below-fold no cargan hasta scroll

---

## Fase 3: UX & Accessibility

**Objetivo**: WCAG AA compliance, UX pulido

| ID | Tarea | Archivo(s) | Esfuerzo | Impacto |
|----|-------|------------|----------|---------|
| P3-1 | Añadir skip-to-content link | `Layout.tsx` | Bajo | Accesibilidad |
| P3-2 | Aumentar contraste de `--color-text-subtle` | `globals.css` | Bajo | WCAG AA |
| P3-3 | Añadir animación de cierre al mobile menu | `Layout.tsx` | Bajo | UX completa |
| P3-4 | Crear página 404 | `pages/NotFound.tsx`, `Router.tsx` | Bajo | UX completa |
| P3-5 | Añadir focus states consistentes | `globals.css` | Bajo | Navegación teclado |
| P3-6 | Verificar aria-labels en IconButtons | `Button.tsx`, Layout icons | Bajo | Screen readers |
| P3-7 | Añadir hover underline a footer links | `Layout.tsx` | Bajo | Feedback visual |

**Checklist Done**:
- [ ] Tab navigation funciona en toda la app
- [ ] Skip link visible en focus
- [ ] 404 page existe y tiene CTA a home
- [ ] Contraste pasa WCAG AA checker
- [ ] Mobile menu tiene animación de salida

---

## Fase 4: Polish & Delight

**Objetivo**: Microinteracciones premium, detalles de calidad

| ID | Tarea | Archivo(s) | Esfuerzo | Impacto |
|----|-------|------------|----------|---------|
| P4-1 | Añadir will-change optimization a animaciones | `Services.tsx`, `FeaturedProjects.tsx` | Bajo | Elimina jank |
| P4-2 | Refinar scroll behavior (smooth vs instant) | `Router.tsx` | Bajo | UX pulida |
| P4-3 | Revisar espaciado mobile en todas las secciones | Múltiples | Medio | Consistencia |
| P4-4 | Añadir loading states a formulario contacto | `Contact.tsx` | Bajo | Feedback usuario |
| P4-5 | Limpiar console warnings (keys en maps) | Múltiples | Bajo | DevEx |
| P4-6 | Remover emojis de código (CRM workflows) | `ProjectCRM.tsx` | Bajo | Profesionalismo |

**Checklist Done**:
- [ ] DevTools console sin warnings
- [ ] Animaciones a 60fps constante
- [ ] Mobile spacing consistente
- [ ] Formulario tiene states: idle, loading, success, error

---

## Backlog por Página

### Home (`/`)
| Prioridad | Tarea |
|-----------|-------|
| P0 | Reducir imágenes del Hero parallax |
| P1 | Verificar tipografía usa clases sistema |
| P2 | Optimizar imágenes de FeaturedProjects |

### Servicios (`/servicios`)
| Prioridad | Tarea |
|-----------|-------|
| P1 | Usar tokens CSS para colores |
| P2 | Añadir will-change a cards animadas |

### Proyectos (`/proyectos`)
| Prioridad | Tarea |
|-----------|-------|
| P1 | Verificar imágenes tienen lazy loading |
| P2 | Añadir blur placeholders |
| P3 | Refinar grid en mobile |

### Sobre Mí (`/sobre-mi`)
| Prioridad | Tarea |
|-----------|-------|
| P1 | Verificar tokens y tipografía |
| P2 | Optimizar imagen de perfil |
| P3 | Revisar parallax performance |

### Contacto (`/contacto`)
| Prioridad | Tarea |
|-----------|-------|
| P2 | Añadir loading/success states |
| P3 | Validación de formulario |

### Proyecto CRM (`/proyectos/crm-automatizacion`)
| Prioridad | Tarea |
|-----------|-------|
| P0 | Code split (lazy load) |
| P1 | Extraer CSS inline |
| P1 | Crear componentes reutilizables |
| P3 | Remover emojis de código |

### Proyecto Branding (`/proyectos/branding`)
| Prioridad | Tarea |
|-----------|-------|
| P0 | Code split (lazy load) |
| P1 | Extraer CSS inline |
| P2 | Lazy load marquee images |

### Proyecto Webs Locales (`/proyectos/webs-locales`)
| Prioridad | Tarea |
|-----------|-------|
| P0 | Code split (lazy load) |
| P1 | Revisar CSS inline |

### Proyecto Ecommerce (`/proyectos/ecommerce-propio`)
| Prioridad | Tarea |
|-----------|-------|
| P0 | Code split (lazy load) |
| P1 | Revisar CSS inline |

---

## Librerías Recomendadas

### Ya Instaladas (Mantener)
- **Framer Motion** - Animaciones declarativas, layout animations
- **GSAP + ScrollTrigger** - Scroll-driven animations complejas
- **Tailwind CSS v4** - Utility-first CSS
- **React Router v7** - Routing

### Considerar Añadir
| Librería | Uso | Bundle Impact |
|----------|-----|---------------|
| `@tanstack/react-query` | Cache de datos, estados async | +12KB |
| `react-intersection-observer` | Lazy loading simplificado | +2KB |
| `sharp` (build time) | Optimización imágenes | 0KB runtime |
| `lenis` | Smooth scroll nativo | +4KB |

### NO Añadir
- **Three.js** - Demasiado pesado para este portfolio
- **Locomotive Scroll** - Problemas de accesibilidad
- **jQuery** - No necesario con React

---

## Métricas Target

| Métrica | Actual | Target Fase 0 | Target Final |
|---------|--------|---------------|--------------|
| JS Bundle | 725KB | <400KB | <300KB |
| CSS Bundle | 79KB | 70KB | <50KB |
| LCP | ~4s | <3s | <2.5s |
| FID | OK | <100ms | <100ms |
| CLS | ? | <0.25 | <0.1 |
| Lighthouse Perf | ~50 | >70 | >90 |
| Lighthouse A11y | ~70 | >85 | >95 |

---

## Changelog

### v0.1.0 (Estado Actual)
- Portfolio funcional con Vite + React + TypeScript + Tailwind v4
- Hero parallax con Framer Motion
- 4 páginas de proyecto detalle
- Sistema de design tokens definido
- Build pasa correctamente

### v0.2.0 (Post Fase 0)
- [ ] Code splitting implementado
- [ ] Imágenes optimizadas
- [ ] Bundle < 400KB

### v0.3.0 (Post Fase 1)
- [ ] CSS unificado
- [ ] Tipografía consistente
- [ ] Proyecto pages refactorizadas

### v1.0.0 (Launch Ready)
- [ ] Lighthouse > 90
- [ ] WCAG AA compliant
- [ ] Página 404
- [ ] Mobile UX pulido
