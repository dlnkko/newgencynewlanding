"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { TYPEFORM_LIVE_ID } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const TYPEFORM_SCRIPT_SRC = "https://embed.typeform.com/next/embed.js";

type TypeformLiveModalProps = {
  open: boolean;
  onClose: () => void;
};

export function TypeformLiveModal({ open, onClose }: TypeformLiveModalProps) {
  const embedHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const host = embedHostRef.current;
    if (!host) return;

    const mountEmbed = () => {
      host.innerHTML = "";
      const live = document.createElement("div");
      live.setAttribute("data-tf-live", TYPEFORM_LIVE_ID);
      live.style.width = "100%";
      live.style.minHeight = "min(70vh, 640px)";
      host.appendChild(live);

      const script = document.createElement("script");
      script.src = TYPEFORM_SCRIPT_SRC;
      script.async = true;
      host.appendChild(script);
    };

    const t = window.setTimeout(mountEmbed, 0);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      if (host) host.innerHTML = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book a Call"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Close form"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0f] shadow-[0_32px_120px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 sm:px-5">
              <span className="font-sans text-sm font-medium text-white/70">
                Book a Call
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08]"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div
              ref={embedHostRef}
              className="typeform-live-host w-full overflow-hidden bg-[#0a0a0f] p-1 sm:p-2"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
