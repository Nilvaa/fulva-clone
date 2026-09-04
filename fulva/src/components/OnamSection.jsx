import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./OnamSection.css";

const onamProducts = [
  {
    id: "onam-box",
    badge: "LIMITED EDITION",
    badgeVariant: "gold",
    image: "/onam/onam-box.webp",
    alt: "Fulva Onam Gift Box",
    weight: "500g · Premium Box",
    title: "Onam Gift Box",
    subtitle:
      "A curated selection of our finest halwa varieties, presented in a hand-finished collector's box.",
    price: "₹1,200",
    originalPrice: "₹1,599",
  },
  {
    id: "onam-card-2",
    badge: "25% OFF",
    badgeVariant: "",
    image: "/onam/onam-card-2.webp",
    alt: "Fulva Festive Assorted Pack",
    weight: "250g · Festive Pack",
    title: "Festive Assorted",
    subtitle:
      "Six handpicked flavours for gifting — rose, fig, jackfruit, chocolate, pineapple & original.",
    price: "₹599",
    originalPrice: "₹799",
  },
  {
    id: "onam-bulk",
    badge: "BULK OFFER",
    badgeVariant: "",
    image: "/onam/onam-festive-bg.webp",
    alt: "Fulva Bulk Corporate Gifting",
    weight: "1 kg · Corporate Pack",
    title: "Corporate Gifting",
    subtitle:
      "Premium branded gifting for Onam celebrations. Minimum 10 boxes. Custom branding available.",
    price: "₹2,199",
    originalPrice: "₹2,799",
  },
];

// Returns how each card is positioned relative to the active index.
// offset: -1 = left, 0 = center, +1 = right, ±2 = hidden
function getOffset(i, active, total) {
  let raw = i - active;
  // Wrap for circular navigation
  if (raw > Math.floor(total / 2)) raw -= total;
  if (raw < -Math.floor(total / 2)) raw += total;
  return raw;
}

// Per-offset visual configuration
function cardConfig(offset) {
  switch (offset) {
    case 0: // center / active
      return {
        x: "0%",
        scale: 1,
        opacity: 1,
        zIndex: 10,
        rotateY: 0,
        filter: "none",
        cursor: "default",
      };
    case -1: // left
    case 1: // right
      return {
        x: offset === -1 ? "-68%" : "68%",
        scale: 0.78,
        opacity: 0.55,
        zIndex: 5,
        rotateY: offset * -12,
        filter: "brightness(0.7)",
        cursor: "pointer",
      };
    default: // hidden / far
      return {
        x: offset < 0 ? "-110%" : "110%",
        scale: 0.6,
        opacity: 0,
        zIndex: 1,
        rotateY: offset * -18,
        filter: "brightness(0.4)",
        cursor: "pointer",
      };
  }
}

const AUTOPLAY_INTERVAL = 4500;

export default function OnamSection({ onShopClick }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const total = onamProducts.length;

  const goTo = useCallback(
    (idx) => {
      setActive(((idx % total) + total) % total);
      setPaused(true);
    },
    [total]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) {
      // Resume autoplay after 6 s of inactivity
      const resume = setTimeout(() => setPaused(false), 6000);
      return () => clearTimeout(resume);
    }
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Touch / swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const activeProduct = onamProducts[active];

  return (
    <section
      id="onam-section"
      className="onam-section"
      style={{ backgroundImage: "url('/onam/onam-festive-bg.webp')" }}
    >
      {/* Dark overlay */}
      <div className="onam-bg-overlay" />

      {/* Ambient glows */}
      <div className="onam-ambient-glow" />
      <div className="onam-ambient-glow-secondary" />

      <div className="onam-inner">
        {/* ── Section header ── */}
        <header className="onam-header">
          <div className="onam-eyebrow">
            <span className="onam-eyebrow-dot" />
            RIGHT NOW
          </div>

          <h2 className="onam-title">
            Fulva <em>Onam Editions</em>
          </h2>

          <p className="onam-description">
            Celebrate Onam with the authentic taste of Kozhikode. Handcrafted
            halwa gifting collections designed for the most cherished festival
            of Kerala.
          </p>

          <div className="onam-actions">
            <button className="btn-onam-primary" onClick={onShopClick}>
              Explore All
            </button>
            <button className="btn-onam-secondary" onClick={onShopClick}>
              Bulk Gifting →
            </button>
          </div>
        </header>

        {/* ── Carousel stage ── */}
        <div
          className="onam-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Onam product carousel"
        >
          {/* Cards */}
          <div className="onam-carousel-track" style={{ perspective: "1200px" }}>
            {onamProducts.map((product, i) => {
              const offset = getOffset(i, active, total);
              const cfg = cardConfig(offset);
              const isCenter = offset === 0;
              const isSide = Math.abs(offset) === 1;

              return (
                <motion.article
                  key={product.id}
                  className={`onam-card ${isCenter ? "onam-card--active" : ""}`}
                  style={{ zIndex: cfg.zIndex }}
                  animate={{
                    x: cfg.x,
                    scale: cfg.scale,
                    opacity: cfg.opacity,
                    rotateY: cfg.rotateY,
                    filter: cfg.filter,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 0.9,
                  }}
                  onClick={() => !isCenter && isSide && goTo(i)}
                  tabIndex={isSide ? 0 : -1}
                  aria-label={
                    isSide ? `View ${product.title}` : product.title
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isSide) goTo(i);
                  }}
                >
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`onam-card-badge${
                        product.badgeVariant ? ` ${product.badgeVariant}` : ""
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Image */}
                  <div className="onam-card-media">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="onam-card-img"
                      draggable="false"
                    />
                    <div className="onam-card-media-overlay" />
                  </div>

                  {/* Body — only fully rendered on center card */}
                  <div className="onam-card-body">
                    <p className="onam-card-weight">{product.weight}</p>
                    <h3 className="onam-card-title">{product.title}</h3>
                    {isCenter && (
                      <p className="onam-card-subtitle">{product.subtitle}</p>
                    )}

                    <div className="onam-card-footer">
                      <div className="onam-price-group">
                        <span className="onam-price-current">
                          {product.price}
                        </span>
                        <span className="onam-price-original">
                          {product.originalPrice}
                        </span>
                      </div>
                      {isCenter && (
                        <button
                          className="onam-card-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShopClick();
                          }}
                        >
                          + Cart
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Side-card "tap to view" hint */}
                  {isSide && (
                    <div className="onam-card-side-hint" aria-hidden="true">
                      {offset === -1 ? "← View" : "View →"}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {/* Prev / Next controls */}
          <button
            className="onam-nav onam-nav--prev"
            onClick={prev}
            aria-label="Previous product"
          >
            ←
          </button>
          <button
            className="onam-nav onam-nav--next"
            onClick={next}
            aria-label="Next product"
          >
            →
          </button>

          {/* Dot indicators */}
          <div className="onam-dots" role="tablist" aria-label="Select product">
            {onamProducts.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === active}
                aria-label={p.title}
                className={`onam-dot${i === active ? " onam-dot--active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
