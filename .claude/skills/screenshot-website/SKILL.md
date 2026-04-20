---
name: screenshot-website
description: Take a full-page screenshot of any URL (localhost dev servers or remote sites) to a PNG file, then read the PNG back to visually audit layout, typography, and overflow issues that typechecks and tests can't catch. Use this whenever the user asks to "screenshot the page", "capture the dev server", "visually verify", "see what the page looks like", "grab a screenshot of localhost", take a mobile-viewport capture, or otherwise needs a rendered image of a URL. Also use proactively as a finishing step after non-trivial frontend changes when a dev server is running — a typecheck-clean page can still be visually broken, and a screenshot is the fastest way to catch it.
---

# Screenshot a website

The repo ships a Playwright-based screenshot script at `scripts/screenshot-page.ts`. This skill is a thin wrapper around it: call the script, then read the PNG back through the Read tool to audit it visually. Images are first-class — the Read tool surfaces them to you like any other file.

## When to reach for this

- The user asks to screenshot a page, capture localhost, visually check a layout, or grab a mobile view.
- You've just made non-trivial UI changes and a dev server is running — a quick screenshot catches broken layouts, overflow, missing tokens, or motion elements stuck invisible that typechecks won't flag.
- You need to compare before/after on a visual change.

Skip it when there's no dev server running and no remote URL to point at — say so and ask the user to start the server rather than guessing.

## First-time setup (per machine)

The script depends on the `playwright` npm package (already listed in `package.json`, so `bun install` covers it) **plus a Chromium browser binary**, which Playwright installs separately. Run this once per machine — it's idempotent and a no-op if already installed:

```bash
bunx playwright install chromium
```

The binary caches to `~/.cache/adpharm-landing-page-browsers` (the path the script sets via `PLAYWRIGHT_BROWSERS_PATH`). If you skip this step, the first screenshot attempt fails with a Playwright error complaining about a missing browser — the fix is always to run the command above.

If `bun install` hasn't been run in the repo yet, run that first. Don't start a dev server as part of setup (this repo's rules prohibit agents from running `bun run dev` / `task start`) — ask the user to start it if one isn't already up.

## Invocation

```bash
bun scripts/screenshot-page.ts <url> <output.png> [--viewport <WxH>]
```

Examples:

```bash
# Desktop capture of a localhost page
bun scripts/screenshot-page.ts http://localhost:3000/ /tmp/home.png

# Mobile viewport (iPhone 14 Pro dimensions)
bun scripts/screenshot-page.ts http://localhost:3000/pricing /tmp/pricing-mobile.png --viewport 390x844

# Remote site
bun scripts/screenshot-page.ts https://example.com /tmp/example.png
```

Defaults worth knowing:
- **Viewport:** 1440x900 at 2x device scale, full-page (captures below the fold).
- **Reduced motion:** the script sets `prefers-reduced-motion: reduce` so reveal-on-scroll animations render in their final state. Without this, a full-page screenshot of an animated site captures the hero correctly and leaves every section below at opacity:0.
- **Output format:** must end in `.png`, `.jpg`, `.jpeg`, or `.webp`.

## Repo-specific quirk: password-gated /products/*

Paths under `/products/` are behind a password middleware. The script auto-unlocks them using `PRODUCTS_MASTER_PASSWORD` from `.env.vercel` and then navigates to the target. You don't need to do anything special — just pass the real target URL.

If the password isn't set, the script warns and captures the unlock form instead of the target. That's the signal to populate `.env.vercel` or ask the user for the password.

## After capturing: read the PNG

Use the Read tool on the output path. Claude can see images. Scan for:
- Broken layout, horizontal overflow, elements bleeding off-screen
- Columns stacking when they should be side-by-side (or vice versa)
- Typography hierarchy missing — headline / subheadline / body not visually distinct
- Theme tokens not applied (light flashes in a dark design, wrong accent color, accent used as a field instead of as accent)
- Sticky nav missing or stuck visible when it should be hidden pre-scroll
- **Elements stuck invisible or counters reading 0.** Because the screenshot runs under reduced-motion, this isn't a layout bug — it's a specific motion target that isn't honoring `prefers-reduced-motion: reduce`. Fix the motion element's reduced-motion handling (CSS override, or JS checking `matchMedia` and snapping to the final value), not the layout.

Report findings concisely. If the image looks right, say so and move on.

## Common failure modes

- **`ECONNREFUSED` / `net::ERR_CONNECTION_REFUSED`** — dev server isn't running. Tell the user; don't start it yourself (per repo rules, the agent never runs `bun run dev` / `task start`).
- **Captured the unlock form instead of the page** — `.env.vercel` missing `PRODUCTS_MASTER_PASSWORD`, or the URL isn't a `/products/*` path that needs unlocking. Surface the warning the script printed.
- **Page looks blank or half-rendered** — the script waits for `networkidle` plus 1.5s of motion settle; if a site lazy-loads well past that, consider a custom wait, but default is almost always enough.
- **Script errors on `playwright` import or "browser not found"** — Chromium binary missing. Run the setup command from the top of this skill: `bunx playwright install chromium`. The package itself (`playwright` in `package.json`) is handled by `bun install`; the browser binary is a separate download.

## What this skill does not do

- It does not name or organize output files for you. Pick a path that makes sense for the task — `/tmp/<something>.png` is fine for throwaway captures; project-local paths are fine for ones the user will keep. If you're building an iterative workflow (multiple captures of the same page over time), the caller should pick a naming scheme (e.g., `build-01.png`, `build-02.png`) — this skill just takes the snapshot.
- It does not click, scroll, or interact beyond the one unlock-form case above. For interaction flows, write a dedicated Playwright script instead of extending this one.
