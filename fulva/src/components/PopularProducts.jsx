import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react'
import './PopularProducts.css'

/* =========================================================
   SHARED PRODUCT DETAIL IMAGES

   These are used by ProductDetails.jsx after the product's
   own cover image.

   Example:

   Black Jaggery
   → BlackJaggery1.webp
   → pdt-1.webp
   → pdt1-image-2.webp
   → pdt1-image-3.webp
   → pdt1-image-4.webp
   ========================================================= */

const DETAIL_IMAGES = [
  '/products/pdt-1.webp',
  '/products/pdt1-image-2.webp',
  '/products/pdt1-image-3.webp',
  '/products/pdt1-image-4.webp',
]

/* =========================================================
   POPULAR PRODUCTS DATA
   ========================================================= */

export const PRODUCTS = [
  {
    id: '24-premium',

    title: '24 Premium Varieties of Kozhikoden Halwa',

    category: 'Assorted · 1600g',

    price: '₹1,590',

    originalPrice: '₹2,699',

    discount: '-41%',

    /*
     * ACTUAL COVER IMAGE
     *
     * This is the image displayed on the product card.
     */
    image: '/products/24-premium.webp',

    /*
     * PRODUCT DETAIL INFORMATION
     */

    type: 'Assorted',

    weight: '1600g',

    shelfLife: '30 days shelf life',

    pricePerGram: '₹0.99/g',

    delivery: 'All India Delivery Within 2 – 5 Business days',

    description:
      '24 Premium Varieties of authentic Kozhikoden Halwa — handcrafted with traditional recipes and carefully selected flavours.',

    /*
     * 24 Premium currently uses only its own cover image
     * in the product detail carousel.
     */
    images: [
      '/products/24-premium.webp',
    ],

    offers: [
      {
        percentage: '5%',
        title: 'Buy 2 - Get 5% Off',
        subtitle: 'Applicable for 2 different flavours',
        price: '₹3,021',
        oldPrice: '₹3,180',
        save: 'Save ₹159',
      },
      {
        percentage: '10%',
        title: 'Buy 3 - Get 10% Off',
        subtitle: 'Applicable for 3 different flavours',
        price: '₹4,293',
        oldPrice: '₹4,770',
        save: 'Save ₹477',
        badge: 'MOST POPULAR',
      },
      {
        percentage: '15%',
        title: 'Buy 4 - Get 15% Off',
        subtitle: 'Applicable for 4 different flavours',
        price: '₹5,406',
        oldPrice: '₹6,360',
        save: 'Save ₹954',
        badge: 'GREAT VALUE',
      },
    ],
  },

  {
    id: 'black-jaggery',

    title: 'Black Jaggery Halwa - Kozhikoden Halwa',

    category: 'Calicut Halwa · 200g',

    price: '₹219',

    originalPrice: '₹399',

    discount: '-45%',

    /*
     * ACTUAL BLACK JAGGERY COVER IMAGE
     */
    image: '/products/BlackJaggery1.webp',

    type: 'Calicut Halwa',

    weight: '200g',

    shelfLife: '30 days shelf life',

    pricePerGram: '₹1.10/g',

    delivery: 'All India Delivery Within 2 – 5 Business days',

    description:
      'Black Jaggery Halwa - Kozhikoden Halwa',

    /*
     * ProductDetails uses this as:
     *
     * 1. BlackJaggery1.webp
     * 2. pdt-1.webp
     * 3. pdt1-image-2.webp
     * 4. pdt1-image-3.webp
     * 5. pdt1-image-4.webp
     */
    images: [
      '/products/BlackJaggery1.webp',
      ...DETAIL_IMAGES,
    ],

    offers: [
      {
        percentage: '5%',
        title: 'Buy 2 - Get 5% Off',
        subtitle: 'Applicable for 2 different flavours',
        price: '₹416',
        oldPrice: '₹438',
        save: 'Save ₹22',
      },
      {
        percentage: '10%',
        title: 'Buy 3 - Get 10% Off',
        subtitle: 'Applicable for 3 different flavours',
        price: '₹591',
        oldPrice: '₹657',
        save: 'Save ₹66',
        badge: 'MOST POPULAR',
      },
      {
        percentage: '15%',
        title: 'Buy 4 - Get 15% Off',
        subtitle: 'Applicable for 4 different flavours',
        price: '₹745',
        oldPrice: '₹876',
        save: 'Save ₹131',
        badge: 'GREAT VALUE',
      },
    ],
  },

  {
    id: 'honey-dry-fruit',

    title: 'Honey Dry Fruit - Kozhikoden Halwa',

    category: 'Calicut Halwa · 200g',

    price: '₹239',

    originalPrice: '₹439',

    discount: '-46%',

    /*
     * ACTUAL HONEY DRY FRUIT COVER IMAGE
     */
    image: '/products/Honeydryfruitlistingimage.webp',

    type: 'Calicut Halwa',

    weight: '200g',

    shelfLife: '30 days shelf life',

    pricePerGram: '₹1.20/g',

    delivery: 'All India Delivery Within 2 – 5 Business days',

    description:
      'Honey Dry Fruit - Kozhikoden Halwa',

    images: [
      '/products/Honeydryfruitlistingimage.webp',
      ...DETAIL_IMAGES,
    ],

    offers: [
      {
        percentage: '5%',
        title: 'Buy 2 - Get 5% Off',
        subtitle: 'Applicable for 2 different flavours',
        price: '₹454',
        oldPrice: '₹478',
        save: 'Save ₹24',
      },
      {
        percentage: '10%',
        title: 'Buy 3 - Get 10% Off',
        subtitle: 'Applicable for 3 different flavours',
        price: '₹645',
        oldPrice: '₹717',
        save: 'Save ₹72',
        badge: 'MOST POPULAR',
      },
      {
        percentage: '15%',
        title: 'Buy 4 - Get 15% Off',
        subtitle: 'Applicable for 4 different flavours',
        price: '₹813',
        oldPrice: '₹956',
        save: 'Save ₹143',
        badge: 'GREAT VALUE',
      },
    ],
  },

  {
    id: 'tender-coconut',

    title: 'Tender Coconut - Kozhikoden Halwa',

    category: 'Calicut Halwa · 200g',

    price: '₹219',

    originalPrice: '₹399',

    discount: '-45%',

    /*
     * ACTUAL TENDER COCONUT COVER IMAGE
     */
    image: '/products/Newtendercoconut1.webp',

    type: 'Calicut Halwa',

    weight: '200g',

    shelfLife: '30 days shelf life',

    pricePerGram: '₹1.10/g',

    delivery: 'All India Delivery Within 2 – 5 Business days',

    description:
      'Tender Coconut - Kozhikoden Halwa',

    images: [
      '/products/Newtendercoconut1.webp',
      ...DETAIL_IMAGES,
    ],

    offers: [
      {
        percentage: '5%',
        title: 'Buy 2 - Get 5% Off',
        subtitle: 'Applicable for 2 different flavours',
        price: '₹416',
        oldPrice: '₹438',
        save: 'Save ₹22',
      },
      {
        percentage: '10%',
        title: 'Buy 3 - Get 10% Off',
        subtitle: 'Applicable for 3 different flavours',
        price: '₹591',
        oldPrice: '₹657',
        save: 'Save ₹66',
        badge: 'MOST POPULAR',
      },
      {
        percentage: '15%',
        title: 'Buy 4 - Get 15% Off',
        subtitle: 'Applicable for 4 different flavours',
        price: '₹745',
        oldPrice: '₹876',
        save: 'Save ₹131',
        badge: 'GREAT VALUE',
      },
    ],
  },

  {
    id: 'fulva-box',

    title: 'Fulva Box — Royal Signature Collection',

    category: 'Luxury Assorted · 1000g',

    price: '₹1,290',

    originalPrice: '₹2,199',

    discount: '-41%',

    /*
     * ACTUAL FULVA BOX COVER IMAGE
     */
    image: '/products/Fulva_Box_01.webp',

    type: 'Luxury Assorted',

    weight: '1000g',

    shelfLife: '30 days shelf life',

    pricePerGram: '₹1.29/g',

    delivery: 'All India Delivery Within 2 – 5 Business days',

    description:
      'Fulva Box — Royal Signature Collection',

    images: [
      '/products/Fulva_Box_01.webp',
      ...DETAIL_IMAGES,
    ],

    offers: [
      {
        percentage: '5%',
        title: 'Buy 2 - Get 5% Off',
        subtitle: 'Applicable for 2 different flavours',
        price: '₹2,451',
        oldPrice: '₹2,580',
        save: 'Save ₹129',
      },
      {
        percentage: '10%',
        title: 'Buy 3 - Get 10% Off',
        subtitle: 'Applicable for 3 different flavours',
        price: '₹3,483',
        oldPrice: '₹3,870',
        save: 'Save ₹387',
        badge: 'MOST POPULAR',
      },
      {
        percentage: '15%',
        title: 'Buy 4 - Get 15% Off',
        subtitle: 'Applicable for 4 different flavours',
        price: '₹4,386',
        oldPrice: '₹5,160',
        save: 'Save ₹774',
        badge: 'GREAT VALUE',
      },
    ],
  },
]

/* =========================================================
   CORPORATE GIFTING TAGS
   ========================================================= */

const GIFT_TAGS = [
  'Corporate',
  'Weddings',
  'Birthdays',
  'Diwali',
  'Christmas',
  'Onam',
  'Eid & Ramadan',
  '& More',
]

/* =========================================================
   COMPONENT
   ========================================================= */

export default function PopularProducts({
  onShopClick,
  onProductClick,
}) {
  const scrollRef = useRef(null)

  const [addedItems, setAddedItems] = useState({})

  /* =======================================================
     CAROUSEL SCROLL
     ======================================================= */

  const handleScroll = (direction) => {
    if (!scrollRef.current) return

    const cardWidth = 320 + 24

    const scrollAmount =
      direction === 'left'
        ? -cardWidth * 2
        : cardWidth * 2

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     PRODUCT DETAILS
     ======================================================= */

  const handleProductClick = (product) => {
    if (!onProductClick) return

    onProductClick(product)
  }

  /* =======================================================
     ADD TO CART
     ======================================================= */

  const handleAddToCart = (event, id) => {
    /*
     * Prevent the card click from firing.
     */
    event.stopPropagation()

    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }))

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [id]: false,
      }))
    }, 2000)
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="popular-products-wrapper">

      {/* =====================================================
          SECTION 1 — MOST POPULAR PRODUCTS
          ===================================================== */}

      <section className="popular-section">

        <div className="popular-container">

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="popular-header-row">

            <motion.div
              className="popular-header-left"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-50px',
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <span className="popular-eyebrow">

                <span className="eyebrow-diamond">
                  ◆
                </span>

                THE COLLECTION

              </span>

              <h2 className="popular-title">

                Most Popular{' '}

                <span className="title-gold">
                  Products
                </span>

              </h2>

            </motion.div>

            {/* =================================================
                CAROUSEL ARROWS
                ================================================= */}

            <div className="popular-controls">

              <button
                type="button"
                className="nav-btn"
                onClick={() =>
                  handleScroll('left')
                }
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                className="nav-btn"
                onClick={() =>
                  handleScroll('right')
                }
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>

            </div>

          </div>

          {/* =================================================
              PRODUCT CAROUSEL
              ================================================= */}

          <div
            className="popular-carousel-track"
            ref={scrollRef}
          >

            {PRODUCTS.map((product, index) => (

              <motion.article
                key={product.id}
                className="product-card"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-40px',
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                onClick={() =>
                  handleProductClick(product)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' ||
                    event.key === ' '
                  ) {
                    event.preventDefault()

                    handleProductClick(product)
                  }
                }}
              >

                {/* =================================================
                    DISCOUNT BADGE
                    ================================================= */}

                <div className="card-discount-badge">
                  {product.discount}
                </div>

                {/* =================================================
                    IMAGE
                    ================================================= */}

                <div className="card-image-wrap">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-image"
                    loading="lazy"
                  />

                  <div className="card-image-overlay" />

                </div>

                {/* =================================================
                    CARD CONTENT
                    ================================================= */}

                <div className="card-content">

                  <span className="card-category">
                    {product.category}
                  </span>

                  <h3 className="card-title">
                    {product.title}
                  </h3>

                  <div className="card-price-row">

                    <span className="card-price-current">
                      {product.price}
                    </span>

                    <span className="card-price-original">
                      {product.originalPrice}
                    </span>

                  </div>

                  {/* =================================================
                      ADD TO CART
                      ================================================= */}

                  <button
                    type="button"
                    className={`card-add-btn ${addedItems[product.id]
                      ? 'added'
                      : ''
                      }`}
                    onClick={(event) =>
                      handleAddToCart(
                        event,
                        product.id
                      )
                    }
                  >

                    <ShoppingBag size={15} />

                    <span>
                      {addedItems[product.id]
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </span>

                  </button>

                </div>

              </motion.article>

            ))}

          </div>

          {/* =================================================
              SECTION FOOTER
              ================================================= */}

          <div className="popular-footer">

            <button
              type="button"
              className="view-all-link"
              onClick={onShopClick}
            >

              <span>
                VIEW ALL PRODUCTS
              </span>

              <ArrowRight size={16} />

            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          SECTION 2 — CORPORATE GIFTING
          ===================================================== */}

      <section className="corporate-section">

        <div className="corporate-container">

          <motion.div
            className="corporate-banner"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-50px',
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* =================================================
                BACKGROUND EFFECTS
                ================================================= */}

            <div className="corp-glow" />

            <div className="corp-gold-line" />

            <div className="corporate-grid">

              {/* =================================================
                  LEFT — CORPORATE TEXT
                  ================================================= */}

              <div className="corporate-text-col">

                <span className="corporate-eyebrow">

                  <span className="eyebrow-dot" />

                  CORPORATE GIFTING

                </span>

                <h2 className="corporate-heading">

                  Bulk orders for{' '}

                  <span className="corp-serif-italic">
                    offices & events
                  </span>

                </h2>

                <h3 className="corporate-subheading">
                  Custom branded boxes available
                </h3>

                <p className="corporate-support">

                  Minimum 20 boxes

                  <span className="bullet-sep">
                    ·
                  </span>

                  Priority shipping

                  <span className="bullet-sep">
                    ·
                  </span>

                  Your logo on every box

                </p>

                {/* =================================================
                    CATEGORY CHIPS
                    ================================================= */}

                <div className="corporate-chips-grid">

                  {GIFT_TAGS.map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="corp-chip"
                      >
                        {tag}
                      </span>
                    )
                  )}

                </div>

                {/* =================================================
                    INQUIRE BUTTON
                    ================================================= */}

                <div className="corporate-action">

                  <button
                    type="button"
                    className="corp-inquire-btn"
                    onClick={onShopClick}
                  >

                    Inquire for Bulk Orders

                    <ArrowRight size={15} />

                  </button>

                </div>

              </div>

              {/* =================================================
                  RIGHT — GIFT BOX
                  ================================================= */}

              <div className="corporate-visual-col">

                <div className="corp-img-frame">

                  <img
                    src="/products/Fulva_Box_01.webp"
                    alt="Fulva Luxury Corporate Gift Box"
                    className="corp-box-img"
                  />

                  <div className="corp-frame-accent" />

                  <div className="corp-gold-tag">
                    Signature Gift Box
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          SECTION 3 — WHATSAPP BUTTON
          ===================================================== */}

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

        <span className="wa-text">
          Chat with us
        </span>

      </a>

    </div>
  )
}