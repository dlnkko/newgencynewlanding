"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

import { buttonHover, buttonTap, buttonTransition } from "@/lib/motion";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const variants = {
  primary:
    "cta-shine cta-shine--primary bg-gradient-to-r from-[#8b7cf6] to-[#7dd3fc] text-[#0a0a0f] shadow-[0_0_28px_rgba(139,124,246,0.28)]",
  secondary:
    "cta-shine border border-white/70 bg-white text-[#0a0a0f] shadow-[0_12px_36px_-16px_rgba(255,255,255,0.45)]",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: CtaButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : buttonHover}
      whileTap={reduceMotion ? undefined : buttonTap}
      transition={buttonTransition}
      className={`inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 font-sans text-[13px] font-semibold sm:min-h-[48px] sm:px-8 sm:text-[15px] ${variants[variant]} ${className}`.trim()}
    >
      <span className="relative z-[1]">{children}</span>
    </motion.a>
  );
}
