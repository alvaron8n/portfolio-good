import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ThreeDMarqueeProps {
  images: string[]
  className?: string
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  // Split images into 4 columns
  const chunkSize = Math.ceil(images.length / 4)
  const columns = [
    images.slice(0, chunkSize),
    images.slice(chunkSize, chunkSize * 2),
    images.slice(chunkSize * 2, chunkSize * 3),
    images.slice(chunkSize * 3),
  ]

  return (
    <div
      className={cn(
        'relative mx-auto flex h-[500px] sm:h-[600px] lg:h-[700px] w-full max-w-7xl items-center justify-center overflow-hidden rounded-2xl',
        className
      )}
    >
      {/* Fade masks - top and bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32"
        style={{
          background: 'linear-gradient(to bottom, #0A0A0F 0%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          background: 'linear-gradient(to top, #0A0A0F 0%, transparent 100%)',
        }}
      />

      {/* 3D Transformed grid */}
      <div
        className="transform-3d absolute size-full"
        style={{
          transform: 'rotateX(55deg) rotateZ(-45deg)',
          transformOrigin: 'center center',
        }}
      >
        {/* Grid of 4 columns with alternating animations */}
        <div className="flex h-full w-[200%] gap-4 -translate-x-1/4">
          {columns.map((columnImages, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex flex-col gap-4 flex-1"
              animate={{
                y: colIndex % 2 === 0 ? ['-25%', '0%'] : ['0%', '-25%'],
              }}
              transition={{
                duration: colIndex % 2 === 0 ? 14 : 16,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...columnImages, ...columnImages].map((src, imgIndex) => (
                <motion.div
                  key={`${colIndex}-${imgIndex}`}
                  className="group relative overflow-hidden rounded-xl"
                  whileHover={{
                    scale: 1.02,
                    zIndex: 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={src}
                    alt={`Branding showcase ${imgIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
                    }}
                  />
                  {/* Border glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        'inset 0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.15)',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

export default ThreeDMarquee
