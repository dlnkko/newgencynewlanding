import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
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
  title: "Newgency — AI-Powered Video Ads",
  description:
    "Newgency creates hyperrealistic and animated advertising videos using AI to help businesses connect, engage and convert.",
  openGraph: {
    title: "Newgency — AI-Powered Video Ads",
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
      <body className="min-h-screen overflow-x-clip bg-[#030303] text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}


