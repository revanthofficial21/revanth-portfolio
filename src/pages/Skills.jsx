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

  /* SAFE SKILLS DATA */

  const safeData = data || {
    languages: [
      { name:'Python', icon:'🐍', level:85 },
      { name:'Java', icon:'☕', level:75 },
      { name:'JavaScript', icon:'🟨', level:80 },
      { name:'C', icon:'🔵', level:70 }
    ],

    tools: [
      'React',
      'Node.js',
      'Firebase',
      'AWS',
      'Git',
      'Vite'
    ],

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

    <main
      className="section"
      style={{
        paddingTop:'8rem',
        position:'relative',
        zIndex:1
      }}
    >

      {/* Header */}

      <div ref={h} className="reveal">

        <div className="section-tag">Skills</div>

        <h1 className="section-title">
          Technologies I <em>work with</em>
        </h1>

      </div>



      <div
        style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'4rem',
          alignItems:'start'
        }}
        className="skills-grid"
      >

        {/* Languages */}

        <div
          ref={r1}
          className="reveal glass-card"
          style={{ padding:'2rem' }}
        >

          <h2 style={{
            fontFamily:'Syne,sans-serif',
            fontWeight:700,
            fontSize:'.85rem',
            color:'var(--muted)',
            letterSpacing:'.1em',
            textTransform:'uppercase',
            marginBottom:'1.6rem',
            paddingBottom:'.8rem',
            borderBottom:'1px solid var(--border)'
          }}>
            Core Languages
          </h2>

          {safeData.languages.map(s => (
            <SkillCard key={s.name} {...s} />
          ))}

        </div>



        {/* Tools + Concepts */}

        <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>

          {/* Tools */}

          <div
            ref={r2}
            className="reveal glass-card"
            style={{ padding:'2rem' }}
          >

            <h2 style={{
              fontFamily:'Syne,sans-serif',
              fontWeight:700,
              fontSize:'.85rem',
              color:'var(--muted)',
              letterSpacing:'.1em',
              textTransform:'uppercase',
              marginBottom:'1.4rem',
              paddingBottom:'.8rem',
              borderBottom:'1px solid var(--border)'
            }}>
              Frameworks & Tools
            </h2>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'.55rem' }}>

              {safeData.tools.map(t => (
                <span key={t} className="chip chip--neutral">
                  {t}
                </span>
              ))}

            </div>

          </div>



          {/* Concepts */}

          <div
            ref={r3}
            className="reveal glass-card"
            style={{ padding:'2rem' }}
          >

            <h2 style={{
              fontFamily:'Syne,sans-serif',
              fontWeight:700,
              fontSize:'.85rem',
              color:'var(--muted)',
              letterSpacing:'.1em',
              textTransform:'uppercase',
              marginBottom:'1.4rem',
              paddingBottom:'.8rem',
              borderBottom:'1px solid var(--border)'
            }}>
              CS Concepts
            </h2>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'.55rem' }}>

              {safeData.concepts.map(t => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>


      {/* Responsive */}

      <style>
        {`
        @media(max-width:900px){
          .skills-grid{
            grid-template-columns:1fr!important;
          }
        }
        `}
      </style>

    </main>
  )
}