"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Grid3X3, Plus } from "lucide-react"
import { useDashStagger, useMountFade } from "../hooks/useGsap"
import { StatusBadge } from "../ui"
import {
  CatalogTableShell,
  DashboardPageHeader,
  FilterSelect,
  RowEditActions,
  SelectCheckbox,
  SummaryStatCard,
  TablePagination,
  TableToolbar,
} from "../ui/catalogPage"
import { dk } from "../theme"
import type { ProductCategory } from "../types"
import {
  CATEGORIES_PAGE,
  CATEGORY_SORT_OPTIONS,
  CATEGORY_STATUS_FILTERS,
  CATEGORY_SUMMARY_STATS,
  PRODUCT_CATEGORIES,
} from "./data"

const PAGE_SIZE = 8

export default function CategoriesPageView() {
  const headerRef = useMountFade<HTMLElement>(0.05)
  const statsRef = useDashStagger<HTMLDivElement>(0.07)
  const tableRef = useDashStagger<HTMLDivElement>(0.04)

  const [globalSearch, setGlobalSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = tableSearch.trim().toLowerCase()
    let rows = PRODUCT_CATEGORIES.filter((c) => {
      if (status !== "all" && c.status !== status) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    })

    if (sort === "name-asc") {
      rows = [...rows].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === "products-desc") {
      rows = [...rows].sort((a, b) => b.productCount - a.productCount)
    }

    return rows
  }, [tableSearch, status, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, filtered.length)

  const allSelected = pageRows.length > 0 && pageRows.every((c) => selected.has(c.id))

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(pageRows.map((c) => c.id)))
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
          title={CATEGORIES_PAGE.title}
          subtitle={CATEGORIES_PAGE.subtitle}
          searchPlaceholder={CATEGORIES_PAGE.searchPlaceholder}
          searchValue={globalSearch}
          onSearchChange={setGlobalSearch}
          actionLabel="Add Category"
          actionIcon={Plus}
        />
      </header>

      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {CATEGORY_SUMMARY_STATS.map((stat) => (
          <SummaryStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div ref={tableRef}>
        <CatalogTableShell>
          <TableToolbar
            tableSearch={tableSearch}
            onTableSearchChange={setTableSearch}
            tableSearchPlaceholder={CATEGORIES_PAGE.tableSearchPlaceholder}
            sortLabel="Sort:"
            sortOptions={CATEGORY_SORT_OPTIONS}
            sortValue={sort}
            onSortChange={setSort}
            showFilters={false}
            filters={
              <FilterSelect
                options={CATEGORY_STATUS_FILTERS}
                value={status}
                onChange={setStatus}
              />
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr
                  className="border-b text-[10px] uppercase tracking-wider"
                  style={{ borderColor: dk.panelBorder, color: dk.onVar }}
                >
                  <th className="w-10 px-4 py-3">
                    <SelectCheckbox
                      checked={allSelected}
                      onChange={toggleAll}
                      label="Select all categories"
                    />
                  </th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Description</th>
                  <th className="px-3 py-3 font-medium">Products</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    checked={selected.has(category.id)}
                    onToggle={() => toggleOne(category.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination
            from={from}
            to={to}
            total={filtered.length}
            entityLabel={CATEGORIES_PAGE.entityLabel}
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CatalogTableShell>
      </div>
    </div>
  )
}

function CategoryRow({
  category,
  checked,
  onToggle,
}: {
  category: ProductCategory
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
          label={`Select ${category.name}`}
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <div
            className="relative size-11 shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: dk.panelBorder, backgroundColor: "#EFE8DF" }}
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain p-1"
              sizes="44px"
            />
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Grid3X3 className="size-3.5 shrink-0 text-[#C5A059]" strokeWidth={1.6} />
            <p className="truncate font-medium" style={{ color: dk.on }}>
              {category.name}
            </p>
          </div>
        </div>
      </td>
      <td className="max-w-[260px] px-3 py-3">
        <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: dk.onVar }}>
          {category.description}
        </p>
      </td>
      <td className="px-3 py-3">
        <span className="text-xs font-semibold" style={{ color: dk.on }}>
          {category.productCount}
        </span>
      </td>
      <td className="px-3 py-3">
        <StatusBadge status={category.status} />
      </td>
      <td className="px-3 py-3 text-xs whitespace-nowrap" style={{ color: dk.onVar }}>
        {category.createdAt}
      </td>
      <td className="px-4 py-3">
        <RowEditActions label={category.name} />
      </td>
    </tr>
  )
}
