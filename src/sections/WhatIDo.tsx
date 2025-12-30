import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function WhatIDo() {
  const { whatIDo } = content.home

  return (
    <Section id="que-hago" className="py-20 md:py-32">
      <Container>
        {/* Header */}
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {whatIDo.title}
        </motion.h2>

        {/* Items */}
        <motion.div
          className="space-y-12 md:space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {whatIDo.items.map((item, index) => (
            <motion.article
              key={item.id}
              className="whatido-item-block"
              variants={itemVariants}
            >
              <div className="whatido-item-inner">
                {/* Number */}
                <span className="whatido-item-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Content */}
                <div className="whatido-item-content">
                  <h3 className="whatido-item-title">
                    {item.title}
                  </h3>
                  <p className="whatido-item-description">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
