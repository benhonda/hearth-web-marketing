---
name: hearth-binder
description: Build and iterate on iPhone-mockup flows for the Hearth recipe app inside the marketing Astro app at /workspace/web/src/pages/design/*. Use when the user asks to mock a new flow, add screens, replace Figma with real rendered mockups, or iterate on existing screens in the design binder. Handles the full job — scope negotiation, framing, per-screen design, brand consistency, mechanical wiring, and iterative review — not just the last-mile registry work.
version: 1.1.1
user-invocable: true
argument-hint: "[new-flow|add-screens|iterate]"
---

# Hearth Design Binder

This skill guides you through building iPhone-mockup flows for the Hearth
recipe app. The binder renders flows as horizontally-scrolling storyboards
of componentized screens, with tap markers, 1× inspection pages, and the
same typographic system as the printed cookbook.

**The job is bigger than adding a screen.** It is: understand the product,
negotiate scope, stand up framing if missing, design each screen to brand,
maintain consistency across the flow, wire everything in, iterate with the
user, and polish. Treat all eight stages as load-bearing.

---

## Source of truth — read BEFORE touching anything

There are THREE files that contain everything you need to make Hearth-
consistent design decisions. Read them, in this order, every time you
start a session on this skill:

1. **`/workspace/web/src/styles/tokens.css`** — THE brand book. Every
   color, type, spacing, radius, border, shadow, rule, motion, and
   focus-ring token the product uses, with rich comments explaining
   rationale and usage. Also contains the hard bans, component
   treatments, photography rules, layout rhythm, and UX-writing voice.

2. **`/workspace/PRODUCT.md`** — product positioning and voice: who
   Hearth is for (audience archetype, context of use, job-to-be-done,
   emotional goals), the three-word voice (literary · hand-made ·
   confident), voice rules (em-middot separator, no emoji/exclamation,
   confirm-with-a-noun), pro and anti references, the six load-bearing
   principles, what Hearth is NOT, and the validation ladder. Reach here
   for anything about audience, voice, or copy — not just positioning.

3. **`/workspace/MVP.md`** — V1 scope, shelved features, build order.
   Read this to know what's in and what's deferred before proposing
   screens for a flow.

Then read `flows.ts` (the binder's data registry) and at least one
existing screen component as a template.

### Precedence

`tokens.css` is authoritative for the visual system. When this skill's
guidance appears to contradict tokens.css, tokens.css wins — it ships.
If you find a discrepancy, flag it to the user; the skill gets updated,
not the tokens.

### If any source file is missing

Stop and surface it to the user. Do not guess the brand from the
codebase — you will produce generic AI output. Those files ARE the
brand.

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

## File layout

```
web/src/lib/design/
  flows.ts                 — flow registry (THE data model; single source of truth for flows)
  sample-recipe.ts         — continuity data used by recipe flows

web/src/components/design/
  PhoneFrame.astro         — 393×852 iPhone 15 Pro shell
  StatusBar.astro          — 9:41 + Dynamic Island + signal/wifi/battery
  HomeIndicator.astro      — the 134×5 pill
  ScreenStage.astro        — 1× wrapper for stage pages
  FlowStoryboard.astro     — horizontal canvas renderer + screen registry
  screens/                 — one file per screen (WelcomeScreen.astro, etc.)
  ui/                      — cross-screen atoms (AppHeader, RecipeRow, …)

web/src/pages/design/
  index.astro              — root; renders every flow inline
  flows/[slug].astro       — one flow in isolation, same content
  screens/[slug].astro     — one screen at 1× inside a ScreenStage

web/src/layouts/DesignLayout.astro  — binder-only layout (noindex, topbar, toggle script)
web/src/styles/design.css            — binder-only tokens + --annotation scaffolding color
```

---

## The eight-step process

Do these in order. Do not skip to step 5 because "I can see what to build."
The scope and review steps are what keep the work aligned with the brand.

### 1. Understand the ask

- What does the user want? New flow, additional screens on an existing
  flow, iteration on existing mockups, or a new type of binder surface?
- Read `tokens.css`, `PRODUCT.md`, `MVP.md` (if not this session).
- Read `flows.ts` to see what's already drawn.
- Read one comparable existing screen to calibrate voice.

### 2. Negotiate scope (before code)

Produce a **screen inventory plan** and present it for approval. Per screen:

- Numeral (I, II, III, …)
- Name (e.g. "Library · empty", "Recipe · saved")
- Surface (cream / sage / neutral) — see tokens.css §1 for the cover-vs-page rule
- Note — director's caption for the storyboard
- Tap — what the user taps to advance to the next screen
- tapExternal — true if the handoff leaves the app (e.g. to Safari)

Also call out: device (iPhone 15 Pro assumed), fidelity (gradient
placeholder vs real photos), which atoms you'll reuse vs create new, and
where to pause for review.

**Do not start building until the inventory is confirmed.**

### 3. Stand up framing (only if missing)

If PhoneFrame / DesignLayout / design.css already exist (they do for
Hearth), skip to step 4.

For genuinely new surfaces (iPad, watch): build the chrome, layout, and
one stub screen, then **pause for chrome review**. Don't build 9 screens
against an unvetted phone.

### 4. Build atoms as needed

- Reuse first. Existing atoms: `AppHeader` (wordmark + title variants),
  `RecipeRow`, `IngredientsList`, `MethodList`, `HearthAppIcon`,
  `SafariChrome`.
- Only extract a NEW atom if it will appear in ≥2 screens. Inline the rest.
- Atoms use Hearth's tokens (see `tokens.css`). Never hardcode colors,
  fonts, pixels, or ms values that have a token.

### 5. Build screens one at a time

- One file per screen at `web/src/components/design/screens/[Name].astro`.
- Every screen MUST accept `showTap?: boolean` prop (registry consistency).
- Screens with a tap target render a blue halo when `showTap` is true.
  See "Annotation layer" below.
- No PhoneFrame inside the screen — the storyboard adds it. Structure
  the content to fill 393×852 directly. Reserve 62px top for status bar,
  44px bottom for home indicator.
- Consult `tokens.css` for every visual decision. The component
  treatments block there (buttons, cards, inputs, nav, layout rhythm,
  photography) covers nearly every pattern you'll need.

**Pause after 2–3 screens for user review.** Don't silently build nine
screens and hand back a wall.

### 6. Wire each screen in — the 5 mechanical steps

Per screen:

1. Add the render key to the `ScreenRender` union in `flows.ts`.
2. Add/update the step entry in the flow's `steps` array — fill
   `render`, `screenSlug`, `tap`, optionally `tapExternal`, `surface`.
3. Import + register the component in `FlowStoryboard.astro`'s
   `screenComponents` map.
4. Create `web/src/pages/design/screens/[slug].astro` — the 1× stage
   page wrapping `ScreenStage > PhoneFrame > [Screen]`.
5. **Alias the import in the 1× page** — e.g.
   `import LibraryEmptyScreen from "~/components/design/screens/LibraryEmpty.astro"`.
   Astro throws "import conflicts with local declaration" if you use the
   bare component name.

### 7. Design voice — apply every time

Every visual decision should trace to `tokens.css`. Common recurring
moves and their location in that file:

- Surface choice (cover vs page) → §1 palette intro
- Wordmark-nav vs title-nav patterns → Component Treatments block
- Chapter-opener rhythm (chapter-mark → rule → title → lede → sections → folio) → Layout Rhythm
- Roman-numeral step markers (i. ii. iii.) → §2 character rules
- em-middot meta lines ("Serves 4 · 50 min") → Visual Copy / UX Writing
- Folio patterns ("— page 1 · version ii —") → §2 character rules
- Photography (two places only, scrim pattern, no AI enhancement) → Component Treatments
- Motion (280ms ease, one chevron nudge, reduced-motion) → §8 motion

If a pattern isn't in tokens.css but you end up inventing it for a
screen, flag it to the user — it may belong IN tokens.css.

### 8. Ship quality

- Run `bun run typecheck` from `/workspace/web` (not repo root — the
  typecheck script only exists in `web/package.json`). Zero errors, zero
  warnings.
- Visit each screen at 1× and confirm it reads as a cookbook page.
- Visit `/design` and confirm the flow reads left-to-right.
- Toggle tap markers off; confirm halos + caption chips disappear cleanly.
- Refresh with markers off; confirm no flash.

---

## Annotation layer contract (binder-specific)

The binder has a SECOND visual layer — flow annotations — that is
intentionally OUTSIDE Hearth's palette so it reads as "meta," never as
product UI. This is the one place where a non-Hearth color (bright
Figma-ish blue) is not only allowed but required.

- Color: `var(--annotation)` = `#0d99ff`, defined in `design.css`
- Glow: `var(--annotation-glow)` = box-shadow with blue rgba
- Master opacity: `var(--halo-opacity)` (1 when markers on, 0 when off)
- z-index on all halos: `50`
- All halos: 3px solid border, `::after` pseudo-element, `opacity:
  var(--halo-opacity)`, `transition: opacity 180ms ease`
- All halos are `pointer-events: none` so they don't block taps

The topbar toggle flips `html.no-tap-halos`, retargeting
`--halo-opacity` to 0 and collapsing caption chips with `display: none`.

**Rules:**
- Never use `var(--annotation)` inside product UI (it pollutes the
  scaffolding/product separation).
- Never use Hearth palette colors for halos (they'll blend in — we've
  hit this).
- Every halo `::after` rule MUST include `opacity:
  var(--halo-opacity); transition: opacity 180ms ease; z-index: 50`,
  or the toggle won't work and other content will stack over the halo.

---

## The 5 mechanical traps

1. **Import-name collision.** Astro treats the page file's name as a
   local identifier. A page at `pages/design/screens/library-empty.astro`
   can't `import LibraryEmpty from ...` because the route name conflicts
   with the import. Always alias:
   `import LibraryEmptyScreen from "~/components/design/screens/LibraryEmpty.astro"`.

2. **Missing `showTap` prop.** FlowStoryboard passes `showTap={true}`
   to every registered component. TypeScript errors if the component
   doesn't declare the prop. Even screens with no halo target MUST
   declare `interface Props { showTap?: boolean }` (use `void Astro.props`
   to acknowledge intent).

3. **Forgotten `ScreenRender` union update.** Adding a new screen
   without extending the `ScreenRender` union in `flows.ts` makes the
   registry type-unsafe. The registry is typed `Record<ScreenRender, any>`.

4. **Annotation color drift.** Any halo that doesn't use
   `var(--annotation)` breaks the visual contract. Any halo missing
   `opacity: var(--halo-opacity)` doesn't respond to the toggle. Any
   halo missing `z-index: 50` can get covered by later siblings.

5. **Scoped CSS specificity.** Astro `<style>` blocks are scoped via
   `data-astro-cid-xxx` attributes — slightly higher specificity than
   unscoped global rules. Don't try to override scoped rules from a
   parent stylesheet without matching specificity. Expose a CSS
   variable the scoped rule reads (like `--halo-opacity`) and flip
   the variable globally.

---

## When to ask vs decide

**Ask the user** — carry brand / scope implications:
- Which flow, which order, how many screens
- Device / fidelity assumptions
- Copy choices for CTAs, titles, folios, eyebrows (voice is load-bearing)
- Iconography — default is "none / typographic-only"
- Major IA decisions (where a screen lives, how users navigate)
- Any exception to a hard ban in tokens.css (new font, accent color, emoji)

**Decide yourself** — craft within established boundaries:
- Spacing, rhythm, hierarchy within a single screen
- Which atom to reuse vs which to inline
- Typography tier selection per element
- Whether a surface needs a folio
- Empty-state copy (propose, then confirm)
- Sample content within the archetype (Ben's girlfriend — warm,
  farmers-market-y, not tech-bro meal-prep)
- Color token choice within the existing palette

---

## Review rhythm

Mirror how real design conversations go. Never build a 9-screen flow
silently and hand back a PR.

1. **Plan approved** — screen inventory confirmed before any code.
2. **Framing review** — if you stood up new chrome, pause after 1 stub
   screen renders.
3. **Voice check** — after 2–3 screens. Is the design voice landing?
   Adjust copy, spacing, or typographic choices based on feedback.
4. **Flow continuity check** — after all screens are drawn. Does the
   sequence make sense? Does continuity data (recipe, user name, etc.)
   thread through correctly?
5. **Annotation + polish pass** — tap markers, toggle, typecheck, final
   look at canvas + 1× views.

---

## Quick reference — add one new screen

```
1. Read tokens.css, PRODUCT.md, MVP.md (if not read this session).
2. Read flows.ts + one existing screen as template.
3. Propose: numeral, name, surface, note, tap, tapExternal, render-key.
   Wait for approval.
4. Create web/src/components/design/screens/[Name].astro
   · interface Props { showTap?: boolean }
   · Content uses tokens.css variables — never hardcoded values
   · Add halo ::after on tap target with --annotation, --halo-opacity,
     z-index: 50, transition: opacity 180ms ease
5. Update web/src/lib/design/flows.ts
   · Add render-key to ScreenRender union
   · Add step entry in the flow (numeral, name, note, render, screenSlug, tap)
6. Update web/src/components/design/FlowStoryboard.astro
   · Import the component
   · Register in screenComponents map
7. Create web/src/pages/design/screens/[slug].astro
   · ALIAS the import (e.g. WelcomeScreenPage, not Welcome)
   · Wrap in DesignLayout > ScreenStage > PhoneFrame > [Screen]
8. bun run typecheck → clean
9. Review visually at 0.58× on /design and at 1× on /design/screens/[slug]
10. Hand back; pause for user review before next screen.
```

---

## Quick reference — add one new flow

```
1. Read source-of-truth files + existing flows.ts.
2. Propose full screen inventory for the flow (all 8 fields per step).
   Wait for approval.
3. For each screen: follow "add one new screen" above.
4. The flow's data entry in flows.ts makes it appear on /design
   automatically.
5. The deep-link route web/src/pages/design/flows/[slug].astro is a
   thin wrapper: DesignLayout > FlowStoryboard flow={getFlow(slug)}.
6. Review full flow end-to-end; confirm continuity data, tap handoffs,
   and surface choices.
```

---

## What "done" looks like

- Typecheck clean.
- Every screen at 1× passes the book-spine test — could you crop it,
  print it, bind it, and have no one know it was an app first?
- The flow at 0.58× reads left-to-right without captions; the screens
  themselves tell the story.
- Tap markers off → the binder reads as a typographic cookbook mockup
  gallery, zero UI scaffolding visible.
- Every visual value traces back to a token in `tokens.css`. No
  hardcoded hexes, fonts, pixels, or ms values.
- No border-left, no saturated accents, no emoji, no bouncy motion,
  no "Inter." Font trio is Marcellus / Lora / DM Sans, nothing else.
- Ben would show his girlfriend the cookbook-page screen and not need
  to explain anything.
