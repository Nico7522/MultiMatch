import { useEffect, useState } from 'react'
import { createId } from '../lib/ids.ts'
import { suggestedLayout } from '../lib/layout.ts'
import { loadDashboard, saveDashboard } from '../lib/storage.ts'
import { type DashboardState, type LayoutSize, type Match } from '../types/match.ts'

export function usePersistedDashboard() {
  const [state, setState] = useState<DashboardState>(loadDashboard)

  useEffect(() => {
    saveDashboard(state)
  }, [state])

  function addMatch(url: string, label: string) {
    const match: Match = {
      id: createId(),
      url,
      label: label.trim(),
    }

    setState((current) => {
      const matches = [...current.matches, match]
      const nextLayout =
        matches.length > current.layout ? suggestedLayout(matches.length) : current.layout

      return {
        matches,
        layout: nextLayout,
      }
    })
  }

  function removeMatch(id: string) {
    setState((current) => ({
      ...current,
      matches: current.matches.filter((match) => match.id !== id),
    }))
  }

  function setLayout(layout: LayoutSize) {
    setState((current) => ({
      ...current,
      layout,
    }))
  }

  return {
    matches: state.matches,
    layout: state.layout,
    addMatch,
    removeMatch,
    setLayout,
  }
}
