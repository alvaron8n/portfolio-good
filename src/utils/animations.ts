import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// 1. Global Configuration
export const initGSAP = () => {
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })
}

// Export ScrollTrigger for use in components
export { ScrollTrigger }

// 2. Motion Preference Utility
export const shouldAnimate = () => {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 3. Common Animation Presets
export const ANIMATION_CONSTANTS = {
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.4,
  },
  ease: {
    base: 'power3.out',
    smooth: 'power3.inOut',
    elastic: 'elastic.out(1, 0.4)',
  },
}