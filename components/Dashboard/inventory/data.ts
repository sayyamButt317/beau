import {
  AlertTriangle,
  CheckCircle2,
  Package,
  Wallet,
  XCircle,
} from "lucide-react"
import type { FilterOption, InventoryItem, StatMetric } from "../types"

export const INVENTORY_PAGE = {
  title: "Inventory",
  subtitle: "Track stock levels, manage inventory and get low stock alerts.",
  searchPlaceholder: "Search by product name, SKU or barcode...",
  tableSearchPlaceholder: "Search inventory...",
  totalCount: 245,
  entityLabel: "items",
  defaultPageSize: 8,
  pageSizeOptions: [8, 10, 25, 50],
} as const

export const INVENTORY_METRICS: StatMetric[] = [
  {
    id: "total-value",
    label: "Total Inventory Value",
    value: "PKR 925,600",
    change: 15.8,
    icon: Wallet,
    sparkline: [40, 42, 44, 43, 47, 49, 52, 54, 56, 58],
  },
  {
    id: "total-stock",
    label: "Total Stock (Units)",
    value: "1,842",
    change: 8.4,
    icon: Package,
    sparkline: [30, 32, 31, 35, 36, 38, 40, 41, 43, 45],
  },
  {
    id: "low-stock",
    label: "Low Stock Items",
    value: "16",
    change: -20.0,
    icon: AlertTriangle,
    sparkline: [60, 58, 55, 50, 48, 44, 40, 36, 34, 32],
  },
  {
    id: "out-of-stock",
    label: "Out of Stock Items",
    value: "4",
    change: -33.3,
    icon: XCircle,
    sparkline: [20, 18, 16, 14, 12, 10, 8, 6, 5, 4],
  },
  {
    id: "in-stock",
    label: "In Stock Items",
    value: "225",
    change: 10.3,
    icon: CheckCircle2,
    sparkline: [50, 52, 54, 55, 57, 58, 60, 62, 64, 66],
  },
]

export const INVENTORY_CATEGORY_FILTERS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Face", value: "face" },
  { label: "Eyes", value: "eyes" },
  { label: "Lips", value: "lips" },
  { label: "Skin", value: "skin" },
]

export const INVENTORY_COLLECTION_FILTERS: FilterOption[] = [
  { label: "All Collections", value: "all" },
  { label: "Everyday Glow", value: "everyday-glow" },
  { label: "Night Out", value: "night-out" },
  { label: "New Drop", value: "new-drop" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Clean Skin", value: "clean-skin" },
]

export const INVENTORY_STATUS_FILTERS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "In Stock", value: "in_stock" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
]

export const INVENTORY_LOCATION_FILTERS: FilterOption[] = [
  { label: "All Locations", value: "all" },
  { label: "Main Warehouse", value: "main-warehouse" },
  { label: "Branch Store A", value: "branch-a" },
  { label: "Branch Store B", value: "branch-b" },
  { label: "Flagship Showroom", value: "flagship" },
]

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "1",
    name: "Soft Blush",
    collection: "Everyday Glow",
    sku: "BEAU-FC-001",
    category: "Face",
    stock: 48,
    reserved: 3,
    available: 45,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 3,200",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "2",
    name: "Veil Skin Tint",
    collection: "Best Sellers",
    sku: "BEAU-FC-014",
    category: "Face",
    stock: 32,
    reserved: 2,
    available: 30,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 4,100",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "3",
    name: "Glass Lip",
    collection: "Night Out",
    sku: "BEAU-LP-008",
    category: "Lips",
    stock: 5,
    reserved: 1,
    available: 4,
    status: "low_stock",
    location: "Branch Store A",
    value: "PKR 2,750",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "4",
    name: "Ink Liner",
    collection: "New Drop",
    sku: "BEAU-EY-022",
    category: "Eyes",
    stock: 0,
    reserved: 0,
    available: 0,
    status: "out_of_stock",
    location: "Main Warehouse",
    value: "PKR 2,400",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "5",
    name: "Soft Focus",
    collection: "Everyday Glow",
    sku: "BEAU-FC-005",
    category: "Face",
    stock: 56,
    reserved: 4,
    available: 52,
    status: "in_stock",
    location: "Flagship Showroom",
    value: "PKR 3,450",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "6",
    name: "Dew Serum",
    collection: "Clean Skin",
    sku: "BEAU-SK-007",
    category: "Skin",
    stock: 24,
    reserved: 2,
    available: 22,
    status: "in_stock",
    location: "Branch Store B",
    value: "PKR 3,800",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "7",
    name: "Lash Curl Mascara",
    collection: "Night Out",
    sku: "BEAU-EY-011",
    category: "Eyes",
    stock: 3,
    reserved: 0,
    available: 3,
    status: "low_stock",
    location: "Branch Store A",
    value: "PKR 2,950",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "8",
    name: "Velvet Matte Lip",
    collection: "Best Sellers",
    sku: "BEAU-LP-019",
    category: "Lips",
    stock: 18,
    reserved: 1,
    available: 17,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 2,650",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "9",
    name: "Glow Primer",
    collection: "Clean Skin",
    sku: "BEAU-FC-031",
    category: "Face",
    stock: 14,
    reserved: 2,
    available: 12,
    status: "in_stock",
    location: "Flagship Showroom",
    value: "PKR 3,600",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "10",
    name: "Brow Definer",
    collection: "New Drop",
    sku: "BEAU-EY-028",
    category: "Eyes",
    stock: 2,
    reserved: 1,
    available: 1,
    status: "low_stock",
    location: "Branch Store B",
    value: "PKR 2,850",
    image: "/products/hero-product-placeholder.svg",
  },
]

/** Maps collection display name → filter slug */
export function collectionKey(name: string): string {
  const map: Record<string, string> = {
    "Everyday Glow": "everyday-glow",
    "Night Out": "night-out",
    "New Drop": "new-drop",
    "Best Sellers": "best-sellers",
    "Clean Skin": "clean-skin",
  }
  return map[name] ?? name.toLowerCase().replace(/\s+/g, "-")
}

/** Maps location display name → filter slug */
export function locationKey(name: string): string {
  const map: Record<string, string> = {
    "Main Warehouse": "main-warehouse",
    "Branch Store A": "branch-a",
    "Branch Store B": "branch-b",
    "Flagship Showroom": "flagship",
  }
  return map[name] ?? name.toLowerCase().replace(/\s+/g, "-")
}

/** Maps category display name → filter slug */
export function categoryKey(name: string): string {
  return name.toLowerCase()
}
