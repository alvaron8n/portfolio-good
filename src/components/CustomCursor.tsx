import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) {
      setIsHidden(true)
      return
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(cursorX.get(), cursorY.get())
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement)
        const isClickable =
          computedStyle.cursor === 'pointer' ||
          hoveredElement.tagName === 'A' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') ||
          hoveredElement.closest('button') ||
          hoveredElement.getAttribute('role') === 'button'
        setIsPointer(!!isClickable)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    const interval = setInterval(updateCursorType, 100)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearInterval(interval)
    }
  }, [cursorX, cursorY])

  if (isHidden) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isPointer ? 40 : isPressed ? 6 : 8,
            height: isPointer ? 40 : isPressed ? 6 : 8,
            opacity: isPointer ? 0.3 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: isPointer ? 60 : isPressed ? 20 : 32,
            height: isPointer ? 60 : isPressed ? 20 : 32,
            opacity: isPointer ? 0.5 : 0.3,
            borderColor: isPointer ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
