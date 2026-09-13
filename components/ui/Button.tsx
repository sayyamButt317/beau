"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize = "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrowOnHover?: boolean;
  children: ReactNode;
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm tracking-[0.04em]",
  lg: "min-h-12 px-7 text-sm tracking-[0.06em]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft disabled:bg-ink/40",
  secondary:
    "bg-transparent text-ink border border-line hover:border-ink/40 disabled:opacity-40",
  ghost: "bg-transparent text-ink hover:bg-paper-warm disabled:opacity-40",
  link: "bg-transparent text-ink underline-offset-4 hover:underline px-0 min-h-0 disabled:opacity-40",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      showArrowOnHover = variant === "primary",
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "group inline-flex cursor-pointer items-center justify-center gap-2 font-sans font-medium uppercase transition-[color,background-color,border-color,transform] duration-200",
          "active:scale-[0.98] disabled:active:scale-100",
          "motion-reduce:active:scale-100",
          variant !== "link" && sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {showArrowOnHover ? (
          <ArrowRight
            aria-hidden
            className={cn(
              "size-4 -translate-x-1 opacity-0 transition-all duration-200",
              "group-hover:translate-x-0 group-hover:opacity-100",
              "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
              "motion-reduce:transition-none",
            )}
          />
        ) : null}
      </button>
    );
  },
);
