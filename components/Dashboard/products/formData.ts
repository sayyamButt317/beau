import type { FilterOption, ProductFormState, ProductVariantRow } from "../types"

export const ADD_PRODUCT_PAGE = {
  title: "Add New Product",
  subtitle: "Create a new beauty product for The Beau catalog.",
  breadcrumbs: [
    { label: "Dashboard", href: "/admin/overview" },
    { label: "Products", href: "/admin/products" },
    { label: "Add New Product" },
  ],
} as const

export const PRODUCT_CATEGORY_OPTIONS: FilterOption[] = [
  { label: "Select category", value: "" },
  { label: "Face", value: "Face" },
  { label: "Eyes", value: "Eyes" },
  { label: "Lips", value: "Lips" },
  { label: "Cheeks", value: "Cheeks" },
  { label: "Brows", value: "Brows" },
  { label: "Body", value: "Body" },
  { label: "Hair", value: "Hair" },
  { label: "Makeup", value: "Makeup" },
  { label: "Nail", value: "Nail" },
  { label: "Skin", value: "Skin" },
  { label: "Sets", value: "Sets" },
  { label: "Other", value: "Other" },
]

export const BRAND_OPTIONS: FilterOption[] = [
  { label: "Select brand", value: "" },
  { label: "The Beau", value: "The Beau" },
  { label: "Kiko", value: "Kiko" },
  { label: "Rhode", value: "Rhode" },
  { label: "Huda Beauty", value: "Huda Beauty" },
  { label: "Sheglam", value: "Sheglam" },
]

export const TAX_CLASS_OPTIONS: FilterOption[] = [
  { label: "Standard", value: "standard" },
  { label: "Reduced", value: "reduced" },
  { label: "Zero Rate", value: "zero" },
  { label: "Exempt", value: "exempt" },
]

export const CURRENCY_OPTIONS: FilterOption[] = [
  { label: "PKR", value: "PKR" },
  { label: "USD", value: "USD" },
  { label: "AED", value: "AED" },
  { label: "GBP", value: "GBP" },
]

export const WEIGHT_UNIT_OPTIONS: FilterOption[] = [
  { label: "g", value: "g" },
  { label: "ml", value: "ml" },
  { label: "oz", value: "oz" },
]

export const METAL_TYPE_OPTIONS = [
  { label: "Select finish", value: "" },
  { label: "Dewy", value: "dewy" },
  { label: "Matte", value: "matte" },
  { label: "Satin", value: "satin" },
  { label: "Gloss", value: "gloss" },
  { label: "Sheer", value: "sheer" },
] as FilterOption[]

export const FINISH_OPTIONS = METAL_TYPE_OPTIONS

export const METAL_PURITY_OPTIONS = [
  { label: "Select coverage", value: "" },
  { label: "Sheer", value: "sheer" },
  { label: "Light", value: "light" },
  { label: "Medium", value: "medium" },
  { label: "Full", value: "full" },
] as FilterOption[]

export const COVERAGE_OPTIONS = METAL_PURITY_OPTIONS

export const METAL_COLOR_OPTIONS = [
  { label: "Select undertone", value: "" },
  { label: "Cool", value: "cool" },
  { label: "Neutral", value: "neutral" },
  { label: "Warm", value: "warm" },
  { label: "Universal", value: "universal" },
] as FilterOption[]

export const UNDERTONE_OPTIONS = METAL_COLOR_OPTIONS

/** @deprecated beauty: use SHADE_FAMILY_OPTIONS */
export const GEMSTONE_OPTIONS = [
  { label: "Select shade family", value: "" },
  { label: "Nude", value: "nude" },
  { label: "Rose", value: "rose" },
  { label: "Berry", value: "berry" },
  { label: "Cocoa", value: "cocoa" },
  { label: "Clear", value: "clear" },
] as FilterOption[]

export const SHADE_FAMILY_OPTIONS = GEMSTONE_OPTIONS

export const STONE_SHAPE_OPTIONS = [
  { label: "Select formula", value: "" },
  { label: "Cream", value: "cream" },
  { label: "Powder", value: "powder" },
  { label: "Liquid", value: "liquid" },
  { label: "Gel", value: "gel" },
  { label: "Balm", value: "balm" },
] as FilterOption[]

export const FORMULA_OPTIONS = STONE_SHAPE_OPTIONS

/** @deprecated beauty: use SKIN_TYPE_OPTIONS */
export const STONE_COLOR_OPTIONS = [
  { label: "Select skin type", value: "" },
  { label: "All skin types", value: "all" },
  { label: "Dry", value: "dry" },
  { label: "Oily", value: "oily" },
  { label: "Combination", value: "combination" },
  { label: "Sensitive", value: "sensitive" },
] as FilterOption[]

export const SKIN_TYPE_OPTIONS = STONE_COLOR_OPTIONS

export const CERTIFICATE_OPTIONS = [
  { label: "Select certification", value: "" },
  { label: "Dermatologically tested", value: "derm-tested" },
  { label: "Cruelty-free", value: "cruelty-free" },
  { label: "Vegan", value: "vegan" },
  { label: "None", value: "none" },
] as FilterOption[]

export const COUNTRY_OPTIONS: FilterOption[] = [
  { label: "Select country", value: "" },
  { label: "Pakistan", value: "pakistan" },
  { label: "Korea", value: "korea" },
  { label: "France", value: "france" },
  { label: "USA", value: "usa" },
  { label: "UAE", value: "uae" },
]

export const MATERIAL_OPTIONS = [
  "Vitamin E",
  "Hyaluronic Acid",
  "Niacinamide",
  "Jojoba",
  "Mica",
  "Squalane",
  "SPF",
  "Fragrance-free",
  "Others",
] as const

export const COLLECTION_MULTI_OPTIONS: FilterOption[] = [
  { label: "Everyday Glow", value: "Everyday Glow" },
  { label: "Night Out", value: "Night Out" },
  { label: "Clean Skin", value: "Clean Skin" },
  { label: "New Drop", value: "New Drop" },
  { label: "Best Sellers", value: "Best Sellers" },
]

export const DEFAULT_VARIANTS: ProductVariantRow[] = [
  {
    id: "v1",
    name: "Shade",
    optionCount: 5,
    sku: "—",
    price: "—",
    stock: 0,
  },
  {
    id: "v2",
    name: "Size",
    optionCount: 3,
    sku: "—",
    price: "—",
    stock: 0,
  },
  {
    id: "v3",
    name: "Finish",
    optionCount: 3,
    sku: "—",
    price: "—",
    stock: 0,
  },
]

export function createEmptyProductForm(): ProductFormState {
  const now = new Date()
  return {
    name: "",
    sku: "",
    slug: "",
    brand: "",
    shortDescription: "",
    category: "",
    fullDescription: "",
    media: {
      mainImage: null,
      gallery: [],
      video: null,
      images360: [],
    },
    pricing: {
      regularPrice: "",
      salePrice: "",
      costPrice: "",
      taxClass: "standard",
      currency: "PKR",
      discountSchedule: false,
      discountStart: "",
      discountEnd: "",
    },
    inventory: {
      stockQuantity: "",
      lowStockAlert: "5",
      barcode: "",
      trackInventory: true,
      allowBackOrders: false,
      weight: "",
      weightUnit: "g",
    },
    variants: DEFAULT_VARIANTS,
    specs: {
      metalType: "",
      metalPurity: "",
      metalColor: "",
      gemstone: "",
      stoneShape: "",
      stoneColor: "",
      stoneWeight: "",
      diamondWeight: "",
      certificate: "",
      hallmarkNumber: "",
      countryOfOrigin: "",
      makingCharges: "",
    },
    materials: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      focusKeyword: "",
      urlSlug: "",
      ogImage: null,
    },
    status: "draft",
    visibility: {
      onlineStore: true,
      search: true,
      homepage: false,
      featuredProduct: false,
    },
    collections: [],
    categories: [],
    featured: {
      newArrival: false,
      bestSeller: false,
      trending: false,
      limitedEdition: false,
      recommended: false,
    },
    tags: [],
    publish: {
      schedulePublish: false,
      publishDate: "",
      publishTime: "",
      createdAt: now.toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
