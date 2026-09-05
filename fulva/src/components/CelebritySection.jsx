import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./CelebritySection.css";

const celebrities = [
    {
        id: "ashish",
        name: "Ashish Vidyarthi",
        role: "ACTOR",
        photo: "/featured/ashish.jpeg",
        reel: "/reels/reel-ashish.mp4",
    },
    {
        id: "govind",
        name: "Govind Padmasoorya",
        role: "ACTOR",
        photo: "/featured/govind.jpeg",
        reel: "/reels/reel-govind.mp4",
    },
    {
        id: "pakru",
        name: "Guinness Pakru",
        role: "ACTOR",
        photo: "/featured/pakru.jpeg",
        reel: "/reels/reel-pakru.mp4",
    },
    {
        id: "sithara",
        name: "Sithara",
        role: "SINGER",
        photo: "/featured/sithara.jpeg",
        reel: "/reels/reel-sithara.mp4",
    },
];

export default function CelebritySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    const videoRefs = useRef({});

    const activeCelebrity = celebrities[activeIndex];

    // Responsive window resize tracking for smooth card offsets
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextCelebrity = () => {
        setActiveIndex((prev) => (prev + 1) % celebrities.length);
    };

    const previousCelebrity = () => {
        setActiveIndex(
            (prev) => (prev - 1 + celebrities.length) % celebrities.length
        );
    };

    /*
     * Play only the active reel.
     */
    useEffect(() => {
        Object.entries(videoRefs.current).forEach(([id, video]) => {
            if (!video) return;

            const celebrityIndex = celebrities.findIndex(
                (celebrity) => celebrity.id === id
            );

            if (celebrityIndex === activeIndex) {
                video.currentTime = 0;
                const promise = video.play();
                if (promise !== undefined) {
                    promise.catch(() => { });
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex]);

    /*
     * Five visual positions:
     * -2 = far left
     * -1 = left
     *  0 = center (active)
     * +1 = right
     * +2 = far right
     */
    const reelSlots = [-2, -1, 0, 1, 2].map((position) => {
        const index =
            (activeIndex + position + celebrities.length) % celebrities.length;

        return {
            position,
            celebrity: celebrities[index],
            index,
        };
    });

    // Dynamic horizontal offset per breakpoint so side cards are always visible
    const cardOffset =
        windowWidth < 480
            ? 85
            : windowWidth < 768
                ? 120
                : windowWidth < 1200
                    ? 160
                    : 190;

    return (
        <section className="celebrity-section">
            {/* Atmospheric background */}
            <div className="celebrity-bg-glow celebrity-bg-glow-left" />
            <div className="celebrity-bg-glow celebrity-bg-glow-right" />
            <div className="celebrity-bg-glow celebrity-bg-glow-center" />

            <div className="celebrity-inner">
                {/* =====================================
                    HEADER
                ===================================== */}
                <motion.div
                    className="celebrity-heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="celebrity-eyebrow">
                        <span />
                        CELEBRATED BY
                        <span />
                    </div>

                    <h2>
                        Loved by <em>Icons</em>
                    </h2>

                    <p>
                        From screen legends to celebrated artists, Fulva has found
                        its way into moments worth remembering.
                    </p>
                </motion.div>

                {/* =====================================
                    CELEBRITY SELECTOR
                ===================================== */}
                <div className="celebrity-selector-wrap">
                    <div className="celebrity-selector">
                        {celebrities.map((celebrity, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <motion.button
                                    key={celebrity.id}
                                    type="button"
                                    className={`celebrity-person ${isActive ? "active" : ""
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`View ${celebrity.name}`}
                                    animate={{
                                        y: isActive ? -6 : 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <div className="celebrity-photo-wrap">
                                        <img
                                            src={celebrity.photo}
                                            alt={celebrity.name}
                                        />
                                        {isActive && (
                                            <span className="celebrity-photo-ring" />
                                        )}
                                    </div>

                                    <div className="celebrity-role">
                                        <span>✦</span>
                                        {celebrity.role}
                                    </div>

                                    <div className="celebrity-name">
                                        {celebrity.name}
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            className="celebrity-active-dot"
                                            layoutId="activeDot"
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Small Gold Downward Connector */}
                    <div className="celebrity-connector-arrow">
                        <span>↓</span>
                    </div>
                </div>

                {/* =====================================
                    REEL CAROUSEL STAGE
                ===================================== */}
                <div className="celebrity-reel-area">
                    {/* LEFT ARROW */}
                    <button
                        type="button"
                        className="celebrity-arrow celebrity-arrow-left"
                        onClick={previousCelebrity}
                        aria-label="Previous celebrity"
                    >
                        <span>←</span>
                    </button>

                    {/* REEL STAGE */}
                    <div className="celebrity-reel-stage">
                        {reelSlots.map(({ position, celebrity }) => {
                            const isActive = position === 0;
                            const isNearSide =
                                position === -1 || position === 1;

                            return (
                                <motion.div
                                    key={`${celebrity.id}-${position}`}
                                    className={`celebrity-reel-card ${isActive ? "active" : "side"
                                        } position-${position}`}
                                    initial={false}
                                    animate={{
                                        x: position * cardOffset,
                                        scale: isActive
                                            ? 1
                                            : isNearSide
                                                ? 0.84
                                                : 0.7,
                                        opacity: isActive
                                            ? 1
                                            : isNearSide
                                                ? 0.52
                                                : 0.22,
                                        filter: isActive
                                            ? "blur(0px)"
                                            : isNearSide
                                                ? "blur(2px)"
                                                : "blur(5px)",
                                        zIndex: isActive
                                            ? 10
                                            : isNearSide
                                                ? 5
                                                : 2,
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <video
                                        ref={(el) => {
                                            if (el) {
                                                videoRefs.current[
                                                    celebrity.id
                                                ] = el;
                                            }
                                        }}
                                        src={celebrity.reel}
                                        muted
                                        playsInline
                                        loop
                                        preload="metadata"
                                    />

                                    {/* Dark overlay on side cards */}
                                    <div className="celebrity-reel-overlay" />

                                    {/* Gold border for active card */}
                                    {isActive && (
                                        <div className="celebrity-active-border" />
                                    )}

                                    {/* Play icon for side reels */}
                                    {!isActive && (
                                        <div className="celebrity-side-play">
                                            ▶
                                        </div>
                                    )}

                                    {/* Active reel information */}
                                    {isActive && (
                                        <motion.div
                                            className="celebrity-reel-label"
                                            initial={{
                                                opacity: 0,
                                                y: 12,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: 0.15,
                                                duration: 0.35,
                                            }}
                                        >
                                            <span>FEATURED MOMENT</span>
                                            <strong>{celebrity.name}</strong>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT ARROW */}
                    <button
                        type="button"
                        className="celebrity-arrow celebrity-arrow-right"
                        onClick={nextCelebrity}
                        aria-label="Next celebrity"
                    >
                        <span>→</span>
                    </button>
                </div>

                {/* =====================================
                    BOTTOM INFORMATION
                ===================================== */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCelebrity.id}
                        className="celebrity-active-info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="celebrity-counter">
                            {String(activeIndex + 1).padStart(2, "0")}
                            {" / "}
                            {String(celebrities.length).padStart(2, "0")}
                        </span>

                        <span className="celebrity-info-line" />

                        <span className="celebrity-info-text">
                            A MOMENT WITH FULVA
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}