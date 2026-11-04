import { LAYOUT_SIZES, type LayoutSize } from '../types/match.ts'

export function isLayoutSize(value: unknown): value is LayoutSize {
  return LAYOUT_SIZES.some((size) => size === value)
}

export function suggestedLayout(matchCount: number): LayoutSize {
  if (matchCount <= 1) {
    return 1
  }
  if (matchCount === 2) {
    return 2
  }
  if (matchCount <= 4) {
    return 4
  }
  return 9
}

export function columnCount(layout: LayoutSize): number {
  if (layout === 1) {
    return 1
  }
  if (layout === 9) {
    return 3
  }
  return 2
}

export function rowCount(layout: LayoutSize): number {
  if (layout === 1) {
    return 1
  }
  if (layout === 2) {
    return 1
  }
  if (layout === 4) {
    return 2
  }
  return 3
}
