"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProductDetail } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: ProductDetail;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const defaultShade = product.shades[0];

  return (
    <article
      className={cn("group flex flex-col gap-4", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={product.href}
        className="relative block aspect-[3/4] overflow-hidden bg-paper-warm outline-offset-4"
      >
        <Image
          src={hovered ? product.imageHoverSrc : product.imageSrc}
          alt={product.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 768px) 50vw, 25vw"
          className={cn(
            "object-contain p-6 transition-transform duration-500 ease-out",
            "group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-paper/95 px-4 py-3 transition-transform duration-300",
            "group-hover:translate-y-0 group-focus-within:translate-y-0",
            "motion-reduce:translate-y-0 motion-reduce:opacity-100",
          )}
        >
          <p className="text-xs text-ink-soft">
            {defaultShade?.name ?? product.shade}
          </p>
          <button
            type="button"
            aria-label={`Quick add ${product.name} to bag`}
            className="inline-flex size-10 cursor-pointer items-center justify-center text-lg text-ink transition-colors hover:text-rose"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!defaultShade) return;
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                shadeId: defaultShade.id,
                shadeName: defaultShade.name,
                finish: product.finish,
                price: product.price,
                imageSrc: product.imageSrc,
              });
            }}
          >
            +
          </button>
        </div>
      </Link>

      <div className="flex items-end justify-between gap-3">
        <div>
          <Link href={product.href} className="font-medium text-ink">
            {product.name}
          </Link>
          <p className="text-sm text-ink-soft">
            {product.finish} / {product.shade}
          </p>
        </div>
        <p className="text-sm text-ink">{product.priceLabel}</p>
      </div>
    </article>
  );
}
