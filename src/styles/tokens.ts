// ============================================
// FLAMA STUDIO - Design Tokens
// ============================================

export const tokens = {
  // Typography
  fonts: {
    display: "'Space Grotesk', sans-serif",    // H1, H2, Headlines
    body: "'Montserrat', sans-serif",           // Body text, UI
    accent: "'BBH Bartle', sans-serif",         // Keywords ONLY (IA, Persona, TIEMPO)
    mono: "'JetBrains Mono', monospace",        // Code, technical labels
  },

  // Colors
  colors: {
    // Backgrounds
    bg: {
      base: '#0a0a0f',
      surface: '#101018',
      elevated: '#16161f',
    },
    
    // Primary - Orange gradient
    primary: {
      DEFAULT: '#f97316',
      dark: '#ea580c',
      light: '#fb923c',
      bright: '#fbbf24',
    },
    
    // Secondary - Emerald
    secondary: {
      DEFAULT: '#10b981',
      dark: '#059669',
      light: '#34d399',
    },
    
    // Text
    text: {
      primary: '#f5f5f5',
      secondary: '#a3a3a3',
      muted: '#525252',
    },
    
    // Borders
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      default: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.20)',
      accent: 'rgba(249, 115, 22, 0.4)',
    },
  },

  // Glassmorphism
  glass: {
    bg: 'rgba(16, 16, 24, 0.7)',
    blur: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
  },

  // Spacing
  spacing: {
    section: '5rem',
    container: '1.5rem',
  },

  // Border radius
  radius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  // Animations
  ease: {
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export type Tokens = typeof tokens
