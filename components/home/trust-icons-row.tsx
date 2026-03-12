import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { TrustIconItem } from "@/types/home";

interface TrustIconsRowProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: TrustIconItem[];
  dark?: boolean;
}

export function TrustIconsRow({
  eyebrow,
  title,
  description,
  items,
  dark = false,
}: TrustIconsRowProps) {
  return (
    <section className="section-shell">
      <Container>
        <div
          className={cn(
            "rounded-[2.5rem] border px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10",
            dark
              ? "border-white/10 bg-olive-950 text-sand-50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.55)]"
              : "border-olive-950/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(250,247,240,0.92))] shadow-[0_30px_80px_-52px_rgba(19,32,24,0.22)]",
          )}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
            <div className="max-w-[34rem]">
              {eyebrow ? (
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.32em]",
                    dark ? "text-sand-100/72" : "text-olive-700",
                  )}
                >
                  {eyebrow}
                </p>
              ) : null}

              {title ? (
                <h2
                  className={cn(
                    "mt-4 max-w-[11ch] text-4xl sm:text-5xl",
                    dark ? "text-sand-50" : "text-olive-950",
                  )}
                >
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p
                  className={cn(
                    "mt-5 max-w-[34rem] text-base leading-8 sm:text-lg",
                    dark ? "text-sand-100/78" : "text-olive-800",
                  )}
                >
                  {description}
                </p>
              ) : null}

              <div
                className={cn(
                  "mt-7 rounded-[1.6rem] border px-5 py-4",
                  dark
                    ? "border-white/10 bg-white/5"
                    : "border-olive-950/8 bg-white/62 backdrop-blur-sm",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.22em]",
                    dark ? "text-sand-100/62" : "text-olive-500",
                  )}
                >
                  What this means
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-7 sm:text-base",
                    dark ? "text-sand-100/82" : "text-olive-700",
                  )}
                >
                  A quieter brand presentation, dependable product range, and support routes that
                  work for both everyday customers and trade buyers.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item, index) => (
                <article
                  key={item.title}
                  className={cn(
                    "flex min-h-[13.5rem] flex-col rounded-[1.7rem] border px-5 py-5 sm:px-6",
                    dark
                      ? "border-white/10 bg-white/6"
                      : "border-olive-950/8 bg-white/80 backdrop-blur-sm",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.26em]",
                        dark ? "text-sand-100/60" : "text-olive-400",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
                        dark
                          ? "bg-white/10 text-sand-50"
                          : "bg-olive-950 text-sand-50 shadow-[0_14px_28px_-20px_rgba(19,32,24,0.45)]",
                      )}
                    >
                      {item.iconText}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-8 max-w-[15ch] text-[1.8rem] leading-[1.05] tracking-[-0.03em]",
                      dark ? "text-sand-50" : "text-olive-950",
                    )}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-4 text-sm leading-7 sm:text-base",
                      dark ? "text-sand-100/76" : "text-olive-700",
                    )}
                  >
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
