import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const SPOTLIGHT_PRODUCTS = [
  {
    id: 'pistachio-kunafa',
    eyebrow: 'A TASTE OF KOZHIKODE',
    title: 'Pistachio',
    titleAccent: 'Kunafa Halwa',
    description:
      'A luxurious fusion of delicate pistachio and kunafa textures with the rich character of traditional Kozhikode halwa.',
    price: '₹349.00',
    originalPrice: '₹499.00',
    image: '/products/Kunafahalwa1.png',
    ingredientImage: '/products/pista.png',
    glowColor: 'rgba(212, 175, 55, 0.16)',
    // 12 Full-Frame Environmental Ingredients (Background Bokeh, Midground, Large Foreground)
    ingredients: [
      // Large Foreground Elements (Partially cropped by viewport edges)
      { id: 1, top: '-5%', left: '-4%', size: '230px', blur: '1px', opacity: 0.95, rotate: -25, scale: 1.25, zIndex: 10 },
      { id: 2, bottom: '-8%', right: '-3%', size: '260px', blur: '1.5px', opacity: 0.9, rotate: 35, scale: 1.35, zIndex: 10 },
      { id: 3, bottom: '-10%', left: '2%', size: '200px', blur: '0.5px', opacity: 0.92, rotate: 15, scale: 1.15, zIndex: 10 },

      // Midground Elements (Medium distance)
      { id: 4, top: '28%', left: '4%', size: '100px', blur: '3px', opacity: 0.75, rotate: 12, scale: 0.8, zIndex: 3 },
      { id: 5, top: '16%', right: '5%', size: '110px', blur: '3.5px', opacity: 0.8, rotate: -18, scale: 0.85, zIndex: 3 },
      { id: 6, bottom: '20%', right: '22%', size: '95px', blur: '2px', opacity: 0.82, rotate: 22, scale: 0.75, zIndex: 3 },
      { id: 7, bottom: '15%', left: '18%', size: '105px', blur: '2.5px', opacity: 0.78, rotate: -30, scale: 0.8, zIndex: 3 },

      // Deep Background Bokeh (Far distance, soft & blurred)
      { id: 8, top: '2%', left: '42%', size: '85px', blur: '14px', opacity: 0.35, rotate: -40, scale: 0.5, zIndex: 1 },
      { id: 9, top: '6%', left: '15%', size: '110px', blur: '12px', opacity: 0.38, rotate: 25, scale: 0.65, zIndex: 1 },
      { id: 10, top: '5%', right: '16%', size: '120px', blur: '15px', opacity: 0.32, rotate: -15, scale: 0.7, zIndex: 1 },
      { id: 11, bottom: '6%', left: '32%', size: '90px', blur: '11px', opacity: 0.36, rotate: 45, scale: 0.55, zIndex: 1 },
      { id: 12, bottom: '10%', right: '12%', size: '115px', blur: '13px', opacity: 0.34, rotate: -20, scale: 0.68, zIndex: 1 }
    ]
  },
  {
    id: 'thirunelveli',
    eyebrow: 'A TASTE OF KOZHIKODE',
    title: 'Thirunelveli',
    titleAccent: 'Halwa',
    description:
      'A deeply caramelised South Indian classic with a rich, slow-cooked texture and roasted cashew finish.',
    price: '₹239.00',
    originalPrice: '₹439.00',
    image: '/products/Thirunelvelihalwa1.png',
    ingredientImage: '/products/cashew.png',
    glowColor: 'rgba(200, 125, 60, 0.16)',
    ingredients: [
      // Foreground
      { id: 1, top: '-7%', right: '-4%', size: '240px', blur: '1.2px', opacity: 0.92, rotate: 40, scale: 1.3, zIndex: 10 },
      { id: 2, bottom: '-9%', left: '-2%', size: '250px', blur: '1px', opacity: 0.9, rotate: -35, scale: 1.35, zIndex: 10 },
      { id: 3, top: '60%', right: '1%', size: '180px', blur: '0.8px', opacity: 0.94, rotate: 18, scale: 1.1, zIndex: 10 },

      // Midground
      { id: 4, top: '32%', left: '5%', size: '95px', blur: '3px', opacity: 0.78, rotate: -15, scale: 0.75, zIndex: 3 },
      { id: 5, top: '22%', right: '18%', size: '105px', blur: '2.5px', opacity: 0.82, rotate: 25, scale: 0.8, zIndex: 3 },
      { id: 6, bottom: '18%', left: '22%', size: '90px', blur: '2px', opacity: 0.8, rotate: -20, scale: 0.7, zIndex: 3 },

      // Deep Background
      { id: 7, top: '3%', left: '38%', size: '90px', blur: '13px', opacity: 0.36, rotate: -30, scale: 0.55, zIndex: 1 },
      { id: 8, top: '7%', left: '12%', size: '115px', blur: '11px', opacity: 0.38, rotate: 20, scale: 0.65, zIndex: 1 },
      { id: 9, top: '4%', right: '22%', size: '125px', blur: '16px', opacity: 0.3, rotate: -45, scale: 0.72, zIndex: 1 },
      { id: 10, bottom: '8%', left: '35%', size: '95px', blur: '10px', opacity: 0.35, rotate: 15, scale: 0.6, zIndex: 1 },
      { id: 11, bottom: '6%', right: '14%', size: '110px', blur: '12px', opacity: 0.37, rotate: -25, scale: 0.65, zIndex: 1 }
    ]
  },
  {
    id: 'muscoth',
    eyebrow: 'A TASTE OF KOZHIKODE',
    title: 'Muscoth',
    titleAccent: 'Halwa',
    description:
      'A rich, chewy halwa with warm caramel notes and the delicate character of coconut.',
    price: '₹239.00',
    originalPrice: '₹439.00',
    image: '/products/MuscothHalwa1.png',
    ingredientImage: '/products/coconut.png',
    glowColor: 'rgba(229, 193, 88, 0.16)',
    ingredients: [
      // Foreground
      { id: 1, top: '-6%', left: '-3%', size: '235px', blur: '1px', opacity: 0.95, rotate: -18, scale: 1.25, zIndex: 10 },
      { id: 2, bottom: '-8%', right: '-4%', size: '255px', blur: '1.5px', opacity: 0.88, rotate: 30, scale: 1.35, zIndex: 10 },
      { id: 3, top: '55%', left: '2%', size: '190px', blur: '0.5px', opacity: 0.93, rotate: -22, scale: 1.12, zIndex: 10 },

      // Midground
      { id: 4, top: '35%', right: '8%', size: '100px', blur: '3px', opacity: 0.76, rotate: 15, scale: 0.78, zIndex: 3 },
      { id: 5, top: '18%', right: '20%', size: '85px', blur: '2.5px', opacity: 0.8, rotate: -12, scale: 0.7, zIndex: 3 },
      { id: 6, bottom: '16%', right: '24%', size: '95px', blur: '2px', opacity: 0.82, rotate: 28, scale: 0.74, zIndex: 3 },

      // Deep Background
      { id: 7, top: '2%', left: '45%', size: '80px', blur: '14px', opacity: 0.34, rotate: -35, scale: 0.5, zIndex: 1 },
      { id: 8, top: '8%', left: '16%', size: '105px', blur: '12px', opacity: 0.38, rotate: 22, scale: 0.65, zIndex: 1 },
      { id: 9, top: '5%', right: '15%', size: '120px', blur: '15px', opacity: 0.32, rotate: -40, scale: 0.7, zIndex: 1 },
      { id: 10, bottom: '7%', left: '28%', size: '100px', blur: '10px', opacity: 0.36, rotate: 18, scale: 0.6, zIndex: 1 },
      { id: 11, bottom: '10%', right: '10%', size: '115px', blur: '13px', opacity: 0.35, rotate: -15, scale: 0.66, zIndex: 1 }
    ]
  }
]

export default function SpotlightSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [added, setAdded] = useState(false)

  const product = SPOTLIGHT_PRODUCTS[currentIndex]

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % SPOTLIGHT_PRODUCTS.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + SPOTLIGHT_PRODUCTS.length) % SPOTLIGHT_PRODUCTS.length)
  }

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section className="spotlight-section">
      {/* Full-Screen Environmental Ingredient Layer */}
      <div className="spotlight-fullscreen-ingredients">
        {product.ingredients.map((ing) => (
          <motion.img
            key={ing.id}
            src={product.ingredientImage}
            alt=""
            className="env-ingredient"
            style={{
              top: ing.top,
              bottom: ing.bottom,
              left: ing.left,
              right: ing.right,
              width: ing.size,
              height: ing.size,
              filter: `blur(${ing.blur})`,
              opacity: ing.opacity,
              transform: `rotate(${ing.rotate}deg) scale(${ing.scale})`,
              zIndex: ing.zIndex
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [ing.rotate, ing.rotate + 4, ing.rotate]
            }}
            transition={{
              duration: 4.5 + (ing.id % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ing.id * 0.2
            }}
          />
        ))}
      </div>

      {/* Atmospheric Lighting & Soft Studio Glow */}
      <div
        className="spotlight-radial-glow"
        style={{ background: `radial-gradient(circle at 62% 48%, ${product.glowColor} 0%, transparent 66%)` }}
      />
      <div className="spotlight-vignette" />

      <div className="spotlight-container">
        {/* Top Header */}
        <div className="spotlight-header">
          <div className="spotlight-header-eyebrow">
            <span className="hdr-line" />
            <span>OUR FINEST</span>
            <span className="hdr-line" />
          </div>
          <h2 className="spotlight-main-heading">
            In the <span className="gold-italic">Spotlight</span>
          </h2>
          <p className="spotlight-subtitle">
            Handpicked favourites — crafted with the character of authentic Kozhikode halwa.
          </p>
        </div>

        {/* Main 16:9 Hero Stage */}
        <div className="spotlight-hero-stage">
          {/* Stage Arrow Left */}
          <button
            className="spotlight-stage-arrow arrow-left"
            onClick={handlePrev}
            aria-label="Previous Halwa"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Stage Arrow Right */}
          <button
            className="spotlight-stage-arrow arrow-right"
            onClick={handleNext}
            aria-label="Next Halwa"
          >
            <ChevronRight size={22} />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={product.id}
              className="spotlight-grid"
              initial={{ opacity: 0, x: direction * 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -35 }}
              transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* Left Column: Product Info */}
              <div className="spotlight-left-content">
                <span className="spotlight-eyebrow-text">{product.eyebrow}</span>

                <h3 className="spotlight-hero-title">
                  {product.title} <br />
                  <span className="gold-italic">{product.titleAccent}</span>
                </h3>

                <p className="spotlight-hero-desc">{product.description}</p>

                <div className="spotlight-hero-price">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>

                <div className="spotlight-btn-group">
                  <button
                    className={`spotlight-pill-primary ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                  >
                    <span>{added ? 'ADDED TO CART' : 'ADD TO CART'}</span>
                    <ArrowRight size={15} />
                  </button>

                  <button className="spotlight-pill-secondary">
                    View Details
                  </button>
                </div>
              </div>

              {/* Right Column: Prominent Sharp Product Composition (Unobstructed Focal Center) */}
              <div className="spotlight-right-stage">
                <div className="spotlight-main-product-wrap">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="spotlight-hero-img"
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                  />
                  <div className="spotlight-hero-shadow" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Counter & Progress Bar */}
        <div className="spotlight-footer-bar">
          <div className="spotlight-counter">
            <span className="counter-line" />
            <span className="counter-numbers">
              0{currentIndex + 1} <span className="counter-slash">/</span> 0{SPOTLIGHT_PRODUCTS.length}
            </span>
            <span className="counter-line" />
          </div>

          <div className="spotlight-discover-label">
            <span
              className="discover-progress"
              style={{ width: `${((currentIndex + 1) / SPOTLIGHT_PRODUCTS.length) * 100}%` }}
            />
            <span>DISCOVER MORE FLAVOURS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
