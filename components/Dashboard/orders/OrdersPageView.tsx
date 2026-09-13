"use client"

import { useMemo, useState } from "react"
import { Download, Filter, MoreVertical } from "lucide-react"
import { useDashStagger, useMountFade } from "../hooks/useGsap"
import { StatCard, StatusBadge } from "../ui"
import {
  CatalogTableShell,
  DashboardPageHeader,
  RowActionsButton,
  TablePagination,
} from "../ui/catalogPage"
import {
  FulfillmentCell,
  OrderDetailPanel,
  OrderTabBar,
  PaymentCell,
} from "../ui/ordersPage"
import { dk } from "../theme"
import type { Order, OrderTab } from "../types"
import {
  DEFAULT_SELECTED_ORDER_ID,
  ORDER_METRICS,
  ORDER_TABS,
  ORDERS,
  ORDERS_PAGE,
} from "./data"

export default function OrdersPageView() {
  const headerRef = useMountFade<HTMLElement>(0.05)
  const statsRef = useDashStagger<HTMLDivElement>(0.06)
  const tableRef = useDashStagger<HTMLDivElement>(0.04)

  const [globalSearch, setGlobalSearch] = useState("")
  const [activeTab, setActiveTab] = useState<OrderTab>("all")
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_SELECTED_ORDER_ID)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(ORDERS_PAGE.defaultPageSize)
  const [panelOpen, setPanelOpen] = useState(true)

  const filtered = useMemo(() => {
    const q = globalSearch.trim().toLowerCase()
    return ORDERS.filter((order) => {
      if (activeTab !== "all" && order.status !== activeTab) return false
      if (!q) return true
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.email.toLowerCase().includes(q)
      )
    })
  }, [globalSearch, activeTab])

  const displayTotal = ORDERS_PAGE.totalCount
  const displayTotalPages = Math.ceil(displayTotal / pageSize)
  const safePage = Math.min(page, displayTotalPages)
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  const from = pageRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, displayTotal)

  const selectedOrder = ORDERS.find((o) => o.id === selectedId) ?? null

  function selectOrder(order: Order) {
    setSelectedId(order.id)
    setPanelOpen(true)
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  return (
    <div className="min-h-screen px-4 pb-12 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8">
        <DashboardPageHeader
          title={ORDERS_PAGE.title}
          subtitle={ORDERS_PAGE.subtitle}
          searchPlaceholder={ORDERS_PAGE.searchPlaceholder}
          searchValue={globalSearch}
          onSearchChange={setGlobalSearch}
          actionLabel="Export Orders"
          actionIcon={Download}
          secondaryActionLabel="Filters"
          secondaryActionIcon={Filter}
          showActionChevron={false}
        />
      </header>

      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        {ORDER_METRICS.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div ref={tableRef} className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <CatalogTableShell>
            <OrderTabBar tabs={ORDER_TABS} active={activeTab} onChange={setActiveTab} />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr
                    className="border-b text-[10px] uppercase tracking-wider"
                    style={{ borderColor: dk.panelBorder, color: dk.onVar }}
                  >
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-3 py-3 font-medium">Customer</th>
                    <th className="px-3 py-3 font-medium">Date</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Total</th>
                    <th className="px-3 py-3 font-medium">Payment</th>
                    <th className="px-3 py-3 font-medium">Fulfillment</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      selected={selectedId === order.id}
                      onSelect={() => selectOrder(order)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <TablePagination
              from={from}
              to={to}
              total={displayTotal}
              entityLabel={ORDERS_PAGE.entityLabel}
              page={safePage}
              totalPages={displayTotalPages}
              onPageChange={setPage}
              pageSize={pageSize}
              pageSizeOptions={[...ORDERS_PAGE.pageSizeOptions]}
              onPageSizeChange={handlePageSizeChange}
            />
          </CatalogTableShell>
        </div>

        <div className="hidden shrink-0 xl:block">
          <OrderDetailPanel order={selectedOrder} />
        </div>
        {panelOpen && selectedOrder && (
          <div className="xl:hidden">
            <OrderDetailPanel
              order={selectedOrder}
              onClose={() => setPanelOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function OrderRow({
  order,
  selected,
  onSelect,
}: {
  order: Order
  selected: boolean
  onSelect: () => void
}) {
  return (
    <tr
      data-dash-item
      onClick={onSelect}
      className="cursor-pointer border-b transition-colors hover:bg-white/[0.02]"
      style={{
        borderColor: dk.panelBorder,
        boxShadow: selected ? `inset 2px 0 0 ${dk.accent}` : undefined,
        backgroundColor: selected ? "rgba(197,160,89,0.04)" : undefined,
      }}
    >
      <td className="px-4 py-3">
        <span className="text-xs font-semibold" style={{ color: dk.accent }}>
          {order.orderNumber}
        </span>
      </td>
      <td className="px-3 py-3">
        <p className="text-xs font-medium" style={{ color: dk.on }}>
          {order.customer.name}
        </p>
        <p className="truncate text-[10px]" style={{ color: dk.onFaint }}>
          {order.customer.email}
        </p>
      </td>
      <td className="px-3 py-3">
        <p className="text-xs whitespace-nowrap" style={{ color: dk.onVar }}>
          {order.placedAt}
        </p>
        <p className="text-[10px]" style={{ color: dk.onFaint }}>
          {order.placedAtTime}
        </p>
      </td>
      <td className="px-3 py-3">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-3 py-3">
        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: dk.on }}>
          {order.total}
        </span>
      </td>
      <td className="px-3 py-3">
        <PaymentCell method={order.payment.method} status={order.payment.status} />
      </td>
      <td className="px-3 py-3">
        <FulfillmentCell status={order.fulfillment} />
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <RowActionsButton label={`Actions for ${order.orderNumber}`} />
      </td>
    </tr>
  )
}
