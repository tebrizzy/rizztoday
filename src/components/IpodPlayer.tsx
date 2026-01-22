import { useState, useRef, useEffect } from 'react'

const PLAYLIST = [
  { title: "Time Is The Enemy", src: "/content/music/Time Is The Enemy.mp3" },
  { title: "Sand People", src: "/content/music/Jon Kennedy - Sand people [YPGEsM3cJhk].mp3" },
  { title: "Better Things", src: "/content/music/Massive Attack - Better Things (Extended Mix with Tracey Thorn & Mad Professor).mp3" },
  { title: "Dönence", src: "/content/music/Barış Manço - Dönence (1982 - TRT).mp3" },
  { title: "Get Down On It", src: "/content/music/Kool & The Gang - Get Down On It.mp3" },
  { title: "Dance Naked Under Palmtrees", src: "/content/music/Dance Naked Under Palmtrees.mp3" },
  { title: "Diamente", src: "/content/music/Diamente from YouTube.mp3" },
  { title: "Calling Aventura King", src: "/content/music/Kid Loco - Calling Aventura King.mp3" }
]

export function IpodPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25
    }
  }, [])

  const loadTrack = (index: number) => {
    const newIndex = ((index % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrack(newIndex)
    return newIndex
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const prevTrack = () => {
    const newIndex = loadTrack(currentTrack - 1)
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[newIndex].src
      if (isPlaying) audioRef.current.play()
    }
  }

  const nextTrack = () => {
    const newIndex = loadTrack(currentTrack + 1)
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[newIndex].src
      if (isPlaying) audioRef.current.play()
    }
  }

  const handleEnded = () => {
    if (PLAYLIST.length > 1) {
      const newIndex = loadTrack(currentTrack + 1)
      if (audioRef.current) {
        audioRef.current.src = PLAYLIST[newIndex].src
        audioRef.current.play()
      }
    } else {
      setIsPlaying(false)
    }
  }

  return (
    <div className="ipod-nano">
      <div className="ipod-body">
        <div className={`ipod-screen ${isPlaying ? 'active' : ''}`}>
          <div className="song-title">{PLAYLIST[currentTrack]?.title || 'No Track'}</div>
          <div className="equalizer">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
        <div className="click-wheel">
          <div className="wheel-ring">
            <button className="wheel-btn menu">MENU</button>
            <button className="wheel-btn prev" onClick={prevTrack}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M0 0H3V12H0V0ZM3 6L16 12V0L3 6Z"/>
              </svg>
            </button>
            <button className="wheel-btn next" onClick={nextTrack}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M16 0H13V12H16V0ZM13 6L0 12V0L13 6Z"/>
              </svg>
            </button>
            <button className="wheel-btn playpause" onClick={togglePlay}>
              {isPlaying ? (
                <svg className="pause-icon" width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <rect x="0" y="0" width="3" height="12"/>
                  <rect x="7" y="0" width="3" height="12"/>
                </svg>
              ) : (
                <svg className="play-icon" width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0V12L10 6L0 0Z"/>
                </svg>
              )}
            </button>
          </div>
          <button className="wheel-center" onClick={togglePlay}></button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrack]?.src}
        onEnded={handleEnded}
      />
      <svg className="ipod-cable" viewBox="0 0 60 200" fill="none">
        <path
          d="M30 0 L30 40 Q30 60 40 80 Q55 110 35 140 Q20 165 30 200"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
