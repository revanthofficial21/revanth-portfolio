import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home', num: '00' },
  { to: '/about', label: 'About', num: '01' },
  { to: '/skills', label: 'Skills', num: '02' },
  { to: '/projects', label: 'Projects', num: '03' },
  { to: '/certifications', label: 'Certs', num: '04' },
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

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

        {/* LOGO */}
        <NavLink to="/" className="logo">
          RK<span>.</span>
        </NavLink>

        {/* DESKTOP MENU */}
        <ul className="nav-links hide-mobile">
          {LINKS.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className="nav-link">
                <span>{l.num}</span>
                {l.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink to="/contact" className="btn btn-primary nav-btn">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* BURGER */}
        <button
          className={`burger ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {[...LINKS, { to: '/contact', label: 'Contact' }].map(l => (
          <NavLink key={l.to} to={l.to} className="mobile-link">
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}