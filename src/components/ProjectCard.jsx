import { useRef } from 'react'

export default function ProjectCard({ project = {}, index = 0 }) {

  const cardRef = useRef(null)

  // 3-D tilt on mouse move
  const handleMove = (e) => {

    const card = cardRef.current
    if (!card) return

    const { left, top, width, height } = card.getBoundingClientRect()

    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    card.style.transform =
      `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`
  }

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (

    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}

      style={{
        background: project?.featured
          ? 'linear-gradient(135deg,rgba(108,99,255,.09) 0%,var(--card) 55%)'
          : 'var(--card)',

        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',

        padding: '2rem',

        display: 'flex',
        flexDirection: 'column',

        position: 'relative',
        overflow: 'hidden',

        gridColumn: project?.featured ? 'span 2' : 'span 1',

        transition: 'border-color .3s, box-shadow .3s',

        willChange: 'transform',
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-lit)'
        e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,.4)'
      }}

      onMouseLeaveCapture={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >

      {/* Accent line */}

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
          borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
          opacity: 0,
          transition: 'opacity .35s',
        }}
        className="card-accent-line"
      />



      {/* Project Number */}

      <span
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '3.2rem',
          fontWeight: 800,
          color: 'rgba(108,99,255,.09)',
          lineHeight: 1,
          marginBottom: '.8rem',
          userSelect: 'none',
        }}
      >
        {project?.num || `0${index}`}
      </span>



      {/* Project Icon */}

      <span style={{ fontSize: '2rem', marginBottom: '.8rem' }}>
        {project?.icon || '💻'}
      </span>



      {/* Title */}

      <h3
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-.02em',
          marginBottom: '.55rem',
        }}
      >
        {project?.title || 'Project Title'}
      </h3>



      {/* Description */}

      <p
        style={{
          color: 'var(--muted)',
          fontSize: '.87rem',
          lineHeight: 1.7,
          fontWeight: 300,
          flex: 1,
          marginBottom: '1.4rem',
        }}
      >
        {project?.desc || 'Project description'}
      </p>



      {/* Tech Stack */}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.4rem',
          marginBottom: '1.4rem'
        }}
      >
        {(project?.stack ?? []).map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>



      {/* Links */}

      <div style={{ display: 'flex', gap: '.9rem', marginTop: 'auto' }}>

        {[
          project?.demo && project.demo !== '#' && {
            href: project.demo,
            label: '↗ Live Demo'
          },

          project?.github && project.github !== '#' && {
            href: project.github,
            label: '⌥ GitHub'
          },

        ]
          .filter(Boolean)
          .map((l) => (

            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"

              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '.73rem',
                color: 'var(--muted)',
                transition: 'color .2s',
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)'
              }}
            >
              {l.label}
            </a>
          ))}

      </div>



      {/* Hover Accent */}

      <style>
        {`
          .card-accent-line { opacity: 0 }
          article:hover .card-accent-line { opacity: 1 }
        `}
      </style>

    </article>
  )
}