"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { HERO_VIDEO_SRC } from "@/lib/constants";

type HeroVideoProps = {
  onError: () => void;
};

export function HeroVideo({ onError }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playAttempts = useRef(0);
  const [playing, setPlaying] = useState(false);

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
        setPlaying(true);
      } catch {
        playAttempts.current += 1;
        if (playAttempts.current < 24) {
          window.setTimeout(tryPlay, Math.min(80 * playAttempts.current, 600));
        }
      }
    } else {
      setPlaying(true);
    }
  }, []);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onReady = () => {
      void tryPlay();
    };

    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("playing", onReady);

    void tryPlay();

    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("playing", onReady);
    };
  }, [tryPlay]);

  useEffect(() => {
    const resume = () => {
      void tryPlay();
    };

    document.addEventListener("touchstart", resume, { passive: true });
    document.addEventListener("click", resume);
    document.addEventListener("scroll", resume, { passive: true });
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") resume();
    });

    return () => {
      document.removeEventListener("touchstart", resume);
      document.removeEventListener("click", resume);
      document.removeEventListener("scroll", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, [tryPlay]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#020202]">
      {!playing ? (
        <div className="absolute inset-0 z-[2] bg-[#030303]" aria-hidden />
      ) : null}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        className="hero-video pointer-events-none absolute inset-0 z-[1] h-full w-full scale-[1.04] object-cover transition-opacity duration-500"
        style={{ opacity: playing ? 1 : 0 }}
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
        onPlaying={() => setPlaying(true)}
        onPlay={() => setPlaying(true)}
        aria-hidden
      />
    </div>
  );
}
