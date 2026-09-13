"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { bestSellerProducts, formatPrice } from "@/lib/products";
import { duration, ease } from "@/lib/motion";

export function CartDrawer() {
  const reduceMotion = useReducedMotion();
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotalLabel = useCartStore((state) => state.subtotalLabel());

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const suggestions = bestSellerProducts
    .filter((product) => !lines.some((line) => line.productId === product.id))
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            className="fixed inset-0 z-[60] cursor-pointer bg-ink/30"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: duration.ui }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-paper shadow-none"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{ duration: duration.ui, ease: ease.out }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-sm tracking-[0.18em] text-ink uppercase">
                Your bag
              </h2>
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center text-ink"
                aria-label="Close bag"
                onClick={close}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {lines.length === 0 ? (
                <p className="text-sm leading-relaxed text-ink-soft">
                  Your bag is empty. Discover something tactile from the new
                  collection.
                </p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4">
                      <div className="relative size-20 shrink-0 bg-paper-warm">
                        <Image
                          src={line.imageSrc}
                          alt=""
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-ink">{line.name}</p>
                            <p className="text-sm text-ink-soft">
                              {line.shadeName} · {line.finish}
                            </p>
                          </div>
                          <p className="text-sm text-ink">
                            {formatPrice(line.price * line.quantity)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center border border-line">
                            <button
                              type="button"
                              className="inline-flex size-9 cursor-pointer items-center justify-center text-ink"
                              aria-label={`Decrease ${line.name}`}
                              onClick={() =>
                                setQuantity(line.key, line.quantity - 1)
                              }
                            >
                              −
                            </button>
                            <span className="min-w-8 text-center text-sm">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="inline-flex size-9 cursor-pointer items-center justify-center text-ink"
                              aria-label={`Increase ${line.name}`}
                              onClick={() =>
                                setQuantity(line.key, line.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="cursor-pointer text-xs tracking-[0.08em] text-ink-soft uppercase hover:text-ink"
                            onClick={() => removeItem(line.key)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {suggestions.length > 0 ? (
                <div className="mt-10 border-t border-line pt-8">
                  <p className="text-sm tracking-[0.12em] text-ink-soft uppercase">
                    You may also like
                  </p>
                  <ul className="mt-4 flex flex-col gap-4">
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={product.href}
                          onClick={close}
                          className="flex items-center justify-between gap-3 text-sm text-ink hover:text-rose"
                        >
                          <span>{product.name}</span>
                          <span className="text-ink-soft">
                            {product.priceLabel}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="border-t border-line px-5 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-medium text-ink">{subtotalLabel}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="inline-flex min-h-12 w-full items-center justify-center bg-ink text-sm font-medium tracking-[0.06em] text-paper uppercase transition-colors hover:bg-ink-soft"
              >
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
