import { useEffect, useRef } from 'react'
import SkillCard from '../components/SkillCard'

function useReveal(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        o.disconnect()
      }
    }, { threshold: 0.1 })

    const el = ref.current
    if (el) {
      el.style.transitionDelay = delay + 's'
      o.observe(el)
    }

    return () => o.disconnect()
  }, [delay])

  return ref
}

export default function Skills({ data }) {

  const h = useReveal(0)
  const r1 = useReveal(.1)
  const r2 = useReveal(.2)
  const r3 = useReveal(.3)

  const safeData = data || {
    languages: [
      { name:'Python', icon:'🐍', level:85 },
      { name:'Java', icon:'☕', level:75 },
      { name:'JavaScript', icon:'🟨', level:80 },
      { name:'C', icon:'🔵', level:70 }
    ],
    tools: ['React','Node.js','Firebase','AWS','Git','Vite'],
    concepts: [
      'Data Structures',
      'Algorithms',
      'OOP',
      'Operating Systems',
      'Database Management',
      'Computer Networks'
    ]
  }

  return (
    <main className="section skills-section">

      {/* HEADER */}
      <div ref={h} className="reveal">
        <div className="section-tag">Skills</div>
        <h1 className="section-title">
          Technologies I <em>work with</em>
        </h1>
      </div>

      <div className="skills-grid">

        {/* LANGUAGES */}
        <div ref={r1} className="reveal skills-card">

          <h2 className="skills-title">
            Core Languages
          </h2>

          {safeData.languages.map(s => (
            <SkillCard key={s.name} {...s} />
          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="skills-right">

          {/* TOOLS */}
          <div ref={r2} className="reveal skills-card">

            <h2 className="skills-title">
              Frameworks & Tools
            </h2>

            <div className="skills-tags">
              {safeData.tools.map(t => (
                <span key={t} className="chip chip--neutral">
                  {t}
                </span>
              ))}
            </div>

          </div>

          {/* CONCEPTS */}
          <div ref={r3} className="reveal skills-card">

            <h2 className="skills-title">
              CS Concepts
            </h2>

            <div className="skills-tags">
              {safeData.concepts.map(t => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}