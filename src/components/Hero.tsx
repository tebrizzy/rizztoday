import { useEffect, useRef, useState } from 'react'
import { StatusButton } from './StatusButton'
import { GuestbookButton } from './GuestbookButton'
import { VerifiedBadge } from './VerifiedBadge'

export function Hero() {
  const canvasRef = useRef<HTMLPreElement>(null)
  const imageCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [projectCount, setProjectCount] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const imageDataRef = useRef<ImageData | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false })

  const asciiChars = ' .:-=+*#%@'
  const asciiWidth = 140
  const asciiHeight = 95
  const padding = 10
  const imageWidth = asciiWidth - (padding * 2)
  const imageHeight = asciiHeight - (padding * 2)

  // ASCII animation
  useEffect(() => {
    const img = new Image()
    img.src = '/rizzyrose.png'

    img.onload = () => {
      const canvas = imageCanvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = asciiWidth
      canvas.height = asciiHeight
      ctx.clearRect(0, 0, asciiWidth, asciiHeight)
      ctx.drawImage(img, padding, padding, imageWidth, imageHeight)
      imageDataRef.current = ctx.getImageData(0, 0, asciiWidth, asciiHeight)
    }

    let animationId: number
    const animate = () => {
      if (!canvasRef.current || !imageDataRef.current) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const imageData = imageDataRef.current
      const time = Date.now() * 0.001
      let output = ''

      for (let y = 0; y < asciiHeight; y++) {
        for (let x = 0; x < asciiWidth; x++) {
          const index = (y * asciiWidth + x) * 4
          const r = imageData.data[index]
          const g = imageData.data[index + 1]
          const b = imageData.data[index + 2]
          const a = imageData.data[index + 3]

          let brightness = ((r + g + b) / 3) * (a / 255)

          if (mouseRef.current.isHovering) {
            const dx = x - mouseRef.current.x
            const dy = y - mouseRef.current.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const wave = Math.sin(distance * 0.3 - time * 3) * 0.5 + 0.5
            const intensity = Math.max(0, 1 - distance / 15)
            brightness = brightness + (wave * intensity * 100)
          }

          brightness += Math.sin(x * 0.1 + y * 0.1 + time) * 10
          brightness = Math.max(0, Math.min(255, brightness))

          const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1))
          output += asciiChars[charIndex]
        }
        output += '\n'
      }

      canvasRef.current.textContent = output
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Project counter animation
  useEffect(() => {
    const targetCount = 19
    let current = 0
    const stepTime = 2800 / targetCount

    const countUp = setInterval(() => {
      current++
      setProjectCount(current)
      if (current >= targetCount) {
        clearInterval(countUp)
        setTimeout(startGlitchLoop, 300)
      }
    }, stepTime)

    const startGlitchLoop = () => {
      setProjectCount(20)
      setIsGlitching(true)
      setTimeout(() => {
        setProjectCount(19)
        setIsGlitching(false)
        setTimeout(startGlitchLoop, 1500)
      }, 200)
    }

    return () => clearInterval(countUp)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * asciiWidth
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * asciiHeight
    mouseRef.current.isHovering = true
  }

  return (
    <div className="hero">
      <div
        className="ascii-rose"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseRef.current.isHovering = false }}
      >
        <pre ref={canvasRef}></pre>
      </div>
      <canvas ref={imageCanvasRef} style={{ display: 'none' }} />

      <StatusButton />
      <GuestbookButton />

      <div className="name-tagline">
        <h1 className="name">
          Riz Rose
          <VerifiedBadge color="red" />
          <img loading="lazy" src="/content/logos/radiant logo.png" alt="Radiants" className="company-badge" />
        </h1>
        <p className="tagline">translating ideas into visuals</p>

        <div className="project-stats">
          <span className="stats-label">worked with</span>
          <span className={`stats-counter ${isGlitching ? 'glitch' : ''}`}>{projectCount}</span>
          <span className="stats-label">web3 projects</span>
        </div>

        <div className="client-logos">
          <img loading="lazy" src="/content/logos/hydex logo.png" alt="Hydex" className="logo-hydex" />
          <img loading="lazy" src="/content/logos/rad-BLACK.png" alt="Radiants" className="logo-radiants" />
          <img loading="lazy" src="/content/logos/Solana Logomark - Color.svg" alt="Solana" className="logo-solana" />
        </div>
      </div>
    </div>
  )
}
