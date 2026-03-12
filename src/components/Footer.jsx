import { NavLink } from 'react-router-dom'

export default function Footer({ contact }) {

  const info = contact || {
    github: "https://github.com/revanthofficial21",
    linkedin: "https://www.linkedin.com/in/revanth-kumar",
    email: "revanthofficial21@gmail.com"
  }

  return (
    <footer style={{
      padding: '2rem 7vw',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      position: 'relative',
      zIndex: 10,
    }}>

      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '.72rem',
        color: 'var(--muted)'
      }}>
        Designed & Built by{' '}
        <span style={{ color: 'var(--accent)' }}>
          Revanth Kumar
        </span>{' '}
        · 2026 · KL University · CSIT
      </p>


      <div style={{ display: 'flex', gap: '.7rem' }}>

        {[
          { label: 'GH', href: info.github },
          { label: 'in', href: info.linkedin },
          { label: '✉', href: `mailto:${info.email}` },
        ].map(s => (

          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--muted)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '.75rem',
              transition: 'all .2s',
            }}

            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}

            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            {s.label}
          </a>

        ))}

      </div>
    </footer>
  )
}