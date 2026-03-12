import { useEffect, useRef, useState } from 'react'

export default function SkillCard({ name = 'Skill', icon = '💻', level = 0 }) {

  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  // Ensure level stays between 0 and 100
  const safeLevel = Math.max(0, Math.min(level, 100))

  useEffect(() => {

    if (!ref.current) return

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }

      },

      { threshold: 0.3 }

    )

    observer.observe(ref.current)

    return () => observer.disconnect()

  }, [])


  return (

    <div ref={ref} style={{ marginBottom: '1.25rem' }}>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '.45rem'
        }}
      >

        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '.82rem',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: '.4rem'
          }}
        >
          <span>{icon}</span>
          {name}
        </span>

        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '.7rem',
            color: 'var(--muted)'
          }}
        >
          {safeLevel}%
        </span>

      </div>


      {/* Progress Bar */}

      <div
        style={{
          height: 4,
          background: 'var(--border)',
          borderRadius: 100,
          overflow: 'hidden'
        }}
      >

        <div
          style={{
            height: '100%',
            borderRadius: 100,
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',

            width: animated ? safeLevel + '%' : '0%',

            transition: 'width 1.1s cubic-bezier(.4,0,.2,1) .2s',

            boxShadow: animated
              ? '0 0 10px rgba(108,99,255,.5)'
              : 'none',
          }}
        />

      </div>

    </div>
  )
}