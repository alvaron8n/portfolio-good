import { motion } from 'framer-motion'

interface CaseStudyItem {
  icon: string
  title: string
  content: string | string[]
}

interface CaseStudyGridProps {
  challenge: CaseStudyItem
  solution: CaseStudyItem
  results: CaseStudyItem
  accentColor?: string
}

export function CaseStudyGrid({ 
  challenge, 
  solution, 
  results,
  accentColor = '#F97316'
}: CaseStudyGridProps) {
  const cards: Array<CaseStudyItem & { delay: number; highlight?: boolean }> = [
    { ...challenge, delay: 0 },
    { ...solution, delay: 0.1 },
    { ...results, delay: 0.2, highlight: true }
  ]

  return (
    <div className="csg-grid">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: card.delay }}
          className={`csg-card ${card.highlight ? 'csg-card--highlight' : ''}`}
          style={{ '--accent': accentColor } as React.CSSProperties}
        >
          <div className="csg-icon">{card.icon}</div>
          <h3 className="csg-title">{card.title}</h3>
          <div className="csg-content">
            {Array.isArray(card.content) ? (
              <ul className="csg-list">
                {card.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{card.content}</p>
            )}
          </div>
        </motion.div>
      ))}

      <style>{`
        .csg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        @media (max-width: 900px) {
          .csg-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .csg-card {
          position: relative;
          padding: 28px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .csg-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .csg-card--highlight {
          background: linear-gradient(
            135deg,
            rgba(249, 115, 22, 0.12) 0%,
            rgba(251, 146, 60, 0.06) 100%
          );
          border-color: rgba(249, 115, 22, 0.25);
        }

        .csg-card--highlight:hover {
          border-color: rgba(249, 115, 22, 0.4);
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
        }

        .csg-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .csg-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--accent, #F97316);
          margin: 0 0 16px;
        }

        .csg-content {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .csg-content p {
          margin: 0;
        }

        .csg-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .csg-list li {
          position: relative;
          padding-left: 20px;
        }

        .csg-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent, #F97316);
        }

        .csg-card--highlight .csg-list li::before {
          box-shadow: 0 0 10px var(--accent, #F97316);
        }
      `}</style>
    </div>
  )
}
