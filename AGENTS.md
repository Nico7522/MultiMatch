# AGENTS.md

## Project overview

MultiMatch is a frontend web application for viewing multiple user-provided sports-match pages side by side, in a dashboard similar to a CCTV monitor wall.

The initial goal is a small, reliable MVP:
- Add a match by pasting its URL.
- Display each match in its own independent panel.
- Arrange panels in a responsive grid (1, 2, 4, or 9 panels where appropriate).
- Remove a match and switch a panel to fullscreen.
- Persist the user's match list and layout locally.

The app organizes and embeds pages supplied by the user. It does not provide, host, scrape, proxy, decrypt, or redistribute video streams.

## Technology choices

Use this stack unless the user explicitly requests a change:
- React
- Vite
- TypeScript
- Tailwind CSS for styling
- Browser LocalStorage for MVP persistence
- Native HTML elements and browser APIs where sufficient

Do not add a backend, database, authentication system, state-management library, routing library, or UI component library unless a concrete requirement justifies it.

## Core technical constraints

### Embedding match pages
- Treat each user-provided URL as an external page, not as a direct video stream.
- Use an iframe only for pages that are permitted to be embedded by their owners.
- Never attempt to bypass `X-Frame-Options`, Content Security Policy (`frame-ancestors`), DRM, authentication, paywalls, anti-bot measures, or other access controls.
- Do not build a proxy, scraper, browser automation workaround, header-spoofing mechanism, or stream extractor to defeat a site's restrictions.
- Explain clearly in the UI when a page cannot be embedded and provide an option to open the original URL in a new tab.
- Do not claim that an arbitrary URL will work. Some websites deliberately block iframe embedding.
- Do not assume that a page being visible in an iframe means its video player, cookies, login, audio, or playback controls will work.
- Use a restrictive iframe `sandbox` configuration only when compatible with the target site; do not add sandbox flags blindly because they can break legitimate embeds. Document any required permissions.
- Use `allow` permissions narrowly. Do not grant camera, microphone, geolocation, or other sensitive permissions unless explicitly required.
- Use `referrerPolicy="no-referrer"` only if compatible with the target service; do not silently alter behavior in ways that break legitimate sites.

### URL handling and safety
- Validate that submitted URLs are valid absolute HTTP or HTTPS URLs.
- Reject `javascript:`, `data:`, `file:`, and other non-HTTP(S) schemes.
- Trim whitespace and handle invalid input with a clear, accessible error message.
- Do not fetch arbitrary user-provided URLs from the frontend just to test them. Browser CORS and embedding restrictions make such checks unreliable.
- Do not render user-provided URL strings as HTML.
- Use safe link attributes when opening a URL in a new tab, including `rel="noopener noreferrer"`.

### Persistence
- Store only the minimum required data in LocalStorage, such as match IDs, URLs, optional user labels, and selected layout.
- Treat LocalStorage data as untrusted: validate and normalize it when loading.
- Handle malformed JSON, missing keys, and storage quota/security errors without crashing the app.
- Do not store passwords, session tokens, cookies, or other credentials.
- Do not promise cross-device synchronization; the MVP is local to the browser.

## Architecture and code quality

- Prefer small, focused, reusable React components.
- Use functional components and React hooks.
- Use TypeScript strict typing. Avoid `any`; use `unknown` and narrow types when necessary.
- Keep domain types separate from presentation where it improves clarity.
- Keep URL validation and LocalStorage logic in small utility modules rather than duplicating it in components.
- Keep components readable; avoid premature abstraction and unnecessary dependencies.
- Use stable IDs for match panels. Do not use array indexes as React keys for items that can be added, removed, or reordered.
- Keep each iframe independent. A failure in one panel must not break the other panels.
- Avoid unnecessary re-renders, but do not introduce memoization without a demonstrated need.
- Use CSS Grid for the match wall and ensure panels adapt to the available viewport.
- Preserve a usable layout on smaller screens; do not force a desktop-only fixed-width interface.

## UX and accessibility

- Use a clean, dark, low-distraction dashboard aesthetic.
- Make the number of visible panels and the selected layout understandable.
- Provide clear empty, loading, invalid-URL, and blocked-embedding states.
- Label icon-only buttons with accessible names and provide visible focus states.
- Support keyboard navigation and sensible heading structure.
- Ensure text and controls have sufficient contrast.
- Do not autoplay audio. Do not try to control playback inside third-party cross-origin iframes; the browser's same-origin policy prevents this in normal circumstances.
- Make it clear that fullscreen applies to a panel and provide an obvious way to exit.

## Development workflow

- Inspect the existing project structure before making changes.
- Follow the package manager and conventions already present in the repository. Do not introduce a second package manager or rewrite lockfiles unnecessarily.
- Prefer small, incremental changes.
- After implementation, run the relevant lint, type-check, test, and build scripts that exist in `package.json`.
- If a script is missing, do not invent a successful result; state which checks could not be run.
- Do not silently remove existing functionality or dependencies.
- Update documentation when setup steps, scripts, or user-facing behavior change.

## Definition of done for a feature

A feature is complete when:
1. It works for valid input and handles invalid input gracefully.
2. It does not bypass third-party website restrictions or access controls.
3. It remains usable with zero, one, and multiple match panels.
4. It is keyboard-accessible and responsive.
5. Persistence (if involved) handles invalid stored data safely.
6. Relevant project checks have been run and their results reported.
