"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  onError?: () => void;
  /**
   * Stable mode: no fade/cover toggling — video stays visible under overlays.
   * Prevents scroll flicker on long background sections.
   */
  stable?: boolean;
  className?: string;
};

export function BackgroundVideo({
  src,
  onError,
  stable = false,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);
  const [heroVisible, setHeroVisible] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    if (el.paused) {
      try {
        await el.play();
        if (!stable) setHeroVisible(true);
      } catch {
        playAttempts.current += 1;
        if (playAttempts.current < 24) {
          window.setTimeout(tryPlay, Math.min(80 * playAttempts.current, 600));
        }
      }
    } else if (!stable) {
      setHeroVisible(true);
    }
  }, [stable]);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    playAttempts.current = 0;
    if (!stable) setHeroVisible(false);

    const onReady = () => {
      void tryPlay();
    };

    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);

    void tryPlay();

    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [tryPlay, src, stable]);

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

  const showHeroCover = !stable && !heroVisible;

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[#020202] ${className}`}
    >
      {showHeroCover ? (
        <div className="absolute inset-0 z-[2] bg-[#030303]" aria-hidden />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        className={
          stable
            ? "hero-video pointer-events-none absolute inset-0 z-[1] h-full w-full scale-[1.04] object-cover"
            : "hero-video pointer-events-none absolute inset-0 z-[1] h-full w-full scale-[1.04] object-cover transition-opacity duration-700"
        }
        style={stable ? undefined : { opacity: heroVisible ? 1 : 0 }}
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
        onPlaying={() => {
          if (!stable) setHeroVisible(true);
        }}
        aria-hidden
      />
    </div>
  );
}
