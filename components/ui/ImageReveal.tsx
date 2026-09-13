"use client";

import { motion, useReducedMotion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

type ImageRevealProps = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
  figureClassName?: string;
  delay?: number;
};

/**
 * Masked image reveal — DESIGN.md prefers clip-path over generic fades.
 */
export function ImageReveal({
  className,
  figureClassName,
  delay = 0,
  alt,
  ...imageProps
}: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={cn("relative overflow-hidden", figureClassName)}
      initial={
        reduceMotion
          ? false
          : { clipPath: "inset(8% 8% 8% 8%)", opacity: 0.85 }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: duration.reveal, delay, ease: ease.out }}
    >
      <Image
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        {...imageProps}
      />
    </motion.figure>
  );
}
