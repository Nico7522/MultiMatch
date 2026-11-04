import { useCallback, useEffect, useRef, useState } from 'react'
import { displayHost } from '../lib/url.ts'
import { type Match } from '../types/match.ts'

type MatchPanelProps = {
  match: Match
  onRemove: (id: string) => void
}

export function MatchPanel({ match, onRemove }: MatchPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const title = match.label || displayHost(match.url)

  const syncFullscreen = useCallback(() => {
    setIsFullscreen(document.fullscreenElement === panelRef.current)
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [syncFullscreen])

  async function toggleFullscreen() {
    const panel = panelRef.current
    if (!panel) {
      return
    }

    try {
      if (document.fullscreenElement === panel) {
        await document.exitFullscreen()
        return
      }
      await panel.requestFullscreen()
    } catch {
      // Fullscreen can be denied by the browser; the panel remains usable.
    }
  }

  return (
    <article
      ref={panelRef}
      className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950"
    >
      <header className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-2 py-1.5">
        <h2 className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-100" title={title}>
          {title}
        </h2>
        <a
          href={match.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Si le panneau reste vide, le site bloque probablement l’intégration."
          className="rounded px-2 py-1 text-xs font-medium text-emerald-300 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          Ouvrir
          <span className="sr-only">{` ${title} dans un nouvel onglet`}</span>
        </a>
        <button
          type="button"
          onClick={() => void toggleFullscreen()}
          className="rounded px-2 py-1 text-xs font-medium text-zinc-200 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          {isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
        </button>
        <button
          type="button"
          onClick={() => onRemove(match.id)}
          className="rounded px-2 py-1 text-xs font-medium text-red-300 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          Retirer
          <span className="sr-only">{` ${title}`}</span>
        </button>
      </header>
      <div className="min-h-0 flex-1 bg-black">
        <iframe
          title={`Page du match : ${title}`}
          src={match.url}
          className="h-full w-full border-0"
          allow="fullscreen; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </article>
  )
}
