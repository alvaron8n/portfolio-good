'use client'
import { motion } from 'framer-motion'

type PageType = 'services' | 'about' | 'projects'

interface PageDecorativesProps {
  page: PageType
}

// Colores por página (basados en video home)
const pageColors = {
  services: { primary: '59, 130, 246', accent: '249, 115, 22' },  // Azul + Naranja
  projects: { primary: '16, 185, 129', accent: '251, 146, 60' },  // Esmeralda + Naranja
  about: { primary: '139, 92, 246', accent: '249, 115, 22' },     // Morado + Naranja
}

// ============================================
// SERVICES - Tech Grid Style
// ============================================
function ServicesDecorations() {
  const c = pageColors.services
  return (
    <>
      {/* Grid pattern más visible */}
      <svg className="pgd-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="svc-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={`rgba(${c.primary}, 0.08)`} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svc-grid-pattern)" />
      </svg>

      {/* Corner brackets - más visibles */}
      <svg className="pgd-corner pgd-corner--tl" viewBox="0 0 100 100">
        <path d="M0,70 L0,0 L70,0" fill="none" stroke={`rgba(${c.primary}, 0.3)`} strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="4" fill={`rgba(${c.primary}, 0.6)`}/>
        <circle cx="35" cy="0" r="2" fill={`rgba(${c.accent}, 0.4)`}/>
        <circle cx="0" cy="35" r="2" fill={`rgba(${c.accent}, 0.4)`}/>
      </svg>
      <svg className="pgd-corner pgd-corner--tr" viewBox="0 0 100 100">
        <path d="M100,70 L100,0 L30,0" fill="none" stroke={`rgba(${c.primary}, 0.25)`} strokeWidth="1.5"/>
        <circle cx="100" cy="0" r="4" fill={`rgba(${c.primary}, 0.5)`}/>
      </svg>
      <svg className="pgd-corner pgd-corner--bl" viewBox="0 0 100 100">
        <path d="M0,30 L0,100 L70,100" fill="none" stroke={`rgba(${c.accent}, 0.2)`} strokeWidth="1.5"/>
        <circle cx="0" cy="100" r="3" fill={`rgba(${c.accent}, 0.5)`}/>
      </svg>
      <svg className="pgd-corner pgd-corner--br" viewBox="0 0 100 100">
        <path d="M100,30 L100,100 L30,100" fill="none" stroke={`rgba(${c.primary}, 0.25)`} strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="4" fill={`rgba(${c.primary}, 0.5)`}/>
      </svg>

      {/* Floating circles */}
      <motion.div 
        className="pgd-circle pgd-circle--1"
        style={{ borderColor: `rgba(${c.primary}, 0.15)` }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="pgd-circle pgd-circle--2"
        style={{ borderColor: `rgba(${c.accent}, 0.12)` }}
        animate={{ scale: [1, 0.92, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Horizontal animated lines */}
      <motion.div 
        className="pgd-hline pgd-hline--1"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${c.primary}, 0.4), transparent)` }}
        animate={{ scaleX: [0, 1, 1, 0], x: ['-100%', '0%', '0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="pgd-hline pgd-hline--2"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${c.accent}, 0.3), transparent)` }}
        animate={{ scaleX: [0, 1, 1, 0], x: ['100%', '0%', '0%', '-100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Dot clusters */}
      <div className="pgd-dots pgd-dots--1">
        {[...Array(9)].map((_, i) => (
          <motion.span 
            key={i}
            style={{ background: `rgba(${c.primary}, 0.5)` }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <div className="pgd-dots pgd-dots--2">
        {[...Array(6)].map((_, i) => (
          <motion.span 
            key={i}
            style={{ background: `rgba(${c.accent}, 0.4)` }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Cross markers */}
      <svg className="pgd-cross pgd-cross--1" viewBox="0 0 24 24">
        <path d="M12,2 L12,22 M2,12 L22,12" stroke={`rgba(${c.primary}, 0.35)`} strokeWidth="1.5"/>
      </svg>
      <svg className="pgd-cross pgd-cross--2" viewBox="0 0 24 24">
        <path d="M12,2 L12,22 M2,12 L22,12" stroke={`rgba(${c.accent}, 0.25)`} strokeWidth="1.5"/>
      </svg>
    </>
  )
}

// ============================================
// PROJECTS - Geometric Sharp Style
// ============================================
function ProjectsDecorations() {
  const c = pageColors.projects
  return (
    <>
      {/* Diamond dot grid */}
      <svg className="pgd-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="prj-diamond-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect x="18" y="18" width="4" height="4" fill={`rgba(${c.primary}, 0.1)`} transform="rotate(45 20 20)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#prj-diamond-grid)" />
      </svg>

      {/* Corner brackets */}
      <svg className="pgd-corner pgd-corner--tl" viewBox="0 0 100 100">
        <path d="M0,60 L0,0 L60,0" fill="none" stroke={`rgba(${c.primary}, 0.3)`} strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="4" fill={`rgba(${c.primary}, 0.6)`}/>
        <circle cx="30" cy="0" r="2" fill={`rgba(${c.accent}, 0.5)`}/>
      </svg>
      <svg className="pgd-corner pgd-corner--br" viewBox="0 0 100 100">
        <path d="M100,40 L100,100 L40,100" fill="none" stroke={`rgba(${c.primary}, 0.25)`} strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="4" fill={`rgba(${c.primary}, 0.5)`}/>
      </svg>

      {/* Triangles */}
      <motion.svg 
        className="pgd-triangle pgd-triangle--1" 
        viewBox="0 0 50 50"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <polygon points="25,5 45,45 5,45" fill="none" stroke={`rgba(${c.primary}, 0.2)`} strokeWidth="1.5"/>
      </motion.svg>
      <motion.svg 
        className="pgd-triangle pgd-triangle--2" 
        viewBox="0 0 50 50"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <polygon points="25,45 45,5 5,5" fill="none" stroke={`rgba(${c.accent}, 0.15)`} strokeWidth="1.5"/>
      </motion.svg>

      {/* Vertical animated lines */}
      <motion.div 
        className="pgd-vline pgd-vline--1"
        style={{ background: `linear-gradient(180deg, transparent, rgba(${c.primary}, 0.35), transparent)` }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="pgd-vline pgd-vline--2"
        style={{ background: `linear-gradient(180deg, transparent, rgba(${c.accent}, 0.25), transparent)` }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Squares */}
      <motion.div 
        className="pgd-square pgd-square--1"
        style={{ borderColor: `rgba(${c.primary}, 0.2)` }}
        animate={{ rotate: [0, 90], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="pgd-square pgd-square--2"
        style={{ borderColor: `rgba(${c.accent}, 0.15)` }}
        animate={{ rotate: [45, 135], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      />

      {/* Floating circles */}
      <motion.div 
        className="pgd-circle pgd-circle--3"
        style={{ borderColor: `rgba(${c.primary}, 0.12)` }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </>
  )
}

// ============================================
// ABOUT - Organic Flow Style  
// ============================================
function AboutDecorations() {
  const c = pageColors.about
  return (
    <>
      {/* Subtle dot pattern */}
      <svg className="pgd-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="about-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill={`rgba(${c.primary}, 0.08)`}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-dots)" />
      </svg>

      {/* Corner brackets */}
      <svg className="pgd-corner pgd-corner--tl" viewBox="0 0 100 100">
        <path d="M0,65 L0,0 L65,0" fill="none" stroke={`rgba(${c.primary}, 0.3)`} strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="4" fill={`rgba(${c.primary}, 0.6)`}/>
      </svg>
      <svg className="pgd-corner pgd-corner--br" viewBox="0 0 100 100">
        <path d="M100,35 L100,100 L35,100" fill="none" stroke={`rgba(${c.accent}, 0.25)`} strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="4" fill={`rgba(${c.accent}, 0.5)`}/>
      </svg>

      {/* Curved paths */}
      <svg className="pgd-curve pgd-curve--1" viewBox="0 0 200 100">
        <motion.path 
          d="M0,50 Q50,0 100,50 T200,50" 
          fill="none" 
          stroke={`rgba(${c.primary}, 0.15)`} 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </svg>
      <svg className="pgd-curve pgd-curve--2" viewBox="0 0 200 100">
        <motion.path 
          d="M0,50 Q50,100 100,50 T200,50" 
          fill="none" 
          stroke={`rgba(${c.accent}, 0.12)`} 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />
      </svg>

      {/* Plus markers */}
      <svg className="pgd-plus pgd-plus--1" viewBox="0 0 24 24">
        <path d="M12,4 L12,20 M4,12 L20,12" stroke={`rgba(${c.primary}, 0.3)`} strokeWidth="2"/>
      </svg>
      <svg className="pgd-plus pgd-plus--2" viewBox="0 0 24 24">
        <path d="M12,4 L12,20 M4,12 L20,12" stroke={`rgba(${c.accent}, 0.2)`} strokeWidth="2"/>
      </svg>

      {/* Floating blobs */}
      <motion.div 
        className="pgd-blob pgd-blob--1"
        style={{ background: `radial-gradient(circle, rgba(${c.primary}, 0.08) 0%, transparent 70%)` }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="pgd-blob pgd-blob--2"
        style={{ background: `radial-gradient(circle, rgba(${c.accent}, 0.06) 0%, transparent 70%)` }}
        animate={{ y: [0, 15, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, delay: 4 }}
      />

      {/* Dot matrix */}
      <div className="pgd-dotmatrix">
        {[...Array(20)].map((_, i) => (
          <motion.span 
            key={i}
            style={{ background: `rgba(${c.primary}, 0.4)` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export function PageDecoratives({ page }: PageDecorativesProps) {
  return (
    <div className="pgd-container" aria-hidden="true">
      {page === 'services' && <ServicesDecorations />}
      {page === 'about' && <AboutDecorations />}
      {page === 'projects' && <ProjectsDecorations />}
      <style>{styles}</style>
    </div>
  )
}

const styles = `
  .pgd-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  /* Grid */
  .pgd-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  /* Corners */
  .pgd-corner {
    position: absolute;
    width: 100px;
    height: 100px;
  }
  .pgd-corner--tl { top: 8%; left: 4%; }
  .pgd-corner--tr { top: 8%; right: 4%; }
  .pgd-corner--bl { bottom: 12%; left: 4%; }
  .pgd-corner--br { bottom: 12%; right: 4%; }

  /* Circles */
  .pgd-circle {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid;
  }
  .pgd-circle--1 { width: 280px; height: 280px; top: 15%; left: 5%; }
  .pgd-circle--2 { width: 200px; height: 200px; bottom: 25%; right: 8%; }
  .pgd-circle--3 { width: 240px; height: 240px; top: 35%; right: 3%; }

  /* Horizontal lines */
  .pgd-hline {
    position: absolute;
    height: 1px;
    width: 180px;
  }
  .pgd-hline--1 { top: 30%; left: 2%; }
  .pgd-hline--2 { bottom: 35%; right: 2%; }

  /* Vertical lines */
  .pgd-vline {
    position: absolute;
    width: 1px;
    height: 120px;
    transform-origin: top center;
  }
  .pgd-vline--1 { top: 20%; left: 8%; }
  .pgd-vline--2 { bottom: 25%; right: 10%; }

  /* Dots */
  .pgd-dots {
    position: absolute;
    display: grid;
    gap: 8px;
  }
  .pgd-dots--1 { 
    grid-template-columns: repeat(3, 1fr); 
    top: 45%; 
    left: 3%; 
  }
  .pgd-dots--2 { 
    grid-template-columns: repeat(2, 1fr); 
    bottom: 40%; 
    right: 5%; 
  }
  .pgd-dots span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  /* Cross markers */
  .pgd-cross {
    position: absolute;
    width: 24px;
    height: 24px;
  }
  .pgd-cross--1 { top: 22%; left: 20%; }
  .pgd-cross--2 { bottom: 30%; right: 18%; }

  /* Triangles */
  .pgd-triangle {
    position: absolute;
    width: 50px;
    height: 50px;
  }
  .pgd-triangle--1 { top: 25%; right: 12%; }
  .pgd-triangle--2 { bottom: 30%; left: 10%; }

  /* Squares */
  .pgd-square {
    position: absolute;
    border: 1.5px solid;
  }
  .pgd-square--1 { width: 35px; height: 35px; top: 50%; left: 6%; }
  .pgd-square--2 { width: 25px; height: 25px; bottom: 40%; right: 12%; }

  /* Curves */
  .pgd-curve {
    position: absolute;
    width: 180px;
    height: 90px;
  }
  .pgd-curve--1 { top: 35%; left: 2%; }
  .pgd-curve--2 { bottom: 30%; right: 2%; }

  /* Plus markers */
  .pgd-plus {
    position: absolute;
    width: 24px;
    height: 24px;
  }
  .pgd-plus--1 { top: 20%; left: 12%; }
  .pgd-plus--2 { bottom: 35%; right: 15%; }

  /* Blobs */
  .pgd-blob {
    position: absolute;
    border-radius: 50%;
  }
  .pgd-blob--1 { width: 300px; height: 300px; top: 40%; left: -5%; }
  .pgd-blob--2 { width: 220px; height: 220px; bottom: 15%; right: -3%; }

  /* Dot matrix */
  .pgd-dotmatrix {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    top: 30%;
    right: 6%;
  }
  .pgd-dotmatrix span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .pgd-corner { width: 70px; height: 70px; }
    .pgd-circle--1 { width: 180px; height: 180px; }
    .pgd-circle--2 { width: 140px; height: 140px; }
    .pgd-circle--3 { width: 160px; height: 160px; }
    .pgd-hline { width: 120px; }
    .pgd-vline { height: 80px; }
    .pgd-blob--1 { width: 200px; height: 200px; }
    .pgd-blob--2 { width: 150px; height: 150px; }
  }

  @media (max-width: 768px) {
    .pgd-corner { width: 50px; height: 50px; }
    .pgd-circle--1 { width: 120px; height: 120px; }
    .pgd-circle--2 { width: 100px; height: 100px; }
    .pgd-hline { width: 80px; }
    .pgd-triangle { width: 35px; height: 35px; }
    .pgd-dotmatrix { grid-template-columns: repeat(4, 1fr); gap: 8px; }
  }
`

export default PageDecoratives
