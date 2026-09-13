"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  Filter,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  Loader2,
  Wallet,
  XCircle,
} from "lucide-react"
import { useDashStagger, useMountFade } from "../hooks/useGsap"
import { StatusBadge, panelGradient } from "../ui"
import { cormorant, dk } from "../theme"
import type { CatalogProduct, DashIcon, ProductSummaryStat } from "../types"
import {
  CATEGORY_FILTERS,
  COLLECTION_FILTERS,
  PRODUCTS_PAGE,
  SORT_OPTIONS,
  STATUS_FILTERS,
} from "./data"
import { getApiProductPrice, mapApiProductToCatalog } from "./mapApiProduct"
import { useAdminGetProducts } from "@/routes/admin/query"
import { DeleteProductMutation } from "@/routes/admin/mutation"

export default function ProductsPageView() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminGetProducts()
  const { mutate: deleteProduct, isPending: isDeleting } = DeleteProductMutation()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const headerRef = useMountFade<HTMLElement>(0.05)
  const statsRef = useDashStagger<HTMLDivElement>(0.06)
  const tableRef = useDashStagger<HTMLDivElement>(0.04)

  const [query, setQuery] = useState("")
  const [tableQuery, setTableQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [collection, setCollection] = useState("all")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("newest")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const apiProducts = data?.data ?? []

  const catalog = useMemo(
    () => apiProducts.map(mapApiProductToCatalog),
    [apiProducts],
  )

  const summaryStats = useMemo((): ProductSummaryStat[] => {
    const total = catalog.length
    const active = catalog.filter((p) => p.status === "active").length
    const out = catalog.filter((p) => p.status === "out_of_stock" || p.stock === 0).length
    const low = catalog.filter((p) => p.status === "low_stock").length
    const value = apiProducts.reduce((sum, p, i) => {
      const price = getApiProductPrice(p)
      return sum + price * (catalog[i]?.stock ?? 0)
    }, 0)

    return [
      {
        id: "total",
        label: "Total Products",
        value: String(total),
        change: 0,
        icon: Package,
      },
      {
        id: "active",
        label: "Active Products",
        value: String(active),
        change: 0,
        icon: CheckCircle2,
      },
      {
        id: "out-of-stock",
        label: "Out of Stock",
        value: String(out),
        change: 0,
        icon: XCircle,
      },
      {
        id: "low-stock",
        label: "Low Stock",
        value: String(low),
        change: 0,
        icon: AlertTriangle,
      },
      {
        id: "total-value",
        label: "Total Value",
        value: `PKR ${value.toLocaleString("en-PK")}`,
        change: 0,
        icon: Wallet,
      },
    ]
  }, [apiProducts, catalog])

  const filtered = useMemo(() => {
    const headerQ = query.trim().toLowerCase()
    const tableQ = tableQuery.trim().toLowerCase()

    const matches = (p: CatalogProduct, q: string) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q)

    let rows = catalog.filter((p) => {
      if (category !== "all" && p.category.toLowerCase() !== category.toLowerCase()) {
        return false
      }
      if (collection !== "all" && collectionKey(p.collection) !== collection) {
        return false
      }
      if (status !== "all" && p.status !== status) return false
      if (headerQ && !matches(p, headerQ)) return false
      if (tableQ && !matches(p, tableQ)) return false
      return true
    })

    rows = [...rows].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.createdAt.localeCompare(b.createdAt)
        case "price-desc":
          return priceValue(b.price) - priceValue(a.price)
        case "price-asc":
          return priceValue(a.price) - priceValue(b.price)
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "newest":
        default:
          return b.createdAt.localeCompare(a.createdAt)
      }
    })

    return rows
  }, [catalog, tableQuery, query, category, collection, status, sort])

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id))

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((p) => p.id)))
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleDelete(product: CatalogProduct) {
    setDeletingId(product.id)
    deleteProduct(
      { _id: product.id },
      {
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
          setSelected((prev) => {
            const next = new Set(prev)
            next.delete(product.id)
            return next
          })
        },
      },
    )
  }

  return (
    <div className="min-h-screen px-4 pb-12 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8" style={{ opacity: 1 }}>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1
              className={`${cormorant.className} text-3xl sm:text-4xl`}
              style={{ color: dk.on, opacity: 1 }}
            >
              {PRODUCTS_PAGE.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: dk.onVar, opacity: 1 }}>
              {PRODUCTS_PAGE.subtitle}
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center xl:max-w-2xl xl:justify-end">
            <div
              className="relative flex flex-1 items-center rounded-lg border px-3 py-2.5"
              style={{ borderColor: dk.panelBorder, background: "#FFFFFF" }}
            >
              <Search className="size-4 shrink-0" style={{ color: dk.onVar }} strokeWidth={1.8} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={PRODUCTS_PAGE.searchPlaceholder}
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{ color: dk.on }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-10 items-center justify-center rounded-lg border"
                style={{ borderColor: dk.panelBorder, color: dk.accent, background: "#FFFFFF" }}
              >
                <Bell className="size-4" strokeWidth={1.6} />
                <span
                  className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: dk.accent, color: "#FFFFFF" }}
                >
                  3
                </span>
              </button>
              <Link
                href="/admin/products/new"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all hover:brightness-110"
                style={{
                  backgroundColor: dk.accent,
                  backgroundImage: "none",
                  color: "#FFFFFF",
                  opacity: 1,
                }}
              >
                <Plus className="size-4" strokeWidth={2} color="#FFFFFF" />
                Add Product
                <ChevronDown className="size-3.5" strokeWidth={2.5} color="#FFFFFF" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {summaryStats.map((stat) => (
          <SummaryStatCard key={stat.id} stat={stat} hideChange />
        ))}
      </div>

      <div
        ref={tableRef}
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: dk.panelBorder, background: dk.panel }}
      >
        <div
          className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between"
          style={{ borderColor: dk.panelBorder }}
        >
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div
              className="relative flex min-w-[180px] flex-1 items-center rounded-lg border px-3 py-2"
              style={{ borderColor: dk.panelBorder, background: "#F7F4EF" }}
            >
              <Search className="size-3.5" style={{ color: dk.onVar }} strokeWidth={1.8} />
              <input
                type="search"
                value={tableQuery}
                onChange={(e) => setTableQuery(e.target.value)}
                placeholder={PRODUCTS_PAGE.tableSearchPlaceholder}
                className="ml-2 w-full bg-transparent text-xs outline-none placeholder:opacity-50"
                style={{ color: dk.on }}
              />
            </div>
            <FilterSelect options={CATEGORY_FILTERS} value={category} onChange={setCategory} />
            <FilterSelect options={COLLECTION_FILTERS} value={collection} onChange={setCollection} />
            <FilterSelect options={STATUS_FILTERS} value={status} onChange={setStatus} />
            <ToolbarButton icon={Filter} label="Filters" />
            <ToolbarButton icon={Download} label="Export" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: dk.onVar }}>
              Sort by:
            </span>
            <FilterSelect options={SORT_OPTIONS} value={sort} onChange={setSort} compact />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr
                className="border-b text-[10px] uppercase tracking-wider"
                style={{ borderColor: dk.panelBorder, color: dk.onVar }}
              >
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all products"
                    className="size-3.5 rounded border accent-[#C5A059]"
                    disabled={isLoading || filtered.length === 0}
                  />
                </th>
                <th className="px-3 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">SKU</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium">Price</th>
                <th className="px-3 py-3 font-medium">Stock</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Visibility</th>
                <th className="px-3 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm" style={{ color: dk.onVar }}>
                    Loading products…
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <p className="text-sm" style={{ color: dk.danger }} role="alert">
                      Couldn’t load products
                      {error instanceof Error ? `: ${error.message}` : "."}
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-3 rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wide"
                      style={{ borderColor: dk.panelBorder, color: dk.accent }}
                    >
                      {isFetching ? "Retrying…" : "Try again"}
                    </button>
                  </td>
                </tr>
              ) : null}

              {!isLoading && !isError && filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm" style={{ color: dk.onVar }}>
                    No products found.
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                !isError &&
                filtered.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    checked={selected.has(product.id)}
                    onToggle={() => toggleOne(product.id)}
                    onDelete={() => handleDelete(product)}
                    isDeleting={isDeleting && deletingId === product.id}
                  />
                ))}
            </tbody>
          </table>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-4 border-t px-4 py-4 sm:flex-row"
          style={{ borderColor: dk.panelBorder }}
        >
          <p className="text-xs" style={{ color: dk.onVar }}>
            Showing {filtered.length === 0 ? 0 : 1} to {filtered.length} of {catalog.length}{" "}
            products
          </p>
          <Pagination total={filtered.length} />
        </div>
      </div>
    </div>
  )
}

function SummaryStatCard({
  stat,
  hideChange,
}: {
  stat: ProductSummaryStat
  hideChange?: boolean
}) {
  const Icon = stat.icon
  const positive = stat.change >= 0

  return (
    <div
      data-dash-item
      className="rounded-xl border p-4 transition-colors hover:border-[rgba(185,108,115,0.28)]"
      style={{ borderColor: dk.panelBorder, background: panelGradient(), opacity: 1 }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-lg border"
          style={{ borderColor: dk.panelBorder, backgroundColor: "rgba(185, 108, 115, 0.10)" }}
        >
          <Icon className="size-4" style={{ color: dk.accent }} strokeWidth={1.6} />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: dk.onVar }}>
          {stat.label}
        </p>
      </div>
      <p
        className={`${cormorant.className} text-2xl leading-none`}
        style={{ color: "#171414", opacity: 1 }}
      >
        {stat.value}
      </p>
      {!hideChange ? (
        <p className="mt-2 text-[11px]" style={{ color: positive ? dk.success : dk.danger }}>
          {positive ? "↑" : "↓"} {Math.abs(stat.change)}%{" "}
          <span style={{ color: dk.onFaint }}>vs last month</span>
        </p>
      ) : (
        <p className="mt-2 text-[11px]" style={{ color: dk.onFaint }}>
          Live from catalog
        </p>
      )}
    </div>
  )
}

function ProductTableRow({
  product,
  checked,
  onToggle,
  onDelete,
  isDeleting,
}: {
  product: CatalogProduct
  checked: boolean
  onToggle: () => void
  onDelete: () => void
  isDeleting?: boolean
}) {
  const stockColor =
    product.stock === 0 ? dk.danger : product.stock <= 5 ? dk.warning : dk.success
  const isRemote = product.image.startsWith("http")

  return (
    <tr
      data-dash-item
      className="border-b transition-colors hover:bg-black/[0.02]"
      style={{ borderColor: dk.panelBorder }}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          aria-label={`Select ${product.name}`}
          className="size-3.5 rounded border accent-[#C5A059]"
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div
            className="relative size-10 shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: dk.panelBorder, backgroundColor: "#EFE8DF" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized={isRemote}
              className="object-contain p-0.5"
              sizes="40px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium" style={{ color: dk.on }}>
              {product.name}
            </p>
            <p className="truncate text-xs" style={{ color: dk.onFaint }}>
              {product.collection}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
        {product.sku}
      </td>
      <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
        {product.category}
      </td>
      <td className="px-3 py-3 text-xs font-medium" style={{ color: dk.on }}>
        {product.price}
      </td>
      <td className="px-3 py-3">
        <span className="text-xs font-semibold" style={{ color: stockColor }}>
          {product.stock}
        </span>
      </td>
      <td className="px-3 py-3">
        <StatusBadge status={product.status} />
      </td>
      <td className="px-3 py-3">
        {product.visible ? (
          <Eye className="size-4" style={{ color: dk.accent }} strokeWidth={1.6} aria-label="Visible" />
        ) : (
          <EyeOff className="size-4" style={{ color: dk.onFaint }} strokeWidth={1.6} aria-label="Hidden" />
        )}
      </td>
      <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: dk.onVar }}>
        {product.createdAt}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/admin/products/${product.id}/edit`}
            aria-label={`Edit ${product.name}`}
            className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-black/[0.04]"
            style={{ borderColor: dk.panelBorder, color: dk.accent }}
          >
            <Pencil className="size-3.5" strokeWidth={1.8} />
          </Link>
          <button
            type="button"
            aria-label={isDeleting ? `Deleting ${product.name}` : `Delete ${product.name}`}
            onClick={onDelete}
            disabled={isDeleting}
            className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ borderColor: dk.panelBorder, color: dk.danger }}
          >
            {isDeleting ? (
              <Loader2 className="size-3.5 animate-spin" strokeWidth={2} />
            ) : (
              <Trash2 className="size-3.5" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </td>
    </tr>
  )
}

function FilterSelect({
  options,
  value,
  onChange,
  compact,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
  compact?: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-lg border py-2 pl-3 pr-8 text-xs outline-none transition-colors hover:bg-black/[0.02] ${compact ? "min-w-[120px]" : "min-w-[140px]"}`}
        style={{
          borderColor: dk.panelBorder,
          background: "#F7F4EF",
          color: dk.onVar,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: dk.sidebar }}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2"
        style={{ color: dk.onVar }}
        strokeWidth={2}
      />
    </div>
  )
}

function ToolbarButton({ icon: Icon, label }: { icon: DashIcon; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-black/[0.03]"
      style={{ borderColor: dk.panelBorder, color: dk.onVar }}
    >
      <Icon className="size-3.5 text-[#C5A059]" strokeWidth={1.8} />
      {label}
    </button>
  )
}

function Pagination({ total }: { total: number }) {
  const pages = total > 0 ? [1] : []
  return (
    <div className="flex items-center gap-1">
      <PageBtn disabled>&lsaquo;</PageBtn>
      {pages.map((n) => (
        <PageBtn key={n} active={n === 1}>
          {n}
        </PageBtn>
      ))}
      <PageBtn disabled>&rsaquo;</PageBtn>
    </div>
  )
}

function PageBtn({
  children,
  active,
  disabled,
}: {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex size-8 items-center justify-center rounded-md text-xs transition-colors disabled:opacity-40"
      style={{
        backgroundColor: active ? "rgba(185,108,115,0.15)" : "transparent",
        color: active ? dk.accent : dk.onVar,
        border: active ? `1px solid ${dk.borderStrong}` : "1px solid transparent",
      }}
    >
      {children}
    </button>
  )
}

function collectionKey(name: string): string {
  const map: Record<string, string> = {
    "Everyday Glow": "everyday-glow",
    "Night Out": "night-out",
    "New Drop": "new-drop",
    "Best Sellers": "best-sellers",
    "Clean Skin": "clean-skin",
  }
  return map[name] ?? name.toLowerCase().replace(/\s+/g, "-")
}

function priceValue(label: string): number {
  const n = Number(label.replace(/[^\d.]/g, ""))
  return Number.isFinite(n) ? n : 0
}
