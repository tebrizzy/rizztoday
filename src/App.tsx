import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MenuBar } from './components/MenuBar'
import { Hero } from './components/Hero'
import { MenuButtons } from './components/MenuButtons'
import { AboutCard } from './components/AboutCard'
import { CardsStack } from './components/CardsStack'
import { TestimonialsCard } from './components/TestimonialsCard'
import { IpodPlayer } from './components/IpodPlayer'
import { StickyNote } from './components/StickyNote'
import { Guestbook } from './components/Guestbook'
import { ClickWave } from './components/ClickWave'
import { useFirebase } from './hooks/useFirebase'

function App() {
  const { db, isReady } = useFirebase()

  return (
    <>
      <MenuBar />
      <div className="container">
        <main className="main-content">
          <Hero />
        </main>
        <MenuButtons />
        <AboutCard db={db} isFirebaseReady={isReady} />
        <CardsStack />
        <TestimonialsCard />
        <IpodPlayer />
        <StickyNote />
      </div>
      <Guestbook db={db} isFirebaseReady={isReady} />
      <ClickWave />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
