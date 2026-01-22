import { useState, useRef } from 'react'

export function StatusButton() {
  const [isWorking, setIsWorking] = useState(true)
  const [actionsVisible, setActionsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return

    setActionsVisible(!actionsVisible)
    setIsWorking(!isWorking)
  }

  return (
    <button
      ref={buttonRef}
      className={`status-btn ${actionsVisible ? 'actions-visible' : ''}`}
      onClick={handleClick}
    >
      <span className="status-dot"></span>
      <span className="status-text">
        {isWorking ? 'free for pitchdeck design' : 'available'}
      </span>

      <div className="action-buttons">
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-EvpHYoLjrPV2bm5X8RVJzC7IaXpJ8X4xWZfxQhYd2K0vYDjvYm0U5nBxYr1JKoZb0xKZ5Y5Z"
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
