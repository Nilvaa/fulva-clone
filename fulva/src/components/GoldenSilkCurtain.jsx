import { useEffect, useRef, useState } from "react";
import "./GoldenSilkCurtain.css";

/**
 * GoldenSilkCurtain
 *
 * Scroll-driven cinematic silk transition using the frame sequence in
 * /public/goldencurtain-jpg/ (300 frames, ezgif-frame-001.jpg … 300.jpg).
 *
 * The frames are drawn on a canvas that sits above the Onam section.
 * Because the silk frames are NOT full-screen curtains (they show the
 * golden ribbon flowing across a transparent/dark background), the
 * underlying Onam content remains partially visible around the silk.
 *
 * Scroll journey (wrapper height = 300vh):
 *   progress 0.00 → 1.00 : frames 1 → 300 play in sequence.
 *   At progress = 1 the canvas is fully transparent → Onam revealed.
 *
 * Architecture (unchanged):
 *   .silk-wrapper       → tall div that provides scroll distance (300vh)
 *   .silk-sticky        → position: sticky — stays in viewport
 *   .silk-content-below → Onam section, always underneath
 *   .silk-canvas-layer  → canvas drawn by JS above content (pointer-events:none)
 *
 * LEGACY CSS gradient silk (the .silk-panel) is intentionally NOT used here
 * but its CSS rules are preserved in GoldenSilkCurtain.css for reference.
 */

const TOTAL_FRAMES = 300;

function framePath(index) {
  // index is 1-based, zero-padded to 3 digits
  const padded = String(index).padStart(3, "0");
  return `/goldencurtain-jpg/ezgif-frame-${padded}.jpg`;
}

export default function GoldenSilkCurtain({ children }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // Preloaded Image objects — index 0 corresponds to frame 1
  const framesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const [framesReady, setFramesReady] = useState(false);
  const currentFrameRef = useRef(0); // last drawn frame index (0-based)

  // ── Draw a single frame onto the canvas ──────────────────────────────────
  function drawFrame(img) {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Resize backing store if needed
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);

    // "contain" scaling — preserves the silk ribbon shape
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW, drawH;
    if (imgAspect > canvasAspect) {
      drawW = w;
      drawH = w / imgAspect;
    } else {
      drawH = h;
      drawW = h * imgAspect;
    }
    const drawX = (w - drawW) / 2;
    const drawY = (h - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // ── Preload all 300 frames ────────────────────────────────────────────────
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = () => {
        loaded++;
        loadedCountRef.current = loaded;
        if (loaded === TOTAL_FRAMES) setFramesReady(true);
        // Show first frame as soon as it arrives
        if (i === 0) drawFrame(img);
      };
      img.onerror = () => {
        loaded++;
        loadedCountRef.current = loaded;
        if (loaded === TOTAL_FRAMES) setFramesReady(true);
      };
      images[i] = img;
    }
    framesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll → frame mapping ────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const rect = wrapper.getBoundingClientRect();
        const wrapperH = wrapper.offsetHeight;
        const viewH = window.innerHeight;

        const scrolled = -rect.top;
        const totalScroll = wrapperH - viewH;
        const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIdx === currentFrameRef.current) return;
        currentFrameRef.current = frameIdx;

        const img = framesRef.current[frameIdx];
        if (img && img.complete && img.naturalWidth) drawFrame(img);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw when all frames finish loading
  useEffect(() => {
    if (!framesReady) return;
    const img =
      framesRef.current[currentFrameRef.current] || framesRef.current[0];
    if (img) drawFrame(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framesReady]);

  // Redraw on resize (canvas dimensions may change)
  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) canvasRef.current.width = 0; // force recalc
      const img =
        framesRef.current[currentFrameRef.current] || framesRef.current[0];
      if (img && img.complete) drawFrame(img);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="silk-wrapper">
      {/* Sticky container keeps canvas in viewport during scroll */}
      <div className="silk-sticky">
        {/* Onam section — always rendered beneath the canvas */}
        <div className="silk-content-below">{children}</div>

        {/*
          Canvas: draws goldencurtain-jpg frames.
          pointer-events: none so clicks pass through to Onam section.
        */}
        <canvas
          ref={canvasRef}
          className="silk-canvas-layer"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
