import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import CinematicIntroHero from './components/CinematicIntroHero'
import OnamSection from './components/OnamSection'
import PopularProducts from './components/PopularProducts'
import SpotlightSection from './components/SpotlightSection'
import FlavorHero from './components/FlavorHero'
import ShopPage from './components/ShopPage'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ReelsSection from './components/ReelsSection'
import CustomerReviews from './components/CustomerReviews'
import FeaturedSection from './components/FeaturedSection'
import CelebritySection from './components/CelebritySection'
import RecipeSection from './components/RecipeSection'
import MarketplaceSection from './components/MarketplaceSection'
import HeritageSection from './components/HeritageSection'
import ProductDetails from './components/ProductDetails'

import { flavors } from './data/flavors'

const SLIDE_DURATION = 4000

export default function App() {
  const [index, setIndex] = useState(0)

  const [view, setView] = useState('home')
  // 'home' | 'shop' | 'contact'

  const [isHeaderDark, setIsHeaderDark] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  // Currently selected product for ProductDetails
  const [selectedProduct, setSelectedProduct] = useState(null)

  // =========================================================
  // FLAVOR AUTO-CYCLING
  // =========================================================

  useEffect(() => {
    if (view !== 'home' || selectedProduct) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % flavors.length)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [view, selectedProduct])

  // =========================================================
  // HEADER THEME
  // =========================================================

  useEffect(() => {
    if (view !== 'home' || selectedProduct) return

    const checkHeaderTheme = () => {
      const darkBoundary = window.innerHeight - 80

      setIsHeaderDark(window.scrollY < darkBoundary)
    }

    checkHeaderTheme()

    window.addEventListener('scroll', checkHeaderTheme, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', checkHeaderTheme)
    }
  }, [view, selectedProduct])

  // =========================================================
  // PREVENT PAGE SCROLL DURING CINEMATIC INTRO
  // =========================================================

  useEffect(() => {
    if (
      view === 'home' &&
      !isIntroComplete &&
      !selectedProduct
    ) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [view, isIntroComplete, selectedProduct])

  // =========================================================
  // HEADER STATE
  // =========================================================

  const activeHeaderDark =
    view === 'home' &&
    isHeaderDark &&
    !selectedProduct

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleShopClick = () => {
    setSelectedProduct(null)
    setView('shop')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleContactClick = () => {
    setSelectedProduct(null)
    setView('contact')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleLogoClick = () => {
    setSelectedProduct(null)
    setView('home')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // =========================================================
  // EXPLORE / FLAVOURS
  // =========================================================

  const handleExploreClick = () => {
    const el = document.getElementById('flavors-section')

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  const handleAssortedClick = () => {
    if (view !== 'home') {
      setSelectedProduct(null)
      setView('home')

      setTimeout(() => {
        const el =
          document.getElementById('flavors-section')

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }, 100)
    } else {
      handleExploreClick()
    }
  }

  // =========================================================
  // CINEMATIC INTRO
  // =========================================================

  const handleIntroComplete = () => {
    setIsIntroComplete(true)
  }

  // =========================================================
  // PRODUCT DETAILS
  // =========================================================

  /*
   * IMPORTANT:
   *
   * ProductDetails receives the COMPLETE product object.
   *
   * PopularProducts → product object
   * ShopPage       → product object
   *
   * ProductDetails no longer needs:
   * productId
   * productImage
   */

  const handleProductClick = (product) => {
    if (!product) return

    setSelectedProduct(product)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleProductBack = () => {
    setSelectedProduct(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const current = flavors[index]

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <Header
        accentColor={
          activeHeaderDark
            ? '#c89d3c'
            : current.accent
        }
        isDark={activeHeaderDark}
        onShopClick={handleShopClick}
        onContactClick={handleContactClick}
        onLogoClick={handleLogoClick}
        onAssortedClick={handleAssortedClick}
      />

      {/* =====================================================
          PRODUCT DETAILS
          ===================================================== */}

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={handleProductBack}
        />
      ) : (
        <>
          {/* =================================================
              HOME
              ================================================= */}

          {view === 'home' && (
            <>
              <CinematicIntroHero
                onShopClick={handleShopClick}
                onExploreClick={handleExploreClick}
                onIntroComplete={handleIntroComplete}
              />

              <OnamSection
                onShopClick={handleShopClick}
              />

              <PopularProducts
                onShopClick={handleShopClick}
                onProductClick={handleProductClick}
              />

              <FeaturedSection />

              <CelebritySection />

              <MarketplaceSection />

              <HeritageSection />

              <SpotlightSection />

              <RecipeSection />

              {/* =================================================
                  FLAVOR SECTION — CURRENTLY DISABLED
                  ================================================= */}

              {/*
              <div id="flavors-section">
                <FlavorHero current={current} />
              </div>
              */}

              <CustomerReviews />

              <ReelsSection />

              <Footer />
            </>
          )}

          {/* =================================================
              SHOP
              ================================================= */}

          {view === 'shop' && (
            <>
              <ShopPage
                onProductClick={handleProductClick}
              />

              <Footer />
            </>
          )}

          {/* =================================================
              CONTACT
              ================================================= */}

          {view === 'contact' && (
            <Contact />
          )}
        </>
      )}
    </main>
  )
}