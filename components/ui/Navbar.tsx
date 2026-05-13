"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { NAV_ITEMS } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const navContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function NavLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      variants={navItem}
      className={`group relative font-sans text-[15px] font-medium transition-[filter] duration-300 ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="bg-gradient-to-r from-[#ddd6fe] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#f5f3ff] group-hover:via-[#c4b5fd] group-hover:to-[#bae6fd]">
        {label}
      </span>
      <span
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#a78bfa] to-[#7dd3fc] transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
    </motion.a>
  );
}

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full max-w-[100vw] border-b border-white/[0.08]"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(3, 3, 3, 0.72)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16 lg:px-20">
        <div className="flex min-h-[56px] items-center justify-between gap-3 py-2 md:h-[72px] md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link
              href="#"
              aria-label="Newgency home"
              className="min-w-0 shrink-0 select-none transition-opacity hover:opacity-90"
            >
              <span
                className="text-[clamp(1.125rem,4vw,1.5rem)] leading-none tracking-[-0.035em]"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 400,
                  background: "linear-gradient(135deg, #c4b5fd, #7dd3fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                newgency
              </span>
            </Link>
          </motion.div>

          <motion.nav
            className="hidden items-center gap-8 md:flex lg:gap-10"
            variants={navContainer}
            initial="hidden"
            animate="visible"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </motion.nav>

          <motion.a
            href="#apply"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#7dd3fc] px-4 py-2.5 text-sm font-semibold text-[#0a0a0f] shadow-[0_0_28px_rgba(139,124,246,0.35)] sm:gap-2 sm:px-7 sm:py-3 sm:text-[15px] sm:hover:shadow-[0_0_40px_rgba(125,211,252,0.35)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span className="sm:hidden">Hire us</span>
            <span className="hidden sm:inline">
              Hire us <span className="text-[17px] leading-none">↗</span>
            </span>
            <span className="text-[15px] leading-none sm:hidden">↗</span>
          </motion.a>
        </div>

        <motion.nav
          className="flex items-stretch justify-center gap-0.5 border-t border-white/[0.06] py-2 sm:gap-1 md:hidden"
          aria-label="Primary"
          variants={navContainer}
          initial="hidden"
          animate="visible"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              className="flex min-h-[44px] min-w-0 flex-1 touch-manipulation items-center justify-center rounded-full px-1.5 text-center text-[11px] leading-snug [text-wrap:balance] active:bg-white/[0.04] sm:px-2 sm:text-[13px]"
            />
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
