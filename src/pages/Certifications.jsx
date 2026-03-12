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
    <div ref={ref} className="reveal glass-card" style={{ padding: '1.5rem' }}>

      <div
        style={{
          fontFamily: 'DM Mono,monospace',
          fontSize: '.67rem',
          color: 'var(--accent)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          marginBottom: '.6rem'
        }}
      >
        {cert.org}
      </div>

      <div
        style={{
          fontFamily: 'Syne,sans-serif',
          fontSize: '.92rem',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.35,
          marginBottom: '.4rem'
        }}
      >
        {cert.name}
      </div>

      <div
        style={{
          fontFamily: 'DM Mono,monospace',
          fontSize: '.67rem',
          color: 'var(--muted)'
        }}
      >
        {cert.year}
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '.3rem',
          background: 'rgba(67,233,123,.1)',
          border: '1px solid rgba(67,233,123,.2)',
          borderRadius: 100,
          padding: '.2rem .65rem',
          fontFamily: 'DM Mono,monospace',
          fontSize: '.62rem',
          color: 'var(--accent3)',
          marginTop: '.8rem'
        }}
      >
        ✓ Verified
      </div>

    </div>
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


  /* SAFE DATA */

  const safeData = data || [
    {
      org: "Amazon Web Services",
      name: "AWS Cloud Practitioner Essentials",
      year: "2025"
    },
    {
      org: "Google",
      name: "Google Cloud Foundations",
      year: "2025"
    },
    {
      org: "Cisco",
      name: "Networking Essentials",
      year: "2024"
    },
    {
      org: "Infosys Springboard",
      name: "Python Programming Certification",
      year: "2024"
    }
  ]


  return (

    <main className="section" style={{ paddingTop: '8rem', position: 'relative', zIndex: 1 }}>

      <div ref={headerRef} className="reveal">
        <div className="section-tag">Certifications</div>
        <h1 className="section-title">
          Verified <em>credentials</em>
        </h1>
      </div>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '1.2rem'
        }}
        className="cert-grid"
      >
        {safeData.map((c, i) => (
          <CertCard key={i} cert={c} delay={i * 0.06} />
        ))}
      </div>


      <style>
        {`
        @media(max-width:1100px){
          .cert-grid{grid-template-columns:repeat(3,1fr)!important;}
        }

        @media(max-width:750px){
          .cert-grid{grid-template-columns:repeat(2,1fr)!important;}
        }

        @media(max-width:500px){
          .cert-grid{grid-template-columns:1fr!important;}
        }
        `}
      </style>

    </main>
  )
}