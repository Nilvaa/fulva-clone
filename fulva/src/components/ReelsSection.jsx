import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Maximize,
    Play,
    Volume2,
    VolumeX,
    X,
} from "lucide-react";
import "./ReelsSection.css";

const reels = [
    {
        id: 1,
        video: "/reels/reel-1.mp4",
    },
    {
        id: 2,
        video: "/reels/reel-2.mp4",
    },
    {
        id: 3,
        video: "/reels/reel-3.mp4",
    },
    {
        id: 4,
        video: "/reels/reel-4.mp4",
    },
    {
        id: 5,
        video: "/reels/reel-5.mp4",
    },
    {
        id: 6,
        video: "/reels/reel-6.mp4",
    }
];

function ReelCard({ reel, index, onOpen }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            {
                threshold: 0.55,
            }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <motion.button
            type="button"
            className="reel-card"
            onClick={() => onOpen(index)}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
            }}
            whileHover={{ y: -8 }}
        >
            <video
                ref={videoRef}
                className="reel-video"
                src={reel.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />

            <div className="reel-overlay" />

            <div className="reel-play">
                <Play size={17} fill="currentColor" />
            </div>

            <div className="reel-bottom">
                <span>WATCH REEL</span>
            </div>
        </motion.button>
    );
}

function ReelViewer({ reels, activeIndex, onClose, onChange }) {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const activeReel = reels[activeIndex];

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        video.currentTime = 0;
        video.muted = muted;

        video.play().catch(() => { });
    }, [activeIndex, muted]);

    const previousReel = () => {
        onChange(
            activeIndex === 0
                ? reels.length - 1
                : activeIndex - 1
        );
    };

    const nextReel = () => {
        onChange(
            activeIndex === reels.length - 1
                ? 0
                : activeIndex + 1
        );
    };

    const toggleMute = () => {
        setMuted((prev) => !prev);
    };

    const enterFullscreen = async () => {
        const video = videoRef.current;

        if (!video) return;

        try {
            if (video.requestFullscreen) {
                await video.requestFullscreen();
            } else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }
        } catch (error) {
            console.log("Fullscreen unavailable:", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                previousReel();
            }

            if (event.key === "ArrowRight") {
                nextReel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <AnimatePresence>
            <motion.div
                className="reel-viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Blurred background */}
                <div
                    className="reel-viewer-backdrop"
                    style={{
                        backgroundImage: `url(${activeReel.video})`,
                    }}
                />

                <div className="reel-viewer-dark" />

                {/* Close */}
                <button
                    type="button"
                    className="viewer-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={22} />
                </button>

                {/* Previous */}
                <button
                    type="button"
                    className="viewer-arrow viewer-arrow-left"
                    onClick={(event) => {
                        event.stopPropagation();
                        previousReel();
                    }}
                    aria-label="Previous reel"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Next */}
                <button
                    type="button"
                    className="viewer-arrow viewer-arrow-right"
                    onClick={(event) => {
                        event.stopPropagation();
                        nextReel();
                    }}
                    aria-label="Next reel"
                >
                    <ArrowRight size={24} />
                </button>

                {/* Main video */}
                <motion.div
                    key={activeReel.id}
                    className="reel-viewer-video-wrap"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={(event) => event.stopPropagation()}
                >
                    <video
                        ref={videoRef}
                        className="reel-viewer-video"
                        src={activeReel.video}
                        autoPlay
                        muted={muted}
                        loop
                        playsInline
                    />

                    {/* Controls */}
                    <div className="viewer-controls">

                        <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={muted ? "Unmute" : "Mute"}
                        >
                            {muted ? (
                                <VolumeX size={21} />
                            ) : (
                                <Volume2 size={21} />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={enterFullscreen}
                            aria-label="Fullscreen"
                        >
                            <Maximize size={21} />
                        </button>

                    </div>

                    {/* Reel counter */}
                    <div className="viewer-counter">
                        {String(activeIndex + 1).padStart(2, "0")}
                        <span>/</span>
                        {String(reels.length).padStart(2, "0")}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function ReelsSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const openReel = (index) => {
        setActiveIndex(index);
        document.body.style.overflow = "hidden";
    };

    const closeReel = () => {
        setActiveIndex(null);
        document.body.style.overflow = "";
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <>
            <section className="reels-section">
                <div className="reels-inner">

                    {/* Header */}
                    <motion.div
                        className="reels-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2>
                            The Halwa <em>Diaries</em>
                        </h2>

                        <p>
                            Real moments, real people, and the joy of sharing
                            authentic Kozhikode halwa.
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="reels-track">

                        {reels.map((reel, index) => (
                            <ReelCard
                                key={reel.id}
                                reel={reel}
                                index={index}
                                onOpen={openReel}
                            />
                        ))}

                        {/* Order Card */}
                        <motion.a
                            href="#"
                            className="reel-order-card"
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: reels.length * 0.08,
                            }}
                            whileHover={{ y: -8 }}
                        >
                            <span className="order-small">
                                TASTE THE TRADITION
                            </span>

                            <h3>
                                ORDER
                                <br />
                                <em>NOW.</em>
                            </h3>

                            <div className="order-arrow">
                                <ArrowRight size={22} />
                            </div>
                        </motion.a>

                    </div>

                    {/* Footer */}
                    <motion.div
                        className="reels-footer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <span>Follow our journey</span>
                        <strong>@fulva.in</strong>
                    </motion.div>

                </div>
            </section>

            {/* FULLSCREEN VIEWER */}
            {activeIndex !== null && (
                <ReelViewer
                    reels={reels}
                    activeIndex={activeIndex}
                    onClose={closeReel}
                    onChange={setActiveIndex}
                />
            )}
        </>
    );
}