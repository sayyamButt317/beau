"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { clsx } from "clsx"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ADMIN, NAV_GROUPS } from "./data"
import { cormorant, dk } from "./theme"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = (
    <div className="flex h-full flex-col">
      <SidebarBrand />
      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p
              className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: dk.onFaint }}
            >
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                        active
                          ? "border-l-2"
                          : "border-l-2 border-transparent hover:bg-black/[0.03]",
                      )}
                      style={{
                        color: active ? dk.accent : dk.onVar,
                        backgroundColor: active ? "rgba(185, 108, 115, 0.10)" : undefined,
                        borderLeftColor: active ? dk.accent : "transparent",
                      }}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={1.6} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <SidebarUser />
    </div>
  )

  return (
    <>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r p-5 lg:flex"
        style={{ borderColor: dk.panelBorder, backgroundColor: dk.sidebar }}
      >
        {nav}
      </aside>

      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-lg border"
              style={{ borderColor: dk.panelBorder, color: dk.accent, background: dk.panel }}
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] border-r p-5"
            style={{ borderColor: dk.panelBorder, backgroundColor: dk.sidebar, color: dk.on }}
          >
            <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
            {nav}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function SidebarBrand() {
  return (
    <Link href="/admin/overview" className="flex items-center gap-3 px-2">
      <div
        className="flex size-10 items-center justify-center rounded-full border"
        style={{ borderColor: dk.borderStrong, background: "rgba(185,108,115,0.12)" }}
      >
        <span className={`${cormorant.className} text-lg font-semibold`} style={{ color: dk.accent }}>
          B
        </span>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: dk.on }}>
          The Beau
        </p>
        <p className="text-[10px]" style={{ color: dk.onFaint }}>
          Beauty Admin
        </p>
      </div>
    </Link>
  )
}

function SidebarUser() {
  return (
    <div
      className="mt-4 flex items-center gap-3 rounded-xl border p-3"
      style={{ borderColor: dk.panelBorder, background: "#FFFFFF" }}
    >
      <div className="relative size-9 shrink-0 overflow-hidden rounded-full border" style={{ borderColor: dk.borderStrong }}>
        <Image src={ADMIN.avatar} alt={ADMIN.name} fill className="object-cover" sizes="36px" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium" style={{ color: dk.on }}>
          {ADMIN.name}
        </p>
        <p className="truncate text-[11px]" style={{ color: dk.onVar }}>
          {ADMIN.role}
        </p>
      </div>
    </div>
  )
}
