import type { ReactNode } from "react"
import DashboardSidebar from "@/components/Dashboard/sidebar"
import { dk, manrope, panelGradient } from "@/components/Dashboard/theme"

export const metadata = {
  title: "Admin · The Beau",
  description: "The Beau beauty commerce admin dashboard.",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${manrope.className} min-h-screen`}
      style={{ background: panelGradient, color: dk.on }}
    >
      <DashboardSidebar />
      <div className="lg:pl-[260px]">{children}</div>
    </div>
  )
}
