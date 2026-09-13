import AddProductPageView from "@/components/Dashboard/products/create/page"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  return <AddProductPageView productId={id} />
}
