import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import CinematicIntroHero from './components/CinematicIntroHero'

import OnamSection from './components/OnamSection'
import FlavorHero from './components/FlavorHero'
import ShopPage from './components/ShopPage'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomerReviews from './components/CustomerReviews'

import { flavors } from './data/flavors'

const SLIDE_DURATION = 4000 // ms

export default function App() {
  const [index, setIndex] = useState(0)
  const [view, setView] = useState('home') // 'home' | 'shop' | 'contact'
  const [isHeaderDark, setIsHeaderDark] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  // Pause flavor cycling on Shop and Contact pages
  useEffect(() => {
    if (view !== 'home') return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % flavors.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [view])

  // Track header dark theme based on scroll position in Home view
  useEffect(() => {
    if (view !== 'home') return

    const checkHeaderTheme = () => {
      // Hero is 100vh. Dark theme while in hero viewport.
      const darkBoundary = window.innerHeight - 80
      setIsHeaderDark(window.scrollY < darkBoundary)
    }

    window.addEventListener('scroll', checkHeaderTheme, { passive: true })
    return () => window.removeEventListener('scroll', checkHeaderTheme)
  }, [view])

  // Prevent scroll during cinematic intro
  useEffect(() => {
    if (view === 'home' && !isIntroComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [view, isIntroComplete])

  const activeHeaderDark = view === 'home' && isHeaderDark

  const handleShopClick = () => {
    setView('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactClick = () => {
    setView('contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogoClick = () => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExploreClick = () => {
    const el = document.getElementById('flavors-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAssortedClick = () => {
    if (view !== 'home') {
      setView('home')
      setTimeout(() => {
        const el = document.getElementById('flavors-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      handleExploreClick()
    }
  }

  const handleIntroComplete = () => {
    setIsIntroComplete(true)
  }

  const current = flavors[index]

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">
      <Header
        accentColor={activeHeaderDark ? '#c89d3c' : current.accent}
        isDark={activeHeaderDark}
        onShopClick={handleShopClick}
        onContactClick={handleContactClick}
        onLogoClick={handleLogoClick}
        onAssortedClick={handleAssortedClick}
      />

      {view === 'home' && (
        <>
          <CinematicIntroHero
            onShopClick={handleShopClick}
            onExploreClick={handleExploreClick}
            onIntroComplete={handleIntroComplete}
          />
          <OnamSection onShopClick={handleShopClick} />
          <div id="flavors-section">
            <FlavorHero current={current} />
          </div>
          <CustomerReviews />
          <Footer />
        </>
      )}

      {view === 'shop' && (
        <>
          <ShopPage />
          <Footer />
        </>
      )}

      {view === 'contact' && (
        <Contact />
      )}
    </main>
  )
}