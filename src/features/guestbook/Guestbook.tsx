import { useState, useEffect } from 'react'
import {
  Firestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'
import { useGuestbookStore } from '../../stores/guestbookStore'
import { GuestbookMessage } from '../../types/guestbook'
import { formatTime } from '../../utils/time'
import { escapeHtml } from '../../utils/sanitize'
import styles from './Guestbook.module.css'

interface GuestbookProps {
  db: Firestore | null
  isFirebaseReady: boolean
}

export function Guestbook({ db, isFirebaseReady }: GuestbookProps) {
  const { isOpen, close, markAsSeen, setHasNewEntries } = useGuestbookStore()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [loading, setLoading] = useState(false)

  // Check for new entries on mount
  useEffect(() => {
    if (!db || !isFirebaseReady) return

    const checkNewEntries = async () => {
      try {
        const q = query(
          collection(db, 'guestbook'),
          orderBy('timestamp', 'desc'),
          limit(1)
        )
        const snapshot = await getDocs(q)
        if (snapshot.empty) return

        const latestDoc = snapshot.docs[0]
        const latestData = latestDoc.data()
        if (!latestData.timestamp) return

        const latestTimestamp = latestData.timestamp.toMillis()
        const lastSeen = parseInt(localStorage.getItem('guestbookLastSeen') || '0')

        if (latestTimestamp > lastSeen) {
          setHasNewEntries(true)
        }
      } catch (error) {
        console.error('Error checking new guestbook entries:', error)
      }
    }

    checkNewEntries()
  }, [db, isFirebaseReady, setHasNewEntries])

  // Load messages when panel opens
  useEffect(() => {
    if (!isOpen || !db || !isFirebaseReady) return

    const loadMessages = async () => {
      setLoading(true)
      try {
        const q = query(
          collection(db, 'guestbook'),
          orderBy('timestamp', 'desc'),
          limit(20)
        )
        const snapshot = await getDocs(q)

        const loadedMessages: GuestbookMessage[] = []
        snapshot.forEach(doc => {
          const data = doc.data()
          loadedMessages.push({
            id: doc.id,
            name: data.name,
            message: data.message,
            timestamp: data.timestamp
          })
        })

        setMessages(loadedMessages)
        markAsSeen()
      } catch (error) {
        console.error('Error loading guestbook messages:', error)
      }
      setLoading(false)
    }

    loadMessages()
  }, [isOpen, db, isFirebaseReady, markAsSeen])

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim() || !db) return

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        timestamp: serverTimestamp()
      })

      setName('')
      setMessage('')

      // Reload messages
      const q = query(
        collection(db, 'guestbook'),
        orderBy('timestamp', 'desc'),
        limit(20)
      )
      const snapshot = await getDocs(q)

      const loadedMessages: GuestbookMessage[] = []
      snapshot.forEach(doc => {
        const data = doc.data()
        loadedMessages.push({
          id: doc.id,
          name: data.name,
          message: data.message,
          timestamp: data.timestamp
        })
      })

      setMessages(loadedMessages)
    } catch (error) {
      console.error('Error adding guestbook message:', error)
    }
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        !target.closest(`.${styles.guestbookBtn}`) &&
        !target.closest(`.${styles.guestbookInputPanel}`) &&
        !target.closest(`.${styles.guestbookCommentsPanel}`)
      ) {
        close()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [close])

  return (
    <>
      {isOpen && <div className={`${styles.guestbookOverlay} ${styles.active}`} onClick={close} />}

      <div className={`${styles.guestbookInputPanel} ${isOpen ? styles.active : ''}`}>
        <div className={styles.inputPanelTitle}>Leave a Note</div>
        <input
          type="text"
          placeholder="your name"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="your message..."
          maxLength={240}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className={styles.guestbookFooter}>
          <span className={styles.charCount}><span>{message.length}</span>/240</span>
          <button className={styles.guestbookSubmit} onClick={handleSubmit}>send</button>
        </div>
      </div>

      <div className={`${styles.guestbookCommentsPanel} ${isOpen ? styles.active : ''}`}>
        <div className={styles.commentsTitle}>Comments</div>
        <div className={styles.guestbookMessages}>
          {loading ? (
            <div className={styles.noMessages}>loading...</div>
          ) : messages.length === 0 ? (
            <div className={styles.noMessages}>be the first to leave a note!</div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={styles.guestMessageWrapper}>
                <div className={styles.guestHeader}>
                  <span className={styles.guestName}>{escapeHtml(msg.name)}</span>
                  {msg.timestamp && (
                    <span className={styles.guestTime}>{formatTime(msg.timestamp.toDate())}</span>
                  )}
                </div>
                <div className={styles.guestMessage}>
                  <div className={styles.guestText}>{escapeHtml(msg.message)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
