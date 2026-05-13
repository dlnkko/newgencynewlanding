"use client";

import { HERO_VIDEO_SRC } from "@/lib/constants";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

type HeroVideoProps = {
  onError: () => void;
};

export function HeroVideo({ onError }: HeroVideoProps) {
  return <BackgroundVideo src={HERO_VIDEO_SRC} onError={onError} />;
}
