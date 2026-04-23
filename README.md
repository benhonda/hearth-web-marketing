# Hearth Press

**A beautiful home for your recipes — and a beautiful cookbook whenever you want one.**

Hearth is a recipe app that is also a publishing house. Home cooks save recipes day-to-day, and turn them into premium hardcover cookbooks whenever the occasion calls for one.

- Web: [hearth.press](https://hearth.press)

## TODOs & Notes

- [x] Apr 21: Flow of user uploading photos and seeing how that affects book layout — drawn end-to-end as Flow III (`/design/flows/03-photographs`)

- [ ] **2026-04-22 · Open questions & follow-ups**

  **Import (web URL → recipe)**
  - [ ] Build web URL import as the primary import method
  - [ ] Pull hero image from imported URLs
  - [ ] Ensure attribution to original source (blog name, title) on imported recipes

  **Edit (beyond line-items)**
  - [ ] Redesign edit to go beyond line-item ingredient/instruction edits (e.g., notes)
  - [ ] Handle cascading effects when ingredients change (impact on instructions)

  **Photos & imagery**
  - [ ] User-uploaded photos as the default option
  - [ ] Evaluate AI-generated food imagery as the primary fallback for missing or low-quality user photos — stock libraries won't have the specificity needed for recipe variations

  **Unit conversion**
  - [ ] Volume → weight conversion (cups / tablespoons → grams / ounces)
  - [ ] Source or build an ingredient density database to power accurate conversion

  **Legal / copyright**
  - [ ] Research image copyright boundaries, especially for the print-on-demand book use case
  - [ ] Draft ToS clarifying user responsibility for copyrighted content in their book compilations
  - [ ] Consult a lawyer about platform liability for the print-on-demand book feature

- [x] **2026-04-21 · Real page & cover layouts (deferred from design binder, Flow II)**

  **Context.** While drawing the `02-make-a-book` flow in the design binder, we reached the cover/page layout picker (originally main-line step VI "Global settings"; now lives in the Settings sub-flow as `book-layout`), where the user picks a cover layout and one page layout per photo-count bucket (1, 2, 3+). The thumbnails in that picker had been abstract skeleton sketches — solid rectangles and hairlines. Ben flagged that this would force us to keep two sources of truth: the skeleton thumbnails here, and the real rendered layouts on the preview / per-page-edit screens later. We agreed the right pattern is **one component rendered at two scales** — full-size on Preview (V) / The page (VII), scale(0.42) inside the layout picker frames.

  **What currently exists (skeleton, not final):**

  - `web/src/components/design/ui/BookCover.astro` — one component, two layouts (`plate`, `bleed`). Takes `{layout, title, subtitle, photo, photoTone}`. Natural size 320×400.
  - `web/src/components/design/ui/BookPage.astro` — one component, six layouts (`1-photo-a/b`, `2-photos-a/b`, `3-plus-a/b`), driven by `grid-template-areas`. Takes `{layout, recipe}`. Natural size 320×400. Pulls title / meta / ingredients (6) / method (4 steps with italic Roman numerals) / folio. Slot 0 uses the recipe's real photo; slots 1+ fall back to a corn-tone gradient placeholder when `recipe.photos[n]` is empty.
  - `sampleRecipe` gained optional `photos: string[]` so 2/3+ photo layouts have real slots to target.
  - `BookLayout.astro` wires these in via `transform: scale(0.42)` inside a fixed 4:5 frame with `overflow: hidden`. (`BookSettings.astro` is now the sub-flow's TOC landing, not the picker.)
  - **Iteration surface: `/design/book`** — the two covers and six page layouts rendered at natural 320×400 so typography and rhythm can be judged honestly. When circling back on items 1–6 below, iterate there; the flow pages (Preview, Page-edit, Layout picker) consume the same components and pick up the changes automatically.

  **What's explicitly deferred — this is the "circle back" work:**

  1. **Actual layout design.** The six page layouts and two cover layouts are structural stand-ins — they hit the grid shape (photo + text zones in the right places), but they're NOT the final cookbook layouts. Typography, rhythm, spacing, and the specific ingredient/method presentation inside each layout variant are placeholder-quality. Each of the six layouts needs its own design pass.
  2. **Typography calibration at thumbnail scale.** At `scale(0.42)` the page text is ~3.5px — present as "text on a page" but not legible. Once real layouts exist, we may need to (a) scale-dependent type sizing, (b) larger natural sizes so the down-scaled thumb is readable, or (c) accept illegibility at thumb and treat the type as texture.
  3. **Recipe content overflow.** The current `BookPage` hard-truncates to 6 ingredients and 4 method steps to make the layouts render at natural size. Real recipes have 8–15 ingredients and 6–10 method steps; they'll spill off one page. We need a multi-page flow rule — either "a recipe always occupies one page and the layout auto-sizes type down," or "a recipe occupies 1–2 pages and overflow wraps to a method-only continuation page." Probably the latter. This intersects the MVP's "one template" rule — templates still need a continuation pattern.
  4. **Photo sourcing for 2 / 3+ photo layouts.** Today, only slot 0 has a real photo. Slots 1+ are gradient placeholders. Users in the real app will upload multiple photos per recipe; we need the `Recipe` data model to support that (probably `photos: Photo[]` with per-photo metadata like crop hint), and the layouts need to handle 2-photo and 3+-photo recipes gracefully — including recipes that fall BELOW a bucket's photo count (a user selected "2 photos" global layout but a specific recipe only has 1 photo: fall back? swap layout? leave a blank?).
  5. **Spread semantics.** V is "Preview" — two facing pages side-by-side via `BookSpread`. A recipe might be a one-pager on a single page (facing another recipe or a chapter mark), or a two-page spread. Today Preview renders two independent `BookPage`s inside `BookSpread` and treats each as its own tap target; a true full-bleed spread that spans both halves (for a 1-photo-b cross-gutter layout) is still open work.
  6. **Cover options beyond V1.** Right now `plate` and `bleed`. Later: typographic-only (no photo), cloth-jacket treatments, foil/emboss variations. These are V2 — deferred beyond the "circle back."
  7. **Per-page layout override polish.** Screen VII (Editing a page) is the moment a user overrides the global default for one specific page's layout + photo. The base interaction exists — layout picker above, photo scroller below, Done to return — but the visual weight of the layout thumbs, how "off-bucket" layouts are surfaced (e.g. switching a 1-photo page to a 2-photo layout when the recipe has a second photo), and the relationship to V's tap-the-page affordance all need a polish pass.
  8. **Cover-photo coupling.** When a user picks a cover photo (screen VI) from the selected recipes, we need to track WHICH recipe that photo came from — for photo credit on the colophon, and to ensure the cover photo isn't also used unmodified in the book's interior.

  **Why we're deferring.** Doing each of the six page layouts as a real cookbook page is itself a design project — probably 1–2 full days of iteration per layout, plus a session on typography and overflow. Ben's current session was focused on the flow mockup (binder), not a production-ready layout system. The skeleton components let the flow mockup render convincingly without forcing that investment now. When we circle back, this note is the starting point — follow the numbered items 1–7 in roughly that order.

  **Not lost work.** The `BookPage` / `BookCover` component contracts (props, slot semantics, natural size) are the right shape; only the *internals* of each layout need the real design pass. The wiring into `BookLayout.astro` (scale transform + frame pattern) is the right pattern and will remain when we upgrade the layouts.

## Documents

- [`PRODUCT.md`](./PRODUCT.md) — north-star brief, positioning, principles, validation plan
- [`MVP.md`](./MVP.md) — V1 scope, shelved-features register, build order
- [`/design/roadmap`](./web/src/pages/design/roadmap.astro) — rendered V1 build list with per-item scope caps; the scope-creep shield (replaces the old `ROADMAP.md`)
- [`CLAUDE.md`](./CLAUDE.md) — AI assistant guidelines

## Status

Pre-build. Next action: concierge cookbook (see `PRODUCT.md` → Validation).
