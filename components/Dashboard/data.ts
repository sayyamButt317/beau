import {
  BarChart3,
  Box,
  FileText,
  Grid3X3,
  Heart,
  Layers,
  LayoutGrid,
  LogOut,
  Megaphone,
  Package,
  Palette,
  Percent,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Upload,
  User,
  Users,
  Wallet,
} from "lucide-react"
import type {
  BestSeller,
  ChartPoint,
  InventoryStat,
  NavGroup,
  OrderRow,
  ProductRow,
  QuickAction,
  StatMetric,
} from "./types"

export const ADMIN = {
  name: "Admin",
  role: "Administrator",
  avatar: "/products/hero-product-placeholder.svg",
} as const

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Catalog",
    items: [
      { label: "Overview", href: "/admin/overview", icon: LayoutGrid },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Collections", href: "/admin/content", icon: Layers },
      { label: "Inventory", href: "/admin/inventory", icon: Box },
    ],
  },
  {
    title: "Orders",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Returns", href: "/admin/returns", icon: Heart },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Insights", href: "/admin/insights", icon: BarChart3 },
      { label: "Finance", href: "/admin/finance", icon: Wallet },
      { label: "Shipping", href: "/admin/shipping", icon: Percent },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Logout", href: "/", icon: LogOut },
    ],
  },
]

export const STAT_METRICS: StatMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "PKR 2,458,750",
    change: 18.6,
    icon: Wallet,
    sparkline: [32, 38, 35, 44, 42, 50, 48, 58, 55, 62],
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "1,245",
    change: 14.2,
    icon: ShoppingBag,
    sparkline: [28, 30, 34, 33, 38, 40, 42, 45, 48, 52],
  },
  {
    id: "customers",
    label: "Total Customers",
    value: "892",
    change: 9.3,
    icon: Users,
    sparkline: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
  {
    id: "inventory",
    label: "Inventory Value",
    value: "PKR 925,600",
    change: 11.7,
    icon: Box,
    sparkline: [40, 42, 41, 45, 47, 46, 50, 52, 54, 56],
  },
  {
    id: "low-stock",
    label: "Low Stock Items",
    value: "16",
    change: -12.5,
    icon: TrendingUp,
    sparkline: [60, 58, 55, 52, 48, 45, 42, 38, 35, 32],
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "2.49%",
    change: 8.1,
    icon: BarChart3,
    sparkline: [18, 20, 19, 22, 24, 23, 26, 28, 27, 30],
  },
]

export const REVENUE_CHART: ChartPoint[] = [
  { label: "1 Jun", value: 4.2 },
  { label: "5 Jun", value: 5.1 },
  { label: "10 Jun", value: 4.8 },
  { label: "15 Jun", value: 6.2 },
  { label: "20 Jun", value: 7.4 },
  { label: "25 Jun", value: 8.1 },
  { label: "30 Jun", value: 12.45 },
]

export const BEST_SELLERS: BestSeller[] = [
  {
    id: "1",
    name: "Soft Blush",
    price: "PKR 3,200",
    sold: 142,
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "2",
    name: "Veil Skin Tint",
    price: "PKR 4,100",
    sold: 118,
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "3",
    name: "Glass Lip",
    price: "PKR 2,750",
    sold: 96,
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "4",
    name: "Soft Focus Powder",
    price: "PKR 3,450",
    sold: 87,
    image: "/products/hero-product-placeholder.svg",
  },
]

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "add-product", label: "Add Product", icon: Package, href: "/admin/products/new" },
  { id: "add-collection", label: "Add Collection", icon: Layers, href: "/admin/content" },
  { id: "add-category", label: "Add Category", icon: Grid3X3, href: "/admin/products" },
  { id: "inventory", label: "Manage Inventory", icon: Box, href: "/admin/inventory" },
  { id: "discount", label: "Create Discount", icon: Percent, href: "/admin/marketing" },
  { id: "coupon", label: "Add Coupon", icon: Tag, href: "/admin/marketing" },
  { id: "order", label: "New Order", icon: ShoppingCart, href: "/admin/orders" },
  { id: "customer", label: "Add Customer", icon: User, href: "/admin/customers" },
]

export const LATEST_PRODUCTS: ProductRow[] = [
  {
    id: "1",
    name: "Soft Blush",
    sku: "BEAU-FC-001",
    price: "PKR 3,200",
    stock: 48,
    category: "Face",
    status: "active",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "2",
    name: "Veil Skin Tint",
    sku: "BEAU-FC-014",
    price: "PKR 4,100",
    stock: 32,
    category: "Face",
    status: "active",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "3",
    name: "Glass Lip",
    sku: "BEAU-LP-008",
    price: "PKR 2,750",
    stock: 12,
    category: "Lips",
    status: "active",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "4",
    name: "Ink Liner",
    sku: "BEAU-EY-022",
    price: "PKR 2,400",
    stock: 0,
    category: "Eyes",
    status: "inactive",
    image: "/products/hero-product-placeholder.svg",
  },
  {
    id: "5",
    name: "Soft Focus",
    sku: "BEAU-FC-005",
    price: "PKR 3,450",
    stock: 56,
    category: "Face",
    status: "active",
    image: "/products/hero-product-placeholder.svg",
  },
]

export const RECENT_ORDERS: OrderRow[] = [
  { id: "#ORD-2847", customer: "Sarah Ahmed", amount: "PKR 7,300", status: "completed" },
  { id: "#ORD-2846", customer: "Aisha Khan", amount: "PKR 4,100", status: "processing" },
  { id: "#ORD-2845", customer: "Emma Roberts", amount: "PKR 2,750", status: "shipped" },
  { id: "#ORD-2844", customer: "Fatima Noor", amount: "PKR 5,950", status: "pending" },
  { id: "#ORD-2843", customer: "Hira Malik", amount: "PKR 3,200", status: "completed" },
]

export const INVENTORY_SUMMARY: InventoryStat[] = [
  { label: "In Stock", value: 245, tone: "success" },
  { label: "Low Stock", value: 16, tone: "warning" },
  { label: "Out of Stock", value: 4, tone: "danger" },
  { label: "Total Products", value: 265, tone: "neutral" },
]

export const UPLOAD_LOOKBOOK: QuickAction = {
  id: "upload-looks",
  label: "Upload Look",
  icon: Upload,
  href: "/admin/content",
}
