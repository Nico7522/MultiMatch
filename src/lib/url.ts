export type UrlValidationResult =
  | { ok: true; url: string }
  | { ok: false; error: string }

export function validateMatchUrl(input: string): UrlValidationResult {
  const trimmed = input.trim()

  if (trimmed.length === 0) {
    return { ok: false, error: 'Saisissez l’URL d’une page de match.' }
  }

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    return {
      ok: false,
      error: 'Saisissez une URL http ou https valide (exemple : https://exemple.com/match).',
    }
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      ok: false,
      error: 'Seules les URL http et https sont acceptées.',
    }
  }

  if (!parsed.hostname) {
    return {
      ok: false,
      error: 'Saisissez une URL http ou https valide (exemple : https://exemple.com/match).',
    }
  }

  if (!trimmed.includes('jack29')) {
    return {
      ok: false,
      error: 'Le lien doit contenir « jack29 ».',
    }
  }

  return { ok: true, url: parsed.href }
}

export function displayHost(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}
