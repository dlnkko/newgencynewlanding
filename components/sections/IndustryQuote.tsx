"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { INDUSTRY_QUOTE, INDUSTRY_QUOTE_VIDEO_SRC } from "@/lib/constants";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { DirectionalInView } from "@/components/ui/DirectionalInView";
import { SectionReveal } from "@/components/ui/SectionReveal";
import {
  directionalStaggerItem,
  staggerContainer,
} from "@/lib/motion";

export function IndustryQuote() {
  const [videoOk, setVideoOk] = useState(true);

  const onVideoError = useCallback(() => {
    setVideoOk(false);
  }, []);

  return (
    <section
      className="relative min-h-[min(88svh,760px)] overflow-hidden border-t border-white/[0.05] bg-[#020202]"
      aria-label="Industry quote"
    >
      {videoOk ? (
        <BackgroundVideo
          src={INDUSTRY_QUOTE_VIDEO_SRC}
          onError={onVideoError}
          stable
        />
      ) : null}

      <div
        className="absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          opacity: videoOk ? 0 : 1,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139, 124, 246, 0.28), transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 60%, rgba(125, 211, 252, 0.18), transparent 50%),
            linear-gradient(165deg, #050508 0%, #120a1a 50%, #050810 100%)
          `,
        }}
        aria-hidden
      />

      <div className="absolute inset-0 z-[2] bg-black/78 md:bg-black/84" aria-hidden />
      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(139,124,246,0.16),transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_50%_40%_at_90%_15%,rgba(125,211,252,0.07),transparent_45%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/35 to-black/55"
        aria-hidden
      />

      <SectionReveal className="relative z-10 mx-auto flex min-h-[min(88svh,760px)] max-w-[900px] items-center px-4 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28">
        <DirectionalInView
          className="relative w-full text-center"
          variants={staggerContainer}
        >
          <motion.p
            variants={directionalStaggerItem}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#7dd3fc]/90"
          >
            The moment
          </motion.p>

          <motion.blockquote
            variants={directionalStaggerItem}
            className="relative mt-8 sm:mt-10"
          >
            <span
              className="pointer-events-none absolute -left-1 top-0 font-display text-[clamp(3rem,12vw,5.5rem)] leading-none text-transparent opacity-[0.22] sm:-left-2"
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa 0%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              aria-hidden
            >
              &ldquo;
            </span>

            <p className="font-display relative text-[clamp(1.35rem,4.8vw,2.15rem)] font-medium leading-[1.28] tracking-[-0.03em] text-white/[0.94] [text-wrap:balance] sm:leading-[1.32]">
              {INDUSTRY_QUOTE.text}
            </p>
          </motion.blockquote>

          <motion.figcaption
            variants={directionalStaggerItem}
            className="mt-8 flex flex-col items-center gap-1.5 sm:mt-10"
          >
            <div
              className="h-px w-12 bg-gradient-to-r from-transparent via-[#a78bfa]/70 to-transparent"
              aria-hidden
            />
            <cite className="not-italic">
              <span className="bg-gradient-to-r from-[#ddd6fe] via-[#a78bfa] to-[#7dd3fc] bg-clip-text font-sans text-[15px] font-semibold tracking-[-0.01em] text-transparent sm:text-base">
                {INDUSTRY_QUOTE.name}
              </span>
            </cite>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
              {INDUSTRY_QUOTE.context}
            </p>
          </motion.figcaption>
        </DirectionalInView>
      </SectionReveal>
    </section>
  );
}
