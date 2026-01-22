import { useState, useRef, useEffect } from 'react'
import styles from './StatusButton.module.css'

export function StatusButton() {
  const [actionsVisible, setActionsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleActions = () => {
    setActionsVisible(prev => !prev)
  }

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.actionBtn}`)) return
    toggleActions()
  }

  // Handle touch for iOS
  const handleTouchEnd = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.actionBtn}`)) return
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
      className={`${styles.statusBtn} ${actionsVisible ? styles.actionsVisible : ''}`}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <span className={styles.statusDot}></span>
      <span className={styles.statusText}>free for pitchdeck design</span>

      <div className={styles.actionButtons}>
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-EvpHYoLjrPV2bm5X8RVJzC7IaXpJ8X4xWZfxQhYd2K0vYDjvYm0U5nBxYr1JKoZb0xKZ5Y5Z"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.btnLabel}>Book</span>
          <span className={styles.btnEmoji}>🗓️</span>
        </a>
        <a
          href="https://x.com/rizzytoday"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.btnLabel}>Twitter</span>
          <span className={styles.btnEmoji}>🔗</span>
        </a>
        <a
          href="https://discord.com/users/rizzytoday"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.btnLabel}>Discord</span>
          <span className={styles.btnEmoji}>📞</span>
        </a>
      </div>
    </button>
  )
}
