import { Navbar } from "@/components/ui/Navbar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { IndustryQuote } from "@/components/sections/IndustryQuote";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ApplySection } from "@/components/sections/ApplySection";

export default function Home() {
  return (
    <div className="flex min-h-full min-w-0 flex-col bg-[#030303]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="relative isolate bg-[#030303]">
          <AmbientBackground />
          <div className="relative z-10">
            <WhatWeDo />
            <IndustryQuote />
            <SelectedWork />
            <ApplySection />
          </div>
        </div>
      </main>
    </div>
  );
}
