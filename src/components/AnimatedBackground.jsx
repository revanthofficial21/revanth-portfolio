import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let offset = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    let raf

    const draw = () => {

      ctx.clearRect(0, 0, W, H)

      const SIZE = 60
      offset = (offset + 0.15) % SIZE

      ctx.strokeStyle = 'rgba(108,99,255,0.055)'
      ctx.lineWidth = 1

      ctx.beginPath()

      for (let x = -SIZE + (offset % SIZE); x < W + SIZE; x += SIZE) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
      }

      for (let y = -SIZE + (offset % SIZE); y < H + SIZE; y += SIZE) {
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
      }

      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }

  }, [])

  return (
    <>
      {/* Grid Background Canvas */}

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',

          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%,black 20%,transparent 90%)',

          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%,black 20%,transparent 90%)',
        }}
      />

      {/* Purple Glow */}

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
            'radial-gradient(circle,rgba(108,99,255,.18) 0%,transparent 70%)',

          borderRadius: '50%',

          animation: 'glow-pulse 7s ease-in-out infinite',
        }}
      />

      {/* Pink Glow */}

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
            'radial-gradient(circle,rgba(255,101,132,.1) 0%,transparent 70%)',

          borderRadius: '50%',

          animation: 'glow-pulse 10s ease-in-out infinite 3s',
        }}
      />
    </>
  )
}