// Design tokens - referencia conceptual (Tailwind usa las clases directamente)
export const tokens = {
  colors: {
    bg: '#0a0a12',
    bgGradient: 'linear-gradient(135deg, #0a0a12 0%, #0f0f1a 50%, #0a0a12 100%)',
    panel: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.08)',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.6)',
    primary: '#8b5cf6',
    violet: '#a78bfa',
    cyan: '#22d3ee',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  spacing: {
    sectionPadding: '5rem',
    containerPadding: '1.5rem',
  },
  radius: {
    card: '1rem',
    button: '0.5rem',
  },
  typography: {
    displayFont: 'Space Grotesk, sans-serif',
    bodyFont: 'Inter, sans-serif',
  },
} as const
