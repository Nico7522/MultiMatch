import { AddMatchForm } from './components/AddMatchForm.tsx'
import { LayoutPicker } from './components/LayoutPicker.tsx'
import { MatchWall } from './components/MatchWall.tsx'
import { usePersistedDashboard } from './hooks/usePersistedDashboard.ts'

function App() {
  const { matches, layout, addMatch, removeMatch, setLayout } = usePersistedDashboard()
  const hiddenCount = Math.max(0, matches.length - layout)

  return (
    <div className="flex h-full min-h-0 flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="shrink-0">
            <h1 className="text-lg font-semibold tracking-tight text-zinc-50">MultiMatch</h1>
            <p className="mt-0.5 max-w-xl text-xs text-zinc-400">
              Mur de matchs à partir des pages que vous fournissez. L’intégration n’est pas
              garantie : elle dépend des autorisations du site d’origine. Les données restent
              dans ce navigateur.
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-start">
            <AddMatchForm onAdd={addMatch} />
            <LayoutPicker value={layout} onChange={setLayout} />
          </div>
        </div>
        {hiddenCount > 0 ? (
          <p className="mt-3 text-xs text-amber-200">
            {hiddenCount === 1
              ? '1 match n’est pas visible avec cette disposition. Choisissez une grille plus grande pour l’afficher.'
              : `${hiddenCount} matchs ne sont pas visibles avec cette disposition. Choisissez une grille plus grande pour les afficher.`}
          </p>
        ) : null}
      </header>
      <main className="min-h-0 flex-1 p-2 sm:p-3">
        <MatchWall matches={matches} layout={layout} onRemove={removeMatch} />
      </main>
    </div>
  )
}

export default App
