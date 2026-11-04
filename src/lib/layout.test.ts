import { describe, expect, it } from 'vitest'
import { columnCount, isLayoutSize, rowCount, suggestedLayout } from './layout.ts'

describe('layout helpers', () => {
  it('recognizes allowed layout sizes', () => {
    expect(isLayoutSize(1)).toBe(true)
    expect(isLayoutSize(9)).toBe(true)
    expect(isLayoutSize(3)).toBe(false)
    expect(isLayoutSize('4')).toBe(false)
  })

  it('suggests a layout from the match count', () => {
    expect(suggestedLayout(0)).toBe(1)
    expect(suggestedLayout(2)).toBe(2)
    expect(suggestedLayout(3)).toBe(4)
    expect(suggestedLayout(8)).toBe(9)
  })

  it('maps layouts to grid columns and rows', () => {
    expect(columnCount(1)).toBe(1)
    expect(columnCount(4)).toBe(2)
    expect(columnCount(9)).toBe(3)
    expect(rowCount(2)).toBe(1)
    expect(rowCount(4)).toBe(2)
    expect(rowCount(9)).toBe(3)
  })
})
