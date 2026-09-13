import { ProductCard } from "@/components/Client/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Shop The Beau makeup collection.",
};

export default function ShopPage() {
  return (
    <div className="bg-paper pb-20 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="container-beau mb-12">
        <SectionHeading
          title="Shop"
          description="Browse by finish, shade, and everyday ritual."
        />
      </div>
      <div className="container-beau grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
