import Script from "next/script";

export function TypeformScript() {
  return (
    <Script
      src="https://embed.typeform.com/next/embed.js"
      strategy="lazyOnload"
    />
  );
}
