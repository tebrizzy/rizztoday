import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAnQKWdREyUYXZKlVweg5HBZx0-vcMZs0g",
  authDomain: "rizztoday.firebaseapp.com",
  projectId: "rizztoday",
  storageBucket: "rizztoday.firebasestorage.app",
  messagingSenderId: "806144736906",
  appId: "1:806144736906:web:5074b4e0bc78e39a7cb773"
}

export function useFirebase() {
  const [db, setDb] = useState<Firestore | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig)
      const firestore = getFirestore(app)
      setDb(firestore)
      setIsReady(true)
    } catch (error) {
      console.error('Firebase initialization error:', error)
    }
  }, [])

  return { db, isReady }
}
