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
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export function ForWho() {
  const { forWho } = content.home

  return (
    <Section id="para-quien" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          {/* Header */}
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {forWho.title}
          </motion.h2>

          {/* Intro */}
          <motion.p
            className="text-white/60 text-lg mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {forWho.intro}
          </motion.p>

          {/* List */}
          <motion.ul
            className="forwho-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {forWho.items.map((item, index) => (
              <motion.li
                key={index}
                className="forwho-list-item"
                variants={itemVariants}
              >
                <span className="forwho-list-dash">—</span>
                <span className="forwho-list-text">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </Section>
  )
}
