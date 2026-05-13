"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { SECTION_VIEWPORT } from "@/lib/motion";

type DirectionalInViewProps = {
  children: ReactNode;
  className?: string;
  variants: Variants;
};

export function DirectionalInView({
  children,
  className,
  variants,
}: DirectionalInViewProps) {
  const dir = useScrollDirection();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={dir}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={SECTION_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
