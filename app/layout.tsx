import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

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
  title: "Newgency",
  description:
    "Newgency creates hyperrealistic and animated advertising videos using AI to help businesses connect, engage and convert.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Newgency",
    description:
      "Smarter videos. Stronger results. AI-powered ad creatives built to convert.",
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
      </head>
      <body className="min-h-screen overflow-x-clip bg-[#030303] text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}


