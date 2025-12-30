import { useRef, useEffect, useState, useMemo, useId } from 'react'
import './CurvedLoop.css'

interface CurvedLoopProps {
  marqueeText?: string
  speed?: number
  className?: string
  curveAmount?: number
  direction?: 'left' | 'right'
  interactive?: boolean
}

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className = '',
  curveAmount = 120,
  direction = 'left',
  interactive = true
}: CurvedLoopProps) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText)
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0'
  }, [marqueeText])

  const measureRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const [spacing, setSpacing] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const uid = useId()
  const pathId = `curve-${uid}`
  
  // Curva adaptativa
  const actualCurve = isMobile ? curveAmount * 0.5 : curveAmount
  const pathD = `M-100,60 Q720,${60 + actualCurve} 1540,60`

  const dragRef = useRef(false)
  const lastXRef = useRef(0)
  const dirRef = useRef(direction)
  const velRef = useRef(0)
  const frameRef = useRef<number>(0)

  const totalText = spacing > 0
    ? Array(Math.ceil(2000 / spacing) + 2).fill(text).join('')
    : text
  const ready = spacing > 0

  // Detect preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    checkMobile()
    
    window.addEventListener('resize', checkMobile)
    mq.addEventListener('change', (e) => setPrefersReducedMotion(e.matches))
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Measure text
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength())
    }
  }, [text, className])

  // Set initial offset
  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const initial = -spacing
    textPathRef.current.setAttribute('startOffset', initial + 'px')
    setOffset(initial)
  }, [spacing])

  // Animation loop
  useEffect(() => {
    if (!spacing || !ready || prefersReducedMotion) return

    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0')
        let newOffset = currentOffset + delta

        if (newOffset <= -spacing) newOffset += spacing
        if (newOffset > 0) newOffset -= spacing

        textPathRef.current.setAttribute('startOffset', newOffset + 'px')
        setOffset(newOffset)
      }
      frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [spacing, speed, ready, prefersReducedMotion])

  // Drag handlers (desktop only)
  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || isMobile) return
    dragRef.current = true
    lastXRef.current = e.clientX
    velRef.current = 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || isMobile || !dragRef.current || !textPathRef.current) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    velRef.current = dx

    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0')
    let newOffset = currentOffset + dx

    if (newOffset <= -spacing) newOffset += spacing
    if (newOffset > 0) newOffset -= spacing

    textPathRef.current.setAttribute('startOffset', newOffset + 'px')
    setOffset(newOffset)
  }

  const endDrag = () => {
    if (!interactive || isMobile) return
    dragRef.current = false
    dirRef.current = velRef.current > 0 ? 'right' : 'left'
  }

  const cursorStyle = interactive && !isMobile
    ? (dragRef.current ? 'grabbing' : 'grab')
    : 'default'

  return (
    <div
      className="curved-loop-wrap"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="curved-loop-svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Hidden measure text */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        
        {ready && (
          <text xmlSpace="preserve" className={`curved-loop-text ${className}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offset + 'px'}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  )
}

export default CurvedLoop
