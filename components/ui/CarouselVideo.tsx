"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type CarouselVideoProps = {
  src: string;
  isActive: boolean;
  enabled: boolean;
  /** Bump this to force playback from the start. */
  restartToken?: number;
  preload?: "none" | "metadata" | "auto";
  className?: string;
};

export function CarouselVideo({
  src,
  isActive,
  enabled,
  restartToken = 0,
  preload = "metadata",
  className = "",
}: CarouselVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !enabled || !isActive) return;

    el.muted = true;
    el.playsInline = true;

    if (el.paused) {
      try {
        await el.play();
      } catch {
        playAttempts.current += 1;
        if (playAttempts.current < 16) {
          window.setTimeout(tryPlay, 120 * playAttempts.current);
        }
      }
    }
  }, [enabled, isActive]);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el || !enabled) return;

    playAttempts.current = 0;

    const onReady = () => {
      if (isActive) void tryPlay();
    };

    el.addEventListener("canplay", onReady);
    el.addEventListener("loadeddata", onReady);

    if (isActive) void tryPlay();
    else el.pause();

    return () => {
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("loadeddata", onReady);
    };
  }, [src, isActive, enabled, tryPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !enabled) return;

    if (isActive) {
      try {
        el.currentTime = 0;
      } catch {
        /* ignore seek before metadata */
      }
      void tryPlay();
    } else {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
  }, [isActive, enabled, restartToken, tryPlay]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
        isActive ? "z-10 opacity-100" : "z-0 opacity-0"
      } ${className}`.trim()}
      src={src}
      muted
      loop
      playsInline
      preload={isActive ? "auto" : preload}
      disablePictureInPicture
      controls={false}
      tabIndex={-1}
      aria-hidden={!isActive}
    />
  );
}
