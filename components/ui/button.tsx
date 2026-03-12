import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonStylesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-olive-950 text-sand-50 shadow-[0_18px_40px_-20px_rgba(19,32,24,0.9)] hover:-translate-y-0.5 hover:bg-olive-900",
  secondary:
    "border border-olive-950/12 bg-white/92 text-olive-950 shadow-[0_14px_30px_-22px_rgba(19,32,24,0.38)] hover:-translate-y-0.5 hover:bg-sand-50",
  ghost: "text-olive-950 hover:bg-olive-950/6",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-12 px-6 py-3.5 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStylesOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
