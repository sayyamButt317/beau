"use client"

import { Bell, ChevronDown, Download, Eye, EyeOff, Filter, MoreVertical, Pencil, Plus, Search, Settings } from "lucide-react"
import { cormorant, dk, goldGradient, panelGradient } from "../theme"
import type { DashIcon, InventoryStatus, SummaryStat } from "../types"

/* ------------------------------------------------------------------ */
/*  Shared catalog page chrome (products, collections, …)              */
/* ------------------------------------------------------------------ */

export function DashboardPageHeader({
  title,
  subtitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  secondaryActionLabel,
  secondaryActionIcon: SecondaryIcon = Download,
  showActionChevron = true,
}: {
  title: string
  subtitle: string
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (v: string) => void
  actionLabel: string
  actionIcon?: DashIcon
  secondaryActionLabel?: string
  secondaryActionIcon?: DashIcon
  showActionChevron?: boolean
}) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 className={`${cormorant.className} text-3xl sm:text-4xl`} style={{ color: dk.on }}>
          {title}
        </h1>
        <p className="mt-1 text-sm" style={{ color: dk.onVar }}>
          {subtitle}
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
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
            style={{ color: dk.on }}
          />
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell />
          {secondaryActionLabel && (
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-black/[0.03]"
              style={{ borderColor: dk.panelBorder, color: dk.onVar }}
            >
              {SecondaryIcon && <SecondaryIcon className="size-4 text-[#C5A059]" strokeWidth={1.8} />}
              {secondaryActionLabel}
            </button>
          )}
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all hover:brightness-110"
            style={{ background: goldGradient, color: "#FFFFFF" }}
          >
            {ActionIcon && <ActionIcon className="size-4" strokeWidth={2} />}
            {actionLabel}
            {showActionChevron && <ChevronDown className="size-3.5" strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export function NotificationBell({ count = 3 }: { count?: number }) {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="relative flex size-10 items-center justify-center rounded-lg border"
      style={{ borderColor: dk.panelBorder, color: dk.accent }}
    >
      <Bell className="size-4" strokeWidth={1.6} />
      <span
        className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold"
        style={{ background: dk.accent, color: "#FFFFFF" }}
      >
        {count}
      </span>
    </button>
  )
}

export function SummaryStatCard({ stat }: { stat: SummaryStat }) {
  const Icon = stat.icon
  const positive = stat.change >= 0

  return (
    <div
      data-dash-item
      className="rounded-xl border p-4 transition-colors hover:border-[rgba(197,160,89,0.28)]"
      style={{ borderColor: dk.panelBorder, background: panelGradient }}
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
      <p className={`${cormorant.className} text-2xl leading-none`} style={{ color: dk.on }}>
        {stat.value}
      </p>
      <p className="mt-2 text-[11px]" style={{ color: positive ? dk.success : dk.danger }}>
        {positive ? "↑" : "↓"} {Math.abs(stat.change)}%{" "}
        <span style={{ color: dk.onFaint }}>vs last month</span>
      </p>
    </div>
  )
}

export function TableToolbar({
  tableSearch,
  onTableSearchChange,
  tableSearchPlaceholder,
  filters,
  sortLabel,
  sortOptions,
  sortValue,
  onSortChange,
  showFilters = true,
}: {
  tableSearch: string
  onTableSearchChange: (v: string) => void
  tableSearchPlaceholder: string
  filters?: React.ReactNode
  sortLabel?: string
  sortOptions: { label: string; value: string }[]
  sortValue: string
  onSortChange: (v: string) => void
  showFilters?: boolean
}) {
  return (
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
            value={tableSearch}
            onChange={(e) => onTableSearchChange(e.target.value)}
            placeholder={tableSearchPlaceholder}
            className="ml-2 w-full bg-transparent text-xs outline-none placeholder:opacity-50"
            style={{ color: dk.on }}
          />
        </div>
        {filters}
        {showFilters && <ToolbarButton icon={Filter} label="Filters" />}
        <ToolbarButton icon={Download} label="Export" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: dk.onVar }}>
          {sortLabel ?? "Sort by:"}
        </span>
        <FilterSelect options={sortOptions} value={sortValue} onChange={onSortChange} compact />
      </div>
    </div>
  )
}

export function FilterSelect({
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
        className={`appearance-none rounded-lg border py-2 pl-3 pr-8 text-xs outline-none transition-colors hover:bg-white/[0.02] ${compact ? "min-w-[120px]" : "min-w-[140px]"}`}
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

export function ToolbarButton({ icon: Icon, label }: { icon: DashIcon; label: string }) {
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

export function InventoryTableToolbar({
  tableSearch,
  onTableSearchChange,
  tableSearchPlaceholder,
  filters,
}: {
  tableSearch: string
  onTableSearchChange: (v: string) => void
  tableSearchPlaceholder: string
  filters: React.ReactNode
}) {
  return (
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
            value={tableSearch}
            onChange={(e) => onTableSearchChange(e.target.value)}
            placeholder={tableSearchPlaceholder}
            className="ml-2 w-full bg-transparent text-xs outline-none placeholder:opacity-50"
            style={{ color: dk.on }}
          />
        </div>
        {filters}
        <ToolbarButton icon={Filter} label="Filters" />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-black/[0.03]"
          style={{ borderColor: dk.borderStrong, color: dk.accent }}
        >
          <Settings className="size-3.5" strokeWidth={1.8} />
          Low Stock Alert Settings
        </button>
      </div>
    </div>
  )
}

/** Highlights stock counts by inventory status */
export function StockCount({ value, status }: { value: number; status: "stock" | "reserved" | "available" | InventoryStatus }) {
  const tone =
    status === "out_of_stock" || (status === "available" && value === 0)
      ? dk.danger
      : status === "low_stock" || (status === "available" && value <= 3)
        ? dk.warning
        : dk.on

  return (
    <span className="text-xs font-semibold tabular-nums" style={{ color: tone }}>
      {value}
    </span>
  )
}

export function TablePagination({
  from,
  to,
  total,
  entityLabel,
  page = 1,
  totalPages = 1,
  onPageChange,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: {
  from: number
  to: number
  total: number
  entityLabel: string
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
}) {
  const pages =
    totalPages <= 4
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, 4]

  return (
    <div
      className="flex flex-col items-center justify-between gap-4 border-t px-4 py-4 sm:flex-row"
      style={{ borderColor: dk.panelBorder }}
    >
      <p className="text-xs" style={{ color: dk.onVar }}>
        Showing {from} to {to} of {total} {entityLabel}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <PageBtn disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
            &lsaquo;
          </PageBtn>
          {pages.map((n) => (
            <PageBtn
              key={n}
              active={n === page}
              onClick={() => onPageChange?.(n)}
            >
              {n}
            </PageBtn>
          ))}
          {totalPages > 4 && (
            <span className="px-1 text-xs" style={{ color: dk.onFaint }}>
              ...
            </span>
          )}
          <PageBtn
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
          >
            &rsaquo;
          </PageBtn>
        </div>
        {pageSize != null && pageSizeOptions && onPageSizeChange && (
          <FilterSelect
            compact
            options={pageSizeOptions.map((n) => ({
              label: `${n} / page`,
              value: String(n),
            }))}
            value={String(pageSize)}
            onChange={(v) => onPageSizeChange(Number(v))}
          />
        )}
      </div>
    </div>
  )
}

export function SelectCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className="size-3.5 rounded border accent-[#C5A059]"
    />
  )
}

export function VisibilityCell({ visible }: { visible: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {visible ? (
        <Eye className="size-4 shrink-0" style={{ color: dk.accent }} strokeWidth={1.6} />
      ) : (
        <EyeOff className="size-4 shrink-0" style={{ color: dk.onFaint }} strokeWidth={1.6} />
      )}
      <span className="text-xs" style={{ color: visible ? dk.onVar : dk.onFaint }}>
        {visible ? "Visible" : "Hidden"}
      </span>
    </div>
  )
}

export function RowActionsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04]"
      style={{ borderColor: dk.panelBorder, color: dk.onVar }}
    >
      <MoreVertical className="size-4" strokeWidth={1.8} />
    </button>
  )
}

/** Edit + overflow actions — used on categories and similar catalog tables */
export function RowEditActions({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label={`Edit ${label}`}
        className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04]"
        style={{ borderColor: dk.panelBorder, color: dk.accent }}
      >
        <Pencil className="size-3.5" strokeWidth={1.8} />
      </button>
      <RowActionsButton label={`More actions for ${label}`} />
    </div>
  )
}

export function CatalogTableShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: dk.panelBorder, background: dk.panel }}
    >
      {children}
    </div>
  )
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-md text-xs transition-colors disabled:opacity-40"
      style={{
        backgroundColor: active ? "rgba(197,160,89,0.15)" : "transparent",
        color: active ? dk.accent : dk.onVar,
        border: active ? `1px solid ${dk.borderStrong}` : "1px solid transparent",
      }}
    >
      {children}
    </button>
  )
}
