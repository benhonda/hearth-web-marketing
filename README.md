# Hearth Press

**A beautiful home for your recipes — and a beautiful cookbook whenever you want one.**

Hearth is a recipe app that is also a publishing house. Home cooks save recipes day-to-day, and turn them into premium hardcover cookbooks whenever the occasion calls for one.

- Web: [hearth.press](https://hearth.press)

## How this started

It started with a carrot cake. My girlfriend Megan made one — Easter, I think — and tweaked the icing (brown butter, maybe). A week later, my brother's birthday: my grandparents were coming over, and my grandmother loves carrot cake, so Megan went to make it again. She couldn't remember exactly what she'd changed. "I wish there was a way to save recipes with the changes I've made." We looked. There wasn't — and I knew it'd be easy enough to build.

The book half came after: if you're already building up a personalized collection, wouldn't it be cool if one click gave you a coffee-table-quality hardcover — something beautiful, personal, physical?

## Priorities

One list, top to bottom. "Drawn" = a flow exists in the binder.

### Drawn (Flows I–V)
- **Auth** — Apple + Google sign-in. (Flow I · I)
- **Recipe import** — three co-equal doorways into one structured destination. A textarea on Flow I · III accepts a link or a recipe pasted from Messages / Notes (AI auto-detects which). A "Scan a photo" doorway opens a sub-flow that runs the cook's photograph through a transcription gate — verbatim OCR with dotted-Ochre squiggles on low-confidence words — before structuring, so cursive on a handwritten card has somewhere honest to be reviewed. The Safari share-sheet path remains as the alternate doorway from outside the app. All three land at the same Import preview; the photo path's preview keeps the source artifact in the From card. (Flow I · III–V; Photo + Share-sheet sub-flows under III.)
- **Scaling** — yield strip; lens over the recipe, doesn't change it. (Flow II · Scale sub-flow)
- **Recipe edit** — long-press a step; save commits the change. (Flow II · Edit sub-flow)
- **Global notes** — Apple Notes block between meta and ingredients. (Flow II · Notes sub-flow)
- **Line-item comments** — beside a step or ingredient. (Flow II · Line comments sub-flow)
- **Unit conversion** — cups ↔ grams ↔ ounces; quiet typographic picker on the Ingredients eyebrow, no overlay. Lens over the recipe, doesn't change it. (Flow II · Measures sub-flow)
- **Make-a-book** — occasion → recipes → layout → preview → settings → review → on-its-way. (Flow III)
- **Photos** — long-press the hero, add from camera roll; layout adapts in the book. (Flow IV)
- **Friends** — bilateral mutual graph; library stays private, **collections** are the social atom (user-named, opt-in friends-shareable, Apple-Music-playlist analog). Saving from a friend's shared collection threads a two-line credit chain into your library — *FROM table.kitchen · VIA Sarah Chen* — preserved on the printed cookbook page. Notes never travel; recipe edits travel as part of the recipe-body. (Flow V)

### To draw next
1. Failed import state.
2. Settings — name on cover, sign-out, account deletion.
3. Dedication / front matter — single text page. (Personalized upsell version is shelved.)
4. Table of contents.
5. **Your collections** — the destination behind the Collections row in the library options list (currently a tappable placeholder).
6. **Friend invite / accept** — the gesture that creates a bilateral mutual; never visualized.
7. **Friends-list edge states** — empty list, inbound invite at the top, friend with nothing shared yet.

### V1-scoped, lower binder priority
- Stripe checkout.
- Blurb print + ship; order confirmation email; tracking link.

### Load-bearing rules
- One template. One trim size (8×10 hardcover, premium paper).
- The book renders annotations — printed pages carry the cook's marginalia, not just the recipe body. This is the personalization layer.
- The book also renders the **credit chain** — *FROM origin · VIA curator* — preserved on the printed page like real cookbook attributions ("submitted by Mrs. Thompson, originally her grandmother's"). Credit travels with the recipe, not the user.
- Library is flat chronological and **private**. Collections are user-named buckets drawn from the library, opt-in friends-shareable; the raw library itself never travels.
- Friend graph is **bilateral and small** — mutuals only. No follower counts, no activity feed, no public profiles. Apple-Music-shape, never Spotify-shape.
- Notes are always private. Recipe edits travel as part of the recipe-body; private marginalia don't.
- iOS only. Three import doorways (link · paste text · photo). Apple + Google auth only.

## Shelved

Every item below has a trigger. If the trigger isn't met, the answer is no — every new idea goes through this list before it goes anywhere else.

- **TikTok / Instagram caption import (LLM extraction + review step)** — Off-wedge for V1. The textarea-paste and photo doorways cover most of the off-link cases someone would actually hit; TikTok/Instagram-specific scraping is real work that doesn't earn a seat until someone asks. The transcription-gate architecture from the photo path would carry the review-step half if/when this comes back. *Trigger:* a user (not Ben's girlfriend) asks for it more than once.
- **AI photo enhancement** — Template + typography carry quality at V1. *Trigger:* after 10+ real books, if photo quality is the top complaint. ~1-day build via API (Topaz / Pixelcut).
- **AI-generated food imagery** (for missing/low-quality photos) — Stock libraries can't hit recipe-variation specificity, and user-uploaded is the default. Needs real research before it earns a seat. *Trigger:* after 10+ real books, if missing-photo fallbacks are a felt gap.
- **Video transcript + keyframe extraction** — Caption extraction would cover most cases (if/when caption import ships). *Trigger:* caption-only misses >25% of imports based on user review corrections.
- **Multiple templates** — One is enough to validate the wedge. *Trigger:* post-V1; add 2–3 based on user wishes. Each is real design work.
- **Multiple trim sizes** — One covers 90% of use cases. *Trigger:* user demand for a specific alternative.
- **Cover options beyond V1** (typographic-only, cloth-jacket, foil/emboss) — Right now `plate` and `bleed`. V2 work; adjacent to *Multiple templates* above. *Trigger:* post-V1; add based on user wishes.
- **Pattern-based book starters** ("Your most-cooked", "Your desserts") — Needs usage data we don't have yet. *Trigger:* users consistently have 50+ recipes.
- **Apple Music Replay–style suggestions** ("you cooked this 12 times") — Needs usage history. A year-in-cooking annual hardcover artifact (Spotify-Wrapped-shape inverted to private + printed) was sketched alongside this and removed pre-commitment — both deserve fresh interrogation if/when they earn a seat. *Trigger:* 6+ months of activity data.
- **Premium checkout upsells** (dust jacket, linen cover, foil stamping) — Margin optimization, not core loop. *Trigger:* shipping 20+ books/month. Highest-leverage ASP lever when ready.
- **Multi-copy discount flow** — Add when someone asks. *Trigger:* first CS request for bulk. Easy build.
- **Personalized dedication page** (premium template) — Upsell, adds template work. Basic typographic dedication lives in V1 priorities. *Trigger:* alongside other upsells.
- **Occasion-triggered marketing** (Mother's Day, anniversary) — Marketing layer, not product. *Trigger:* any meaningful user base. CRM/email work.
- **Web app** — Mobile is where photos live. *Trigger:* clear user demand.
- **Android share extension** — iOS-first. *Trigger:* your girlfriend (or user #2) asks.
- **Family / shared libraries** — Distinct from the Flow V friend graph (bilateral mutuals + opt-in shared collections). A *shared library* would mean co-editing one library across multiple users — household account, kid-recipes-with-mom. Big scope. *Trigger:* multiple direct requests.
- **Meal planning, shopping lists, nutrition tracking** — Actively off-brand. *Trigger:* **never.**
- **Ancillary products** (recipe cards, aprons, cloth) — Margin extension, not a product need. *Trigger:* primary cookbook business is stable and profitable.
- **Direct printer** (replacing Blurb) — Complexity only worth it at scale. *Trigger:* ~500+ books/month. COGS cut 25–40%.

## Legal / copyright

- [ ] Research image copyright boundaries for the print-on-demand book use case.
- [ ] Draft ToS clarifying user responsibility for copyrighted content in their book compilations.
- [ ] Consult a lawyer about platform liability for the print-on-demand book feature.

## Deferred book-layout work (2026-04-21)

Context. While drawing the `03-make-a-book` flow in the design binder, we reached the cover/page layout picker (`book-layout` — main-line step V plus the Settings sub-flow), where the user picks a cover layout and one page layout per photo-count bucket (1, 2, 3+). The thumbnails in that picker had been abstract skeleton sketches — solid rectangles and hairlines. Ben flagged that this would force us to keep two sources of truth: the skeleton thumbnails here, and the real rendered layouts on the preview / per-page-edit screens later. We agreed the right pattern is **one component rendered at two scales** — full-size on Preview (VI) / The page (VIII), scale(0.42) inside the layout picker frames.

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
5. **Spread semantics.** VI is "Preview" — two facing pages side-by-side via `BookSpread`. A recipe might be a one-pager on a single page (facing another recipe or a chapter mark), or a two-page spread. Today Preview renders two independent `BookPage`s inside `BookSpread` and treats each as its own tap target; a true full-bleed spread that spans both halves (for a 1-photo-b cross-gutter layout) is still open work.
6. **Per-page layout override polish.** Screen VIII (Editing a page) is the moment a user overrides the global default for one specific page's layout + photo. The base interaction exists — layout picker above, photo scroller below, Done to return — but the visual weight of the layout thumbs, how "off-bucket" layouts are surfaced (e.g. switching a 1-photo page to a 2-photo layout when the recipe has a second photo), and the relationship to VI's tap-the-page affordance all need a polish pass.
7. **Cover-photo coupling.** When a user picks a cover photo (screen VII) from the selected recipes, we need to track WHICH recipe that photo came from — for photo credit on the colophon, and to ensure the cover photo isn't also used unmodified in the book's interior.
8. **Marginalia rendering (NEW — load-bearing).** The annotation layer — recipe-scoped note (Flow II · Notes sub-flow) and per-ingredient / per-step comments (Flow II · Line comments sub-flow) — must render in the printed book, not just in-app. This is what makes the book visibly hers; without it, we're printing someone else's recipe unchanged. Rendering spec:
   - **Global note** → headnote-style italic paragraph ABOVE the ingredients/method, in the author's-headnote slot that real cookbooks use. Lora italic, Ink, short measure.
   - **Line-item comments** → beneath the relevant ingredient line or method step, in a smaller italic register (Ash), matching the in-app `ItemComment` grammar.
   - Each of the six page layouts (`1-photo-a/b`, `2-photos-a/b`, `3-plus-a/b`) needs to reserve space for both. Overflow rules (item 3 above) now compound with annotation volume — a recipe with 4 step-comments + a paragraph of global notes takes more room than a raw recipe. May need a "comments-heavy" layout variant, or scale-to-fit typography.
   - Cross-cutting with items 1 and 2: real layout design AND type calibration need to account for annotation density from the start, not retrofit later.

(*Cover options beyond V1* — typographic-only, cloth-jacket, foil/emboss — used to live here as item 6. Moved to **Shelved**: it's a *don't-build-at-V1* decision, not unfinished V1 work.)

**Why we're deferring.** Doing each of the six page layouts as a real cookbook page is itself a design project — probably 1–2 full days of iteration per layout, plus a session on typography and overflow. Ben's current session was focused on the flow mockup (binder), not a production-ready layout system. The skeleton components let the flow mockup render convincingly without forcing that investment now. When we circle back, this note is the starting point — follow the numbered items 1–8 in roughly that order; item 8 is cross-cutting and should inform 1, 2, 3 as they're revisited.

**Not lost work.** The `BookPage` / `BookCover` component contracts (props, slot semantics, natural size) are the right shape; only the *internals* of each layout need the real design pass. The wiring into `BookLayout.astro` (scale transform + frame pattern) is the right pattern and will remain when we upgrade the layouts.

## Documents

- [`PRODUCT.md`](./PRODUCT.md) — north-star brief, positioning, principles, validation plan
- [`CLAUDE.md`](./CLAUDE.md) — AI assistant guidelines

## Status

Pre-build. Next action: concierge cookbook (see `PRODUCT.md` → Validation).
