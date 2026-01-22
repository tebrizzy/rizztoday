import { useState, useRef, useEffect } from 'react'
import { PLAYLIST } from '../../constants/music'
import styles from './IpodPlayer.module.css'

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
      audioRef.current.play().catch((error) => {
        console.warn('Audio playback failed (user interaction may be required):', error.message)
        setIsPlaying(false)
      })
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
    <div className={styles.ipodNano}>
      <div className={styles.ipodBody}>
        <div className={`${styles.ipodScreen} ${isPlaying ? styles.active : ''}`}>
          <div className={styles.songTitle}>{PLAYLIST[currentTrack]?.title || 'No Track'}</div>
          <div className={styles.equalizer}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
        <div className={styles.clickWheel}>
          <div className={styles.wheelRing}>
            <button className={`${styles.wheelBtn} ${styles.menu}`}>MENU</button>
            <button className={`${styles.wheelBtn} ${styles.prev}`} onClick={prevTrack}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M0 0H3V12H0V0ZM3 6L16 12V0L3 6Z"/>
              </svg>
            </button>
            <button className={`${styles.wheelBtn} ${styles.next}`} onClick={nextTrack}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M16 0H13V12H16V0ZM13 6L0 12V0L13 6Z"/>
              </svg>
            </button>
            <button className={`${styles.wheelBtn} ${styles.playpause}`} onClick={togglePlay}>
              {isPlaying ? (
                <svg className={styles.pauseIcon} width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <rect x="0" y="0" width="3" height="12"/>
                  <rect x="7" y="0" width="3" height="12"/>
                </svg>
              ) : (
                <svg className={styles.playIcon} width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0V12L10 6L0 0Z"/>
                </svg>
              )}
            </button>
          </div>
          <button className={styles.wheelCenter} onClick={togglePlay}></button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrack]?.src}
        onEnded={handleEnded}
      />
      <svg className={styles.ipodCable} viewBox="0 0 60 200" fill="none">
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
