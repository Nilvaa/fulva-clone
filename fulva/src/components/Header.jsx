import { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import logo from "../assets/images/fulva-logo.png";

const navLinks = ["Assorted", "Shop", "Contact Us"];

export default function Header({
    accentColor,
    onShopClick,
    onContactClick,
    onLogoClick,
    onAssortedClick,
    isDark = false,
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const cartCount = 0; // wire up to real cart state later

    const handleLinkClick = (link, closeMenu) => (e) => {
        e.preventDefault();

        if (link === "Shop") onShopClick?.();
        if (link === "Contact" || link === "Contact Us") onContactClick?.();
        if (link === "Assorted") onAssortedClick?.();

        if (closeMenu) setMenuOpen(false);
    };

    return (
        <header className={`site-header ${isDark ? "is-dark" : ""}`}>
            <div className="site-header-inner">
                <img
                    src={logo}
                    alt="Fulva"
                    className="site-logo"
                    onClick={() => onLogoClick?.()}
                    style={{ cursor: "pointer" }}
                />

                <nav className="nav-pill" style={{ "--nav-accent": accentColor }}>
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="nav-pill-link"
                            onClick={handleLinkClick(link, false)}
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                <div className="header-right">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={19} strokeWidth={1.8} />
                    </button>
                    <button className="icon-btn" aria-label="Account">
                        <User size={19} strokeWidth={1.8} />
                    </button>
                    <button className="icon-btn cart-btn" aria-label="Cart">
                        <ShoppingCart size={19} strokeWidth={1.8} />
                        <span className="cart-count">({cartCount})</span>
                    </button>

                    <button className="track-order-btn">Track Order</button>

                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mobile-menu" style={{ "--nav-accent": accentColor }}>
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="mobile-menu-link"
                            onClick={handleLinkClick(link, true)}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}