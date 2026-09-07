import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { flavors } from "../data/flavors";

const placeholderPrice = "₹399";
const placeholderOriginalPrice = "₹499";

/*
 * =========================================================
 * TEMPORARY PRODUCT DETAIL GALLERY
 * =========================================================
 *
 * For now, every ShopPage product will use these four
 * Strawberry images inside ProductDetails.
 *
 * The actual ShopPage card image remains unchanged.
 *
 * Later, you can replace this with each product's
 * real gallery images.
 */
const TEMPORARY_DETAIL_IMAGES = [
    "/products/fulva-strawberry-halwa.png",
    "/products/fulva-strawberry-image-2.webp",
    "/products/fulva-strawberry-image-3.webp",
    "/products/fulva-strawberry-image-4.webp",
];

export default function ShopPage({ onProductClick }) {
    const [addedItems, setAddedItems] = useState({});

    // =========================================================
    // CREATE PRODUCT OBJECT
    // =========================================================

    const createProductObject = (flavor) => {
        return {
            /*
             * -------------------------------------------------
             * BASIC PRODUCT INFORMATION
             * -------------------------------------------------
             */

            id: flavor.id,

            /*
             * ProductDetails uses "name" as the main title.
             *
             * We keep the same flavour name shown on the
             * ShopPage card.
             */
            name: `${flavor.name} Halwa`,

            title: `${flavor.name} Halwa`,

            /*
             * -------------------------------------------------
             * CATEGORY
             * -------------------------------------------------
             */

            category: "PREMIUM COLLECTION",

            type: flavor.name,

            /*
             * -------------------------------------------------
             * PRICE
             * -------------------------------------------------
             *
             * These are your current ShopPage placeholder prices.
             */
            price: placeholderPrice,

            oldPrice: placeholderOriginalPrice,

            discount: "20%",

            pricePerGram: "₹1.99/g",

            /*
             * -------------------------------------------------
             * PRODUCT FACTS
             * -------------------------------------------------
             */

            shelfLife: "30 days shelf life",

            weight: "200g",

            delivery:
                "All India Delivery Within 2 – 5 Business days",

            /*
             * -------------------------------------------------
             * DESCRIPTION
             * -------------------------------------------------
             *
             * Use the same description/tagline that appears
             * on the ShopPage card.
             */
            description:
                flavor.tagline ||
                `${flavor.name} Halwa — authentic Kozhikode halwa handcrafted with care.`,

            /*
             * -------------------------------------------------
             * CARD IMAGE
             * -------------------------------------------------
             *
             * This is the actual image used on the ShopPage.
             *
             * DO NOT replace this with the Strawberry image.
             */
            image: flavor.productImage,

            /*
             * -------------------------------------------------
             * DETAIL PAGE GALLERY
             * -------------------------------------------------
             *
             * TEMPORARY:
             * Every ShopPage product gets the same four
             * Strawberry images in ProductDetails.
             */
            images: TEMPORARY_DETAIL_IMAGES,

            /*
             * -------------------------------------------------
             * COMBO OFFERS
             * -------------------------------------------------
             *
             * Generic offers for now.
             */
            offers: [
                {
                    percentage: "5%",
                    title: "Buy 2 - Get 5% Off",
                    subtitle:
                        "Applicable for 2 different flavours",
                    price: "₹758",
                    oldPrice: "₹798",
                    save: "Save ₹40",
                },

                {
                    percentage: "10%",
                    title: "Buy 3 - Get 10% Off",
                    subtitle:
                        "Applicable for 3 different flavours",
                    price: "₹1,077",
                    oldPrice: "₹1,197",
                    save: "Save ₹120",
                    badge: "MOST POPULAR",
                },

                {
                    percentage: "15%",
                    title: "Buy 4 - Get 15% Off",
                    subtitle:
                        "Applicable for 4 different flavours",
                    price: "₹1,356",
                    oldPrice: "₹1,596",
                    save: "Save ₹240",
                    badge: "GREAT VALUE",
                },
            ],
        };
    };

    // =========================================================
    // OPEN PRODUCT DETAILS
    // =========================================================

    const handleProductClick = (flavor) => {
        if (!onProductClick) return;

        /*
         * Convert the ShopPage flavour object into the
         * complete product object expected by ProductDetails.
         */
        const product = createProductObject(flavor);

        onProductClick(product);
    };

    // =========================================================
    // ADD TO CART
    // =========================================================

    const handleAddToCart = (event, flavorId) => {
        /*
         * Prevent the click from reaching the parent
         * product card.
         *
         * Otherwise clicking "Add to Cart" would also
         * open ProductDetails.
         */
        event.stopPropagation();

        setAddedItems((prev) => ({
            ...prev,
            [flavorId]: true,
        }));

        /*
         * Reset button after 2 seconds.
         */
        setTimeout(() => {
            setAddedItems((prev) => ({
                ...prev,
                [flavorId]: false,
            }));
        }, 2000);
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <section className="shop-page shop-luxury">

            {/* =================================================
                BACKGROUND
                ================================================= */}

            <div className="shop-gold-glow" />

            {/* =================================================
                PAGE HEADER
                ================================================= */}

            <motion.header
                className="shop-page-header"
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
            >
                <p className="shop-eyebrow">
                    THE FULVA COLLECTION
                </p>

                <h1 className="shop-title">
                    Our Halwa <em>Collection</em>
                </h1>

                <div className="shop-title-rule">
                    <span />
                    <i>✦</i>
                    <span />
                </div>

                <p className="shop-subtitle">
                    Handcrafted the traditional Kozhikode way —
                    timeless flavours, slow-set with care.
                </p>
            </motion.header>

            {/* =================================================
                TOOLBAR
                ================================================= */}

            <div className="shop-toolbar">

                <span className="shop-product-count">
                    {flavors.length} FLAVOURS
                </span>

                <div className="shop-filters">

                    <button type="button">
                        Availability <span>⌄</span>
                    </button>

                    <button type="button">
                        Price <span>⌄</span>
                    </button>

                    <button type="button">
                        Sort <span>⌄</span>
                    </button>

                </div>

            </div>

            {/* =================================================
                PRODUCT GRID
                ================================================= */}

            <div className="shop-grid">

                {flavors.map((flavor, index) => {

                    return (
                        <motion.article
                            key={flavor.id}
                            className="shop-card shop-card-clickable"

                            initial={{
                                opacity: 0,
                                y: 30,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            transition={{
                                duration: 0.65,
                                delay: index * 0.08,
                            }}

                            whileHover={{
                                y: -6,
                            }}

                            /*
                             * Clicking anywhere on the card
                             * opens ProductDetails.
                             */
                            onClick={() =>
                                handleProductClick(flavor)
                            }

                            role="button"
                            tabIndex={0}

                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();

                                    handleProductClick(
                                        flavor
                                    );
                                }
                            }}
                        >

                            {/* =================================
                                PRODUCT IMAGE
                                ================================= */}

                            <div
                                className="shop-card-image-area"
                                style={{
                                    "--flavor-color":
                                        flavor.color,
                                }}
                            >

                                <div className="shop-gold-ring" />

                                <span className="shop-card-edition">
                                    FULVA ·{" "}
                                    {String(index + 1).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>

                                <img
                                    src={flavor.productImage}
                                    alt={`${flavor.name} Halwa`}
                                    className="shop-card-image"
                                    loading="lazy"
                                />

                            </div>

                            {/* =================================
                                PRODUCT CONTENT
                                ================================= */}

                            <div className="shop-card-content">

                                <p className="shop-card-kicker">
                                    KOZHIKODE · AUTHENTIC HALWA
                                </p>

                                <h2
                                    className="shop-card-title"
                                    style={{
                                        color: flavor.accent,
                                    }}
                                >
                                    {flavor.name}{" "}

                                    <em>
                                        {flavor.nameItalic}
                                    </em>
                                </h2>

                                <p className="shop-card-description">
                                    {flavor.tagline}
                                </p>

                                <div className="shop-card-line" />

                                {/* =============================
                                    PRICE + CART
                                    ============================= */}

                                <div className="shop-card-bottom">

                                    <div className="shop-price">

                                        <span className="shop-current-price">
                                            {placeholderPrice}
                                        </span>

                                        <span className="shop-original-price">
                                            {placeholderOriginalPrice}
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        className={`shop-add-button ${addedItems[
                                                flavor.id
                                            ]
                                                ? "added"
                                                : ""
                                            }`}
                                        style={{
                                            "--button-color":
                                                flavor.accent,
                                        }}
                                        onClick={(event) =>
                                            handleAddToCart(
                                                event,
                                                flavor.id
                                            )
                                        }
                                    >

                                        <span>
                                            {addedItems[
                                                flavor.id
                                            ]
                                                ? "Added"
                                                : "Add to Cart"}
                                        </span>

                                        <span>
                                            {addedItems[
                                                flavor.id
                                            ]
                                                ? "✓"
                                                : "→"}
                                        </span>

                                    </button>

                                </div>

                            </div>

                        </motion.article>
                    );
                })}

            </div>

        </section>
    );
}