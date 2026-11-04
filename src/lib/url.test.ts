import { describe, expect, it } from 'vitest'
import { displayHost, validateMatchUrl } from './url.ts'

describe('validateMatchUrl', () => {
  it('accepts an absolute https URL and trims whitespace', () => {
    const result = validateMatchUrl('  https://example.com/match  ')
    expect(result).toEqual({ ok: true, url: 'https://example.com/match' })
  })

  it('accepts an absolute http URL', () => {
    const result = validateMatchUrl('http://localhost:5173/page')
    expect(result.ok).toBe(true)
  })

  it('rejects an empty value', () => {
    const result = validateMatchUrl('   ')
    expect(result.ok).toBe(false)
  })

  it('rejects javascript URLs', () => {
    const result = validateMatchUrl('javascript:alert(1)')
    expect(result).toEqual({
      ok: false,
      error: 'Seules les URL http et https sont acceptées.',
    })
  })

  it('rejects data URLs', () => {
    const result = validateMatchUrl('data:text/html,hello')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toContain('http et https')
    }
  })

  it('rejects file URLs', () => {
    const result = validateMatchUrl('file:///tmp/match.html')
    expect(result.ok).toBe(false)
  })

  it('rejects relative URLs', () => {
    const result = validateMatchUrl('/match')
    expect(result.ok).toBe(false)
  })
})

describe('displayHost', () => {
  it('returns the hostname of a valid URL', () => {
    expect(displayHost('https://watch.example.com/live')).toBe('watch.example.com')
  })
})
