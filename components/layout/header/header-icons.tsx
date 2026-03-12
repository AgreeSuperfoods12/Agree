import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4.25 4.25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={cn("size-4", className)} aria-hidden="true">
      <path d="m5.5 8 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
      <path d="M4.5 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <circle cx="12" cy="8" r="4.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.8 19.2c1.8-3.05 4.18-4.57 7.2-4.57 3.03 0 5.43 1.52 7.2 4.57" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
      <path d="M5 8.5h14l-1.1 10.04A1.5 1.5 0 0 1 16.4 20H7.6a1.5 1.5 0 0 1-1.5-1.46L5 8.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 9V7.5A3 3 0 0 1 12 4.5a3 3 0 0 1 3 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CountryBadge() {
  return (
    <span className="relative block h-4 w-5 overflow-hidden rounded-[0.35rem] border border-olive-950/10">
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#ef934e]" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#3a8d59]" />
      <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2854a1]" />
    </span>
  );
}

export function HeaderIconButton({
  href,
  label,
  onClick,
  children,
  className,
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const sharedClassName = cn(
    "grid size-10 place-items-center rounded-full text-olive-950 transition hover:bg-sand-50",
    className,
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={sharedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={sharedClassName}>
      {children}
    </button>
  );
}
