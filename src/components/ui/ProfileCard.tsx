import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string | React.ReactNode
}

interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

interface ProfileCardProps {
  img: string
  name: string
  position: string
  bio: string
  skills: Skill[]
  socialLinks?: SocialLink[]
  spotlight?: boolean
  spotlightColor?: string
}

export function ProfileCard({
  img,
  name,
  position,
  bio,
  skills,
  socialLinks = [],
  spotlight = false,
  spotlightColor = '249, 115, 22', // Orange by default
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })

    // 3D tilt effect
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / 20
    const tiltY = (centerX - x) / 20
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-sm rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 28, 0.9) 0%, rgba(12, 12, 18, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.1), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div className="relative z-20 p-6">
        {/* Profile Image */}
        <div className="relative mb-5">
          <div className="relative w-24 h-24 mx-auto">
            {/* Animated ring */}
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{
                background: `linear-gradient(135deg, rgb(${spotlightColor}) 0%, rgba(6, 182, 212, 1) 50%, rgb(${spotlightColor}) 100%)`,
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={img}
              alt={name}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-[#0c0c12]"
            />
          </div>
        </div>

        {/* Name & Position */}
        <div className="text-center mb-4">
          <h3 
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {name}
          </h3>
          <p 
            className="text-xs font-medium uppercase tracking-wider"
            style={{ 
              background: `linear-gradient(135deg, rgb(${spotlightColor}), #06B6D4)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {position}
          </p>
        </div>

        {/* Bio */}
        <p 
          className="text-sm text-white/60 text-center leading-relaxed mb-5"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {bio}
        </p>

        {/* Skills */}
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-wider text-white/30 mb-3 text-center">
            Stack principal
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/70"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: `rgba(${spotlightColor}, 0.4)`,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {typeof skill.icon === 'string' ? (
                  <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                ) : (
                  skill.icon
                )}
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 pt-4 border-t border-white/5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ 
                  background: `rgba(${spotlightColor}, 0.15)`,
                  borderColor: `rgba(${spotlightColor}, 0.4)`,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom gradient accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, rgb(${spotlightColor}), #06B6D4, transparent)`,
        }}
      />
    </motion.div>
  )
}
