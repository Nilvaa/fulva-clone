import { useEffect, useState } from "react";
import "./ProductDetails.css";

/* =========================================================
   TEMPORARY GALLERY FALLBACKS

   ShopPage:
   All ShopPage products temporarily use the Strawberry
   product gallery.

   PopularProducts:
   All PopularProducts products can temporarily use the
   24 Premium image.

   The actual product content still comes from the clicked
   product object.
   ========================================================= */

const STRAWBERRY_GALLERY = [
    "/products/fulva-strawberry-halwa.png",
    "/products/fulva-strawberry-image-2.webp",
    "/products/fulva-strawberry-image-3.webp",
    "/products/fulva-strawberry-image-4.webp",
];

const PREMIUM_24_GALLERY = [
    "/products/24-premium.webp",
];

/* =========================================================
   ICONS
   ========================================================= */

function ArrowLeft() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M19 12H5M11 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowRight() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                cx="18"
                cy="5"
                r="2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <circle
                cx="6"
                cy="12"
                r="2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <circle
                cx="18"
                cy="19"
                r="2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <path
                d="M8 11l8-5M8 13l8 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L20 9H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx="10"
                cy="20"
                r="1.3"
                fill="currentColor"
            />

            <circle
                cx="17"
                cy="20"
                r="1.3"
                fill="currentColor"
            />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            <circle
                cx="7"
                cy="18"
                r="1.7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <circle
                cx="18"
                cy="18"
                r="1.7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 3l7 3v5c0 4.7-2.8 8.1-7 10-4.2-1.9-7-5.3-7-10V6l7-3z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <path
                d="M9 12l2 2 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function LeafIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M19 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 9-6 9-15z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <path
                d="M5 19c2-4 5-6 9-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function PeopleIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
                cx="9"
                cy="8"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <circle
                cx="17"
                cy="9"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <path
                d="M3.5 19c.7-3.2 2.5-5 5.5-5s4.8 1.8 5.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <path
                d="M15 14c2.8 0 4.7 1.6 5.3 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* =========================================================
   PRODUCT DETAILS COMPONENT
   ========================================================= */

export default function ProductDetails({
    product,
    onBack,
}) {
    /* =====================================================
       PRODUCT SAFETY / DEFAULTS
       ===================================================== */

    const safeProduct = product || null;

    /*
     * Determine which temporary gallery to use.

     * ShopPage products:
       → Strawberry gallery

     * PopularProducts products:
       → 24 Premium image

     * If the clicked product already provides a gallery,
       that gallery takes priority.
     */

    const galleryImages =
        safeProduct?.images?.length
            ? safeProduct.images
            : safeProduct?.source === "shop"
                ? STRAWBERRY_GALLERY
                : safeProduct?.source === "popular"
                    ? PREMIUM_24_GALLERY
                    : safeProduct?.image
                        ? [safeProduct.image]
                        : [];

    const offers = Array.isArray(safeProduct?.offers)
        ? safeProduct.offers
        : [];

    /* =====================================================
       STATE
       ===================================================== */

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    /* =====================================================
       RESET WHEN PRODUCT CHANGES
       ===================================================== */

    useEffect(() => {
        setActiveImage(0);
        setQuantity(1);
    }, [safeProduct?.id]);

    /* =====================================================
       PRODUCT NOT FOUND
       ===================================================== */

    if (!safeProduct) {
        return (
            <section className="product-details-page">
                <div className="product-details-error">
                    <p className="product-category">
                        <span>✦</span>
                        <span>FULVA COLLECTION</span>
                    </p>

                    <h1>Product not found</h1>

                    <button
                        type="button"
                        onClick={onBack}
                    >
                        ← Back to Collection
                    </button>
                </div>
            </section>
        );
    }

    /* =====================================================
       PRODUCT VALUES
       ===================================================== */

    const productName =
        safeProduct.name ||
        safeProduct.title ||
        "Fulva Halwa";

    const productCategory =
        safeProduct.category ||
        "PREMIUM COLLECTION";

    const productType =
        safeProduct.type ||
        "Kozhikoden Halwa";

    const productPrice =
        safeProduct.price ||
        "₹399";

    const productOldPrice =
        safeProduct.oldPrice ||
        "";

    const productDiscount =
        safeProduct.discount ||
        "";

    const productPricePerGram =
        safeProduct.pricePerGram ||
        "";

    const productShelfLife =
        safeProduct.shelfLife ||
        "Premium freshness";

    const productWeight =
        safeProduct.weight ||
        "";

    const productDelivery =
        safeProduct.delivery ||
        "All India Delivery Within 2 – 5 Business days";

    const productDescription =
        safeProduct.description ||
        "Authentic Kozhikoden Halwa, handcrafted with traditional recipes and premium ingredients.";

    /* =====================================================
       CAROUSEL CONTROLS
       ===================================================== */

    const goPrevious = () => {
        if (galleryImages.length <= 1) return;

        setActiveImage((current) =>
            current === 0
                ? galleryImages.length - 1
                : current - 1
        );
    };

    const goNext = () => {
        if (galleryImages.length <= 1) return;

        setActiveImage((current) =>
            current === galleryImages.length - 1
                ? 0
                : current + 1
        );
    };

    /* =====================================================
       SHARE
       ===================================================== */

    const handleShare = async () => {
        const shareData = {
            title: productName,
            text: `Discover ${productName} at Fulva.`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    window.location.href
                );
            }
        } catch {
            // User cancelled sharing.
        }
    };

    /* =====================================================
       ADD TO CART
       ===================================================== */

    const handleAddToCart = () => {
        /*
         * Cart functionality can be connected later.
         * For now this safely keeps the button functional.
         */
        console.log(
            "Added to cart:",
            productName,
            "Quantity:",
            quantity
        );
    };

    /* =====================================================
       BUY NOW
       ===================================================== */

    const handleBuyNow = () => {
        /*
         * Checkout functionality can be connected later.
         */
        console.log(
            "Buy now:",
            productName,
            "Quantity:",
            quantity
        );
    };

    /* =====================================================
       RENDER
       ===================================================== */

    return (
        <main className="product-details-page">

            {/* =================================================
                BACKGROUND ATMOSPHERE
                ================================================= */}

            <div className="product-bg-glow product-bg-glow-one" />
            <div className="product-bg-glow product-bg-glow-two" />

            <div className="product-details-container">

                {/* =================================================
                    BACK TO COLLECTION
                    ================================================= */}

                <button
                    type="button"
                    className="product-back-button"
                    onClick={onBack}
                >
                    <span>←</span>
                    <span>Back to Collection</span>
                </button>

                {/* =================================================
                    MAIN PRODUCT AREA
                    ================================================= */}

                <div className="product-details-layout">

                    {/* =================================================
                        LEFT — PRODUCT CAROUSEL
                        ================================================= */}

                    <section className="product-gallery">

                        <div className="product-gallery-layout">

                            {/* =================================================
                                THUMBNAILS
                                ================================================= */}

                            <div className="product-thumbnails">

                                {galleryImages.length > 0 &&
                                    galleryImages.map(
                                        (image, index) => (
                                            <button
                                                type="button"
                                                key={`${image}-${index}`}
                                                className={`product-thumbnail ${activeImage === index
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                                aria-label={`View product image ${index + 1
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${productName} ${index + 1
                                                        }`}
                                                />
                                            </button>
                                        )
                                    )}

                                {galleryImages.length > 1 && (
                                    <button
                                        type="button"
                                        className="thumbnail-scroll-button"
                                        onClick={goNext}
                                        aria-label="Next image"
                                    >
                                        ↓
                                    </button>
                                )}

                            </div>

                            {/* =================================================
                                MAIN IMAGE
                                ================================================= */}

                            <div className="product-main-gallery">

                                <div className="product-main-image-frame">

                                    {galleryImages.length > 0 ? (
                                        <img
                                            key={
                                                galleryImages[
                                                activeImage
                                                ]
                                            }
                                            src={
                                                galleryImages[
                                                activeImage
                                                ]
                                            }
                                            alt={productName}
                                            className="product-main-image"
                                        />
                                    ) : (
                                        <div className="product-main-image-placeholder">
                                            <span>FULVA</span>
                                        </div>
                                    )}

                                    <div className="product-image-overlay" />

                                    {/* Gold corners */}

                                    <span className="image-corner image-corner-tl" />
                                    <span className="image-corner image-corner-tr" />
                                    <span className="image-corner image-corner-bl" />
                                    <span className="image-corner image-corner-br" />

                                    {/* =================================================
                                        PREVIOUS
                                        ================================================= */}

                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-left"
                                            onClick={goPrevious}
                                            aria-label="Previous image"
                                        >
                                            <ArrowLeft />
                                        </button>
                                    )}

                                    {/* =================================================
                                        NEXT
                                        ================================================= */}

                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-right"
                                            onClick={goNext}
                                            aria-label="Next image"
                                        >
                                            <ArrowRight />
                                        </button>
                                    )}

                                    {/* =================================================
                                        IMAGE COUNTER
                                        ================================================= */}

                                    <div className="gallery-counter">
                                        <span>
                                            {galleryImages.length > 0
                                                ? activeImage + 1
                                                : 0}
                                        </span>

                                        <i>/</i>

                                        <span>
                                            {galleryImages.length}
                                        </span>
                                    </div>

                                    {/* =================================================
                                        PROGRESS
                                        ================================================= */}

                                    {galleryImages.length > 1 && (
                                        <div className="gallery-progress">
                                            <span
                                                style={{
                                                    width: `${((activeImage + 1) /
                                                        galleryImages.length) *
                                                        100
                                                        }%`,
                                                }}
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Gallery caption */}

                        <div className="product-gallery-caption">
                            <span>FULVA</span>

                            <span>
                                AUTHENTIC CALICUT HALWA
                            </span>
                        </div>

                    </section>

                    {/* =================================================
                        RIGHT — PRODUCT INFORMATION
                        ================================================= */}

                    <section className="product-information">

                        {/* =================================================
                            CATEGORY
                            ================================================= */}

                        <div className="product-category">
                            <span>✦</span>

                            <span>
                                {productCategory}
                            </span>
                        </div>

                        {/* =================================================
                            PRODUCT NAME
                            ================================================= */}

                        <h1 className="product-detail-title">
                            {productName}
                        </h1>

                        {/* =================================================
                            PRODUCT TYPE
                            ================================================= */}

                        <div className="product-type">
                            <span>•</span>

                            <strong>
                                {productType}
                            </strong>
                        </div>

                        {/* =================================================
                            PRICE + SHARE
                            ================================================= */}

                        <div className="product-price-section">

                            <div>
                                <div className="product-price-row">

                                    <span className="product-current-price">
                                        {productPrice}
                                    </span>

                                    {productOldPrice && (
                                        <span className="product-old-price">
                                            {productOldPrice}
                                        </span>
                                    )}

                                    {productDiscount && (
                                        <span className="product-save-badge">
                                            SAVE {productDiscount}
                                        </span>
                                    )}

                                </div>

                                {productPricePerGram && (
                                    <div className="product-price-per-gram">
                                        {productPricePerGram}
                                    </div>
                                )}

                            </div>

                            <button
                                type="button"
                                className="product-share-button"
                                onClick={handleShare}
                            >
                                <ShareIcon />

                                <span>
                                    Share
                                </span>
                            </button>

                        </div>

                        {/* =================================================
                            TAX NOTE
                            ================================================= */}

                        <p className="product-tax-note">
                            Inclusive of all taxes · Free delivery on
                            orders above ₹499
                        </p>

                        {/* =================================================
                            PRODUCT FACTS
                            ================================================= */}

                        <div className="product-facts">

                            <span>
                                {productShelfLife}
                            </span>

                            {productWeight && (
                                <span>
                                    {productWeight}
                                </span>
                            )}

                            <span>
                                {productDelivery}
                            </span>

                        </div>

                        {/* =================================================
                            DIVIDER
                            ================================================= */}

                        <div className="product-divider">
                            <span>◆</span>
                        </div>

                        {/* =================================================
                            DESCRIPTION
                            ================================================= */}

                        <p className="product-description-line">
                            {productDescription}
                        </p>

                        {/* =================================================
                            COMBO OFFERS
                            ================================================= */}

                        {offers.length > 0 && (
                            <div className="product-offers">

                                {offers.map(
                                    (offer, index) => (
                                        <div
                                            className={`product-offer ${index === 2
                                                ? "featured-offer"
                                                : ""
                                                }`}
                                            key={
                                                offer.title ||
                                                `offer-${index}`
                                            }
                                        >

                                            {/* Percentage */}

                                            {offer.percentage && (
                                                <div className="offer-percent">
                                                    {offer.percentage}
                                                </div>
                                            )}

                                            {/* Offer text */}

                                            <div className="offer-content">

                                                <strong>
                                                    {offer.title}
                                                </strong>

                                                {offer.subtitle && (
                                                    <small>
                                                        {offer.subtitle}
                                                    </small>
                                                )}

                                            </div>

                                            {/* Badge */}

                                            {offer.badge && (
                                                <span
                                                    className={`offer-badge ${offer.badge ===
                                                        "GREAT VALUE"
                                                        ? "blue"
                                                        : ""
                                                        }`}
                                                >
                                                    {offer.badge}
                                                </span>
                                            )}

                                            {/* Price */}

                                            {(offer.price ||
                                                offer.oldPrice) && (
                                                    <div className="offer-price">

                                                        {offer.price && (
                                                            <strong>
                                                                {offer.price}
                                                            </strong>
                                                        )}

                                                        {offer.oldPrice && (
                                                            <del>
                                                                {offer.oldPrice}
                                                            </del>
                                                        )}

                                                    </div>
                                                )}

                                            {/* Save */}

                                            {offer.save && (
                                                <button
                                                    type="button"
                                                    className="offer-save"
                                                >
                                                    {offer.save}
                                                </button>
                                            )}

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                        {/* =================================================
                            COMBO NOTE
                            ================================================= */}

                        {offers.length > 0 && (
                            <p className="combo-note">
                                Mix any flavours you like —{" "}
                                <strong>
                                    same discounts apply automatically!
                                </strong>
                            </p>
                        )}

                        {/* =================================================
                            BUILD COMBO
                            ================================================= */}

                        <button
                            type="button"
                            className="build-combo-button"
                        >
                            <span>＋</span>

                            <strong>
                                Build Your Own Combo
                            </strong>
                        </button>

                        {/* =================================================
                            ADD TO CART
                            ================================================= */}

                        <button
                            type="button"
                            className="detail-add-cart"
                            onClick={handleAddToCart}
                        >
                            <CartIcon />

                            <span>
                                Add to cart
                            </span>
                        </button>

                        {/* =================================================
                            OR
                            ================================================= */}

                        <div className="detail-or">
                            <span />

                            <em>
                                Or
                            </em>

                            <span />
                        </div>

                        {/* =================================================
                            BUY NOW
                            ================================================= */}

                        <div className="detail-buy-row">

                            <div className="detail-quantity">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(
                                            Math.max(
                                                1,
                                                quantity - 1
                                            )
                                        )
                                    }
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>

                                <span>
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(
                                            quantity + 1
                                        )
                                    }
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                type="button"
                                className="detail-buy-button"
                                onClick={handleBuyNow}
                            >
                                <strong>
                                    Buy It Now
                                </strong>

                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                    </section>

                </div>

                {/* =================================================
                    TRUST / SERVICE STRIP
                    ================================================= */}

                <section className="product-trust-strip">

                    {/* Delivery */}

                    <div className="product-trust-item">

                        <TruckIcon />

                        <div>
                            <strong>
                                All India Delivery
                            </strong>

                            <span>
                                2–5 Business Days
                            </span>
                        </div>

                    </div>

                    {/* Secure payment */}

                    <div className="product-trust-item">

                        <ShieldIcon />

                        <div>
                            <strong>
                                Secure Payments
                            </strong>

                            <span>
                                100% Safe & Secure
                            </span>
                        </div>

                    </div>

                    {/* Quality */}

                    <div className="product-trust-item">

                        <LeafIcon />

                        <div>
                            <strong>
                                Premium Quality
                            </strong>

                            <span>
                                Authentic Kozhikode Taste
                            </span>
                        </div>

                    </div>

                    {/* Customers */}

                    <div className="product-trust-item">

                        <PeopleIcon />

                        <div>
                            <strong>
                                Trusted by 80,000+
                            </strong>

                            <span>
                                Happy Customers
                            </span>
                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}