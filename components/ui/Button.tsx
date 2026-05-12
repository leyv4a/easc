"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]";

  const variants = {
    primary:
      "bg-[#00AEEF] text-white hover:bg-[#0090c7] shadow-lg hover:shadow-[#00AEEF]/30 hover:shadow-xl",
    outline:
      "border border-white/60 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-white/80 hover:text-white hover:bg-white/10",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg hover:shadow-[#25D366]/40",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
