"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { DesktopMegaMenu } from "@/components/layout/header/desktop-mega-menu";
import { DesktopNavigation } from "@/components/layout/header/desktop-navigation";
import { HeaderSearch } from "@/components/layout/header/header-search";
import {
  CloseIcon,
  HeaderIconButton,
  MenuIcon,
  SearchIcon,
} from "@/components/layout/header/header-icons";
import { MobileHeaderDrawer } from "@/components/layout/header/mobile-header-drawer";
import { headerNavigation } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function hasDropdown(label: string | null) {
  return headerNavigation.find((item) => item.label === label && (item.sections?.length || item.cards?.length));
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeDropdown = hasDropdown(activeMenu);

  function clearCloseMenuTimer() {
    if (closeMenuTimerRef.current) {
      clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  }

  function scheduleCloseMenu(delay = 180) {
    clearCloseMenuTimer();
    closeMenuTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, delay);
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setIsSearchOpen(false);
        setIsMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      clearCloseMenuTimer();
    };
  }, []);

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        isHome ? "fixed inset-x-0 top-3 sm:top-5" : "sticky top-3 py-3 sm:top-5 sm:py-4",
      )}
    >
      <Container className="relative">
        <div
          className="relative"
          onMouseEnter={clearCloseMenuTimer}
          onMouseLeave={() => scheduleCloseMenu()}
        >
          <div className="premium-panel overflow-visible rounded-[1rem] border border-black/5 bg-white/96 px-3 py-1 shadow-[0_24px_70px_-40px_rgba(19,32,24,0.28)] sm:rounded-[1.2rem] sm:px-4">
            {isSearchOpen ? (
              <HeaderSearch
                onClose={() => {
                  setIsSearchOpen(false);
                }}
              />
            ) : (
              <>
                <div className="grid min-h-[3rem] grid-cols-[auto_1fr_auto] items-center gap-2 lg:hidden">
                  <button
                    type="button"
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-site-menu"
                    onClick={() => {
                      setIsMobileOpen((value) => !value);
                      setIsSearchOpen(false);
                    }}
                    className="grid size-8 place-items-center rounded-full text-olive-950 transition hover:bg-sand-50"
                  >
                    {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>

                  <BrandMark compact className="justify-self-center" />

                  <HeaderIconButton
                    label={isSearchOpen ? "Close search" : "Open search"}
                    onClick={() => {
                      setIsSearchOpen((value) => !value);
                      setIsMobileOpen(false);
                    }}
                  >
                    <SearchIcon />
                  </HeaderIconButton>
                </div>

                <DesktopNavigation
                  items={headerNavigation}
                  activeMenu={activeMenu}
                  onMenuOpen={(label) => {
                    clearCloseMenuTimer();
                    setActiveMenu(label);
                    setIsSearchOpen(false);
                  }}
                  onSearchToggle={() => {
                    setIsSearchOpen(true);
                    setActiveMenu(null);
                  }}
                />
            </>
          )}
        </div>

        {!isSearchOpen && activeDropdown ? (
            <div
              className="absolute inset-x-0 top-[calc(100%+0.8rem)] z-40 hidden lg:block"
              onMouseEnter={clearCloseMenuTimer}
              onMouseLeave={() => scheduleCloseMenu()}
            >
              <DesktopMegaMenu item={activeDropdown} />
            </div>
          ) : null}
        </div>

        {!isSearchOpen && isMobileOpen ? (
          <div
            id="mobile-site-menu"
            className="absolute inset-x-4 top-[calc(100%+0.7rem)] z-40 sm:inset-x-7 sm:top-[calc(100%+0.8rem)] lg:inset-x-8 xl:inset-x-10"
          >
            <MobileHeaderDrawer items={headerNavigation} />
          </div>
        ) : null}
      </Container>
    </header>
  );
}
