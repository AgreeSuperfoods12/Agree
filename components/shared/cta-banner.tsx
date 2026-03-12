import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

interface CtaBannerProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaBannerProps) {
  return (
    <section className="section-shell">
      <Container>
        <div className="dark-panel overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sand-100/65">
                Ready to talk
              </p>
              <h2 className="mt-4 text-3xl text-sand-50 sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-sand-100/78">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={primaryHref} className={buttonStyles({ size: "lg" })}>
                {primaryLabel}
              </Link>
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "bg-white text-olive-950",
                  })}
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
