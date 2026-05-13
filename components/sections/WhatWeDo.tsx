"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { WHAT_WE_DO_INTRO, WHAT_WE_DO_ROWS } from "@/lib/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import {
  EASE,
  ROW_VIEWPORT,
  SECTION_VIEWPORT,
  directionalFadeLeft,
  type ScrollDir,
} from "@/lib/motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

function rowVariants(index: number, dir: ScrollDir): Variants {
  const enterY = dir === "down" ? 22 : -18;

  const presets: Variants[] = [
    {
      hidden: { opacity: 0, x: -32, y: enterY },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.62, ease: EASE },
      },
    },
    {
      hidden: { opacity: 0, x: 32, y: enterY, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.65, ease: EASE },
      },
    },
    {
      hidden: { opacity: 0, y: enterY + 8, scale: 0.97 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.68, ease: EASE },
      },
    },
  ];

  return presets[index] ?? presets[0]!;
}

function WhatWeDoRow({
  item,
  index,
}: {
  item: (typeof WHAT_WE_DO_ROWS)[number];
  index: number;
}) {
  const dir = useScrollDirection();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="group border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0 md:py-12">
        <RowContent item={item} />
      </div>
    );
  }

  return (
    <motion.div
      custom={dir}
      variants={rowVariants(index, dir)}
      initial="hidden"
      whileInView="visible"
      viewport={ROW_VIEWPORT}
      className="group border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0 md:py-12"
    >
      <RowContent item={item} animated />
    </motion.div>
  );
}

function RowContent({
  item,
  animated = false,
}: {
  item: (typeof WHAT_WE_DO_ROWS)[number];
  animated?: boolean;
}) {
  const inner = (
    <div className="flex gap-4 sm:gap-6 md:gap-10">
      <motion.span
        className="shrink-0 font-mono text-[11px] tabular-nums text-white/25 sm:text-xs md:pt-1"
        initial={animated ? { opacity: 0, scale: 0.85 } : false}
        whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
        viewport={ROW_VIEWPORT}
        transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
        whileHover={{ color: "rgba(167,139,250,1)" }}
      >
        {item.kicker}
      </motion.span>
      <div className="min-w-0 flex-1">
        <motion.h3
          className="font-display text-xl font-medium tracking-[-0.02em] text-white md:text-2xl"
          initial={animated ? { opacity: 0, y: 10 } : false}
          whileInView={animated ? { opacity: 1, y: 0 } : undefined}
          viewport={ROW_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-white/42 md:mt-3.5 md:text-base md:leading-relaxed"
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={animated ? { opacity: 1, y: 0 } : undefined}
          viewport={ROW_VIEWPORT}
          transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
        >
          {item.body}
        </motion.p>
      </div>
    </div>
  );

  if (!animated) return inner;

  return (
    <motion.div
      className="relative"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <motion.span
        className="pointer-events-none absolute -left-1 top-0 h-full w-px origin-top bg-gradient-to-b from-[#a78bfa]/0 via-[#a78bfa]/50 to-[#7dd3fc]/0"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={ROW_VIEWPORT}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        aria-hidden
      />
      {inner}
    </motion.div>
  );
}

export function WhatWeDo() {
  const dir = useScrollDirection();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="what-we-do"
      className="relative border-t border-white/[0.05] bg-transparent"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b7cf6]/40 to-transparent"
        aria-hidden
      />

      <SectionReveal className="relative mx-auto max-w-[1100px] px-4 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28 md:pl-16 md:pr-20 lg:py-32">
        <motion.div className="min-w-0 md:flex md:items-start md:justify-between md:gap-16 lg:gap-24">
          {reduceMotion ? (
            <div className="md:sticky md:top-28 md:max-w-[min(100%,380px)] md:shrink-0 lg:max-w-[420px]">
              <IntroCopy />
            </div>
          ) : (
            <motion.div
              custom={dir}
              variants={directionalFadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
              className="md:sticky md:top-28 md:max-w-[min(100%,380px)] md:shrink-0 lg:max-w-[420px]"
            >
              <IntroCopy />
            </motion.div>
          )}

          <div className="mt-14 md:mt-0 md:min-w-0 md:flex-1">
            <motion.div className="space-y-0">
              {WHAT_WE_DO_ROWS.map((item, index) => (
                <WhatWeDoRow key={item.kicker} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </SectionReveal>
    </section>
  );
}

function IntroCopy() {
  return (
    <>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#7dd3fc]/90">
        {WHAT_WE_DO_INTRO.eyebrow}
      </p>
      <h2 className="font-display mt-6 text-[clamp(1.45rem,4.2vw,2.35rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white [text-wrap:balance]">
        {WHAT_WE_DO_INTRO.lead}
      </h2>
      <p className="mt-3 font-sans text-[15px] font-medium leading-snug text-white/70 md:text-base">
        {WHAT_WE_DO_INTRO.subline}
      </p>
    </>
  );
}
