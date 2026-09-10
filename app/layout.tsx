import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

import { MetaPixel } from "@/components/analytics/MetaPixel";
import { HERO_VIDEO_SRC } from "@/lib/constants";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Newgency. Cinematic commercials for local businesses",
  description:
    "Give customers and future partners a stronger first impression with a cinematic brand commercial. No traditional crew. No traditional production cost.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Newgency. Cinematic commercials for local businesses",
    description:
      "A cinematic brand commercial for local businesses. You bring the idea. We bring it to life.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link
          rel="preload"
          href={HERO_VIDEO_SRC}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <MetaPixel />
        <script
          defer
          data-website-id="dfid_vJSs7steSH8o1eAAdAdtM"
          data-domain="newgency.co"
          src="https://datafa.st/js/script.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)scrollTo(0,0);}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip bg-[#030303] text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}


