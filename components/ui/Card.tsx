import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden relative",
        hover && "group cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
