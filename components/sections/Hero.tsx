"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  HERO_COPY,
  HERO_PRIMARY_HREF,
  HERO_PRIMARY_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/constants";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { CtaButton } from "@/components/ui/CtaButton";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";

function goToHash(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (!hash) return;
  history.pushState(null, "", href);
  scrollToId(hash);
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);

  const onVideoError = useCallback(() => {
    setVideoOk(false);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#020202]"
      aria-label="Hero"
    >
      {videoOk ? <HeroVideo onError={onVideoError} /> : null}

      <div
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

      <div
        className="absolute inset-0 z-[2] bg-black/45 md:bg-black/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_62%_52%_at_50%_46%,rgba(4,4,10,0.72),rgba(4,4,10,0.22)_56%,transparent_76%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#030303] via-transparent to-black/50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full min-w-0 max-w-[1180px] flex-col items-center justify-center px-5 pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+4rem)] pt-[max(5.25rem,env(safe-area-inset-top,0px)+4.25rem)] text-center sm:px-10 md:px-16">
        <motion.div
          className="flex flex-col items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.p
            className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#d4c4ff] sm:text-[11px]"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          >
            {HERO_COPY.eyebrow}
          </motion.p>

          <motion.span
            className="mt-5 h-px w-10 bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent sm:mt-6 sm:w-12"
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            aria-hidden
          />

          <motion.h1
            className="font-display m-0 mt-7 w-full max-w-[min(100%,58rem)] text-[clamp(1.15rem,4.6vw,4.15rem)] font-extrabold leading-[1.18] tracking-[-0.022em] text-white [text-shadow:0_8px_40px_rgba(0,0,0,0.45)] sm:mt-8 sm:text-[clamp(1.85rem,5.8vw,4.15rem)]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
          >
            <span className="block whitespace-nowrap">{HERO_COPY.headlineLead}</span>
            <span className="mt-1 block bg-gradient-to-r from-[#e9d5ff] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent sm:mt-1.5">
              {HERO_COPY.headlineAccent}
            </span>
          </motion.h1>

          <motion.div
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.52 }}
          >
            <CtaButton
              href={HERO_PRIMARY_HREF}
              onClick={(e) => {
                e.preventDefault();
                goToHash(HERO_PRIMARY_HREF);
              }}
            >
              {HERO_PRIMARY_LABEL}
            </CtaButton>
            <CtaButton
              href={SECONDARY_CTA_HREF}
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                goToHash(SECONDARY_CTA_HREF);
              }}
            >
              {SECONDARY_CTA_LABEL}
            </CtaButton>
          </motion.div>

          <motion.p
            className="mt-8 font-sans text-[13px] tracking-[-0.01em] text-white/58 sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            {HERO_COPY.support}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
