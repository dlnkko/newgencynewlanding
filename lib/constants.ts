export const PRIMARY_CTA_LABEL = "Book a Creative Call" as const;
export const PRIMARY_CTA_HREF = "/#apply" as const;
export const BOOK_CALL_LABEL = "Book a Call" as const;
export const HERO_PRIMARY_LABEL = "What we do" as const;
export const HERO_PRIMARY_HREF = "/#what-we-do" as const;
export const SECONDARY_CTA_LABEL = "Watch Our Work" as const;
export const SECONDARY_CTA_HREF = "/#work" as const;

export const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "What we do", href: "/#what-we-do" },
] as const;

/** Hero background reel — place file at `public/hero-reel.mp4` or change path. */
export const HERO_VIDEO_SRC = "/hero-reel.mp4";

export const HERO_COPY = {
  eyebrow: "Cinematic commercials for local businesses",
  headlineLead: "Your business deserves to look",
  headlineAccent: "as good as it really is.",
  support:
    "You bring the idea. We bring it to life.",
} as const;

export const WORK_COPY = {
  eyebrow: "Selected work",
  heading: "See what your next first impression could look like.",
  subline: "Explore selected commercials for local businesses.",
} as const;

export const WHAT_WE_DO_INTRO = {
  eyebrow: "WHY IT MATTERS",
  lead: "A stronger first impression. Wherever business happens.",
  subline:
    "A cinematic commercial that introduces your business with the care you already put into the work.",
} as const;

export type WhatWeDoRow = {
  kicker: string;
  title: string;
  body: string;
};

export const WHAT_WE_DO_ROWS: readonly WhatWeDoRow[] = [
  {
    kicker: "01",
    title: "Show the quality behind your business.",
    body: "The commercial is a clear look at the care and professionalism already in your brand, so people can feel that before they walk in or take a meeting.",
  },
  {
    kicker: "02",
    title: "Make your introduction count.",
    body: "Use it when you introduce the business to customers and potential partners: a first impression that matches how seriously you take the work.",
  },
  {
    kicker: "03",
    title: "Put your commercial to work.",
    body: "Run it on your website, social channels, and in presentations: the places you already introduce the business.",
  },
] as const;

export const OFFER_COPY = {
  eyebrow: "THE OFFER",
  heading: "You bring the idea. We bring it to life.",
  lead: "Tell us what the video should be about, what should happen, or what you want to communicate. We turn that into a high-quality, professional commercial. We do not create the concept. You do.",
  items: [
    {
      title: "You set the concept",
      body: "You explain what the video should cover, what you want to happen, and what you want to communicate.",
    },
    {
      title: "We make it real",
      body: "We produce that idea as a high-quality, professional audiovisual piece.",
    },
    {
      title: "AI-assisted production",
      body: "AI is part of how we produce the work, not something we conceal.",
    },
  ],
  note: "Formats, revisions, usage, and timing are scoped on the creative call.",
} as const;

export const APPLY_COPY = {
  heading: PRIMARY_CTA_LABEL,
  body: "Pick a time. Tell us what you want the commercial to communicate. We'll bring it to life.",
} as const;

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
  { id: "w-verity", label: "Verity Credit Union", industry: "Finance", logoSrc: "/logos/verity.png", videoSrc: "/work/verity-rainier.mp4" },
  { id: "w-lindstrom", label: "Lindstrom", industry: "Home services", logoSrc: "/logos/lindstrom.png", videoSrc: "/work/lindstrom.mp4" },
  { id: "w-evergreen", label: "Verity Credit Union", industry: "Finance", logoSrc: "/logos/verity.png", videoSrc: "/work/evergreen.mp4" },
  { id: "w-hvac", label: "Solar Installers of Florida", industry: "Home services", logoSrc: "/logos/solar-installers.png", videoSrc: "/work/hvac.mp4" },
  { id: "w-funding", label: "B2B Funding", industry: "B2B", logoSrc: "/logos/b2b-funding.png", videoSrc: "/work/b2b-funding.mp4" },
  { id: "w-primeway", label: "PrimeWay", industry: "Finance", logoSrc: "/logos/primeway.png", videoSrc: "/proyecto-b.mp4" },
  { id: "w-lou", label: "Lou Bachrodt Chevrolet", industry: "Auto", logoSrc: "/logos/lou-bachrodt.png", videoSrc: "/work/lou.mp4" },
  { id: "w-vision", label: "Mid-Atlantic Eyecare", industry: "Healthcare", logoSrc: "/logos/mid-atlantic.png", videoSrc: "/work/vision.mp4" },
  { id: "w-advocating", label: "VisionAmerica", industry: "Healthcare", logoSrc: "/logos/vision-america.png", videoSrc: "/work/vision-america.mp4" },
  { id: "w-ronsholes", label: "Ron Sholes P.A.", industry: "Professional services", logoSrc: "/logos/ron-sholes.png", videoSrc: "/work/ronsholes.mp4" },
] as const;
