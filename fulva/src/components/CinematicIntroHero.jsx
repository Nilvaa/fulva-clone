import { useEffect, useRef, useState, useCallback } from "react";
import "./CinematicIntroHero.css";

// =========================================================
//  LEGACY FRAME-SEQUENCE IMPLEMENTATION (PRESERVED FOR FUTURE USE)
//  The 300-frame JPG sequence in /transition-jpg/ is kept intact.
//  The canvas-based implementation below is archived but NOT deleted.
//  To reactivate: uncomment the LEGACY block and swap components.
// =========================================================

/*
  LEGACY CONSTANTS (do not delete):

  const TOTAL_FRAMES = 300;
  const FRAME_WIDTH = 1280;
  const FRAME_HEIGHT = 720;
  const INTRO_DURATION = 12500;
  const INITIAL_BUFFER = 20;

  const getFramePath = (index) => {
    const padded = String(index).padStart(3, "0");
    return `/transition-jpg/ezgif-frame-${padded}.jpg`;
  };

  function cubicEaseInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function computeTimelineProgress(t) { ... see git history ... }
  function renderImage(ctx, canvas, img) { ... see git history ... }
*/

// Phase timestamps (seconds) aligned with video content
// Adjust these if the video structure changes
const VIDEO_PHASES = [
  { time: 0,    phase: 1 }, // Ingredients / Genesis
  { time: 3,    phase: 2 }, // Silk & Movement / Craftsmanship
  { time: 6,    phase: 3 }, // Gathering / Legacy
  { time: 9,    phase: 4 }, // Transformation / Alchemy
  { time: 11.5, phase: 5 }, // Final reveal / The Masterpiece
];

function phaseFromTime(currentTime) {
  let p = 1;
  for (const entry of VIDEO_PHASES) {
    if (currentTime >= entry.time) p = entry.phase;
    else break;
  }
  return p;
}

export default function CinematicIntroHero({
  onShopClick,
  onExploreClick,
  onIntroComplete,
}) {
  const videoRef = useRef(null);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [videoReady, setVideoReady] = useState(false);
  const isFinishedRef = useRef(false);

  const [prefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const completeIntro = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setIsIntroFinished(true);
    setCurrentPhase(5);
    onIntroComplete?.();
  }, [onIntroComplete]);

  const handleSkip = useCallback(() => {
    const video = videoRef.current;
    if (video) video.pause();
    completeIntro();
  }, [completeIntro]);

  // Reduced motion: skip immediately
  useEffect(() => {
    if (prefersReducedMotion) completeIntro();
  }, [prefersReducedMotion, completeIntro]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoReady(true);

    const handleTimeUpdate = () => {
      if (isFinishedRef.current) return;
      const p = phaseFromTime(video.currentTime);
      setCurrentPhase((prev) => (prev !== p ? p : prev));
    };

    const handleEnded = () => completeIntro();

    const handleLoadedData = () => {
      setVideoReady(true);
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => completeIntro());
      });
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [completeIntro]);

  return (
    <section className="cinematic-hero-container" aria-label="Fulva Cinematic Intro">
      {/* ── CINEMATIC VIDEO LANDING ── */}
      <video
        ref={videoRef}
        className={`cinematic-video${videoReady ? " cinematic-video--ready" : ""}`}
        src="/landing-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Atmospheric vignette & ambient glow */}
      <div className="cinematic-ambient-glow" />
      <div className="cinematic-vignette" />

      {/* Discreet Skip Intro button */}
      {!isIntroFinished && (
        <button
          className="skip-intro-btn"
          onClick={handleSkip}
          aria-label="Skip cinematic introduction"
        >
          <span>Skip intro</span>
          <span className="skip-intro-arrow">→</span>
        </button>
      )}

      {/* Storytelling Overlays */}
      <div className="cinematic-overlay-layer" aria-live="polite">
        {/* Phase 1: Ingredients */}
        <div
          className="cinematic-story-card phase-1"
          style={{
            opacity: currentPhase === 1 ? 1 : 0,
            transform: currentPhase === 1 ? "translateY(0)" : "translateY(16px)",
            pointerEvents: currentPhase === 1 ? "auto" : "none",
          }}
        >
          <div className="cinematic-eyebrow">
            <span className="cinematic-eyebrow-line" />
            <span>Genesis</span>
          </div>
          <h2 className="cinematic-title">
            Where every
            <br />
            <em>flavour begins.</em>
          </h2>
          <p className="cinematic-desc">
            Premium dry fruits, sun-cured figs, and crisp nuts carefully selected for an authentic taste of Kozhikode.
          </p>
        </div>

        {/* Phase 2: Movement & Golden Silk */}
        <div
          className="cinematic-story-card phase-2"
          style={{
            opacity: currentPhase === 2 ? 1 : 0,
            transform: currentPhase === 2 ? "translateY(0)" : "translateY(16px)",
            pointerEvents: currentPhase === 2 ? "auto" : "none",
          }}
        >
          <div className="cinematic-eyebrow">
            <span className="cinematic-eyebrow-line" />
            <span>Craftsmanship</span>
          </div>
          <h2 className="cinematic-title">
            Crafted from the
            <br />
            <em>finest ingredients.</em>
          </h2>
          <p className="cinematic-desc">
            Pure ghee and natural essence folded into golden harmony. No maida, no palm oil, ever.
          </p>
        </div>

        {/* Phase 3: Gathering & Orbit */}
        <div
          className="cinematic-story-card phase-3"
          style={{
            opacity: currentPhase === 3 ? 1 : 0,
            transform: currentPhase === 3 ? "translateY(0)" : "translateY(16px)",
            pointerEvents: currentPhase === 3 ? "auto" : "none",
          }}
        >
          <div className="cinematic-eyebrow">
            <span>Legacy</span>
            <span className="cinematic-eyebrow-line" />
          </div>
          <h2 className="cinematic-title">
            Tradition,
            <br />
            <em>brought together.</em>
          </h2>
          <p className="cinematic-desc">
            Centuries-old Kozhikode halwa-making heritage uniting time-honoured technique with modern precision.
          </p>
        </div>

        {/* Phase 4: Transformation */}
        <div
          className="cinematic-story-card phase-4"
          style={{
            opacity: currentPhase === 4 ? 1 : 0,
            transform: currentPhase === 4 ? "translateY(0)" : "translateY(16px)",
            pointerEvents: currentPhase === 4 ? "auto" : "none",
          }}
        >
          <div className="cinematic-eyebrow">
            <span>Alchemy</span>
            <span className="cinematic-eyebrow-line" />
          </div>
          <h2 className="cinematic-title">
            From ingredients
            <br />
            <em>to indulgence.</em>
          </h2>
          <p className="cinematic-desc">
            Slow-simmered in copper vats until every texture achieves its iconic, velvety bite.
          </p>
        </div>

        {/* Phase 5: Final Reveal & Settled Hero */}
        <div
          className="cinematic-story-card phase-5"
          style={{
            opacity: currentPhase === 5 ? 1 : 0,
            transform: currentPhase === 5 ? "translateY(0)" : "translateY(16px)",
            pointerEvents: currentPhase === 5 ? "auto" : "none",
          }}
        >
          <div className="cinematic-eyebrow">
            <span className="cinematic-eyebrow-line" />
            <span>The Masterpiece</span>
          </div>
          <h1 className="cinematic-title">
            24 Varieties.
            <br />
            <em>One Taste of Kozhikode.</em>
          </h1>
          <p className="cinematic-desc">
            Authentic Kozhikode halwa, presented in an exquisite gold collection box. Experience the full spectrum of Kerala culinary art.
          </p>
          <div className="hero-cta-group">
            <button className="btn-hero-primary" onClick={onShopClick}>
              Shop Now →
            </button>
            <button className="btn-hero-secondary" onClick={onExploreClick}>
              Explore Collection ↓
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator once settled */}
      {isIntroFinished && (
        <div className="hero-scroll-prompt">
          <span>Scroll to explore flavours</span>
          <div className="hero-scroll-prompt-line" />
        </div>
      )}
    </section>
  );
}
