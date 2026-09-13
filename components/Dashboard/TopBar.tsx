"use client"

import Link from "next/link"
import { Bell, Plus, Search } from "lucide-react"
import { ADMIN } from "./data"
import { useMountFade } from "./hooks/useGsap"
import { GoldButton } from "./ui"
import { cormorant, dk } from "./theme"

export default function DashboardTopBar() {
  const ref = useMountFade<HTMLElement>(0.1)

  return (
    <header
      ref={ref}
      className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between"
    >
      <div>
        <h1
          className={`${cormorant.className} text-2xl sm:text-3xl`}
          style={{ color: dk.on }}
        >
          Welcome back, {ADMIN.name}
        </h1>
        <p className="mt-1 text-sm" style={{ color: dk.onVar }}>
          Here&apos;s what&apos;s happening with The Beau today.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end xl:max-w-2xl">
        <div
          className="relative flex flex-1 items-center rounded-lg border px-3 py-2.5 backdrop-blur-md"
          style={{
            borderColor: dk.panelBorder,
            background: "#FFFFFF",
          }}
        >
          <Search
            className="size-4 shrink-0"
            style={{ color: dk.onVar }}
            strokeWidth={1.8}
          />
          <input
            type="search"
            placeholder="Search products, orders, customers..."
            className="ml-2 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
            style={{ color: dk.on }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-black/[0.03]"
            style={{ borderColor: dk.panelBorder, color: dk.accent }}
          >
            <Bell className="size-4" strokeWidth={1.6} />
            <span
              className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: dk.accent, color: "#FFFFFF" }}
            >
              3
            </span>
          </button>
          <Link href="/admin/products/new">
            <GoldButton icon={Plus}>Add Product</GoldButton>
          </Link>
        </div>
      </div>
    </header>
  )
}
