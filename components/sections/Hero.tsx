"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  HERO_COPY,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/constants";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";

const primaryCtaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#7dd3fc] px-6 py-2.5 font-sans text-[13px] font-semibold text-[#0a0a0f] shadow-[0_0_36px_rgba(139,124,246,0.3)] sm:min-h-[48px] sm:px-8 sm:text-[15px]";

const secondaryCtaClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/40 bg-white/12 px-6 py-2.5 font-sans text-[13px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/18 sm:min-h-[48px] sm:px-8 sm:text-[15px]";

function goToHash(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (!hash) return;
  history.pushState(null, "", href);
  scrollToId(hash);
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const [watching, setWatching] = useState(false);

  const onVideoError = useCallback(() => {
    setVideoOk(false);
    setWatching(false);
  }, []);

  return (
    <section
      id="hero"
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

      <motion.div
        className="absolute inset-0 z-[2] bg-black/50 md:bg-black/55"
        animate={{ opacity: watching ? 0.12 : 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_68%_58%_at_50%_48%,rgba(3,3,8,0.78),rgba(3,3,8,0.28)_58%,transparent_78%)]"
        animate={{ opacity: watching ? 0 : 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/20 to-black/55"
        animate={{ opacity: watching ? 0.28 : 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full min-w-0 max-w-[1100px] flex-col items-center justify-center px-4 pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+4rem)] pt-[max(4.75rem,env(safe-area-inset-top,0px)+3.25rem)] text-center sm:px-8 md:px-16 md:pb-24 md:pt-28"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: watching ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ pointerEvents: watching ? "none" : "auto" }}
        aria-hidden={watching}
      >
        <div
          className="w-full max-w-[42rem] rounded-[1.75rem] border border-white/[0.12] bg-[#07070c]/72 px-5 py-8 shadow-[0_40px_90px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:px-10 sm:py-11 md:px-12 md:py-12"
        >
          <motion.p
            className="max-w-[36rem] font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-[#d4c4ff] sm:text-[11px] sm:tracking-[0.22em]"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          >
            {HERO_COPY.eyebrow}
          </motion.p>

          <motion.h1
            className="font-display m-0 mt-5 text-[clamp(1.7rem,5.6vw,3.15rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-white [text-wrap:balance] sm:mt-6"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          >
            {HERO_COPY.headlineLead}{" "}
            <span className="bg-gradient-to-r from-[#e9d5ff] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent">
              {HERO_COPY.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-[34rem] font-sans text-[clamp(0.95rem,2.6vw,1.125rem)] leading-relaxed text-white/78 [text-wrap:pretty] md:mt-7"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.32 }}
          >
            {HERO_COPY.description}
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-3.5"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
          >
            <motion.a
              href={PRIMARY_CTA_HREF}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={primaryCtaClass}
              onClick={(e) => {
                e.preventDefault();
                goToHash(PRIMARY_CTA_HREF);
              }}
            >
              {PRIMARY_CTA_LABEL}
            </motion.a>
            <motion.a
              href={SECONDARY_CTA_HREF}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={secondaryCtaClass}
              onClick={(e) => {
                e.preventDefault();
                goToHash(SECONDARY_CTA_HREF);
              }}
            >
              {SECONDARY_CTA_LABEL}
            </motion.a>
          </motion.div>

          <motion.p
            className="mt-6 font-sans text-[13px] leading-relaxed text-white/55 sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.68 }}
          >
            {HERO_COPY.support}
          </motion.p>
        </div>

        {videoOk ? (
          <button
            type="button"
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 underline-offset-4 transition-colors hover:text-white/85 hover:underline"
            onClick={() => setWatching(true)}
          >
            {HERO_COPY.watchReel}
          </button>
        ) : null}
      </motion.div>

      <AnimatePresence>
        {watching ? (
          <motion.button
            type="button"
            key="show-copy"
            className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,0px)+1rem)] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 font-sans text-[13px] font-medium text-white/90 backdrop-blur-md"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => setWatching(false)}
          >
            {HERO_COPY.showCopy}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
