import { useState, useRef, useEffect } from 'react'

export function StatusButton() {
  const [actionsVisible, setActionsVisible] = useState(false)
  const [statusText, setStatusText] = useState('active')
  const [isChanging, setIsChanging] = useState(false)
  const [textAnimClass, setTextAnimClass] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const touchHandledRef = useRef(false)

  const toggleActions = () => {
    setActionsVisible(prev => !prev)
  }

  const toggleStatus = () => {
    if (isChanging) return // Prevent double-tap
    setIsChanging(true)
    setTextAnimClass('animating-out')

    setTimeout(() => {
      setStatusText(prev => prev === 'active' ? 'free for pitchdeck' : 'active')
      setTextAnimClass('animating-in')

      setTimeout(() => {
        setTextAnimClass('')
        setIsChanging(false)
      }, 200)
    }, 150)
  }

  const handleClick = (e: React.MouseEvent) => {
    // Prevent duplicate handling if touch was already processed
    if (touchHandledRef.current) {
      touchHandledRef.current = false
      return
    }
    if ((e.target as HTMLElement).closest('.action-btn')) return
    toggleStatus()
    toggleActions()
  }

  // Handle touch for mobile devices - toggle status AND show actions
  const handleTouchEnd = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return

    // Mark that touch was handled to prevent click event from firing
    touchHandledRef.current = true
    setTimeout(() => {
      touchHandledRef.current = false
    }, 500)

    toggleStatus()
    setActionsVisible(true)
  }

  // Close on click outside
  useEffect(() => {
    if (!actionsVisible) return

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setActionsVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchend', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [actionsVisible])

  return (
    <button
      ref={buttonRef}
      className={`status-btn ${actionsVisible ? 'actions-visible' : ''} ${isChanging ? 'changing' : ''}`}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <span className="status-dot"></span>
      <span className={`status-text ${textAnimClass}`}>{statusText}</span>

      <div className="action-buttons">
        <a
          href="https://calendar.app.google/mpTJKMqZ8cTz5KD79"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="btn-label">Book</span>
          <span className="btn-emoji">🗓️</span>
        </a>
        <a
          href="https://x.com/rizzytoday"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="btn-label">Twitter</span>
          <span className="btn-emoji">🔗</span>
        </a>
        <a
          href="https://discord.com/users/rizzytoday"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="btn-label">Discord</span>
          <span className="btn-emoji">📞</span>
        </a>
        <a
          href="https://github.com/rizzytoday"
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="btn-label">GitHub</span>
          <span className="btn-emoji">🐙</span>
        </a>
      </div>
    </button>
  )
}
