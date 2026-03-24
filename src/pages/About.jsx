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

  const safeData = data || {
    bio: [
      "I'm **Revanth Kumar**, a B.Tech CSIT student at **KL University** passionate about building modern web applications.",
      "I focus on **React, Java , and cloud technologies**, and I enjoy turning ideas into real projects.",
      "Currently preparing for **software engineering roles** while building strong full-stack development skills."
    ],
    highlights: [
      { icon: "💻", title: "Full Stack", desc: "React · Node · Python" },
      { icon: "☁️", title: "Cloud", desc: "AWS & Serverless" },
      { icon: "🚀", title: "Projects", desc: "Sharpoint · Budget Tracker" },
      { icon: "🎓", title: "Education", desc: "B.Tech CSIT · KL University" }
    ]
  }

  return (
    <main className="section about-section">

      {/* HEADER */}
      <div ref={h} className="reveal">
        <div className="section-tag">About Me</div>
        <h1 className="section-title">
          Turning <em>curiosity</em> into code
        </h1>
      </div>

      <div className="about-grid">

        {/* LEFT */}
        <div ref={left} className="reveal">

          {safeData.bio.map((p, i) => (
            <p
              key={i}
              className="about-text"
              dangerouslySetInnerHTML={{
                __html: p.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong>$1</strong>'
                )
              }}
            />
          ))}

          {/* HIGHLIGHTS */}
          <div className="about-highlights">
            {safeData.highlights.map(h => (
              <div key={h.title} className="about-card">
                <div className="about-icon">{h.icon}</div>
                <div className="about-title">{h.title}</div>
                <div className="about-desc">{h.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-cta">
            <a href="/resume.pdf" download className="btn btn-primary">
              Download Resume
            </a>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div ref={vis} className="about-visual">

          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>

          <div className="avatar">
            R

            <div className="status">
              💻 Open to Intern
              <span>Available Now</span>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}