import { useRef, useLayoutEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import './immersiveWorkGrid.css'

gsap.registerPlugin(ScrollTrigger)

// ===========================================
// DATA - Placeholder images
// ===========================================
const galleryImages = {
  facade: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  meat: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=900&q=85',
  bar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=90',
  tapa: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80',
  pulpo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80',
  gambas: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
  huevo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80',
}

const featuredProject = {
  tag: 'Caso Destacado',
  title: 'Plataforma de Reservas',
  description: '+60% en conversión de reservas directas',
  link: '/proyectos/webs-locales',
}

// ===========================================
// COMPONENT
// ===========================================
export function ImmersiveWorkGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // Ref callback helper - fixes TypeScript error
  const setItemRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el
  }, [])

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      
      // Calculate center item position for transform-origin
      const updateTransformOrigin = () => {
        if (!gridRef.current || !centerRef.current) return
        
        const gridRect = gridRef.current.getBoundingClientRect()
        const centerRect = centerRef.current.getBoundingClientRect()
        
        const originX = ((centerRect.left - gridRect.left) + centerRect.width / 2) / gridRect.width * 100
        const originY = ((centerRect.top - gridRect.top) + centerRect.height / 2) / gridRect.height * 100
        
        gridRef.current.style.transformOrigin = `${originX}% ${originY}%`
      }
      
      updateTransformOrigin()
      window.addEventListener('resize', updateTransformOrigin)

      // Animation parameters - ENHANCED for immersion
      const scaleTarget = isMobile ? 4.5 : isTablet ? 5.5 : 6
      const scrollDistance = isMobile ? 700 : isTablet ? 1100 : 1400

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: isMobile ? 'top top' : 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: isMobile ? 0.5 : 1.2,
          anticipatePin: 1,
          pinSpacing: true,
        }
      })

      // Directions for peripheral items - ENHANCED spread
      const directions = [
        { x: -1.8, y: -0.6 },  // facade - left up
        { x: 0.4, y: -1.8 },   // meat - top
        { x: 1.8, y: 0.2 },    // tapa - right
        { x: -1.5, y: 1.5 },   // pulpo - bottom left
        { x: 0, y: 1.8 },      // gambas - bottom center
        { x: 1.5, y: 1.5 },    // huevo - bottom right
      ]

      // ========================================
      // PHASE 1: Black flash at start (0 - 0.15)
      // Creates "blink" effect entering the image
      // ========================================
      tl.to(blackOverlayRef.current, {
        opacity: 0.6,
        duration: 0.15,
        ease: 'power2.in'
      }, 0)
      
      tl.to(blackOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out'
      }, 0.15)

      // ========================================
      // PHASE 2: Peripheral items disperse (0 - 0.6)
      // They fly away from center with blur
      // ========================================
      itemsRef.current.forEach((item, index) => {
        if (!item) return
        
        const dir = directions[index] || { x: 0, y: 0 }
        const distance = isMobile ? 180 : 250
        const blurAmount = isMobile ? 25 : 40
        const stagger = index * 0.02 // Slight stagger for organic feel

        tl.to(item, {
          opacity: 0,
          scale: 0.4,
          filter: `blur(${blurAmount}px)`,
          x: dir.x * distance,
          y: dir.y * distance,
          duration: 0.6,
          ease: 'power3.inOut'
        }, stagger)
      })

      // ========================================
      // PHASE 3: Grid scales up (0 - 0.7)
      // Zooming into center image
      // ========================================
      tl.to(gridRef.current, {
        scale: scaleTarget,
        duration: 0.7,
        ease: 'power2.inOut'
      }, 0)

      // ========================================
      // PHASE 4: Center image enhancement (0.1 - 0.8)
      // ========================================
      if (centerRef.current) {
        // Remove border radius for fullscreen feel
        tl.to(centerRef.current, {
          borderRadius: '0px',
          borderWidth: '0px',
          boxShadow: 'none',
          duration: 0.5,
          ease: 'power2.out'
        }, 0.2)

        // Ken Burns effect on the image itself
        const centerImg = centerRef.current.querySelector('.iwg-center-img')
        if (centerImg) {
          tl.to(centerImg, {
            scale: 1.15,
            duration: 0.8,
            ease: 'power1.inOut'
          }, 0.1)
        }
        
        // Fade out overlay content
        const overlay = centerRef.current.querySelector('.iwg-overlay')
        if (overlay) {
          tl.to(overlay, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.in'
          }, 0.1)
        }
      }

      // ========================================
      // PHASE 5: Vignette - ONLY during mid transition
      // Completely gone at the end for clean image
      // ========================================
      tl.fromTo(vignetteRef.current, 
        { opacity: 0 },
        {
          opacity: 0.7,
          duration: 0.2,
          ease: 'power2.in'
        }, 0.15)
      
      // Vignette completely fades out before end
      tl.to(vignetteRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.4)

      return () => {
        window.removeEventListener('resize', updateTransformOrigin)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="iwg-section">
      {/* Section intro */}
      <div className="iwg-intro">
        <span className="iwg-label">Trabajo Reciente</span>
        <h2 className="iwg-heading">
          <span className="iwg-heading-line">Proyectos que</span>
          <span className="iwg-accent">transforman</span>
          <span className="iwg-heading-line">negocios</span>
        </h2>
      </div>

      {/* Immersive grid wrapper */}
      <div ref={wrapperRef} className="iwg-wrapper">
        <div ref={gridRef} className="iwg-grid">
          
          {/* FACADE - Left tall */}
          <div ref={setItemRef(0)} className="iwg-item iwg-facade">
            <img src={galleryImages.facade} alt="Fachada" loading="lazy" />
          </div>

          {/* MEAT - Top right wide */}
          <div ref={setItemRef(1)} className="iwg-item iwg-meat">
            <img src={galleryImages.meat} alt="Plato principal" loading="lazy" />
          </div>

          {/* BAR - CENTER (PIN TARGET) */}
          <div ref={centerRef} className="iwg-item iwg-center">
            <img 
              className="iwg-center-img"
              src={galleryImages.bar} 
              alt={featuredProject.title} 
              loading="lazy"
            />
            <div className="iwg-overlay">
              <span className="iwg-tag">{featuredProject.tag}</span>
              <h3 className="iwg-title">{featuredProject.title}</h3>
              <p className="iwg-text">{featuredProject.description}</p>
              <Link to={featuredProject.link} className="iwg-cta">
                Ver proyecto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* TAPA - Right of center */}
          <div ref={setItemRef(2)} className="iwg-item iwg-tapa">
            <img src={galleryImages.tapa} alt="Tapa" loading="lazy" />
          </div>

          {/* PULPO - Bottom left */}
          <div ref={setItemRef(3)} className="iwg-item iwg-pulpo">
            <img src={galleryImages.pulpo} alt="Pulpo" loading="lazy" />
          </div>

          {/* GAMBAS - Bottom center */}
          <div ref={setItemRef(4)} className="iwg-item iwg-gambas">
            <img src={galleryImages.gambas} alt="Gambas" loading="lazy" />
          </div>

          {/* HUEVO - Bottom right */}
          <div ref={setItemRef(5)} className="iwg-item iwg-huevo">
            <img src={galleryImages.huevo} alt="Huevo" loading="lazy" />
          </div>

        </div>

        {/* Vignette - tunnel vision effect */}
        <div ref={vignetteRef} className="iwg-vignette" />
        
        {/* Black overlay - blink/flash effect */}
        <div ref={blackOverlayRef} className="iwg-black-overlay" />
      </div>
    </section>
  )
}
