import { useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'

export function useScrollVelocity(sensitivity = 1) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-sensitivity, sensitivity])
  
  return skew
}