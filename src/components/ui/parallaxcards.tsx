import { useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, shouldAnimate } from '@/utils/animations'

interface ParallaxCard {
  lightBg: string
  darkBg: string
  content: React.ReactNode
  background?: React.ReactNode
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[]
}

// ============================================
// DESKTOP PARALLAX CARDS - CLEAN COVER EFFECT
// ============================================
function DesktopParallaxCards({ cards }: { cards: ParallaxCard[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveCard = useCallback(
    (progress: number) => {
      const cardCount = cards.length
      const rawIndex = progress * (cardCount - 1)
      const currentIndex = Math.min(Math.round(rawIndex), cardCount - 1)
      setActiveIndex(currentIndex)
    },
    [cards.length]
  )

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const prefersReducedMotion = !shouldAnimate()
      const cardElements =
        sectionRef.current.querySelectorAll<HTMLElement>('.service-card')
      const cardCount = cardElements.length

      if (cardCount === 0) return

      if (prefersReducedMotion) {
        cardElements.forEach((card, index) => {
          gsap.set(card, { yPercent: index === 0 ? 0 : 100 })
        })
        return
      }

      // Scroll distance: 80vh per card transition (faster scrolling)
      const scrollPerCard = window.innerHeight * 0.8
      const scrollDistance = (cardCount - 1) * scrollPerCard

      // Initial state
      cardElements.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
        })

        const bg = card.querySelector<HTMLElement>('.service-bg')
        if (bg) {
          gsap.set(bg, { yPercent: index === 0 ? 0 : 10 })
        }
      })

      // Timeline with pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 0.3,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateActiveCard(self.progress)
          },
        },
      })

      // Card transitions
      const segmentDuration = 1 / (cardCount - 1 || 1)

      for (let i = 1; i < cardCount; i++) {
        const card = cardElements[i]
        const bg = card.querySelector<HTMLElement>('.service-bg')
        const startTime = (i - 1) * segmentDuration

        tl.to(
          card,
          {
            yPercent: 0,
            duration: segmentDuration,
            ease: 'power2.out',
          },
          startTime
        )

        if (bg) {
          tl.to(
            bg,
            {
              yPercent: 0,
              duration: segmentDuration,
              ease: 'power2.out',
            },
            startTime
          )
        }
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    },
        { scope: sectionRef, dependencies: [updateActiveCard] }
  )

  return (
    <section
      ref={sectionRef}
      className="hidden lg:block relative w-full h-screen"
      style={{ background: '#080810' }}
    >
      {/* Cards */}
      {cards.map((card, index) => (
        <article
          key={index}
          className="service-card absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <div className="relative w-full h-full bg-[#080810]">
            <div className="service-bg absolute inset-0 will-change-transform">
              {card.background}
            </div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {card.content}
            </div>
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 20%, rgba(6, 182, 212, 0.3) 80%, transparent 100%)',
              }}
            />
          </div>
        </article>
      ))}

      {/* Navigation dots */}
      <nav
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
        aria-label="Navegación de servicios"
      >
        {cards.map((_, index) => {
          const isActive = index === activeIndex
          const isPast = index < activeIndex

          return (
            <div
              key={index}
              className="relative flex items-center justify-center w-6 h-6"
            >
              <span
                className="absolute inset-0 rounded-full transition-all duration-400"
                style={{
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid transparent',
                  transform: isActive ? 'scale(1)' : 'scale(0.5)',
                  opacity: isActive ? 1 : 0,
                }}
              />
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? '8px' : '5px',
                  height: isActive ? '8px' : '5px',
                  background: isActive
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)'
                    : isPast
                      ? 'rgba(139, 92, 246, 0.5)'
                      : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isActive ? '0 0 16px rgba(139, 92, 246, 0.6)' : 'none',
                }}
              />
            </div>
          )
        })}
      </nav>
    </section>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export default function ParallaxCards({ cards }: ParallaxCardsProps) {
  if (!cards || cards.length === 0) return null
  return <DesktopParallaxCards cards={cards} />
}

export { type ParallaxCard, type ParallaxCardsProps }
