import { motion } from "framer-motion";
import { flavors } from "../data/flavors";

const placeholderPrice = "₹399";

export default function ShopPage() {
    return (
        <section className="shop-page shop-luxury">
            <div className="shop-gold-glow" />

            <motion.header
                className="shop-page-header"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <p className="shop-eyebrow">THE FULVA COLLECTION</p>

                <h1 className="shop-title">
                    Our Halwa <em>Collection</em>
                </h1>

                <div className="shop-title-rule">
                    <span />
                    <i>✦</i>
                    <span />
                </div>

                <p className="shop-subtitle">
                    Handcrafted the traditional Kozhikode way — timeless
                    flavours, slow-set with care.
                </p>
            </motion.header>

            <div className="shop-toolbar">
                <span className="shop-product-count">
                    {flavors.length} FLAVOURS
                </span>

                <div className="shop-filters">
                    <button type="button">
                        Availability <span>⌄</span>
                    </button>
                    <button type="button">
                        Price <span>⌄</span>
                    </button>
                    <button type="button">
                        Sort <span>⌄</span>
                    </button>
                </div>
            </div>

            <div className="shop-grid">
                {flavors.map((flavor, index) => (
                    <motion.article
                        key={flavor.id}
                        className="shop-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.65,
                            delay: index * 0.08,
                        }}
                        whileHover={{ y: -6 }}
                    >
                        <div
                            className="shop-card-image-area"
                            style={{
                                "--flavor-color": flavor.color,
                            }}
                        >
                            <div className="shop-gold-ring" />

                            <span className="shop-card-edition">
                                FULVA · {String(index + 1).padStart(2, "0")}
                            </span>

                            <img
                                src={flavor.productImage}
                                alt={`${flavor.name} Halwa`}
                                className="shop-card-image"
                            />
                        </div>

                        <div className="shop-card-content">
                            <p className="shop-card-kicker">
                                KOZHIKODE · AUTHENTIC HALWA
                            </p>

                            <h2
                                className="shop-card-title"
                                style={{ color: flavor.accent }}
                            >
                                {flavor.name}{" "}
                                <em>{flavor.nameItalic}</em>
                            </h2>

                            <p className="shop-card-description">
                                {flavor.tagline}
                            </p>

                            <div className="shop-card-line" />

                            <div className="shop-card-bottom">
                                <div className="shop-price">
                                    <span className="shop-current-price">
                                        {placeholderPrice}
                                    </span>

                                    <span className="shop-original-price">
                                        ₹499
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="shop-add-button"
                                    style={{
                                        "--button-color": flavor.accent,
                                    }}
                                >
                                    Add to Cart
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}