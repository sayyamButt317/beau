import { Cormorant_Garamond, Manrope } from "next/font/google"

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
})

/** Beau brand accent — muted rose, not jewellery gold */
export const goldGradient =
  "linear-gradient(135deg, #B96C73 0%, #D9A7A5 50%, #C8A995 100%)"

export const tk = {
  accent: "#B96C73",
  accentSoft: "#D9A7A5",
  accentMuted: "rgba(185, 108, 115, 0.14)",
  on: "#F7F4EF",
  onVar: "rgba(247, 244, 239, 0.72)",
  onFaint: "rgba(247, 244, 239, 0.45)",
  surfaceDeep: "#171414",
  borderStrong: "rgba(185, 108, 115, 0.35)",
} as const
