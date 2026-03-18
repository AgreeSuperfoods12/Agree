import Link from "next/link";

import { defaultHomePageContent } from "@/content/home";
import { Container } from "@/components/layout/container";

export function AnnouncementBar() {
  const announcement = defaultHomePageContent.announcement;

  return (
    <div className="border-b border-olive-950/8 bg-[#a6bdb5] text-olive-950">
      <Container className="flex min-h-10 flex-col items-start justify-center gap-1 py-2 text-[10px] font-medium uppercase tracking-[0.14em] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:py-0 sm:text-[11px] sm:tracking-[0.22em]">
        <p className="leading-4 sm:leading-normal">{announcement.message}</p>
        <div className="flex items-center gap-3 text-olive-900/70 sm:gap-4">
          <span className="hidden sm:inline">{announcement.secondaryMessage}</span>
          <Link href={announcement.ctaHref} className="text-olive-950 hover:text-olive-800">
            {announcement.ctaLabel}
          </Link>
        </div>
      </Container>
    </div>
  );
}
