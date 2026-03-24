import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function CodeWindow({ name }) {
  return (
    <div className="code-window">

      <div className="code-header">
        <span></span><span></span><span></span>
        <p>revanth.js</p>
      </div>

      <div className="code-body">
        <p><span className="pu">const</span> <span className="bl">developer</span> = {'{'}</p>
        <p className="pad">name: "<span className="ye">{name}</span>",</p>
        <p className="pad">role: "<span className="ye">Full Stack Dev</span>",</p>
        <p className="pad">stack: ["React","Node","Python"],</p>
        <p className="pad">available: <span className="re">true</span></p>
        <p>{'};'}</p>

        <br />

        <p><span className="pu">hire</span>(developer)</p>
        <span className="cursor"></span>
      </div>

    </div>
  )
}

export default function Home({ data }) {

  const hero = data?.hero || {
    name:"Revanth Kumar",
    role:"Full Stack Developer",
    tagline:"Building modern web applications with real-world impact.",
    available:true,
    stats:[
      { num:"3+", label:"Projects" },
      { num:"5+", label:"Certifications" },
      { num:"1+", label:"Internship Goal" }
    ]
  }

  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = 0
    el.style.transform = 'translateY(30px)'

    setTimeout(() => {
      el.style.transition = 'all .8s ease'
      el.style.opacity = 1
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <main className="hero">

      {/* LEFT */}
      <div ref={ref} className="hero-left">

        <div className="hero-badge">
          <span className="dot"></span>
          {hero.available ? 'Open to Internships' : 'Busy'}
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="white">{hero.name}</span>
          <span className="gradient">{hero.role}</span>
        </h1>

        <p className="hero-desc">
          {hero.tagline}
        </p>

        <div className="hero-actions">
          <Link to="/projects" className="btn btn-primary">
            View Work →
          </Link>

          <Link to="/contact" className="btn btn-ghost">
            Contact Me
          </Link>
        </div>

        <div className="hero-stats">
          {hero.stats.map(s => (
            <div key={s.label}>
              <h3>{s.num}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT */}
      <div className="hero-right hide-mobile">
        <CodeWindow name={hero.name} />
      </div>

    </main>
  )
}