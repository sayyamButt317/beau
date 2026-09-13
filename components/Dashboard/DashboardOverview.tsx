"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import {
  BEST_SELLERS,
  INVENTORY_SUMMARY,
  LATEST_PRODUCTS,
  QUICK_ACTIONS,
  RECENT_ORDERS,
  REVENUE_CHART,
  STAT_METRICS,
  UPLOAD_LOOKBOOK,
} from "./data"
import { useDashReveal, useDashStagger } from "./hooks/useGsap"
import RevenueChart, { ChartFilter } from "./RevenueChart"
import { BestSellingList, LatestProductsTable, RecentOrdersList } from "./sections/Tables"
import DashboardTopBar from "./TopBar"
import { ActionTile, Panel, StatCard } from "./ui"
import { cormorant, dk, goldGradient } from "./theme"
import type { InventoryStat } from "./types"

export default function DashboardOverview() {
  const statsRef = useDashStagger<HTMLDivElement>(0.07)
  const midRef = useDashReveal<HTMLDivElement>(0.1)
  const bottomRef = useDashReveal<HTMLDivElement>(0.15)

  return (
    <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8 lg:pb-12">
      <DashboardTopBar />

      {/* Stats row */}
      <div
        ref={statsRef}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
      >
        {STAT_METRICS.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Middle: chart + best sellers + quick actions */}
      <div ref={midRef} className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <Panel title="Revenue Overview" action={<ChartFilter />}>
            <RevenueChart data={REVENUE_CHART} />
          </Panel>
        </div>
        <div className="xl:col-span-3">
          <BestSellingList items={BEST_SELLERS} />
        </div>
        <div className="xl:col-span-4">
          <QuickActionsPanel />
        </div>
      </div>

      {/* Bottom: table + orders + inventory */}
      <div ref={bottomRef} className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <LatestProductsTable products={LATEST_PRODUCTS} />
        </div>
        <div className="xl:col-span-5 space-y-5">
          <RecentOrdersList orders={RECENT_ORDERS} />
          <InventorySummary stats={INVENTORY_SUMMARY} />
        </div>
      </div>

      <FloatingAddButton />
    </div>
  )
}

function QuickActionsPanel() {
  return (
    <Panel title="Quick Actions">
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Link key={action.id} href={action.href ?? "#"} data-dash-item className="block">
            <ActionTile label={action.label} icon={action.icon} as="div" />
          </Link>
        ))}
        <Link href={UPLOAD_LOOKBOOK.href ?? "#"} className="col-span-2 block" data-dash-item>
          <ActionTile label={UPLOAD_LOOKBOOK.label} icon={UPLOAD_LOOKBOOK.icon} wide as="div" />
        </Link>
      </div>
    </Panel>
  )
}

function InventorySummary({ stats }: { stats: InventoryStat[] }) {
  const tones = {
    success: dk.success,
    warning: dk.warning,
    danger: dk.danger,
    neutral: dk.on,
  }

  return (
    <Panel title="Inventory Summary">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            data-dash-item
            className="rounded-lg border px-3 py-3 text-center"
            style={{ borderColor: dk.panelBorder }}
          >
            <p className={`${cormorant.className} text-2xl leading-none`} style={{ color: tones[s.tone] }}>
              {s.value}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wide" style={{ color: dk.onVar }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function FloatingAddButton() {
  return (
    <Link
      href="/admin/products"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5 transition-transform hover:scale-105"
      aria-label="Add Product"
    >
      <span
        className="flex size-14 items-center justify-center rounded-full shadow-[0_8px_32px_rgba(197,160,89,0.35)]"
        style={{ background: goldGradient, color: "#FFFFFF" }}
      >
        <Plus className="size-6" strokeWidth={2.5} />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: dk.accent }}>
        Add Product
      </span>
    </Link>
  )
}
