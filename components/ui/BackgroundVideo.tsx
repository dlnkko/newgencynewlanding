"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  onError?: () => void;
  /** Defer loading/playback until the block enters the viewport. */
  playWhenInView?: boolean;
  className?: string;
};

export function BackgroundVideo({
  src,
  onError,
  playWhenInView = false,
  className = "",
}: BackgroundVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);
  const inViewRef = useRef(!playWhenInView);
  const hasStartedRef = useRef(false);
  const [started, setStarted] = useState(false);

  const markStarted = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setStarted(true);
  }, []);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || (playWhenInView && !inViewRef.current)) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    if (el.paused) {
      try {
        await el.play();
        markStarted();
      } catch {
        playAttempts.current += 1;
        if (playAttempts.current < 24) {
          window.setTimeout(tryPlay, Math.min(80 * playAttempts.current, 600));
        }
      }
    } else {
      markStarted();
    }
  }, [markStarted, playWhenInView]);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    playAttempts.current = 0;
    hasStartedRef.current = false;
    setStarted(false);

    const onReady = () => {
      void tryPlay();
    };

    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("playing", onReady);

    if (!playWhenInView) {
      void tryPlay();
    }

    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("playing", onReady);
    };
  }, [tryPlay, src, playWhenInView]);

  useEffect(() => {
    if (!playWhenInView) return;

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current) {
          void tryPlay();
        }
      },
      { threshold: 0.08, rootMargin: "120px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [playWhenInView, tryPlay]);

  useEffect(() => {
    const resume = () => {
      void tryPlay();
    };

    document.addEventListener("touchstart", resume, { passive: true, once: true });
    document.addEventListener("click", resume, { once: true });
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") resume();
    });

    return () => {
      document.removeEventListener("touchstart", resume);
      document.removeEventListener("click", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, [tryPlay]);

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden bg-[#020202] ${className}`}
    >
      {!started ? (
        <div className="absolute inset-0 z-[2] bg-[#030303]" aria-hidden />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        className="hero-video pointer-events-none absolute inset-0 z-[1] h-full w-full scale-[1.04] object-cover transition-opacity duration-700"
        style={{ opacity: started ? 1 : 0 }}
        muted
        autoPlay={!playWhenInView}
        loop
        playsInline
        preload={playWhenInView ? "none" : "auto"}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        onError={onError}
        onPlaying={markStarted}
        onPlay={markStarted}
        aria-hidden
      />
    </div>
  );
}
