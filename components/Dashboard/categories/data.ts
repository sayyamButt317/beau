import { CheckCircle2, Grid3X3, Package, Wallet } from "lucide-react"
import type { FilterOption, ProductCategory, SummaryStat } from "../types"

export const CATEGORIES_PAGE = {
  title: "Categories",
  subtitle: "Organize your products with categories.",
  searchPlaceholder: "Search categories by name or description...",
  tableSearchPlaceholder: "Search categories...",
  totalCount: 8,
  entityLabel: "categories",
} as const

export const CATEGORY_SUMMARY_STATS: SummaryStat[] = [
  { id: "total", label: "Total Categories", value: "8", change: 14.3, icon: Grid3X3 },
  { id: "active", label: "Active Categories", value: "7", change: 8.3, icon: CheckCircle2 },
  { id: "products", label: "Total Products", value: "265", change: 12.7, icon: Package },
  { id: "value", label: "Total Value", value: "PKR 925,600", change: 16.9, icon: Wallet },
]

export const CATEGORY_STATUS_FILTERS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

export const CATEGORY_SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Products", value: "products-desc" },
  { label: "Name A–Z", value: "name-asc" },
]

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "1",
    name: "Face",
    description: "Blush, tint, powder, and complexion essentials for a soft, lit-from-within finish.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 72,
    status: "active",
    createdAt: "May 12, 2024",
  },
  {
    id: "2",
    name: "Eyes",
    description: "Liners, mascaras, and eye colour with clean pigment and all-day wear.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 48,
    status: "active",
    createdAt: "May 8, 2024",
  },
  {
    id: "3",
    name: "Lips",
    description: "Glass glosses, velvet mattes, and balms in The Beau's signature soft neutrals.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 41,
    status: "active",
    createdAt: "Apr 22, 2024",
  },
  {
    id: "4",
    name: "Skin",
    description: "Serums, prep, and care-first formulas that support a healthy, dewy base.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 36,
    status: "active",
    createdAt: "Apr 10, 2024",
  },
  {
    id: "5",
    name: "Sets",
    description: "Curated face, lip, and eye sets for gifting and complete looks.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 22,
    status: "active",
    createdAt: "Mar 28, 2024",
  },
  {
    id: "6",
    name: "Tools",
    description: "Brushes, sponges, and applicators designed for precise Beau application.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 18,
    status: "active",
    createdAt: "Mar 15, 2024",
  },
  {
    id: "7",
    name: "New",
    description: "Fresh launches and limited drops from The Beau's latest collection edits.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 14,
    status: "active",
    createdAt: "Feb 20, 2024",
  },
  {
    id: "8",
    name: "Best Sellers",
    description: "Customer favourites and top-performing shades across face, eyes, and lips.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 14,
    status: "inactive",
    createdAt: "Feb 5, 2024",
  },
]
