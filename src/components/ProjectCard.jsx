import { useRef } from 'react'

export default function ProjectCard({ project = {}, index = 0 }) {

  const cardRef = useRef(null)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    card.style.transform =
      `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`

    card.style.setProperty('--x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <article
      ref={cardRef}
      className={`project-card ${project?.featured ? 'featured' : ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >

      {/* IMAGE */}
      <div className="project-image">
        <img
          src={project?.image || 'https://via.placeholder.com/600x400'}
          alt={project?.title}
        />
      </div>

      {/* CONTENT */}
      <div className="project-content">

        <span className="project-num">
          {project?.num || `0${index}`}
        </span>

        <h3 className="project-title">
          {project?.title || 'Project Title'}
        </h3>

        <p className="project-desc">
          {project?.desc || 'Project description'}
        </p>

        {/* STACK */}
        <div className="project-stack">
          {(project?.stack ?? []).map(s => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>

        {/* LINKS */}
        <div className="project-links">

          {project?.demo && project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
              ↗ Live
            </a>
          )}

          {project?.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              ⌥ Code
            </a>
          )}

        </div>

      </div>
    </article>
  )
}