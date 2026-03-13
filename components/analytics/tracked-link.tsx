"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { trackCtaClick } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  prefetch?: boolean;
  eventName?: string;
  eventData?: Record<string, string | number | boolean | string[] | undefined>;
}

export function TrackedLink({
  href,
  className,
  children,
  target,
  rel,
  ariaLabel,
  prefetch,
  eventName = "cta_click",
  eventData,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      prefetch={prefetch}
      className={className}
      onClick={() =>
        trackCtaClick({
          event_name: eventName,
          destination: href,
          ...eventData,
        })
      }
    >
      {children}
    </Link>
  );
}
