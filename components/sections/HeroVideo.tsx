"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { HERO_VIDEO_SRC } from "@/lib/constants";

type HeroVideoProps = {
  onError: () => void;
};

export function HeroVideo({ onError }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);
  const [ready, setReady] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    try {
      await el.play();
      setReady(true);
    } catch {
      playAttempts.current += 1;
      if (playAttempts.current < 8) {
        window.setTimeout(tryPlay, 120);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.load();

    const onReady = () => {
      void tryPlay();
    };

    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("canplaythrough", onReady);

    void tryPlay();

    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("canplaythrough", onReady);
    };
  }, [tryPlay]);

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.04] object-cover transition-opacity duration-300"
      style={{ opacity: ready ? 1 : 0.85 }}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onError={onError}
      onPlaying={() => setReady(true)}
      aria-hidden
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
