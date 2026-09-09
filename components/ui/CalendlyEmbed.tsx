"use client";

import { useEffect, useRef } from "react";

import { getCalendlyEmbedUrl } from "@/lib/calendly";
import { trackMetaSchedule } from "@/lib/meta-pixel";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    resize?: boolean;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

function loadCalendlyScript() {
  if (window.Calendly) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return new Promise<void>((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed to load"));
    document.head.appendChild(script);
  });
}

type CalendlyEmbedProps = {
  url: string;
  className?: string;
};

export function CalendlyEmbed({ url, className = "" }: CalendlyEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const embedUrl = getCalendlyEmbedUrl(url);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let started = false;

    const start = () => {
      if (started || cancelled) return;
      started = true;
      void loadCalendlyScript()
        .then(() => {
          if (cancelled || !host || !window.Calendly) return;
          host.replaceChildren();
          window.Calendly.initInlineWidget({
            url: embedUrl,
            parentElement: host,
            resize: true,
          });
        })
        .catch(() => {
          /* keep empty host */
        });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    observer.observe(host);

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === "calendly.event_scheduled") {
        trackMetaSchedule();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("message", handleMessage);
      host.replaceChildren();
    };
  }, [embedUrl]);

  return (
    <div
      ref={hostRef}
      className={`calendly-host w-full min-w-0 ${className}`.trim()}
    />
  );
}
