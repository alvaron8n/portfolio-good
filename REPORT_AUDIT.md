# REPORT_AUDIT.md — Portfolio Alvaro Fernandez

## Executive Summary

1. **Build Status**: El proyecto compila correctamente (`npm run build` pasa), pero genera un bundle de 725KB (220KB gzip) — demasiado grande para un portfolio
2. **Arquitectura CSS**: Existe un sistema de design tokens en `globals.css`, pero hay CSS inline/scoped masivo en páginas de proyecto (ProjectCRM.tsx tiene +1400 líneas de CSS en `<style>` tags)
3. **Tipografía**: Ya está configurada Montserrat + Inter + JetBrains Mono, pero muchos componentes no usan las clases tipográficas del sistema (`.heading-*`, `.body-*`)
4. **Mobile UX**: El hero-parallax desactiva correctamente en móvil, pero hay inconsistencias de padding/spacing en secciones
5. **Performance**: Carga 32 imágenes de Unsplash en el Hero sin lazy loading progresivo; el marquee de branding carga 32 más
6. **Deuda técnica**: Cada página de proyecto detalle tiene su propio sistema CSS aislado (variables, clases), sin compartir tokens globales
7. **Accesibilidad**: Falta skip-to-content, algunos controles sin labels adecuados, focus states inconsistentes
8. **Router**: Código repetitivo — cada ruta tiene su propio `motion.div` wrapper idéntico
9. **Imágenes faltantes**: Referencias a `/projects/*` y `/images/*` que probablemente no existen (fallbacks sí están)
10. **Sin code-splitting**: Todo el JS se carga en un solo chunk, incluyendo GSAP, Framer Motion y todo el contenido

---

## Issues List (Ordenados por Severidad)

### CRITICAL (P0)

| ID | Issue | Archivo(s) | Impacto |
|----|-------|-----------|---------|
| C1 | Bundle JS de 725KB sin code-splitting | `vite.config.ts`, `Router.tsx` | Performance: +3s en 3G, penalización SEO |
| C2 | 64 imágenes Unsplash cargadas sin estrategia | `Hero.tsx`, `BrandingGalleryMarquee.tsx` | LCP >4s, consumo de datos excesivo |
| C3 | CSS inline masivo en páginas de proyecto | `ProjectCRM.tsx` (+1400 líneas), `ProjectBranding.tsx` (+300 líneas) | Mantenibilidad, duplicación, bundle CSS inflado |

### HIGH (P1)

| ID | Issue | Archivo(s) | Impacto |
|----|-------|-----------|---------|
| H1 | Tokens CSS no usados consistentemente | `Services.tsx`, `About.tsx`, `Projects.tsx` | Inconsistencia visual, difícil mantener |
| H2 | Tipografía hardcodeada vs clases del sistema | Múltiples secciones | Montserrat no se aplica uniformemente |
| H3 | Router con wrappers repetitivos | `Router.tsx` | 130+ líneas de boilerplate |
| H4 | Imágenes de proyectos no existen | `content.ts` (refs a `/projects/*.jpg`) | 404s, fallbacks feos |
| H5 | No hay lazy loading de rutas | `Router.tsx` | Todo se carga upfront |
| H6 | Scroll behavior `instant` puede ser jarring | `Router.tsx:22` | UX: cambio brusco |

### MEDIUM (P2)

| ID | Issue | Archivo(s) | Impacto |
|----|-------|-----------|---------|
| M1 | Mobile menu sin animación de cierre | `Layout.tsx` | UX incompleta |
| M2 | Footer links sin hover underline | `Layout.tsx` | Feedback visual pobre |
| M3 | Contraste texto muted puede fallar WCAG | `globals.css` (`--color-text-subtle: 0.3`) | Accesibilidad |
| M4 | Falta `loading="lazy"` en muchas imágenes | `About.tsx`, cards de proyectos | Performance |
| M5 | Animaciones sin `will-change` optimization | `Services.tsx`, `FeaturedProjects.tsx` | Posible jank |
| M6 | No hay 404 page | `Router.tsx` | UX incompleta |

### LOW (P3)

| ID | Issue | Archivo(s) | Impacto |
|----|-------|-----------|---------|
| L1 | Emojis en código (CRM workflows) | `ProjectCRM.tsx` | Inconsistencia profesional |
| L2 | `any` cast en IconButton | `Button.tsx:221` | Type safety |
| L3 | Console warnings por keys en maps | Varios | DevEx |
| L4 | Falta preload de fuentes críticas | `index.html` | FOUT posible |

---

## Diagnóstico: "Banda/Rectángulo Superior"

### Hipótesis Principal

El problema de la "banda superior" fue causado por:

**Archivo**: `src/app/Layout.tsx`
**Línea afectada**: El `<main>` tenía `className="... pt-20 md:pt-24"`

Este padding-top crea un espacio vacío entre el header fijo y el contenido. Cuando el Hero tiene su propio fondo con gradientes/paralax, este padding se ve como una "banda" del color base (`#050508`) antes de que empiece el contenido visual del Hero.

### Cómo verificar:
```bash
# En DevTools:
1. Inspeccionar el <main> element
2. Verificar si tiene padding-top
3. Verificar si el Hero section empieza a 0 o tiene margin-top propio
```

### Estado actual:
El padding fue removido en la sesión anterior. Si persiste el problema:
- Verificar que `Hero.tsx` no tiene `margin-top` o `padding-top` propio
- Verificar que `HeroParallax` tiene `top: 0` absoluto
- Verificar que no hay gap entre `<header>` y `<main>` en Layout

### Archivos a revisar:
1. `src/app/Layout.tsx` — estructura main/header
2. `src/sections/Hero.tsx` — container del hero
3. `src/components/ui/hero-parallax.tsx` — posicionamiento sticky/absolute
4. `src/styles/globals.css` — estilos base de body/#root

---

## Recomendaciones Globales

### 1. Arquitectura CSS (Urgente)

**Problema**: Cada página de proyecto tiene CSS scoped con 500-1400 líneas. Esto:
- Infla el bundle
- No comparte tokens
- Es imposible de mantener

**Solución propuesta**:
```
src/styles/
  globals.css       → Tokens + base + utilities
  components.css    → .card-*, .btn-*, .badge-*
  sections.css      → .section-header, .section-divider
  project-detail.css → Estilos compartidos para /proyectos/*
```

### 2. Code Splitting (Urgente)

```typescript
// Router.tsx - usar React.lazy
const ProjectCRM = lazy(() => import('../pages/projects/ProjectCRM'))
const ProjectBranding = lazy(() => import('../pages/projects/ProjectBranding'))
// ... etc

// Wrap en Suspense
<Suspense fallback={<PageLoader />}>
  <Routes>...</Routes>
</Suspense>
```

**Ahorro estimado**: ~300KB del bundle principal movido a chunks on-demand.

### 3. Imágenes

1. **Hero Parallax**: Reducir de 18 a 9-12 imágenes, usar `loading="lazy"`
2. **Branding Marquee**: Cargar solo cuando entra en viewport (Intersection Observer)
3. **Placeholders**: Usar blur placeholder SVGs inline para evitar layout shift
4. **Formatos**: Considerar WebP con fallback

### 4. Tipografía

Crear wrapper components o usar las clases existentes consistentemente:

```tsx
// En vez de:
<h1 className="text-5xl md:text-6xl font-bold text-white">

// Usar:
<h1 className="heading-display text-text-primary">
```

### 5. Accesibilidad Quick Wins

1. Añadir skip-to-content link en Layout
2. Aumentar contraste de `--color-text-subtle` a 0.4 mínimo
3. Asegurar que todos los botones de icono tienen `aria-label`
4. Testear navegación por teclado en menú móvil

---

## Métricas Actuales vs Objetivo

| Métrica | Actual | Objetivo | Cómo mejorar |
|---------|--------|----------|--------------|
| JS Bundle | 725KB | <300KB | Code splitting + tree shaking |
| CSS Bundle | 79KB | <50KB | Extraer CSS inline, purge unused |
| LCP (estimado) | >4s | <2.5s | Lazy images, preload hero |
| First Input Delay | OK | <100ms | Ya usa Framer Motion bien |
| Lighthouse Performance | ~50-60 | >85 | Todo lo anterior |

---

## Estructura Actual del Proyecto

```
src/
├── app/
│   ├── Layout.tsx      ← Nav + Footer + estructura
│   └── Router.tsx      ← Todas las rutas (sin lazy loading)
├── components/
│   ├── Button.tsx      ← Componente bien hecho
│   ├── Card.tsx
│   ├── Container.tsx   ← Simple wrapper max-w-6xl
│   ├── Section.tsx     ← Wrapper con padding
│   └── ui/
│       ├── hero-parallax.tsx  ← Parallax del Hero
│       └── three-d-marquee.tsx ← Marquee 3D
├── content/
│   └── content.ts      ← Todo el contenido centralizado (bien!)
├── pages/
│   ├── Home.tsx
│   ├── ServicesPage.tsx
│   ├── Projects.tsx
│   ├── AboutPage.tsx
│   ├── Contact.tsx
│   └── projects/
│       ├── ProjectCRM.tsx       ← 1400+ líneas con CSS inline
│       ├── ProjectBranding.tsx  ← 470+ líneas con CSS inline
│       ├── ProjectWebsLocales.tsx
│       └── ProjectEcommerce.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── FeaturedProjects.tsx
│   ├── CTA.tsx
│   └── BrandingGalleryMarquee.tsx
├── styles/
│   └── globals.css     ← Design tokens (bien estructurado)
├── utils/
│   └── animations.ts   ← GSAP setup
└── lib/
    └── utils.ts        ← cn() helper
```

---

## Próximos Pasos Recomendados

1. **Fase 0 (Hoy)**:
   - Implementar code splitting en Router
   - Añadir lazy loading a imágenes del Hero

2. **Fase 1 (Esta semana)**:
   - Extraer CSS inline de ProjectCRM/ProjectBranding a archivos compartidos
   - Unificar tipografía usando clases del sistema

3. **Fase 2 (Siguiente semana)**:
   - Crear página 404
   - Implementar skip-to-content
   - Optimizar imágenes (WebP, placeholders)

Ver `ROADMAP.md` para el plan completo.
