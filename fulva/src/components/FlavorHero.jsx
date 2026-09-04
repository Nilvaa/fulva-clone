import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { flavors } from "../data/flavors";

const strawberries = [
    // BACK — very soft, several bleeding off the frame edges
    { top: "-6%", left: "-4%", size: 150, rotate: -15, blur: 7, opacity: 0.32, depth: 1, delay: 0 },
    { top: "1%", left: "31%", size: 135, rotate: 12, blur: 8, opacity: 0.25, depth: 1, delay: 0.6 },
    { top: "-2%", left: "54%", size: 105, rotate: -10, blur: 7, opacity: 0.3, depth: 1, delay: 1 },
    { top: "-4%", left: "88%", size: 160, rotate: 18, blur: 8, opacity: 0.28, depth: 1, delay: 0.3 },
    { top: "8%", left: "68%", size: 90, rotate: -22, blur: 7, opacity: 0.3, depth: 1, delay: 1.2 },
    { top: "40%", left: "42%", size: 80, rotate: 9, blur: 8, opacity: 0.22, depth: 1, delay: 0.5 },
    { top: "45%", left: "6%", size: 100, rotate: -14, blur: 7, opacity: 0.28, depth: 1, delay: 0.9 },
    { top: "88%", left: "44%", size: 95, rotate: 16, blur: 7, opacity: 0.26, depth: 1, delay: 1.4 },

    // MID — recognizable
    { top: "22%", left: "17%", size: 92, rotate: -12, blur: 2, opacity: 0.72, depth: 2, delay: 0.4 },
    { top: "27%", left: "89%", size: 118, rotate: -18, blur: 3, opacity: 0.62, depth: 2, delay: 0.8 },
    { top: "51%", left: "95%", size: 135, rotate: 14, blur: 3, opacity: 0.58, depth: 2, delay: 0.2 },
    { top: "65%", left: "18%", size: 92, rotate: 18, blur: 2, opacity: 0.68, depth: 2, delay: 1 },
    { top: "8%", left: "46%", size: 78, rotate: -8, blur: 2.5, opacity: 0.6, depth: 2, delay: 0.7 },
    { top: "38%", left: "78%", size: 85, rotate: 20, blur: 2, opacity: 0.65, depth: 2, delay: 1.1 },
    { top: "84%", left: "62%", size: 100, rotate: -16, blur: 3, opacity: 0.6, depth: 2, delay: 0.55 },
    { top: "58%", left: "40%", size: 70, rotate: 11, blur: 2.5, opacity: 0.58, depth: 2, delay: 1.3 },

    // FRONT — sharp, large, deliberately cropped by the frame edge for depth
    { top: "28%", left: "-10%", size: 200, rotate: 15, blur: 0, opacity: 1, depth: 3, delay: 0.2 },
    { top: "60%", left: "-8%", size: 165, rotate: -20, blur: 0.3, opacity: 0.98, depth: 3, delay: 0.7 },
    { top: "70%", left: "80%", size: 190, rotate: -15, blur: 0.3, opacity: 1, depth: 3, delay: 0.4 },
    { top: "82%", left: "98%", size: 140, rotate: 22, blur: 0, opacity: 1, depth: 3, delay: 0.9 },
    { top: "2%", left: "8%", size: 130, rotate: -25, blur: 0, opacity: 1, depth: 3, delay: 1.5 },
    { top: "92%", left: "12%", size: 150, rotate: 12, blur: 0.3, opacity: 1, depth: 3, delay: 0.6 },

    // FRONT — extra sharp berries added on the right side
    { top: "6%", left: "92%", size: 150, rotate: -12, blur: 0, opacity: 1, depth: 3, delay: 0.35 },
    { top: "44%", left: "90%", size: 130, rotate: 20, blur: 0.3, opacity: 1, depth: 3, delay: 0.85 },
    { top: "78%", left: "94%", size: 145, rotate: -18, blur: 0, opacity: 1, depth: 3, delay: 1.1 },
    { top: "18%", left: "78%", size: 100, rotate: 10, blur: 0.3, opacity: 0.98, depth: 3, delay: 0.5 },
];

export default function FlavorHero({ current }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 45, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 45, damping: 20 });

    const BASE_ROTATE_Y = -8;
    const BASE_ROTATE_X = 4;

    const productRotateY = useTransform(smoothX, [-1, 1], [BASE_ROTATE_Y - 4, BASE_ROTATE_Y + 4]);
    const productRotateX = useTransform(smoothY, [-1, 1], [BASE_ROTATE_X + 3, BASE_ROTATE_X - 3]);

    const handleMouseMove = (event) => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        mouseX.set((x - 0.5) * 2);
        mouseY.set((y - 0.5) * 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            className="hero-scene"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background glow tints toward the current flavor's color */}
            <motion.div
                className="hero-background-glow"
                animate={{ backgroundColor: current.color }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ opacity: 0.18 }}
            />
            <div className="hero-background-glow-secondary" />

            {/* Decorative fruit field — swaps image set per flavor via current.decorImage */}
            <div className="strawberry-layer">
                <AnimatePresence mode="sync">
                    {strawberries.map((item, i) => (
                        <motion.img
                            key={current.id + "-decor-" + i}
                            src={current.decorImage}
                            alt=""
                            className="floating-strawberry"
                            style={{
                                top: item.top,
                                left: item.left,
                                width: item.size,
                                height: item.size,
                                rotate: `${item.rotate}deg`,
                                zIndex: item.depth,
                                filter: `
                                    blur(${item.blur}px)
                                    saturate(1.12)
                                    contrast(1.08)
                                    drop-shadow(0 16px 22px rgba(91, 24, 38, 0.20))
                                `,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: item.opacity,
                                y: [0, -12, 0],
                                x: [0, 5, 0],
                                rotate: [item.rotate, item.rotate + 4, item.rotate],
                                scale: [1, 1.035, 1],
                            }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}
                            transition={{
                                opacity: { duration: 0.6, delay: item.delay },
                                y: { duration: 5 + i * 0.15, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                                x: { duration: 5 + i * 0.15, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 5 + i * 0.15, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 5 + i * 0.15, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <div className="hero-product-stage">
                <div className="product-floor-shadow" />

                <div style={{ rotateX: productRotateX, rotateY: productRotateY, transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current.id + "-product"}
                            src={current.productImage}
                            alt={current.name}
                            className="product-image"
                            draggable="false"
                            initial={{ opacity: 0, scale: 0.86, y: 45 }}
                            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                            transition={{
                                opacity: { duration: 0.7, ease: "easeOut" },
                                scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                            }}
                        />
                    </AnimatePresence>
                </div>
            </div>

            <div className="color-grade-overlay" />
            <div className="vignette-overlay" />

            <div className="hero-copy">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id + "-copy"}
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <p className="hero-eyebrow">{current.eyebrow}</p>
                        <h1 style={{ color: current.accent }}>
                            {current.name}
                            <span>{current.nameItalic}</span>
                        </h1>
                        <p className="hero-tagline">{current.tagline}</p>

                        <div className="hero-cta-row">
                            <button
                                className="hero-cta-primary"
                                style={{ background: current.accent }}
                            >
                                Buy Now
                            </button>
                            <button
                                className="hero-cta-secondary"
                                style={{ borderColor: current.accent, color: current.accent }}
                            >
                                Explore More
                            </button>
                        </div>

                        <div className="hero-stats-row">
                            <div className="hero-stat">
                                <span className="hero-stat-number" style={{ color: current.accent }}>80K+</span>
                                <span className="hero-stat-label">Happy customers</span>
                            </div>
                            <div className="hero-stat-divider" style={{ background: current.accent, opacity: 0.4 }} />
                            <div className="hero-stat">
                                <span className="hero-stat-number" style={{ color: current.accent }}>{flavors.length}</span>
                                <span className="hero-stat-label">Flavours</span>
                            </div>
                            <div className="hero-stat-divider" style={{ background: current.accent, opacity: 0.4 }} />
                            <div className="hero-stat">
                                <span className="hero-stat-number" style={{ color: current.accent }}>No</span>
                                <span className="hero-stat-label">Maida &amp; Palm oil</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                className="discover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
            >
                <span>DISCOVER</span>
                <div className="discover-line" />
            </motion.div>
        </section>
    );
}