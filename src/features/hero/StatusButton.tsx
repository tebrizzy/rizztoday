import { useState, useRef, useEffect } from 'react'

export function StatusButton() {
  const [actionsVisible, setActionsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleActions = () => {
    setActionsVisible(prev => !prev)
  }

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return
    toggleActions()
  }

  // Handle touch for iOS
  const handleTouchEnd = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return
    e.preventDefault()
    toggleActions()
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
      className={`status-btn ${actionsVisible ? 'actions-visible' : ''}`}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <span className="status-dot"></span>
      <span className="status-text">free for pitchdeck design</span>

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
      </div>
    </button>
  )
}
