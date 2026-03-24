export default function Footer({ contact }) {

  const info = contact || {
    github: "https://github.com/revanthofficial21",
    linkedin: "https://www.linkedin.com/in/revanth-kumar",
    email: "revanthofficial21@gmail.com"
  }

  const socials = [
    { label: '🐙', name: 'GitHub', href: info.github },
    { label: '💼', name: 'LinkedIn', href: info.linkedin },
    { label: '✉', name: 'Email', href: `mailto:${info.email}` },
  ]

  return (
    <footer className="footer">

      {/* LEFT TEXT */}
      <p className="footer-text">
        Designed & Built by{" "}
        <span className="gradient-text">Revanth Kumar</span>{" "}
        · 2026 · KL University · CSIT
      </p>

      {/* SOCIAL ICONS */}
      <div className="footer-icons">

        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            title={s.name}
          >
            {s.label}
          </a>
        ))}

      </div>

    </footer>
  )
}