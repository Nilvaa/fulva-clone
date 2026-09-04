import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import "./ReelsSection.css";

const reels = [
    {
        id: 1,
        url: "PASTE_REEL_URL_1_HERE",
    },
    {
        id: 2,
        url: "PASTE_REEL_URL_2_HERE",
    },
    {
        id: 3,
        url: "PASTE_REEL_URL_3_HERE",
    },
    {
        id: 4,
        url: "PASTE_REEL_URL_4_HERE",
    },
    {
        id: 5,
        url: "PASTE_REEL_URL_5_HERE",
    },
];

export default function ReelsSection() {
    return (
        <section className="reels-section">
            <div className="reels-inner">

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

                <div className="reels-track">

                    {reels.map((reel, index) => (
                        <motion.a
                            key={reel.id}
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reel-card"
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                            }}
                            whileHover={{ y: -8 }}
                        >

                            <div className="reel-placeholder">
                                <div className="reel-placeholder-content">

                                    <div className="reel-play">
                                        <Play size={17} fill="currentColor" />
                                    </div>

                                    <span>VIEW ON INSTAGRAM</span>

                                </div>
                            </div>

                            <div className="reel-overlay" />

                            <div className="reel-top">
                                <div className="reel-instagram">
                                    <span className="instagram-icon">◎</span>
                                    <span>@fulva.in</span>
                                </div>

                                <ArrowUpRight size={18} />
                            </div>

                            <div className="reel-bottom">
                                <span>WATCH REEL</span>
                            </div>

                        </motion.a>
                    ))}

                    <motion.a
                        href="#"
                        className="reel-order-card"
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
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
                            <ArrowUpRight size={22} />
                        </div>
                    </motion.a>

                </div>

                <motion.div
                    className="reels-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="instagram-icon">◎</span>
                    <span>Follow our journey</span>
                    <strong>@fulva.in</strong>
                </motion.div>

            </div>
        </section>
    );
}