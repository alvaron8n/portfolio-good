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
  spotlightColor = '249, 115, 22',
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

    // Enhanced 3D tilt effect
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / 15
    const tiltY = (centerX - x) / 15
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
        background: 'linear-gradient(165deg, rgba(22, 22, 30, 0.95) 0%, rgba(12, 12, 18, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: `
          0 25px 60px -15px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: `
          0 35px 70px -20px rgba(0, 0, 0, 0.7),
          0 0 40px rgba(${spotlightColor}, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `,
      }}
    >
      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.12), transparent 40%)`,
          }}
        />
      )}

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.08), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Top shine line */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{ 
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.2) 50%, transparent 90%)' 
        }}
      />

      <div className="relative z-20 p-7">
        {/* Profile Image with animated ring */}
        <div className="relative mb-6">
          <div className="relative w-28 h-28 mx-auto">
            {/* Animated gradient ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, rgb(${spotlightColor}), #06B6D4, rgb(${spotlightColor}))`,
                backgroundSize: '400% 400%',
              }}
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner border */}
            <div className="absolute inset-0 rounded-full bg-[#0c0c12] p-0.5">
              <img
                src={img}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name & Position */}
        <div className="text-center mb-5">
          <h3 
            className="text-xl font-bold text-white mb-1.5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {name}
          </h3>
          <p 
            className="text-[11px] font-semibold uppercase tracking-[0.15em]"
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
          className="text-sm text-white/55 text-center leading-relaxed mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {bio}
        </p>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-3 text-center font-medium">
            Stack principal
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium text-white/70"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: `rgba(${spotlightColor}, 0.4)`,
                  color: 'rgba(255, 255, 255, 0.95)',
                  y: -2,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
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
          <div className="flex justify-center gap-2 pt-5 border-t border-white/5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                whileHover={{ 
                  background: `rgba(${spotlightColor}, 0.15)`,
                  borderColor: `rgba(${spotlightColor}, 0.4)`,
                  scale: 1.1,
                  y: -2,
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

      {/* Bottom gradient accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, rgb(${spotlightColor}), #06B6D4, transparent)`,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
