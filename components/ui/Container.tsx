import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className, wide = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        wide ? "max-w-8xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
