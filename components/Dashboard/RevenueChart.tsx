"use client"

import { useMemo, useRef } from "react"
import { ChevronDown } from "lucide-react"
import type { ChartPoint } from "./types"
import { dk } from "./theme"
import { usePathDraw } from "./hooks/useGsap"

interface RevenueChartProps {
  data: ChartPoint[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const { linePath, areaPath } = useMemo(() => buildPaths(data), [data])
  usePathDraw(pathRef, 0.4)

  const w = 100
  const h = 60

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dk.accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor={dk.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[15, 30, 45].map((y) => (
          <line key={y} x1="0" y1={y} x2={w} y2={y} stroke={dk.panelBorder} strokeWidth="0.3" />
        ))}
        <path d={areaPath} fill="url(#revenue-fill)" />
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke={dk.accent}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className="absolute right-0 top-2 rounded-md border px-2 py-1 text-[10px]"
        style={{ borderColor: dk.panelBorder, color: dk.onVar, background: dk.panel }}
      >
        30 Jun · PKR 12.45M
      </div>
      <div className="mt-2 flex justify-between text-[10px]" style={{ color: dk.onFaint }}>
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  )
}

function buildPaths(data: ChartPoint[]) {
  const w = 100
  const h = 60
  const pad = 6
  const maxVal = Math.max(...data.map((d) => d.value))
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - pad - (d.value / maxVal) * (h - pad * 2),
  }))
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`
  return { linePath, areaPath }
}

export function ChartFilter() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px]"
      style={{ borderColor: dk.panelBorder, color: dk.onVar }}
    >
      This Month
      <ChevronDown className="size-3.5" strokeWidth={2} />
    </button>
  )
}
