"use client";

import dynamic from "next/dynamic";

const StudioApp = dynamic(() => import("@/components/studio/studio-app"), {
  ssr: false,
});

export function StudioShell() {
  return <StudioApp />;
}
