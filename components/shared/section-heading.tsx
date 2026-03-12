import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";
  const hasAction = Boolean(action);

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "mx-auto max-w-3xl items-center text-center"
          : hasAction && "lg:flex-row lg:items-end lg:justify-between",
      )}
    >
      <div className={cn("space-y-4", centered && "max-w-3xl")}>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-olive-800 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {hasAction ? <div className={cn(centered && "flex w-full justify-center")}>{action}</div> : null}
    </div>
  );
}
