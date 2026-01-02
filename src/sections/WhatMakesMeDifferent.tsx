import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { content } from '../content/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function WhatMakesMeDifferent() {
  const { whatMakesMeDifferent } = content.home

  return (
    <Section id="diferencias" className="py-20 md:py-32">
      <Container>
        {/* Header */}
        <motion.h2
          className="font-display text-2xl md:text-3xl font-bold text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {whatMakesMeDifferent.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: What I do different */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {whatMakesMeDifferent.items.map((item: { title: string; description: string }, index: number) => (
              <motion.article
                key={index}
                className="different-item"
                variants={itemVariants}
              >
                <h3 className="different-item-title">{item.title}</h3>
                <p className="different-item-description">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* Right: What I don't do */}
          <motion.div
            className="different-notdo-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="different-notdo-title">
              {whatMakesMeDifferent.notDo.title}
            </h3>
            <ul className="different-notdo-list">
              {whatMakesMeDifferent.notDo.items.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  className="different-notdo-item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                >
                  <span className="different-notdo-icon">✕</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
