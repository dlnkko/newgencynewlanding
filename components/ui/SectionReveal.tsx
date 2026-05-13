"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { SECTION_VIEWPORT, directionalReveal } from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className }: SectionRevealProps) {
  const dir = useScrollDirection();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={dir}
      variants={directionalReveal}
      initial="hidden"
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
