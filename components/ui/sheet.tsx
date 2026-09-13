"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/cn"

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const value = isControlled ? open : internalOpen
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <SheetContext.Provider value={{ open: value, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>
}) {
  const ctx = React.useContext(SheetContext)
  if (!ctx) return children

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        ctx.setOpen(true)
      },
    })
  }

  return (
    <button type="button" onClick={() => ctx.setOpen(true)}>
      {children}
    </button>
  )
}

export function SheetContent({
  side = "left",
  className,
  style,
  children,
}: {
  side?: "left" | "right"
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const ctx = React.useContext(SheetContext)
  if (!ctx?.open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/50"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        className={cn(
          "absolute inset-y-0 flex w-full max-w-xs flex-col shadow-lg",
          side === "left" ? "left-0" : "right-0",
          className,
        )}
        style={style}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md opacity-70 hover:opacity-100"
          onClick={() => ctx.setOpen(false)}
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

export function SheetTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <h2 className={className}>{children}</h2>
}
