import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import './immersiveWorkGrid.css'

gsap.registerPlugin(ScrollTrigger)

// Grid images - tech/automation themed
const gridImages = {
  tiles: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', // circuits
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', // dashboard
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', // analytics
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80', // branding
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', // ecommerce
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80', // code
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', // workspace
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', // team
  ],
  center: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80', // main
}

// Tile speeds for parallax
const tileSpeeds = [0.8, 1.2, 0.9, 1.1, 1, 0.7, 1.3, 0.6]

export function ImmersiveWorkGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const scaleTarget = isMobile ? 3 : 5
      const blurAmount = isMobile ? '10px' : '20px'

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: isMobile ? '+=1500' : '+=2500',
          pin: true,
          scrub: isMobile ? 1 : 1.5,
          anticipatePin: 1,
        }
      })

      // Phase 1: Outer items fade out with differential parallax
      itemsRef.current.forEach((item, index) => {
        if (!item) return
        const speed = tileSpeeds[index] || 1
        const direction = index % 2 === 0 ? -1 : 1
        const yDirection = index < 3 ? -1 : index > 4 ? 1 : 0

        tl.to(item, {
          opacity: 0,
          scale: 0.3,
          filter: `blur(${blurAmount})`,
          x: direction * 100 * speed,
          y: yDirection * 80 * speed,
          duration: 1,
          ease: 'power2.in'
        }, 0)
      })

      // Phase 2: Grid zooms in
      tl.to(gridRef.current, {
        scale: scaleTarget,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0)

      // Phase 3: Center item adjusts
      if (centerRef.current) {
        tl.to(centerRef.current, {
          borderRadius: '0px',
          duration: 1
        }, 0.5)

        const centerImg = centerRef.current.querySelector('img')
        if (centerImg) {
          tl.to(centerImg, {
            scale: 1.2,
            duration: 1.5
          }, 0)
        }
      }

      // Phase 4: Vignette appears
      tl.to(vignetteRef.current, {
        opacity: 1,
        duration: 0.5
      }, 0.8)

    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="immersive-section">
      {/* Section intro */}
      <div className="immersive-intro">
        <span className="immersive-label">Trabajo Reciente</span>
        <h2 className="immersive-heading">
          Proyectos que <span className="immersive-accent">transforman</span> negocios
        </h2>
      </div>

      {/* Immersive grid wrapper */}
      <div ref={wrapperRef} className="immersive-wrapper">
        <div ref={gridRef} className="immersive-grid">
          {/* Row 1 */}
          <div 
            ref={el => itemsRef.current[0] = el}
            className="immersive-item"
            data-speed="0.8"
          >
            <img src={gridImages.tiles[0]} alt="Automatización" loading="lazy" />
          </div>
          <div 
            ref={el => itemsRef.current[1] = el}
            className="immersive-item"
            data-speed="1.2"
          >
            <img src={gridImages.tiles[1]} alt="Dashboard" loading="lazy" />
          </div>
          <div 
            ref={el => itemsRef.current[2] = el}
            className="immersive-item"
            data-speed="0.9"
          >
            <img src={gridImages.tiles[2]} alt="Analytics" loading="lazy" />
          </div>

          {/* Row 2 */}
          <div 
            ref={el => itemsRef.current[3] = el}
            className="immersive-item"
            data-speed="1.1"
          >
            <img src={gridImages.tiles[3]} alt="Branding" loading="lazy" />
          </div>
          
          {/* CENTER - Featured project */}
          <div 
            ref={centerRef}
            className="immersive-item immersive-item--center"
          >
            <img src={gridImages.center} alt="Proyecto destacado" loading="lazy" />
            <div className="immersive-overlay">
              <span className="immersive-tag">Caso Destacado</span>
              <h3 className="immersive-title">Plataforma de Reservas</h3>
              <p className="immersive-text">+60% en conversión de reservas directas</p>
              <Link to="/proyectos/webs-locales" className="immersive-cta">
                Ver proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div 
            ref={el => itemsRef.current[4] = el}
            className="immersive-item"
            data-speed="0.7"
          >
            <img src={gridImages.tiles[4]} alt="Ecommerce" loading="lazy" />
          </div>

          {/* Row 3 */}
          <div 
            ref={el => itemsRef.current[5] = el}
            className="immersive-item"
            data-speed="1.3"
          >
            <img src={gridImages.tiles[5]} alt="Código" loading="lazy" />
          </div>
          <div 
            ref={el => itemsRef.current[6] = el}
            className="immersive-item"
            data-speed="0.6"
          >
            <img src={gridImages.tiles[6]} alt="Workspace" loading="lazy" />
          </div>
          <div 
            ref={el => itemsRef.current[7] = el}
            className="immersive-item"
            data-speed="1"
          >
            <img src={gridImages.tiles[7]} alt="Equipo" loading="lazy" />
          </div>
        </div>

        {/* Vignette overlay */}
        <div ref={vignetteRef} className="immersive-vignette" />
      </div>
    </section>
  )
}
