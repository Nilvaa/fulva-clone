import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react'
import './PopularProducts.css'

const PRODUCTS = [
  {
    id: '24-premium',
    title: '24 Premium Varieties of Kozhikoden Halwa',
    category: 'Assorted · 1600g',
    price: '₹1,590',
    originalPrice: '₹2,699',
    discount: '-41%',
    image: '/products/24-premium.webp',
  },
  {
    id: 'black-jaggery',
    title: 'Black Jaggery Halwa - Kozhikoden Halwa',
    category: 'Calicut Halwa · 200g',
    price: '₹219',
    originalPrice: '₹399',
    discount: '-45%',
    image: '/products/BlackJaggery1.webp',
  },
  {
    id: 'honey-dry-fruit',
    title: 'Honey Dry Fruit - Kozhikoden Halwa',
    category: 'Calicut Halwa · 200g',
    price: '₹239',
    originalPrice: '₹439',
    discount: '-46%',
    image: '/products/Honeydryfruitlistingimage.webp',
  },
  {
    id: 'tender-coconut',
    title: 'Tender Coconut - Kozhikoden Halwa',
    category: 'Calicut Halwa · 200g',
    price: '₹219',
    originalPrice: '₹399',
    discount: '-45%',
    image: '/products/Newtendercoconut1.webp',
  },
  {
    id: 'fulva-box',
    title: 'Fulva Box — Royal Signature Collection',
    category: 'Luxury Assorted · 1000g',
    price: '₹1,290',
    originalPrice: '₹2,199',
    discount: '-41%',
    image: '/products/Fulva_Box_01.webp',
  },
]

const GIFT_TAGS = [
  'Corporate',
  'Weddings',
  'Birthdays',
  'Diwali',
  'Christmas',
  'Onam',
  'Eid & Ramadan',
  'Farewell',
  '& More',
]

export default function PopularProducts({ onShopClick }) {
  const scrollRef = useRef(null)
  const [addedItems, setAddedItems] = useState({})

  const handleScroll = (direction) => {
    if (!scrollRef.current) return
    const cardWidth = 320 + 24 // Card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const handleAddToCart = (id) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }))
    }, 2000)
  }

  return (
    <div className="popular-products-wrapper">
      {/* SECTION 1 — MOST POPULAR PRODUCTS */}
      <section className="popular-section">
        <div className="popular-container">
          {/* Header */}
          <div className="popular-header-row">
            <motion.div
              className="popular-header-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
            >
              <span className="popular-eyebrow">
                <span className="eyebrow-diamond">◆</span> THE COLLECTION
              </span>
              <h2 className="popular-title">
                Most Popular <span className="title-gold">Products</span>
              </h2>
            </motion.div>

            {/* Desktop Navigation Arrows */}
            <div className="popular-controls">
              <button
                className="nav-btn"
                onClick={() => handleScroll('left')}
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="nav-btn"
                onClick={() => handleScroll('right')}
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Product Carousel Grid */}
          <div className="popular-carousel-track" ref={scrollRef}>
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Discount Badge */}
                <div className="card-discount-badge">{product.discount}</div>

                {/* Image Container */}
                <div className="card-image-wrap">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="card-image-overlay" />
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <span className="card-category">{product.category}</span>
                  <h3 className="card-title">{product.title}</h3>

                  <div className="card-price-row">
                    <span className="card-price-current">{product.price}</span>
                    <span className="card-price-original">{product.originalPrice}</span>
                  </div>

                  <button
                    className={`card-add-btn ${addedItems[product.id] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingBag size={15} />
                    <span>{addedItems[product.id] ? 'Added to Cart' : 'Add to Cart'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Footer */}
          <div className="popular-footer">
            <button className="view-all-link" onClick={onShopClick}>
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CORPORATE GIFTING */}
      <section className="corporate-section">
        <div className="corporate-container">
          <motion.div
            className="corporate-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Texture & Ambient Glow */}
            <div className="corp-glow" />
            <div className="corp-gold-line" />

            <div className="corporate-grid">
              {/* Left Column: Text & Details */}
              <div className="corporate-text-col">
                <span className="corporate-eyebrow">
                  <span className="eyebrow-dot" /> CORPORATE GIFTING
                </span>
                <h2 className="corporate-heading">
                  Bulk orders for <span className="corp-serif-italic">offices & events</span>
                </h2>
                <h3 className="corporate-subheading">Custom branded boxes available</h3>

                <p className="corporate-support">
                  Minimum 20 boxes <span className="bullet-sep">·</span> Priority shipping{' '}
                  <span className="bullet-sep">·</span> Your logo on every box
                </p>

                {/* Category Chips */}
                <div className="corporate-chips-grid">
                  {GIFT_TAGS.map((tag, idx) => (
                    <span key={idx} className="corp-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="corporate-action">
                  <button className="corp-inquire-btn" onClick={onShopClick}>
                    Inquire for Bulk Orders
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Right Column: Editorial Box Visual */}
              <div className="corporate-visual-col">
                <div className="corp-img-frame">
                  <img
                    src="/products/Fulva_Box_01.webp"
                    alt="Fulva Luxury Corporate Gift Box"
                    className="corp-box-img"
                  />
                  <div className="corp-frame-accent" />
                  <div className="corp-gold-tag">Signature Gift Box</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — WHATSAPP BUTTON (LUXURY THEME) */}
      <a
        href="https://wa.me/919000000000?text=Hello%20Fulva!%20I%20would%20like%20to%20inquire%20about%20your%20premium%20halwa%20collection."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-luxury-btn"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="wa-icon-box">
          <svg
            className="wa-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <span className="wa-text">Chat with us</span>
      </a>
    </div>
  )
}
