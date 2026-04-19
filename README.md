# Countdown

A small, responsive countdown web app. Point it at a target timestamp via the `t` query parameter, and it renders a live countdown — years, days, hours, minutes, and seconds — that ticks every second.

Only the largest relevant units are shown: if less than an hour remains, years / days / hours are hidden and the display starts at minutes. When the target is reached, the page shows a completion message. Invalid timestamps show a friendly validation message instead of breaking silently.

The app is frontend-only and ships as a tiny bundle of static files — no backend, no database, no server-side rendering. Anywhere that can serve static HTML/JS (GitHub Pages, Netlify, S3, a plain file server) can host it.

## Example

Open the app with a target timestamp like:

```
https://your-host.example.com/?t=2026-12-31T23:59:59Z
```

The landing page also shows a "Try it" link with a dynamically generated example (current time + 1 year + 12 days), so it always points to a valid future moment.

## Development intent

**This is an AI-coded application.** The project is an experiment in building and maintaining a codebase entirely through AI collaboration.

- No manual editing of source files is allowed. All changes must be produced by an AI coding assistant acting on human instructions.
- Every pull request must include the full set of prompts used to produce the changes in that PR, so the human intent behind each change is auditable and reproducible.
- `CLAUDE.md` carries the long-lived project guidance that the AI should respect across sessions. Keep it up to date as the source of truth for project conventions and requirements.

## Requirements

- [Node](https://nodejs.org/) v24.15.0 (pinned in `.node-version` — use `nvm`, `fnm`, or `asdf` to match).
- npm (ships with Node).

## Getting started

Clone the repo and install dependencies:

```bash
git clone git@github.com:santi-h/countdown.git
cd countdown
npm install
```

## Running locally

Start the webpack dev server with hot reload:

```bash
npm start
```

This opens the app at [http://localhost:3000](http://localhost:3000). Append `?t=<ISO-8601 timestamp>` to the URL to see the countdown, for example: `http://localhost:3000/?t=2026-12-31T23:59:59Z`.

## Testing manually

There is no automated test suite (by design — see `CLAUDE.md` non-goals). Verify changes by exercising the relevant cases in the browser:

- **Happy path:** a future timestamp renders a live countdown that updates every second.
- **Unit trimming:** a target under an hour away hides the years / days / hours units.
- **Singular labels:** when a unit's value is exactly `1`, the label is singular (e.g., `1 Day`).
- **Missing param:** visiting `/` with no `t` shows the "add a target timestamp" prompt.
- **Invalid param:** visiting `/?t=not-a-date` shows the validation error.
- **Expired target:** a past timestamp shows the "Countdown complete." message.
- **Example link:** the "Try it" link always points to a timestamp in the future and navigates to a working countdown when clicked.

## Building

Produce the static production bundle in `dist/`:

```bash
npm run build
```

The output is fully self-contained — an `index.html` plus a hashed JS bundle — and uses relative asset paths so it can be hosted at any URL depth.

## Deploying

Because the build is just static files, deployment is a file copy. For GitHub Pages:

1. Run `npm run build`.
2. Commit and push the contents of `dist/` to the branch/path your Pages site is configured to serve (commonly `gh-pages`, or `docs/` on `main`).

For other static hosts (Netlify, Vercel, S3, etc.), upload the contents of `dist/` as-is.

## License

[MIT](LICENSE) © 2026 Santiago H
