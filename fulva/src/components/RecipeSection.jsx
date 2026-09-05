import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./RecipeSection.css";

const recipes = [
    {
        id: "recipe-1",
        video: "/reels/reel-recipe-1.mp4",
        username: "as-storries",
        caption:
            "Purely sweet, purely tender. A simple, indulgent way to bring the rich tenderness of Fulva halwa into your kitchen.",
        likes: "1,284",
        comments: "18",
        time: "2 days ago",
        url: "https://www.instagram.com/reel/DULpbNeD259/?igsi=MWNjOGMxNG44aW1yNw",
    },
    {
        id: "recipe-2",
        video: "/reels/reel-recipe-2.mp4",
        username: "cookwith_ashh",
        caption:
            "A little halwa, a lot of magic. Discover a delicious new way to enjoy authentic Kozhikode halwa with everyday ingredients.",
        likes: "1,067",
        comments: "24",
        time: "3 days ago",
        url: "https://www.instagram.com/reel/DUS6EuxE_tb/?igsi=d2Zid3d5Y3JiMWgz",
    },
    {
        id: "recipe-3",
        video: "/reels/reel-recipe-3.mp4",
        username: "nazkitchenfales",
        caption:
            "Make every layer count. Soft, rich halwa meets simple homemade flavours in a recipe worth sharing.",
        likes: "1,482",
        comments: "24",
        time: "2 days ago",
        url: "https://www.instagram.com/reel/DU7mQukExK-/?igsi=MXBrcTBoNGd5MWsxZA",
    },
    {
        id: "recipe-4",
        video: "/reels/reel-recipe-4.mp4",
        username: "sktakesyou",
        caption:
            "Something special for the table. Turn your favourite Fulva halwa into a beautiful dessert experience at home.",
        likes: "1,356",
        comments: "21",
        time: "4 days ago",
        url: "https://www.instagram.com/reel/DUINpbiiTs6/?igsi=NGswajRyOGluYmJ0",
    },
];

function getPosition(index, activeIndex, total) {
    let difference = index - activeIndex;

    if (difference > total / 2) {
        difference -= total;
    }

    if (difference < -total / 2) {
        difference += total;
    }

    return difference;
}

export default function RecipeSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [likedState, setLikedState] = useState({});
    const [savedState, setSavedState] = useState({});

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    const videoRefs = useRef([]);

    const activeRecipe = recipes[activeIndex];

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === activeIndex) {
                video.currentTime = 0;

                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex]);

    const nextRecipe = () => {
        setActiveIndex((prev) => (prev + 1) % recipes.length);
    };

    const previousRecipe = () => {
        setActiveIndex(
            (prev) => (prev - 1 + recipes.length) % recipes.length
        );
    };

    const openInstagram = (e) => {
        if (e) e.stopPropagation();

        window.open(
            activeRecipe.url,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const toggleLike = (e, recipeId) => {
        e.stopPropagation();

        setLikedState((prev) => ({
            ...prev,
            [recipeId]: !prev[recipeId],
        }));
    };

    const toggleSave = (e, recipeId) => {
        e.stopPropagation();

        setSavedState((prev) => ({
            ...prev,
            [recipeId]: !prev[recipeId],
        }));
    };

    const cardOffset =
        windowWidth < 480
            ? 90
            : windowWidth < 768
                ? 125
                : windowWidth < 1200
                    ? 165
                    : 190;

    return (
        <section className="recipe-section">

            <div className="recipe-glow recipe-glow-left" />
            <div className="recipe-glow recipe-glow-right" />

            <div className="recipe-inner">

                {/* HEADER */}
                <motion.div
                    className="recipe-header"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="recipe-eyebrow">
                        <span />
                        HALWA IN YOUR KITCHEN
                        <span />
                    </div>

                    <h2>
                        Cook with <em>Fulva</em>
                    </h2>

                    <p>
                        Recipes, pairings, and creative ideas inspired by the
                        world of authentic Kozhikode halwa.
                    </p>
                </motion.div>

                {/* CAROUSEL */}
                <div className="recipe-stage">

                    <button
                        type="button"
                        className="recipe-arrow recipe-arrow-left"
                        onClick={previousRecipe}
                        aria-label="Previous recipe"
                    >
                        <span>←</span>
                    </button>

                    <div className="recipe-track">

                        {recipes.map((recipe, index) => {
                            const position = getPosition(
                                index,
                                activeIndex,
                                recipes.length
                            );

                            const isActive = position === 0;

                            return (
                                <motion.div
                                    key={recipe.id}
                                    className={`recipe-card ${isActive
                                            ? "recipe-card-active"
                                            : "recipe-card-side"
                                        }`}
                                    onClick={() =>
                                        setActiveIndex(index)
                                    }
                                    animate={{
                                        x: position * cardOffset,
                                        scale: isActive ? 1 : 0.78,
                                        opacity: isActive ? 1 : 0.3,
                                        filter: isActive
                                            ? "blur(0px)"
                                            : "blur(3px)",
                                        zIndex: isActive ? 20 : 5,
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <div className="recipe-video-shell">

                                        {/* CREATOR HEADER */}
                                        <div className="recipe-card-topbar">

                                            <div className="recipe-avatar">
                                                {recipe.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <span className="recipe-topbar-user">
                                                @{recipe.username}
                                            </span>

                                            <div className="recipe-more">
                                                •••
                                            </div>

                                        </div>

                                        {/* VIDEO */}
                                        <div className="recipe-card-videowrap">

                                            <video
                                                ref={(el) => {
                                                    videoRefs.current[index] =
                                                        el;
                                                }}
                                                src={recipe.video}
                                                muted
                                                playsInline
                                                loop
                                                preload="metadata"
                                            />

                                            {!isActive && (
                                                <div className="recipe-side-play">
                                                    ▶
                                                </div>
                                            )}

                                        </div>

                                        {/* EVERYTHING BELOW VIDEO IS INSIDE CARD */}
                                        {isActive && (
                                            <div className="recipe-card-post">

                                                {/* ACTION ROW */}
                                                <div className="recipe-card-actionbar">

                                                    <div className="recipe-action-group-left">

                                                        {/* LIKE */}
                                                        <button
                                                            type="button"
                                                            className={`recipe-icon-btn ${likedState[
                                                                    recipe.id
                                                                ]
                                                                    ? "active"
                                                                    : ""
                                                                }`}
                                                            onClick={(e) =>
                                                                toggleLike(
                                                                    e,
                                                                    recipe.id
                                                                )
                                                            }
                                                            aria-label="Like"
                                                        >
                                                            <img
                                                                src="/reels/like.png"
                                                                alt="Like"
                                                            />
                                                        </button>

                                                        {/* COMMENT */}
                                                        <button
                                                            type="button"
                                                            className="recipe-icon-btn"
                                                            onClick={
                                                                openInstagram
                                                            }
                                                            aria-label="Comment"
                                                        >
                                                            <img
                                                                src="/reels/comment.png"
                                                                alt="Comment"
                                                            />
                                                        </button>

                                                        {/* SHARE */}
                                                        <button
                                                            type="button"
                                                            className="recipe-icon-btn"
                                                            onClick={
                                                                openInstagram
                                                            }
                                                            aria-label="Share"
                                                        >
                                                            <img
                                                                src="/reels/send.png"
                                                                alt="Share"
                                                            />
                                                        </button>

                                                    </div>

                                                    {/* SAVE */}
                                                    <button
                                                        type="button"
                                                        className={`recipe-icon-btn recipe-icon-save ${savedState[
                                                                recipe.id
                                                            ]
                                                                ? "active"
                                                                : ""
                                                            }`}
                                                        onClick={(e) =>
                                                            toggleSave(
                                                                e,
                                                                recipe.id
                                                            )
                                                        }
                                                        aria-label="Save"
                                                    >
                                                        <img
                                                            src="/reels/save.png"
                                                            alt="Save"
                                                        />
                                                    </button>

                                                </div>

                                                {/* LIKE COUNT */}
                                                <div className="recipe-like-count">
                                                    {recipe.likes} likes
                                                </div>

                                                {/* CAPTION */}
                                                <div className="recipe-card-caption">

                                                    <span>
                                                        @{recipe.username}
                                                    </span>

                                                    {" "}

                                                    {recipe.caption}

                                                </div>

                                                {/* COMMENTS */}
                                                <button
                                                    type="button"
                                                    className="recipe-comments"
                                                    onClick={openInstagram}
                                                >
                                                    View all {recipe.comments}{" "}
                                                    comments
                                                </button>

                                                {/* TIME */}
                                                <div className="recipe-card-time">
                                                    {recipe.time}
                                                </div>

                                            </div>
                                        )}

                                        {/* GOLD BORDER */}
                                        {isActive && (
                                            <div className="recipe-card-border" />
                                        )}

                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>

                    <button
                        type="button"
                        className="recipe-arrow recipe-arrow-right"
                        onClick={nextRecipe}
                        aria-label="Next recipe"
                    >
                        <span>→</span>
                    </button>

                </div>

                {/* COUNTER OUTSIDE CARD */}
                <div className="recipe-counter-outside">

                    <strong>
                        {String(activeIndex + 1).padStart(2, "0")}
                    </strong>

                    <span>/</span>

                    <span>
                        {String(recipes.length).padStart(2, "0")}
                    </span>

                    <i />

                    <span>HALWA RECIPE</span>

                    <button
                        type="button"
                        className="recipe-instagram-button"
                        onClick={openInstagram}
                    >
                        VIEW ON INSTAGRAM
                        <span>↗</span>
                    </button>

                </div>

                <div className="recipe-ornament">
                    <span />
                    <i />
                    <span />
                </div>

            </div>
        </section>
    );
}