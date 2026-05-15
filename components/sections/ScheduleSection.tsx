"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { CALENDLY_EMBED_URL } from "@/lib/constants";
import { directionalStaggerItem } from "@/lib/motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const SCHEDULE_COPY = {
  title: "Book your call",
  body: "Pick a time that works for you. We'll confirm the details by email.",
} as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const rise = directionalStaggerItem;

export function ScheduleSection() {
  const reduceMotion = useReducedMotion();
  const scrollDir = useScrollDirection();

  return (
    <section
      id="schedule"
      className="relative overflow-hidden border-t border-white/[0.06] bg-transparent pb-[max(6rem,env(safe-area-inset-bottom,0px)+3.5rem)] pt-16 md:pb-36 md:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 85% 55% at 50% 120%, rgba(139, 124, 246, 0.22), transparent 55%),
            radial-gradient(ellipse 50% 45% at 15% 20%, rgba(125, 211, 252, 0.12), transparent 50%),
            radial-gradient(ellipse 45% 40% at 90% 10%, rgba(167, 139, 250, 0.1), transparent 45%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"
        aria-hidden
      />

      <SectionReveal className="relative mx-auto max-w-[920px] min-w-0 px-4 sm:px-8 md:px-12">
        {reduceMotion ? (
          <div className="py-4">
            <h1 className="font-display text-center text-[clamp(2.5rem,8vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              <span className="bg-gradient-to-r from-[#f5f3ff] via-[#c4b5fd] to-[#7dd3fc] bg-clip-text text-transparent">
                {SCHEDULE_COPY.title}
              </span>
            </h1>
            <p className="mx-auto mt-10 max-w-[36rem] text-center font-sans text-[clamp(1.05rem,3.2vw,1.35rem)] leading-relaxed text-white/70">
              {SCHEDULE_COPY.body}
            </p>
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0f]/90 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-3">
              <CalendlyEmbed url={CALENDLY_EMBED_URL} />
            </div>
          </div>
        ) : (
          <motion.div
            className="py-4 md:py-6"
            custom={scrollDir}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={rise} className="relative">
              <motion.span
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-[2rem] opacity-60 blur-3xl md:-inset-x-16"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(139,124,246,0.35), rgba(125,211,252,0.15), transparent 70%)",
                }}
                animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.03, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <h1 className="font-display relative text-center text-[clamp(2.5rem,8vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                <span className="bg-gradient-to-r from-[#f5f3ff] via-[#c4b5fd] to-[#7dd3fc] bg-clip-text text-transparent">
                  {SCHEDULE_COPY.title}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={rise}
              className="mx-auto mt-10 max-w-[36rem] text-center font-sans text-[clamp(1.05rem,3.2vw,1.35rem)] leading-relaxed text-white/72 [text-wrap:balance]"
            >
              {SCHEDULE_COPY.body}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-12 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0f]/90 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-3"
            >
              <CalendlyEmbed url={CALENDLY_EMBED_URL} />
            </motion.div>
          </motion.div>
        )}
      </SectionReveal>
    </section>
  );
}
