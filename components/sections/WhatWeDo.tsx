"use client";

import { motion } from "framer-motion";

import { WHAT_WE_DO_INTRO, WHAT_WE_DO_ROWS } from "@/lib/constants";
import {
  EASE,
  directionalFadeLeft,
  directionalStaggerItem,
  staggerContainer,
} from "@/lib/motion";
import { DirectionalInView } from "@/components/ui/DirectionalInView";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative border-t border-white/[0.05] bg-transparent"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b7cf6]/40 to-transparent"
        aria-hidden
      />

      <SectionReveal className="relative mx-auto max-w-[1100px] px-4 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28 md:pl-16 md:pr-20 lg:py-32">
        <DirectionalInView
          className="min-w-0 md:flex md:items-start md:justify-between md:gap-16 lg:gap-24"
          variants={staggerContainer}
        >
          <motion.div
            variants={directionalFadeLeft}
            className="md:sticky md:top-28 md:max-w-[min(100%,380px)] md:shrink-0 lg:max-w-[420px]"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#7dd3fc]/90">
              {WHAT_WE_DO_INTRO.eyebrow}
            </p>
            <h2 className="font-display mt-6 text-[clamp(1.45rem,4.2vw,2.35rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white [text-wrap:balance]">
              {WHAT_WE_DO_INTRO.lead}
            </h2>
            <p className="mt-3 font-sans text-[15px] font-medium leading-snug text-white/70 md:text-base">
              {WHAT_WE_DO_INTRO.subline}
            </p>
          </motion.div>

          <motion.div
            className="mt-14 md:mt-0 md:min-w-0 md:flex-1"
            variants={staggerContainer}
          >
            <div className="space-y-0">
              {WHAT_WE_DO_ROWS.map((item) => (
                <motion.div
                  key={item.kicker}
                  variants={directionalStaggerItem}
                  className="group border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0 md:py-12"
                >
                  <motion.div
                    className="flex gap-4 sm:gap-6 md:gap-10"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/25 transition-colors group-hover:text-[#a78bfa] sm:text-xs md:pt-1">
                      {item.kicker}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-white transition-colors group-hover:text-white md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-white/42 md:mt-3.5 md:text-base md:leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DirectionalInView>
      </SectionReveal>
    </section>
  );
}
