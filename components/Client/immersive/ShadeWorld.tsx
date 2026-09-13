"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { duration, ease } from "@/lib/motion";
import { shadeWorldOptions } from "@/lib/products";
import { cn } from "@/lib/cn";

export function ShadeWorld() {
  const [activeId, setActiveId] = useState(shadeWorldOptions[0].id);
  const reduceMotion = useReducedMotion();
  const active =
    shadeWorldOptions.find((shade) => shade.id === activeId) ??
    shadeWorldOptions[0];

  return (
    <section
      id="shade-world"
      aria-labelledby="shade-world-heading"
      className="relative overflow-hidden py-[var(--space-section)] transition-colors duration-500 motion-reduce:transition-none"
      style={{ backgroundColor: active.field }}
    >
      <div className="container-beau grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <h2
              id="shade-world-heading"
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
            >
              Your shade.
              <br />
              Your mood.
            </h2>
          </Reveal>

          <div
            role="listbox"
            aria-label="Shade options"
            aria-activedescendant={`shade-${active.id}`}
            className="mt-10 flex flex-wrap gap-3"
          >
            {shadeWorldOptions.map((shade) => {
              const selected = shade.id === active.id;
              return (
                <button
                  key={shade.id}
                  id={`shade-${shade.id}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setActiveId(shade.id)}
                  onFocus={() => setActiveId(shade.id)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center gap-3 border px-4 py-2 text-sm tracking-[0.04em] transition-colors",
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-transparent text-ink hover:border-ink/40",
                  )}
                >
                  <span
                    className="size-3.5 rounded-full"
                    style={{ backgroundColor: shade.swatch }}
                    aria-hidden
                  />
                  {shade.name}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: duration.ui, ease: ease.out }}
              className="mt-8 max-w-sm"
            >
              <p className="text-sm tracking-[0.12em] text-ink-soft uppercase">
                {active.mood}
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden bg-paper/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0.4, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: duration.ui, ease: ease.out }}
                style={{ backgroundColor: active.productTint }}
              />
            </AnimatePresence>

            {/* Stylized product + look placeholders */}
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div
                className="relative h-[70%] w-[38%] border border-ink/20 bg-paper shadow-[0_30px_60px_rgba(23,20,20,0.08)]"
                style={{ backgroundColor: active.swatch }}
                aria-hidden
              >
                <div className="absolute inset-x-[18%] top-[8%] h-[12%] bg-ink/80" />
                <div className="absolute inset-x-[22%] top-[22%] h-[8%] bg-paper/50" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/25 to-transparent p-6 pt-16">
              <p className="text-sm text-paper">
                Look preview placeholder — replace with campaign photography for{" "}
                {active.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
