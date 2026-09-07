import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ShoppingBag,
    Share2,
    Truck,
    ShieldCheck,
    Leaf,
    Users,
    Plus,
    Minus,
    X,
} from "lucide-react";
import "./ProductDetails.css";

/* =========================================================
   SHARED PRODUCT DETAIL IMAGES
   ========================================================= */

const SHARED_DETAIL_IMAGES = [
    "/products/pdt-1.webp",
    "/products/pdt1-image-2.webp",
    "/products/pdt1-image-3.webp",
    "/products/pdt1-image-4.webp",
];

/* =========================================================
   PRODUCT STORY IMAGES

   Same images for every product for now.
   We can make these product-specific later.
   ========================================================= */

const STORY_IMAGES = [
    "/products/Strawberry_halwa-scroll-img-1.webp",
    "/products/Strawberry_halwa-scroll-img-2.webp",
    "/products/Strawberry_halwa-scroll-img-3.webp",
    "/products/Strawberry_halwa-scroll-img-4.webp",
];

/* =========================================================
   DEFAULT FAQ CONTENT
   ========================================================= */

const DEFAULT_FAQS = [
    {
        title: "FULVA PROMISE",
        content: [
            "No Maida",
            "No Palm Oil",
            "No added preservatives",
            "Vegetarian",
        ],
    },
    {
        title: "WHAT MAKES THIS HALWA SPECIAL",
        content: [
            "Soft, smooth & chewy texture",
            "Authentic Kozhikoden halwa experience",
            "Made with carefully selected ingredients",
            "Rich, indulgent flavour",
            "Consistent taste in every batch",
            "Perfect for gifting & celebrations",
        ],
    },
    {
        title: "INGREDIENTS",
        content: [
            "Cornflour, Water, Sugar, Sunflower Oil and selected flavour ingredients.",
            "Contains permitted food flavouring and colouring substances where applicable.",
            "This food item contains corn flour & nuts.",
        ],
    },
    {
        title: "SHIPPING",
        content: [
            "We ship to every corner of India.",
            "Orders are processed and dispatched within 1–2 working days.",
            "Orders typically reach you in 2–5 working days after dispatch depending on your location.",
            "Free delivery on orders above ₹499.",
            "For orders below ₹499, standard shipping charges may apply at checkout.",
            "International delivery is available. Timelines and charges depend on the destination.",
            "Once your order is shipped, you will receive a tracking link by email or WhatsApp.",
            "All products are freshly made and carefully packed.",
        ],
    },
];

/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

export default function ProductDetails({
    product,
    onBack,
}) {
    /* =======================================================
       STATE
       ======================================================= */

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [openFaq, setOpenFaq] = useState(null);
    const [toastVisible, setToastVisible] = useState(true);

    /* =======================================================
       PRODUCT FALLBACK
       ======================================================= */

    if (!product) {
        return (
            <main className="product-details-page">
                <div className="product-details-error">
                    <p>Product not found.</p>

                    <button
                        type="button"
                        onClick={onBack}
                    >
                        <ArrowLeft size={17} />
                        Back to Collection
                    </button>
                </div>
            </main>
        );
    }

    /* =======================================================
       PRODUCT VALUES
       ======================================================= */

    const productName =
        product.name ||
        product.title ||
        "Fulva Halwa";

    const productCategory =
        product.category ||
        "PREMIUM COLLECTION";

    const productType =
        product.type ||
        "Kozhikoden Halwa";

    const productPrice =
        product.price ||
        "₹399";

    const productOldPrice =
        product.oldPrice ||
        product.originalPrice ||
        "";

    const productDiscount =
        product.discount ||
        "";

    const productWeight =
        product.weight ||
        "200g";

    const productShelfLife =
        product.shelfLife ||
        "30 days shelf life";

    const productPricePerGram =
        product.pricePerGram ||
        "";

    const productDelivery =
        product.delivery ||
        "All India Delivery Within 2 – 5 Business days";

    const productDescription =
        product.description ||
        "Authentic Kozhikoden Halwa, handcrafted with traditional recipes and premium ingredients.";

    /* =======================================================
       PRODUCT IMAGES
  
       IMPORTANT:
       If product.images exists, use it.
  
       Otherwise:
         product cover image
         +
         shared pdt images
       ======================================================= */

    const galleryImages = useMemo(() => {
        if (
            Array.isArray(product.images) &&
            product.images.length > 0
        ) {
            return product.images;
        }

        if (product.image) {
            return [
                product.image,
                ...SHARED_DETAIL_IMAGES,
            ];
        }

        return SHARED_DETAIL_IMAGES;
    }, [product]);

    /* =======================================================
       OFFERS
       ======================================================= */

    const offers =
        Array.isArray(product.offers)
            ? product.offers
            : [];

    /* =======================================================
       RESET WHEN PRODUCT CHANGES
       ======================================================= */

    useEffect(() => {
        setActiveImage(0);
        setQuantity(1);
        setToastVisible(true);
        setOpenFaq(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [product.id]);

    /* =======================================================
       CAROUSEL
       ======================================================= */

    const goPrevious = () => {
        setActiveImage((current) =>
            current === 0
                ? galleryImages.length - 1
                : current - 1
        );
    };

    const goNext = () => {
        setActiveImage((current) =>
            current === galleryImages.length - 1
                ? 0
                : current + 1
        );
    };

    /* =======================================================
       SHARE
       ======================================================= */

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: productName,
                    text: `Discover ${productName} at Fulva.`,
                    url: window.location.href,
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    window.location.href
                );
            }
        } catch {
            // User cancelled share.
        }
    };

    /* =======================================================
       ADD TO CART
       ======================================================= */

    const handleAddToCart = () => {
        console.log(
            "Added to cart:",
            productName,
            "Quantity:",
            quantity
        );

        setToastVisible(true);
    };

    /* =======================================================
       BUY NOW
       ======================================================= */

    const handleBuyNow = () => {
        console.log(
            "Buy now:",
            productName,
            "Quantity:",
            quantity
        );
    };

    /* =======================================================
       FAQ
       ======================================================= */

    const toggleFaq = (index) => {
        setOpenFaq((current) =>
            current === index
                ? null
                : index
        );
    };

    /* =======================================================
       RENDER
       ======================================================= */

    return (
        <main className="product-details-page">

            {/* =====================================================
          BACKGROUND
          ===================================================== */}

            <div className="product-bg-glow product-bg-glow-one" />

            <div className="product-bg-glow product-bg-glow-two" />

            <div className="product-details-container">

                {/* ===================================================
            BACK BUTTON
            =================================================== */}

                <button
                    type="button"
                    className="product-back-button"
                    onClick={onBack}
                >
                    <ArrowLeft size={17} />

                    <span>
                        Back to Collection
                    </span>
                </button>

                {/* ===================================================
            MAIN PRODUCT SECTION
            =================================================== */}

                <section className="product-details-layout">

                    {/* =================================================
              LEFT — GALLERY
              ================================================= */}

                    <div className="product-gallery">

                        <div className="product-gallery-layout">

                            {/* =============================================
                  THUMBNAILS
                  ============================================= */}

                            <div className="product-thumbnails">

                                {galleryImages.map(
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
                                        >
                                            <img
                                                src={image}
                                                alt={`${productName} ${index + 1}`}
                                            />
                                        </button>
                                    )
                                )}

                            </div>

                            {/* =============================================
                  MAIN IMAGE
                  ============================================= */}

                            <div className="product-main-gallery">

                                <div className="product-main-image-frame">

                                    <img
                                        key={galleryImages[activeImage]}
                                        src={galleryImages[activeImage]}
                                        alt={productName}
                                        className="product-main-image"
                                    />

                                    <div className="product-image-overlay" />

                                    {/* GOLD CORNERS */}

                                    <span className="image-corner image-corner-tl" />
                                    <span className="image-corner image-corner-tr" />
                                    <span className="image-corner image-corner-bl" />
                                    <span className="image-corner image-corner-br" />

                                    {/* PREVIOUS */}

                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-left"
                                            onClick={goPrevious}
                                            aria-label="Previous image"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                    )}

                                    {/* NEXT */}

                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-right"
                                            onClick={goNext}
                                            aria-label="Next image"
                                        >
                                            <ArrowRight size={20} />
                                        </button>
                                    )}

                                    {/* COUNTER */}

                                    <div className="gallery-counter">

                                        <span>
                                            {activeImage + 1}
                                        </span>

                                        <i>/</i>

                                        <span>
                                            {galleryImages.length}
                                        </span>

                                    </div>

                                    {/* PROGRESS */}

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

                        <div className="product-gallery-caption">

                            <span>
                                FULVA
                            </span>

                            <span>
                                AUTHENTIC CALICUT HALWA
                            </span>

                        </div>

                    </div>

                    {/* =================================================
              RIGHT — INFORMATION
              ================================================= */}

                    <div className="product-information">

                        {/* CATEGORY */}

                        <div className="product-category">

                            <span>
                                ✦
                            </span>

                            <span>
                                {productCategory}
                            </span>

                        </div>

                        {/* TITLE */}

                        <h1 className="product-detail-title">
                            {productName}
                        </h1>

                        {/* TYPE */}

                        <div className="product-type">

                            <span>
                                •
                            </span>

                            <strong>
                                {productType}
                            </strong>

                        </div>

                        {/* PRICE */}

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
                                            SAVE{" "}
                                            {String(
                                                productDiscount
                                            ).replace("-", "")}
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
                                <Share2 size={17} />

                                <span>
                                    Share
                                </span>
                            </button>

                        </div>

                        {/* TAX */}

                        <p className="product-tax-note">
                            Inclusive of all taxes · Free delivery on
                            orders above ₹499
                        </p>

                        {/* FACTS */}

                        <div className="product-facts">

                            <span>
                                {productShelfLife}
                            </span>

                            <span>
                                {productWeight}
                            </span>

                            <span>
                                {productDelivery}
                            </span>

                        </div>

                        {/* DIVIDER */}

                        <div className="product-divider">
                            <span>
                                ◆
                            </span>
                        </div>

                        {/* DESCRIPTION */}

                        <p className="product-description-line">
                            {productDescription}
                        </p>

                        {/* OFFERS */}

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
                                                index
                                            }
                                        >

                                            {offer.percentage && (
                                                <div className="offer-percent">
                                                    {offer.percentage}
                                                </div>
                                            )}

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

                        {/* COMBO NOTE */}

                        {offers.length > 0 && (
                            <p className="combo-note">
                                Mix any flavours you like —{" "}
                                <strong>
                                    same discounts apply automatically!
                                </strong>
                            </p>
                        )}

                        {/* BUILD COMBO */}

                        <button
                            type="button"
                            className="build-combo-button"
                        >
                            <Plus size={17} />

                            <strong>
                                Build Your Own Combo
                            </strong>
                        </button>

                        {/* ADD CART */}

                        <button
                            type="button"
                            className="detail-add-cart"
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag size={18} />

                            <span>
                                Add to cart
                            </span>
                        </button>

                        {/* OR */}

                        <div className="detail-or">

                            <span />

                            <em>
                                Or
                            </em>

                            <span />

                        </div>

                        {/* BUY NOW */}

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
                                    <Minus size={14} />
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
                                    <Plus size={14} />
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

                                <ArrowRight size={17} />

                            </button>

                        </div>

                    </div>

                </section>

                {/* ===================================================
            TRUST STRIP
            =================================================== */}

                <section className="product-trust-strip">

                    <div className="product-trust-item">

                        <Truck size={25} />

                        <div>
                            <strong>
                                All India Delivery
                            </strong>

                            <span>
                                2–5 Business Days
                            </span>
                        </div>

                    </div>

                    <div className="product-trust-item">

                        <ShieldCheck size={25} />

                        <div>
                            <strong>
                                Secure Payments
                            </strong>

                            <span>
                                100% Safe & Secure
                            </span>
                        </div>

                    </div>

                    <div className="product-trust-item">

                        <Leaf size={25} />

                        <div>
                            <strong>
                                Premium Quality
                            </strong>

                            <span>
                                Authentic Kozhikode Taste
                            </span>
                        </div>

                    </div>

                    <div className="product-trust-item">

                        <Users size={25} />

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

                {/* ===================================================
            PRODUCT STORY
            =================================================== */}

                <section className="product-story-section">

                    {/* SECTION LABEL */}

                    <div className="product-story-heading">

                        <span>
                            THE FULVA EXPERIENCE
                        </span>

                        <h2>
                            Crafted to be{" "}
                            <em>
                                remembered.
                            </em>
                        </h2>

                        <p>
                            A closer look at the texture, craft and
                            indulgence behind every bite.
                        </p>

                    </div>

                    {/* LARGE VISUAL */}

                    <div className="product-story-visual">

                        <img
                            src={STORY_IMAGES[0]}
                            alt="Fulva Halwa"
                        />

                        <div className="story-image-overlay" />

                        <div className="story-visual-copy">

                            <span>
                                FULVA
                            </span>

                            <strong>
                                Soft.
                                <br />
                                Smooth.
                                <br />
                                Unforgettable.
                            </strong>

                        </div>

                    </div>

                    {/* STORY IMAGE STRIP */}

                    <div className="product-story-image-grid">

                        {STORY_IMAGES.slice(1).map(
                            (image, index) => (
                                <div
                                    className="story-small-image"
                                    key={image}
                                >
                                    <img
                                        src={image}
                                        alt={`${productName} detail ${index + 2
                                            }`}
                                    />
                                </div>
                            )
                        )}

                    </div>

                </section>

                {/* ===================================================
            FAQ / PRODUCT INFORMATION ACCORDION
            =================================================== */}

                <section className="product-faq-section">

                    <div className="product-faq-intro">

                        <span>
                            THE DETAILS
                        </span>

                        <h2>
                            Everything you need
                            <br />
                            <em>to know.</em>
                        </h2>

                    </div>

                    <div className="product-faq-list">

                        {DEFAULT_FAQS.map(
                            (faq, index) => {
                                const isOpen =
                                    openFaq === index;

                                return (
                                    <div
                                        className={`product-faq-item ${isOpen
                                                ? "open"
                                                : ""
                                            }`}
                                        key={faq.title}
                                    >

                                        <button
                                            type="button"
                                            className="product-faq-trigger"
                                            onClick={() =>
                                                toggleFaq(index)
                                            }
                                            aria-expanded={isOpen}
                                        >

                                            <span>
                                                {faq.title}
                                            </span>

                                            <span className="faq-icon">

                                                {isOpen ? (
                                                    <Minus size={18} />
                                                ) : (
                                                    <Plus size={18} />
                                                )}

                                            </span>

                                        </button>

                                        <div
                                            className="product-faq-content"
                                        >

                                            <div>

                                                <ul>
                                                    {faq.content.map(
                                                        (line) => (
                                                            <li key={line}>
                                                                {line}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </section>

            </div>

            {/* =====================================================
          STICKY PRODUCT TOAST
          ===================================================== */}

            {toastVisible && (
                <div className="sticky-product-toast">

                    {/* IMAGE */}

                    <div className="sticky-toast-image">

                        <img
                            src={
                                product.image ||
                                galleryImages[0]
                            }
                            alt={productName}
                        />

                    </div>

                    {/* INFO */}

                    <div className="sticky-toast-info">

                        <div className="sticky-toast-name">
                            {productName}
                        </div>

                        <div className="sticky-toast-price-row">

                            <span className="sticky-toast-price">
                                {productPrice}
                            </span>

                            {productOldPrice && (
                                <span className="sticky-toast-original">
                                    {productOldPrice}
                                </span>
                            )}

                            {productDiscount && (
                                <span className="sticky-toast-discount">
                                    SAVE{" "}
                                    {String(
                                        productDiscount
                                    ).replace("-", "")}
                                </span>
                            )}

                        </div>

                    </div>

                    {/* ADD CART */}

                    <button
                        type="button"
                        className="sticky-toast-cart"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag size={17} />

                        <span>
                            Add to cart
                        </span>
                    </button>

                    {/* CLOSE */}

                    <button
                        type="button"
                        className="sticky-toast-close"
                        onClick={() =>
                            setToastVisible(false)
                        }
                        aria-label="Close"
                    >
                        <X size={15} />
                    </button>

                </div>
            )}

        </main>
    );
}