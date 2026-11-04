import { type DashboardState, type Match } from '../types/match.ts'
import { isLayoutSize } from './layout.ts'
import { validateMatchUrl } from './url.ts'

export const STORAGE_KEY = 'multimatch.dashboard.v1'

export const DEFAULT_DASHBOARD: DashboardState = {
  matches: [],
  layout: 1,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseMatch(value: unknown): Match | null {
  if (!isRecord(value)) {
    return null
  }

  if (typeof value.id !== 'string' || value.id.trim().length === 0) {
    return null
  }

  if (typeof value.url !== 'string') {
    return null
  }

  const urlResult = validateMatchUrl(value.url)
  if (!urlResult.ok) {
    return null
  }

  const label = typeof value.label === 'string' ? value.label.trim() : ''

  return {
    id: value.id.trim(),
    url: urlResult.url,
    label,
  }
}

export function parseStoredDashboard(raw: string): DashboardState | null {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }

  if (!isRecord(data) || data.version !== 1) {
    return null
  }

  if (!Array.isArray(data.matches) || !isLayoutSize(data.layout)) {
    return null
  }

  const seenIds = new Set<string>()
  const matches: Match[] = []

  for (const item of data.matches) {
    const match = parseMatch(item)
    if (!match || seenIds.has(match.id)) {
      continue
    }
    seenIds.add(match.id)
    matches.push(match)
  }

  return {
    matches,
    layout: data.layout,
  }
}

export function serializeDashboard(state: DashboardState): string {
  return JSON.stringify({
    version: 1,
    matches: state.matches,
    layout: state.layout,
  })
}

export function loadDashboard(): DashboardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_DASHBOARD
    }
    return parseStoredDashboard(raw) ?? DEFAULT_DASHBOARD
  } catch {
    return DEFAULT_DASHBOARD
  }
}

export function saveDashboard(state: DashboardState): void {
  try {
    localStorage.setItem(STORAGE_KEY, serializeDashboard(state))
  } catch {
    // Quota, private mode, or disabled storage should not crash the app.
  }
}
