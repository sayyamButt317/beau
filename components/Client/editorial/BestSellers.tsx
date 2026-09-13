import { ProductCard } from "@/components/Client/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bestSellerProducts } from "@/lib/products";

export function BestSellers() {
  return (
    <section
      id="best-sellers"
      aria-label="Best sellers"
      className="bg-paper py-[var(--space-section)]"
    >
      <div className="container-beau mb-10 md:mb-14">
        <Reveal>
          <SectionHeading
            title="Best Sellers"
            description="The pieces people return to — clear finishes, reliable shades."
          />
        </Reveal>
      </div>

      <div className="container-beau grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
