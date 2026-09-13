"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { duration, ease } from "@/lib/motion";

type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  id: string;
  open: boolean;
  links: readonly NavLink[];
  onClose: () => void;
};

export function MobileMenu({ id, open, links, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-paper pt-[var(--header-h)] md:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: duration.ui, ease: ease.out }}
        >
          <nav
            aria-label="Mobile"
            className="container-beau flex h-full flex-col gap-2 py-8"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.ui,
                  delay: reduceMotion ? 0 : 0.04 * index,
                  ease: ease.out,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-display text-[clamp(2rem,8vw,2.75rem)] leading-none tracking-[-0.02em] text-ink"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <button
              type="button"
              className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm tracking-[0.06em] text-ink-soft uppercase"
              aria-label="Search"
            >
              <Search className="size-4" strokeWidth={1.75} />
              Search
            </button>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
