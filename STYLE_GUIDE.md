# STYLE_GUIDE.md — Portfolio Alvaro Fernandez

Sistema de diseño premium para portfolio de desarrollo web y automatizacion con IA.

---

## 1. Tipografia

### Fuentes

| Rol | Fuente | Pesos | Uso |
|-----|--------|-------|-----|
| **Display/Headings** | Montserrat | 600, 700, 800, 900 | H1, H2, Hero text, nombres de seccion, CTAs |
| **Body** | Inter | 400, 500, 600 | Parrafos, descripciones, UI text |
| **Mono/Accent** | JetBrains Mono | 400, 500 | Badges, numeros, labels tech, codigo, eyebrows |

### Escala Tipografica

```css
/* Hero / Display - Impacto maximo */
.heading-hero     → clamp(2.5rem, 10vw, 7rem)   /* 40-112px, weight: 900 */
.heading-display  → clamp(2rem, 6vw, 4.5rem)    /* 32-72px, weight: 800 */

/* Headings - Montserrat */
.heading-xl       → clamp(2rem, 5vw, 3.5rem)    /* 32-56px, weight: 700 */
.heading-lg       → clamp(1.5rem, 4vw, 2.5rem)  /* 24-40px, weight: 700 */
.heading-md       → clamp(1.25rem, 3vw, 1.75rem)/* 20-28px, weight: 600 */
.heading-sm       → clamp(1rem, 2vw, 1.25rem)   /* 16-20px, weight: 600 */

/* Body - Inter */
.body-xl          → 1.25rem (20px)
.body-lg          → 1.125rem (18px)
.body-md          → 1rem (16px)
.body-sm          → 0.875rem (14px)

/* Micro - JetBrains Mono */
.label-mono       → 0.75rem, uppercase, tracking: 0.1em
.badge-text       → 0.6875rem, uppercase, tracking: 0.15em
```

### Line Heights

| Categoria | Line Height |
|-----------|-------------|
| Hero/Display | 1.05 - 1.1 |
| Headings | 1.15 - 1.2 |
| Body | 1.6 - 1.7 |
| Captions | 1.4 - 1.5 |

### Letter Spacing

| Categoria | Tracking |
|-----------|----------|
| Hero | -0.03em |
| Display | -0.025em |
| Headings | -0.01em a -0.02em |
| Body | 0 (default) |
| Mono labels | 0.1em a 0.15em |

---

## 2. Colores

### Palette Overview

```
BACKGROUNDS (oscuros)
#050508 ━━━━━ #0a0a12 ━━━━━ #0f0f1a
  base         elevated      surface

ACCENTS (vibrantes)
#8b5cf6 ━━━━━ #22d3ee ━━━━━ #10b981
 violet         cyan         emerald
```

### Backgrounds

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-base` | #050508 | Fondo principal, el mas oscuro |
| `--color-bg-elevated` | #0a0a12 | Secciones elevadas |
| `--color-bg-surface` | #0f0f1a | Cards, panels, modals |
| `--color-bg-overlay` | rgba(5, 5, 8, 0.85) | Overlays, backdrops |
| `--color-bg-glass` | rgba(255, 255, 255, 0.03) | Glass effect sutil |
| `--color-bg-glass-strong` | rgba(255, 255, 255, 0.06) | Glass effect hover |

### Text

| Token | Valor | Contraste | Uso |
|-------|-------|-----------|-----|
| `--color-text-primary` | rgba(255, 255, 255, 0.95) | 15.2:1 | Titulos, texto importante |
| `--color-text-secondary` | rgba(255, 255, 255, 0.7) | 11.0:1 | Subtitulos, descripciones |
| `--color-text-muted` | rgba(255, 255, 255, 0.5) | 7.8:1 | Captions, metadata |
| `--color-text-subtle` | rgba(255, 255, 255, 0.3) | 4.5:1 | Placeholders (REVISAR: borderline WCAG) |

### Accents

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-violet` | #8b5cf6 | Primary accent, CTAs, links |
| `--color-violet-light` | #a78bfa | Hover states, gradients |
| `--color-violet-dark` | #7c3aed | Active/pressed states |
| `--color-cyan` | #22d3ee | Secondary accent, links, gradients |
| `--color-cyan-dark` | #06b6d4 | Icons, badges tech |
| `--color-emerald` | #10b981 | Success, disponibilidad, WhatsApp |

### Borders

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-border-subtle` | rgba(255, 255, 255, 0.06) | Default borders, dividers |
| `--color-border-default` | rgba(255, 255, 255, 0.1) | Cards, inputs |
| `--color-border-hover` | rgba(255, 255, 255, 0.15) | Hover states |
| `--color-border-active` | rgba(139, 92, 246, 0.5) | Focus, selected |

### Gradients

```css
/* Primary gradient (violet → cyan) */
background: linear-gradient(135deg, var(--color-violet-light) 0%, var(--color-cyan) 100%);

/* Violet gradient */
background: linear-gradient(135deg, var(--color-violet) 0%, var(--color-violet-light) 100%);

/* Background ambient */
background:
  radial-gradient(ellipse 100% 100% at 50% -20%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
  radial-gradient(ellipse 80% 80% at 80% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 50%),
  radial-gradient(ellipse 60% 60% at 20% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
```

---

## 3. Spacing

### Scale (base 4px)

```css
--space-1:  0.25rem   /* 4px */
--space-2:  0.5rem    /* 8px */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.25rem   /* 20px */
--space-6:  1.5rem    /* 24px */
--space-8:  2rem      /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
--space-24: 6rem      /* 96px */
--space-32: 8rem      /* 128px */
```

### Section Spacing

| Breakpoint | Padding Y |
|------------|-----------|
| Mobile (< 768px) | `py-16` a `py-20` (64-80px) |
| Desktop (>= 768px) | `py-24` a `py-32` (96-128px) |

### Container

```css
max-width: 72rem (1152px)
padding-inline: 1rem (mobile) → 2rem (desktop)
```

---

## 4. Border Radius

```css
--radius-sm:   0.375rem  /* 6px - badges, chips, small buttons */
--radius-md:   0.5rem    /* 8px - buttons, inputs */
--radius-lg:   0.75rem   /* 12px - cards pequenas */
--radius-xl:   1rem      /* 16px - cards, panels */
--radius-2xl:  1.5rem    /* 24px - secciones destacadas */
--radius-full: 9999px    /* Pills, avatars, nav items */
```

---

## 5. Shadows

### Elevation

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
```

### Glows

```css
--shadow-glow:        0 0 40px rgba(139, 92, 246, 0.15);
--shadow-glow-strong: 0 0 60px rgba(139, 92, 246, 0.25);
--shadow-glow-cyan:   0 0 40px rgba(34, 211, 238, 0.15);

/* Card hover */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(139, 92, 246, 0.1);
```

---

## 6. Glassmorphism

### Glass Base

```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

### Glass Strong (hover/active)

```css
.glass-strong {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Uso

- **Navigation bar**: glass + blur(50px)
- **Cards elevadas**: glass
- **Mobile menu overlay**: rgba(5, 5, 8, 0.95) + blur-2xl
- **Tooltips/dropdowns**: glass-strong

---

## 7. Motion Guidelines

### Duraciones

| Token | Valor | Uso |
|-------|-------|-----|
| Fast | 150-200ms | Hover, micro-interactions |
| Normal | 300ms | Transitions estandar |
| Slow | 400-500ms | Entrances, modals |
| Epic | 600-1000ms | Hero reveals, page transitions |

### Easings

```css
/* Smooth salidas */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Transiciones bidireccionales */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Bounce/spring */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* GSAP equivalents */
power2.out, power3.out, power4.out
```

### GSAP vs Framer Motion

| GSAP | Framer Motion |
|------|---------------|
| Timelines complejas de intro | Scroll-triggered reveals simples |
| ScrollTrigger parallax | Hover/tap microinteractions |
| Animaciones con multiples targets | Layout animations |
| SVG morphing, text splitting | Presence animations (mount/unmount) |
| Animaciones basadas en scroll | useScroll para parallax basico |

### Reduccion de Movimiento

```css
@media (prefers-reduced-motion: reduce) {
  /* Desactivar completamente */
  - Parallax
  - Loops infinitos
  - Rotaciones continuas
  - Marquees

  /* Mantener (simplificado) */
  - Fades rapidos (150ms)
  - Transforms sutiles
  - Opacity transitions
}
```

### Animaciones Comunes

```css
/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Shimmer (hover shine) */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 8. Components

### Button

```
Variants:
- primary:   bg-gradient violet, text-white, glow
- secondary: bg-white/5, border-white/10, backdrop-blur
- ghost:     text-white/70, hover:bg-white/5
- gradient:  bg-gradient violet→purple→cyan, animado
- glow:      bg-emerald, shadow emerald

Sizes:
- sm: px-4 py-2 text-sm (h-9)
- md: px-6 py-3 text-base (h-11)
- lg: px-8 py-4 text-lg (h-13)

States:
- hover:    scale(1.02), translateY(-1px), glow aumentado
- active:   scale(0.98)
- disabled: opacity-50, pointer-events-none
- focus:    ring-2 ring-violet, ring-offset-2

Border-radius: radius-xl (1rem)
Min touch target: 44x44px
```

### Card

```
Background: bg-surface o glass
Border: border-subtle
Border-radius: radius-xl
Padding: space-6 a space-8

Hover:
- border-color → border-hover
- transform: translateY(-4px)
- box-shadow: shadow-lg + glow-violet
```

### Badge / Chip

```
Background: glass o bg-surface
Border: border-default
Border-radius: radius-full
Padding: space-2 horizontal, space-4 vertical
Font: mono, text-caption, uppercase, tracking: 0.1em
```

### Section Header

```html
<div class="section-header">
  <span class="label-mono text-text-muted mb-4">EYEBROW</span>
  <h2 class="heading-xl text-text-primary mb-4">Titulo de Seccion</h2>
  <p class="body-lg text-text-secondary max-w-2xl">
    Descripcion de la seccion...
  </p>
</div>
```

### Input / Textarea

```
Background: bg-surface
Border: border-default
Border-radius: radius-md (0.5rem)
Height: h-12 (inputs), min-h-32 (textarea)
Padding: space-4

Focus:
- border-color → violet
- box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1)

Placeholder: text-subtle
```

### Nav Link

```
Padding: py-2 px-3
Border-radius: radius-full
Font: body, text-sm, font-medium

States:
- default: text-white/50
- hover:   text-white, bg-white/8
- active:  text-white, underline gradient
```

---

## 9. Layout

### Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Z-Index Scale

```css
--z-background:  -1     /* Parallax backgrounds */
--z-base:         0     /* Default content */
--z-elevated:    10     /* Cards, lifted elements */
--z-overlay:     20     /* Overlays, backdrops */
--z-modal:       30     /* Modals, dialogs */
--z-navigation:  40     /* Fixed nav */
--z-toast:       50     /* Notifications */
```

### Grid Patterns

```css
/* 3-column grid (services, projects) */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;

/* 2-column layout (about sections) */
grid-template-columns: 1fr 1fr; /* lg+ */
gap: 4rem;

/* Project detail: full-width sections */
max-width: 100%;
/* Content dentro: max-w-6xl mx-auto */
```

---

## 10. Accessibility

### Checklist

- [ ] Contraste texto: minimo 4.5:1 (AA) - **REVISAR text-subtle**
- [ ] Touch targets: minimo 44x44px
- [ ] Focus visible: outline 2px violet, offset 2px
- [ ] Skip to content link (pendiente)
- [ ] Alt text en imagenes
- [ ] Reduced motion fallbacks (implementado)
- [ ] Semantica correcta (headings, landmarks)
- [ ] aria-labels en botones de icono

### Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--color-violet);
  outline-offset: 2px;
}
```

### Skip Link (pendiente implementar)

```html
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>
```

---

## 11. Patrones de Fondo

### Grid Pattern

```css
.bg-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### Dots Pattern

```css
.bg-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Noise Overlay

```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.015;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

---

## 12. Archivos CSS

### Estructura Recomendada

```
src/styles/
├── globals.css        → Tokens + base + utilities (actual)
├── components.css     → .card-*, .btn-*, .badge-* (crear)
├── sections.css       → .section-header, .section-divider (crear)
└── project-detail.css → Estilos compartidos proyectos (crear)
```

### Orden de Importacion

1. Tailwind base
2. Tokens (@theme)
3. Base styles
4. Typography utilities
5. Component classes
6. Animation keyframes
7. Utility classes
