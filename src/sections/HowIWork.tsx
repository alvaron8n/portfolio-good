import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function HowIWork() {
  const { howIWork } = content.home

  return (
    <Section id="como-trabajo" className="py-20 md:py-32 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {howIWork.title}
        </motion.h2>

        {/* Steps */}
        <motion.div
          className="howiwork-steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {howIWork.steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="howiwork-step"
              variants={stepVariants}
            >
              {/* Connector line */}
              {index < howIWork.steps.length - 1 && (
                <div className="howiwork-connector" />
              )}
              
              {/* Number */}
              <div className="howiwork-step-number">
                <span>{step.number}</span>
              </div>
              
              {/* Content */}
              <div className="howiwork-step-content">
                <h3 className="howiwork-step-title">{step.title}</h3>
                <p className="howiwork-step-description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
