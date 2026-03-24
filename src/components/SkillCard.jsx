import { useEffect, useRef, useState } from 'react'

export default function SkillCard({ name = 'Skill', icon = '💻', level = 0 }) {

  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

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
    <div ref={ref} className="skill-card">

      {/* HEADER */}
      <div className="skill-header">

        <span className="skill-name">
          <span className="skill-icon">{icon}</span>
          {name}
        </span>

        <span className="skill-percent">
          {safeLevel}%
        </span>

      </div>

      {/* BAR */}
      <div className="skill-bar">

        <div
          className="skill-fill"
          style={{
            width: animated ? safeLevel + '%' : '0%'
          }}
        />

      </div>

    </div>
  )
}