import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import './immersiveWorkGrid.css'

gsap.registerPlugin(ScrollTrigger)

// Grid images - restaurant/food themed like reference
const gridImages = {
  tiles: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', // restaurant exterior
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', // steak plated
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', // fine dining
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', // plated food
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', // pizza
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80', // cocktail
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', // dessert
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', // food spread
  ],
  center: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=1200&q=80', // bar interior
}

// Tile speeds for parallax
const tileSpeeds = [0.8, 1.2, 0.9, 0.7, 1.3, 0.6, 1.1, 1]

export function ImmersiveWorkGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const scaleTarget = isMobile ? 3.5 : 5
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
          {/* Item 1 - Tall left */}
          <div ref={el => { itemsRef.current[0] = el }} className="immersive-item">
            <img src={gridImages.tiles[0]} alt="" loading="lazy" />
          </div>
          
          {/* Item 2 - Top middle */}
          <div ref={el => { itemsRef.current[1] = el }} className="immersive-item">
            <img src={gridImages.tiles[1]} alt="" loading="lazy" />
          </div>
          
          {/* Item 3 - Top right wide */}
          <div ref={el => { itemsRef.current[2] = el }} className="immersive-item">
            <img src={gridImages.tiles[2]} alt="" loading="lazy" />
          </div>
          
          {/* Item 4 - Right side */}
          <div ref={el => { itemsRef.current[3] = el }} className="immersive-item">
            <img src={gridImages.tiles[3]} alt="" loading="lazy" />
          </div>
          
          {/* CENTER - Featured project */}
          <div ref={centerRef} className="immersive-item immersive-item--center">
            <img src={gridImages.center} alt="Proyecto destacado" loading="lazy" />
            <div className="immersive-overlay">
              <span className="immersive-tag">Caso Destacado</span>
              <h3 className="immersive-title">Plataforma de Reservas</h3>
              <p className="immersive-text">+60% en conversión de reservas directas</p>
              <Link to="/proyectos/webs-locales" className="immersive-cta">
                Ver proyecto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Item 6 - Bottom left */}
          <div ref={el => { itemsRef.current[4] = el }} className="immersive-item">
            <img src={gridImages.tiles[4]} alt="" loading="lazy" />
          </div>
          
          {/* Item 7 - Bottom middle */}
          <div ref={el => { itemsRef.current[5] = el }} className="immersive-item">
            <img src={gridImages.tiles[5]} alt="" loading="lazy" />
          </div>
          
          {/* Item 8 - Bottom middle-right */}
          <div ref={el => { itemsRef.current[6] = el }} className="immersive-item">
            <img src={gridImages.tiles[6]} alt="" loading="lazy" />
          </div>
          
          {/* Item 9 - Bottom right */}
          <div ref={el => { itemsRef.current[7] = el }} className="immersive-item">
            <img src={gridImages.tiles[7]} alt="" loading="lazy" />
          </div>
        </div>

        {/* Vignette overlay */}
        <div ref={vignetteRef} className="immersive-vignette" />
      </div>
    </section>
  )
}
