import { Link } from 'react-router-dom'
import { Container } from '../Container'
import { Section } from '../Section'

interface ProjectNavigationProps {
  prevProject?: {
    title: string
    href: string
  }
  nextProject: {
    title: string
    href: string
  }
  className?: string
}

export function ProjectNavigation({
  prevProject = { title: 'Todos los proyectos', href: '/proyectos' },
  nextProject,
  className = ''
}: ProjectNavigationProps) {
  return (
    <Section className={`crm-nav-projects ${className}`}>
      <Container>
        <div className="crm-nav-grid">
          <Link to={prevProject.href} className="crm-nav-item crm-nav-item--prev">
            <span className="crm-nav-label">← Volver</span>
            <span className="crm-nav-title">{prevProject.title}</span>
          </Link>
          <Link to={nextProject.href} className="crm-nav-item crm-nav-item--next">
            <span className="crm-nav-label">Siguiente →</span>
            <span className="crm-nav-title">{nextProject.title}</span>
          </Link>
        </div>
      </Container>
    </Section>
  )
}