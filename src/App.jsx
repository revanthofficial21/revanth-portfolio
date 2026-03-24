import { useState, useEffect, useRef } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

import Navbar from "./components/Navbar"
import AnimatedBackground from "./components/AnimatedBackground"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"
import Certifications from "./pages/Certifications"
import Contact from "./pages/Contact"

import "./index.css"

/* ─── CUSTOM CURSOR ───────────────────────── */

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px"
        dotRef.current.style.top = e.clientY + "px"
      }
    }

    const raf = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1

      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px"
        ringRef.current.style.top = ring.current.y + "px"
      }

      requestAnimationFrame(raf)
    }

    raf()
    document.addEventListener("mousemove", move)

    return () => document.removeEventListener("mousemove", move)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ─── APP ───────────────────────── */

export default function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => {
        setData(res.data)
      })
      .catch(() => {
        setError(true)

        /* FALLBACK DATA */
        setData({
          hero: {
            name: "Revanth Kumar",
            role: "Full Stack Developer",
            tagline: "Building modern web applications.",
            available: true,
          },
          about: { bio: [], highlights: [] },
          projects: [],
          skills: { languages: [], tools: [], concepts: [] },
          certifications: [],
          contact: {
            email: "revanthofficial21@gmail.com",
            github: "https://github.com/revanthofficial21",
            linkedin: "https://linkedin.com/in/",
            resumeUrl: "#",
          },
        })
      })
      .finally(() => setLoading(false))
  }, [])

  /* ─── LOADER ───────────────────────── */

  if (loading) {
    return (
      <div className="loader">
        <div className="loader__ring" />
        <span className="loader__text">Loading Portfolio...</span>
      </div>
    )
  }

  /* ─── APP UI ───────────────────────── */

  return (
    <BrowserRouter>
      <Cursor />
      <AnimatedBackground />
      <Navbar />

      {/* ERROR BANNER */}
      {error && (
        <div className="error-banner">
          ⚠ Backend not connected — using local data
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/about" element={<About data={data.about} />} />
        <Route path="/projects" element={<Projects data={data.projects} />} />
        <Route path="/skills" element={<Skills data={data.skills} />} />
        <Route path="/certifications" element={<Certifications data={data.certifications} />} />
        <Route path="/contact" element={<Contact data={data.contact} />} />
      </Routes>

      <Footer contact={data.contact} />
    </BrowserRouter>
  )
}