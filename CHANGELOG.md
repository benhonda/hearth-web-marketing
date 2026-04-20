# Changelog

## 2026-04-20

- refactor: Consolidated design system into a single source of truth at `web/src/styles/tokens.css` (brand book with ~570 lines of inline rationale on palette, type, motion, bans, and principles); removed `DESIGN.md` and `.impeccable.md` so no file can contradict tokens.css.

- feat: Added `/design/brand` page as the rendered brand book, now including an Identity section that renders the Cover, Spine, App Icon, and Favicon side-by-side as live specimens.

- feat: Added `BookSpine.astro` (1:10 vertical hardcover spine with top-to-bottom wordmark at the foot) and `AppIcon.astro` (sage-cloth icon with Marcellus-wordmark, Lora-H, and stacked-monogram variants at squircle or paper radius) so the wordmark has canonical typographic reductions for spine, app icon, and favicon surfaces.

- refactor: Simplified `HeroBook.astro` to draw its sage cloth from `--c-conifer` (no more hardcoded gradients) and dropped the subtitle/colophon/rules so the cover reads as one dominant mark plus dedication — matches the new Identity grammar in tokens.css.

- refactor: Extracted library waterfall into shared `LibraryGrid.astro` + `LibraryTile.astro` components (even/odd column distribution, portrait-or-square aspect enforcement, placeholder gradients for tiles without photos); removed the one-off `RecipeRow.astro` and retired the throwaway `library-preview-three.astro` prototype page.

- feat: Formalized the library photography rules in `tokens.css` §PHOTOGRAPHY (two-column waterfall, 4:5/3:4/1:1 aspects only, 2px radius, no scrims on tiles, caption below) and added a documented second radius exception for the iOS app-icon squircle.

- refactor: `AppHeader`'s wordmark variant drops the eyebrow and rule entirely — the HEARTH wordmark stands alone as a cover moment with 72px top breathing room; library screens updated to match.

- fix: Library empty state now centers its chapter-opener on the true phone viewport midpoint (absolute-positioned body) instead of the smaller space below the wordmark, and the folio anchors to the home-indicator clearance.

- chore: Recompressed `summer-corn-pasta.png` from 5.9 MB to 1.2 MB — the library-of-one placeholder was shipping an unnecessarily heavy hero photo.

- refactor: Extracted the `/design/*` topbar into `DesignTopbar.astro` with a section nav (Binder · Brand · Flow I) and an ochre-hairline active indicator; `DesignLayout` no longer owns chrome, eyebrow, or up-crumb props.

- refactor: Library-of-one now renders as a photo-led two-column grid tile instead of an Apple-Music row, anchored to `sampleRecipe.photo` (`/summer-corn-pasta.png`) — first step toward the waterfall library aesthetic.

- feat: Added `font-synthesis: none` and a global `h1–h6 { font-weight: 400 }` reset to `global.css` so components can't accidentally fake-bold Marcellus/Lora (we only ship the 400 weight); Hearth hierarchy stays SIZE + COLOR + FACE, never weight.

- docs: Expanded `PRODUCT.md` with audience context, job-to-be-done, emotional goals, the three-word voice (literary · hand-made · confident), and the pro/anti reference lists — promoting positioning details that were previously only in skill memory.

- docs: Rewrote `hearth-binder` skill (v1.1.1) to point at the new three-file source-of-truth (`tokens.css`, `PRODUCT.md`, `MVP.md`) and remove references to deleted docs.

- chore: Added `shadcn` entry to `skills-lock.json` and pulled the matching skill package into `.claude/skills/shadcn/`.
