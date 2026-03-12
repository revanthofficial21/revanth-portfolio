import { useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'

export default function Projects({ data }) {

  const headerRef = useRef(null)

  useEffect(() => {

    const o = new IntersectionObserver(([e]) => {

      if (e.isIntersecting) {
        e.target.classList.add('visible')
        o.disconnect()
      }

    }, { threshold: 0.1 })

    if (headerRef.current) o.observe(headerRef.current)

    return () => o.disconnect()

  }, [])


  /* SAFE PROJECT DATA */

  const safeData = data || [

    {
      id:1,
      num:'01',
      icon:'🌐',
      title:'Sharpoint',
      desc:'A student support platform connecting learners with opportunities, resources, and collaboration tools.',
      stack:['React','Firebase','Node.js'],
      demo:'#',
      github:'https://github.com/revanthofficial21',
      featured:true
    },

    {
      id:2,
      num:'02',
      icon:'💰',
      title:'Budget Usage & Alert System',
      desc:'Cloud-based system that tracks user spending and sends alerts when budgets are exceeded.',
      stack:['Python','AWS','Flask'],
      demo:'#',
      github:'https://github.com/revanthofficial21'
    },

    {
      id:3,
      num:'03',
      icon:'📊',
      title:'Personal Portfolio',
      desc:'Modern developer portfolio built with React showcasing projects, skills, and certifications.',
      stack:['React','Vite','CSS'],
      demo:'#',
      github:'https://github.com/revanthofficial21'
    }

  ]


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

      <div ref={headerRef} className="reveal">

        <div className="section-tag">Projects</div>

        <h1 className="section-title">
          Things I've <em>built</em>
        </h1>

      </div>


      {/* Projects Grid */}

      <div
        style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'1.4rem'
        }}
        className="projects-grid"
      >

        {safeData.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}

      </div>


      {/* Responsive */}

      <style>
        {`
        @media(max-width:900px){

          .projects-grid{
            grid-template-columns:1fr!important;
          }

          .projects-grid article{
            grid-column:span 1!important;
          }

        }
        `}
      </style>

    </main>
  )
}