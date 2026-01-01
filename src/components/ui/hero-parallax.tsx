"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
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
// HERO PARALLAX COMPONENT
// ============================================
export const HeroParallax = ({ services, header }: HeroParallaxProps) => {
  const firstRow = services.slice(0, 5);
  const secondRow = services.slice(5, 10);
  const thirdRow = services.slice(10, 15);
  const ref = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Softer spring for smoother motion
  const springConfig = { stiffness: 200, damping: 40, bounce: 0 };

  // Reduced parallax intensity (was 800, now 500)
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  // Reduced rotation (was 15/20, now 10/12)
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [12, 0]),
    springConfig
  );
  // Reduced vertical movement
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 350]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[170vh] py-16 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ background: '#080810' }}
    >
      {/* Custom Header */}
      {header}
      
      {/* Parallax Cards */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        {/* Row 1 - Moves Right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 lg:space-x-10 mb-10 lg:mb-12">
          {firstRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={translateX}
              key={service.title}
            />
          ))}
        </motion.div>
        
        {/* Row 2 - Moves Left */}
        <motion.div className="flex flex-row mb-10 lg:mb-12 space-x-8 lg:space-x-10">
          {secondRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={translateXReverse}
              key={service.title}
            />
          ))}
        </motion.div>
        
        {/* Row 3 - Moves Right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 lg:space-x-10">
          {thirdRow.map((service) => (
            <ServiceCardComponent
              service={service}
              translate={translateX}
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
          className="absolute bottom-1/3 -right-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.10) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
    </div>
  );
};

// ============================================
// SERVICE CARD COMPONENT
// ============================================
export const ServiceCardComponent = ({
  service,
  translate,
}: {
  service: ServiceCard;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -16,
        scale: 1.02,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group/product h-56 sm:h-64 lg:h-72 w-[260px] sm:w-[300px] lg:w-[350px] relative shrink-0 rounded-2xl overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={service.thumbnail}
        className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
        alt={service.title}
        loading="lazy"
      />
      
      {/* Gradient Overlay - lighter for better legibility */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(8, 8, 16, 0.3) 40%, 
            rgba(8, 8, 16, 0.85) 100%
          )`,
        }}
      />
      
      {/* Color accent overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/product:opacity-25 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${service.color}40 0%, transparent 60%)`,
        }}
      />
      
      {/* Category Badge */}
      <div 
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 group-hover/product:scale-105"
        style={{
          background: `${service.color}20`,
          border: `1px solid ${service.color}40`,
          color: service.color,
        }}
      >
        {service.category}
      </div>
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 
          className="text-lg sm:text-xl font-bold text-white mb-1 transition-transform duration-300 group-hover/product:translate-x-1"
        >
          {service.title}
        </h3>
        
        {/* Animated underline */}
        <div 
          className="h-0.5 w-0 group-hover/product:w-16 transition-all duration-300 rounded-full"
          style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
        />
      </div>
      
      {/* Border glow on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${service.color}30, 0 0 25px ${service.color}15`,
        }}
      />
    </motion.div>
  );
};

// ============================================
// PARALLAX HEADER COMPONENT
// ============================================
export const ParallaxHeader = ({
  title,
  subtitle,
}: {
  eyebrow?: string; // kept for backwards compat but not rendered (avoids duplication)
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-16 md:py-24 px-6 lg:px-8 w-full left-0 top-0 z-20">
      {/* Title - no eyebrow to avoid duplication */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl text-base sm:text-lg md:text-xl mt-5 text-white/60 leading-relaxed"
      >
        {subtitle}
      </motion.p>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex items-center gap-3"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">
          Scroll para explorar
        </span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-orange-400/70"
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroParallax;
