"use client";

import { motion } from "framer-motion";

type BookCallButtonProps = {
  className?: string;
  animated?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function BookCallButton({
  className = "",
  animated = false,
  children = "Book a Call",
  onClick,
}: BookCallButtonProps) {
  if (animated) {
    return (
      <motion.button
        type="button"
        className={className}
        onClick={onClick}
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
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
