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

  const safeData = data || [
    {
      id:1,
      num:'01',
      icon:'🌐',
      title:'Sharpoint',
      desc:'A student support platform connecting learners with opportunities and collaboration tools.',
      stack:['React','Firebase','Node.js'],
      demo:'#',
      github:'https://github.com/revanthofficial21',
      featured:true,
      image:'/projects/sharpoint.png'
    },
    {
      id:2,
      num:'02',
      icon:'💰',
      title:'Budget Alert System',
      desc:'Tracks user spending and sends alerts when budgets are exceeded.',
      stack:['Python','AWS','Flask'],
      demo:'#',
      github:'https://github.com/revanthofficial21',
      image:'/projects/budget.png'
    },
    {
      id:3,
      num:'03',
      icon:'📊',
      title:'Portfolio Website',
      desc:'Modern portfolio showcasing projects, skills, and certifications.',
      stack:['React','Vite','CSS'],
      demo:'#',
      github:'https://github.com/revanthofficial21',
      image:'/projects/portfolio.png'
    }
  ]

  return (
    <main className="section projects-section">

      {/* HEADER */}
      <div ref={headerRef} className="reveal">
        <div className="section-tag">Projects</div>
        <h1 className="section-title">
          Things I've <em>built</em>
        </h1>
      </div>

      {/* GRID */}
      <div className="projects-grid">

        {safeData.length > 0 ? (
          safeData.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))
        ) : (
          <div className="projects-empty">
            No projects available yet.
          </div>
        )}

      </div>

    </main>
  )
}