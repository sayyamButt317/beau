import type {
  AddProductBody,
  ProductCategory,
  ProductCollection,
  ProductFeatured,
  ProductStatus,
} from "@/Types/admin/product.type"
import type { ProductFormState } from "../types"
import {
  BRAND_OPTIONS,
  COLLECTION_MULTI_OPTIONS,
  COUNTRY_OPTIONS,
  GEMSTONE_OPTIONS,
  METAL_COLOR_OPTIONS,
  METAL_TYPE_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  STONE_COLOR_OPTIONS,
  STONE_SHAPE_OPTIONS,
} from "./formData"

function optionLabel(
  options: { label: string; value: string }[],
  value: string,
): string {
  if (!value) return ""
  return options.find((o) => o.value === value)?.label ?? value
}

function parseStock(value: string): number {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n >= 0 ? n : 0
}

function mapStatus(status: ProductFormState["status"]): ProductStatus {
  switch (status) {
    case "active":
      return "active"
    case "inactive":
      return "inactive"
    case "discontinued":
      return "discontinued"
    case "draft":
    default:
      return "draft"
  }
}

function mapCategory(value: string): ProductCategory | undefined {
  const label = optionLabel(PRODUCT_CATEGORY_OPTIONS, value)
  const allowed: ProductCategory[] = [
    "Face",
    "Eyes",
    "Lips",
    "Cheeks",
    "Brows",
    "Body",
    "Hair",
    "Makeup",
    "Nail",
    "Skin",
    "Sets",
    "Other",
  ]
  return allowed.includes(label as ProductCategory)
    ? (label as ProductCategory)
    : undefined
}

function mapCollections(values: string[]): ProductCollection[] {
  const allowed = new Set(
    COLLECTION_MULTI_OPTIONS.map((o) => o.value) as ProductCollection[],
  )
  return values.filter((v): v is ProductCollection =>
    allowed.has(v as ProductCollection),
  )
}

function mapFeatured(
  featured: ProductFormState["featured"],
): ProductFeatured | undefined {
  if (featured.newArrival) return "New Arrival"
  if (featured.bestSeller) return "Best Seller"
  if (featured.trending) return "Trending"
  if (featured.limitedEdition) return "Limited Edition"
  if (featured.recommended) return "Recommended"
  return undefined
}

function collectImages(form: ProductFormState): string[] {
  const images: string[] = []
  if (form.media.mainImage) images.push(form.media.mainImage)
  for (const url of form.media.gallery) {
    if (url && !images.includes(url)) images.push(url)
  }
  return images
}

/** Maps dashboard form state → backend AddProductBody */
export function mapProductFormToCreateBody(
  form: ProductFormState,
): AddProductBody {
  const stock = parseStock(form.inventory.stockQuantity)
  const lowStock = parseStock(form.inventory.lowStockAlert || "5")
  const images = collectImages(form)
  const category = mapCategory(form.category)
  const collections = mapCollections(form.collections)
  const featured = mapFeatured(form.featured)
  const brandName = optionLabel(BRAND_OPTIONS, form.brand) || form.brand || undefined

  const body: AddProductBody = {
    productName: form.name.trim(),
    slug: form.slug.trim() || undefined,
    brandName,
    productDescription:
      form.fullDescription.trim() ||
      form.shortDescription.trim() ||
      undefined,
    Price: form.pricing.regularPrice.trim() || undefined,
    discountedPrice: form.pricing.salePrice.trim() || undefined,
    amountInStock: stock,
    productGradeCode: form.sku.trim() || undefined,
    ProductStatus: mapStatus(form.status),
    productPrice: {
      regularPrice: form.pricing.regularPrice.trim() || undefined,
      salePrice: form.pricing.salePrice.trim() || undefined,
      costprice: form.pricing.costPrice.trim() || undefined,
      currency: "PKR",
      ...(form.pricing.discountSchedule
        ? {
            discountstartdate: form.pricing.discountStart || undefined,
            discountenddate: form.pricing.discountEnd || undefined,
          }
        : {}),
    },
    productInventory: {
      stockquantity: stock,
      lowStockThreshold: lowStock,
      barcode: form.inventory.barcode.trim(),
    },
    formulaandFinish: {
      finish: optionLabel(METAL_TYPE_OPTIONS, form.specs.metalType) || undefined,
      category: category,
      undertone:
        optionLabel(METAL_COLOR_OPTIONS, form.specs.metalColor) || undefined,
      shadefamily:
        optionLabel(GEMSTONE_OPTIONS, form.specs.gemstone) || undefined,
      formula:
        optionLabel(STONE_SHAPE_OPTIONS, form.specs.stoneShape) || undefined,
      skinType:
        optionLabel(STONE_COLOR_OPTIONS, form.specs.stoneColor) || undefined,
      countryorigin:
        optionLabel(COUNTRY_OPTIONS, form.specs.countryOfOrigin) || undefined,
      shelfLife: form.specs.makingCharges.trim() || undefined,
    },
  }

  if (images.length) body.productImages = images
  if (form.media.video) body.productVideo = form.media.video
  if (form.media.images360[0]) body.product360Image = form.media.images360[0]
  if (category) body.category = category
  if (collections.length) body.collection = collections
  if (featured) body.featured = featured

  return body
}
