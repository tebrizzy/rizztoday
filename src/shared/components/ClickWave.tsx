import { useEffect, useState } from 'react'

interface Wave {
  id: number
  x: number
  y: number
}

export function ClickWave() {
  const [waves, setWaves] = useState<Wave[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now()
      setWaves(prev => [...prev, { id, x: e.clientX, y: e.clientY }])

      setTimeout(() => {
        setWaves(prev => prev.filter(w => w.id !== id))
      }, 600)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {waves.map(wave => (
        <div
          key={wave.id}
          className="click-wave"
          style={{ left: wave.x, top: wave.y }}
        />
      ))}
    </>
  )
}
