import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[90rem] px-5 sm:px-7 lg:px-8 xl:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
