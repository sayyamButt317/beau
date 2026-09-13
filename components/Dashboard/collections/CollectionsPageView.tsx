"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Layers, Plus } from "lucide-react"
import { useDashStagger, useMountFade } from "../hooks/useGsap"
import { StatusBadge } from "../ui"
import {
  CatalogTableShell,
  DashboardPageHeader,
  FilterSelect,
  RowActionsButton,
  SelectCheckbox,
  SummaryStatCard,
  TablePagination,
  TableToolbar,
  VisibilityCell,
} from "../ui/catalogPage"
import { dk } from "../theme"
import type { JewelryCollection } from "../types"
import {
  COLLECTIONS_PAGE,
  COLLECTION_CATEGORY_FILTERS,
  COLLECTION_SORT_OPTIONS,
  COLLECTION_STATUS_FILTERS,
  COLLECTION_SUMMARY_STATS,
  COLLECTION_VISIBILITY_FILTERS,
  JEWELRY_COLLECTIONS,
} from "./data"

export default function CollectionsPageView() {
  const headerRef = useMountFade<HTMLElement>(0.05)
  const statsRef = useDashStagger<HTMLDivElement>(0.07)
  const tableRef = useDashStagger<HTMLDivElement>(0.04)

  const [globalSearch, setGlobalSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [category, setCategory] = useState("all")
  const [visibility, setVisibility] = useState("all")
  const [sort, setSort] = useState("newest")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = tableSearch.trim().toLowerCase()
    return JEWELRY_COLLECTIONS.filter((c) => {
      if (status !== "all" && c.status !== status) return false
      if (category !== "all" && c.category.toLowerCase() !== category) return false
      if (visibility === "visible" && !c.visible) return false
      if (visibility === "hidden" && c.visible) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      )
    })
  }, [tableSearch, status, category, visibility])

  const allSelected = filtered.length > 0 && filtered.every((c) => selected.has(c.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(filtered.map((c) => c.id)))
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen px-4 pb-12 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8">
        <DashboardPageHeader
          title={COLLECTIONS_PAGE.title}
          subtitle={COLLECTIONS_PAGE.subtitle}
          searchPlaceholder={COLLECTIONS_PAGE.searchPlaceholder}
          searchValue={globalSearch}
          onSearchChange={setGlobalSearch}
          actionLabel="Add Collection"
          actionIcon={Plus}
        />
      </header>

      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {COLLECTION_SUMMARY_STATS.map((stat) => (
          <SummaryStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div ref={tableRef}>
        <CatalogTableShell>
          <TableToolbar
            tableSearch={tableSearch}
            onTableSearchChange={setTableSearch}
            tableSearchPlaceholder={COLLECTIONS_PAGE.tableSearchPlaceholder}
            sortLabel="Sort:"
            sortOptions={COLLECTION_SORT_OPTIONS}
            sortValue={sort}
            onSortChange={setSort}
            filters={
              <>
                <FilterSelect
                  options={COLLECTION_STATUS_FILTERS}
                  value={status}
                  onChange={setStatus}
                />
                <FilterSelect
                  options={COLLECTION_CATEGORY_FILTERS}
                  value={category}
                  onChange={setCategory}
                />
                <FilterSelect
                  options={COLLECTION_VISIBILITY_FILTERS}
                  value={visibility}
                  onChange={setVisibility}
                />
              </>
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr
                  className="border-b text-[10px] uppercase tracking-wider"
                  style={{ borderColor: dk.panelBorder, color: dk.onVar }}
                >
                  <th className="w-10 px-4 py-3">
                    <SelectCheckbox
                      checked={allSelected}
                      onChange={toggleAll}
                      label="Select all collections"
                    />
                  </th>
                  <th className="px-3 py-3 font-medium">Collection</th>
                  <th className="px-3 py-3 font-medium">Description</th>
                  <th className="px-3 py-3 font-medium">Products</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Visibility</th>
                  <th className="px-3 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((collection) => (
                  <CollectionRow
                    key={collection.id}
                    collection={collection}
                    checked={selected.has(collection.id)}
                    onToggle={() => toggleOne(collection.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination
            from={1}
            to={filtered.length}
            total={COLLECTIONS_PAGE.totalCount}
            entityLabel={COLLECTIONS_PAGE.entityLabel}
          />
        </CatalogTableShell>
      </div>
    </div>
  )
}

function CollectionRow({
  collection,
  checked,
  onToggle,
}: {
  collection: JewelryCollection
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
          label={`Select ${collection.name}`}
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div
            className="relative size-11 shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: dk.panelBorder, backgroundColor: "#EFE8DF" }}
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-contain p-1"
              sizes="44px"
            />
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Layers className="size-3.5 shrink-0 text-[#C5A059]" strokeWidth={1.6} />
            <p className="truncate font-medium" style={{ color: dk.on }}>
              {collection.name}
            </p>
          </div>
        </div>
      </td>
      <td className="max-w-[220px] px-3 py-3">
        <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: dk.onVar }}>
          {collection.description}
        </p>
      </td>
      <td className="px-3 py-3">
        <span className="text-xs font-semibold" style={{ color: dk.on }}>
          {collection.productCount}
        </span>
      </td>
      <td className="px-3 py-3">
        <StatusBadge status={collection.status} />
      </td>
      <td className="px-3 py-3">
        <VisibilityCell visible={collection.visible} />
      </td>
      <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: dk.onVar }}>
        {collection.createdAt}
      </td>
      <td className="px-4 py-3">
        <RowActionsButton label={`Actions for ${collection.name}`} />
      </td>
    </tr>
  )
}
