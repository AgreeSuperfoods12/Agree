import Image from "next/image";
import Link from "next/link";

import { ChevronDownIcon } from "@/components/layout/header/header-icons";
import { MarketSelector } from "@/components/layout/header/market-selector";
import { buttonStyles } from "@/components/ui/button";
import type { HeaderMenuItem } from "@/types/site";

interface MobileHeaderDrawerProps {
  items: HeaderMenuItem[];
}

function FeaturedCollections() {
  const collections = [
    {
      title: "New Arrivals",
      href: "/products",
      image: "/images/banners/tea-ingredients.jpg",
    },
    {
      title: "Best Sellers",
      href: "/products",
      image: "/images/blog/pumpkin-sunflower-seeds.jpg",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {collections.map((collection) => (
        <Link
          key={collection.title}
          href={collection.href}
          className="group overflow-hidden rounded-[1.05rem] border border-olive-950/8 bg-[#f8f6f1]"
        >
          <div className="relative aspect-[1.18] overflow-hidden">
            <Image
              src={collection.image}
              alt={`${collection.title} collection preview`}
              fill
              sizes="45vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="px-3 py-3 text-sm font-semibold text-olive-950">{collection.title}</div>
        </Link>
      ))}
    </div>
  );
}

export function MobileHeaderDrawer({ items }: MobileHeaderDrawerProps) {
  return (
    <div className="premium-panel max-h-[calc(100svh-6.25rem)] overflow-y-auto rounded-[1.2rem] border border-black/5 bg-white p-4 shadow-[0_30px_90px_-46px_rgba(19,32,24,0.32)]">
      <div className="grid gap-3">
        {items.map((item) => {
          const hasChildren = Boolean(item.sections?.length || item.cards?.length);

          if (!hasChildren && item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-[1rem] border border-olive-950/8 bg-[#f8f6f1] px-4 py-3.5 text-sm font-medium text-olive-950"
              >
                {item.label}
              </Link>
            );
          }

          return (
            <details key={item.label} className="rounded-[1rem] border border-olive-950/8 bg-[#f8f6f1] p-1">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-[0.9rem] px-4 py-3.5 text-sm font-medium text-olive-950">
                <span className="inline-flex items-center gap-2">
                  {item.label}
                  {item.badge ? (
                    <span className="rounded-[0.35rem] bg-[#d9c4f4] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-olive-950">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <ChevronDownIcon />
              </summary>

              <div className="grid gap-4 px-3 pb-3">
                {item.sections?.map((section) => (
                  <div key={section.title} className="rounded-[0.95rem] bg-white p-4">
                    <p className="text-sm font-semibold text-olive-950">{section.title}</p>
                    <ul className="mt-3 space-y-2">
                      {section.links.map((link) => (
                        <li key={`${section.title}-${link.label}-${link.href}`}>
                          <Link href={link.href} className="text-sm text-olive-700">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {item.cards?.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="rounded-[0.95rem] bg-white px-4 py-4 text-sm text-olive-950"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                      {card.eyebrow || item.label}
                    </p>
                    <p className="mt-2 font-semibold">{card.title}</p>
                    <p className="mt-1 leading-6 text-olive-700">{card.description}</p>
                  </Link>
                ))}
              </div>
            </details>
          );
        })}

        <Link href="/wholesale" className={buttonStyles({ className: "mt-2 w-full" })}>
          Bulk / Wholesale
        </Link>
        <MarketSelector mobile />
        <Link href="/contact" className={buttonStyles({ variant: "secondary", className: "w-full" })}>
          Contact Support
        </Link>

        <FeaturedCollections />
      </div>
    </div>
  );
}
