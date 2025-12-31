# HANDOFF - Portfolio Álvaro Fernández (Flama Studio)

## 📍 UBICACIÓN DEL PROYECTO
```
C:\Users\Alvaro\P O R T F O L I O - Claude
```

## 🛠️ STACK TÉCNICO
- **Framework:** React 19 + Vite 7
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion + GSAP
- **Routing:** React Router DOM v7

## 🚀 COMANDOS
```bash
cd "C:\Users\Alvaro\P O R T F O L I O - Claude"
npm run dev          # Servidor en localhost:5176
npm run build        # Build producción
```

## 📁 ESTRUCTURA CLAVE
```
src/
├── sections/           # Secciones de la home
│   ├── Hero.tsx        # ✅ REDISEÑADO - Glass cards bottom-left
│   ├── SocialProof.tsx # Marquee con CurvedLoop
│   ├── FeaturedProjects.tsx  # Carousel draggable (HOME)
│   ├── Services.tsx
│   ├── HowIWork.tsx
│   ├── WhatIDo.tsx
│   ├── WhatMakesMeDifferent.tsx
│   ├── ForWho.tsx
│   ├── About.tsx
│   └── CTA.tsx
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx    # ✅ REDISEÑADO - Grid con imágenes Unsplash
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   └── Contact.tsx
├── components/
│   ├── ui/             # Componentes reutilizables
│   └── Header.tsx      # Navegación glass
├── content/
│   └── content.ts      # Contenido centralizado
└── lib/
    └── KLING 2.mp4     # Video background Hero
```

## 🎨 SISTEMA DE DISEÑO ACTUAL

### Tipografías (Google Fonts en index.html)
- **Display/Títulos:** Space Grotesk (700)
- **Body:** Montserrat (400, 500)
- **Accent:** Knewave (disponible pero no en uso actualmente)
- **Mono:** JetBrains Mono

### Paleta de colores
- **Primario/Accent:** Naranja degradado `#ea580c → #f97316 → #fb923c → #fbbf24`
- **Secundario:** Cyan `#06B6D4` / `#22D3EE`
- **Fondo:** Negro profundo `#0a0a0f` / `#0A0A14`
- **Texto:** White con opacidades (100%, 90%, 50%, 45%, 40%)

### Glassmorphism (valores actuales Hero)
```css
background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))
backdrop-filter: blur(24px) saturate(200%)
border: 1px solid rgba(255,255,255,0.15)
box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)
```

## ✅ CAMBIOS REALIZADOS EN ESTA SESIÓN

### Hero Section (Hero.tsx)
1. Unificado headline en 2 líneas con Space Grotesk
2. "TIEMPO" en mayúsculas con degradado naranja marcado
3. Cards compactas posicionadas bottom-left
4. Glassmorphism premium mejorado (blur 24px, saturación 200%)
5. Highlight superior y lateral en las cards
6. Video background con overlays optimizados

### Projects Page (Projects.tsx)
1. Rediseño completo con imágenes de stock (Unsplash)
2. Cards con glassmorphism coherente con Hero
3. Tipografía unificada (Space Grotesk + Montserrat)
4. Badge "Destacado" con degradado naranja
5. Hover con elevación y glow naranja
6. CTA "Ver proyecto" con flecha animada
7. Filtros con estilo glass

### Imágenes de stock por categoría
```typescript
const categoryImages = {
  automatizacion: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  branding: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
}
```

## 🎯 ESTADO ACTUAL
- **Hero:** ✅ Rediseñado - Cards glass bottom-left, tipografía Space Grotesk
- **Projects Page:** ✅ Rediseñado - Grid con imágenes y glass cards
- **Resto de secciones:** Pendiente de revisión/unificación

## 📋 PENDIENTE / NOTAS
- Las demás secciones de la Home no han sido tocadas
- Pueden tener inconsistencias tipográficas o de estilo
- El carousel de FeaturedProjects (home) usa un diseño diferente al grid de Projects page

---

## 🔍 TAREA PARA NUEVO CHAT

**INSTRUCCIÓN:** Actúa como diseñador web senior y UX specialist. Revisa la HOME completa del portfolio navegando por todas las secciones y dame un análisis detallado de:

1. **QUÉ CAMBIARÍAS** - Elementos que no funcionan o están desactualizados
2. **QUÉ AÑADIRÍAS** - Funcionalidades o secciones que faltan para mejor conversión
3. **QUÉ QUITARÍAS** - Elementos redundantes o que restan valor
4. **QUÉ MEJORARÍAS** - Detalles de UX, micro-interacciones, jerarquía visual

**CRITERIOS A EVALUAR:**
- Coherencia visual entre secciones
- Jerarquía tipográfica
- Espaciados y ritmo visual
- Call-to-actions y conversión
- Experiencia móvil
- Micro-interacciones y animaciones
- Carga y performance percibida
- Storytelling y flujo de usuario

**CONTEXTO DEL CLIENTE:**
- Target: Empresas que buscan automatización, desarrollo web y branding
- Objetivo: Generar leads cualificados
- Diferenciador: "Sistemas que te devuelven el TIEMPO"

**SERVIDOR:** http://localhost:5176

---

*Handoff generado: 31 Diciembre 2024*
