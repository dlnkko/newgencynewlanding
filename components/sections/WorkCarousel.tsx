"use client";

import { useCallback, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { WORK_SLOTS } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const N = WORK_SLOTS.length;

function directionBetween(from: number, to: number): number {
  const forward = (to - from + N) % N;
  return forward <= N / 2 ? 1 : -1;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 48 : -48,
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: EASE },
  }),
};

function SlideCaption({ label, index }: { label: string; index: number }) {
  return (
    <div className="flex w-full flex-col items-center gap-1 px-2 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a78bfa]/80">
        {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
      </span>
      <p className="max-w-2xl bg-gradient-to-r from-[#f5f3ff] via-[#ddd6fe] to-[#7dd3fc] bg-clip-text font-display text-[clamp(1rem,3.5vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-transparent [text-wrap:balance]">
        {label}
      </p>
    </div>
  );
}

export function WorkCarousel() {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setSlide] = useState([0, 0]);
  const slot = WORK_SLOTS[index]!;

  const goTo = useCallback(
    (to: number) => {
      const next = ((to % N) + N) % N;
      if (next === index) return;
      setSlide([next, directionBetween(index, next)]);
    },
    [index],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const t = info.offset.x + info.velocity.x * 0.15;
    if (t < -40) goNext();
    else if (t > 40) goPrev();
  };

  const caption = reduceMotion ? (
    <SlideCaption label={slot.label} index={index} />
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${slot.id}-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="w-full"
      >
        <SlideCaption label={slot.label} index={index} />
      </motion.div>
    </AnimatePresence>
  );

  if (reduceMotion) {
    return (
      <motion.div className="relative mx-auto w-full max-w-5xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080a]">
          <SlideContent slot={slot} showOverlayLabel={false} />
        </div>
        <motion.div className="mt-6">{caption}</motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative mx-auto w-full max-w-5xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#030305] shadow-[0_48px_120px_-48px_rgba(0,0,0,0.85)]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${slot.id}-${index}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab touch-manipulation active:cursor-grabbing"
          >
            <SlideContent slot={slot} showOverlayLabel={false} />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-20 flex size-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/75 backdrop-blur-md transition hover:border-white/25 hover:bg-black/65 hover:text-white sm:left-3 md:left-5 md:size-11"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-20 flex size-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/75 backdrop-blur-md transition hover:border-white/25 hover:bg-black/65 hover:text-white sm:right-3 md:right-5 md:size-11"
          aria-label="Next"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <motion.div className="mt-6 flex max-w-full flex-col items-center gap-4 sm:mt-7 md:mt-9">
        {caption}
        <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 px-1">
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
        </div>
      </motion.div>
    </motion.div>
  );
}

function SlideContent({
  slot,
  showOverlayLabel,
}: {
  slot: (typeof WORK_SLOTS)[number];
  showOverlayLabel: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      {slot.videoSrc ? (
        <video
          className="h-full w-full object-cover"
          src={slot.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <motion.div className="flex h-full w-full items-center justify-center bg-[#06060a]">
          <div
            className="absolute inset-0 opacity-[0.65]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 25% 35%, rgba(139,124,246,0.2), transparent 50%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(125,211,252,0.12), transparent 50%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-2 px-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
              {slot.label}
            </span>
          </div>
        </motion.div>
      )}
      {showOverlayLabel ? (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-black via-black/70 to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex w-full min-w-0 px-4 pb-4 sm:px-6 sm:pb-5">
            <span className="font-display text-sm leading-snug text-white sm:text-base">
              {slot.label}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
