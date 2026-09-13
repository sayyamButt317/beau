"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { Header } from "@/components/navigation/Header"
import { CartDrawer } from "@/components/Client/commerce/CartDrawer"
import { QueryProvider } from "@/provider/QueryProvider"

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <QueryProvider>{children}</QueryProvider>
  }

  return (
    <QueryProvider>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <CartDrawer />
    </QueryProvider>
  )
}
