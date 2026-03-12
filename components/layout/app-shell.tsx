"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  const isHome = pathname === "/";

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isHome ? <AnnouncementBar /> : null}
      <Header key={pathname} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
