import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/layout/header/header-icons";
import type { CollectionTile } from "@/types/home";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface CollectionBrowseSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  items: CollectionTile[];
}

function CollectionFeatureCard({
  item,
  index,
  variant = "standard",
}: {
  item: CollectionTile;
  index: number;
  variant?: "feature" | "wide" | "standard";
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[2rem] border border-black/6 bg-[#f4efe5] shadow-[0_24px_70px_-42px_rgba(19,32,24,0.26)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_90px_-42px_rgba(19,32,24,0.34)]",
        variant === "feature" && "min-h-[28rem] md:min-h-[34rem]",
        variant === "wide" && "md:col-span-2 min-h-[18rem]",
        variant === "standard" && "min-h-[18rem] sm:min-h-[20rem]",
      )}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={
          variant === "feature"
            ? "(min-width: 1280px) 40vw, 100vw"
            : variant === "wide"
              ? "(min-width: 1280px) 38vw, 100vw"
              : "(min-width: 1280px) 20vw, (min-width: 768px) 40vw, 100vw"
        }
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div
        className={cn(
          "absolute inset-0",
          variant === "feature"
            ? "bg-[linear-gradient(180deg,rgba(19,32,24,0.04)_0%,rgba(19,32,24,0.18)_42%,rgba(19,32,24,0.7)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(19,32,24,0.06)_0%,rgba(19,32,24,0.2)_45%,rgba(19,32,24,0.76)_100%)]",
        )}
      />

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="rounded-full border border-white/28 bg-white/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          Collection {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <div className="rounded-[1.35rem] border border-white/18 bg-[rgba(255,250,243,0.92)] p-4 shadow-[0_16px_34px_-22px_rgba(19,32,24,0.4)] backdrop-blur-md sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={cn(
                  "font-sans font-semibold tracking-[-0.03em] text-olive-950",
                  variant === "feature" ? "text-[1.9rem] sm:text-[2.2rem]" : "text-[1.45rem] sm:text-[1.6rem]",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-2 max-w-[28rem] text-olive-800",
                  variant === "feature" ? "text-base leading-7 sm:text-lg" : "text-sm leading-6 sm:text-[0.98rem]",
                )}
              >
                {item.description}
              </p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive-950 text-sand-50 transition duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CollectionBrowseSection({
  eyebrow,
  title,
  description,
  items,
}: CollectionBrowseSectionProps) {
  const [featureItem, ...secondaryItems] = items;

  return (
    <section className="section-shell pt-0">
      <Container>
        <div className="relative overflow-hidden rounded-[2.3rem] border border-black/5 bg-[linear-gradient(180deg,#f7f2e8_0%,#efe8da_100%)] px-5 py-6 shadow-[0_32px_90px_-56px_rgba(19,32,24,0.24)] sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-[#d8c48b]/18 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#cad8cb]/30 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[0.84fr_1.16fr] xl:items-end">
            <div className="max-w-[34rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-olive-700">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[4.2rem] lg:leading-[0.96]">
                {title}
              </h2>
              <p className="mt-5 max-w-[30rem] text-lg leading-8 text-olive-800">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <span
                    key={`${item.title}-chip`}
                    className="rounded-full border border-olive-950/10 bg-white/74 px-4 py-2 text-sm text-olive-800 shadow-[0_12px_26px_-24px_rgba(19,32,24,0.35)]"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-olive-950/8 bg-white/72 p-4 shadow-[0_16px_34px_-28px_rgba(19,32,24,0.24)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                  Category count
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-olive-950">
                  {String(items.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-6 text-olive-800">
                  Curated routes for faster product discovery.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-olive-950/8 bg-white/72 p-4 shadow-[0_16px_34px_-28px_rgba(19,32,24,0.24)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                  Browse style
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-olive-950">
                  Pantry-first
                </p>
                <p className="mt-2 text-sm leading-6 text-olive-800">
                  Everyday use, gifting, and tea-led exploration.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-olive-950/8 bg-olive-950 p-4 text-sand-50 shadow-[0_18px_38px_-24px_rgba(19,32,24,0.44)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sand-100/68">
                  Shopping route
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-sand-50">
                  Visual collection browse
                </p>
                <p className="mt-2 text-sm leading-6 text-sand-100/78">
                  Jump straight into categories before reading product pages.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
            {featureItem ? (
              <CollectionFeatureCard item={featureItem} index={0} variant="feature" />
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              {secondaryItems[0] ? (
                <CollectionFeatureCard item={secondaryItems[0]} index={1} variant="wide" />
              ) : null}
              {secondaryItems.slice(1).map((item, index) => (
                <CollectionFeatureCard
                  key={item.title}
                  item={item}
                  index={index + 2}
                  variant="standard"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
