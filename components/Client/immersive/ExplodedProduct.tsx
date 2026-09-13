"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { featuredHeroProduct } from "@/lib/products";

const stages = [
  { id: "product", label: "01 Product", copy: "The complete object." },
  { id: "open", label: "02 Open", copy: "The cap lifts away." },
  { id: "formula", label: "03 Formula", copy: "Pigment comes into view." },
  { id: "shade", label: "04 Shade", copy: "Color spreads into the space." },
  { id: "look", label: "05 Application", copy: "The finish on skin." },
  { id: "buy", label: "06 Purchase", copy: "Bring it home." },
] as const;

export function ExplodedProduct() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const capY = useTransform(
    scrollYProgress,
    [0.08, 0.26, 0.72, 0.88],
    [0, -130, -130, 0],
  );
  const bodyY = useTransform(
    scrollYProgress,
    [0.08, 0.26, 0.72, 0.88],
    [0, 18, 18, 0],
  );
  const formulaOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.38, 0.72, 0.88],
    [0, 1, 1, 0.35],
  );
  const formulaScale = useTransform(
    scrollYProgress,
    [0.26, 0.42, 0.72, 0.88],
    [0.65, 1.2, 1.2, 0.85],
  );
  const shadeSpread = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const lookOpacity = useTransform(scrollYProgress, [0.55, 0.68], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);

  useEffect(() => {
    if (reduceMotion) return;
    return scrollYProgress.on("change", (value) => {
      setStageIndex(
        Math.min(stages.length - 1, Math.floor(value * stages.length)),
      );
    });
  }, [scrollYProgress, reduceMotion]);

  const stage = useMemo(() => stages[stageIndex], [stageIndex]);

  if (reduceMotion) {
    return (
      <section
        id="exploded-product"
        aria-label="Product anatomy"
        className="bg-paper py-[var(--space-section)]"
      >
        <div className="container-beau grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm tracking-[0.16em] text-ink-soft uppercase">
              Signature interaction
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              Inside Soft Blush
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              Cap, body, formula, and shade — explored as one calm sequence.
              Reduced motion is on, so the scroll explode is shown as a static
              diagram.
            </p>
            <ol className="mt-6 space-y-2 text-sm text-ink-soft">
              {stages.map((item) => (
                <li key={item.id}>
                  <span className="text-ink">{item.label}</span> — {item.copy}
                </li>
              ))}
            </ol>
            <Link
              href={featuredHeroProduct.href}
              className="mt-8 inline-flex min-h-11 items-center bg-ink px-6 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
            >
              Shop Soft Blush
            </Link>
          </div>
          <StaticExplodedPreview />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="exploded-product"
      aria-label="Exploded product experience"
      className="relative h-[320vh] bg-paper"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: shadeSpread,
            background:
              "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--rose-soft) 55%, transparent), transparent 65%)",
          }}
          aria-hidden
        />

        <div className="container-beau grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm tracking-[0.16em] text-ink-soft uppercase">
              Signature interaction
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              Inside Soft Blush
            </h2>

            <div className="mt-8" aria-live="polite">
              <p className="text-sm tracking-[0.12em] text-rose uppercase">
                {stage.label}
              </p>
              <p className="mt-2 text-base text-ink-soft">{stage.copy}</p>
            </div>

            <motion.div style={{ opacity: ctaOpacity }} className="mt-8">
              <Link
                href={featuredHeroProduct.href}
                className="inline-flex min-h-11 items-center bg-ink px-6 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
              >
                Shop Soft Blush
              </Link>
            </motion.div>
          </div>

          <div className="relative mx-auto flex h-[min(70vh,34rem)] w-full max-w-md items-center justify-center lg:col-span-8">
            <motion.div
              className="absolute inset-10 rounded-full bg-blush/50"
              style={{ opacity: lookOpacity }}
              aria-hidden
            />

            <motion.div
              className="absolute z-30 h-16 w-28 bg-ink"
              style={{ y: capY, top: "18%" }}
              aria-hidden
            />

            <motion.div
              className="absolute z-20 flex h-56 w-36 flex-col overflow-hidden border border-ink/15 bg-paper"
              style={{ y: bodyY, top: "32%" }}
              aria-hidden
            >
              <div className="h-10 bg-rose" />
              <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3">
                <span className="font-display text-lg tracking-[0.18em] text-ink">
                  BEAU
                </span>
                <span className="text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
                  Soft Blush
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute z-10 size-28 rounded-full bg-rose-soft"
              style={{
                opacity: formulaOpacity,
                scale: formulaScale,
                top: "58%",
              }}
              aria-hidden
            />

            <p className="absolute bottom-2 text-center text-[0.6875rem] tracking-[0.14em] text-ink-soft uppercase">
              Placeholder layers — replace with product photography
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticExplodedPreview() {
  return (
    <div
      className="relative mx-auto flex h-[28rem] w-full max-w-sm flex-col items-center justify-center gap-3"
      aria-hidden
    >
      <div className="h-14 w-28 bg-ink" />
      <div className="flex h-52 w-36 flex-col overflow-hidden border border-ink/15 bg-paper">
        <div className="h-10 bg-rose" />
        <div className="flex flex-1 items-center justify-center font-display text-lg tracking-[0.18em]">
          BEAU
        </div>
      </div>
      <div className="size-24 rounded-full bg-rose-soft" />
    </div>
  );
}
