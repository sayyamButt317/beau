"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WishlistButton } from "@/components/Client/commerce/WishlistButton";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";
import { useGetProductById } from "@/routes/client/query";
import type { ApiProduct } from "@/Types/Client/Product.Type";

type ApiProductDetailViewProps = {
  productId: string;
};

export function ApiProductDetailView({ productId }: ApiProductDetailViewProps) {
  const { data, isLoading, isError, error, refetch } =
    useGetProductById(productId);
  const product = data?.data;

  if (isLoading) {
    return (
      <div className="container-beau py-[calc(var(--header-h)+3rem)]">
        <p className="text-sm text-ink-soft" aria-live="polite">
          Loading product…
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-beau max-w-md space-y-4 py-[calc(var(--header-h)+3rem)]">
        <p className="text-sm leading-relaxed text-ink-soft" role="alert">
          Couldn’t load this product
          {error instanceof Error ? `: ${error.message}` : "."}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex min-h-11 cursor-pointer items-center bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
          >
            Try again
          </button>
          <Link
            href="/product"
            className="inline-flex min-h-11 items-center border border-line px-5 text-sm tracking-[0.04em] text-ink uppercase"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: ApiProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "added">("idle");
  const addItem = useCartStore((state) => state.addItem);
  const imageSrc =
    product.picture?.secure_url || "/products/hero-product-placeholder.svg";
  const outOfStock = product?.stock && product?.stock <= 0;

  return (
    <div className="bg-paper">
      <section className="container-beau grid gap-10 pb-16 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12 lg:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm lg:col-span-7">
          <Image
            src={imageSrc}
            alt={product.productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <div>
            <p className="text-[0.6875rem] tracking-[0.22em] text-ink-soft uppercase">
              The Beau
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              {product.productName}
            </h1>
            <p className="mt-2 text-sm tracking-[0.06em] text-ink-soft uppercase">
              {product.category}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              {product.productDescription}
            </p>
            <p className="mt-5 text-lg font-medium text-ink">
              {formatPrice(product?.price || 0)}
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {outOfStock ? "Out of stock" : `${product.stock} in stock`}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-ink-soft">Quantity</p>
            <div className="inline-flex items-center border border-line">
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center"
                aria-label="Decrease quantity"
                disabled={outOfStock || !product?.stock}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span className="min-w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center"
                aria-label="Increase quantity"
                disabled={outOfStock || !product?.stock || quantity >= product?.stock}
                onClick={() =>
                  setQuantity((value) =>
                    Math.min((product?.stock || 0), value + 1),
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={outOfStock || !product?.stock || quantity <= 0}
              onClick={() => {
                addItem({
                  productId: product?._id || "",
                  slug: product?._id || "",
                  name: product?.productName,
                  shadeId: "default",
                  shadeName: product?.category || "",
                  finish: product?.category || "",
                  price: product?.price || 0,
                  imageSrc,
                  quantity,
                });
                setStatus("added");
                window.setTimeout(() => setStatus("idle"), 1600);
              }}
            >
              {outOfStock
                ? "Out of stock"
                : status === "added"
                  ? "Added to bag"
                  : "Add to bag"}
            </Button>
            <p className="sr-only" aria-live="polite">
              {status === "added"
                ? `${product.productName} added to bag`
                : ""}
            </p>
            <WishlistButton productId={product._id} />
          </div>

          <ul className="space-y-2 border-t border-line pt-6 text-sm text-ink-soft">
            <li>Free delivery over Rs. 5,000</li>
            <li>Cash on delivery available</li>
            <li>Easy returns within 7 days</li>
          </ul>
        </div>
      </section>

      <section className="container-beau border-t border-line py-12">
        <Link
          href="/product"
          className="text-sm tracking-[0.08em] text-ink-soft uppercase underline-offset-4 hover:text-ink hover:underline"
        >
          Back to all products
        </Link>
      </section>
    </div>
  );
}
