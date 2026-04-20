# Design System: Hearth Press
**Project ID:** N/A (local — synthesized from `branding.html`, Brand Book v1, 2026)

## 1. Visual Theme & Atmosphere

**Editorial · Cookbook · Publishing-House.** Hearth Press is a recipe app built as if it were a hardcover from a small press — "the book is the app made physical." Every surface should feel like a page from a thoughtfully art-directed cookbook: warm, literary, quietly confident. Not rustic, not farmhouse, not "food blog." Closer to a Chez Panisse monograph than to a modern SaaS dashboard.

The temperature is **warm and unhurried**. Dark mode is a **deep sage hardcover with gold foil stamping**; light mode is a **cream book interior with deep-ochre ink accents** — the two sides of the same object. Density is moderate-to-airy: generous margins, breathable line-height (1.55–1.75), editorial whitespace. Subtle paper and cloth textures (diagonal weave on sage surfaces, cream paper warmth in radial vignettes) hint at the physical object without pastiche.

Mood adjectives: **Literary, calm, hand-made, foil-stamped, candlelit, confident, considered.** Anti-moods to avoid: tech-y, neon, glossy, bouncy, exclamatory, emoji-forward.

## 2. Color Palette & Roles

### Brand Anchors

- **Deep Conifer (#2F4A3C)** — the sage hardcover. The dark-mode surface, hero backgrounds, book covers, primary brand deep. Reads as a muted, forest-dusk green-teal. Everything emotional traces back to this color.
- **Antique Foil (#B8934A)** — the gold-foil stamp. Used at display sizes on sage: wordmark, hero title accents, cover-stamp treatments. A burnished, slightly brass-toned gold; never bright, never yellow.
- **Foil Light (#D4B062)** — a brighter, more legible foil variant reserved for **small** text on sage (small-caps eyebrows, micro-labels) where Antique Foil would fail accessibility. Also the **Primary CTA background**. Hits 4.7:1 on Deep Conifer.
- **White Dove (#F4EFE6)** — the cream page. Light-mode surface, cookbook interiors, cards, phone body background. A neutral warm cream — *not* yellow, *not* bone, *not* paper-white.
- **Deep Ochre (#7A5A26)** — the cookbook-ink gold. Used as the on-cream gold: chapter marks, decorative rules, small-caps section labels ("INGREDIENTS", "METHOD"), italic Roman-numeral step markers, folios. Darker than the foils so it survives at small sizes on cream.
- **Warm Charcoal (#1F1B17)** — the primary body ink. Near-black but warm; 14.94:1 on White Dove (AAA).

### Text Color Hierarchy — On Cream

- **Primary · Warm Charcoal (#1F1B17)** — body paragraphs, recipe titles, ingredient lists.
- **Secondary · Ash (#6C6457)** — captions, metadata ("Serves 4 · 50 minutes"), italic ledes. 5.10:1 AA.
- **Tertiary · Oat (#7C7465)** — hints, folios, footnotes. 4.04:1 AA-large only.

### Text Color Hierarchy — On Sage

- **Primary · White Dove (#F4EFE6)** — hero titles, display copy on dark surfaces. 8.47:1 AAA.
- **Secondary · Linen (#DAD5CD)** — dimmed support text, italic meta. 6.64:1 AA.
- **Tertiary · Stone (#B9B4AC)** — tertiary meta, low-emphasis tags. 4.70:1 AA.

### Accent / Utility

- **Chrome Background (#F6F2EA)** — the neutral warm workspace canvas; used behind floating cream artifacts so cream still registers as *cream* and not as *white*.
- **Alert Rust (#A55C2B)** — reserved for destructive/anti-pattern indicators. Not a general-use brand color.
- **Input Fill (#FAF7F1)** — a slightly-off cream used inside form inputs to distinguish field from page.

> **Palette guardrail:** Hearth has **zero saturated accent colors**. No blues, no reds, no purples. The only chromatic range is sage ↔ cream ↔ gold/ochre ↔ charcoal. Every color must feel like it could have been mixed from ink, paper, and gold leaf.

## 3. Typography Rules

Hearth runs on **three typefaces, five tiers**. The interplay between serif (literary) and sans (informational) is what makes the system feel like a publishing house, not a food blog.

### Faces

- **Marcellus (serif, 400 only)** — the wordmark typeface. Wide-tracked (letter-spacing 0.08–0.15em), all-caps. **Reserved exclusively for the "HEARTH" wordmark** on spines, covers, app icon, nav. It has no italic and no alternate weights, and nothing else in the system is ever set in it.
- **Lora (transitional serif, 400 + 400 italic)** — carries display headings, recipe titles, chapter openers, ledes, italic metadata, and italic Roman-numeral step markers. Warm, editorial, slightly bookish without feeling antique. **Never bold** — hierarchy comes from size, never weight.
- **DM Sans (humanist sans, 400 + 500)** — carries small-caps eyebrows, section labels, body paragraphs, UI chrome, metadata, buttons. Neutral and quiet; lets the serifs do the emotional work.

### Tiers

1. **Display / Wordmark** — Marcellus 400, ~48–72px, letter-spacing 0.08–0.10em, line-height 1. Always gold foil on sage or Deep Ochre on cream.
2. **H1 / Recipe & Chapter Titles** — Lora 400, 28–42px, line-height 1.08–1.15, letter-spacing −0.012em. Warm Charcoal on cream; White Dove on sage.
3. **Italic / H2–H4 / Lede** — Lora italic 400, 16–24px, line-height 1.4–1.6. Carries *all* italic jobs (meta, numerals, folios, ledes) since Marcellus has no italic.
4. **Eyebrow / Overline / Small-cap Label** — DM Sans 500, 9–13px, `text-transform: uppercase`, letter-spacing **0.22em–0.30em**. Deep Ochre on cream; Foil Light on sage. The wide tracking is non-negotiable — it is what signals "cookbook chapter mark" instead of "generic caps label."
5. **Body / UI** — DM Sans 400, 13–15px, line-height 1.55–1.75.

### Typographic Character Rules

- Hierarchy is communicated through **scale, color, and face-switching**, never through bold weight.
- Step-numbered lists render the numeral in **italic lowercase Roman** (`i.`, `ii.`, `iii.`, `iv.`) set in Lora italic, colored Deep Ochre on cream or Antique Foil / Brand Deep on sage.
- Folios (page-number markers) are centered, Lora italic, ~12–13px, with em-dash ornamentation — e.g. `— 47 —`.
- Body letter-spacing sits at default or slightly open (0.01–0.02em); display letter-spacing is tight-negative (−0.012em to −0.015em).
- Section note copy and metadata frequently use italics as texture, not emphasis.

## 4. Component Stylings

### Buttons — Six-token system, all pill-shaped (except tertiary/inline)

- **Primary** — Foil Light (#D4B062) background, Warm Charcoal text, **pill** (border-radius 999px), soft 1px/2px shadow, 280ms ease hover to a slightly brighter foil (#DEBD74). One primary per screen, maximum.
- **Secondary · S1 Outlined** — transparent fill, 1px border in Deep Conifer on cream (or White Dove on sage), pill. Hover inverts to filled. "Book-jacket" feel — the editorial alternative to Primary.
- **Secondary · S3 Soft Filled** — low-contrast fill (#E8E1D1 on cream; 14% White Dove on sage), no border, pill. For quiet supporting actions: filters, pagination, chip-like tags.
- **Tertiary · T1 Plain Text** — no container, underline-on-hover, 280ms ease. For low-stakes or destructive ("Delete recipe").
- **Tertiary · T2 Chevron / Rule** — text + italic chevron that nudges 3px right on hover, or text with a Deep-Ochre / Foil-Light bottom rule. For navigational "continue reading" moments.
- **Inline Link** — inherits paragraph color, underline with 3px offset, transition to currentColor on hover. Gold variant uses Deep Ochre on cream / Foil Light on sage.

### Cards / Containers

- **Subtly squared corners (border-radius 2px)** — not sharp, not rounded; the radius of a well-cut book page. Never use pill radii or large rounded corners on containers.
- Background: White Dove on cream pages, Deep Conifer on dark surfaces.
- **Whisper-soft diffused shadows**: typical treatment is `0 1px 2px rgba(0,0,0,0.06)` for lifted-paper; deeper lifts go `0 20–30px 40–48px -20px rgba(30,20,10,0.15–0.35)` — always warm, brown-biased shadow, never blue-biased.
- Borders are 1px in `rgba(0,0,0,0.06)` — barely-there definition, book-layout not card-UI.
- Cloth-weave and paper-warmth textures are applied via layered repeating gradients and radial vignettes — present but restrained; they should read on second glance, not first.

### Inputs / Forms

- **Square (2px radius)** — the corner discipline of a printed form field. Inputs and pill buttons sit next to each other and *should* feel different.
- Background: Input Fill (#FAF7F1), 1px border in `rgba(31,27,23,0.18)`. Focus deepens border to Warm Charcoal and lifts background to pure White (#FFFFFF).
- Labels: DM Sans 500, 10.5–11px, `color: Ash`.
- Placeholder: Oat (#7C7465).
- Search fields in nav use the same 2px radius (explicitly *not* pill — pill is reserved for buttons).

### Navigation

- Horizontal bar on cream with Marcellus wordmark (18px, Deep Conifer, 0.12em tracking) on the left, DM Sans 13px links center-aligned (Ink-Secondary default, Ink-Primary + medium weight when active), 2px-radius search field, and a pill Primary CTA (Foil Light) at the far right.

### Photography

- Photography lives in only **two** places: (1) full-bleed **recipe-detail hero** with a gradient scrim from transparent → `rgba(0,0,0,0.55)` for legibility; (2) small square **library thumbnails** (2px radius, 32–40px). Covers, chapter openers, and cookbook interiors remain **typographic only**.
- Voice: user-uploaded photos, honest, **no AI enhancement, no filters that fake moodiness**. The rule is "imperfect, true-to-phone."

### Motion

- **Restrained.** Every state change is a **~280ms ease fade** on background, color, and box-shadow. No springs, no bounces, no overshoot, no bespoke "craft moments." The chevron-translate 3px on T2 buttons is the entire scope of "delight" allowed.
- Motion is soft and unobtrusive — users shouldn't consciously notice it. That's the point.

### Voice & Tone (visual copy)

- Warmth from phrasing, never from emoji or exclamation marks.
- Factual when factual serves ("50 min · Serves 4" stays that way — with the em-middot separator).
- Conversational only where it helps: empty states ("Your library is empty. Save a recipe to begin."), toasts ("Saved — it's in your library."), conversion ("Turn your library into a cookbook").

## 5. Layout Principles

- **Editorial, cookbook-interior rhythm.** Generous page-style padding on surfaces that represent a page (recipe detail, cookbook spread): 32–72px inside, with body copy max-width around **52–58ch** for comfortable line length.
- **Hero ↔ body split on recipe screens.** The upper ~48% is a sage or photographic hero with White Dove title, a 36px × 1px Foil accent rule, and Linen italic meta. The lower portion drops onto cream with Deep Ochre small-cap section labels.
- **Chapter-mark → rule → title → lede → labeled-sections → folio** is the canonical content rhythm on any long-form page. Small-cap chapter label, 44×1.5px Deep-Ochre rule, Lora 40–42px title, italic Lora lede, then DM Sans small-cap labels opening each content block.
- **Dividers between list items** use `1px solid rgba(31,27,23,0.08)` — a whisper rather than a stroke. Last-item gets `border-bottom: none`.
- **Section rhythm** at the page level is 96px between major sections, 40–56px between subsections, 24–28px between a heading and its body.
- **Grids** default to editorial columns — single-column body at ~640px for reading surfaces, 2-column 1fr/1fr for compare-and-contrast ("cookbook spread") layouts, 3-column only for swatch/specimen galleries.
- **Icons** are line-drawn at 1.4 stroke-width, inherit currentColor, and sit at ~12–16px inside chrome. No filled icon styles.
- **Alignment** is left-aligned by default for editorial copy; centered only for folios, hero callouts, and the wordmark itself.
- **Nothing floats pill-shaped** except buttons. Nothing squares sharp at 0px. The whole system lives at a disciplined 2px corner, with pills as the one intentional exception to signal "this is tappable."
