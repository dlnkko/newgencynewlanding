import type { Variants } from "framer-motion";

export type ScrollDir = "up" | "down";

/** Shared editorial easing — smooth on desktop and mobile. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Re-triggers on scroll up & down; tuned for mobile viewports. */
export const SECTION_VIEWPORT = {
  once: false as const,
  amount: 0.14,
  margin: "0px 0px -36px 0px" as const,
};

const yEnter = (dir: ScrollDir, amount: number) =>
  dir === "down" ? amount : -amount;

export const directionalReveal: Variants = {
  hidden: (dir: ScrollDir) => ({
    opacity: 0,
    y: yEnter(dir, 26),
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.03 },
  },
};

export const directionalStaggerItem: Variants = {
  hidden: (dir: ScrollDir) => ({
    opacity: 0,
    y: yEnter(dir, 20),
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const directionalFadeLeft: Variants = {
  hidden: (dir: ScrollDir) => ({
    opacity: 0,
    x: dir === "down" ? -16 : 16,
    y: yEnter(dir, 12),
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.58, ease: EASE },
  },
};

export const directionalScaleIn: Variants = {
  hidden: (dir: ScrollDir) => ({
    opacity: 0,
    scale: 0.98,
    y: yEnter(dir, 22),
  }),
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** @deprecated use directionalReveal */
export const sectionReveal = directionalReveal;

/** @deprecated use directionalStaggerItem */
export const staggerItem = directionalStaggerItem;

/** @deprecated use directionalFadeLeft */
export const fadeSlideLeft = directionalFadeLeft;

/** @deprecated use directionalScaleIn */
export const scaleIn = directionalScaleIn;
