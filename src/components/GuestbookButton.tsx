import { useGuestbookStore } from '../hooks/useGuestbookStore'

export function GuestbookButton() {
  const { toggle, hasNewEntries } = useGuestbookStore()

  return (
    <div className="guestbook-btn" onClick={toggle}>
      <svg className="guestbook-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M3 7L12 13L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {hasNewEntries && <span className="guestbook-badge"></span>}
      <span className="hover-title">leave a note</span>
    </div>
  )
}
