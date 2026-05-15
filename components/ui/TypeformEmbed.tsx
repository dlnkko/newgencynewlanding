"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Widget } from "@typeform/embed-react";

import { SCHEDULE_PATH, TYPEFORM_FORM_ID } from "@/lib/constants";

type TypeformEmbedProps = {
  className?: string;
};

export function TypeformEmbed({ className = "" }: TypeformEmbedProps) {
  const router = useRouter();

  const openSchedule = useCallback(() => {
    router.push(SCHEDULE_PATH);
  }, [router]);

  return (
    <Widget
      id={TYPEFORM_FORM_ID}
      autoResize="480,800"
      className={className}
      style={{ minHeight: 480, width: "100%" }}
      onEndingButtonClick={openSchedule}
    />
  );
}
