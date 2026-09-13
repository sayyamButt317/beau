"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { duration, ease } from "@/lib/motion";
import type { FeaturedHeroProduct } from "@/lib/products";

type HeroProductInfoProps = {
  product: FeaturedHeroProduct;
};

export function HeroProductInfo({ product }: HeroProductInfoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label={`${product.name} details`}
      className="flex w-full max-w-[16rem] flex-col gap-5 border border-line bg-paper/70 p-5 backdrop-blur-[2px] md:ml-auto"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.ui,
        delay: reduceMotion ? 0 : 1.05,
        ease: ease.out,
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[0.6875rem] tracking-[0.2em] text-ink-soft uppercase">
          The Beau
        </p>
        <h2 className="font-display text-2xl leading-tight tracking-[-0.02em] text-ink">
          {product.name}
        </h2>
        <p className="text-sm text-ink-soft">
          {product.finish} · {product.shade}
        </p>
      </div>

      <p className="text-sm font-medium tracking-[0.04em] text-ink">
        {product.priceLabel}
      </p>

      <Link
        href={product.href}
        className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors duration-200 hover:bg-ink-soft"
      >
        Shop now
        <ArrowRight
          aria-hidden
          className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      </Link>

      <Link
        href={product.href}
        className="text-center text-xs tracking-[0.08em] text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        View collection
      </Link>
    </motion.aside>
  );
}
