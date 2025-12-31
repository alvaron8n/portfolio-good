# 🎨 FLAMA STUDIO - Style Guide

## 📝 TIPOGRAFÍA

| Uso | Fuente | Pesos | Ejemplo |
|-----|--------|-------|---------|
| **Headlines (H1, H2)** | Space Grotesk | 600, 700 | Títulos de sección |
| **Body text, UI** | Montserrat | 300, 400, 500, 600 | Párrafos, botones |
| **Accent Keywords** | BBH Bartle | 400, 700 | "IA", "TIEMPO", "Persona" |
| **Código/Labels** | JetBrains Mono | 400, 500 | Tags técnicos |

### Clases CSS
```css
.font-display  /* Space Grotesk */
.font-body     /* Montserrat */
.font-accent   /* BBH Bartle */
.font-mono     /* JetBrains Mono */
```

---

## ⚡ BBH BARTLE - Accent Typeface

### Reglas de uso
BBH Bartle es una tipografía **de impacto visual** reservada exclusivamente para **palabras clave estratégicas**. Su uso debe ser mínimo y preciso.

| ✅ USAR | ❌ NO USAR |
|---------|-----------|
| Palabras clave: "IA", "TIEMPO", "Persona" | Frases completas |
| Máximo 1-2 palabras por bloque | Párrafos o descripciones |
| Con degradado naranja | En texto plano sin estilo |
| En elementos hero, citas, CTAs | En navegación o labels |

### Ejemplos de aplicación

#### En Hero
```jsx
<h1>
  Sistemas que te devuelven el 
  <span className="font-accent text-gradient-primary">TIEMPO</span>
</h1>
```

#### En Citas/Cards
```jsx
<p>
  La <span className="epic-keyword">IA</span> no te quitará el trabajo, 
  lo hará una <span className="epic-keyword">persona</span> que la utilice.
</p>
```

#### En CTAs
```jsx
<button>
  Automatiza con <span className="font-accent">IA</span>
</button>
```

### Estilos recomendados para keywords
```css
.epic-keyword-text {
  font-family: 'BBH Bartle', sans-serif;
  font-weight: 700;
  background: linear-gradient(135deg, #ea580c, #f97316, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.4));
}
```

---

## 🎨 PALETA DE COLORES

### Fondos
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-base` | `#0a0a0f` | Fondo principal |
| `--color-bg-surface` | `#101018` | Cards, superficies |
| `--color-bg-elevated` | `#16161f` | Modals, dropdowns |

### Primario (Naranja - Accent principal)
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary-dark` | `#ea580c` | Inicio gradiente |
| `--color-primary` | `#f97316` | Color base |
| `--color-primary-light` | `#fb923c` | Hover states |
| `--color-primary-bright` | `#fbbf24` | Final gradiente |

**Gradiente completo:**
```css
background: linear-gradient(135deg, #ea580c 0%, #f97316 35%, #fb923c 70%, #fbbf24 100%);
```

### Secundario (Esmeralda - Complementario)
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-secondary-dark` | `#059669` | Sombras |
| `--color-secondary` | `#10b981` | Color base |
| `--color-secondary-light` | `#34d399` | Highlights |

### Texto
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text-primary` | `#f5f5f5` | Texto principal (96%) |
| `--color-text-secondary` | `#a3a3a3` | Texto secundario (64%) |
| `--color-text-muted` | `#525252` | Texto deshabilitado (32%) |

---

## 🪟 GLASSMORPHISM PREMIUM

### Configuración base
```css
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0.01) 100%
  );
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border-radius: 28px;
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    inset 0 -1px 1px rgba(0, 0, 0, 0.1),
    0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### Elementos adicionales
- **Edge highlights**: Líneas sutiles en top/left
- **Noise texture**: SVG overlay con opacity 0.03
- **Corner accents**: Esquinas con borde naranja al 40% opacity
- **Animated border**: Gradiente animado en hover

---

## ⚡ MICRO-INTERACCIONES

### Hover en cards
```css
.card:hover {
  transform: scale(1.02);
  box-shadow: ... var(--glow-primary);
}
```

### 3D Tilt (Framer Motion)
```jsx
const rotateX = useTransform(mouseY, [0, 1], [12, -12])
const rotateY = useTransform(mouseX, [0, 1], [-12, 12])
```

### Parallax interno
```jsx
const parallaxX = useTransform(mouseX, [0, 1], [-20, 20])
const parallaxY = useTransform(mouseY, [0, 1], [-15, 15])
```

### Spotlight dinámico
```jsx
const spotlightGradient = useMotionTemplate`
  radial-gradient(
    800px circle at ${lightX}% ${lightY}%,
    rgba(249, 115, 22, 0.12),
    transparent 50%
  )
`
```

---

## ⚡ ANIMACIONES

| Curva | Valor | Uso |
|-------|-------|-----|
| `--ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Transiciones suaves |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas premium |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Efectos elásticos |

---

## 📏 ESPACIADO

- **Secciones:** `5rem - 8rem` (80-128px)
- **Container padding:** `1.5rem - 4rem`
- **Gap cards:** `1rem - 2rem`
- **Border radius:** `0.5rem` | `1rem` | `1.5rem` | `28px` (premium cards)

---

## 🔤 CLASES DE UTILIDAD

### Headlines
```css
.heading-hero  /* clamp(3.5rem, 5vw + 1rem, 7rem) */
.heading-lg    /* 3rem (48px) */
.heading-md    /* 1.5rem (24px) */
```

### Texto con gradiente
```css
.text-gradient-primary   /* Naranja */
.text-gradient-secondary /* Esmeralda */
```

### Keywords (BBH Bartle)
```css
.epic-keyword       /* Contenedor */
.epic-keyword-text  /* Texto con gradiente */
.epic-keyword-glow  /* Glow animado */
```

---

*Actualizado: 31 Diciembre 2024*
