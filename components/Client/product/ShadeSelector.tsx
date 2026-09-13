"use client";

import type { ProductShade } from "@/lib/products";
import { cn } from "@/lib/cn";

type ShadeSelectorProps = {
  shades: ProductShade[];
  value: string;
  onChange: (shadeId: string) => void;
};

export function ShadeSelector({ shades, value, onChange }: ShadeSelectorProps) {
  const active = shades.find((shade) => shade.id === value) ?? shades[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-ink">
          Shade{" "}
          <span className="text-ink-soft">
            {active?.code} · {active?.name}
          </span>
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Shade"
        className="flex flex-wrap gap-3"
      >
        {shades.map((shade) => {
          const selected = shade.id === active?.id;
          return (
            <button
              key={shade.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${shade.code} ${shade.name}`}
              onClick={() => onChange(shade.id)}
              className={cn(
                "relative flex size-11 cursor-pointer items-center justify-center rounded-full border transition-transform duration-200",
                selected
                  ? "scale-110 border-ink"
                  : "border-transparent hover:scale-105 motion-reduce:hover:scale-100",
              )}
            >
              <span
                className="size-8 rounded-full border border-line"
                style={{ backgroundColor: shade.swatch }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {active ? (
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          {active.description}
        </p>
      ) : null}
    </div>
  );
}
