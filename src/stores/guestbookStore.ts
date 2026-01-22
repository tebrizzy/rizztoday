import { useSyncExternalStore } from 'react'
import { GuestbookStore } from '../types/guestbook'

// Simple state store without zustand dependency
let state = {
  isOpen: false,
  hasNewEntries: false
}

const listeners: Set<() => void> = new Set()

function notifyListeners() {
  listeners.forEach(listener => listener())
}

export const guestbookStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  toggle: () => {
    state = { ...state, isOpen: !state.isOpen }
    if (state.isOpen) {
      state = { ...state, hasNewEntries: false }
      localStorage.setItem('guestbookLastSeen', Date.now().toString())
    }
    notifyListeners()
  },
  open: () => {
    state = { ...state, isOpen: true, hasNewEntries: false }
    localStorage.setItem('guestbookLastSeen', Date.now().toString())
    notifyListeners()
  },
  close: () => {
    state = { ...state, isOpen: false }
    notifyListeners()
  },
  setHasNewEntries: (value: boolean) => {
    state = { ...state, hasNewEntries: value }
    notifyListeners()
  },
  markAsSeen: () => {
    localStorage.setItem('guestbookLastSeen', Date.now().toString())
    state = { ...state, hasNewEntries: false }
    notifyListeners()
  }
}

export function useGuestbookStore(): GuestbookStore {
  const storeState = useSyncExternalStore(
    guestbookStore.subscribe,
    guestbookStore.getState
  )

  return {
    ...storeState,
    open: guestbookStore.open,
    close: guestbookStore.close,
    setHasNewEntries: guestbookStore.setHasNewEntries,
    markAsSeen: guestbookStore.markAsSeen
  }
}
