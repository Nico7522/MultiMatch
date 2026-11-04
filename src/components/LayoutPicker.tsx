import { LAYOUT_SIZES, type LayoutSize } from '../types/match.ts'

type LayoutPickerProps = {
  value: LayoutSize
  onChange: (layout: LayoutSize) => void
}

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  return (
    <fieldset className="shrink-0">
      <legend className="mb-1 text-xs font-medium text-zinc-300">Disposition</legend>
      <div className="flex rounded-md border border-zinc-700 p-0.5">
        {LAYOUT_SIZES.map((size) => {
          const selected = size === value
          return (
            <button
              key={size}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(size)}
              className={`min-w-10 rounded px-2.5 py-1.5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                selected
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {size}
              <span className="sr-only">
                {` panneau${size > 1 ? 'x' : ''}`}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
