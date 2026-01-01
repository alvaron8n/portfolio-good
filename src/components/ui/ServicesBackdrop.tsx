'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * ServicesBackdrop - Premium animated background for Services page
 * 
 * Layers:
 * 1. Noise/grain texture (CSS)
 * 2. Grid lines (SVG)
 * 3. Floating geometric elements with parallax
 * 
 * Performance: uses transform/opacity only, respects prefers-reduced-motion
 */
export function ServicesBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms (subtle)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])

  return (
    <div 
      ref={containerRef}
      className="services-backdrop"
      aria-hidden="true"
    >
      {/* Layer 1: Noise grain */}
      <div className="services-backdrop__noise" />

      {/* Layer 2: Grid lines */}
      <svg 
        className="services-backdrop__grid"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="services-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path 
              d="M 50 0 L 50 50 M 0 50 L 50 50" 
              stroke="rgba(249, 115, 22, 0.03)" 
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#services-grid)" />
      </svg>

      {/* Layer 3: Floating geometric elements */}
      {!prefersReducedMotion && (
        <>
          {/* Top-left orb */}
          <motion.div
            className="services-backdrop__orb services-backdrop__orb--1"
            style={{ y: y1, rotate: rotate1 }}
          />
          
          {/* Center-right orb */}
          <motion.div
            className="services-backdrop__orb services-backdrop__orb--2"
            style={{ y: y2, rotate: rotate2 }}
          />
          
          {/* Bottom geometric */}
          <motion.div
            className="services-backdrop__orb services-backdrop__orb--3"
            style={{ y: y3 }}
          />

          {/* Accent lines */}
          <motion.div 
            className="services-backdrop__line services-backdrop__line--1"
            style={{ y: y1 }}
          />
          <motion.div 
            className="services-backdrop__line services-backdrop__line--2"
            style={{ y: y2 }}
          />
        </>
      )}

      {/* Static fallback for reduced motion */}
      {prefersReducedMotion && (
        <>
          <div className="services-backdrop__orb services-backdrop__orb--1" />
          <div className="services-backdrop__orb services-backdrop__orb--2" />
        </>
      )}

      <style>{`
        .services-backdrop {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* Noise grain layer */
        .services-backdrop__noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.5;
          mix-blend-mode: overlay;
        }

        /* Grid layer */
        .services-backdrop__grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.4;
        }

        /* Orbs - glowing geometric elements */
        .services-backdrop__orb {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
        }

        .services-backdrop__orb--1 {
          top: 10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
          filter: blur(60px);
        }

        .services-backdrop__orb--2 {
          top: 40%;
          right: -15%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.06) 0%, transparent 65%);
          filter: blur(80px);
        }

        .services-backdrop__orb--3 {
          bottom: 10%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%);
          filter: blur(50px);
        }

        /* Accent lines */
        .services-backdrop__line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
          will-change: transform;
        }

        .services-backdrop__line--1 {
          top: 25%;
          left: 0;
          right: 0;
          height: 1px;
        }

        .services-backdrop__line--2 {
          top: 65%;
          left: 10%;
          right: 10%;
          height: 1px;
        }

        /* Mobile: reduce complexity */
        @media (max-width: 768px) {
          .services-backdrop__orb--1 {
            width: 300px;
            height: 300px;
            filter: blur(40px);
          }
          .services-backdrop__orb--2 {
            width: 350px;
            height: 350px;
            filter: blur(50px);
          }
          .services-backdrop__orb--3 {
            display: none;
          }
          .services-backdrop__line {
            display: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .services-backdrop__orb,
          .services-backdrop__line {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ServicesBackdrop
