import type { ApiProduct } from "@/Types/Client/Product.Type"
import type { CatalogProduct, ProductFormState, ProductPublishStatus } from "../types"
import { createEmptyProductForm } from "./formData"

function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`
}

function parsePrice(product: ApiProduct): number {
  if (typeof product.price === "number" && Number.isFinite(product.price)) {
    return product.price
  }
  const raw = product.discountedPrice || product.Price
  if (raw == null || raw === "") return 0
  const n = Number(String(raw).replace(/[^\d.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

function parseStock(product: ApiProduct): number {
  if (typeof product.stock === "number") return product.stock
  if (typeof product.amountInStock === "number") return product.amountInStock
  return 0
}

function firstCollection(product: ApiProduct): string {
  if (Array.isArray(product.collection) && product.collection.length) {
    return product.collection[0]
  }
  if (typeof product.collection === "string" && product.collection) {
    return product.collection
  }
  return product.brandName || "—"
}

function resolveImage(product: ApiProduct): string {
  if (product.picture?.secure_url) return product.picture.secure_url
  if (product.productImages?.length) return product.productImages[0]
  return "/products/hero-product-placeholder.svg"
}

function resolveStatus(
  product: ApiProduct,
  stock: number,
): CatalogProduct["status"] {
  if (stock === 0) return "out_of_stock"
  if (stock > 0 && stock <= 5) return "low_stock"

  const raw = (product.ProductStatus || "active").toLowerCase()
  if (raw === "inactive" || raw === "draft" || raw === "discontinued") {
    return "inactive"
  }
  return "active"
}

function formatCreatedAt(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso || "—"
  return d.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function mapPublishStatus(raw?: string): ProductPublishStatus {
  const s = (raw || "draft").toLowerCase()
  if (s === "active" || s === "inactive" || s === "discontinued" || s === "draft") {
    return s
  }
  return "draft"
}

function mapFeaturedFlags(featured?: string): ProductFormState["featured"] {
  return {
    newArrival: featured === "New Arrival",
    bestSeller: featured === "Best Seller",
    trending: featured === "Trending",
    limitedEdition: featured === "Limited Edition",
    recommended: featured === "Recommended",
  }
}

export function mapApiProductToCatalog(product: ApiProduct): CatalogProduct {
  const stock = parseStock(product)
  const priceNum = parsePrice(product)
  const status = resolveStatus(product, stock)
  const publish = (product.ProductStatus || "active").toLowerCase()

  return {
    id: product._id,
    name: product.productName || "Untitled",
    collection: firstCollection(product),
    sku: product.productGradeCode || product.slug || product._id.slice(-8).toUpperCase(),
    category: product.category || "Other",
    price: formatPkr(priceNum),
    stock,
    status,
    visible: publish === "active",
    createdAt: formatCreatedAt(product.createdAt),
    image: resolveImage(product),
  }
}

export function getApiProductPrice(product: ApiProduct): number {
  return parsePrice(product)
}

/** Prefill the dashboard form when editing an existing product. */
export function mapApiProductToForm(product: ApiProduct): ProductFormState {
  const base = createEmptyProductForm()
  const images = product.productImages?.filter(Boolean) ?? []
  const mainFromPicture = product.picture?.secure_url
  const mainImage = mainFromPicture || images[0] || null
  const gallery = mainFromPicture
    ? images.filter((url) => url !== mainFromPicture).slice(0, 5)
    : images.slice(1, 6)

  const collections = Array.isArray(product.collection)
    ? product.collection
    : product.collection
      ? [product.collection]
      : []

  const priceNum = parsePrice(product)
  const sale =
    product.discountedPrice != null && product.discountedPrice !== ""
      ? String(product.discountedPrice)
      : ""

  return {
    ...base,
    name: product.productName || "",
    sku: product.productGradeCode || "",
    slug: product.slug || "",
    brand: product.brandName || "",
    shortDescription: "",
    category: product.category || "",
    fullDescription: product.productDescription || "",
    media: {
      mainImage,
      gallery,
      video: product.productVideo || null,
      images360: product.product360Image ? [product.product360Image] : [],
    },
    pricing: {
      ...base.pricing,
      regularPrice:
        product.Price != null && product.Price !== ""
          ? String(product.Price)
          : priceNum
            ? String(priceNum)
            : "",
      salePrice: sale,
    },
    inventory: {
      ...base.inventory,
      stockQuantity: String(parseStock(product)),
    },
    status: mapPublishStatus(product.ProductStatus),
    collections,
    featured: mapFeaturedFlags(product.featured),
    publish: {
      ...base.publish,
      createdAt: product.createdAt
        ? new Date(product.createdAt).toLocaleString("en-PK", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : base.publish.createdAt,
    },
  }
}
