import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MenuBar } from './features/menu/MenuBar'
import { Hero } from './features/hero/Hero'
import { MenuButtons } from './features/panels/MenuButtons'
import { AboutCard } from './features/panels/AboutCard'
import { CardsStack } from './features/panels/CardsStack'
import { TestimonialsCard } from './features/panels/TestimonialsCard'
import { IpodPlayer } from './features/music/IpodPlayer'
import { StickyNote } from './shared/components/StickyNote'
import { Guestbook } from './features/guestbook/Guestbook'
import { ClickWave } from './shared/components/ClickWave'
import { useFirebase } from './services/firebase'

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
