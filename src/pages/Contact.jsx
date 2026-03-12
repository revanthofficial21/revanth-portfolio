import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

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

export default function Contact({ data }) {

  const h  = useReveal(0)
  const r1 = useReveal(.1)
  const r2 = useReveal(.2)

  const [form, setForm] = useState({
    name:'',
    email:'',
    message:''
  })

  const [status, setStatus] = useState(null)
  const [msg, setMsg] = useState('')

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {

    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setMsg('Please fill in all fields.')
      return
    }

    setStatus('loading')

    try {

      const res = await axios.post('/api/contact', form)

      setStatus('success')
      setMsg(res.data.message)

      setForm({
        name:'',
        email:'',
        message:''
      })

    } catch (err) {

      setStatus('error')
      setMsg(
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      )

    }
  }

  /* SAFE CONTACT DATA */

  const safeData = data || {
    email: "revanthofficial21@gmail.com",
    linkedin: "https://linkedin.com/in/revanth-kumar",
    github: "https://github.com/revanthofficial21",
    resumeUrl: "#"
  }


  const inputBase = {
    width: '100%',
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '.8rem 1rem',
    color: 'var(--text)',
    fontSize: '.92rem',
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  }

  const onFocus = (e) => {
    e.target.style.borderColor='var(--accent)'
    e.target.style.boxShadow='0 0 0 3px rgba(108,99,255,.12)'
  }

  const onBlur = (e) => {
    e.target.style.borderColor='var(--border)'
    e.target.style.boxShadow='none'
  }

  const LINKS = [
    { icon:'📧', label: safeData.email, href:`mailto:${safeData.email}` },
    { icon:'💼', label:'LinkedIn', href:safeData.linkedin },
    { icon:'🐙', label:'GitHub', href:safeData.github },
    { icon:'📄', label:'Download Resume', href:safeData.resumeUrl },
  ]

  return (
    <main className="section" style={{ paddingTop: '8rem', position: 'relative', zIndex: 1 }}>

      <div ref={h} className="reveal">
        <div className="section-tag">Contact</div>
        <h1 className="section-title">Let's <em>connect</em></h1>
      </div>


      <div
        style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'5rem',
          alignItems:'start'
        }}
        className="contact-grid"
      >

        {/* Contact Links */}

        <div ref={r1} className="reveal">

          <p style={{
            color:'var(--light)',
            lineHeight:1.8,
            fontWeight:300,
            marginBottom:'2.5rem',
            fontSize:'1rem'
          }}>
            Whether you have a project idea, an internship opportunity,
            or just want to talk tech — my inbox is always open!
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'.8rem' }}>

            {LINKS.map(l => (

              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card"

                style={{
                  display:'flex',
                  alignItems:'center',
                  gap:'1rem',
                  padding:'.9rem 1.2rem',
                  borderRadius:10,
                  color:'var(--light)',
                  transition:'all .25s'
                }}

                onMouseEnter={(e)=>{
                  e.currentTarget.style.borderColor='var(--accent)'
                  e.currentTarget.style.color='var(--accent)'
                  e.currentTarget.style.transform='translateX(4px)'
                }}

                onMouseLeave={(e)=>{
                  e.currentTarget.style.borderColor='var(--border)'
                  e.currentTarget.style.color='var(--light)'
                  e.currentTarget.style.transform='translateX(0)'
                }}
              >
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{l.icon}</span>

                <span style={{
                  fontFamily:'DM Mono,monospace',
                  fontSize:'.78rem'
                }}>
                  {l.label}
                </span>

                <span style={{ marginLeft:'auto', fontSize:'.9rem' }}>→</span>

              </a>

            ))}

          </div>

        </div>


        {/* Contact Form */}

        <div ref={r2} className="reveal">

          {['name','email','message'].map(field => (

            <div key={field} style={{ marginBottom:'1.1rem' }}>

              <label style={{
                display:'block',
                fontFamily:'DM Mono,monospace',
                fontSize:'.7rem',
                color:'var(--muted)',
                letterSpacing:'.09em',
                textTransform:'uppercase',
                marginBottom:'.45rem'
              }}>
                {field === 'name'
                  ? 'Your Name'
                  : field === 'email'
                  ? 'Email Address'
                  : 'Message'}
              </label>

              {field === 'message'
                ? (
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Hey Revanth, I'd love to connect about..."
                    style={{ ...inputBase, height:140, resize:'vertical' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                )
                : (
                  <input
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={onChange}
                    placeholder={
                      field === 'name'
                        ? 'John Doe'
                        : 'john@example.com'
                    }
                    style={inputBase}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                )}

            </div>

          ))}


          {status && status !== 'loading' && (
            <div style={{
              padding:'.75rem 1rem',
              borderRadius:8,
              marginBottom:'1rem',
              background:status==='success'
                ? 'rgba(67,233,123,.1)'
                : 'rgba(255,101,132,.1)',
              border:`1px solid ${
                status==='success'
                ? 'rgba(67,233,123,.3)'
                : 'rgba(255,101,132,.3)'
              }`,
              color:status==='success'
                ? 'var(--accent3)'
                : 'var(--accent2)',
              fontFamily:'DM Mono,monospace',
              fontSize:'.75rem'
            }}>
              {msg}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={status === 'loading'}
            className="btn btn-primary"
            style={{
              width:'100%',
              justifyContent:'center',
              opacity: status==='loading' ? .7 : 1,
              cursor: status==='loading'
                ? 'not-allowed'
                : 'pointer'
            }}
          >
            {status === 'loading'
              ? '⏳ Sending...'
              : 'Send Message ✉️'}
          </button>

        </div>

      </div>

      <style>
        {`
        @media(max-width:900px){
          .contact-grid{
            grid-template-columns:1fr!important;
            gap:3rem!important;
          }
        }
        `}
      </style>

    </main>
  )
}