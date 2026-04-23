---
name: screenshot-website
description: Take a full-page screenshot of any URL (localhost dev servers or remote sites) to a PNG file, then read the PNG back to visually audit layout, typography, and overflow issues that typechecks and tests can't catch. Use this whenever the user asks to "screenshot the page", "capture the dev server", "visually verify", "see what the page looks like", "grab a screenshot of localhost", take a mobile-viewport capture, or otherwise needs a rendered image of a URL. Also use proactively as a finishing step after non-trivial frontend changes when a dev server is running — a typecheck-clean page can still be visually broken, and a screenshot is the fastest way to catch it.
---

# Screenshot a website

Use the script bundled with this skill. Don't write your own — the bundled one already sets `prefers-reduced-motion: reduce` (so below-the-fold sections aren't stuck at opacity:0), uses a sensible viewport, waits for networkidle, and caps output at 1900px so images stay under Anthropic's 2000px many-image limit.

## Do this

```bash
bun .claude/skills/screenshot-website/scripts/screenshot.ts <url> <output.png>
```

Figure out the port from the user's terminal or `curl -s http://localhost:PORT/ -o /dev/null -w "%{http_code}\n"`. Common ports: Next.js :3000, Astro :4321, Vite :5173. Don't guess, don't start the dev server yourself.

After it writes the PNG, read the file with the Read tool. You can see images — scan for overflow, broken layout, typography hierarchy, theme tokens, stuck-invisible elements.

Flags:

- `--viewport 390x844` — mobile capture (default 1440x900 @1x)
- `--wait 3000` — longer settle after networkidle (default 1500ms, for slow-bootstrapping apps)
- `--max-dim 1900` — cap output width/height in px (default 1900; 0 disables). Tall full-page captures are downscaled proportionally so both dims stay under the cap. Don't raise past 1999 — the API rejects images ≥ 2000px on the many-image path.

## If it fails

Try the command first. Only reach for these when an actual error comes back:

- **`Cannot find module 'playwright'`** → `bun add -d playwright` in the host repo, retry. (The script does `import { chromium } from "playwright"`, which needs playwright in the project's `node_modules`.)
- **`Executable doesn't exist` / "browser not found"** → `bunx playwright install chromium` once, retry. One-time browser binary download.
- **`Host system is missing dependencies`** (Linux, including some devcontainers) → Chromium binary is there but system libs like `libnss3`, `libgtk-3-0` are missing. Fix: just run `bunx playwright install-deps chromium` — it auto-switches to root via passwordless sudo, which most devcontainers have. Don't preemptively assume sudo is blocked; try first. Only stop and ask the user if you get an actual permission error (not a lock error).
- **apt lock / `Could not get lock /var/lib/dpkg/lock-frontend`** during install-deps → another `apt-get` is already running (often one you or the user kicked off a moment ago). Check with `pgrep -x apt-get`; if nothing's running, retry — the collision is transient. If two installs raced and you see `rename failed ... /var/cache/apt/archives/partial/...`, that's the same root cause — wait until no apt-get process remains, then retry once.
- **`ECONNREFUSED`** → wrong port, or dev server not running. Confirm with the user.
- **Captured a login/unlock page instead of the target** → URL is behind auth. The generic script can't handle that. Either the host repo has a specialized script (check `scripts/` for anything screenshot-y first), or you need to unlock in a preceding step.
- **Page looks blank or half-rendered** → try `--wait 3000` (or higher) for slow JS apps.

## One caveat

Some repos ship a specialized screenshot script (e.g., this one's `scripts/screenshot-page.ts` auto-unlocks a password gate). If you see one in `scripts/` that does screenshot things, prefer it — it likely knows something about the repo the generic script doesn't. Otherwise, use the bundled script above.

## Out of scope

- Naming output files for iterative workflows — caller picks (`/tmp/*.png` for throwaway, project-local for keepers).
- Multi-step flows (login → navigate → screenshot). Write a dedicated Playwright script for those.
- Starting dev servers. Agent doesn't run `bun run dev` / `task start` in this repo family.
