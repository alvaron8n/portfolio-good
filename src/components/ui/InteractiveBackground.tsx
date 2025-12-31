import { useRef, useEffect } from 'react'

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let time = 0

    // Grid configuration
    const gridSize = 40
    const horizonY = height * 0.4 // Perspective vanishing point height
    const speed = 0.5
    
    // Mouse interaction
    const mouse = { x: width / 2, y: height / 2 }
    const targetMouse = { x: width / 2, y: height / 2 }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX
      targetMouse.y = e.clientY
    }

    const drawGrid = () => {
      if (!ctx) return
      
      // Clear with fade effect for trails (optional, but clean clear is better here)
      ctx.clearRect(0, 0, width, height)
      
      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05

      // Calculate grid offset based on time and mouse
      const offsetX = (mouse.x - width / 2) * 0.1
      const offsetZ = time * speed

      // Gradient for fading out distant lines
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)')
      gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.02)')
      gradient.addColorStop(1, 'rgba(112, 0, 255, 0.08)') // Violet at bottom

      ctx.strokeStyle = gradient
      ctx.lineWidth = 1

      // Draw Vertical Lines (converging to vanishing point)
      // We draw lines starting from bottom and going up
      const fov = 300
      const viewDist = 200
      
      // Horizontal Lines (moving towards camera)
      // Z goes from 0 (camera) to positive (distance)
      // We actually want lines on the ground plane
      
      // SIMPLER PERSPECTIVE GRID APPROACH
      
      // 1. Vertical Lines
      const verticalLines = Math.ceil(width / gridSize) + 10
      const centerX = width / 2
      
      ctx.beginPath()
      for (let i = -verticalLines / 2; i <= verticalLines / 2; i++) {
        // X position at bottom of screen
        const xBottom = centerX + i * gridSize * 3 + offsetX
        
        // Vanishing point (approximate)
        const xTop = centerX + i * gridSize * 0.1 + offsetX * 0.1
        
        ctx.moveTo(xTop, -100) // Start above screen
        ctx.lineTo(xBottom, height)
      }
      ctx.stroke()

      // 2. Horizontal Lines (moving down)
      ctx.beginPath()
      const horizontalLines = 20
      
      for (let i = 0; i < horizontalLines; i++) {
        // Exponential spacing for perspective
        const perspective = Math.pow(i / horizontalLines, 2.5) // Higher power = more bunching at top
        
        // Animated Z offset
        const zOffset = (time * 0.2) % 1 // 0 to 1 loop
        
        // Calculate Y position
        // We want lines to start near top and move down
        // Adjust i with zOffset to animate
        const animatedI = i + zOffset
        const animatedPerspective = Math.pow(animatedI / horizontalLines, 2.5)
        
        const y = animatedPerspective * height
        
        if (y > 0 && y < height) {
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
      }
      ctx.stroke()
      
      // 3. Floating Particles (Data bits)
      const particleCount = 20
      const pTime = time * 0.02
      
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)'
      
      for(let i = 0; i < particleCount; i++) {
        const x = ((Math.sin(i * 123.45 + pTime) * 0.5 + 0.5) * width)
        const y = ((Math.cos(i * 678.90 + pTime * 1.5) * 0.5 + 0.5) * height)
        const size = Math.random() * 2
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      time += 1
      drawGrid()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Setup
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 mix-blend-screen"
    />
  )
}