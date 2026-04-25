# Hearth Press

**A beautiful home for your recipes — and a beautiful cookbook whenever you want one.**

Hearth is a recipe app that is also a publishing house. Home cooks save recipes day-to-day, and turn them into premium hardcover cookbooks whenever the occasion calls for one.

- Web: [hearth.press](https://hearth.press)

## Priorities

One list, top to bottom. "Drawn" = a flow exists in the binder.

### Drawn (Flows I–V)
- **Auth** — Apple + Google sign-in. (Flow I · I)
- **Web URL import** — paste a link, parse `schema.org/Recipe`, render in Hearth's voice. (Flow I · III–V; Safari share-sheet sub-flow)
- **Scaling** — yield strip; lens over the recipe, doesn't change it. (Flow I · VII–IX)
- **Recipe edit** — long-press a step; save commits the change. (Flow I · X–XII)
- **Make-a-book** — occasion → recipes → preview → settings → review → on-its-way. (Flow II)
- **Photos** — long-press the hero, add from camera roll; layout adapts in the book. (Flow III)
- **Global notes** — Apple Notes block between meta and ingredients. (Flow IV)
- **Line-item comments** — beside a step or ingredient. (Flow V)

### To draw next
1. **Library search + threshold.** Search itself, plus when *"When you're ready —"* first appears between 1 recipe (Flow I · VI) and 27 (Flow II · I).
2. **Unit conversion** — volume → weight (cups/tbsp → grams/oz) as a quiet on-page mechanic. Needs an ingredient-density source.
3. Failed import state.
4. Manual entry — recipe-from-a-text-message; not blank-canvas form.
5. Settings — name on cover, sign-out, account deletion.
6. Dedication / front matter — single text page. (Personalized upsell version is shelved.)
7. Table of contents.

### V1-scoped, lower binder priority
- Stripe checkout.
- Blurb print + ship; order confirmation email; tracking link.

### Load-bearing rules
- One template. One trim size (8×10 hardcover, premium paper).
- The book renders annotations — printed pages carry the cook's marginalia, not just the recipe body. This is the personalization layer.
- Library is flat chronological. No folders, tags, or collections.
- iOS only. Web URL import only. Apple + Google auth only.

## Shelved

Every feature below has a trigger. If the trigger isn't met, the answer is no — every new idea goes through this table before it goes anywhere else.

| Feature | Why shelved | Trigger to revisit |
| ------- | ----------- | ------------------ |
| TikTok / Instagram caption import (LLM extraction + review step) | Off-wedge for V1. Web URL import covers the MVP import path. The LLM-extraction + review-step arc is real work and doesn't earn a seat until someone asks. | A user (not Ben's girlfriend) asks for it more than once. |
| AI photo enhancement | Template + typography carry quality at V1. | After 10+ real books — if photo quality is the top complaint. ~1-day build via API (Topaz / Pixelcut). |
| AI-generated food imagery (for missing/low-quality photos) | Stock libraries can't hit recipe-variation specificity, and user-uploaded is the default. Needs real research before it earns a seat. | After 10+ real books — if missing-photo fallbacks are a felt gap. |
| Video transcript + keyframe extraction | Caption extraction would cover most cases (if/when caption import ships). | When caption-only misses >25% of imports based on user review corrections. |
| Multiple templates | One is enough to validate the wedge. | Post-V1 — add 2–3 based on user wishes. Each is real design work. |
| Multiple trim sizes | One covers 90% of use cases. | User demand for a specific alternative. |
| Collections / playlists | Pattern-based starters substitute. | Users asking "how do I organize these?" |
| Pattern-based book starters ("Your most-cooked", "Your desserts") | Needs usage data we don't have yet. | Users consistently have 50+ recipes. |
| Apple Music Replay–style suggestions | Needs usage history. | 6+ months of activity data. |
| Premium checkout upsells (dust jacket, linen cover, foil stamping) | Margin optimization, not core loop. | Shipping 20+ books/month. Highest-leverage ASP lever when ready. |
| Multi-copy discount flow | Add when someone asks. | First CS request for bulk. Easy build. |
| Personalized dedication page (premium template) | Upsell, adds template work. Basic typographic dedication lives in V1 priorities (#12). | Alongside other upsells. |
| Occasion-triggered marketing (Mother's Day, anniversary) | Marketing layer, not product. | Any meaningful user base. CRM/email work. |
| Web app | Mobile is where photos live. | Clear user demand. |
| Android share extension | iOS-first. | Your girlfriend (or user #2) asks. |
| Family / shared libraries | Big scope, niche at V1. | Multiple direct requests. |
| Meal planning, shopping lists, nutrition tracking | Actively off-brand. | **Never.** |
| Ancillary products (recipe cards, aprons, cloth) | Margin extension, not a product need. | Primary cookbook business is stable and profitable. |
| Direct printer (replacing Blurb) | Complexity only worth it at scale. | ~500+ books/month. COGS cut 25–40%. |

## Legal / copyright

- [ ] Research image copyright boundaries for the print-on-demand book use case.
- [ ] Draft ToS clarifying user responsibility for copyrighted content in their book compilations.
- [ ] Consult a lawyer about platform liability for the print-on-demand book feature.

## Deferred book-layout work (2026-04-21)

Context. While drawing the `02-make-a-book` flow in the design binder, we reached the cover/page layout picker (originally main-line step VI "Global settings"; now lives in the Settings sub-flow as `book-layout`), where the user picks a cover layout and one page layout per photo-count bucket (1, 2, 3+). The thumbnails in that picker had been abstract skeleton sketches — solid rectangles and hairlines. Ben flagged that this would force us to keep two sources of truth: the skeleton thumbnails here, and the real rendered layouts on the preview / per-page-edit screens later. We agreed the right pattern is **one component rendered at two scales** — full-size on Preview (V) / The page (VII), scale(0.42) inside the layout picker frames.

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

9. **Marginalia rendering (NEW — load-bearing).** The annotation layer — recipe-scoped note (Flow IV) and per-ingredient / per-step comments (Flow V) — must render in the printed book, not just in-app. This is what makes the book visibly hers; without it, we're printing someone else's recipe unchanged. Rendering spec:
   - **Global note** → headnote-style italic paragraph ABOVE the ingredients/method, in the author's-headnote slot that real cookbooks use. Lora italic, Ink, short measure.
   - **Line-item comments** → beneath the relevant ingredient line or method step, in a smaller italic register (Ash), matching the in-app `ItemComment` grammar.
   - Each of the six page layouts (`1-photo-a/b`, `2-photos-a/b`, `3-plus-a/b`) needs to reserve space for both. Overflow rules (item 3 above) now compound with annotation volume — a recipe with 4 step-comments + a paragraph of global notes takes more room than a raw recipe. May need a "comments-heavy" layout variant, or scale-to-fit typography.
   - Cross-cutting with items 1 and 2: real layout design AND type calibration need to account for annotation density from the start, not retrofit later.

**Why we're deferring.** Doing each of the six page layouts as a real cookbook page is itself a design project — probably 1–2 full days of iteration per layout, plus a session on typography and overflow. Ben's current session was focused on the flow mockup (binder), not a production-ready layout system. The skeleton components let the flow mockup render convincingly without forcing that investment now. When we circle back, this note is the starting point — follow the numbered items 1–9 in roughly that order; item 9 is cross-cutting and should inform 1, 2, 3 as they're revisited.

**Not lost work.** The `BookPage` / `BookCover` component contracts (props, slot semantics, natural size) are the right shape; only the *internals* of each layout need the real design pass. The wiring into `BookLayout.astro` (scale transform + frame pattern) is the right pattern and will remain when we upgrade the layouts.

## Documents

- [`PRODUCT.md`](./PRODUCT.md) — north-star brief, positioning, principles, validation plan
- [`CLAUDE.md`](./CLAUDE.md) — AI assistant guidelines

## Status

Pre-build. Next action: concierge cookbook (see `PRODUCT.md` → Validation).
