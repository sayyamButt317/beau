"use client"

import { clsx } from "clsx"
import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cormorant, dk, goldGradient } from "../theme"
import type { DashIcon, PanelProps, StatMetric, StatusBadgeProps } from "../types"

/* ------------------------------------------------------------------ */
/*  Panel shell                                                        */
/* ------------------------------------------------------------------ */

export function Panel({ title, subtitle, action, children, className, noPadding }: PanelProps) {
  return (
    <div
      className={clsx("overflow-hidden rounded-xl border", className)}
      style={{ borderColor: dk.panelBorder, background: dk.panel }}
    >
      <div
        className="flex items-center justify-between gap-4 border-b px-5 py-4"
        style={{ borderColor: dk.panelBorder }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: dk.on }}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs" style={{ color: dk.onVar }}>
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className={noPadding ? undefined : "p-5"}>{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

const STATUS_STYLES = {
  active: { bg: dk.successMuted, color: dk.success, label: "Active" },
  inactive: { bg: "rgba(107,114,128,0.15)", color: dk.muted, label: "Inactive" },
  low_stock: { bg: dk.warningMuted, color: dk.warning, label: "Low Stock" },
  out_of_stock: { bg: dk.dangerMuted, color: dk.danger, label: "Out of Stock" },
  in_stock: { bg: dk.successMuted, color: dk.success, label: "In Stock" },
  published: { bg: dk.successMuted, color: dk.success, label: "Published" },
  draft: { bg: "rgba(107,114,128,0.15)", color: dk.muted, label: "Draft" },
  archived: { bg: "rgba(23,20,20,0.08)", color: dk.muted, label: "Archived" },
  completed: { bg: dk.successMuted, color: dk.success, label: "Completed" },
  delivered: { bg: dk.successMuted, color: dk.success, label: "Delivered" },
  processing: { bg: dk.accentMuted, color: dk.accent, label: "Processing" },
  shipped: { bg: dk.purpleMuted, color: dk.purple, label: "Shipped" },
  pending: { bg: dk.infoMuted, color: dk.info, label: "Pending" },
  cancelled: { bg: dk.dangerMuted, color: dk.danger, label: "Cancelled" },
  refunded: { bg: dk.dangerMuted, color: dk.danger, label: "Refunded" },
  paid: { bg: dk.successMuted, color: dk.success, label: "Paid" },
  failed: { bg: dk.dangerMuted, color: dk.danger, label: "Failed" },
} as const

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = STATUS_STYLES[status]
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sparkline                                                          */
/* ------------------------------------------------------------------ */

export function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80
  const h = 28
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="opacity-80">
      <polyline
        fill="none"
        stroke={positive ? dk.accent : dk.danger}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */

export function StatCard({ metric }: { metric: StatMetric }) {
  const Icon = metric.icon
  const positive = metric.change >= 0

  return (
    <div
      data-dash-item
      className="flex flex-col rounded-xl border p-4 transition-colors hover:border-[rgba(197,160,89,0.28)]"
      style={{ borderColor: dk.panelBorder, background: panelGradientInline() }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className="flex size-9 items-center justify-center rounded-lg border"
          style={{ borderColor: dk.panelBorder, backgroundColor: "rgba(185, 108, 115, 0.10)" }}
        >
          <Icon className="size-4" style={{ color: dk.accent }} strokeWidth={1.6} />
        </div>
        <Sparkline data={metric.sparkline} positive={positive} />
      </div>
      <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: dk.onVar }}>
        {metric.label}
      </p>
      <p className={`${cormorant.className} mt-1 text-2xl leading-none`} style={{ color: dk.on }}>
        {metric.value}
      </p>
      <div className="mt-2 flex items-center gap-1">
        {positive ? (
          <ArrowUp className="size-3" style={{ color: dk.success }} strokeWidth={2.5} />
        ) : (
          <ArrowDown className="size-3" style={{ color: dk.danger }} strokeWidth={2.5} />
        )}
        <span
          className="text-[11px] font-semibold"
          style={{ color: positive ? dk.success : dk.danger }}
        >
          {positive ? "+" : ""}
          {metric.change}%
        </span>
      </div>
    </div>
  )
}

function panelGradientInline() {
  return `linear-gradient(135deg, ${dk.bgLeft} 0%, ${dk.bgCenter} 50%, ${dk.bgRight} 100%)`
}

/* ------------------------------------------------------------------ */
/*  Gold primary button                                                */
/* ------------------------------------------------------------------ */

export function GoldButton({
  children,
  icon: Icon,
  className,
  onClick,
}: {
  children: ReactNode
  icon?: DashIcon
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all hover:brightness-110",
        className,
      )}
      style={{ background: goldGradient, color: "#FFFFFF" }}
    >
      {Icon && <Icon className="size-4" strokeWidth={2} />}
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Icon action tile                                                   */
/* ------------------------------------------------------------------ */

export function ActionTile({
  label,
  icon: Icon,
  wide,
  as: Tag = "button",
}: {
  label: string
  icon: DashIcon
  wide?: boolean
  as?: "button" | "div"
}) {
  const className = clsx(
    "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all hover:bg-black/[0.03]",
    wide && "col-span-2 justify-center",
  )
  const style = { borderColor: dk.panelBorder, color: dk.onVar }

  const content = (
    <>
      <Icon className="size-4 shrink-0" style={{ color: dk.accent }} strokeWidth={1.6} />
      <span className="text-xs font-medium">{label}</span>
    </>
  )

  if (Tag === "div") {
    return (
      <div className={className} style={style}>
        {content}
      </div>
    )
  }

  return (
    <button type="button" className={className} style={style}>
      {content}
    </button>
  )
}

export { panelGradientInline as panelGradient }
