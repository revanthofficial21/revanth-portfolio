import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/',               label: 'Home',    num: '00' },
  { to: '/about',          label: 'About',   num: '01' },
  { to: '/skills',         label: 'Skills',  num: '02' },
  { to: '/projects',       label: 'Projects',num: '03' },
  { to: '/certifications', label: 'Certs',   num: '04' },
]

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [location])

  const linkStyle = (isActive) => ({
    fontFamily: 'DM Mono, monospace',
    fontSize: '.76rem',
    color: isActive ? 'var(--text)' : 'var(--muted)',
    letterSpacing: '.05em',
    padding: '.3rem 0',
    borderBottom: isActive
      ? '1px solid var(--accent)'
      : '1px solid transparent',
    transition: 'color .2s, border-color .2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.35rem',
  })

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '1rem 7vw' : '1.6rem 7vw',
          background: scrolled ? 'rgba(7,7,15,.88)' : 'transparent',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          transition: 'all .4s',
        }}
      >

        {/* Logo */}
        <NavLink
          to="/"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.35rem',
            letterSpacing: '-.04em',
            background: 'linear-gradient(135deg,#fff,var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RK<span style={{ color: 'var(--accent)', WebkitTextFillColor: 'var(--accent)' }}>.</span>
        </NavLink>


        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.2rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="hide-mobile"
        >

          {LINKS.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                style={({ isActive }) => linkStyle(isActive)}
              >
                <span style={{ color: 'var(--accent)', fontSize: '.65rem' }}>
                  {l.num}
                </span>
                {l.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/contact"
              className="btn btn-primary"
              style={{
                padding: '.5rem 1.3rem',
                fontSize: '.78rem',
                borderRadius: 6,
              }}
            >
              Contact
            </NavLink>
          </li>

        </ul>


        {/* Burger Menu Button */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '1.5rem',
            lineHeight: 1,
          }}
          className="burger-btn"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>


      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          background: 'rgba(7,7,15,.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity .3s',
        }}
      >

        {[...LINKS, { to: '/contact', label: 'Contact', num: '05' }].map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            style={({ isActive }) => ({
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '2rem',
              color: isActive ? 'var(--accent)' : 'var(--text)',
              transition: 'color .2s',
            })}
          >
            {l.label}
          </NavLink>
        ))}

      </div>


      <style>{`
        @media(max-width:900px) {
          .burger-btn { display:block !important; }
        }
      `}</style>
    </>
  )
}