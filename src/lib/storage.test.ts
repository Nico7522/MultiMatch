import { describe, expect, it } from 'vitest'
import { DEFAULT_DASHBOARD, parseStoredDashboard, serializeDashboard } from './storage.ts'

describe('parseStoredDashboard', () => {
  it('parses a valid payload', () => {
    const raw = serializeDashboard({
      layout: 4,
      matches: [
        { id: 'a', url: 'https://example.com/one', label: 'Un' },
        { id: 'b', url: 'https://example.com/two', label: '' },
      ],
    })

    expect(parseStoredDashboard(raw)).toEqual({
      layout: 4,
      matches: [
        { id: 'a', url: 'https://example.com/one', label: 'Un' },
        { id: 'b', url: 'https://example.com/two', label: '' },
      ],
    })
  })

  it('returns null for malformed JSON', () => {
    expect(parseStoredDashboard('{')).toBeNull()
  })

  it('returns null when version or layout is invalid', () => {
    expect(parseStoredDashboard(JSON.stringify({ version: 2, matches: [], layout: 1 }))).toBeNull()
    expect(
      parseStoredDashboard(JSON.stringify({ version: 1, matches: [], layout: 3 })),
    ).toBeNull()
  })

  it('drops invalid matches and duplicate ids', () => {
    const raw = JSON.stringify({
      version: 1,
      layout: 2,
      matches: [
        { id: 'ok', url: 'https://example.com/ok', label: '  Ok  ' },
        { id: 'ok', url: 'https://example.com/dup' },
        { id: 'bad', url: 'javascript:alert(1)' },
        { url: 'https://example.com/missing-id' },
        null,
      ],
    })

    expect(parseStoredDashboard(raw)).toEqual({
      layout: 2,
      matches: [{ id: 'ok', url: 'https://example.com/ok', label: 'Ok' }],
    })
  })

  it('keeps the default dashboard shape stable', () => {
    expect(DEFAULT_DASHBOARD).toEqual({ matches: [], layout: 1 })
  })
})
