import * as React from "react";

type Variant = "primary" | "secondary";

export function Button({
  children,
  variant = "primary",
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "9999px",
    fontSize: "15px",
    fontWeight: 500,
    fontFamily: "var(--font-dm-sans)",
    letterSpacing: "-0.01em",
    cursor: "pointer",
    transition: "transform 200ms ease, box-shadow 200ms ease, background 150ms ease",
    willChange: "transform",
  };

  const variants: Record<Variant, React.CSSProperties> = {
    primary: {
      background: "#0a0a0f",
      color: "#ffffff",
      border: "none",
      boxShadow: "0 6px 26px rgba(10,10,15,0.16)",
    },
    secondary: {
      background: "transparent",
      color: "#0a0a0f",
      border: "1.5px solid rgba(10,10,15,0.75)",
      boxShadow: "none",
    },
  };

  return (
    <button
      {...props}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}


