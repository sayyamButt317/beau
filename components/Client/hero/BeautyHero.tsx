"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroProduct } from "@/components/Client/hero/HeroProduct";
import { HeroProductInfo } from "@/components/Client/hero/HeroProductInfo";
import { HeroReveal } from "@/components/Client/hero/HeroReveal";
import { HeroScrollCue } from "@/components/Client/hero/HeroScrollCue";
import { duration, ease } from "@/lib/motion";
import { featuredHeroProduct } from "@/lib/products";

/**
 * Directed product-reveal scene — one choreographed entrance, not scattered fades.
 * DESIGN.md §7
 */
export function BeautyHero() {
  const reduceMotion = useReducedMotion();
  const product = featuredHeroProduct;

  return (
    <section
      aria-label="Campaign hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-paper"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.reveal, ease: ease.soft }}
      >
        <div className="absolute inset-0 bg-paper" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--blush)_42%,transparent),transparent_68%)]" />
        <div className="absolute inset-x-[10%] bottom-[-10%] h-[45%] bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_srgb,var(--nude)_28%,transparent),transparent_70%)]" />
      </motion.div>

      <div className="container-beau relative flex min-h-[100svh] flex-col pt-[var(--header-h)]">
        {/* Mobile: product first, copy + info below */}
        <div className="flex flex-1 flex-col lg:hidden">
          <div className="flex flex-1 items-center justify-center py-6">
            <HeroProduct product={product} />
          </div>
          <div className="flex flex-col gap-8 pb-10">
            <HeroReveal />
            <HeroProductInfo product={product} />
            <div className="flex justify-center pb-2">
              <HeroScrollCue />
            </div>
          </div>
        </div>

        {/* Desktop: editorial composition */}
        <div className="hidden min-h-[calc(100svh-var(--header-h))] flex-1 grid-cols-12 items-end gap-6 pb-10 pt-8 lg:grid">
          <div className="col-span-4 flex h-full flex-col justify-end pb-16">
            <HeroReveal />
          </div>

          <div className="col-span-4 flex h-full flex-col items-center justify-center">
            <HeroProduct product={product} />
          </div>

          <div className="col-span-4 flex h-full flex-col items-end justify-end gap-10 pb-16">
            <HeroProductInfo product={product} />
          </div>

          <div className="col-span-12 flex justify-center pb-2">
            <HeroScrollCue />
          </div>
        </div>
      </div>
    </section>
  );
}
