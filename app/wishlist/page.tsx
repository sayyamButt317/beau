"use client";

import Link from "next/link";
import { ProductCard } from "@/components/Client/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductById } from "@/lib/products";
import { useWishlistStore } from "@/lib/wishlist-store";

export default function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds);
  const products = productIds
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <div className="bg-paper pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="container-beau mb-12">
        <SectionHeading
          title="Saved"
          description="Pieces you’ve marked to revisit."
        />
      </div>

      {products.length === 0 ? (
        <div className="container-beau">
          <p className="max-w-md text-base text-ink-soft">
            Nothing saved yet. Explore the collection and tap save on anything
            you want to return to.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex min-h-11 items-center bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
          >
            Shop makeup
          </Link>
        </div>
      ) : (
        <div className="container-beau grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
