import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Gentle floating motion
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + 0.5
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#f97316"
        emissive="#ea580c"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.15}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fff5e6" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#fbbf24" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#f97316" />
      <FloatingTorus />
    </>
  )
}

interface Floating3DObjectProps {
  className?: string
}

export function Floating3DObject({ className = '' }: Floating3DObjectProps) {
  return (
    <div className={`floating-3d-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
      
      <style>{`
        .floating-3d-container {
          position: absolute;
          width: 400px;
          height: 400px;
          pointer-events: none;
          opacity: 0.7;
          filter: blur(0.5px);
        }
        
        @media (max-width: 1024px) {
          .floating-3d-container {
            width: 280px;
            height: 280px;
            opacity: 0.5;
          }
        }
        
        @media (max-width: 640px) {
          .floating-3d-container {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
