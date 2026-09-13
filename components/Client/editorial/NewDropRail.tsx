"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newDropProducts } from "@/lib/products";

export function NewDropRail() {
  return (
    <section
      id="new-drop"
      aria-label="New Drop"
      className="bg-paper py-[var(--space-section)]"
    >
      <div className="container-beau mb-10 md:mb-14">
        <Reveal>
          <SectionHeading
            title="New Drop"
            description="Objects from the latest edit — swipe to explore finishes and forms."
          />
        </Reveal>
      </div>

      <div className="relative">
        <ul
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--space-gutter)] pb-4 scroll-smooth md:gap-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="New collection products"
        >
          {newDropProducts.map((product, index) => (
            <li
              key={product.id}
              className="w-[70vw] max-w-[18rem] shrink-0 snap-start sm:w-[45vw] md:w-[28vw] md:max-w-[20rem]"
            >
              <Link
                href={product.href}
                className="group flex flex-col gap-4 outline-offset-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-warm">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 70vw, 28vw"
                    className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    style={{
                      transform:
                        index % 2 === 1 ? "translateY(0.75rem)" : undefined,
                    }}
                  />
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="text-sm text-ink-soft">
                      {product.finish} / {product.shade}
                    </p>
                  </div>
                  <span className="text-sm text-ink" aria-hidden>
                    +
                  </span>
                </div>
                <p className="sr-only">{product.priceLabel}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
