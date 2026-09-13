import type { Metadata } from "next";
import { ApiProductDetailView } from "@/components/Client/product/ApiProductDetailView";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Product",
    description: `Product details for ${slug}`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return <ApiProductDetailView productId={slug} />;
}
