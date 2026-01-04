'use client'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const ShaderGradientCanvas = lazy(() => 
  import('@shadergradient/react').then(mod => ({ default: mod.ShaderGradientCanvas }))
)
const ShaderGradient = lazy(() => 
  import('@shadergradient/react').then(mod => ({ default: mod.ShaderGradient }))
)

export type ShaderPreset = 'services' | 'about' | 'projects'

// ============================================
// STATIC FALLBACK 
// ============================================
function StaticFallback({ preset }: { preset: ShaderPreset }) {
  const gradients: Record<ShaderPreset, string> = {
    // Services: Azul + Naranja (como el video)
    services: `
      radial-gradient(ellipse 60% 50% at 20% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, #08080c 0%, #111118 100%)
    `,
    // Projects: Verde esmeralda + Naranja
    projects: `
      radial-gradient(ellipse 55% 45% at 25% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 45% 35% at 75% 60%, rgba(251, 146, 60, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, #08080c 0%, #111118 100%)
    `,
    // About: Morado + Naranja cálido
    about: `
      radial-gradient(ellipse 55% 45% at 30% 35%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 45% 35% at 70% 65%, rgba(249, 115, 22, 0.07) 0%, transparent 50%),
      linear-gradient(180deg, #08080c 0%, #111118 100%)
    `,
  }
  return <div className="absolute inset-0" style={{ background: gradients[preset] }} />
}

// ============================================
// MAIN COMPONENT
// ============================================
interface ShaderBackgroundProps {
  preset: ShaderPreset
  className?: string
}

export function ShaderBackground({ preset, className = '' }: ShaderBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted || prefersReducedMotion) {
    return (
      <div className={`shader-hero-bg ${className}`} aria-hidden="true">
        <StaticFallback preset={preset} />
        <div className="shader-hero-fade" />
        <style>{styles}</style>
      </div>
    )
  }

  const pixelDensity = isMobile ? 0.35 : 0.7

  return (
    <div className={`shader-hero-bg ${className}`} aria-hidden="true">
      {/* Dark overlay para suavizar */}
      <div className="shader-dark-overlay" />
      
      <Suspense fallback={<StaticFallback preset={preset} />}>
        <ShaderGradientCanvas
          style={{ position: 'absolute', inset: 0 }}
          pixelDensity={pixelDensity}
        >
          {/* SERVICES - Azul profundo + Naranja sutil (como video home) */}
          {preset === 'services' && (
            <ShaderGradient
              animate="on"
              brightness={0.6}
              cAzimuthAngle={180}
              cDistance={5.5}
              cPolarAngle={85}
              cameraZoom={1}
              color1="#1e40af"
              color2="#f97316"
              color3="#0c1929"
              envPreset="dawn"
              grain="on"
              lightType="3d"
              positionX={-1.2}
              positionY={0}
              positionZ={0}
              reflection={0.1}
              rotationX={0}
              rotationY={10}
              rotationZ={45}
              type="waterPlane"
              uDensity={0.5}
              uFrequency={3.5}
              uSpeed={0.06}
              uStrength={2.5}
              uAmplitude={0.6}
              uTime={0}
            />
          )}
          
          {/* PROJECTS - Esmeralda + Naranja cálido - AMPLIADO */}
          {preset === 'projects' && (
            <ShaderGradient
              animate="on"
              brightness={0.7}
              cAzimuthAngle={180}
              cDistance={2.5}
              cPolarAngle={90}
              cameraZoom={1}
              color1="#065f46"
              color2="#fb923c"
              color3="#0a1a14"
              envPreset="city"
              grain="on"
              lightType="3d"
              positionX={0}
              positionY={0}
              positionZ={0}
              reflection={0.15}
              rotationX={0}
              rotationY={10}
              rotationZ={45}
              type="waterPlane"
              uDensity={0.6}
              uFrequency={4}
              uSpeed={0.08}
              uStrength={3}
              uAmplitude={0.8}
              uTime={0}
            />
          )}
          
          {/* ABOUT - Morado + Naranja (como acentos del video) */}
          {preset === 'about' && (
            <ShaderGradient
              animate="on"
              brightness={0.6}
              cAzimuthAngle={180}
              cDistance={4}
              cPolarAngle={80}
              cameraZoom={6}
              color1="#5b21b6"
              color2="#ea580c"
              color3="#1e1b4b"
              envPreset="city"
              grain="on"
              lightType="3d"
              positionX={0}
              positionY={0}
              positionZ={0}
              reflection={0.1}
              rotationX={40}
              rotationY={0}
              rotationZ={-50}
              type="waterPlane"
              uDensity={1}
              uFrequency={0}
              uSpeed={0.1}
              uStrength={1}
              uAmplitude={0}
              uTime={5}
            />
          )}
        </ShaderGradientCanvas>
      </Suspense>

      {/* Fade hacia el contenido */}
      <div className="shader-hero-fade" />
      
      <style>{styles}</style>
    </div>
  )
}

const styles = `
  .shader-hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .shader-dark-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 8, 12, 0.55);
    z-index: 2;
    pointer-events: none;
  }

  .shader-hero-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, transparent 0%, #18181b 100%);
    z-index: 3;
    pointer-events: none;
  }
`

export default ShaderBackground
