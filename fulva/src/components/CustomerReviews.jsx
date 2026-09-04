import { motion } from "framer-motion";

const reviews = [
    {
        title: "Exceptional Quality & Freshness",
        text: "The halwa is wonderfully soft, rich, and not overly greasy. The pure flavor and authentic Kozhikode taste are spot on. Arrived completely fresh!",
        name: "Anjali R",
    },
    {
        title: "The Ultimate Gifting Box",
        text: "I ordered the 24-variety halwa gift box for a business event and my client's family loved it. Amazing packaging and very premium quality.",
        name: "Muhammed Farhan",
    },
    {
        title: "Creative Twist on Traditional Sweets",
        text: "The Halwa-Stuffed Medjool Dates are a masterpiece! Perfect balance of sweetness and texture — a truly luxurious treat.",
        name: "Sneha K",
    },
    {
        title: "Nostalgic & Authentic Flavor",
        text: "The Mango Halwa brings back memories of Kerala summers. Chewy, naturally fruity, and beautifully packaged.",
        name: "Vivek Nair",
    },
    {
        title: "Secure & Fast Delivery",
        text: "Ordered a multi-flavor box online. Neat, secure packaging with zero leakage. Tastes melt-in-the-mouth soft!",
        name: "Dr. Priya S",
    },
];

export default function CustomerReviews() {
    return (
        <section className="customer-reviews">
            <div className="customer-reviews-glow" />

            <motion.div
                className="reviews-heading"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <p className="reviews-eyebrow">
                    <span />
                    LOVED BY CUSTOMERS
                    <span />
                </p>

                <h2>
                    What Our Customers <em>Say</em>
                </h2>

                <div className="reviews-trust">
                    <span>★★★★★</span>
                    Trusted by 80,000+ Customers across the World
                </div>
            </motion.div>

            <div className="reviews-grid">
                {reviews.map((review, index) => (
                    <motion.article
                        className="review-card"
                        key={review.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.55,
                            delay: index * 0.08,
                        }}
                    >
                        <div className="review-card-top">
                            <div className="review-stars">
                                ★★★★★
                            </div>

                            <div className="review-quote">“</div>
                        </div>

                        <h3>{review.title}</h3>

                        <p>{review.text}</p>

                        <div className="review-bottom">
                            <span className="review-line" />

                            <div className="review-author">
                                <span className="author-initial">
                                    {review.name.charAt(0)}
                                </span>

                                <span>{review.name}</span>

                                <span className="verified">
                                    ✓
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="reviews-bottom-ornament">
                <span />
                <b>✦</b>
                <span />
            </div>
        </section>
    );
}