"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type CarouselVideoProps = {
  src: string;
  active: boolean;
};

export function CarouselVideo({ src, active }: CarouselVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);
  const inViewRef = useRef(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !active || !inViewRef.current) return;

    el.muted = true;
    el.playsInline = true;

    if (el.paused) {
      try {
        await el.play();
      } catch {
        playAttempts.current += 1;
        if (playAttempts.current < 12) {
          window.setTimeout(tryPlay, 150 * playAttempts.current);
        }
      }
    }
  }, [active]);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    playAttempts.current = 0;

    const onReady = () => {
      void tryPlay();
    };

    el.addEventListener("canplay", onReady);
    void tryPlay();

    return () => {
      el.removeEventListener("canplay", onReady);
      el.pause();
    };
  }, [src, active, tryPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const root = el.closest("[data-carousel-root]");
    if (!root) {
      inViewRef.current = true;
      void tryPlay();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
        if (inViewRef.current && active) {
          void tryPlay();
        } else if (!active) {
          el.pause();
        }
      },
      { threshold: 0.2, rootMargin: "40px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [active, tryPlay]);

  if (!active) return null;

  return (
    <video
      ref={videoRef}
      className="hero-video h-full w-full object-cover"
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controls={false}
      tabIndex={-1}
      aria-hidden
    />
  );
}
