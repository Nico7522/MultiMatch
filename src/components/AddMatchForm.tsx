import { useId, useState, type FormEvent } from 'react'
import { validateMatchUrl } from '../lib/url.ts'

type AddMatchFormProps = {
  onAdd: (url: string, label: string) => void
}

export function AddMatchForm({ onAdd }: AddMatchFormProps) {
  const urlId = useId()
  const labelId = useId()
  const errorId = useId()
  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = validateMatchUrl(url)
    if (!result.ok) {
      setError(result.error)
      return
    }

    onAdd(result.url, label)
    setUrl('')
    setLabel('')
    setError(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-1 flex-col gap-2"
      noValidate
    >
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
        <label htmlFor={urlId} className="mb-1 block text-xs font-medium text-zinc-300">
          URL du match
        </label>
          <input
            id={urlId}
            type="url"
            name="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://exemple.com/match"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              if (error) {
                setError(null)
              }
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          />
        </div>
        <div className="w-full min-w-0 lg:w-56">
          <label htmlFor={labelId} className="mb-1 block text-xs font-medium text-zinc-300">
            Libellé (optionnel)
          </label>
          <input
            id={labelId}
            type="text"
            name="label"
            maxLength={80}
            placeholder="Finale, Canal 1…"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          Ajouter
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </form>
  )
}
