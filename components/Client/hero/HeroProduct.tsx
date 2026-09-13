"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { FeaturedHeroProduct } from "@/lib/products";

type HeroProductProps = {
  product: FeaturedHeroProduct;
  className?: string;
};

export function HeroProduct({ product, className }: HeroProductProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative mx-auto w-full max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]", className)}>
      <motion.div
        className="relative aspect-[2/3] w-full"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, scale: 1.12, y: 28 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: duration.hero,
          delay: reduceMotion ? 0 : 0.18,
          ease: ease.out,
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -7, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                }
          }
        >
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 70vw, 360px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      {product.isPlaceholder ? (
        <p className="mt-3 text-center text-[0.6875rem] tracking-[0.14em] text-ink-soft uppercase">
          Placeholder — replace with product photo
        </p>
      ) : null}
    </div>
  );
}
