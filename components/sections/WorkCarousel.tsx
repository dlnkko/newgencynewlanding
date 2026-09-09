"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { WORK_SLOTS } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CarouselVideo } from "@/components/ui/CarouselVideo";
import { EASE } from "@/lib/motion";

const N = WORK_SLOTS.length;

export function WorkCarousel() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [restartToken, setRestartToken] = useState(0);
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
    setRestartToken((n) => n + 1);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const inView = root.getBoundingClientRect().top < window.innerHeight;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) < 56) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const isNearby = (i: number) => {
    const dist = Math.min(Math.abs(i - index), N - Math.abs(i - index));
    return dist <= 1;
  };

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
      <div
        className="relative aspect-video w-full cursor-grab overflow-hidden rounded-xl border border-white/[0.08] bg-[#030305] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.8)] active:cursor-grabbing sm:rounded-2xl"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
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
          s.videoSrc && videosEnabled && (i === index || isNearby(i)) ? (
            <CarouselVideo
              key={s.id}
              src={s.videoSrc}
              isActive={i === index}
              enabled={videosEnabled}
              restartToken={restartToken}
              preload={i === index ? "auto" : "metadata"}
            />
          ) : null,
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-3 pb-3 pt-14 sm:px-6 sm:pb-5 sm:pt-16"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 px-3 pb-3 sm:px-6 sm:pb-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slot.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex min-w-0 items-end gap-3 sm:gap-4"
            >
              <BrandLogo
                src={slot.logoSrc}
                alt={slot.label}
                active
                onLight={slot.logoOnLight}
                className="h-8 w-[7.5rem] sm:h-10 sm:w-[10rem]"
              />
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:block">
                {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={goPrev}
          whileHover={reduceMotion ? undefined : { scale: 1.08, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute left-1.5 top-1/2 z-30 flex size-10 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/80 backdrop-blur-md hover:border-white/30 hover:bg-black/65 hover:text-white sm:left-3 md:left-4"
          aria-label="Previous commercial"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </motion.button>
        <motion.button
          type="button"
          onClick={goNext}
          whileHover={reduceMotion ? undefined : { scale: 1.08, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute right-1.5 top-1/2 z-30 flex size-10 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/80 backdrop-blur-md hover:border-white/30 hover:bg-black/65 hover:text-white sm:right-3 md:right-4"
          aria-label="Next commercial"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </motion.button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-5">
        {WORK_SLOTS.map((s, i) => {
          const active = i === index;
          return (
            <motion.button
              key={s.id}
              type="button"
              data-work-thumb={i}
              onClick={() => goTo(i)}
              aria-label={s.label}
              aria-current={active}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`relative flex min-h-[52px] items-center justify-center overflow-hidden rounded-xl border bg-[#07070c] px-3 py-2.5 sm:min-h-[58px] sm:px-3.5 ${
                active
                  ? "border-[#a78bfa]/65 shadow-[0_0_24px_rgba(139,124,246,0.28)]"
                  : "border-white/[0.08] opacity-70 hover:opacity-100 hover:border-white/20"
              }`}
            >
              <BrandLogo
                src={s.logoSrc}
                alt=""
                active={active}
                onLight={s.logoOnLight}
                className="h-7 w-[6.75rem] sm:h-8 sm:w-[7.5rem]"
              />
              {active ? (
                <motion.span
                  layoutId="work-active-bar"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#a78bfa] to-[#7dd3fc]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
