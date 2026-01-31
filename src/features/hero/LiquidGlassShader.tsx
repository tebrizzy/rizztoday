import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseBrightness: number
  char: number
}

interface LiquidGlassShaderProps {
  width: number
  height: number
  className?: string
}

export function LiquidGlassShader({
  width,
  height,
  className = ''
}: LiquidGlassShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    particles: [] as Particle[],
    mouse: { x: -9999, y: -9999, isHovering: false },
    animationId: 0,
    time: 0,
    width,
    height
  })

  const asciiChars = ' .:-=+*#%@'

  useEffect(() => {
    stateRef.current.width = width
    stateRef.current.height = height
  }, [width, height])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || width <= 0 || height <= 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = false
    stateRef.current.ctx = ctx

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/rizzyrose.png'

    img.onload = () => {
      const gridWidth = 140
      const gridHeight = 95
      const padding = 10

      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = gridWidth
      tempCanvas.height = gridHeight
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return

      tempCtx.drawImage(img, 0, 0, gridWidth, gridHeight)
      const imageData = tempCtx.getImageData(0, 0, gridWidth, gridHeight)

      const charWidth = 4.5
      const charHeight = 6
      const roseWidth = gridWidth * charWidth
      const roseHeight = gridHeight * charHeight

      const centerX = width / 2
      const centerY = height / 2
      const startX = centerX - roseWidth / 2
      const startY = centerY - roseHeight / 2

      const particles: Particle[] = []

      for (let y = padding; y < gridHeight - padding; y++) {
        for (let x = padding; x < gridWidth - padding; x++) {
          const i = (y * gridWidth + x) * 4
          const r = imageData.data[i]
          const g = imageData.data[i + 1]
          const b = imageData.data[i + 2]
          const a = imageData.data[i + 3]
          const brightness = (r + g + b) / 3 * (a / 255)

          if (brightness < 15) continue

          const screenX = startX + x * charWidth
          const screenY = startY + y * charHeight

          particles.push({
            x: screenX,
            y: screenY,
            baseBrightness: brightness,
            char: 0
          })
        }
      }

      stateRef.current.particles = particles
    }

    const render = () => {
      const state = stateRef.current
      const { ctx, particles, mouse } = state
      if (!ctx || particles.length === 0) {
        state.animationId = requestAnimationFrame(render)
        return
      }

      state.time += 0.016
      const time = state.time

      ctx.clearRect(0, 0, state.width, state.height)
      ctx.font = '5px "Fragment Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      particles.forEach(p => {
        let brightness = p.baseBrightness

        // Default wave animation
        brightness += Math.sin(p.x * 0.02 + p.y * 0.02 + time * 2) * 25

        // Cursor ripple effect
        if (mouse.isHovering) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const wave = Math.sin(distance * 0.08 - time * 4) * 0.5 + 0.5
          const intensity = Math.max(0, 1 - distance / 120)
          brightness += wave * intensity * 150
        }

        // Clamp brightness
        brightness = Math.max(0, Math.min(255, brightness))

        // Map to ASCII char
        const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1))
        const opacity = 0.3 + (brightness / 255) * 0.5

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fillText(asciiChars[charIndex], p.x, p.y)
      })

      state.animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(stateRef.current.animationId)
    }
  }, [width, height])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      stateRef.current.mouse.x = e.clientX - rect.left
      stateRef.current.mouse.y = e.clientY - rect.top
      stateRef.current.mouse.isHovering = true
    }

    const handleMouseLeave = () => {
      stateRef.current.mouse.isHovering = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  )
}
