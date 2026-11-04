export const LAYOUT_SIZES = [1, 2, 4, 9] as const

export type LayoutSize = (typeof LAYOUT_SIZES)[number]

export type Match = {
  id: string
  url: string
  label: string
}

export type DashboardState = {
  matches: Match[]
  layout: LayoutSize
}
