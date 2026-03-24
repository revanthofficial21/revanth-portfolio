import { useEffect, useRef } from 'react'

function CertCard({ cert, delay }) {

  const ref = useRef(null)

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          o.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const el = ref.current
    if (el) {
      el.style.transitionDelay = delay + 's'
      o.observe(el)
    }

    return () => o.disconnect()
  }, [delay])

  return (
    <a
      ref={ref}
      href={cert.link || '#'}
      target="_blank"
      rel="noreferrer"
      className="cert-card reveal"
    >

      <div className="cert-org">
        {cert.org}
      </div>

      <div className="cert-name">
        {cert.name}
      </div>

      <div className="cert-year">
        {cert.year}
      </div>

      <div className="cert-badge">
        ✓ Verified
      </div>

    </a>
  )
}

export default function Certifications({ data }) {

  const headerRef = useRef(null)

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          o.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) o.observe(headerRef.current)

    return () => o.disconnect()
  }, [])

  const safeData = data || [
    {
      org: "Amazon Web Services",
      name: "AWS Cloud Practitioner Essentials",
      year: "2025",
      link: "#"
    },
    {
      org: "Google",
      name: "Google Cloud Foundations",
      year: "2025",
      link: "#"
    },
    {
      org: "Cisco",
      name: "Networking Essentials",
      year: "2024",
      link: "#"
    },
    {
      org: "Infosys Springboard",
      name: "Python Programming Certification",
      year: "2024",
      link: "#"
    }
  ]

  return (
    <main className="section cert-section">

      <div ref={headerRef} className="reveal">
        <div className="section-tag">Certifications</div>
        <h1 className="section-title">
          Verified <em>credentials</em>
        </h1>
      </div>

      <div className="cert-grid">
        {safeData.map((c, i) => (
          <CertCard key={i} cert={c} delay={i * 0.06} />
        ))}
      </div>

    </main>
  )
}