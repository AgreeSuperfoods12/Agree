import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import {
  BagIcon,
  ChevronDownIcon,
  HeaderIconButton,
  SearchIcon,
  UserIcon,
} from "@/components/layout/header/header-icons";
import { MarketSelector } from "@/components/layout/header/market-selector";
import { cn } from "@/lib/utils";
import type { HeaderMenuItem } from "@/types/site";

interface DesktopNavigationProps {
  items: HeaderMenuItem[];
  activeMenu: string | null;
  onMenuOpen: (label: string) => void;
  onSearchToggle: () => void;
  onCartToggle: () => void;
  cartItemCount: number;
}

function hasDropdown(item: HeaderMenuItem) {
  return Boolean(item.sections?.length || item.cards?.length);
}

function NavLabel({ label, badge }: { label: string; badge?: string }) {
  return (
    <span className="relative inline-flex items-center">
      <span>{label}</span>
      {badge ? (
        <span className="absolute -right-5 -top-3 rounded-[0.35rem] bg-[#dac6f4] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-olive-950">
          {badge}
        </span>
      ) : null}
    </span>
  );
}

export function DesktopNavigation({
  items,
  activeMenu,
  onMenuOpen,
  onSearchToggle,
  onCartToggle,
  cartItemCount,
}: DesktopNavigationProps) {
  return (
    <div className="hidden lg:grid lg:min-h-[3.5rem] lg:grid-cols-5 lg:items-center lg:gap-5">
      <nav className="col-span-2 flex items-center gap-5 xl:gap-6" aria-label="Primary">
        {items.map((item) => {
          const isOpen = activeMenu === item.label;

          if (!hasDropdown(item) && item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center text-[14px] font-medium tracking-[-0.01em] text-olive-900 transition hover:text-olive-950"
              >
                <NavLabel label={item.label} badge={item.badge} />
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              aria-expanded={isOpen}
              onMouseEnter={() => onMenuOpen(item.label)}
              onFocus={() => onMenuOpen(item.label)}
              className={cn(
                "inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em] transition",
                isOpen ? "text-olive-950" : "text-olive-900 hover:text-olive-950",
              )}
            >
              <NavLabel label={item.label} badge={item.badge} />
              <ChevronDownIcon className={cn("transition-transform", isOpen && "rotate-180")} />
            </button>
          );
        })}
      </nav>

      <BrandMark compact className="col-span-1 justify-self-center" />

      <div className="col-span-2 flex items-center justify-end gap-1.5">
        <HeaderIconButton label="Open search" onClick={onSearchToggle} className="size-8">
          <SearchIcon />
        </HeaderIconButton>
        <span className="mx-1 h-5 w-px bg-olive-950/12" />
        <MarketSelector />
        <span className="h-5 w-px bg-olive-950/12" />
        <HeaderIconButton href="/contact" label="Order now" className="size-8">
          <UserIcon />
        </HeaderIconButton>
        <span className="h-5 w-px bg-olive-950/12" />
        <HeaderIconButton label="Open cart" onClick={onCartToggle} className="relative size-8">
          <BagIcon />
          {cartItemCount > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-olive-950 px-1 text-[10px] font-semibold text-sand-50">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          ) : null}
        </HeaderIconButton>
      </div>
    </div>
  );
}
