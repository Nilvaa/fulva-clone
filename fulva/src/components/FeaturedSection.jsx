import { useEffect, useRef } from "react";
import "./FeaturedSection.css";

const publications = [
    { name: "Indian Startup News", image: "/featured/indian-startup-news.png" },
    { name: "Manorama News", image: "/featured/manorama-news.png" },
    { name: "Mathrubhumi", image: "/featured/mathrubhumi.png" },
    { name: "Malayala Manorama", image: "/featured/malaya-manorama.png" },
    { name: "The Hindu", image: "/featured/the-hindu.png" },
    { name: "Times of India", image: "/featured/times-of-india.png" },
    { name: "The New Indian Express", image: "/featured/TNIE.png" },
    { name: "Inc42", image: "/featured/inc42.png" },
    { name: "The Better India", image: "/featured/thebetterindia.png" },
    { name: "News18", image: "/featured/news18.png" },
    { name: "Startuppedia", image: "/featured/startuppedia.png" },
];

export default function FeaturedSection() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let animationFrame;
        let paused = false;

        const move = () => {
            if (!paused) {
                track.scrollLeft += 0.35;

                // Seamlessly restart after half the duplicated content.
                if (track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft = 0;
                }
            }

            animationFrame = requestAnimationFrame(move);
        };

        animationFrame = requestAnimationFrame(move);

        const pause = () => {
            paused = true;
        };

        const resume = () => {
            paused = false;
        };

        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", resume);
        track.addEventListener("touchstart", pause, { passive: true });
        track.addEventListener("touchend", resume, { passive: true });

        return () => {
            cancelAnimationFrame(animationFrame);

            track.removeEventListener("mouseenter", pause);
            track.removeEventListener("mouseleave", resume);
            track.removeEventListener("touchstart", pause);
            track.removeEventListener("touchend", resume);
        };
    }, []);

    const logos = [...publications, ...publications];

    return (
        <section className="featured-section">
            <div className="featured-glow featured-glow-left" />
            <div className="featured-glow featured-glow-right" />

            <div className="featured-inner">

                <div className="featured-heading">
                    <span className="featured-line" />

                    <p>AS FEATURED IN</p>

                    <span className="featured-line" />
                </div>

                <div className="featured-carousel-wrapper">
                    <div
                        className="featured-carousel"
                        ref={trackRef}
                    >
                        <div className="featured-track">
                            {logos.map((publication, index) => (
                                <div
                                    className="featured-logo"
                                    key={`${publication.name}-${index}`}
                                    title={publication.name}
                                >
                                    <img
                                        src={publication.image}
                                        alt={publication.name}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="featured-bottom">
                    <span />
                    <div>TRUSTED • RECOGNISED • REMEMBERED</div>
                    <span />
                </div>

            </div>
        </section>
    );
}