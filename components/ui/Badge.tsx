import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/[0.06] bg-white/60 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

