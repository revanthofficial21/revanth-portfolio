import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight

    let offset = 0
    let raf

    // 🔥 Mouse Interaction
    let mouse = { x: null, y: null }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 🔥 Resize Handling + DPR Optimization
    const resize = () => {
      const dpr = window.devicePixelRatio || 1

      W = window.innerWidth
      H = window.innerHeight

      canvas.width = W * dpr
      canvas.height = H * dpr

      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768

    // 🔥 Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const SIZE = isMobile ? 80 : 60
      offset = (offset + 0.2) % SIZE

      // 🌙 Dark / Light Mode Support
      const isDark = document.body.classList.contains('dark')

      ctx.strokeStyle = isDark
        ? 'rgba(108,99,255,0.08)'
        : 'rgba(0,0,0,0.05)'

      ctx.lineWidth = 1
      ctx.beginPath()

      // Vertical lines
      for (let x = -SIZE + offset; x < W + SIZE; x += SIZE) {
        let distortion = mouse.x ? (mouse.x - x) * 0.002 : 0

        ctx.moveTo(x, 0)
        ctx.lineTo(x + distortion, H)
      }

      // Horizontal lines
      for (let y = -SIZE + offset; y < H + SIZE; y += SIZE) {
        let distortion = mouse.y ? (mouse.y - y) * 0.002 : 0

        ctx.moveTo(0, y)
        ctx.lineTo(W, y + distortion)
      }

      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* 🔥 Animated Grid Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',

          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 90%)',
        }}
      />

      {/* 🔥 Purple Glow */}
      <div
        style={{
          position: 'fixed',
          zIndex: 0,
          pointerEvents: 'none',
          top: '-10vh',
          right: '-10vw',

          width: 'min(700px,70vw)',
          height: 'min(700px,70vw)',

          background:
            'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)',

          borderRadius: '50%',
          animation: 'glow-pulse 7s ease-in-out infinite',
        }}
      />

      {/* 🔥 Pink Glow */}
      <div
        style={{
          position: 'fixed',
          zIndex: 0,
          pointerEvents: 'none',
          bottom: '10vh',
          left: '-8vw',

          width: 'min(500px,50vw)',
          height: 'min(500px,50vw)',

          background:
            'radial-gradient(circle, rgba(255,101,132,0.1) 0%, transparent 70%)',

          borderRadius: '50%',
          animation: 'glow-pulse 10s ease-in-out infinite 3s',
        }}
      />
    </>
  )
}