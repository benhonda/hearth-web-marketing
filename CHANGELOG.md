# Changelog

## 2026-04-21

- refactor: Restructured Flow II — "Global settings" moved off the main line into a new Settings sub-flow reached from a right-nav `settings` mark on Preview. Main line drops from ten to nine numbered steps (Preview V, Cover VI, Page VII, Review VIII, On its way IX). Contextual edit surfaces (Cover, Page) still descend from Preview; structural edits (Title, Subtitle, Layout, Recipes) live in the sub-flow, so the linear walk lands in Preview sooner and the user is never asked to shape the book before seeing it.

- feat: Added `FlowBranch` type + branch-rendering in `FlowStoryboard`. A flow step can now carry a `branch` — a secondary row of screens (numeral: ""). The storyboard renders branches as a descending row aligned to the branch point's column via a two-axis CSS grid track; `ScreenCaption` and `ScreenDetail` both handle the no-numeral case so sub-flow screens resolve the same way as main-line ones.

- feat: Drew the five Settings sub-flow screens — `book-settings` (TOC landing: four tappable rows — Title / Subtitle / Layout / Recipes), `book-title` and `book-subtitle` (single-field editors that render the value in the cover's own Lora face so the user judges it in voice, not as a form field), `book-layout` (the cover + per-photo-count-bucket structural picker that used to live at main-line step V), and `book-recipes-edit` (in-book roster with drag handles, an "Add from library →" row, and a revealed long-press Remove action).

- feat: Drew the remaining main-line screens — `book-review` (VIII: cover shadow-lift at the top, four-row labeled colophon — In the book / Format / Delivery / Indicative price — and the ONE Primary foil "Send to Hearth Press" CTA that Flow II is allowed per tokens.css) and `book-on-its-way` (IX: sage-cloth close, sibling of Welcome and Invitation, with foil chapter rule, italic stanza, and a Secondary outlined "Return to your library" pill — same S1 grammar as the "Continue with Google" button on Welcome — so the user has a way out without disturbing the ceremonial close). Flow II is now drawn end-to-end.

- refactor: Replaced the Library waterfall on Screen IV (The recipes) with a new `BookRecipeList` primitive — a stacked list with thumbnail + title/meta + ochre toggle per row (filled = in the book, outlined = out). The waterfall voice is reserved for in-app browsing per tokens.css §PHOTOGRAPHY; book composition should read closer to a manuscript TOC than to a photo grid. The same primitive powers the Settings → Recipes editor in `edit` mode (drag handles + revealed Remove) — one list component, two contexts.

- feat: `ScreenNav` gained a `showSettings` right slot — a literary italic-Lora `settings` mark (not a gear icon) with underline-on-hover, used on Preview as the entry to the Settings sub-flow. Grid template changed from `32px 1fr 32px` to `1fr auto 1fr` so the centered eyebrow stays true-centered regardless of what occupies the right slot.

- refactor: `.canvas__track` is now a two-axis CSS grid (was inline-flex) so branch phones pin to the same columns as their parent main step. Trailing scroll-end space is held by an implicit `::after` grid column — padding/inline-end collapses on overflow-x grid containers in Chrome, so a real grid item is the only reliable way to extend the scrollable area.

- refactor: `BookPreview` display + pager now travel as a vertically-centered pair inside a `prev__stage-band`. Pager chevrons grew from 22px to 34px and the italic Lora label from 14px to 19px, reading closer to the margin-flip notation of a book than to an app pager.

- refactor: `BookPageEdit` dropped its title/lede header (the ScreenNav eyebrow carries the context), added a centered em-dashed folio `— page 4 —` beneath the stage, and reshaped each row's header as a chapter-mark eyebrow + 36px ochre rule — consistent with the grammar now shared across the sub-flow editors.

- refactor: Replaced Flow II step VIII "Editing a spread" with "The page" / "Editing a page" — the editor now operates on ONE page at a time, not a two-page spread. Preview (VI) renders two independent tap targets per spread (left-page and right-page halos separated by a spine gutter), and the new `BookPageEdit.astro` follows the same Display → Layout row → Photo row → Done pattern as the cover editor. `BookSpreadEdit.astro` / `book-spread-edit` route / `book-spread-edit` ScreenRender were removed.

- refactor: Rebuilt Screen VII (`BookTitleCover` / "The cover") to match the page-edit pattern — interactive layout picker with two pre-rendered `BookCover` variants (plate / bleed), a scrollable cover-photo row, and a `Done` CTA. Replaces the prior bespoke "tap-any-line-on-the-cover" editor with the same grammar used on VIII, giving the cover and page surfaces one shared mental model.

- feat: Added `ScreenNav.astro` primitive — the standard nav row (back chevron + centered chapter-mark eyebrow + rule) shared by Occasion, Recipes, Settings, Preview, Cover, and Page Edit. Replaces the per-screen duplicated topbar markup and removes the old `StepHeader.astro` primitive (each screen now renders its own title/lede inline under the nav).

- refactor: All Flow II screens (Invitation, Occasion, Recipes, Settings, Preview, Cover, Page Edit) now use a flex column with sticky bottom CTAs pinned via `margin-top: auto` + `position: sticky; bottom: 0` and a cream/sage background that covers the home-indicator zone — replaces the previous fixed `padding-bottom: 44px` grid pattern so short-content screens no longer float the CTA in the middle and long-content screens no longer push it below the fold.

- feat: Added Flow II (`/design/flows/02-make-a-book`) — the complete ten-step boutique book flow from library through occasion, recipe selection, global layout picker, spread preview, cover editing, per-spread editing, review & finalize, and concierge hand-off; replaces the abstract "make a book" placeholder with a drawn flow the concierge validation will run against.

- feat: Added the `library-populated` screen — a 27-recipe photo waterfall at depth, with a typographic "When you're ready to make these into a book —" invitation at the foot as the single entry point into Flow II (no button, no saturated CTA; the book moment opens from the library itself).

- feat: Added `BookCover.astro` and `BookPage.astro` skeleton components (one component per surface, two cover and six page layout variants driven by `grid-template-areas`, natural size 320×400) so the Global-settings picker renders real miniatures at `scale(0.42)` instead of sketch thumbnails; the finishing design pass on each layout is deferred — see README → "Real page & cover layouts" for the circle-back note.

- refactor: Recipe editing replaced the dedicated Edit form with an in-place long-press → iOS context menu → live textarea pattern. Added `recipe-edit-menu` as a new step (VIII) and demoted `recipe-edit` (now step IX) to a thin composition over `recipe-detail` plus a sticky iOS keyboard dock with Cancel/Save accessory bar. There is no Edit button in the recipe chrome anymore — long-press on the target is the single edit entry point.

- feat: Method steps now carry a per-step `mise` line (amounts in hand at the pan, em-middot separated, rendered in Deep Ochre italic above each step's prose) following the Zuni/Ottolenghi/Prune convention; the top ingredient list stays as the shopping summary. Required a data-model change on `sampleRecipe.method` / `editedMethod` from `string[]` to `MethodStep[]`.

- refactor: Collapsed every `/design/screens/[slug]` detail page to a one-line `<ScreenDetail slug="..."/>` call; eyebrow, poetic title, and director's note now resolve from a single source (`flows.ts` via a new `getScreen()` helper), and `FlowStep` gained `detailTitle` + `tone` fields to support dark-surface screens.

- refactor: Extracted the flow-step screen-component registry into `screens/registry.ts` so `FlowStoryboard` and the new `ScreenDetail` share one map, and split the storyboard caption into a reusable `ScreenCaption.astro`.

- refactor: Removed the "— page one —" / "— page 1 —" folio labels from library-empty, library-of-one, recipe-detail, and recipe-saved — the convention was fighting the minimal cookbook-page typography.

- feat: Added `IosKeyboard.astro` (docked QWERTY with shift / 123 / space / return and a three-cell suggestion strip) and `StepHeader.astro` (chapter-mark step numeral + title) as primitives for the book flow.

- feat: `LibraryTile` gained a `dimmed` prop (opacity 0.38) used on `book-recipes` to carry "not in the book" selection state — no checkmarks, no saturated accents; opacity alone is the entire affordance.

- chore: Added `playwright` as a dev dependency and rewrote the `screenshot-website` skill to wrap a bundled `scripts/screenshot.ts`, removing the old per-repo `/products/*` password-gate handling that wasn't relevant here.

- chore: `bit.config.json` now points at the production registry `bit.adpharm.digital` instead of localhost.

- chore: Removed the blocking `generate` dep from `task typecheck` so the typecheck loop no longer forces a full codegen pass on every run.

- feat: Drew step VIII of Flow II (`book-spread-edit`) as a real screen instead of a placeholder — renders the active spread at 0.52× with a two-option layout picker above it that swaps the left page's layout on click; demonstrates the per-spread override pattern deferred in the original Flow II note.

- refactor: Recipe-edit Cancel/Save moved out of a floating accessory bar and now render inline under the active method-step textarea (via `saveTap` on `MethodList`) — the edit controls attach to what's being edited rather than to separate chrome, and the edit screen keeps only the context strip and keyboard dock.

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
