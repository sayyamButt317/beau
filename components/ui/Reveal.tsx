"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: duration.reveal, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
