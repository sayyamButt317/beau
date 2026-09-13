"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useDashStagger, useMountFade } from "../hooks/useGsap"
import { StatCard, StatusBadge } from "../ui"
import {
  CatalogTableShell,
  DashboardPageHeader,
  FilterSelect,
  InventoryTableToolbar,
  RowEditActions,
  SelectCheckbox,
  StockCount,
  TablePagination,
} from "../ui/catalogPage"
import { dk } from "../theme"
import type { InventoryItem } from "../types"
import {
  INVENTORY_CATEGORY_FILTERS,
  INVENTORY_COLLECTION_FILTERS,
  INVENTORY_ITEMS,
  INVENTORY_LOCATION_FILTERS,
  INVENTORY_METRICS,
  INVENTORY_PAGE,
  INVENTORY_STATUS_FILTERS,
  categoryKey,
  collectionKey,
  locationKey,
} from "./data"

export default function InventoryPageView() {
  const headerRef = useMountFade<HTMLElement>(0.05)
  const statsRef = useDashStagger<HTMLDivElement>(0.06)
  const tableRef = useDashStagger<HTMLDivElement>(0.04)

  const [globalSearch, setGlobalSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [collection, setCollection] = useState("all")
  const [status, setStatus] = useState("all")
  const [location, setLocation] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(INVENTORY_PAGE.defaultPageSize)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = tableSearch.trim().toLowerCase()
    return INVENTORY_ITEMS.filter((item) => {
      if (category !== "all" && categoryKey(item.category) !== category) return false
      if (collection !== "all" && collectionKey(item.collection) !== collection) return false
      if (status !== "all" && item.status !== status) return false
      if (location !== "all" && locationKey(item.location) !== location) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.collection.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      )
    })
  }, [tableSearch, category, collection, status, location])

  const displayTotal = INVENTORY_PAGE.totalCount
  const displayTotalPages = Math.ceil(displayTotal / pageSize)
  const safePage = Math.min(page, displayTotalPages)
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  const from = pageRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, displayTotal)

  const allSelected = pageRows.length > 0 && pageRows.every((item) => selected.has(item.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(pageRows.map((item) => item.id)))
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  return (
    <div className="min-h-screen px-4 pb-12 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8">
        <DashboardPageHeader
          title={INVENTORY_PAGE.title}
          subtitle={INVENTORY_PAGE.subtitle}
          searchPlaceholder={INVENTORY_PAGE.searchPlaceholder}
          searchValue={globalSearch}
          onSearchChange={setGlobalSearch}
          actionLabel="Import Inventory"
          actionIcon={Plus}
          secondaryActionLabel="Export"
          showActionChevron={false}
        />
      </header>

      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        {INVENTORY_METRICS.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div ref={tableRef}>
        <CatalogTableShell>
          <InventoryTableToolbar
            tableSearch={tableSearch}
            onTableSearchChange={setTableSearch}
            tableSearchPlaceholder={INVENTORY_PAGE.tableSearchPlaceholder}
            filters={
              <>
                <FilterSelect
                  options={INVENTORY_CATEGORY_FILTERS}
                  value={category}
                  onChange={setCategory}
                />
                <FilterSelect
                  options={INVENTORY_COLLECTION_FILTERS}
                  value={collection}
                  onChange={setCollection}
                />
                <FilterSelect
                  options={INVENTORY_STATUS_FILTERS}
                  value={status}
                  onChange={setStatus}
                />
                <FilterSelect
                  options={INVENTORY_LOCATION_FILTERS}
                  value={location}
                  onChange={setLocation}
                />
              </>
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead>
                <tr
                  className="border-b text-[10px] uppercase tracking-wider"
                  style={{ borderColor: dk.panelBorder, color: dk.onVar }}
                >
                  <th className="w-10 px-4 py-3">
                    <SelectCheckbox
                      checked={allSelected}
                      onChange={toggleAll}
                      label="Select all inventory items"
                    />
                  </th>
                  <th className="px-3 py-3 font-medium">Product</th>
                  <th className="px-3 py-3 font-medium">SKU</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Collection</th>
                  <th className="px-3 py-3 font-medium">Stock</th>
                  <th className="px-3 py-3 font-medium">Reserved</th>
                  <th className="px-3 py-3 font-medium">Available</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Location</th>
                  <th className="px-3 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((item) => (
                  <InventoryRow
                    key={item.id}
                    item={item}
                    checked={selected.has(item.id)}
                    onToggle={() => toggleOne(item.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination
            from={from}
            to={to}
            total={displayTotal}
            entityLabel={INVENTORY_PAGE.entityLabel}
            page={safePage}
            totalPages={displayTotalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            pageSizeOptions={[...INVENTORY_PAGE.pageSizeOptions]}
            onPageSizeChange={handlePageSizeChange}
          />
        </CatalogTableShell>
      </div>
    </div>
  )
}

function InventoryRow({
  item,
  checked,
  onToggle,
}: {
  item: InventoryItem
  checked: boolean
  onToggle: () => void
}) {
  return (
    <tr
      data-dash-item
      className="border-b transition-colors hover:bg-white/[0.02]"
      style={{ borderColor: dk.panelBorder }}
    >
      <td className="px-4 py-3">
        <SelectCheckbox
          checked={checked}
          onChange={onToggle}
          label={`Select ${item.name}`}
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div
            className="relative size-11 shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: dk.panelBorder, backgroundColor: "#EFE8DF" }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-1"
              sizes="44px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium" style={{ color: dk.on }}>
              {item.name}
            </p>
            <p className="truncate text-[11px]" style={{ color: dk.onFaint }}>
              {item.collection}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3">
        <span className="text-xs font-mono" style={{ color: dk.onVar }}>
          {item.sku}
        </span>
      </td>
      <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
        {item.category}
      </td>
      <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
        {item.collection}
      </td>
      <td className="px-3 py-3">
        <StockCount value={item.stock} status={item.status} />
      </td>
      <td className="px-3 py-3">
        <StockCount value={item.reserved} status="reserved" />
      </td>
      <td className="px-3 py-3">
        <StockCount
          value={item.available}
          status={
            item.available === 0
              ? "out_of_stock"
              : item.available <= 3
                ? "low_stock"
                : "available"
          }
        />
      </td>
      <td className="px-3 py-3">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: dk.onVar }}>
        {item.location}
      </td>
      <td className="px-3 py-3 text-xs font-medium whitespace-nowrap" style={{ color: dk.on }}>
        {item.value}
      </td>
      <td className="px-4 py-3">
        <RowEditActions label={item.name} />
      </td>
    </tr>
  )
}
