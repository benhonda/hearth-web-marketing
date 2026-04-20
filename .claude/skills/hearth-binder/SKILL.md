---
name: hearth-binder
description: Build and iterate on iPhone-mockup flows for the Hearth recipe app inside the marketing Astro app at /workspace/web/src/pages/design/*. Use when the user asks to mock a new flow, add screens, replace Figma with real rendered mockups, or iterate on existing screens in the design binder. Handles the full job — scope negotiation, framing, per-screen design, brand consistency, mechanical wiring, and iterative review — not just the last-mile registry work.
version: 1.0.0
user-invocable: true
argument-hint: "[new-flow|add-screens|iterate]"
---

# Hearth Design Binder

This skill guides you through building iPhone-mockup flows for the Hearth
recipe app ("Hearth Press"). The binder renders flows as horizontally-scrolling
storyboards of componentized screens, with tap markers, 1× inspection pages,
and the same typographic system as the printed cookbook.

**The job is bigger than adding a screen.** It's: understand the product,
negotiate scope, stand up framing if missing, design each screen to brand,
maintain consistency across the flow, wire everything in, iterate with the
user, and polish. Treat all eight stages as load-bearing.

---

## Before you do anything

**You cannot produce a Hearth-consistent mockup from a cold start.** Read
these four files, in this order, before writing any code or committing to
a design decision:

1. `/workspace/PRODUCT.md` — what Hearth is, the 6 load-bearing principles,
   what it is NOT
2. `/workspace/MVP.md` — V1 scope, shelved features, build order
3. `/workspace/.impeccable.md` — audience, voice, aesthetic direction,
   principled font exceptions
4. `/workspace/DESIGN.md` — palette tokens, type scale, component rules,
   contrast ratios

Then read one existing screen (e.g. `RecipeDetail.astro`) as a template and
`flows.ts` to see the data model. After this you can propose.

If any of the four files is missing or empty, STOP and tell the user —
those are the brand ground truth; without them you will produce generic
AI output.

---

## The mental model

- **Flow**: a sequence of screens walking the user through a journey
  (e.g. "The first recipe" — nine screens from welcome to saved edit).
- **Screen**: one iPhone composition. Reusable across flows. The same
  `LibraryOneRecipe` can appear in an import flow and a make-a-book flow.
- **Atom**: a sub-screen component used inside multiple screens
  (AppHeader, RecipeRow, IngredientsList, MethodList).
- **Tap marker**: a blue annotation halo on the tap target that advances
  the flow to the next screen. Not product UI — design scaffolding.

Rendering contexts:
- **Canvas** (0.58× scale) — all phones in a flow rendered side-by-side
  at `/design/` and `/design/flows/[slug]/`. Tap markers ON.
- **Stage** (1× scale) — a single screen for inspection at
  `/design/screens/[slug]/`. Tap markers OFF.

Each screen component accepts a `showTap?: boolean` prop. `FlowStoryboard`
passes `showTap={true}` in canvas context; 1× stage pages don't pass it
(defaults to false).

---

## File layout (where everything lives)

```
web/src/lib/design/
  flows.ts                 — flow registry (THE data model; single source of truth)
  sample-recipe.ts         — continuity data used by recipe flows (V+)

web/src/components/design/
  PhoneFrame.astro         — 393×852 iPhone 15 Pro shell
  StatusBar.astro          — 9:41 + Dynamic Island + signal/wifi/battery
  HomeIndicator.astro      — the 134×5 pill
  ScreenStage.astro        — 1× wrapper for stage pages
  FlowStoryboard.astro     — horizontal canvas renderer + screen registry
  screens/                 — one file per screen (e.g. WelcomeScreen.astro)
  ui/                      — cross-screen atoms (AppHeader, RecipeRow, …)

web/src/pages/design/
  index.astro              — root; renders every flow inline
  flows/[slug].astro       — one flow in isolation, same content
  screens/[slug].astro     — one screen at 1× inside a ScreenStage

web/src/layouts/DesignLayout.astro  — binder-only layout (noindex, topbar, toggle script)
web/src/styles/design.css            — binder tokens, canvas, --annotation
```

---

## The eight-step process

Do these in order. Do not skip to step 5 because "I can see what to build."
Scope and review steps are what keep the work aligned.

### 1. Understand the ask

- What does the user want? New flow, additional screens on an existing flow,
  iteration on existing mockups, or a new type of binder surface entirely?
- Read the four ground-truth files above if you haven't this session.
- Read `flows.ts` to see what's already drawn.
- Read one comparable existing screen to calibrate voice.

### 2. Negotiate scope (before code)

Produce a **screen inventory plan** and present it for approval. Include,
per screen:

- Numeral (I, II, III, …)
- Name (e.g. "Library · empty", "Recipe · saved")
- Surface (cream / sage / neutral)
- Note — the director's caption for the storyboard
- Tap — what the user taps to advance to the next screen
- tapExternal — true if the handoff leaves the app (e.g. to Safari)

Also call out: device (iPhone 15 Pro assumed), fidelity (gradient placeholder
vs real photos), which atoms you'll reuse vs create new, and where to pause
for review.

**Do not start building until the inventory is confirmed.** Pattern from
the actual work: "Flow I proposed 9 screens; we agreed; I built."

### 3. Stand up framing (only if new binder or major surface)

If PhoneFrame/DesignLayout/design.css already exist (they do for Hearth),
skip to step 4.

For genuinely new surfaces (e.g. an iPad variant, a watch variant):
build the frame, chrome, layout, and one stub screen, then **pause for
chrome review**. Don't build 9 screens against an unvetted phone.

### 4. Build atoms as needed

- Reuse first. Existing atoms: `AppHeader` (wordmark + title variants),
  `RecipeRow`, `IngredientsList`, `MethodList`, `HearthAppIcon`,
  `SafariChrome`.
- Only extract a NEW atom if it will appear in ≥2 screens. Inline the rest.
- New atoms live at `web/src/components/design/ui/[Name].astro`.
- Atoms use Hearth's tokens (see DESIGN.md §2-3 and design.css).

### 5. Build screens one at a time

- One file per screen at `web/src/components/design/screens/[Name].astro`.
- Every screen MUST accept `showTap?: boolean` prop, even if it doesn't
  use it (registry consistency).
- Screens with a tap target render a blue halo when `showTap` is true.
  See "Annotation layer" below.
- Inside the screen: no PhoneFrame (the storyboard adds it). Structure
  the content directly with grid-template-rows to fill the 393×852 screen.
- Reserve 62px top for the status bar, 44px bottom for the home indicator.
- Use the design voice library (next section).

**Pause after 2-3 screens for user review.** Do not silently build 9
screens and hand back a wall.

### 6. Wire each screen in (the 5 mechanical steps)

Per screen:

1. Add the render key to the `ScreenRender` union in `flows.ts`.
2. Add/update the step entry in the flow's `steps` array — fill `render`,
   `screenSlug`, `tap`, optionally `tapExternal`, `surface`.
3. Import + register the component in `FlowStoryboard.astro`'s
   `screenComponents` map.
4. Create `web/src/pages/design/screens/[slug].astro` — the 1× stage page
   wrapping `ScreenStage > PhoneFrame > [Screen]`.
5. **Alias the import in the 1× page** — e.g.
   `import LibraryEmptyScreen from "~/components/design/screens/LibraryEmpty.astro"`.
   Astro throws "import conflicts with local declaration" if you use the
   bare component name, because the page file itself shares the route name.

### 7. Apply design voice — every time

The recurring typographic and spatial moves that make the binder feel like
Hearth. See the full voice library below.

### 8. Ship quality

- Run `bun run typecheck`. Zero errors, zero warnings.
- Visit each screen at 1× and confirm it reads as a cookbook page.
- Visit `/design` and confirm the flow reads left-to-right.
- Toggle tap markers off; confirm halos + caption chips disappear cleanly.
- Refresh with markers off; confirm no flash.

---

## Design voice library (recurring moves)

Apply these without needing to re-derive them from DESIGN.md each time.

### Surface choice (cream vs sage vs neutral)

Ask: **cover or page?**
- **Sage (`--c-conifer`)**: welcome, covers, hero moments, celebration
  states, final CTA bands. Gold-foil wordmark + Foil Light accents.
- **Cream (`--c-cream`)**: library, recipe detail, edit, make-a-book
  preview, every interior. Deep Ochre accents on Warm Charcoal.
- **Neutral white**: external content only (Safari article, email
  clients, third-party services). Not Hearth — system fonts deliberately.

### Top of screen

Two canonical patterns:

**Wordmark nav** (library/home surfaces):
- HEARTH in Marcellus, 22px, 0.16em tracking, centered, Deep Conifer on cream
- Below: 28×1px ochre rule
- Below: DM Sans 500 small-caps eyebrow ~9.5px, 0.28em tracking, Deep Ochre
- 62px top padding for status bar clearance

**Title nav** (detail/edit surfaces):
- 32×32px back chevron (`‹`) left, Warm Charcoal
- Centered quiet title in Lora 17px (or empty for full-bleed hero screens)
- Right action ("Edit", "Done", "Save", "+") in DM Sans 500 14px, Deep Ochre
- 62px top padding

Use `AppHeader` atom; pass variant="wordmark" or "title", plus
`tapAction={showTap}` when the right action is the tap target.

### Chapter-opener (empty states, section openers)

Typographic only. No illustration, no icon, no plus button. Structure:

1. `44×1.5px` Deep Ochre rule, centered
2. Small-caps eyebrow like "I · BEGINNING" — DM Sans 500, 10px, 0.3em
3. Lora italic title, ~30px, text-wrap: balance, max-width 30ch
4. Lora italic teaching line, ~13.5px, max-width 28ch, Ash

Example: `"The beginning of a library." / "Share a recipe from Safari,
TikTok or Instagram to set the first page."`

### Folio (bottom-of-page marker)

`— page 1 —`, `— page 1 · version ii —`, or `— page one —` for empty states.
- Lora italic 12.5px, centered, Deep Ochre, letter-spacing 0.02em
- 10px padding

### Step markers

Italic lowercase Roman numerals: `i. ii. iii. iv. v.`
- Lora italic 14px, Deep Ochre (or Foil Light on sage)
- Use `MethodList` atom. If inline, use the `toRoman()` helper pattern
  from `MethodList.astro`.

### Meta line (recipe meta, etc.)

em-middot separators with italic emphasis on key terms:
```html
<em>Serves 4</em> · <em>50 minutes</em> · <em>One pan</em>
```
- Base: Lora 13px Ash
- `em`: italic, color Warm Charcoal (or Deep Ochre for edit markers)

### Source badge

The "from table.kitchen" badge pattern — small ochre-tint background chip,
eyebrow "FROM" + italic domain. See `ImportPreview.astro`'s `.from-card`.

### Recipe hero (photography placeholder)

Warm gradient (standing in for real photography):
```css
background: radial-gradient(ellipse at 32% 34%, #f7dd95 0%, #d6a34e 42%, #7f5219 100%);
```
Plus a diagonal-weave overlay via `::before` and a bottom scrim via
`::after`. See `RecipeDetail.astro`'s `.detail__hero` as canonical.

Aspect ratios:
- 5:4 — full detail view
- 4:3 — import preview / import extension
- 16:7 — compact edit view (so the edit form dominates)

### Edit affordance

Inline, never a separate form screen:
- Target becomes a bordered textarea/input on white
- Border 1px default; Warm Charcoal on focus
- Box-shadow glow `0 0 0 3px rgba(122, 90, 38, 0.18)` for focus presence
- A tiny implied caret (decorative only) is a nice touch — see
  `RecipeEdit.astro`'s `.method__caret`

### Motion

- All state transitions: `var(--motion-state)` (280ms) with `var(--ease-state)` (plain ease)
- The only allowed delight: `transform: translateX(3px)` on chevrons on hover
- No springs, no bounces, no overshoot
- Respect `prefers-reduced-motion: reduce` — disable all transitions

---

## Hearth's hard bans (inside product UI)

Inside any `[Screen].astro` component — never:

- ❌ Blue, red, purple, or any saturated accent color. Alert Rust
  (`#A55C2B`) is the only warm exception, destructive only.
- ❌ `border-left` or `border-right` ≥ 2px as a decorative accent stripe.
- ❌ Pure black (`#000`) or pure white (`#fff`). Always tinted.
- ❌ Gradient text (`background-clip: text`).
- ❌ Bold weight for hierarchy. Use size + color + face.
- ❌ Any font besides **Marcellus** (wordmark only), **Lora**, **DM Sans**.
  No Inter, Roboto, Fraunces, Playfair, Cormorant, Plus Jakarta, Space
  Grotesk, Outfit, or anything else — the trio is locked and documented
  as a principled exception to impeccable's reflex list.
- ❌ Pill radii on containers. Pills = buttons only. Containers = 2px.
- ❌ Rounded-icon-above-heading templated layouts.
- ❌ Bouncy / elastic motion.
- ❌ Glass-morphism, neon glows, cyan-on-dark, purple-to-blue gradients.
- ❌ Emoji. Anywhere.
- ❌ Tutorials, tooltips, walkthroughs, onboarding coach-marks.
- ❌ "Nothing here yet" empty states. Always a typographic chapter-opener.

---

## Annotation layer contract (blue scaffolding)

The binder has a SECOND visual layer — flow annotations — that is
intentionally OUTSIDE Hearth's palette so it reads as "meta," never as
product UI.

- Color: `var(--annotation)` = `#0d99ff` (Figma-style blue)
- Glow: `var(--annotation-glow)` = box-shadow with blue rgba
- Master opacity: `var(--halo-opacity)` (1 when markers on, 0 when off)
- z-index on all halos: `50`
- All halos: 3px solid border, `::after` pseudo-element, `opacity:
  var(--halo-opacity)`, `transition: opacity 180ms ease`
- All halos are `pointer-events: none` so they don't block taps

The topbar toggle flips `html.no-tap-halos` which retargets
`--halo-opacity` to 0 and collapses caption chips with `display: none`.

**Rules:**
- Never use `var(--annotation)` inside real product UI (it pollutes the
  scaffolding/product separation)
- Never use Hearth palette colors for the halos (they'll blend in — that
  was the exact mistake we fixed)
- Every screen's halo ::after rule MUST include `opacity:
  var(--halo-opacity); transition: opacity 180ms ease; z-index: 50`
  or the toggle won't work and other content will stack over it.

---

## The 5 mechanical traps

1. **Import-name collision in page files.** Astro treats the file's
   default component name as a local identifier. A page at
   `pages/design/screens/library-empty.astro` can't `import LibraryEmpty
   from ...` because that conflicts. Always alias:
   `import LibraryEmptyScreen from "~/components/design/screens/LibraryEmpty.astro"`.

2. **Missing `showTap` prop.** FlowStoryboard passes `showTap={true}` to
   every registered component. TypeScript errors if the component doesn't
   declare the prop. Even screens with no halo target must declare
   `interface Props { showTap?: boolean }` (use `void Astro.props` to
   acknowledge intent).

3. **Forgotten `ScreenRender` union update.** Adding a new screen without
   extending the `ScreenRender` union in `flows.ts` makes the registry
   type-unsafe. The registry is typed `Record<ScreenRender, any>`; missing
   keys = registry incomplete.

4. **Annotation color drift.** Any halo that doesn't use `var(--annotation)`
   breaks the toggle. Any halo missing `opacity: var(--halo-opacity)`
   doesn't respond to the toggle. Any halo missing `z-index: 50` can get
   covered by later siblings (we hit this — Ben had to ask twice).

5. **Scoped CSS specificity.** Astro `<style>` blocks are scoped via
   `data-astro-cid-xxx` attributes — they have slightly higher specificity
   than unscoped global rules. Don't try to override scoped rules from
   `design.css` without matching specificity. Instead, expose a CSS
   variable the scoped rule reads (like `--halo-opacity`) and flip the
   variable globally.

---

## When to ask vs decide

**Ask the user** — these carry brand / scope implications:
- Which flow, which order, how many screens
- Device / fidelity assumptions (iPhone 15 Pro? Real photos or gradient?)
- Copy choices for CTAs, titles, folios, eyebrows (brand voice is load-bearing)
- Iconography — default is "none / typographic-only"
- Major IA decisions (where a screen lives, how users navigate)
- Any exception to a hard ban (new font, accent color, emoji)

**Decide yourself** — these are craft within established boundaries:
- Spacing, rhythm, hierarchy within a single screen
- Which atom to reuse vs which to inline
- Typography tier selection per element
- Whether a surface needs a folio
- Empty-state copy (propose in your draft, user confirms implicitly)
- Sample content within the archetype (Ben's girlfriend — warm,
  farmers-market-y, not tech-bro meal prep)
- Color token choice within the existing palette

---

## Review rhythm

Mirror how real design conversations go. Never build a 9-screen flow
silently and hand back a PR.

1. **Plan approved** — screen inventory confirmed before any code.
2. **Framing review** — if you stood up new chrome, pause after 1 stub
   screen renders correctly.
3. **Voice check** — after 2-3 screens. Is the design voice landing?
   Adjust copy, spacing, or typographic choices based on feedback.
4. **Flow continuity check** — after all screens are drawn. Does the
   sequence make sense? Does continuity data (recipe, user name, etc.)
   thread through correctly?
5. **Annotation + polish pass** — tap markers, toggle, typecheck, final
   look at canvas + 1× views.

---

## Quick reference — adding one new screen

Copy-paste workflow:

```
1. Read the four ground-truth files (if not read this session).
2. Read flows.ts + one existing screen as template.
3. Propose: numeral, name, surface, note, tap, tapExternal, render-key.
   Wait for approval.
4. Create web/src/components/design/screens/[Name].astro
   - interface Props { showTap?: boolean }
   - Implement screen content; add halo ::after on tap target with
     --annotation, --halo-opacity, z-index: 50
5. Update web/src/lib/design/flows.ts
   - Add render-key to ScreenRender union
   - Add step entry in the flow (numeral, name, note, render, screenSlug, tap)
6. Update web/src/components/design/FlowStoryboard.astro
   - Import the component
   - Register in screenComponents map
7. Create web/src/pages/design/screens/[slug].astro
   - Import with alias (e.g. WelcomeScreen → WelcomeScreenPage not Welcome)
   - Wrap in DesignLayout > ScreenStage > PhoneFrame > [Screen]
8. bun run typecheck → clean
9. Review visually at 0.58× on /design and at 1× on /design/screens/[slug]
10. Hand back; pause for user review before next screen.
```

---

## Quick reference — adding one new flow

```
1. Read ground-truth files; read existing flows.ts.
2. Propose full screen inventory for the flow (all 8 fields per step). Wait.
3. For each screen: follow "adding one new screen" above.
4. The flow's data entry in flows.ts appears in /design automatically.
5. The deep-link route web/src/pages/design/flows/[slug].astro is a small
   wrapper: DesignLayout > FlowStoryboard flow={getFlow(slug)}.
6. Review full flow end-to-end; confirm continuity data, tap handoffs,
   and surface choices.
```

---

## What done looks like

- Typecheck clean.
- Every screen at 1× passes the book-spine test: could you crop it,
  print it, bind it, and have no one know it was an app first?
- The flow at 0.58× reads left-to-right without captions — the
  screens themselves tell the story.
- Tap markers off: the binder reads like a typographic cookbook
  mockup gallery, no UI scaffolding visible.
- No border-left, no saturated accents, no emoji, no bouncy motion,
  no "Inter." Font trio is Marcellus / Lora / DM Sans, nothing else.
- Ben would show his girlfriend the cookbook-page screen and not need
  to explain anything.
