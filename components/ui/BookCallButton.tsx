"use client";

import { motion } from "framer-motion";

import { TYPEFORM_LIVE_ID } from "@/lib/constants";

type BookCallButtonProps = {
  className?: string;
  animated?: boolean;
  children?: React.ReactNode;
};

export function BookCallButton({
  className = "",
  animated = false,
  children = "Book a Call",
}: BookCallButtonProps) {
  if (animated) {
    return (
      <motion.button
        type="button"
        className={className}
        data-tf-popup={TYPEFORM_LIVE_ID}
        data-tf-opacity="100"
        data-tf-size="100"
        data-tf-iframe-props="title=Book a Call"
        whileHover={{
          scale: 1.04,
          boxShadow: "0 0 64px rgba(125,211,252,0.5)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      data-tf-popup={TYPEFORM_LIVE_ID}
      data-tf-opacity="100"
      data-tf-size="100"
      data-tf-iframe-props="title=Book a Call"
    >
      {children}
    </button>
  );
}
