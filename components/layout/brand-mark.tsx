import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  inverse?: boolean;
  compact?: boolean;
}

export function BrandMark({ className, inverse = false, compact = false }: BrandMarkProps) {
  const logoSrc = inverse
    ? "/images/logo/agreesuperfoodswhitelogo.png"
    : "/images/logo/agreesuperfoods.png";
  const width = compact ? 450 : 900;
  const height = compact ? 168 : 337;

  return (
    <Link
      href="/"
      aria-label="Agree Superfoods"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={logoSrc}
        alt="Agree Superfoods"
        width={width}
        height={height}
        priority={!compact}
        className={cn(
          "h-auto w-auto",
          compact ? "max-w-[7.35rem] sm:max-w-[8.75rem]" : "max-w-[14rem] sm:max-w-[16rem]",
        )}
      />
    </Link>
  );
}
