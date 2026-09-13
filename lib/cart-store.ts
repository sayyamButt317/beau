"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatPrice } from "@/lib/products";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  shadeId: string;
  shadeName: string;
  finish: string;
  price: number;
  imageSrc: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartLine, "key" | "quantity"> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
  subtotalLabel: () => string;
};

function lineKey(productId: string, shadeId: string) {
  return `${productId}:${shadeId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) => {
        const key = lineKey(item.productId, item.shadeId);
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.lines.find((line) => line.key === key);
          if (existing) {
            return {
              isOpen: true,
              lines: state.lines.map((line) =>
                line.key === key
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              ),
            };
          }
          return {
            isOpen: true,
            lines: [...state.lines, { ...item, key, quantity }],
          };
        });
      },
      removeItem: (key) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.key !== key),
        })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.key !== key)
              : state.lines.map((line) =>
                  line.key === key ? { ...line, quantity } : line,
                ),
        })),
      clear: () => set({ lines: [] }),
      subtotal: () =>
        get().lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
      count: () => get().lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotalLabel: () => formatPrice(get().subtotal()),
    }),
    {
      name: "beau-cart",
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
