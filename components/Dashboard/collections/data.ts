import { CheckCircle2, Layers, Package, Wallet } from "lucide-react"
import type { FilterOption, JewelryCollection, SummaryStat } from "../types"

export const COLLECTIONS_PAGE = {
  title: "Collections",
  subtitle: "Organize and manage your beauty collections.",
  searchPlaceholder: "Search collections by name or category...",
  tableSearchPlaceholder: "Search collections...",
  totalCount: 8,
  entityLabel: "collections",
} as const

export const COLLECTION_SUMMARY_STATS: SummaryStat[] = [
  { id: "total", label: "Total Collections", value: "8", change: 14.3, icon: Layers },
  { id: "published", label: "Published Collections", value: "7", change: 10.5, icon: CheckCircle2 },
  { id: "products", label: "Total Products", value: "265", change: 12.7, icon: Package },
  { id: "value", label: "Total Value", value: "PKR 925,600", change: 16.9, icon: Wallet },
]

export const COLLECTION_STATUS_FILTERS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

export const COLLECTION_CATEGORY_FILTERS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Face", value: "face" },
  { label: "Eyes", value: "eyes" },
  { label: "Lips", value: "lips" },
  { label: "Mixed", value: "mixed" },
]

export const COLLECTION_VISIBILITY_FILTERS: FilterOption[] = [
  { label: "All Visibility", value: "all" },
  { label: "Visible", value: "visible" },
  { label: "Hidden", value: "hidden" },
]

export const COLLECTION_SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Products", value: "products-desc" },
  { label: "Name A–Z", value: "name-asc" },
]

export const JEWELRY_COLLECTIONS: JewelryCollection[] = [
  {
    id: "1",
    name: "Everyday Glow",
    description: "Soft blush, tint, and powder essentials for effortless daily radiance.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 42,
    category: "Face",
    status: "published",
    visible: true,
    createdAt: "May 12, 2024",
  },
  {
    id: "2",
    name: "Night Out",
    description: "Bold lips, defined eyes, and high-impact finishes for evening looks.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 38,
    category: "Mixed",
    status: "published",
    visible: true,
    createdAt: "Apr 28, 2024",
  },
  {
    id: "3",
    name: "Clean Skin",
    description: "Care-first serums and prep products for a healthy, dewy complexion.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 24,
    category: "Face",
    status: "published",
    visible: true,
    createdAt: "Mar 15, 2024",
  },
  {
    id: "4",
    name: "New Drop",
    description: "Latest launches and limited-edition shades from The Beau studio.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 16,
    category: "Mixed",
    status: "published",
    visible: true,
    createdAt: "Feb 8, 2024",
  },
  {
    id: "5",
    name: "Best Sellers",
    description: "Top-performing shades and formulas loved by The Beau community.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 36,
    category: "Mixed",
    status: "published",
    visible: true,
    createdAt: "Jan 22, 2024",
  },
  {
    id: "6",
    name: "Soft Neutrals",
    description: "Muted tones and barely-there colour for a refined, modern palette.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 28,
    category: "Lips",
    status: "published",
    visible: true,
    createdAt: "Dec 5, 2023",
  },
  {
    id: "7",
    name: "Bridal Glow",
    description: "Complete makeup looks and coordinated sets for wedding-day luminosity.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 22,
    category: "Mixed",
    status: "draft",
    visible: false,
    createdAt: "Nov 18, 2023",
  },
  {
    id: "8",
    name: "Editorial Edit",
    description: "Runway-inspired colour stories and statement shades for creative looks.",
    image: "/products/hero-product-placeholder.svg",
    productCount: 19,
    category: "Eyes",
    status: "archived",
    visible: false,
    createdAt: "Oct 3, 2023",
  },
]

/** Alias for The Beau brand — same array as JEWELRY_COLLECTIONS for compatibility */
export const BEAU_COLLECTIONS = JEWELRY_COLLECTIONS
