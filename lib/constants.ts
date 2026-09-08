export const NAV_ITEMS = [
  { label: "What we do", href: "/#what-we-do" },
  { label: "Work", href: "/#work" },
  { label: "Book a Call", href: "/#apply" },
] as const;

/** Hero background reel — place file at `public/hero-reel.mp4` or change path. */
export const HERO_VIDEO_SRC = "/hero-reel.mp4";

export const HERO_HEADLINE_WORDS = [
  "AI",
  "commercials",
  "for",
  "local",
  "businesses.",
] as const;

/** Word in the hero headline that gets the gradient. */
export const HERO_HIGHLIGHT_WORD = "local";

/** Subline below the hero headline. */
export const HERO_SUBLINE =
  "Cinematic ads for gyms, clinics, restaurants, and shops that need the next customer — not a Super Bowl slot." as const;

export const WHAT_WE_DO_INTRO = {
  eyebrow: "WHAT WE DO",
  lead: "National-looking ads. Built for Main Street.",
  subline: "AI commercials for the businesses people actually visit.",
} as const;

export type WhatWeDoRow = {
  kicker: string;
  title: string;
  body: string;
};

export const WHAT_WE_DO_ROWS: readonly WhatWeDoRow[] = [
  {
    kicker: "01",
    title: "Look like the big brands.",
    body: "TV-quality commercials without a crew, a warehouse, or a six-figure budget. Same light, same finish, same feel as a national campaign. Your customers won't know it was AI. That's the point.",
  },
  {
    kicker: "02",
    title: "Shot for the neighborhood.",
    body: "Dentists. Gyms. Auto shops. Med spas. Restaurants. If people drive past you, we put you on their feed with a commercial that belongs there — not a generic stock ad.",
  },
  {
    kicker: "03",
    title: "Made to get the phone ringing.",
    body: "Meta, TikTok, YouTube, Google. Spots cut to convert locally: more bookings, more walk-ins, more people who already live nearby.",
  },
] as const;

export const LOCAL_ANGLE = {
  eyebrow: "FOR LOCAL",
  line: "You don't need a Hollywood budget to look like you belong on TV.",
  name: "Newgency",
  context: "AI commercials for local businesses",
} as const;

/** Cinematic backdrop for the local-angle block — reuse a work reel. */
export const LOCAL_ANGLE_VIDEO_SRC = "/work/hvac.mp4";

export const LOCAL_VERTICALS = [
  "Gyms & studios",
  "Dental & medical",
  "Restaurants",
  "Auto & dealerships",
  "Real estate",
  "Home services",
] as const;

/** Meta Pixel (Facebook) */
export const META_PIXEL_ID = "815541597992994";

export const META_PIXEL_LEAD_PARAMS = {
  content_name: "Formulario Newgency",
} as const;

export const META_PIXEL_SCHEDULE_PARAMS = {
  content_name: "Discovery Call Newgency",
} as const;

/** Calendly event URL — https://calendly.com/founder-newgency/30min */
export const CALENDLY_EMBED_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/founder-newgency/30min";

export type WorkSlot = {
  id: string;
  label: string;
  industry: string;
  logoSrc: string;
  /** PrimeWay (and similar) sit on a light plate — invert instead of screen-blend. */
  logoOnLight?: boolean;
  /**
   * Public URL path to the MP4 (files live under `public/`).
   * Example: file `public/work/lou.mp4` → `videoSrc: "/work/lou.mp4"`.
   * Use `null` until the file exists.
   */
  videoSrc: string | null;
};

/** Portfolio spots — local-business commercials. Verity is the only repeated logo. */
export const WORK_SLOTS: readonly WorkSlot[] = [
  { id: "w-lou", label: "Lou Bachrodt Chevrolet", industry: "Auto", logoSrc: "/logos/lou-bachrodt.png", videoSrc: "/work/lou.mp4" },
  { id: "w-hvac", label: "Solar Installers of Florida", industry: "Home services", logoSrc: "/logos/solar-installers.png", videoSrc: "/work/hvac.mp4" },
  { id: "w-lindstrom", label: "Lindstrom", industry: "Home services", logoSrc: "/logos/lindstrom.png", videoSrc: "/work/lindstrom.mp4" },
  { id: "w-evergreen", label: "Verity Credit Union", industry: "Finance", logoSrc: "/logos/verity.png", videoSrc: "/work/evergreen.mp4" },
  { id: "w-ronsholes", label: "Ron Sholes P.A.", industry: "Professional services", logoSrc: "/logos/ron-sholes.png", videoSrc: "/work/ronsholes.mp4" },
  { id: "w-verity", label: "Verity Credit Union", industry: "Finance", logoSrc: "/logos/verity.png", videoSrc: "/work/verity-rainier.mp4" },
  { id: "w-vision", label: "Mid-Atlantic Eyecare", industry: "Healthcare", logoSrc: "/logos/mid-atlantic.png", videoSrc: "/work/vision.mp4" },
  { id: "w-funding", label: "B2B Funding", industry: "B2B", logoSrc: "/logos/b2b-funding.png", videoSrc: "/work/b2b-funding.mp4" },
  { id: "w-primeway", label: "PrimeWay", industry: "Finance", logoSrc: "/logos/primeway.png", logoOnLight: true, videoSrc: "/proyecto-b.mp4" },
  { id: "w-advocating", label: "VisionAmerica", industry: "Healthcare", logoSrc: "/logos/vision-america.png", videoSrc: "/work/vision-america.mp4" },
] as const;
