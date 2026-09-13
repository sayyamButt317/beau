import {
  goldGradient,
  manrope,
  cormorant,
} from "@/components/Landing/theme"

export { manrope, cormorant, goldGradient }

/** Dashboard tokens — The Beau light admin (paper / ink / rose) */
export const dk = {
  accent: "#B96C73",
  accentSoft: "#D9A7A5",
  accentMuted: "rgba(185, 108, 115, 0.12)",
  on: "#171414",
  onVar: "#3A3534",
  onFaint: "rgba(23, 20, 20, 0.45)",
  surfaceDeep: "#171414",
  borderStrong: "rgba(23, 20, 20, 0.16)",
  bg: "#FFFFFF",
  bgLeft: "#FFFFFF",
  bgCenter: "#F7F4EF",
  bgRight: "#FFFFFF",
  sidebar: "#FFFFFF",
  panel: "#FFFFFF",
  panelBorder: "rgba(23, 20, 20, 0.12)",
  panelHover: "rgba(185, 108, 115, 0.06)",
  inputBg: "#FFFFFF",
  success: "#16a34a",
  successMuted: "rgba(22, 163, 74, 0.12)",
  warning: "#d97706",
  warningMuted: "rgba(217, 119, 6, 0.12)",
  danger: "#dc2626",
  dangerMuted: "rgba(220, 38, 38, 0.12)",
  info: "#2563eb",
  infoMuted: "rgba(37, 99, 235, 0.12)",
  purple: "#7c3aed",
  purpleMuted: "rgba(124, 58, 237, 0.12)",
  muted: "#6b7280",
} as const

export const panelGradient = `linear-gradient(180deg, ${dk.bg} 0%, ${dk.bgCenter} 100%)`
