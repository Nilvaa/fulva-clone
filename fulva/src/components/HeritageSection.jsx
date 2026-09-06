import { motion } from "framer-motion";
import "./HeritageSection.css";

const storyImage = "src/assets/images/story-fulva.png";

export default function HeritageSection() {
    return (
        <section className="heritage-section">
            <div className="heritage-container">

                {/* ================= LEFT — STORY IMAGE ================= */}
                <motion.div
                    className="heritage-image-wrap"
                    initial={{ opacity: 0, x: -35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img
                        src={storyImage}
                        alt="The Sweet Story of Fulva"
                        className="heritage-story-image"
                    />
                </motion.div>

                {/* ================= RIGHT — HERITAGE CONTENT ================= */}
                <motion.div
                    className="heritage-content"
                    initial={{ opacity: 0, x: 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >

                    <div className="heritage-eyebrow">
                        <span />
                        OUR HERITAGE
                    </div>

                    <h2 className="heritage-title">
                        A <em>Tradition</em> Worth Protecting
                    </h2>

                    <p className="heritage-description">
                        Calicut has been making halwa for over a century. The narrow
                        lanes of Kozhikode carry the scent of ghee and sugar — and
                        generations of craftspeople who have kept this art alive.
                    </p>

                    <div className="heritage-quote">
                        <p>
                            "We started Fulva to make sure that tradition travels —
                            from the streets of Kozhikode to your home, anywhere in India."
                        </p>
                    </div>

                    <p className="heritage-description heritage-description-bottom">
                        Today we work directly with the halwa makers of Calicut,
                        ensuring every piece you receive is authentic, fresh, and
                        made with the same love it always was.
                    </p>

                    <button className="heritage-story-button">
                        <span>Read Our Full Story</span>
                        <span className="heritage-arrow">→</span>
                    </button>

                </motion.div>

            </div>
        </section>
    );
}