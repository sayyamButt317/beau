import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-ink",
          "max-w-[18ch]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-md text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
