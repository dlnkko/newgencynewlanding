"use client";

import { useEffect } from "react";

import { getCalendlyEmbedUrl } from "@/lib/calendly";
import { trackMetaSchedule } from "@/lib/meta-pixel";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

type CalendlyEmbedProps = {
  url: string;
  className?: string;
};

export function CalendlyEmbed({ url, className = "" }: CalendlyEmbedProps) {
  const embedUrl = getCalendlyEmbedUrl(url);

  useEffect(() => {
    if (document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === "calendly.event_scheduled") {
        trackMetaSchedule();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      className={`calendly-inline-widget w-full ${className}`.trim()}
      data-url={embedUrl}
      style={{ minWidth: 320, height: "min(100vh - 12rem, 820px)" }}
    />
  );
}
