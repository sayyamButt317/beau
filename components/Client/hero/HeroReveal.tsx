"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

export function HeroReveal() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex max-w-xl flex-col gap-5 md:gap-6">
      <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
        <motion.span
          className="block"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration.reveal,
            delay: reduceMotion ? 0 : 0.55,
            ease: ease.out,
          }}
        >
          Beauty, but
        </motion.span>
        <motion.span
          className="block"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration.reveal,
            delay: reduceMotion ? 0 : 0.78,
            ease: ease.out,
          }}
        >
          make it yours
        </motion.span>
      </h1>

      <motion.p
        className="max-w-xs text-base leading-relaxed text-ink-soft md:text-lg"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: duration.ui,
          delay: reduceMotion ? 0 : 0.95,
          ease: ease.out,
        }}
      >
        Discover the new collection — tactile color, real skin, and finishes
        made for everyday confidence.
      </motion.p>
    </div>
  );
}
