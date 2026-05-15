import type { Metadata } from "next";

import { Navbar } from "@/components/ui/Navbar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ScheduleSection } from "@/components/sections/ScheduleSection";

export const metadata: Metadata = {
  title: "Book a Call | Newgency",
  description: "Schedule a call with the Newgency team.",
};

export default function SchedulePage() {
  return (
    <div className="flex min-h-full min-w-0 flex-col bg-[#030303]">
      <Navbar />
      <main className="flex-1">
        <div className="relative isolate min-h-[calc(100dvh-3.5rem)] bg-[#030303] md:min-h-[calc(100dvh-4.5rem)]">
          <AmbientBackground />
          <div className="relative z-10">
            <ScheduleSection />
          </div>
        </div>
      </main>
    </div>
  );
}
