import { motion } from 'framer-motion'

interface ProjectSectionHeaderProps {
  label: string
  title: string
  description?: string
  className?: string
}

export function ProjectSectionHeader({
  label,
  title,
  description,
  className = ''
}: ProjectSectionHeaderProps) {
  return (
    <motion.div
      className={`crm-section-header ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="crm-section-label">{label}</span>
      <h2>{title}</h2>
      {description && (
        <p className="crm-section-desc">
          {description}
        </p>
      )}
    </motion.div>
  )
}