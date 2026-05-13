"use client";

import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  {
    className:
      "left-[-12%] top-[6%] h-[min(55vw,28rem)] w-[min(55vw,28rem)] bg-[#8b7cf6]/[0.11]",
    duration: 22,
    drift: { x: [0, 36, 12, 0], y: [0, -28, 10, 0] },
  },
  {
    className:
      "right-[-8%] top-[32%] h-[min(48vw,24rem)] w-[min(48vw,24rem)] bg-[#7dd3fc]/[0.09]",
    duration: 26,
    drift: { x: [0, -28, -8, 0], y: [0, 22, -12, 0] },
  },
  {
    className:
      "bottom-[18%] left-[28%] h-[min(40vw,18rem)] w-[min(40vw,18rem)] bg-[#a78bfa]/[0.08]",
    duration: 20,
    drift: { x: [0, 20, -16, 0], y: [0, 18, -8, 0] },
  },
];

const GLOW_DOTS = [
  { left: "12%", top: "14%", delay: 0, color: "rgba(167,139,250,0.55)" },
  { left: "78%", top: "22%", delay: 1.2, color: "rgba(125,211,252,0.5)" },
  { left: "44%", top: "48%", delay: 0.6, color: "rgba(196,181,253,0.45)" },
  { left: "88%", top: "62%", delay: 2, color: "rgba(125,211,252,0.4)" },
  { left: "22%", top: "72%", delay: 1.5, color: "rgba(139,124,246,0.5)" },
  { left: "62%", top: "85%", delay: 0.9, color: "rgba(186,230,253,0.4)" },
] as const;

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Dot grid — lavender */}
      <motion.div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 72%)",
        }}
        animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 48, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Dot grid — cyan, offset layer */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(125,211,252,0.1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "12px 12px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
        animate={
          reduceMotion ? undefined : { backgroundPosition: ["12px 12px", "48px 48px"] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 56, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Soft gradient wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(139,124,246,0.06), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 50%, rgba(125,211,252,0.04), transparent 50%)",
        }}
      />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] sm:blur-[110px] ${orb.className}`}
          animate={reduceMotion ? undefined : orb.drift}
          transition={
            reduceMotion
              ? undefined
              : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Sparse glowing accent dots */}
      {GLOW_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            background: dot.color,
            boxShadow: `0 0 12px 3px ${dot.color}`,
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.25, 0.85, 0.35], scale: [1, 1.35, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay,
                }
          }
        />
      ))}

      {/* Top fade — blends out of hero */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030303] to-transparent sm:h-40"
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030303] to-transparent"
      />
    </div>
  );
}
