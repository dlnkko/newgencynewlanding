"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type QuoteBackdropProps = {
  src: string;
  onError?: () => void;
};

/**
 * Hero-style quote backdrop: full-opacity video + fixed dark veil in one layer stack.
 * Veil sits above the video in the same context (prevents scroll flicker on iOS/desktop).
 */
export function QuoteBackdrop({ src, onError }: QuoteBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    if (!el.paused) return;

    try {
      await el.play();
    } catch {
      playAttempts.current += 1;
      if (playAttempts.current < 32) {
        window.setTimeout(tryPlay, Math.min(100 * playAttempts.current, 800));
      }
    }
  }, []);

  useLayoutEffect(() => {
    playAttempts.current = 0;
    void tryPlay();
  }, [tryPlay, src]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void tryPlay();
      },
      { threshold: 0, rootMargin: "200px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [tryPlay]);

  useEffect(() => {
    const resume = () => {
      void tryPlay();
    };

    document.addEventListener("touchstart", resume, { passive: true, once: true });
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") resume();
    });

    return () => {
      window.removeEventListener("pageshow", resume);
    };
  }, [tryPlay]);

  return (
    <div
      ref={rootRef}
      className="quote-backdrop absolute inset-0 overflow-hidden bg-[#020202]"
      aria-hidden
    >
      <video
        ref={videoRef}
        src={src}
        className="hero-video quote-backdrop__video pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.04] object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        onError={onError}
        aria-hidden
      />

      <div className="quote-backdrop__veil absolute inset-0 z-[1] bg-black/74 md:bg-black/80" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(139,124,246,0.16),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_50%_40%_at_90%_15%,rgba(125,211,252,0.07),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/30 to-black/55"
        aria-hidden
      />
    </div>
  );
}
