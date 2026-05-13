"use client";

import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  {
    className:
      "left-[-15%] top-[4%] h-[min(50vw,22rem)] w-[min(50vw,22rem)] bg-[#8b7cf6]/[0.14]",
    duration: 16,
    drift: { x: [0, 48, 20, 0], y: [0, -36, 14, 0] },
  },
  {
    className:
      "right-[-10%] top-[28%] h-[min(44vw,20rem)] w-[min(44vw,20rem)] bg-[#7dd3fc]/[0.12]",
    duration: 19,
    drift: { x: [0, -40, -12, 0], y: [0, 30, -16, 0] },
  },
  {
    className:
      "bottom-[12%] left-[20%] h-[min(38vw,16rem)] w-[min(38vw,16rem)] bg-[#a78bfa]/[0.1]",
    duration: 14,
    drift: { x: [0, 28, -22, 0], y: [0, 24, -10, 0] },
  },
];

const GLOW_DOTS = [
  { left: "8%", top: "12%", delay: 0, color: "rgba(167,139,250,0.7)" },
  { left: "72%", top: "18%", delay: 0.8, color: "rgba(125,211,252,0.65)" },
  { left: "38%", top: "42%", delay: 0.4, color: "rgba(196,181,253,0.6)" },
  { left: "92%", top: "55%", delay: 1.6, color: "rgba(125,211,252,0.55)" },
  { left: "18%", top: "68%", delay: 1.1, color: "rgba(139,124,246,0.65)" },
  { left: "58%", top: "78%", delay: 0.6, color: "rgba(186,230,253,0.55)" },
  { left: "85%", top: "38%", delay: 2, color: "rgba(167,139,250,0.5)" },
  { left: "28%", top: "88%", delay: 1.4, color: "rgba(125,211,252,0.5)" },
];

/** Slow-drifting particles that cross the viewport */
const DRIFTERS = [
  { size: 3, left: "5%", top: "20%", x: [0, 120, 240], y: [0, -40, 0], dur: 28 },
  { size: 2, left: "70%", top: "30%", x: [0, -90, -180], y: [0, 50, 0], dur: 32 },
  { size: 4, left: "40%", top: "60%", x: [0, 80, 160], y: [0, -60, -20], dur: 24 },
  { size: 2, left: "90%", top: "70%", x: [0, -100, -200], y: [0, -30, 0], dur: 36 },
  { size: 3, left: "15%", top: "50%", x: [0, 60, 140], y: [0, 40, 80], dur: 30 },
];

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Dot grid — lavender */}
      <motion.div
        className="absolute inset-0 opacity-[0.7]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 95% 80% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 80% at 50% 40%, black 20%, transparent 75%)",
        }}
        animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "24px 24px"] }}
        transition={
          reduceMotion ? undefined : { duration: 32, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Dot grid — cyan, counter-drift */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(125,211,252,0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "8px 8px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        animate={
          reduceMotion ? undefined : { backgroundPosition: ["8px 8px", "-24px -24px"] }
        }
        transition={
          reduceMotion ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Soft gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(139,124,246,0.08), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 50%, rgba(125,211,252,0.06), transparent 50%)",
        }}
      />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-[80px] sm:blur-[100px] ${orb.className}`}
          animate={reduceMotion ? undefined : orb.drift}
          transition={
            reduceMotion
              ? undefined
              : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* Crossing particles */}
      {!reduceMotion &&
        DRIFTERS.map((d, i) => (
          <motion.span
            key={`drift-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-[#c4b5fd] to-[#7dd3fc]"
            style={{
              width: d.size,
              height: d.size,
              left: d.left,
              top: d.top,
              boxShadow: "0 0 10px 2px rgba(167,139,250,0.45)",
            }}
            animate={{ x: d.x, y: d.y, opacity: [0, 0.75, 0.45, 0] }}
            transition={{
              duration: d.dur,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2.5,
            }}
          />
        ))}

      {/* Glowing accent dots */}
      {GLOW_DOTS.map((dot, i) => (
        <motion.span
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? 4 : 3,
            height: i % 2 === 0 ? 4 : 3,
            left: dot.left,
            top: dot.top,
            background: dot.color,
            boxShadow: `0 0 14px 4px ${dot.color}`,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.3, 1, 0.4],
                  scale: [1, 1.5, 1],
                  y: [0, i % 2 === 0 ? -12 : 12, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 3.5 + i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay,
                }
          }
        />
      ))}

      {/* Subtle moving light streaks */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[-20%] top-[25%] h-px w-[45%] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#a78bfa]/30 to-transparent"
            animate={{ x: ["0%", "120%"], opacity: [0, 0.6, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute right-[-20%] top-[58%] h-px w-[40%] rotate-[6deg] bg-gradient-to-r from-transparent via-[#7dd3fc]/25 to-transparent"
            animate={{ x: ["0%", "-130%"], opacity: [0, 0.5, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          />
        </>
      )}

      {/* Top fade — blends out of hero */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent sm:h-36" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030303] to-transparent" />
    </div>
  );
}
