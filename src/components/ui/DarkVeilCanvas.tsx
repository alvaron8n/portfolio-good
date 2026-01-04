import { useEffect, useRef, useCallback } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

// ============================================
// TYPES
// ============================================
interface DarkVeilCanvasProps {
  hueShift?: number
  noiseIntensity?: number
  scanlineIntensity?: number
  scanlineFrequency?: number
  warpAmount?: number
  speed?: number
  resolutionScale?: number
  className?: string
}

// ============================================
// SHADERS
// ============================================
const vertexShader = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uHueShift;
  uniform float uNoiseIntensity;
  uniform float uScanlineIntensity;
  uniform float uScanlineFrequency;
  uniform float uWarpAmount;

  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // HSV to RGB conversion
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;

    // Fluid warp distortion - slow, organic movement
    float warpX = snoise(vec2(uv.y * 2.0 + uTime * 0.12, uTime * 0.08)) * uWarpAmount;
    float warpY = snoise(vec2(uv.x * 2.0 + uTime * 0.10, uTime * 0.06)) * uWarpAmount;
    vec2 warpedUv = uv + vec2(warpX, warpY);

    // Multi-layered noise for rich, fluid texture
    float noise1 = snoise(warpedUv * 1.2 + uTime * 0.05) * 0.5 + 0.5;
    float noise2 = snoise(warpedUv * 2.4 - uTime * 0.07) * 0.5 + 0.5;
    float noise3 = snoise(warpedUv * 4.0 + uTime * 0.04) * 0.5 + 0.5;

    // Stronger noise contribution for visible "volume"
    float combinedNoise = (noise1 * 0.5 + noise2 * 0.35 + noise3 * 0.15);
    float noiseEffect = combinedNoise * uNoiseIntensity * 8.0; // Amplified noise effect

    // Scanlines - extremely subtle, almost imperceptible
    float scanline = sin(uv.y * uResolution.y * uScanlineFrequency * 0.003) * 0.5 + 0.5;
    scanline = scanline * uScanlineIntensity * 0.08; // Nearly invisible

    // BRIGHTER base color - premium violet/purple palette
    float hue = 0.76 + uHueShift / 360.0 + noiseEffect * 0.04;
    float sat = 0.50 + noiseEffect * 0.25; // More saturation variation
    float val = 0.38 + noiseEffect * 0.45 + scanline * 0.01; // Much brighter base (0.38)

    vec3 color = hsv2rgb(vec3(hue, sat, val));

    // Very soft vignette - barely darkens edges
    vec2 vignetteUv = uv * 2.0 - 1.0;
    vignetteUv.x *= aspect;
    float vignette = 1.0 - length(vignetteUv) * 0.15; // Reduced from 0.25
    vignette = clamp(vignette, 0.0, 1.0);

    color *= vignette;

    // Minimal vertical gradient - keeps brightness uniform
    color *= mix(0.95, 1.0, uv.y); // Almost no darkening

    gl_FragColor = vec4(color, 1.0);
  }
`

// ============================================
// COMPONENT
// ============================================
export function DarkVeilCanvas({
  hueShift = 0,
  noiseIntensity = 0.03,
  scanlineIntensity = 0.05,
  scanlineFrequency = 1.2,
  warpAmount = 0.015,
  speed = 0.25,
  resolutionScale = 1,
  className = '',
}: DarkVeilCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const programRef = useRef<Program | null>(null)
  const rafRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)
  const startTimeRef = useRef<number>(0)
  const animateRef = useRef<(() => void) | null>(null)
  const speedRef = useRef(speed)

  // Keep speed ref updated
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  // Store animate function in ref via effect (not during render)
  useEffect(() => {
    animateRef.current = () => {
      if (!isVisibleRef.current || !rendererRef.current || !programRef.current) {
        return
      }

      const elapsed = (Date.now() - startTimeRef.current) * 0.001 * speedRef.current

      programRef.current.uniforms.uTime.value = elapsed

      // @ts-expect-error - mesh property added dynamically
      rendererRef.current.render({ scene: programRef.current.mesh as Mesh })

      rafRef.current = requestAnimationFrame(() => animateRef.current?.())
    }
  }, [])
  
  const animate = useCallback(() => {
    animateRef.current?.()
  }, [])

  useEffect(() => {
    if (!containerRef.current || resolutionScale === 0) return

    const container = containerRef.current

    // Check WebGL support
    const testCanvas = document.createElement('canvas')
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
    if (!gl) {
      console.warn('WebGL not supported, DarkVeil canvas will not render')
      return
    }

    // Create renderer
    const dpr = Math.min(window.devicePixelRatio, 2) * resolutionScale
    const renderer = new Renderer({
      dpr,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    rendererRef.current = renderer

    const canvas = renderer.gl.canvas as HTMLCanvasElement
    canvas.className = `darkveil-canvas ${className}`
    canvasRef.current = canvas
    container.appendChild(canvas)

    // Create geometry (fullscreen triangle)
    const geometry = new Triangle(renderer.gl)

    // Create program
    const program = new Program(renderer.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uHueShift: { value: hueShift },
        uNoiseIntensity: { value: noiseIntensity },
        uScanlineIntensity: { value: scanlineIntensity },
        uScanlineFrequency: { value: scanlineFrequency },
        uWarpAmount: { value: warpAmount },
      },
    })
    programRef.current = program

    // Create mesh and attach to program for reference
    const mesh = new Mesh(renderer.gl, { geometry, program })
    ;(program as Program & { mesh: Mesh }).mesh = mesh

    // Initial size
    const updateSize = () => {
      if (!container || !renderer) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = [width, height]
      }
    }
    updateSize()

    // ResizeObserver for responsive sizing
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    // IntersectionObserver to pause when not visible
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false
        isVisibleRef.current = isVisible

        if (isVisible && !rafRef.current) {
          startTimeRef.current = Date.now()
          animate()
        } else if (!isVisible && rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(container)

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    scanlineFrequency,
    warpAmount,
    resolutionScale,
    className,
    animate,
  ])

  // Don't render container if resolution scale is 0 (mobile fallback)
  if (resolutionScale === 0) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export default DarkVeilCanvas
