"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import type { ProductDetail, ProductShade } from "@/lib/products";

type AddToBagProps = {
  product: ProductDetail;
  shade: ProductShade;
  quantity?: number;
};

export function AddToBag({ product, shade, quantity = 1 }: AddToBagProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [status, setStatus] = useState<"idle" | "added">("idle");

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="w-full"
        onClick={() => {
          addItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            shadeId: shade.id,
            shadeName: shade.name,
            finish: product.finish,
            price: product.price,
            imageSrc: product.imageSrc,
            quantity,
          });
          setStatus("added");
          window.setTimeout(() => setStatus("idle"), 1600);
        }}
      >
        {status === "added" ? "Added to bag" : "Add to bag"}
      </Button>
      <p className="sr-only" aria-live="polite">
        {status === "added"
          ? `${product.name} in ${shade.name} added to bag`
          : ""}
      </p>
    </div>
  );
}
