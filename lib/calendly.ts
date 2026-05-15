/** Brand-matched Calendly inline embed URL (hex without #). */
export function getCalendlyEmbedUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("background_color", "0a0a0f");
  url.searchParams.set("text_color", "f5f3ff");
  url.searchParams.set("primary_color", "8b7cf6");
  return url.toString();
}
