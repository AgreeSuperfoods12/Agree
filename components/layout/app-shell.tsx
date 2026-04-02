"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import type { SearchablePost, SearchableProduct } from "@/types/search";

interface AppShellProps {
  children: ReactNode;
  searchProducts: SearchableProduct[];
  searchPosts: SearchablePost[];
}

export function AppShell({ children, searchProducts, searchPosts }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");
  const isHome = pathname === "/";

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only absolute left-4 top-4 z-[60] rounded-full bg-olive-950 px-4 py-2 text-sm font-medium text-sand-50 focus:not-sr-only"
      >
        Skip to content
      </a>
      {!isHome ? <AnnouncementBar /> : null}
      <Header key={pathname} searchProducts={searchProducts} searchPosts={searchPosts} />
      <CartDrawer />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
