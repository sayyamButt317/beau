import type { LucideIcon } from "lucide-react"
import type { ComponentType, ReactNode, SVGProps } from "react"

export type DashIcon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>

export interface NavItem {
  label: string
  href: string
  icon: DashIcon
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface StatMetric {
  id: string
  label: string
  value: string
  change: number
  icon: DashIcon
  sparkline: number[]
}

export interface BestSeller {
  id: string
  name: string
  price: string
  sold: number
  image: string
}

export interface QuickAction {
  id: string
  label: string
  icon: DashIcon
  href?: string
}

export interface ProductRow {
  id: string
  name: string
  sku: string
  price: string
  stock: number
  category: string
  status: "active" | "inactive"
  image: string
}

export interface CatalogProduct {
  id: string
  name: string
  collection: string
  sku: string
  category: string
  price: string
  stock: number
  status: "active" | "inactive" | "low_stock" | "out_of_stock"
  visible: boolean
  createdAt: string
  image: string
}

export interface ProductSummaryStat {
  id: string
  label: string
  value: string
  change: number
  icon: DashIcon
}

/** Generic summary stat used across catalog pages (products, collections, …) */
export type SummaryStat = ProductSummaryStat

export interface FilterOption {
  label: string
  value: string
}

/** @deprecated use FilterOption */
export type ProductFilterOption = FilterOption

export type CollectionStatus = "published" | "draft" | "archived"

export interface ProductCollection {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  category: string
  status: CollectionStatus
  visible: boolean
  createdAt: string
}

/** @deprecated use ProductCollection */
export type JewelryCollection = ProductCollection


export interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  status: "active" | "inactive"
  createdAt: string
}

export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock"

export interface InventoryItem {
  id: string
  name: string
  collection: string
  sku: string
  category: string
  stock: number
  reserved: number
  available: number
  status: InventoryStatus
  location: string
  value: string
  image: string
}

export interface CatalogPageMeta {
  title: string
  subtitle: string
  searchPlaceholder: string
  tableSearchPlaceholder: string
  totalCount: number
  entityLabel: string
}

export interface OrderRow {
  id: string
  customer: string
  amount: string
  status: "completed" | "processing" | "shipped" | "pending"
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled"
  | "refunded"

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded"

export type FulfillmentStatus =
  | "unfulfilled"
  | "packing"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  avatar?: string
}

export interface OrderShippingAddress {
  line1: string
  line2?: string
  city: string
  country: string
}

export interface OrderPayment {
  status: PaymentStatus
  method: string
  transactionId: string
  paidAt: string
}

export interface OrderLineItem {
  id: string
  name: string
  sku: string
  quantity: number
  price: string
  image: string
}

export interface OrderSummary {
  subtotal: string
  shipping: string
  tax: string
  total: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: OrderCustomer
  placedAt: string
  placedAtTime: string
  source: string
  status: OrderStatus
  total: string
  payment: OrderPayment
  fulfillment: FulfillmentStatus
  shippingAddress: OrderShippingAddress
  summary: OrderSummary
  items: OrderLineItem[]
}

export type OrderTab = "all" | OrderStatus

export interface InventoryStat {
  label: string
  value: number
  tone: "success" | "warning" | "danger" | "neutral"
}

export interface ChartPoint {
  label: string
  value: number
}

export interface PanelProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export interface StatusBadgeProps {
  status:
    | ProductRow["status"]
    | OrderRow["status"]
    | OrderStatus
    | PaymentStatus
    | CatalogProduct["status"]
    | CollectionStatus
    | InventoryStatus
}

/* ------------------------------------------------------------------ */
/*  Add / Edit Product form                                            */
/* ------------------------------------------------------------------ */

export type ProductPublishStatus =
  | "draft"
  | "active"
  | "inactive"
  | "discontinued"

export interface ProductVariantRow {
  id: string
  name: string
  optionCount: number
  sku: string
  price: string
  stock: number
  image?: string
}

export interface ProductFormMedia {
  mainImage: string | null
  gallery: string[]
  video: string | null
  images360: string[]
}

export interface ProductFormPricing {
  regularPrice: string
  salePrice: string
  costPrice: string
  taxClass: string
  currency: string
  discountSchedule: boolean
  discountStart: string
  discountEnd: string
}

export interface ProductFormInventory {
  stockQuantity: string
  lowStockAlert: string
  barcode: string
  trackInventory: boolean
  allowBackOrders: boolean
  weight: string
  weightUnit: string
}

export interface ProductFormSpecs {
  metalType: string
  metalPurity: string
  metalColor: string
  gemstone: string
  stoneShape: string
  stoneColor: string
  stoneWeight: string
  diamondWeight: string
  certificate: string
  hallmarkNumber: string
  countryOfOrigin: string
  makingCharges: string
}

export interface ProductFormSeo {
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  urlSlug: string
  ogImage: string | null
}

export interface ProductFormVisibility {
  onlineStore: boolean
  search: boolean
  homepage: boolean
  featuredProduct: boolean
}

export interface ProductFormFeatured {
  newArrival: boolean
  bestSeller: boolean
  trending: boolean
  limitedEdition: boolean
  recommended: boolean
}

export interface ProductFormPublish {
  schedulePublish: boolean
  publishDate: string
  publishTime: string
  createdAt: string
}

export interface ProductFormState {
  name: string
  sku: string
  slug: string
  brand: string
  shortDescription: string
  category: string
  fullDescription: string
  media: ProductFormMedia
  pricing: ProductFormPricing
  inventory: ProductFormInventory
  variants: ProductVariantRow[]
  specs: ProductFormSpecs
  materials: string[]
  seo: ProductFormSeo
  status: ProductPublishStatus
  visibility: ProductFormVisibility
  collections: string[]
  categories: string[]
  featured: ProductFormFeatured
  tags: string[]
  publish: ProductFormPublish
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
