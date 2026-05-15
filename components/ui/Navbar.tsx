"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full max-w-[100vw] border-b border-white/[0.08]"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(3, 3, 3, 0.82)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16 lg:px-20">
        <div className="flex h-14 items-center justify-between gap-3 md:h-[72px]">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link
              href="/"
              aria-label="Newgency home"
              className="min-w-0 shrink-0 select-none transition-opacity hover:opacity-90"
              onClick={closeMenu}
            >
              <span
                className="text-[1.2rem] leading-none tracking-[-0.035em] sm:text-[clamp(1.125rem,4vw,1.5rem)]"
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

          <motion.div
            className="flex items-center gap-2 sm:gap-2.5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            <button
              type="button"
              className="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={2} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
              )}
            </button>

            <motion.a
              href="/#apply"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#7dd3fc] px-4 text-[13px] font-semibold text-[#0a0a0f] shadow-[0_0_24px_rgba(139,124,246,0.3)] sm:h-11 sm:gap-1.5 sm:px-6 sm:text-sm md:min-h-[44px] md:px-7 md:py-3 md:text-[15px] md:shadow-[0_0_28px_rgba(139,124,246,0.35)] md:hover:shadow-[0_0_40px_rgba(125,211,252,0.35)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              onClick={closeMenu}
            >
              <span>Hire us</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <motion.nav
              id="mobile-nav"
              className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+3.5rem)] z-50 mx-3 rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
              aria-label="Primary"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.28, ease: EASE }}
                  className="flex min-h-[48px] touch-manipulation items-center rounded-xl px-4 font-sans text-[15px] font-medium text-white/85 transition-colors active:bg-white/[0.06]"
                >
                  <span className="bg-gradient-to-r from-[#ddd6fe] via-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
