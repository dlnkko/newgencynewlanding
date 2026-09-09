"use client";

import { useLayoutEffect } from "react";

/**
 * Fresh visits land on the hero. Hash links (#work, #apply) still work.
 * Browser scroll restoration otherwise dumps returning users mid-page.
 */
export function LandingEntry() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const id = window.location.hash.replace(/^#/, "");
    if (id && document.getElementById(id)) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
