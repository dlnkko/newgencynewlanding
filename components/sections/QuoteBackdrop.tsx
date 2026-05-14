"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type QuoteBackdropProps = {
  src: string;
  onError?: () => void;
};

/**
 * Quote background: video is always dimmed and locked under fixed opaque shields.
 * Shields live in the same stacking context as the video (iOS + desktop safe).
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
    const el = videoRef.current;
    if (!el) return;

    playAttempts.current = 0;
    void tryPlay();

    return undefined;
  }, [tryPlay, src]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void tryPlay();
      },
      { threshold: 0, rootMargin: "240px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [tryPlay]);

  useEffect(() => {
    const resume = () => {
      void tryPlay();
    };

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
      className="quote-backdrop absolute inset-0 z-0 overflow-hidden bg-[#030303]"
      aria-hidden
    >
      <div className="quote-backdrop__media absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="hero-video quote-backdrop__video pointer-events-none absolute inset-0 h-full w-full scale-[1.05] object-cover"
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
      </div>

      <div className="quote-backdrop__shield quote-backdrop__shield--base" />
      <div className="quote-backdrop__shield quote-backdrop__shield--deep" />
      <div
        className="quote-backdrop__shield quote-backdrop__shield--tint pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139, 124, 246, 0.18), transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 60%, rgba(125, 211, 252, 0.1), transparent 50%)
          `,
        }}
      />
      <div className="quote-backdrop__shield quote-backdrop__shield--vignette pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(139,124,246,0.1),transparent_55%)]" />
      <div className="quote-backdrop__shield quote-backdrop__shield--fade pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/60" />
    </div>
  );
}
