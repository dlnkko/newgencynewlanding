"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type CarouselVideoProps = {
  src: string;
  isActive: boolean;
  /** When false, video is not mounted/loaded yet. */
  enabled: boolean;
};

export function CarouselVideo({ src, isActive, enabled }: CarouselVideoProps) {
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
      void tryPlay();
    } else {
      el.pause();
    }
  }, [isActive, enabled, tryPlay]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
        isActive ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      tabIndex={-1}
      aria-hidden={!isActive}
    />
  );
}
