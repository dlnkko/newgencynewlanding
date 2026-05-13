import React from "react";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GradientText({
  children,
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn("gradient-text", className)}
      style={{
        background: "linear-gradient(135deg, #8b7cf6, #7dd3fc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Tag>
  );
}

