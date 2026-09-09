"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { BOOK_CALL_LABEL, NAV_ITEMS, PRIMARY_CTA_HREF } from "@/lib/constants";
import { CtaButton } from "@/components/ui/CtaButton";
import { buttonHover, buttonTap, buttonTransition, EASE } from "@/lib/motion";
import { scrollToId, scrollToTop } from "@/lib/utils";

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

function onInPageNav(e: MouseEvent<HTMLAnchorElement>, href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (!hash) {
    e.preventDefault();
    history.pushState(null, "", "/");
    scrollToTop();
    return;
  }
  if (!document.getElementById(hash)) return;
  e.preventDefault();
  history.pushState(null, "", href);
  scrollToId(hash);
}

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
      onClick={(e) => {
        onInPageNav(e, href);
        onClick?.();
      }}
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full max-w-[100vw]"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-40 ${
          scrolled || menuOpen ? "opacity-100" : "opacity-80"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,3,3,0.72) 0%, rgba(3,3,3,0.28) 46%, rgba(3,3,3,0) 100%)",
        }}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-[14px] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-28 ${
          scrolled || menuOpen ? "opacity-90" : "opacity-40"
        }`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 35%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-16 lg:px-20">
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
              onClick={(e) => {
                closeMenu();
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  history.pushState(null, "", "/");
                  scrollToTop();
                }
              }}
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
            <motion.button
              type="button"
              className="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/80 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              whileHover={buttonHover}
              whileTap={buttonTap}
              transition={buttonTransition}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={2} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
              )}
            </motion.button>

            <CtaButton
              href={PRIMARY_CTA_HREF}
              className="h-10 min-h-10 px-3.5 text-[12px] sm:h-11 sm:min-h-11 sm:px-5 sm:text-[13px] md:min-h-[44px] md:px-6 md:text-sm"
              onClick={(e) => {
                onInPageNav(e, PRIMARY_CTA_HREF);
                closeMenu();
              }}
            >
              {BOOK_CALL_LABEL}
            </CtaButton>
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
                  onClick={(e) => {
                    onInPageNav(e, item.href);
                    closeMenu();
                  }}
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
              <motion.a
                href={PRIMARY_CTA_HREF}
                onClick={(e) => {
                  onInPageNav(e, PRIMARY_CTA_HREF);
                  closeMenu();
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * NAV_ITEMS.length, duration: 0.28, ease: EASE }}
                className="flex min-h-[48px] touch-manipulation items-center rounded-xl px-4 font-sans text-[15px] font-semibold text-white/90 transition-colors active:bg-white/[0.06]"
              >
                {BOOK_CALL_LABEL}
              </motion.a>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
