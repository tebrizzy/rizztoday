import { useGuestbookStore } from '../../stores/guestbookStore'
import styles from './GuestbookButton.module.css'

export function GuestbookButton() {
  const { open, hasNewEntries } = useGuestbookStore()

  return (
    <div className={styles.guestbookBtn} onClick={open}>
      <svg className={styles.guestbookIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M3 7L12 13L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {hasNewEntries && <span className={styles.guestbookBadge}></span>}
      <span className={styles.hoverTitle}>leave a note</span>
    </div>
  )
}
