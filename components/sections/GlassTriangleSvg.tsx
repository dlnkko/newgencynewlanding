"use client";

type GlassTriangleSvgProps = {
  /** Prefijo único para ids SVG (evita colisiones si hay varios en DOM durante hidratación). */
  idPrefix: string;
  /** Mobile: sin filtros blur/glow ni capas extra — aspecto 2D limpio. */
  variant: "full" | "flat";
};

export function GlassTriangleSvg({ idPrefix, variant }: GlassTriangleSvgProps) {
  const g = (name: string) => `${idPrefix}${name}`;

  if (variant === "flat") {
    return (
      <div className="relative flex size-[min(92vw,340px)] items-center justify-center md:hidden">
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id={g("flatFill")} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="45%" stopColor="rgba(210,200,255,0.55)" />
              <stop offset="100%" stopColor="rgba(160,210,255,0.45)" />
            </linearGradient>
            <linearGradient id={g("flatStroke")} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139,124,246,0.55)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0.5)" />
            </linearGradient>
          </defs>
          <ellipse
            cx="210"
            cy="382"
            rx="88"
            ry="14"
            fill="rgba(139,124,246,0.12)"
          />
          <polygon
            points="60,30 370,200 60,370"
            fill={`url(#${g("flatFill")})`}
            stroke={`url(#${g("flatStroke")})`}
            strokeWidth="1.25"
          />
          <path
            d="M 62 34 L 62 366"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse
            cx="125"
            cy="165"
            rx="28"
            ry="16"
            fill="rgba(255,255,255,0.35)"
            transform="rotate(-14 125 165)"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex size-[min(52vw,520px)] items-center justify-center lg:size-[min(48vw,600px)] xl:size-[min(44vw,640px)]">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={g("glassGrad")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="35%" stopColor="rgba(180,160,255,0.35)" />
            <stop offset="65%" stopColor="rgba(120,190,255,0.30)" />
            <stop offset="100%" stopColor="rgba(100,160,255,0.20)" />
          </linearGradient>

          <linearGradient id={g("strokeGrad")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(160,130,255,0.7)" />
            <stop offset="100%" stopColor="rgba(100,180,255,0.5)" />
          </linearGradient>

          <linearGradient id={g("edgeHighlight")} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>

          <filter id={g("glowFilter")} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id={g("shadowBlur")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          <clipPath id={g("triClip")}>
            <polygon points="60,30 370,200 60,370" />
          </clipPath>
        </defs>

        <ellipse
          cx="220"
          cy="390"
          rx="100"
          ry="18"
          fill="rgba(120,100,230,0.30)"
          filter={`url(#${g("shadowBlur")})`}
        />

        <polygon
          points="60,30 370,200 60,370"
          fill="rgba(150,120,255,0.18)"
          filter={`url(#${g("glowFilter")})`}
        />

        <polygon
          points="60,30 370,200 60,370"
          fill={`url(#${g("glassGrad")})`}
          stroke={`url(#${g("strokeGrad")})`}
          strokeWidth="1.5"
        />

        <polygon points="60,30 370,200 60,370" fill="none" clipPath={`url(#${g("triClip")})`} />
        <rect
          x="55"
          y="25"
          width="60"
          height="360"
          fill="rgba(255,255,255,0.12)"
          clipPath={`url(#${g("triClip")})`}
          transform="rotate(-8, 200, 200)"
        />

        <line
          x1="62"
          y1="32"
          x2="62"
          y2="368"
          stroke={`url(#${g("edgeHighlight")})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <line
          x1="64"
          y1="34"
          x2="365"
          y2="200"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <ellipse
          cx="120"
          cy="160"
          rx="30"
          ry="18"
          fill="rgba(255,255,255,0.25)"
          transform="rotate(-15, 120, 160)"
        />
      </svg>
    </div>
  );
}
