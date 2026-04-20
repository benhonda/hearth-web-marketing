# Changelog

## 2026-04-20

- refactor: Consolidated design system into a single source of truth at `web/src/styles/tokens.css` (brand book with ~570 lines of inline rationale on palette, type, motion, bans, and principles); removed `DESIGN.md` and `.impeccable.md` so no file can contradict tokens.css.

- feat: Added `/design/brand` page as the rendered brand book and a three-tile library preview screen (`library-preview-three.astro`) to prototype the VSCO-style waterfall grid.

- refactor: Extracted the `/design/*` topbar into `DesignTopbar.astro` with a section nav (Binder · Brand · Flow I) and an ochre-hairline active indicator; `DesignLayout` no longer owns chrome, eyebrow, or up-crumb props.

- refactor: Library-of-one now renders as a photo-led two-column grid tile instead of an Apple-Music row, anchored to `sampleRecipe.photo` (`/summer-corn-pasta.png`) — first step toward the waterfall library aesthetic.

- feat: Added `font-synthesis: none` and a global `h1–h6 { font-weight: 400 }` reset to `global.css` so components can't accidentally fake-bold Marcellus/Lora (we only ship the 400 weight); Hearth hierarchy stays SIZE + COLOR + FACE, never weight.

- docs: Expanded `PRODUCT.md` with audience context, job-to-be-done, emotional goals, the three-word voice (literary · hand-made · confident), and the pro/anti reference lists — promoting positioning details that were previously only in skill memory.

- docs: Rewrote `hearth-binder` skill (v1.1.1) to point at the new three-file source-of-truth (`tokens.css`, `PRODUCT.md`, `MVP.md`) and remove references to deleted docs.

- chore: Added `shadcn` entry to `skills-lock.json` and pulled the matching skill package into `.claude/skills/shadcn/`.
