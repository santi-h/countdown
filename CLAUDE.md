# Countdown

A frontend-only, responsive countdown web app deployable as static files (e.g., GitHub Pages).

## Scope

- Frontend only. No backend, no server-side rendering, no API.
- Output is static assets suitable for GitHub Pages.
- Reads target timestamp from query param `t` (ISO 8601, e.g., `?t=2026-12-31T23:59:59Z`).
- Displays remaining years, days, hours, minutes, seconds, updating every second.
- Only shows units starting from the first non-zero unit (e.g., if under 1 hour, omit years/days/hours).
- Unit labels are pluralized based on value: use the singular form when the value is exactly 1 (e.g., "1 Day", not "1 Days"). This applies to the on-page units AND to the document title.
- Handles invalid timestamps with a friendly validation message.
- Handles expired timestamps with a completion message.
- Shows a small helper with an example clickable link. The example target is always computed at render time as the current browser time + 1 year + 12 days, so it is always in the future.
- The document title (`<title>` / `document.title`) reflects the current state:
  - Active countdown: `Countdown - <N> <unit>` where `<unit>` is the largest non-zero unit (e.g., `Countdown - 1 year`, `Countdown - 8 seconds`).
  - No target / invalid / complete: fall back to a sensible static title (e.g., `Countdown`).

## Tech stack

- Node v24.15.0 (pinned in `.node-version`).
- React + TypeScript.
- Webpack for bundling.
- No UI/CSS frameworks; plain CSS.

## Code style

- Max line length: 100 characters — applies to source code files (e.g., `.ts`, `.tsx`, `.js`, `.css`) where it aids readability. It does **not** apply to prose files like `CLAUDE.md`, `README.md`, or other Markdown, nor to generated/lockfiles, where arbitrary wrapping hurts readability. Apply the rule where it makes sense; skip it where it does not.
- `CLAUDE.md` itself is explicitly exempt: do not hard-wrap lines in this file. Let each bullet / paragraph be a single line and rely on editor soft-wrap.
- Prefer readability over clever abstractions.
- Avoid unnecessary dependencies.
- Keep project structure flat and simple.

## Commit messages

- Commit message subjects must start with a capitalized, present-tense verb (e.g., `Add ...`, `Fix ...`, `Update ...`, `Remove ...`, `Refactor ...`). Do not use past-tense ("Added"), gerunds ("Adding"), or lowercase ("add ...").
- Keep the subject short (≤72 chars) and imperative. Use the body for detail and rationale when needed.

## Build & deploy

- `npm run build` produces static output in `dist/`.
- `dist/` is deployable as-is to any static host (GitHub Pages, etc.).
- All asset paths must be relative so hosting under a subpath works.

## Non-goals

- No routing library, no state management library, no testing framework.
- No backend integration, analytics, or tracking.

## Maintaining this file

- Keep `CLAUDE.md` current. Whenever a new requirement, constraint, or durable decision comes up in a prompt or discussion, update this file so future sessions start with accurate guidance.
- Only record long-lived guidance here. Leave transient task notes out.
- Remove entries that become obsolete rather than letting them rot.
