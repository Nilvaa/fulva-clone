import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Contact() {
    return (
        <div className="contact-page">

            <div className="contact-glow contact-glow-one" />
            <div className="contact-glow contact-glow-two" />

            <main className="contact-main">

                {/* BACK */}
                <motion.a
                    href="/"
                    className="contact-back"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    ←
                    <span>Back to Home</span>
                </motion.a>


                <div className="contact-layout">

                    {/* ================= LEFT ================= */}

                    <motion.section
                        className="contact-form-section"
                        initial={{ opacity: 0, x: -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                    >

                        <div className="contact-eyebrow">
                            <span />
                            LET'S TALK
                        </div>


                        <h1 className="contact-title">
                            Send Us
                            <br />
                            <em>A Message</em>
                        </h1>


                        <p className="contact-description">
                            Have a question about our halwa, an order,
                            or something else? We'd love to hear from you.
                        </p>


                        <form
                            className="contact-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thank you! Your message has been received.");
                            }}
                        >

                            <div className="contact-input-row">

                                <div className="contact-field">
                                    <label htmlFor="name">
                                        Your Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                </div>


                                <div className="contact-field">
                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>

                            </div>


                            <div className="contact-field">

                                <label htmlFor="subject">
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="What can we help you with?"
                                />

                            </div>


                            <div className="contact-field">

                                <label htmlFor="message">
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="Write your message..."
                                />

                            </div>


                            <button
                                type="submit"
                                className="contact-submit"
                            >
                                <span>
                                    Send Message
                                </span>

                                <span className="send-arrow">
                                    →
                                </span>
                            </button>

                        </form>


                        <div className="contact-or">

                            <span />

                            <p>or</p>

                            <span />

                        </div>


                        <a
                            href="https://wa.me/919544200157"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-whatsapp"
                        >
                            <span className="whatsapp-symbol">
                                ◉
                            </span>

                            <span>
                                Chat with us
                            </span>
                        </a>

                    </motion.section>



                    {/* ================= RIGHT ================= */}

                    <motion.section
                        className="contact-info-section"
                        initial={{ opacity: 0, x: 35 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.15,
                            ease: "easeOut",
                        }}
                    >

                        <div className="contact-info-heading">

                            <p>
                                WE'RE HERE FOR YOU
                            </p>

                            <h2>
                                Let's connect.
                            </h2>

                        </div>



                        {/* ADDRESS */}

                        <motion.div
                            className="contact-info-card"
                            whileHover={{ y: -5 }}
                        >

                            <div className="contact-icon">
                                ⌖
                            </div>

                            <div>

                                <h3>
                                    Visit Us
                                </h3>

                                <p>
                                    Calicut Cousins Pvt Ltd,
                                    <br />
                                    35/408 A, Kotharthode,
                                    <br />
                                    Karuvanthuruthy, Feroke,
                                    <br />
                                    Kozhikode, Kerala, India
                                </p>

                            </div>

                        </motion.div>



                        {/* PHONE */}

                        <motion.div
                            className="contact-info-card"
                            whileHover={{ y: -5 }}
                        >

                            <div className="contact-icon">
                                ☎
                            </div>

                            <div>

                                <h3>
                                    Call Us
                                </h3>

                                <p>
                                    Feel free to reach us for
                                    <br />
                                    any assistance.
                                </p>

                                <a href="tel:+919544200157">
                                    +91 95442 00157
                                </a>

                            </div>

                        </motion.div>



                        {/* EMAIL */}

                        <motion.div
                            className="contact-info-card"
                            whileHover={{ y: -5 }}
                        >

                            <div className="contact-icon">
                                ✉
                            </div>

                            <div>

                                <h3>
                                    Email Us
                                </h3>

                                <p>
                                    For feedback, suggestions
                                    <br />
                                    or any assistance, get in touch.
                                </p>

                                <a href="mailto:care@fulva.in">
                                    care@fulva.in
                                </a>

                            </div>

                        </motion.div>

                    </motion.section>

                </div>

            </main>


            <Footer />

        </div>
    );
}