"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { duration, ease } from "@/lib/motion";
import {
  getProductById,
  lookHotspots,
  type LookHotspot,
} from "@/lib/products";
import { cn } from "@/lib/cn";

export function ShopTheLook() {
  const [activeId, setActiveId] = useState(lookHotspots[0].id);
  const reduceMotion = useReducedMotion();
  const activeHotspot =
    lookHotspots.find((spot) => spot.id === activeId) ?? lookHotspots[0];
  const activeProduct = getProductById(activeHotspot.productId);

  return (
    <section
      id="shop-the-look"
      aria-label="Shop the look"
      className="bg-paper-warm/50 py-[var(--space-section)]"
    >
      <div className="container-beau mb-10 md:mb-14">
        <Reveal>
          <SectionHeading
            title="Shop the Look"
            description="Tap a hotspot to uncover the product behind each part of the finish."
          />
        </Reveal>
      </div>

      <div className="container-beau grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#dccfc6] lg:col-span-8">
          {/* Campaign look placeholder */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 48% 36%, #f0e4dc 0%, transparent 28%),
                radial-gradient(circle at 50% 70%, #c9a59a 0%, transparent 40%),
                linear-gradient(180deg, #e8ddd4 0%, #d2bfb4 100%)
              `,
            }}
            aria-hidden
          />
          <p className="absolute left-4 top-4 text-[0.6875rem] tracking-[0.16em] text-ink/60 uppercase">
            Placeholder look — replace with campaign photography
          </p>

          {lookHotspots.map((spot) => (
            <HotspotButton
              key={spot.id}
              spot={spot}
              active={spot.id === activeId}
              onSelect={() => setActiveId(spot.id)}
            />
          ))}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHotspot.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: duration.ui, ease: ease.out }}
              className="flex flex-col gap-4 border border-line bg-paper p-6"
            >
              <p className="text-[0.6875rem] tracking-[0.18em] text-ink-soft uppercase">
                {activeHotspot.label}
              </p>
              {activeProduct ? (
                <>
                  <h3 className="font-display text-3xl tracking-[-0.02em] text-ink">
                    {activeProduct.name}
                  </h3>
                  <p className="text-sm text-ink-soft">
                    {activeProduct.finish} / {activeProduct.shade}
                  </p>
                  <p className="text-sm font-medium text-ink">
                    {activeProduct.priceLabel}
                  </p>
                  <Link
                    href={activeProduct.href}
                    className="mt-2 inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
                  >
                    Shop this product
                  </Link>
                </>
              ) : (
                <p className="text-sm text-ink-soft">Product unavailable.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function HotspotButton({
  spot,
  active,
  onSelect,
}: {
  spot: LookHotspot;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${spot.label} — view product`}
      aria-pressed={active}
      className={cn(
        "absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center",
        "rounded-full border border-ink/20 bg-paper/85 backdrop-blur-[2px] transition-transform duration-200",
        "hover:scale-105 focus-visible:scale-105 motion-reduce:hover:scale-100",
        active && "border-ink bg-ink text-paper",
      )}
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          active ? "bg-paper" : "bg-ink",
        )}
        aria-hidden
      />
    </button>
  );
}
