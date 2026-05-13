"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { WORK_SLOTS } from "@/lib/constants";
import { CarouselVideo } from "@/components/ui/CarouselVideo";
import { EASE } from "@/lib/motion";

const N = WORK_SLOTS.length;

const captionVariants: Variants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } },
};

function SlideCaption({ label, index }: { label: string; index: number }) {
  return (
    <div className="flex w-full flex-col items-center gap-1 px-2 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a78bfa]/80">
        {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
      </span>
      <p className="max-w-xl bg-gradient-to-r from-[#f5f3ff] via-[#ddd6fe] to-[#7dd3fc] bg-clip-text font-display text-[clamp(0.9rem,2.8vw,1.15rem)] font-medium leading-snug tracking-[-0.02em] text-transparent [text-wrap:balance] sm:text-base">
        {label}
      </p>
    </div>
  );
}

export function WorkCarousel() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [videosEnabled, setVideosEnabled] = useState(false);
  const slot = WORK_SLOTS[index]!;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVideosEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((to: number) => {
    setIndex(((to % N) + N) % N);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const caption = reduceMotion ? (
    <SlideCaption label={slot.label} index={index} />
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${slot.id}-${index}`}
        variants={captionVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full"
      >
        <SlideCaption label={slot.label} index={index} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[min(100%,20rem)] sm:max-w-md md:max-w-xl lg:max-w-2xl"
      data-carousel-root
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#030305] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.75)] sm:rounded-2xl">
        {!videosEnabled ? (
          <div
            className="absolute inset-0 z-20 bg-[#030305]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 30% 40%, rgba(139,124,246,0.12), transparent 55%)",
            }}
            aria-hidden
          />
        ) : null}

        {WORK_SLOTS.map((s, i) =>
          s.videoSrc ? (
            <CarouselVideo
              key={s.id}
              src={s.videoSrc}
              isActive={i === index}
              enabled={videosEnabled}
            />
          ) : (
            <PlaceholderSlide
              key={s.id}
              label={s.label}
              isActive={i === index}
            />
          ),
        )}

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-30 flex size-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/75 backdrop-blur-md transition hover:border-white/25 hover:bg-black/65 hover:text-white sm:left-3 md:left-5"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-30 flex size-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/75 backdrop-blur-md transition hover:border-white/25 hover:bg-black/65 hover:text-white sm:right-3 md:right-5"
          aria-label="Next"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-5 flex max-w-full flex-col items-center gap-3 sm:mt-6 md:mt-7">
        {caption}
        <motion.div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 px-1">
          {WORK_SLOTS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className="flex h-9 min-w-9 items-center justify-center rounded-full p-2"
              aria-label={s.label}
              aria-current={i === index}
            >
              {i === index ? (
                <motion.span
                  layoutId="work-carousel-dot"
                  className="h-2 w-8 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7dd3fc]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors hover:bg-white/45" />
              )}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PlaceholderSlide({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-[#06060a] transition-opacity duration-300 ${
        isActive ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
      aria-hidden={!isActive}
    >
      <div
        className="absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 25% 35%, rgba(139,124,246,0.2), transparent 50%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(125,211,252,0.12), transparent 50%)",
        }}
      />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
        {label}
      </span>
    </div>
  );
}
