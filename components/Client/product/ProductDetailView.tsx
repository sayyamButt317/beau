"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AddToBag } from "@/components/Client/commerce/AddToBag";
import { WishlistButton } from "@/components/Client/commerce/WishlistButton";
import { FindYourShade } from "@/components/Client/product/FindYourShade";
import { ProductCard } from "@/components/Client/product/ProductCard";
import { ShadeSelector } from "@/components/Client/product/ShadeSelector";
import { bestSellerProducts, type ProductDetail } from "@/lib/products";

type ProductDetailViewProps = {
  product: ProductDetail;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [shadeId, setShadeId] = useState(product.shades[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const shade = useMemo(
    () => product.shades.find((item) => item.id === shadeId) ?? product.shades[0],
    [product.shades, shadeId],
  );

  const related = bestSellerProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  if (!shade) return null;

  return (
    <div className="bg-paper">
      <section className="container-beau grid gap-10 pb-16 pt-[calc(var(--header-h)+2rem)] lg:grid-cols-12 lg:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm lg:col-span-7">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            priority
            unoptimized
            className="object-contain p-10"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-40"
            style={{ backgroundColor: shade.swatch }}
            aria-hidden
          />
          {product.isPlaceholder ? (
            <p className="absolute left-4 top-4 text-[0.6875rem] tracking-[0.14em] text-ink-soft uppercase">
              Placeholder photography
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <div>
            <p className="text-[0.6875rem] tracking-[0.22em] text-ink-soft uppercase">
              The Beau
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              {product.name}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              {product.description}
            </p>
            <p className="mt-5 text-lg font-medium text-ink">
              {product.priceLabel}
            </p>
          </div>

          <ShadeSelector
            shades={product.shades}
            value={shade.id}
            onChange={setShadeId}
          />

          <div>
            <p className="mb-2 text-sm text-ink-soft">Finish</p>
            <p className="text-sm tracking-[0.12em] text-ink uppercase">
              {product.finish}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-ink-soft">Quantity</p>
            <div className="inline-flex items-center border border-line">
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span className="min-w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AddToBag product={product} shade={shade} quantity={quantity} />
            <WishlistButton productId={product.id} />
          </div>

          <ul className="space-y-2 border-t border-line pt-6 text-sm text-ink-soft">
            <li>Free delivery over Rs. 5,000</li>
            <li>Cash on delivery available</li>
            <li>Easy returns within 7 days</li>
          </ul>
        </div>
      </section>

      <section className="container-beau grid gap-10 border-t border-line py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-ink">
            Product story
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {product.story}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm tracking-[0.12em] text-ink uppercase">
                Ingredients
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {product.ingredients}
              </p>
            </div>
            <div>
              <h3 className="text-sm tracking-[0.12em] text-ink uppercase">
                How to use
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {product.howToUse}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <FindYourShade />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="container-beau border-t border-line py-16">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-ink">
            Complete the look
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
