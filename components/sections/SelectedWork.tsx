"use client";

import { motion } from "framer-motion";

import { WorkCarousel } from "@/components/sections/WorkCarousel";
import { DirectionalInView } from "@/components/ui/DirectionalInView";
import { SectionReveal } from "@/components/ui/SectionReveal";
import {
  directionalScaleIn,
  directionalStaggerItem,
  staggerContainer,
} from "@/lib/motion";

export function SelectedWork() {
  return (
    <section id="work" className="relative border-t border-white/[0.05] bg-transparent">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 40% at 100% 0%, rgba(125,211,252,0.06), transparent 50%)",
        }}
        aria-hidden
      />

      <SectionReveal className="relative mx-auto max-w-[1200px] px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 md:px-16 md:pb-32 md:pt-28 lg:px-20">
        <DirectionalInView
          className="mx-auto min-w-0 max-w-2xl text-center"
          variants={staggerContainer}
        >
          <motion.p
            variants={directionalStaggerItem}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#a78bfa]/90"
          >
            Selected work
          </motion.p>
          <motion.h2
            variants={directionalStaggerItem}
            className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.035em] text-white"
          >
            Proof, not promises.
          </motion.h2>
          <motion.p
            variants={directionalStaggerItem}
            className="mx-auto mt-4 max-w-md px-1 font-sans text-sm leading-relaxed text-white/45 md:text-[15px]"
          >
            Swipe or use arrows.
          </motion.p>
        </DirectionalInView>

        <DirectionalInView
          className="mt-10 min-w-0 sm:mt-14 md:mt-16"
          variants={directionalScaleIn}
        >
          <WorkCarousel />
        </DirectionalInView>
      </SectionReveal>
    </section>
  );
}
