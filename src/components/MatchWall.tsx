import { columnCount, rowCount } from '../lib/layout.ts'
import { type LayoutSize, type Match } from '../types/match.ts'
import { MatchPanel } from './MatchPanel.tsx'

type MatchWallProps = {
  matches: Match[]
  layout: LayoutSize
  onRemove: (id: string) => void
}

export function MatchWall({ matches, layout, onRemove }: MatchWallProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/60 px-6 text-center">
        <div className="max-w-md">
          <h2 className="text-lg font-medium text-zinc-100">Aucun match pour le moment</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Collez l’URL d’une page de match. MultiMatch l’affiche dans un iframe seulement
            si le site d’origine autorise l’intégration. Beaucoup de sites de streaming la
            bloquent volontairement.
          </p>
        </div>
      </div>
    )
  }

  const columns = columnCount(layout)
  const rows = rowCount(layout)

  return (
    <div
      className="grid h-full min-h-0 gap-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {matches.slice(0, layout).map((match) => (
        <MatchPanel key={match.id} match={match} onRemove={onRemove} />
      ))}
    </div>
  )
}
