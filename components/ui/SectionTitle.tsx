import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs tracking-[0.3em] uppercase font-medium mb-3",
            light ? "text-[#00AEEF]" : "text-[#00AEEF]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-playfair text-3xl md:text-4xl lg:text-5xl leading-tight",
          light ? "text-white" : "text-[#0B1E2D]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-2xl",
            center && "mx-auto",
            light ? "text-white/70" : "text-[#0B1E2D]/60"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
