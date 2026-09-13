import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { AppChrome } from "@/components/AppChrome"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "The Beau",
    template: "%s · The Beau",
  },
  description:
    "Immersive beauty commerce — editorial makeup, tactile cosmetics, cinematic product discovery.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        cormorant.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  )
}
