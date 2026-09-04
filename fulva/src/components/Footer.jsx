export default function Footer() {
    return (
        <footer className="fulva-footer">
            <div className="footer-inner">

                {/* BRAND */}
                <div className="footer-brand">
                    <a href="/" className="footer-logo">
                        fulva<span>.</span>
                    </a>

                    <p className="footer-description">
                        Authentic halwa, crafted with tradition
                        <br />
                        and delivered fresh to your door.
                    </p>

                    <p className="footer-fssai">
                        FSSAI Lic. No. 11324999000545
                    </p>

                    <p className="footer-copyright">
                        © 2026 Calicut Cousins Private Limited
                    </p>
                </div>


                {/* SHOP */}
                <div className="footer-column">
                    <h3>SHOP</h3>

                    <a href="#">Assorted</a>
                    <a href="#">Corporate Gifting</a>
                    <a href="#">Seasonal Specials</a>
                    <a href="#">Offer Zone</a>
                    <a href="#">Regional Halwas</a>
                </div>


                {/* HELP */}
                <div className="footer-column">
                    <h3>HELP</h3>

                    <a href="#">Privacy Policy</a>
                    <a href="#">Return & Refunds</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Shipping Policy</a>
                    <a href="#" onClick={() => window.scrollTo(0, 0)}>
                        Contact Us
                    </a>
                </div>


                {/* LINKS */}
                <div className="footer-column">
                    <h3>LINKS</h3>

                    <a href="/">Home</a>
                    <a href="#">Shop</a>
                    <a href="#">Our Story</a>
                    <a href="#">Gifting</a>

                    <div className="footer-socials">

                        <a href="#" aria-label="Instagram">
                            ◎
                        </a>

                        <a href="#" aria-label="Facebook">
                            f
                        </a>

                        <a href="#" aria-label="YouTube">
                            ▶
                        </a>

                        <a href="#" aria-label="X">
                            𝕏
                        </a>

                    </div>
                </div>

            </div>


            {/* BOTTOM */}
            <div className="footer-bottom">
                <span>
                    Made with tradition in Kozhikode
                </span>

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    Back to top ↑
                </a>
            </div>

        </footer>
    );
}