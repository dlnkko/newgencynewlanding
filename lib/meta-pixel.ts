import {
  META_PIXEL_LEAD_PARAMS,
  META_PIXEL_SCHEDULE_PARAMS,
} from "@/lib/constants";

type FbqParams = Record<string, string | number>;

declare global {
  interface Window {
    fbq?: (
      command: "track",
      event: string,
      params?: FbqParams,
    ) => void;
  }
}

function trackMetaEvent(event: "Lead" | "Schedule", params: FbqParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

export function trackMetaLead() {
  trackMetaEvent("Lead", META_PIXEL_LEAD_PARAMS);
}

export function trackMetaSchedule() {
  trackMetaEvent("Schedule", META_PIXEL_SCHEDULE_PARAMS);
}
