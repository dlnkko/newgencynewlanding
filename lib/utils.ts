import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** In-page hash scroll without jumping the whole document on mount. */
export function scrollToId(id: string, behavior?: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: behavior ?? (prefersReducedMotion() ? "auto" : "smooth"),
    block: "start",
  });
  return true;
}

export function scrollToTop(behavior?: ScrollBehavior) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior ?? (prefersReducedMotion() ? "auto" : "smooth"),
  });
}

