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

  const h = useReveal(0)
  const r1 = useReveal(.1)
  const r2 = useReveal(.2)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
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

      setForm({ name: '', email: '', message: '' })

    } catch (err) {
      setStatus('error')
      setMsg(err.response?.data?.message || 'Something went wrong.')
    }
  }

  const safeData = data || {
    email: "revanthofficial21@gmail.com",
    linkedin: "https://linkedin.com/in/revanth-kumar",
    github: "https://github.com/revanthofficial21",
    resumeUrl: "#"
  }

  const LINKS = [
    { icon: '📧', label: safeData.email, href: `mailto:${safeData.email}` },
    { icon: '💼', label: 'LinkedIn', href: safeData.linkedin },
    { icon: '🐙', label: 'GitHub', href: safeData.github },
    { icon: '📄', label: 'Resume', href: safeData.resumeUrl },
  ]

  return (
    <main className="section contact-section">

      <div ref={h} className="reveal">
        <div className="section-tag">Contact</div>
        <h1 className="section-title">Let's <em>connect</em></h1>
      </div>

      <div className="contact-grid">

        {/* LEFT */}
        <div ref={r1} className="reveal">

          <p className="contact-text">
            Whether you have a project idea, internship opportunity,
            or just want to talk tech — my inbox is always open!
          </p>

          <div className="contact-links">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link">
                <span>{l.icon}</span>
                <span>{l.label}</span>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>

        </div>

        {/* RIGHT FORM */}
        <div ref={r2} className="reveal contact-form">

          {['name', 'email', 'message'].map(field => (
            <div key={field} className="form-group">

              <label>
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
                    placeholder="Hey Revanth..."
                  />
                )
                : (
                  <input
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={onChange}
                    placeholder={field === 'name' ? 'John Doe' : 'john@email.com'}
                  />
                )}

            </div>
          ))}

          {status && status !== 'loading' && (
            <div className={`form-status ${status}`}>
              {msg}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={status === 'loading'}
            className="btn btn-primary"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message ✉️'}
          </button>

        </div>

      </div>

    </main>
  )
}