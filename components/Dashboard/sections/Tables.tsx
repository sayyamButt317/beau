"use client"

import Image from "next/image"
import { Eye, Pencil } from "lucide-react"
import type { BestSeller, OrderRow, ProductRow } from "../types"
import { Panel, StatusBadge } from "../ui"
import { dk } from "../theme"

export function BestSellingList({ items }: { items: BestSeller[] }) {
  return (
    <Panel title="Best Selling Products">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} data-dash-item className="flex items-center gap-3">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg" style={{ backgroundColor: "#EFE8DF" }}>
              <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="44px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" style={{ color: dk.on }}>
                {item.name}
              </p>
              <p className="text-xs" style={{ color: dk.onVar }}>
                {item.price}
              </p>
            </div>
            <span className="text-xs font-semibold" style={{ color: dk.accent }}>
              {item.sold} sold
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function LatestProductsTable({ products }: { products: ProductRow[] }) {
  return (
    <Panel title="Latest Products" noPadding>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr
              className="border-b text-[10px] uppercase tracking-wider"
              style={{ borderColor: dk.panelBorder, color: dk.onVar }}
            >
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">SKU</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-3 py-3 font-medium">Category</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                data-dash-item
                className="border-b transition-colors hover:bg-white/[0.02]"
                style={{ borderColor: dk.panelBorder }}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-md" style={{ backgroundColor: "#EFE8DF" }}>
                      <Image src={p.image} alt={p.name} fill className="object-contain p-0.5" sizes="36px" />
                    </div>
                    <span className="font-medium" style={{ color: dk.on }}>
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
                  {p.sku}
                </td>
                <td className="px-3 py-3 text-xs" style={{ color: dk.on }}>
                  {p.price}
                </td>
                <td className="px-3 py-3">
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: p.stock === 0 ? dk.danger : p.stock <= 3 ? dk.warning : dk.success,
                    }}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-3 py-3 text-xs" style={{ color: dk.onVar }}>
                  {p.category}
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <IconBtn icon={Eye} label="View" />
                    <IconBtn icon={Pencil} label="Edit" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="flex items-center justify-center gap-1 border-t px-5 py-3"
        style={{ borderColor: dk.panelBorder }}
      >
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            type="button"
            className="flex size-7 items-center justify-center rounded-md text-xs transition-colors"
            style={{
              backgroundColor: n === 1 ? "rgba(197,160,89,0.15)" : "transparent",
              color: n === 1 ? dk.accent : dk.onVar,
            }}
          >
            {n}
          </button>
        ))}
        <span className="px-1 text-xs" style={{ color: dk.onFaint }}>
          ...
        </span>
      </div>
    </Panel>
  )
}

export function RecentOrdersList({ orders }: { orders: OrderRow[] }) {
  return (
    <Panel title="Recent Orders">
      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order.id}
            data-dash-item
            className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5"
            style={{ borderColor: dk.panelBorder }}
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold" style={{ color: dk.accent }}>
                {order.id}
              </p>
              <p className="truncate text-sm" style={{ color: dk.on }}>
                {order.customer}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: dk.on }}>
                {order.amount}
              </p>
              <div className="mt-1">
                <StatusBadge status={order.status} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function IconBtn({ icon: Icon, label }: { icon: typeof Eye; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04]"
      style={{ borderColor: dk.panelBorder, color: dk.onVar }}
    >
      <Icon className="size-3.5" strokeWidth={1.8} />
    </button>
  )
}
