"use client"

import Image from "next/image"
import {
  Box,
  CheckCircle2,
  MessageSquare,
  Package,
  Pencil,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react"
import { StatusBadge } from "."
import { cormorant, dk, goldGradient } from "../theme"
import type {
  FulfillmentStatus,
  Order,
  OrderLineItem,
  OrderTab,
} from "../types"

/* ------------------------------------------------------------------ */
/*  Order tab bar                                                      */
/* ------------------------------------------------------------------ */

export function OrderTabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { label: string; value: OrderTab }[]
  active: OrderTab
  onChange: (tab: OrderTab) => void
}) {
  return (
    <div
      className="flex gap-1 overflow-x-auto border-b px-4"
      style={{ borderColor: dk.panelBorder }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className="relative shrink-0 px-4 py-3 text-xs font-medium transition-colors"
            style={{ color: isActive ? dk.accent : dk.onVar }}
          >
            {tab.label}
            {isActive && (
              <span
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full"
                style={{ background: dk.accent }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Fulfillment cell                                                   */
/* ------------------------------------------------------------------ */

const FULFILLMENT_META: Record<
  FulfillmentStatus,
  { label: string; icon: typeof Box; color: string }
> = {
  unfulfilled: { label: "Unfulfilled", icon: Package, color: dk.muted },
  packing: { label: "Packing", icon: Box, color: dk.accent },
  shipped: { label: "Shipped", icon: Truck, color: dk.purple },
  delivered: { label: "Delivered", icon: CheckCircle2, color: dk.success },
  cancelled: { label: "Cancelled", icon: X, color: dk.danger },
}

export function FulfillmentCell({ status }: { status: FulfillmentStatus }) {
  const meta = FULFILLMENT_META[status]
  const Icon = meta.icon
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="size-3.5 shrink-0" style={{ color: meta.color }} strokeWidth={1.8} />
      <span className="text-xs" style={{ color: dk.onVar }}>
        {meta.label}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Order line items list                                              */
/* ------------------------------------------------------------------ */

export function OrderItemsList({ items }: { items: OrderLineItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <div
            className="relative size-12 shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: dk.panelBorder, backgroundColor: "#EFE8DF" }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium" style={{ color: dk.on }}>
              {item.name}
            </p>
            <p className="text-[10px]" style={{ color: dk.onFaint }}>
              {item.sku} · Qty {item.quantity}
            </p>
          </div>
          <p className="shrink-0 text-xs font-medium" style={{ color: dk.on }}>
            {item.price}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Order detail panel                                                 */
/* ------------------------------------------------------------------ */

function DetailSection({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="border-b px-5 py-4" style={{ borderColor: dk.panelBorder }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: dk.onVar }}>
          {title}
        </h4>
        {action}
      </div>
      {children}
    </div>
  )
}

export function OrderDetailPanel({
  order,
  onClose,
}: {
  order: Order | null
  onClose?: () => void
}) {
  if (!order) {
    return (
      <aside
        className="hidden w-[380px] shrink-0 flex-col items-center justify-center rounded-xl border xl:flex"
        style={{ borderColor: dk.panelBorder, background: dk.panel }}
      >
        <Package className="mb-3 size-10 opacity-30" style={{ color: dk.accent }} />
        <p className="text-sm" style={{ color: dk.onVar }}>
          Select an order to view details
        </p>
      </aside>
    )
  }

  const addr = order.shippingAddress

  return (
    <aside
      className="flex w-full shrink-0 flex-col overflow-hidden rounded-xl border xl:w-[380px] xl:max-h-[calc(100vh-12rem)]"
      style={{ borderColor: dk.borderStrong, background: dk.panel }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: dk.panelBorder }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`${cormorant.className} text-xl`} style={{ color: dk.on }}>
                {order.orderNumber}
              </h3>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-1 text-xs" style={{ color: dk.onVar }}>
              {order.placedAt} · {order.placedAtTime}
            </p>
            <p className="mt-0.5 text-[11px]" style={{ color: dk.onFaint }}>
              {order.source}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              aria-label="Close order details"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04] xl:hidden"
              style={{ borderColor: dk.panelBorder, color: dk.onVar }}
            >
              <X className="size-4" strokeWidth={1.8} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DetailSection title="Customer">
          <div className="flex items-start gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: dk.borderStrong, background: "rgba(197,160,89,0.1)" }}
            >
              <User className="size-4" style={{ color: dk.accent }} strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium" style={{ color: dk.on }}>
                {order.customer.name}
              </p>
              <p className="text-xs" style={{ color: dk.onVar }}>
                {order.customer.email}
              </p>
              <p className="text-xs" style={{ color: dk.onVar }}>
                {order.customer.phone}
              </p>
            </div>
            <div className="flex gap-1">
              <IconBtn label="View customer" icon={User} />
              <IconBtn label="Message customer" icon={MessageSquare} />
            </div>
          </div>
        </DetailSection>

        <DetailSection
          title="Shipping Address"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide transition-colors hover:opacity-80"
              style={{ color: dk.accent }}
            >
              <Pencil className="size-3" strokeWidth={1.8} />
              Edit
            </button>
          }
        >
          <p className="text-xs leading-relaxed" style={{ color: dk.onVar }}>
            {addr.line1}
            {addr.line2 && (
              <>
                <br />
                {addr.line2}
              </>
            )}
            <br />
            {addr.city}
            <br />
            {addr.country}
          </p>
        </DetailSection>

        <DetailSection title="Order Summary">
          <div className="space-y-2 text-xs">
            <SummaryRow label="Subtotal" value={order.summary.subtotal} />
            <SummaryRow label="Shipping" value={order.summary.shipping} />
            <SummaryRow label="Tax" value={order.summary.tax} />
            <div
              className="flex items-center justify-between border-t pt-2"
              style={{ borderColor: dk.panelBorder }}
            >
              <span className="font-semibold" style={{ color: dk.on }}>
                Total
              </span>
              <span className={`${cormorant.className} text-lg`} style={{ color: dk.accent }}>
                {order.summary.total}
              </span>
            </div>
          </div>
        </DetailSection>

        <DetailSection title="Payment Info">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: dk.onVar }}>
                Status
              </span>
              <StatusBadge status={order.payment.status} />
            </div>
            <InfoRow label="Method" value={order.payment.method} />
            <InfoRow label="Transaction ID" value={order.payment.transactionId} mono />
            <InfoRow label="Payment Date" value={order.payment.paidAt} />
          </div>
        </DetailSection>

        <DetailSection title="Order Items">
          <OrderItemsList items={order.items} />
        </DetailSection>
      </div>

      {order.status !== "cancelled" && order.status !== "refunded" && (
        <div
          className="flex flex-col gap-2 border-t p-4"
          style={{ borderColor: dk.panelBorder }}
        >
          {order.status === "processing" && (
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all hover:brightness-110"
              style={{ background: goldGradient, color: "#FFFFFF" }}
            >
              <Truck className="size-4" strokeWidth={2} />
              Mark as Shipped
            </button>
          )}
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-black/[0.03]"
            style={{ borderColor: dk.danger, color: dk.danger }}
          >
            <Trash2 className="size-3.5" strokeWidth={1.8} />
            Cancel Order
          </button>
        </div>
      )}
    </aside>
  )
}

function IconBtn({
  label,
  icon: Icon,
}: {
  label: string
  icon: typeof User
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04]"
      style={{ borderColor: dk.panelBorder, color: dk.accent }}
    >
      <Icon className="size-3.5" strokeWidth={1.8} />
    </button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ color: dk.onVar }}>{label}</span>
      <span style={{ color: dk.on }}>{value}</span>
    </div>
  )
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-xs" style={{ color: dk.onVar }}>
        {label}
      </span>
      <span
        className={`text-right text-xs ${mono ? "font-mono" : ""}`}
        style={{ color: dk.on }}
      >
        {value}
      </span>
    </div>
  )
}

export function PaymentCell({
  method,
  status,
}: {
  method: string
  status: Order["payment"]["status"]
}) {
  return (
    <div>
      <StatusBadge status={status} />
      <p className="mt-1 text-[10px]" style={{ color: dk.onFaint }}>
        {method}
      </p>
    </div>
  )
}
