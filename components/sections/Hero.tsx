"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { HERO_HEADLINE_WORDS, HERO_SUBLINE } from "@/lib/constants";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { EASE } from "@/lib/motion";

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.72,
      ease: EASE,
    },
  }),
};

const ctaClass =
  "inline-flex min-h-[48px] w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#7dd3fc] px-7 py-3 font-sans text-[14px] font-semibold text-[#0a0a0f] sm:w-auto sm:px-9 sm:text-[15px]";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);

  const onVideoError = useCallback(() => {
    setVideoOk(false);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#020202]"
      aria-label="Hero"
    >
      {videoOk ? <HeroVideo onError={onVideoError} /> : null}

      <motion.div
        className="absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          opacity: videoOk ? 0 : 1,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139, 124, 246, 0.3), transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 60%, rgba(125, 211, 252, 0.2), transparent 50%),
            linear-gradient(165deg, #050508 0%, #120a1a 50%, #050810 100%)
          `,
        }}
        aria-hidden
      />

      <motion.div className="absolute inset-0 z-[2] bg-black/82" aria-hidden />
      <motion.div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(139,124,246,0.18),transparent_55%)]"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_50%_40%_at_90%_15%,rgba(125,211,252,0.08),transparent_45%)]"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-transparent to-black/50"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full min-w-0 max-w-[1200px] flex-col items-center justify-center px-4 pb-[max(6rem,env(safe-area-inset-bottom,0px)+4.5rem)] pt-[max(5.5rem,env(safe-area-inset-top,0px)+4rem)] text-center sm:px-10 md:px-16 md:pb-24 md:pt-28"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h1 className="font-display m-0 flex w-full min-w-0 max-w-[min(100%,42rem)] flex-wrap items-baseline justify-center gap-x-[0.22em] gap-y-1.5 text-[clamp(1.55rem,6.2vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.045em] [overflow-wrap:anywhere] sm:max-w-[min(100%,48rem)] sm:gap-x-[0.26em] md:gap-x-[0.3em] md:gap-y-2">
          {HERO_HEADLINE_WORDS.map((word, i) => {
            const isFuture = word.toLowerCase() === "future";
            const content = (
              <span
                className={
                  isFuture
                    ? "inline-block bg-gradient-to-r from-[#e9d5ff] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent"
                    : "inline-block text-white/[0.94]"
                }
              >
                {word}
              </span>
            );

            if (reduceMotion) {
              return (
                <span key={`${word}-${i}`} className="inline-block">
                  {content}
                </span>
              );
            }

            return (
              <motion.span
                key={`${word}-${i}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block"
              >
                {content}
              </motion.span>
            );
          })}
        </h1>

        {reduceMotion ? (
          <p className="mt-7 max-w-[min(100%,34rem)] px-1 font-sans text-[clamp(0.95rem,2.8vw,1.125rem)] leading-relaxed text-white/55 md:mt-9">
            {HERO_SUBLINE}
          </p>
        ) : (
          <motion.p
            className="mt-7 max-w-[min(100%,34rem)] px-1 font-sans text-[clamp(0.95rem,2.8vw,1.125rem)] leading-relaxed text-white/55 md:mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.65, ease: EASE }}
          >
            {HERO_SUBLINE}
          </motion.p>
        )}

        {reduceMotion ? (
          <div className="mt-8 flex w-full justify-center sm:mt-10 md:mt-9">
            <a href="#apply" className={ctaClass}>
              Work with us ↗
            </a>
          </div>
        ) : (
          <motion.div
            className="mt-8 flex w-full justify-center sm:mt-10 md:mt-9"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
          >
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`${ctaClass} shadow-[0_0_36px_rgba(139,124,246,0.3)]`}
            >
              Work with us ↗
            </motion.a>
          </motion.div>
        )}

        <motion.div
          className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.75rem)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.75 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/28">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/35 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
