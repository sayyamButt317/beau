"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { duration, ease } from "@/lib/motion";

type HeroScrollCueProps = {
  href?: string;
};

export function HeroScrollCue({ href = "#new-drop" }: HeroScrollCueProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className="inline-flex flex-col items-center gap-2 text-[0.6875rem] tracking-[0.22em] text-ink-soft uppercase transition-colors hover:text-ink"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration.ui,
        delay: reduceMotion ? 0 : 1.25,
        ease: ease.out,
      }}
    >
      <span>Scroll to discover</span>
      <motion.span
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ChevronDown className="size-4" strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  );
}
