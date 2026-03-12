import { useEffect, useRef } from 'react'

function useReveal(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    const el = ref.current
    if (el) {
      el.style.transitionDelay = delay + 's'
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [delay])

  return ref
}

export default function About({ data }) {

  const h = useReveal(0)
  const left = useReveal(0.1)
  const vis = useReveal(0.2)

  /* SAFE DATA */
  const safeData = data || {
    bio: [
      "I'm **Revanth Kumar**, a B.Tech CSIT student at **KL University** passionate about building modern web applications.",
      "I focus on **React, Python, and cloud technologies**, and I enjoy turning ideas into real projects.",
      "Currently preparing for **software engineering roles** while building strong full-stack development skills."
    ],
    highlights: [
      { icon: "💻", title: "Full Stack", desc: "React · Node · Python" },
      { icon: "☁️", title: "Cloud", desc: "AWS & Serverless" },
      { icon: "🚀", title: "Projects", desc: "Sharpoint · Budget Alert System" },
      { icon: "🎓", title: "Education", desc: "B.Tech CSIT · KL University" }
    ]
  }

  return (
    <main className="section" style={{ paddingTop: '8rem', position: 'relative', zIndex: 1 }}>
      
      <div ref={h} className="reveal">
        <div className="section-tag">About Me</div>
        <h1 className="section-title">
          Turning <em>curiosity</em> into code
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center'
        }}
        className="about-grid"
      >

        {/* Bio */}
        <div ref={left} className="reveal">
          {safeData.bio.map((p, i) => (
            <p
              key={i}
              style={{
                color: 'var(--light)',
                lineHeight: 1.85,
                fontSize: '1rem',
                fontWeight: 300,
                marginBottom: '1.1rem'
              }}
              dangerouslySetInnerHTML={{
                __html: p.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong style="color:var(--text);font-weight:600">$1</strong>'
                )
              }}
            />
          ))}

          {/* Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '2rem'
            }}
          >
            {safeData.highlights.map(h => (
              <div key={h.title} className="glass-card" style={{ padding: '1.2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '.45rem' }}>
                  {h.icon}
                </div>

                <div
                  style={{
                    fontFamily: 'Syne,sans-serif',
                    fontWeight: 700,
                    fontSize: '.88rem',
                    color: 'var(--text)',
                    marginBottom: '.2rem'
                  }}
                >
                  {h.title}
                </div>

                <div
                  style={{
                    fontFamily: 'DM Mono,monospace',
                    fontSize: '.68rem',
                    color: 'var(--muted)'
                  }}
                >
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div
          ref={vis}
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          
          {/* Orbit */}
          <div
            style={{
              position: 'absolute',
              width: 360,
              height: 360,
              border: '1px dashed rgba(108,99,255,.2)',
              borderRadius: '50%',
              animation: 'spin 22s linear infinite',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                background: 'var(--accent)',
                borderRadius: '50%',
                top: -5,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 12px var(--accent)'
              }}
            />
          </div>

          {/* Second orbit */}
          <div
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              border: '1px dashed rgba(255,101,132,.15)',
              borderRadius: '50%',
              animation: 'spin 14s linear infinite reverse',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: 'var(--accent2)',
                borderRadius: '50%',
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px var(--accent2)'
              }}
            />
          </div>

          {/* Avatar */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 'var(--r-lg)',
              background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne,sans-serif',
              fontSize: '5rem',
              fontWeight: 800,
              color: 'rgba(255,255,255,.9)',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(108,99,255,.35)',
              animation: 'float 5s ease-in-out infinite',
            }}
          >
            R

            <div
              style={{
                position: 'absolute',
                bottom: -18,
                right: -18,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '.75rem 1.1rem',
                fontFamily: 'DM Mono,monospace',
                fontSize: '.72rem',
                color: 'var(--accent3)',
                boxShadow: '0 8px 24px rgba(0,0,0,.3)',
                whiteSpace: 'nowrap',
              }}
            >
              💻 Open to Intern
              <span style={{ display: 'block', color: 'var(--muted)', fontSize: '.62rem', marginTop: '.15rem' }}>
                Available Now
              </span>
            </div>

          </div>
        </div>

      </div>

      <style>
        {`
        @media(max-width:900px){
          .about-grid{grid-template-columns:1fr!important;}
          .about-grid>div:last-child{display:none;}
        }
        `}
      </style>

    </main>
  )
}