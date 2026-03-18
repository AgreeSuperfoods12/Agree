import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  const hasChildren = Boolean(children);

  return (
    <section className={cn("section-shell relative overflow-hidden pt-24 sm:pt-28 lg:pt-28", className)}>
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_right,rgba(201,159,58,0.2),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(39,64,51,0.08),transparent_32%)]" />
      <Container className="relative">
        <div className="premium-panel relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-gold-300/35 blur-3xl" />
          <div className="absolute left-0 top-1/3 h-40 w-40 rounded-full bg-olive-200/35 blur-3xl" />
          <div
            className={cn(
              "relative grid gap-8",
              hasChildren && "lg:grid-cols-[1.1fr_0.7fr] lg:items-end",
            )}
          >
            <div>
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-olive-700">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-4 max-w-4xl break-words text-[2.5rem] leading-[0.98] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-7 text-olive-800 sm:text-lg sm:leading-8">
                {description}
              </p>
            </div>
            {hasChildren ? <div className="max-w-lg">{children}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
