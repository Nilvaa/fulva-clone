import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import FlavorHero from './components/FlavorHero'
import ShopPage from './components/ShopPage'
import Contact from './components/Contact'

import { flavors } from './data/flavors'

const SLIDE_DURATION = 4000 // ms

export default function App() {
  const [index, setIndex] = useState(0)
  const [view, setView] = useState('home') // 'home' | 'shop' | 'contact'

  useEffect(() => {
    // Pause flavor cycling on Shop and Contact pages
    if (view !== 'home') return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % flavors.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [view])

  const current = flavors[index]

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">

      <Header
        accentColor={current.accent}
        onShopClick={() => setView('shop')}
        onContactClick={() => setView('contact')}
        onLogoClick={() => setView('home')}
      />

      {view === 'home' && (
        <FlavorHero current={current} />
      )}

      {view === 'shop' && (
        <ShopPage />
      )}

      {view === 'contact' && (
        <Contact />
      )}

    </main>
  )
}