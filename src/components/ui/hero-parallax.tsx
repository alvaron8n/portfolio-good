"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useReducedMotion,
} from "framer-motion";

// ============================================
// TYPES
// ============================================
interface ServiceCard {
  title: string;
  category: string;
  thumbnail: string;
  color: string;
}

interface HeroParallaxProps {
  services: ServiceCard[];
  header?: React.ReactNode;
}

// ============================================
// HERO PARALLAX COMPONENT (PREMIUM VERSION)
// ============================================
export const HeroParallax = ({ services, header }: HeroParallaxProps) => {
  const firstRow = services.slice(0, 5);
  const secondRow = services.slice(5, 10);
  const thirdRow = services.slice(10, 15);
  const ref = React.useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smoother spring config
  const springConfig = { stiffness: 200, damping: 40, mass: 1 };

  // Reduced parallax intensity for premium feel
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  
  // Reduced 3D rotation for elegance
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [12, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-500, 300]),
    springConfig
  );

  // For reduced motion: static values
  const staticStyle = prefersReducedMotion ? {
    rotateX: 0,
    rotateZ: 0,
    translateY: 0,
    opacity: 1,
  } : undefined;

  return (
    <div
      ref={ref}
      className="h-[180vh] py-16 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ background: 'var(--color-bg-base, #0a0a0f)' }}
    >
      {/* Custom Header */}
      {header}
      
      {/* Parallax Cards */}
      <motion.div
        style={staticStyle || {
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        {/* Row 1 - Moves Right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 lg:space-x-10 mb-10 lg:mb-14">
          {firstRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={prefersReducedMotion ? undefined : translateX}
              key={service.title}
            />
          ))}
        </motion.div>
        
        {/* Row 2 - Moves Left */}
        <motion.div className="flex flex-row mb-10 lg:mb-14 space-x-6 lg:space-x-10">
          {secondRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={prefersReducedMotion ? undefined : translateXReverse}
              key={service.title}
            />
          ))}
        </motion.div>
        
        {/* Row 3 - Moves Right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 lg:space-x-10">
          {thirdRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={prefersReducedMotion ? undefined : translateX}
              key={service.title}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Background gradient orbs - BRAND ORANGE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/3 -right-[10%] w-[450px] h-[450px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.10) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
    </div>
  );
};

// ============================================
// SERVICE CARD COMPONENT (PREMIUM)
// ============================================
export const ServiceCardComponent = ({
  service,
  translate,
}: {
  service: ServiceCard;
  translate?: MotionValue<number>;
}) => {
  // Map old colors to brand orange
  const brandColor = '#f97316'; // Primary orange
  const brandColorLight = '#fb923c';
  
  return (
    <motion.div
      style={translate ? { x: translate } : undefined}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="group/product h-56 sm:h-64 lg:h-72 w-[260px] sm:w-[300px] lg:w-[350px] relative shrink-0 rounded-2xl overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={service.thumbnail}
        className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-400 group-hover/product:scale-105"
        alt={service.title}
        loading="lazy"
      />
      
      {/* Gradient Overlay - stronger for text legibility */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, 
            rgba(10, 10, 15, 0.2) 0%, 
            rgba(10, 10, 15, 0.5) 50%, 
            rgba(10, 10, 15, 0.92) 100%
          )`,
        }}
      />
      
      {/* Color accent overlay on hover - ORANGE */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/product:opacity-25 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${brandColor}50 0%, transparent 60%)`,
        }}
      />
      
      {/* Category Badge - ORANGE BRAND */}
      <div 
        className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-250 group-hover/product:scale-105"
        style={{
          background: `rgba(249, 115, 22, 0.15)`,
          border: `1px solid rgba(249, 115, 22, 0.35)`,
          color: brandColorLight,
        }}
      >
        {service.category}
      </div>
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 
          className="text-base sm:text-lg font-bold text-white mb-1 transition-transform duration-250 group-hover/product:translate-x-1"
        >
          {service.title}
        </h3>
        
        {/* Animated underline - ORANGE */}
        <div 
          className="h-0.5 w-0 group-hover/product:w-14 transition-all duration-300 rounded-full"
          style={{ background: `linear-gradient(90deg, ${brandColor}, transparent)` }}
        />
      </div>
      
      {/* Border glow on hover - ORANGE */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(249, 115, 22, 0.3), 0 0 25px rgba(249, 115, 22, 0.15)`,
        }}
      />
    </motion.div>
  );
};

// ============================================
// PARALLAX HEADER COMPONENT (PREMIUM)
// ============================================
export const ParallaxHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-16 md:py-24 px-6 lg:px-8 w-full left-0 top-0 z-20">
      {/* Eyebrow - smaller, more subtle, NO duplication with title */}
      {eyebrow && eyebrow.toLowerCase() !== title.toLowerCase() && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] mb-4"
          style={{ color: 'var(--color-primary, #f97316)' }}
        >
          {eyebrow}
        </motion.span>
      )}
      
      {/* Title - Better hierarchy */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
        style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)' }}
      >
        {title}
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-xl text-base sm:text-lg mt-5 leading-relaxed"
        style={{ color: 'rgba(255, 255, 255, 0.55)' }}
      >
        {subtitle}
      </motion.p>
      
      {/* Scroll indicator - more elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 flex items-center gap-3"
      >
        <span 
          className="text-[10px] uppercase tracking-[0.15em] font-medium"
          style={{ color: 'rgba(255, 255, 255, 0.25)' }}
        >
          Scroll
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'rgba(255, 255, 255, 0.25)' }}
        >
          <path 
            d="M10 4v12m0 0l-4-4m4 4l4-4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default HeroParallax;
