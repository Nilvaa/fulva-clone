import { motion } from "framer-motion";
import { flavors } from "../data/flavors";

// Hardcoded placeholder prices — swap for real ones whenever you have them.
const placeholderPrice = "₹399";

export default function ShopPage() {
    return (
        <section className="shop-page">
            <div className="shop-page-blob" />

            <div className="shop-page-header">
                <p className="shop-eyebrow">ALL FLAVOURS</p>
                <h1 className="shop-title">Our Halwa Collection</h1>
                <p className="shop-subtitle">
                    Handcrafted the traditional Kozhikode way — {flavors.length} flavours, no maida, no palm oil.
                </p>
            </div>

            <div className="shop-grid">
                {flavors.map((flavor, i) => (
                    <motion.div
                        key={flavor.id}
                        className="shop-card"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                    >
                        <div
                            className="shop-card-glow"
                            style={{ background: flavor.color }}
                        />
                        <img
                            src={flavor.productImage}
                            alt={flavor.name + " Halwa"}
                            className="shop-card-image"
                        />
                        <div className="shop-card-body">
                            <h3 className="shop-card-title" style={{ color: flavor.accent }}>
                                {flavor.name} {flavor.nameItalic}
                            </h3>
                            <p className="shop-card-tagline">{flavor.tagline}</p>
                            <div className="shop-card-footer">
                                <span className="shop-card-price">{placeholderPrice}</span>
                                <button
                                    className="shop-card-cta"
                                    style={{ background: flavor.accent }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}