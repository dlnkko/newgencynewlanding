"use client";

import { motion } from "framer-motion";

import { OFFER_COPY } from "@/lib/constants";
import { DirectionalInView } from "@/components/ui/DirectionalInView";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { directionalStaggerItem, staggerContainer } from "@/lib/motion";

export function OfferSection() {
  return (
    <section
      id="offer"
      className="relative border-t border-white/[0.05] bg-transparent"
      aria-label="The offer"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(139,124,246,0.08), transparent 55%)",
        }}
        aria-hidden
      />

      <SectionReveal className="relative mx-auto max-w-[960px] px-4 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24">
        <DirectionalInView
          className="mx-auto max-w-2xl text-center"
          variants={staggerContainer}
        >
          <motion.p
            variants={directionalStaggerItem}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#7dd3fc]/90"
          >
            {OFFER_COPY.eyebrow}
          </motion.p>
          <motion.h2
            variants={directionalStaggerItem}
            className="font-display mt-4 text-[clamp(1.7rem,3.8vw,2.45rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-white [text-wrap:balance]"
          >
            {OFFER_COPY.heading}
          </motion.h2>
          <motion.p
            variants={directionalStaggerItem}
            className="mx-auto mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-white/50 md:text-base"
          >
            {OFFER_COPY.lead}
          </motion.p>
        </DirectionalInView>

        <DirectionalInView
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4"
          variants={staggerContainer}
        >
          {OFFER_COPY.items.map((item) => (
            <motion.article
              key={item.title}
              variants={directionalStaggerItem}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-6 text-left sm:px-5 sm:py-7"
            >
              <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-white sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/45">
                {item.body}
              </p>
            </motion.article>
          ))}
        </DirectionalInView>

        <p className="mx-auto mt-8 max-w-lg text-center font-sans text-[13px] leading-relaxed text-white/38 sm:mt-10">
          {OFFER_COPY.note}
        </p>
      </SectionReveal>
    </section>
  );
}
