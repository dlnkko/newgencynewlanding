export const NAV_ITEMS = [
  { label: "What we do", href: "/#what-we-do" },
  { label: "Work", href: "/#work" },
  { label: "Book a Call", href: "/#apply" },
] as const;

/** Hero background reel — place file at `public/hero-reel.mp4` or change path. */
export const HERO_VIDEO_SRC = "/hero-reel.mp4";

export const HERO_HEADLINE_WORDS = [
  "This",
  "is",
  "what",
  "the",
  "future",
  "looks",
  "like.",
] as const;

/** Subline below the hero headline. */
export const HERO_SUBLINE =
  "The stories you imagined. Finally, exactly as you imagined them." as const;

export const WHAT_WE_DO_INTRO = {
  eyebrow: "WHAT WE DO",
  lead: "Cinematic AI for every story.",
  subline: "From boardroom to billboard.",
} as const;

export type WhatWeDoRow = {
  kicker: string;
  title: string;
  body: string;
};

export const WHAT_WE_DO_ROWS: readonly WhatWeDoRow[] = [
  {
    kicker: "01",
    title: "Real in every frame.",
    body: "Corporate films, brand commercials, product spots, all built with frontier AI models most people don't even know exist. Same texture, same light, same feel as a live-action shoot. No one will know. That's the point.",
  },
  {
    kicker: "02",
    title: "Any brief. Any world.",
    body: "Need a CEO walking into an office? A product launching in Times Square? A landscape that doesn't exist? If you can brief it, we can build it.",
  },
  {
    kicker: "03",
    title: "Built to perform.",
    body: "Every format, every platform: Meta, TikTok, YouTube. Cinematic quality that stops the scroll, holds attention and drives results from frame one.",
  },
] as const;

export const INDUSTRY_QUOTE = {
  text: "AI is the future. It's coming. It's here right now and we're in.",
  name: "Dana White",
  context: "On AI in UFC promotional films",
} as const;

/** Background reel for the industry quote block — swap path in `public/`. */
export const INDUSTRY_QUOTE_VIDEO_SRC = "/dana-white.mp4";

/** Typeform form id — https://ne77zwv3qx0.typeform.com/to/VpJQzq0d */
export const TYPEFORM_FORM_ID = "VpJQzq0d";

/** Calendly event URL — https://calendly.com/founder-newgency/30min */
export const CALENDLY_EMBED_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/founder-newgency/30min";

/** Schedule page — opened when Typeform end-screen CTA is clicked */
export const SCHEDULE_PATH = "/schedule" as const;

export type WorkSlot = {
  id: string;
  label: string;
  /**
   * Public URL path to the MP4 (files live under `public/`).
   * Example: file `public/videos/reel-1.mp4` → `videoSrc: "/videos/reel-1.mp4"`.
   * Use `null` until the file exists.
   */
  videoSrc: string | null;
};

/** Three slides for the work carousel — edit labels + `videoSrc` here. */
export const WORK_SLOTS: readonly WorkSlot[] = [
  { id: "w1", label: "RunAds AI Launch Video", videoSrc: "/proyecto-a.mp4" },
  { id: "w2", label: "Primeway Federal Credit Union AI Commercial", videoSrc: "/proyecto-b.mp4" },
  { id: "w3", label: "Advocating Vision AI Commercial", videoSrc: "/proyecto-c.mp4" },
] as const;
