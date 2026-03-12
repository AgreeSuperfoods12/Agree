import Link from "next/link";

import { defaultHomePageContent } from "@/content/home";
import { Container } from "@/components/layout/container";

export function AnnouncementBar() {
  const announcement = defaultHomePageContent.announcement;

  return (
    <div className="border-b border-olive-950/8 bg-[#a6bdb5] text-olive-950">
      <Container className="flex min-h-10 flex-wrap items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.22em]">
        <p>{announcement.message}</p>
        <div className="flex items-center gap-4 text-olive-900/70">
          <span className="hidden sm:inline">{announcement.secondaryMessage}</span>
          <Link href={announcement.ctaHref} className="text-olive-950 hover:text-olive-800">
            {announcement.ctaLabel}
          </Link>
        </div>
      </Container>
    </div>
  );
}
