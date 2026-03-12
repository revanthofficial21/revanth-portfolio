import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* tiny code-window sub-component */
function CodeWindow({ name }) {

  const C = ({ c, children }) => {
    const map = {
      pu:'#c084fc',
      bl:'#60a5fa',
      gr:'#4ade80',
      ye:'#fbbf24',
      re:'#f87171',
      mu:'#4b5563',
      wh:'#e2e8f0',
      or:'#fb923c'
    }

    return <span style={{ color: map[c] }}>{children}</span>
  }

  const L = ({ pad=0, children }) => (
    <div style={{ paddingLeft: pad * 1.2 + 'rem', lineHeight: 1.85 }}>
      {children}
    </div>
  )

  return (
    <div style={{
      background:'var(--card)',
      border:'1px solid var(--border)',
      borderRadius:14,
      overflow:'hidden',
      maxWidth:500,
      width:'100%',
      boxShadow:'0 30px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(108,99,255,.08)',
      animation:'slide-right .8s ease .3s both'
    }}>

      {/* window bar */}

      <div style={{
        background:'#0a0a14',
        padding:'.85rem 1.2rem',
        display:'flex',
        alignItems:'center',
        gap:'.45rem',
        borderBottom:'1px solid var(--border)'
      }}>

        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{
            width:11,
            height:11,
            borderRadius:'50%',
            background:c
          }} />
        ))}

        <span style={{
          marginLeft:'.5rem',
          fontFamily:'DM Mono,monospace',
          fontSize:'.7rem',
          color:'var(--muted)'
        }}>
          revanth.js
        </span>

      </div>

      {/* code block */}

      <div style={{
        padding:'1.4rem 1.6rem',
        fontFamily:'DM Mono,monospace',
        fontSize:'.79rem'
      }}>

        <L><C c="pu">const</C> <C c="bl">developer</C> <C c="wh">= {'{'}</C></L>

        <L pad={1}>
          <C c="gr">name</C><C c="wh">: </C>
          <C c="ye">"{name || 'Revanth Kumar'}"</C><C c="wh">,</C>
        </L>

        <L pad={1}>
          <C c="gr">role</C><C c="wh">: </C>
          <C c="ye">"CSIT Student @ KL University"</C><C c="wh">,</C>
        </L>

        <L pad={1}>
          <C c="gr">stack</C><C c="wh">: [</C>
          <C c="ye">"React"</C><C c="wh">, </C>
          <C c="ye">"Node.js"</C><C c="wh">, </C>
          <C c="ye">"Python"</C>
          <C c="wh">],</C>
        </L>

        <L pad={1}>
          <C c="gr">available</C><C c="wh">: </C>
          <C c="re">true</C>
        </L>

        <L><C c="wh">{'};'}</C></L>

        <br />

        <L><C c="pu">function</C> <C c="bl">hire</C><C c="wh">(dev) {'{'}</C></L>
        <L pad={1}>
          <C c="pu">return</C> <C c="ye">`Best decision! 🚀`</C><C c="wh">;</C>
        </L>
        <L><C c="wh">{'}'}</C></L>

        <br />

        <L><C c="mu">// Output:</C></L>
        <L>
          <C c="gr">hire</C><C c="wh">(developer);</C>
          <span style={{
            display:'inline-block',
            width:2,
            height:'1em',
            background:'var(--accent)',
            animation:'cursor-blink 1s step-end infinite',
            verticalAlign:'text-bottom'
          }} />
        </L>

      </div>
    </div>
  )
}



/* ─── HOME PAGE ───────────────────────── */

export default function Home({ data }) {

  const hero = data?.hero || {
    name:"Revanth Kumar",
    role:"Full Stack Developer",
    tagline:"CSIT Student at KL University building modern web applications.",
    available:true,
    stats:[
      { num:"3+", label:"Projects" },
      { num:"5+", label:"Certifications" },
      { num:"1+", label:"Internship Goal" }
    ]
  }

  const leftRef = useRef(null)

  useEffect(() => {

    const el = leftRef.current
    if (!el) return

    el.style.opacity = 0
    el.style.transform = 'translateY(20px)'

    const t = setTimeout(() => {
      el.style.transition = 'opacity .9s ease, transform .9s ease'
      el.style.opacity = 1
      el.style.transform = 'translateY(0)'
    }, 80)

    return () => clearTimeout(t)

  }, [])

  return (

    <main style={{
      minHeight:'100vh',
      display:'grid',
      gridTemplateColumns:'1fr 1fr',
      alignItems:'center',
      padding:'8rem 7vw 4rem',
      gap:'4rem',
      position:'relative',
      zIndex:1
    }} className="hero-grid">

      {/* LEFT SIDE */}

      <div ref={leftRef}>

        <div style={{
          display:'inline-flex',
          alignItems:'center',
          gap:'.5rem',
          background:'rgba(108,99,255,.1)',
          border:'1px solid rgba(108,99,255,.28)',
          borderRadius:100,
          padding:'.32rem .9rem',
          fontFamily:'DM Mono,monospace',
          fontSize:'.7rem',
          color:'var(--accent)',
          marginBottom:'1.8rem'
        }}>

          <span style={{
            width:7,
            height:7,
            background:'var(--accent3)',
            borderRadius:'50%',
            animation:'blink-dot 2s ease-in-out infinite'
          }}/>

          {hero.available
            ? 'Available for internships & projects'
            : 'Currently busy'}

        </div>


        <h1 style={{
          fontFamily:'Syne, sans-serif',
          fontWeight:800,
          fontSize:'clamp(2.8rem,5.5vw,5.2rem)',
          lineHeight:1,
          letterSpacing:'-.04em',
          marginBottom:'.2em'
        }}>

          <span style={{ display:'block', color:'var(--text)' }}>
            Hi, I'm {hero.name}
          </span>

          <span style={{
            display:'block',
            background:'linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent'
          }}>
            {hero.role}
          </span>

        </h1>


        <p style={{
          fontSize:'1.05rem',
          color:'var(--light)',
          lineHeight:1.75,
          maxWidth:460,
          marginBottom:'2.5rem',
          fontWeight:300
        }}>
          {hero.tagline}
        </p>


        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'3rem' }}>
          <Link to="/projects" className="btn btn-primary">
            View My Work →
          </Link>

          <Link to="/contact" className="btn btn-ghost">
            Get In Touch
          </Link>
        </div>


        <div style={{ display:'flex', gap:'2.5rem' }}>

          {hero.stats?.map(s => (

            <div key={s.label}>

              <div style={{
                fontFamily:'Syne,sans-serif',
                fontSize:'1.9rem',
                fontWeight:800,
                color:'var(--text)'
              }}>
                {s.num.replace('+','')}
                <span style={{ color:'var(--accent)' }}>+</span>
              </div>

              <div style={{
                fontFamily:'DM Mono,monospace',
                fontSize:'.67rem',
                color:'var(--muted)',
                letterSpacing:'.08em',
                textTransform:'uppercase',
                marginTop:'.1rem'
              }}>
                {s.label}
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="hide-mobile"
           style={{ display:'flex', justifyContent:'center', position:'relative', zIndex:1 }}>

        <CodeWindow name={hero.name} />

      </div>


      <style>{`
        @media(max-width:900px){
          .hero-grid{
            grid-template-columns:1fr!important;
            padding:6rem 5vw 3rem!important;
          }
        }
      `}</style>

    </main>
  )
}