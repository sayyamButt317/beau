/** Shared motion tokens — DESIGN.md §17 */

export const duration = {
  micro: 0.2,
  ui: 0.35,
  reveal: 0.65,
  hero: 1.15,
  scroll: 1.2,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.42, 0, 0.58, 1] as const,
  soft: [0.25, 0.1, 0.25, 1] as const,
};

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
