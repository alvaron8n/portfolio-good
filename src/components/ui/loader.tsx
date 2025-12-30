import { motion } from 'framer-motion'

export function PageLoader() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <motion.div
        className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}