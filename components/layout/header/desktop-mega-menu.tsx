import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/layout/header/header-icons";
import type { HeaderMenuCard, HeaderMenuItem } from "@/types/site";
import { cn } from "@/lib/utils";

function MenuCard({ card }: { card: HeaderMenuCard }) {
  return (
    <Link
      href={card.href}
      className="group block overflow-hidden rounded-[1.2rem] border border-olive-950/8 bg-sand-50/80 p-2.5 transition duration-300 hover:-translate-y-1 hover:bg-white"
    >
      <div className="relative aspect-[1.8] overflow-hidden rounded-[0.95rem] bg-sand-100">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 1280px) 16vw, 80vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      {card.eyebrow ? (
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-olive-700">
          {card.eyebrow}
        </p>
      ) : null}
      <p className="mt-1.5 text-[1rem] font-semibold text-olive-950">{card.title}</p>
      <p className="mt-1 text-sm leading-6 text-olive-700">{card.description}</p>
    </Link>
  );
}

export function DesktopMegaMenu({ item }: { item: HeaderMenuItem }) {
  const hasSections = Boolean(item.sections?.length);
  const hasCards = Boolean(item.cards?.length);
  const layout = item.layout || "catalog";

  return (
    <div className="premium-panel overflow-hidden rounded-[1.2rem] border border-black/5 bg-white px-6 py-6 shadow-[0_32px_90px_-42px_rgba(19,32,24,0.32)]">
      <div className="grid gap-6">
        {layout === "catalog" && hasSections ? (
          <div className={cn("grid gap-4", hasCards ? "xl:grid-cols-[1.4fr_0.48fr]" : "grid-cols-1")}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {item.sections?.map((section) => (
                <div
                  key={section.title}
                  className="space-y-4 rounded-[1rem] border border-olive-950/6 bg-[#f8f6f1] px-5 py-4"
                >
                  <p className="text-[0.98rem] font-semibold tracking-[-0.01em] text-olive-950">
                    {section.title}
                  </p>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.label}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-[0.94rem] text-olive-700 transition hover:text-olive-950"
                        >
                          <span>{link.label}</span>
                          <span className="opacity-0 transition group-hover:opacity-100">
                            <ArrowRightIcon />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {hasCards ? (
              <div className="grid gap-4">
                {item.cards?.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group overflow-hidden rounded-[1rem] border border-olive-950/8 bg-[#f8f6f1] p-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive-700">
                      {card.eyebrow}
                    </p>
                    <p className="mt-2 text-[1.05rem] font-semibold text-olive-950">{card.title}</p>
                    <div className="relative mt-3 aspect-[1.05] overflow-hidden rounded-[0.9rem]">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes="(min-width: 1280px) 18vw, 40vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-olive-700">{card.description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-olive-950">
                      Explore now
                      <ArrowRightIcon />
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {layout === "condensed" && hasSections ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {item.sections?.flatMap((section) =>
              section.links.map((link) => (
                <Link
                  key={`${section.title}-${link.label}-${link.href}`}
                  href={link.href}
                  className="rounded-[0.95rem] border border-olive-950/6 bg-[#f8f6f1] px-4 py-4 text-[0.96rem] font-medium text-olive-900 transition hover:bg-white"
                >
                  {link.label}
                </Link>
              )),
            )}
          </div>
        ) : null}

        {layout === "cards" && hasCards ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {item.cards?.map((card) => (
              <MenuCard key={card.title} card={card} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
