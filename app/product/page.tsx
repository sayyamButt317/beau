"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/products";
import { useGetProducts } from "@/routes/client/query";
import type { ApiProduct } from "@/Types/Client/Product.Type";

function ProductGridItem({ product }: { product: ApiProduct }) {
  const imageSrc =
    product.picture?.secure_url || "/products/hero-product-placeholder.svg";

  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={`/product/${product._id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-paper-warm outline-offset-4"
      >
        <Image
          src={imageSrc}
          alt={product.productName}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Link>
      <div className="flex items-end justify-between gap-3">
        <div>
          <Link href={`/product/${product._id}`} className="font-medium text-ink">
            {product.productName}
          </Link>
          <p className="text-sm text-ink-soft">{product.category}</p>
        </div>
        <p className="text-sm text-ink">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

export default function ProductPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetProducts();

  const products = data?.data ?? [];

  return (
    <div className="bg-paper pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="container-beau mb-12">
        <SectionHeading
          title="Products"
          description="Everything currently available from the catalog."
        />
      </div>

      <div className="container-beau">
        {isLoading ? (
          <p className="text-sm text-ink-soft" aria-live="polite">
            Loading products…
          </p>
        ) : null}

        {isError ? (
          <div className="max-w-md space-y-4" role="alert">
            <p className="text-sm leading-relaxed text-ink-soft">
              Couldn’t load products
              {error instanceof Error ? `: ${error.message}` : "."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex min-h-11 cursor-pointer items-center bg-ink px-5 text-sm font-medium tracking-[0.04em] text-paper uppercase transition-colors hover:bg-ink-soft"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && products.length === 0 ? (
          <p className="text-sm text-ink-soft">No products found.</p>
        ) : null}

        {products.length > 0 ? (
          <>
            {isFetching && !isLoading ? (
              <p className="mb-4 text-xs tracking-[0.08em] text-ink-soft uppercase">
                Updating…
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
              {products.map((product) => (
                <ProductGridItem key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
