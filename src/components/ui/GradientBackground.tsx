import { lazy, Suspense } from 'react'

const ShaderGradientCanvas = lazy(() => 
  import('@shadergradient/react').then(mod => ({ default: mod.ShaderGradientCanvas }))
)
const ShaderGradient = lazy(() => 
  import('@shadergradient/react').then(mod => ({ default: mod.ShaderGradient }))
)

interface GradientBackgroundProps {
  className?: string
  opacity?: number
}

export function GradientBackground({ 
  className = '',
  opacity = 0.5 
}: GradientBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-amber-500/10 to-transparent" />
      }>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            brightness={0.8}
            cAzimuthAngle={180}
            cDistance={2.8}
            cPolarAngle={80}
            cameraZoom={9.1}
            color1="#fbbf24"
            color2="#ea580c"
            color3="#212121"
            envPreset="city"
            grain="on"
            lightType="3d"
            positionX={0}
            positionY={0}
            positionZ={0}
            reflection={0.1}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            type="waterPlane"
            uDensity={1.4}
            uSpeed={0.3}
            uStrength={1}
            uTime={8}
          />
        </ShaderGradientCanvas>
      </Suspense>
      
      {/* Overlay para legibilidad */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.7) 100%)'
        }}
      />
    </div>
  )
}
