/**
 * Flow definitions — single source of truth for /design/*.
 *
 * Each flow is a sequence of screens. Screens with a `render` key map to
 * a concrete screen component registered in `FlowStoryboard.astro`. Steps
 * without one render as "not yet drawn" placeholders.
 *
 * A step can carry one or more `branches` — secondary strips of screens
 * that live OFF the main line. Branch steps use `numeral: ""` (no numeral)
 * because they're not part of the numbered sequence; the storyboard draws
 * them as descending rows beneath the branch point, stacked vertically
 * when more than one branch attaches to the same step.
 */

export type Surface = "cream" | "sage" | "neutral";

export type ScreenRender =
  | "welcome"
  | "library-empty"
  | "import-surface"
  | "import-surface-pasted"
  | "mobile-safari-recipe"
  | "share-sheet"
  | "import-preview"
  | "library-one-recipe"
  | "recipe-detail"
  | "recipe-detail-tappable"
  | "recipe-detail-photo-tappable"
  | "recipe-detail-carousel"
  | "recipe-photo-gallery"
  | "recipe-detail-overlay"
  | "recipe-detail-scaled"
  | "recipe-edit-menu"
  | "recipe-photo-menu"
  | "recipe-source-sheet"
  | "photo-picker"
  | "recipe-edit"
  | "recipe-saved"
  | "library-populated"
  | "book-invitation"
  | "book-occasion"
  | "book-recipes"
  | "book-layout"
  | "book-title-cover"
  | "book-preview"
  | "book-page-edit"
  | "book-page-edit-pick-hero"
  | "book-preview-promoted"
  | "book-preview-hero-swapped"
  | "book-settings"
  | "book-title"
  | "book-subtitle"
  | "book-recipes-edit"
  | "book-review"
  | "book-on-its-way"
  | "recipe-detail-empty-note"
  | "recipe-note-compose"
  | "recipe-detail-with-note"
  | "recipe-note-edit"
  | "recipe-detail-expanded-note"
  | "recipe-detail-pre-comment"
  | "recipe-step-comment-menu"
  | "recipe-step-comment-compose"
  | "recipe-detail-step-commented"
  | "recipe-ingredient-comment-compose"
  | "recipe-detail-fully-annotated"
  | "recipe-detail-units"
  | "recipe-detail-units-picker"
  | "recipe-detail-in-grams"
  | "import-transcription"
  | "library-with-friends-doorway"
  | "circle-friends"
  | "shared-collection"
  | "recipe-with-credit-chain"
  | "library-after-friend-save"
  | "import-preview-photo";

export type FlowStep = {
  numeral: string;            // Roman numeral label — "I", "II", "III"; "" for branch steps
  name: string;               // e.g. "Recipe · detail" — eyebrow on both surfaces
  note: string;               // director's note — rendered verbatim on flow + detail page
  detailTitle?: string;       // poetic h1 shown only on /design/screens/[slug]
  surface?: Surface;          // phone screen background
  tone?: "ink" | "inverse";   // status-bar / home-indicator tint on dark-surface screens
  render?: ScreenRender;      // component key; absent = placeholder
  screenSlug?: string;        // /design/screens/[slug] — absent = not yet linkable
  tap?: string;               // human-readable handoff to the next screen (flow-only)
  tapExternal?: boolean;      // true = action leaves the app; no in-screen halo
  branches?: FlowBranch[];    // sub-flows descending from this step (rendered as stacked rows when more than one)
};

export type FlowBranch = {
  label: string;              // small-caps eyebrow over the sub-row, e.g. "Settings · sub-flow"
  steps: FlowStep[];          // same shape; typically numeral: "" so captions drop the numeral
};

export type Flow = {
  slug: string;               // e.g. "01-first-run-import"
  numeral: string;            // "I", "II", …
  title: string;
  lede: string;
  steps: FlowStep[];
};

export const flows: Flow[] = [
  {
    slug: "01-first-run-import",
    numeral: "I",
    title: "The first recipe.",
    lede:
      "Sign in, paste a recipe into Hearth, read it, scale it for tonight's table, edit a step, save. From the sage cover to a library of one — end to end.",
    steps: [
      {
        numeral: "I",
        name: "Welcome",
        detailTitle: "The cover.",
        note:
          "The only sage moment in the flow. Foil-stamped wordmark, Apple + Google, nothing else.",
        surface: "sage",
        render: "welcome",
        screenSlug: "welcome",
        tap: "Continue with Apple",
      },
      {
        numeral: "II",
        name: "Library · empty",
        detailTitle: "A library, waiting.",
        note:
          "Designed empty state, not a to-do — typography-only chapter opener with an italic-Ochre invitation at the foot. Tap is internal now: the invitation opens the Import surface inside the app. Rhymes with Flow III's 'When you're ready —' but stays one line so the chapter-opener above carries the editorial weight.",
        render: "library-empty",
        screenSlug: "library-empty",
        tap: "Tap — import a recipe →",
      },
      {
        numeral: "III",
        name: "Import · surface",
        detailTitle: "Bring a recipe home.",
        note:
          "The entry point. A textarea — not a single-line field — accepts whatever the cook hands it: a link, a recipe texted from a friend, a chunk pasted from Notes. The AI auto-detects what it got on submit. Below, a co-equal 'Scan a photo' doorway with an em-dash 'or' divider between — both options visible at once, the cook picks by acting. The halo lands on the textarea as the main-line continuation. Two sub-flows descend: the photo arc (source sheet → transcription gate → Import preview) and the share-sheet path off Safari (an alternate doorway from outside the app, also landing at the Import preview).",
        render: "import-surface",
        screenSlug: "import-surface",
        tap: "Paste a recipe",
        branches: [{
          label: "Photo · sub-flow",
          steps: [
            {
              numeral: "",
              name: "Source sheet",
              detailTitle: "The OS takes over.",
              note:
                "Native iOS action sheet for the new-recipe path — Take Photo · Choose from Library · Cancel. Same OS sheet Flow IV uses for the photo-add arc; here it opens after the cook taps 'Scan a photo' on the import surface. Hearth doesn't reskin platform pickers; voice lives in what comes next.",
              render: "recipe-source-sheet",
              tap: "Choose from Library",
            },
            {
              numeral: "",
              name: "Photo · transcription gate",
              detailTitle: "Word for word, first.",
              note:
                "The new screen between photo capture and the structured preview. Hearth's vision pipeline transcribes the source verbatim — no restructuring, no reordering — and the cook reviews the transcription against the original photo before the AI structures it. Two failure modes are separated: transcription errors (handled in this gate), structure errors (handled at the Import preview). Heirloom photos carry a structurally worse OCR baseline; this is where Hearth earns its trust on hard inputs. Dotted-Ochre underlines mark low-confidence words. Continue commits the transcription and lands the cook on the photo-variant Import preview.",
              render: "import-transcription",
              screenSlug: "import-transcription",
              tap: "Continue",
            },
            {
              numeral: "",
              name: "Structured edit · from photograph",
              detailTitle: "The artifact kept, structured.",
              note:
                "Same structured-edit grammar as the main-line V, but the page leads with the source artifact — paper-warmth gradient with subtle ruling, standing in for the cook's photograph of the handwritten card. Italic Lora caption beneath: 'from your photograph.' The From-URL chip falls away (the hero IS the source attribution). Recipe content matches the transcription gate — Grandma's Corn Ragu, serves 4, no minutes (handwritten cards rarely carry one). The Notes block arrives populated with what the AI extracted from the card ('From Grandma Ruth's recipe box.'); the cook adds her voice underneath as she returns over time. The basil line uses the combobox's free-text mode ('small handful'), and an AI-extracted margin note rides under it ('grandma was heavier-handed'). Save commits the recipe to the library; the original photo stays attached forever as the source of truth the cook can always return to.",
              render: "import-preview-photo",
              screenSlug: "import-preview-photo",
              tap: "Save",
            },
          ],
        }, {
          label: "Share sheet · sub-flow",
          steps: [
            {
              numeral: "",
              name: "Mobile Safari · article",
              detailTitle: "The open internet.",
              note:
                "Alternate entrance — the cook is reading a recipe on the web. The ochre halo marks where the share tap happens; the iOS share sheet (next) leads back to the Import preview on the main line.",
              surface: "neutral",
              tone: "ink",
              render: "mobile-safari-recipe",
              screenSlug: "mobile-safari-recipe",
              tap: "Safari share button",
            },
            {
              numeral: "",
              name: "Share sheet",
              detailTitle: "The handoff.",
              note:
                "iOS share sheet over the dimmed article. Hearth halo'd as the destination. The handoff lands the cook back at the Import preview on the main line — same screen, different doorway.",
              tone: "ink",
              render: "share-sheet",
              screenSlug: "share-sheet",
              tap: "Hearth app",
            },
          ],
        }],
      },
      {
        numeral: "IV",
        name: "Import · surface, pasted",
        detailTitle: "A recipe, just pasted.",
        note:
          "Same composition as III with a chunk of pasted recipe text filling the textarea — the kind a friend might text. The 'Scan a photo' doorway falls away once the cook has committed to the paste path. A full-width Foil-Light Primary pill — same grammar as Flow III's 'Send to Hearth Press' — appears below the textarea, halo'd as the next tap. The next tap lands in the Import preview where Hearth has already extracted the recipe in its own voice.",
        render: "import-surface-pasted",
        screenSlug: "import-surface-pasted",
        tap: "Tap Import",
      },
      {
        numeral: "V",
        name: "Import · structured edit",
        detailTitle: "Extracted, made yours.",
        note:
          "The shared destination for all three import doorways. Looks like the cookbook page it'll become; every field is inline-editable. Title in Lora display (no form-field box). Serves N and minutes carry quiet dotted-Ochre underlines that signal editability without form chrome. Notes block sits between meta and ingredients — empty here as an invitation; it arrives populated on the photo path. Ingredients render as a type-aware trio per line: qty (dotted underline) · unit (dotted underline + ▾ — combobox grammar accepting standard units AND 'pinch', 'small handful', 'to taste') · name (plain text). The 'Olive oil, salt, black pepper' line shows the no-quantity case. Method steps render in the existing italic-Roman grammar with mise lines; AI-extracted inline comments arrive populated where the source carried marginalia (here: 'Cultured if I have it.' on the miso line). Save commits the recipe to the library.",
        render: "import-preview",
        screenSlug: "import-preview",
        tap: "Save",
      },
      {
        numeral: "VI",
        name: "Library · one recipe",
        detailTitle: "A library of one.",
        note: "The emotional payoff. A library of one. Same header, same folio.",
        render: "library-one-recipe",
        screenSlug: "library-one-recipe",
      },
    ],
  },
  {
    slug: "02-recipe-actions",
    numeral: "II",
    title: "The page, lived in.",
    lede:
      "The cookbook page is alive. From a single resting view, five things the cook does to it — scaling tonight's portions, editing a step, writing in the margin, leaving a comment beside an ingredient, switching cups for grams. Each is its own sub-flow off the same page.",
    steps: [
      {
        numeral: "I",
        name: "Recipe · detail",
        detailTitle: "The page at rest.",
        note:
          "The springboard. Hero photo, Lora title, ingredients eyebrow with serves 4 on the left and IN CUPS on the right, method set in Roman numerals. No halo on the main line — every halo lives on the first cell of each sub-flow below, where the cook's specific gesture (tap serves, long-press a step, tap the notes invitation, long-press for comment, tap IN CUPS) is taught in context. Five sub-flows fan beneath this one page; together they are how the cook lives in it.",
        render: "recipe-detail",
        screenSlug: "recipe-detail",
        branches: [
          {
            label: "Scale · sub-flow",
            steps: [
              {
                numeral: "",
                name: "Recipe · detail",
                detailTitle: "The cookbook page.",
                note: "The cookbook-page moment. Hero photo, Lora title, method set in Roman numerals. The Ingredients eyebrow reads INGREDIENTS · serves 4, with 'serves 4' typeset as an inline-link cross-reference (Lora italic Ochre, 1px ochre underline). The ochre halo marks it as the next tap.",
                render: "recipe-detail-tappable",
                screenSlug: "recipe-detail-tappable",
                tap: "Tap serves 4",
              },
              {
                numeral: "",
                name: "Portion · overlay",
                detailTitle: "A theatrical dim-down.",
                note: "The dreamy moment. The page lightens under a cream wash and blurs behind, and the scale strip floats centered in the viewport — '— 2 · 4 · 6 · 8 · 12 —'. The current yield (4) sits currently-selected and larger, carrying the chapter-rule hairline beneath. The ochre halo lands on 8 as the next tap. No card, no border, no pill — the blur is the container. Scale is a lens over a fixed recipe; no Save.",
                render: "recipe-detail-overlay",
                screenSlug: "recipe-detail-overlay",
                tap: "Tap 8",
              },
              {
                numeral: "",
                name: "Recipe · detail, scaled",
                detailTitle: "Tonight's a double batch.",
                note: "The page quietly rerendered at serves 8 — ingredient quantities and each method step's mise doubled. Step TEXT is unchanged; timing and pan cues are cook judgment, not math. The lens has done its work.",
                render: "recipe-detail-scaled",
                screenSlug: "recipe-detail-scaled",
              },
            ],
          },
          {
            label: "Edit · sub-flow",
            steps: [
              {
                numeral: "",
                name: "Recipe · long-press menu",
                detailTitle: "The long-press menu.",
                note: "Long-press on a step opens an iOS-style context menu. The page blurs and dims; step iv is plucked above the dim layer with a soft shadow; a quiet two-row menu — Edit · Delete — floats below. This is the discoverability answer: there is no Edit button, long-press is the single entry point.",
                render: "recipe-edit-menu",
                screenSlug: "recipe-edit-menu",
                tap: "Edit",
              },
              {
                numeral: "",
                name: "Recipe · editing step iv",
                detailTitle: "Editing step iv.",
                note: "Inline edit — step iv is swapped for a live textarea inside the recipe page, '8 minutes' updated to '10–12 minutes.' The page stays put so the cook keeps their bearings; the iOS keyboard is docked at the foot. Save commits the change; Cancel discards.",
                render: "recipe-edit",
                screenSlug: "recipe-edit",
                tap: "Save",
              },
              {
                numeral: "",
                name: "Recipe · saved",
                detailTitle: "The book, quietly changed.",
                note: "Same page, quietly updated. Step iv now reads '10–12 minutes.' No celebration, no banner — the book-spine test holds.",
                render: "recipe-saved",
                screenSlug: "recipe-saved",
              },
            ],
          },
          {
            label: "Notes · sub-flow",
            steps: [
              {
                numeral: "",
                name: "Recipe · empty block",
                detailTitle: "The margin, waiting.",
                note:
                  "The onboarding moment. Notes live as a peer section to Ingredients and Method, placed BETWEEN meta and ingredients — reading order is author's voice → cook's voice → what you need → how to make it. The block is empty, so the section carries only the eyebrow and the typographic invitation '— add a note —' in italic Ochre, mirroring Flow III's 'When you're ready to make these into a book —' grammar. The halo lands on the invitation.",
                render: "recipe-detail-empty-note",
                screenSlug: "recipe-detail-empty-note",
                tap: "Tap — add a note —",
              },
              {
                numeral: "",
                name: "Notes · compose",
                detailTitle: "Writing in the margin.",
                note:
                  "The invitation is replaced in place by an empty textarea, high in the body between meta and ingredients. No field border, hairline underline only — the voice is a cookbook margin, not a form. Cancel (tertiary Ash) · Save (Ochre) floats to the right under the textarea. iOS keyboard docks at the foot; the page auto-scrolls the textarea into the visible band above it. Save is halo'd as the handoff. Apple Notes grammar — the cook types whatever they want, no metadata imposed.",
                render: "recipe-note-compose",
                screenSlug: "recipe-note-compose",
                tap: "Tap Save",
              },
              {
                numeral: "",
                name: "Recipe · with note",
                detailTitle: "One voice in the margin.",
                note:
                  "The page quietly updated. The block now shows the cook's first voice — 'Halved the salt — nicer balance.' — as one Lora italic paragraph. No chrome, no date, no per-note affordance. Tap anywhere on the block to reopen the editor; the whole block is halo'd as the handoff. Weeks later, the cook returns to add more.",
                render: "recipe-detail-with-note",
                screenSlug: "recipe-detail-with-note",
                tap: "Tap the note",
              },
              {
                numeral: "",
                name: "Notes · edit",
                detailTitle: "Coming back to the margin.",
                note:
                  "The same editor surface as compose, now populated with the note's current text. Cook is about to add the memory-note — '— Sam's 30th. Doubled it. Everyone wanted seconds. —' — into the same block, flowing after the first voice. Same hairline underline, same Cancel/Save grammar. Save halo'd as the handoff. The block is one note that grows, not a list of notes.",
                render: "recipe-note-edit",
                screenSlug: "recipe-note-edit",
                tap: "Tap Save",
              },
              {
                numeral: "",
                name: "Recipe · expanded note",
                detailTitle: "Two voices in one block.",
                note:
                  "The close of the sub-flow. The block carries both voices in one continuous Lora italic body — the cook-note and the memory-note running together, no separation, no metadata between them. Apple Notes honest: one block, everything the cook wanted to remember. No halo — the sub-flow is done.",
                render: "recipe-detail-expanded-note",
                screenSlug: "recipe-detail-expanded-note",
              },
            ],
          },
          {
            label: "Line comments · sub-flow",
            steps: [
              {
                numeral: "",
                name: "Recipe · pre-comment",
                detailTitle: "The recipe, already yours.",
                note:
                  "Starting state. Picks up where the Notes sub-flow left off — the global Notes block already carries both voices ('Halved the salt — nicer balance. — Sam's 30th. Doubled it. Everyone wanted seconds. —'). No line-item comments yet. The halo lands on step iv — long-press opens the step menu.",
                render: "recipe-detail-pre-comment",
                screenSlug: "recipe-detail-pre-comment",
                tap: "Long-press step iv",
              },
              {
                numeral: "",
                name: "Step · long-press menu",
                detailTitle: "Comment, primary.",
                note:
                  "The same three-row context menu the Edit sub-flow uses, now with Comment as the first row and halo'd as the tap target. Edit is secondary (rare — it changes the recipe body); Delete tertiary. The Edit sub-flow halos Edit via the same shared component; the halo is the storyboard's overlay, not a UI state. Discoverability through gesture, not chrome.",
                render: "recipe-step-comment-menu",
                screenSlug: "recipe-step-comment-menu",
                tap: "Tap Comment",
              },
              {
                numeral: "",
                name: "Step · comment compose",
                detailTitle: "Writing beside the step.",
                note:
                  "A textarea opens beneath step iv, indented under the step's text column so it's visually anchored to what it annotates. Cancel · Save in the now-familiar grammar. Save halo'd. iOS keyboard docked; page auto-scrolls the textarea into the visible band above it. Same editor voice as Notes, smaller register — a pencil in the margin, not a form field.",
                render: "recipe-step-comment-compose",
                screenSlug: "recipe-step-comment-compose",
                tap: "Tap Save",
              },
              {
                numeral: "",
                name: "Recipe · step commented",
                detailTitle: "A voice next to step iv.",
                note:
                  "Step iv now carries an inline comment — '10–12 minutes — thickens better.' — in Lora italic Ash, indented under the step text. No chrome, no date, no ceremony. The cook moves on to the ingredients: the halo lands on the butter line, where the same long-press gesture repeats at ingredient scope.",
                render: "recipe-detail-step-commented",
                screenSlug: "recipe-detail-step-commented",
                tap: "Long-press butter",
              },
              {
                numeral: "",
                name: "Ingredient · comment compose",
                detailTitle: "Same grammar, smaller scope.",
                note:
                  "Same compose surface, this time beneath the butter line. Menu screen skipped — the long-press menu earlier in this sub-flow is the same menu for ingredients, and the binder doesn't need to teach it twice. Save halo'd.",
                render: "recipe-ingredient-comment-compose",
                screenSlug: "recipe-ingredient-comment-compose",
                tap: "Tap Save",
              },
              {
                numeral: "",
                name: "Recipe · fully annotated",
                detailTitle: "Megan's version.",
                note:
                  "The close of the sub-flow. Global note at the top carries both voices. Step iv carries its own. The butter line carries a comment beneath it — 'Cultured if I have it.' Nothing destroyed — the recipe body still reads as it was imported. What's on the page now is the personalization layer: the comments are what make a recipe that came from somewhere else into hers. This is the content the printed book will carry beyond the bare recipe — the proof-of-authorship that a library of saved URLs can't give you.",
                render: "recipe-detail-fully-annotated",
                screenSlug: "recipe-detail-fully-annotated",
              },
            ],
          },
          {
            label: "Measures · sub-flow",
            steps: [
              {
                numeral: "",
                name: "Recipe · in cups",
                detailTitle: "A measure on the right.",
                note:
                  "The canonical Summer Corn & Basil Ragù page at rest, with the empty right slot of the Ingredients eyebrow row now occupied — IN CUPS, the twin of serves N, set in the same DM Sans 500 small-caps Ochre voice with the same 0.75px ochre underline. Left tells the cook what + how big; right tells them in what measure. The halo lands on IN CUPS.",
                render: "recipe-detail-units",
                screenSlug: "recipe-detail-units",
                tap: "Tap IN CUPS",
              },
              {
                numeral: "",
                name: "Measure · picker open",
                detailTitle: "Cups, grams, ounces.",
                note:
                  "The IN CUPS token blooms in place into a typographic radio strip — '— cups · grams · oz —' — em-dash bookends, middot separators, italic Lora Ochre. The current selection (cups) sits Ink + larger with the chapter-rule hairline beneath, exactly like portion-scale's selected numeral. The other two read inactive in Ash. No popover, no overlay — the eyebrow row IS the picker. The quiet cousin to portion-scale's theatrical moment, sharing the same typographic vocabulary at lower volume. Halo on grams.",
                render: "recipe-detail-units-picker",
                screenSlug: "recipe-detail-units-picker",
                tap: "Tap grams",
              },
              {
                numeral: "",
                name: "Recipe · in grams",
                detailTitle: "The same recipe, by weight.",
                note:
                  "The page quietly rerendered. Top ingredients carry weights — '240 g dry white wine', '20 g white miso', '25 g basil leaves, torn', '42 g unsalted butter' — count-based lines (corn ears, shallot, cloves) and seasoning ('Olive oil, salt, black pepper') unchanged. Per-step mise lines flip in lockstep — '1 cup white wine' becomes '240 g white wine', '2 cups corn stock' becomes '475 g corn stock', '1 tbsp white miso' becomes '20 g white miso', '3 tbsp butter' becomes '42 g butter', '1 cup basil' becomes '25 g basil'. Right-side eyebrow now reads IN GRAMS. No halo — the lens has done its work.",
                render: "recipe-detail-in-grams",
                screenSlug: "recipe-detail-in-grams",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "03-make-a-book",
    numeral: "III",
    title: "A cookbook of your own.",
    lede:
      "From a library of saved recipes to a book made with you — the boutique route, not the template.",
    steps: [
      {
        numeral: "I",
        name: "Library · populated",
        detailTitle: "When you're ready to make these into a book.",
        note:
          "A library at depth — twenty-seven recipes in the photo waterfall. The book flow begins from the Cookbooks row in the options list above the waterfall, sibling of Collections and Friends. No foot ceremony — every top-level destination lives in one nav grammar.",
        render: "library-populated",
        screenSlug: "library-populated",
        tap: "Tap Cookbooks",
      },
      {
        numeral: "II",
        name: "A cookbook of your own",
        detailTitle: "The second hardcover moment.",
        note:
          "The second hardcover moment in the app. Sage cloth, foil-stamped title. Lede sets the expectation: hardcover, 8×10, designed with you, delivered in about three weeks.",
        surface: "sage",
        render: "book-invitation",
        screenSlug: "book-invitation",
        tap: "Begin",
      },
      {
        numeral: "III",
        name: "The occasion",
        detailTitle: "Naming the occasion.",
        note:
          "Step i. Chapter-mark header over a quiet cluster of typographic chips — Mother's Day, Anniversary, Wedding, A phase of life, Just because — with a free-text fallback below. One chip shown in the selected state.",
        render: "book-occasion",
        screenSlug: "book-occasion",
        tap: "Continue",
      },
      {
        numeral: "IV",
        name: "The recipes",
        detailTitle: "What goes in the book.",
        note:
          "Step ii. A stacked list — not the waterfall — of every library recipe with an ochre toggle on the right; filled = in the book, outlined = out. The waterfall stays reserved for in-app browsing. Below, the running colophon: '24 in the book · about 80 pages · around $139.'",
        render: "book-recipes",
        screenSlug: "book-recipes",
        tap: "Continue",
      },
      {
        numeral: "V",
        name: "Layout",
        detailTitle: "The shape of the book.",
        note:
          "Step iii. The structural picker — cover layout (Plate / Full-bleed), then three rows of page layouts organised by photo count (1 / 2 / 3+). The cook has to make the call before the book renders: this is the hand of the boutique route, not a template the system picks. Copy lead: 'Layout. The shape of the book.' Selected thumb carries the ochre hairline ring. Available again later from Settings if the cook changes their mind in Preview.",
        render: "book-layout",
        screenSlug: "book-layout",
        tap: "Continue",
      },
      {
        numeral: "VI",
        name: "Preview & edit",
        detailTitle: "Preview & edit.",
        note:
          "Reached after the cook picks a Layout. Defaults to the cover as the first 'page' — tap it to edit title / subtitle / cover photo (lands on VII). Prev/next chevrons page through; tap a spread to edit a page (lands on VIII). 'Review & finalize' proceeds to IX. A right-nav 'Settings' mark opens the sub-flow: Title / Subtitle / Layout / Recipes — Layout still lives there too, for revisiting after seeing the book.",
        render: "book-preview",
        screenSlug: "book-preview",
        tap: "Tap the cover to edit",
        branches: [{
          label: "Settings · sub-flow",
          steps: [
            {
              numeral: "",
              name: "Settings",
              detailTitle: "Reshape the book.",
              note:
                "The sub-flow landing. Cream TOC — four tappable rows (Title / Subtitle / Layout / Recipes), each showing the current value in Lora italic over a small-caps label. No foot CTA — back chevron returns to Preview; edits commit as they happen.",
              render: "book-settings",
              screenSlug: "book-settings",
              tap: "Tap Title",
            },
            {
              numeral: "",
              name: "Title",
              detailTitle: "Naming the book.",
              note:
                "Single-field editor. The value is rendered in the same Lora face it'll wear on the cover so the user judges it in voice, not as a form field. Character count in Oat italic; no iOS keyboard chrome — the cookbook voice doesn't shout.",
              render: "book-title",
              screenSlug: "book-title",
              tap: "Done",
            },
            {
              numeral: "",
              name: "Subtitle",
              detailTitle: "The quieter line beneath.",
              note:
                "Sibling of Title. Lora italic at 20px matches how the subtitle reads on the cover. Same Done mechanic.",
              render: "book-subtitle",
              screenSlug: "book-subtitle",
              tap: "Done",
            },
            {
              numeral: "",
              name: "Layout",
              detailTitle: "The shape of the book.",
              note:
                "The structural picker — cover layout (Plate / Full-bleed), then three rows of page layouts organised by photo count (1 / 2 / 3+). Same screen as main-line V, available here for the cook to revisit after seeing the book in Preview. Copy lead: 'Layout. The shape of the book.' The selected thumb carries the ochre hairline ring.",
              render: "book-layout",
              screenSlug: "book-layout",
              tap: "Done",
            },
            {
              numeral: "",
              name: "Recipes",
              detailTitle: "Curating the manuscript.",
              note:
                "The in-book recipe list — only the 24 currently in the book, not the whole library. A T2-style 'Add from library →' row at the top. Each row carries a drag handle on the right; one row reveals the Alert-Rust 'Remove' action to teach the long-press mechanic. Shares the list primitive with IV.",
              render: "book-recipes-edit",
              screenSlug: "book-recipes-edit",
              tap: "Back",
            },
          ],
        }],
      },
      {
        numeral: "VII",
        name: "The cover",
        detailTitle: "Editing the cover.",
        note:
          "Reached from Preview when the user taps the cover. Cover PREVIEW is the interface — tap title / subtitle / photo on the rendered cover to edit each. Below the cover, a horizontal scroller of alternate cover photos. Contextual edit surface, not a numbered step on the main line.",
        render: "book-title-cover",
        screenSlug: "book-title-cover",
        tap: "Done",
      },
      {
        numeral: "VIII",
        name: "The page",
        detailTitle: "Editing a page.",
        note:
          "Reached from Preview when the user taps one of the two pages on a spread. Edits ONE page at a time (not the whole spread). Display → LAYOUT row (interactive 2 thumbs) → PHOTO row (scrollable) → Done. Both layout variants pre-rendered; clicking a thumb swaps which is visible.",
        render: "book-page-edit",
        screenSlug: "book-page-edit",
        tap: "Done",
      },
      {
        numeral: "IX",
        name: "Review & finalize",
        detailTitle: "The review.",
        note:
          "The traditional review surface. Cover shown prominently at the top with a shadow-lift, like a product laid on the table. Title + italic subtitle beneath. Thin ochre rule, then four labeled rows — IN THE BOOK, FORMAT, DELIVERY, INDICATIVE PRICE — each stacking a small-caps Ochre label over an italic Lora value with --b-divider between. A quiet italic aside sets expectations (proof before printing). Foot carries the ONE Primary foil CTA in Flow III: 'Send to Hearth Press.'",
        render: "book-review",
        screenSlug: "book-review",
        tap: "Send to Hearth Press",
      },
      {
        numeral: "X",
        name: "On its way",
        detailTitle: "The back cover.",
        note:
          "Closes the way Welcome and the book Invitation opened — sage cloth, foil. Hearth Press eyebrow, foil-stamped Lora italic 'On its way.', 44×1.5px foil chapter rule, a two-line italic-Linen stanza explaining the proof + press step. At the foot, a '— thank you —' folio in foil-light and a T2 tertiary 'Return to your library →' in italic Linen so the user has a way out without disturbing the ceremonial close.",
        surface: "sage",
        render: "book-on-its-way",
        screenSlug: "book-on-its-way",
      },
    ],
  },
  {
    slug: "04-photographs",
    numeral: "IV",
    title: "Photographs.",
    lede:
      "A photograph after dinner. Then another. And a book that knew what to do — adding photos to a recipe, and watching the layout quietly recompose around them.",
    steps: [
      {
        numeral: "I",
        name: "Recipe · detail, one photo",
        detailTitle: "The cookbook page at rest.",
        note:
          "The recipe as it lives in the library today — one hero photo, title, lede, method. The cook took two more photos at dinner last night. Long-press on the hero is the entry point into the photo arc, mirroring the long-press-step grammar from Flow II's Edit sub-flow.",
        render: "recipe-detail-photo-tappable",
        screenSlug: "recipe-detail-photo-tappable",
        tap: "Long-press the hero",
      },
      {
        numeral: "II",
        name: "Recipe · long-press menu",
        detailTitle: "The long-press menu.",
        note:
          "iOS-style context menu, sibling of the step-edit menu in Flow II's Edit sub-flow. The page blurs and dims; the hero is plucked above the dim layer with a soft shadow; a two-row menu — Add photo · Replace photo — floats below. Discoverability through gesture, not chrome.",
        render: "recipe-photo-menu",
        screenSlug: "recipe-photo-menu",
        tap: "Add photo",
      },
      {
        numeral: "III",
        name: "Source sheet",
        detailTitle: "The OS takes over.",
        note:
          "Native iOS action sheet — Take Photo · Choose from Library · Cancel. Hearth doesn't reskin platform pickers; voice lives in what comes next.",
        render: "recipe-source-sheet",
        screenSlug: "recipe-source-sheet",
        tap: "Choose from Library",
      },
      {
        numeral: "IV",
        name: "Photo picker",
        detailTitle: "Two photos, in order.",
        note:
          "Native Photos grid, two photos selected — the process shot from the pan, the wider mise. iOS numbers them 1 and 2 in the order they were picked. The OS does the work; Hearth waits.",
        render: "photo-picker",
        screenSlug: "photo-picker",
        tap: "Add (2)",
      },
      {
        numeral: "V",
        name: "Recipe · detail, carousel",
        detailTitle: "Realtor-grammar.",
        note:
          "The hero band is the same real estate as the one-photo detail — full-bleed, 5:4 — but now snap-scrollable. A small '1 / 3' pill sits bottom-right on the image; the count tells the cook there's more, the tap opens the full-screen gallery. Title, lede, ingredients, method untouched — the new photos are the signal, no folio ceremony required.",
        render: "recipe-detail-carousel",
        screenSlug: "recipe-detail-carousel",
        tap: "Tap the 1 / 3 counter",
      },
      {
        numeral: "VI",
        name: "Photo gallery",
        detailTitle: "The photos, at full height.",
        note:
          "Airbnb / realtor grammar — the detail page dissolves to a full-screen vertical photo viewer. Photos stack at their natural aspect ratios on cream with a 3px gutter between, reading as a magazine seam. No app chrome beyond a close chevron. Close returns to the recipe detail (V); the cook's photo story ends here. The sub-flow below is what happens later, when the cook navigates back to the library through the app's nav — a separate re-entry into the book.",
        render: "recipe-photo-gallery",
        screenSlug: "recipe-photo-gallery",
        tap: "Close",
        branches: [{
          label: "In the book · sub-flow",
          steps: [
            {
              numeral: "",
              name: "Library · back",
              detailTitle: "Back to the library.",
              note:
                "Later — the cook navigates back to the library. Same chrome as Flow III · I: header, options list, waterfall. The Cookbooks row is the way back into the in-progress book. No state-shifted foot, no promotional moment — the book is just one of the destinations the library lists.",
              render: "library-populated",
              screenSlug: "library-populated",
              tap: "Tap Cookbooks",
            },
            {
              numeral: "",
              name: "Book preview · promoted",
              detailTitle: "Layout adapted to your photos.",
              note:
                "The book absorbed the edit. The corn-ragu page auto-promoted from 1-photo-a to 2-photos-b — a single hero became a bookend rhythm (photo · text · photo). Above the spread, an italic-Ochre aside earns one moment — '— Layout adapted to your photos. —' — then disappears on the next tap.",
              render: "book-preview-promoted",
              screenSlug: "book-preview-promoted",
              tap: "Tap the page to edit",
            },
            {
              numeral: "",
              name: "Page edit · pick a hero",
              detailTitle: "Picking the hero.",
              note:
                "The shared edit surface (BookEdit) pointed at the corn-ragu page. Layout picker shows all four count rows with 2-photos-b active; photos section carries the recipe's three real photos with Apple-grammar numbered circles. The halo lands on the second photo — the cook's process shot — to swap which image sits in the hero well.",
              render: "book-page-edit-pick-hero",
              screenSlug: "book-page-edit-pick-hero",
              tap: "The second photo",
            },
            {
              numeral: "",
              name: "Book preview · hero swapped",
              detailTitle: "The new hero, quietly.",
              note:
                "The close of the sub-flow. The process shot is now the top photo in the 2-photos-b layout; the original Mia Aquilina hero sits in the bottom well. No aside, no halo — the book simply is. Cook can keep going (Settings, Review, send to Hearth Press) or close the app and come back later.",
              render: "book-preview-hero-swapped",
              screenSlug: "book-preview-hero-swapped",
            },
          ],
        }],
      },
    ],
  },
  {
    slug: "05-friends",
    numeral: "V",
    title: "Friends.",
    lede:
      "A library stays private. A collection is what travels. From a quiet invitation in the foot to a friend's curated shelf — and a recipe with someone else's ink in the margin. (Exploratory: this flow sits beyond V1 scope; it visualizes the social-layer brainstorm so the brand voice can be tested against the idea before any of it is committed.)",
    steps: [
      {
        numeral: "I",
        name: "Library · with options",
        detailTitle: "A list of options at the top.",
        note:
          "Apple Music's Library tab pattern, ported into Hearth's voice. Above the recipe waterfall, a quiet list of category drill-downs — Collections, Friends — sits as siblings of the implicit 'all recipes' view below. Italic Lora labels, ochre chevrons, hairline dividers. Hearth Press foot invitation untouched: the social layer never displaces the book-creation doorway. Library contents remain private. Halo on Friends.",
        render: "library-with-friends-doorway",
        screenSlug: "library-with-friends-doorway",
        tap: "Tap Friends",
      },
      {
        numeral: "II",
        name: "Friends",
        detailTitle: "Friends.",
        note:
          "The bilateral graph as a directory page, not a chapter title page. ScreenNav above carries the FRIENDS chapter mark; below, no body header at all — straight into the list. Each row stacks Lora italic name (recipe-title voice — names ARE titles here) over an italic-Ash line of the collections that friend has shared, em-middot separated. Hairline dividers between rows. Four names alphabetical by surname. No avatars, no follower counts — collection titles do the work, like spines on a shelf. Halo on Sarah Chen.",
        render: "circle-friends",
        screenSlug: "circle-friends",
        tap: "Tap Sarah Chen",
      },
      {
        numeral: "III",
        name: "Sarah's collection",
        detailTitle: "Sunday dinners.",
        note:
          "The Apple-Music-playlist analog in Hearth's voice. Sarah has named and shared 'Sunday dinners' — twelve recipes she keeps in rotation. Canonical chapter-opener rhythm — chapter rule, FROM SARAH CHEN as the byline credit, Lora italic title 'Sunday dinners.', italic Ash lede — then the photo waterfall beneath. Same primitive as the Library, twelve curated tiles. Halo on the corn ragù, the recipe that threads through Flow I and lands in the cook's library next.",
        render: "shared-collection",
        screenSlug: "shared-collection",
        tap: "Tap the corn ragù tile",
      },
      {
        numeral: "IV",
        name: "Recipe · with credit chain",
        detailTitle: "From Sarah.",
        note:
          "The cookbook page Sarah's been cooking from, opened from her shared collection. Mirrors ImportPreview's preview-before-save grammar — top bar (Cancel · FROM SARAH eyebrow · Save) over a cream cookbook page — because that's Hearth's existing save-shaped pattern. The from-card carries TWO attributions on one inline row: FROM table.kitchen (the original cookbook) · VIA Sarah Chen (the friend who put it in your hands). Same church-cookbook attribution rhythm as the printed page. Title is static (not an input — Sarah's recipe is finalized; the cook isn't editing on save). Halo on Save.",
        render: "recipe-with-credit-chain",
        screenSlug: "recipe-with-credit-chain",
        tap: "Tap Save",
      },
      {
        numeral: "V",
        name: "Library · after friend-save",
        detailTitle: "The library, quietly grown.",
        note:
          "The library quietly grew by one. Same with-friends-doorway state as screen I — same options list (Collections, Friends), same Hearth Press foot, same waterfall — with one quiet addition: the corn ragù at the head of the waterfall now carries 'via Sarah Chen' as a third caption line in italic Lora ash. Provenance threaded through into the library view. Every other tile shows just title + meta; only the recipe with a curator carries the byline. That's how the credit chain stays visible without ever shouting. No banner, no toast, no celebration — book-spine test holds. Terminal beat in the social arc; no halo.",
        render: "library-after-friend-save",
        screenSlug: "library-after-friend-save",
      },
    ],
  },
];

export const getFlow = (slug: string): Flow | undefined =>
  flows.find((f) => f.slug === slug);

/**
 * Resolve a screen detail page (`/design/screens/[slug]`) back to its flow +
 * step. Detail pages use this so eyebrow/title/note come from a single source.
 *
 * Walks branches so sub-flow screens resolve too.
 */
export const getScreen = (
  screenSlug: string,
): { flow: Flow; step: FlowStep } | undefined => {
  for (const flow of flows) {
    for (const step of flow.steps) {
      if (step.screenSlug === screenSlug) return { flow, step };
      if (step.branches) {
        for (const branch of step.branches) {
          const sub = branch.steps.find((s) => s.screenSlug === screenSlug);
          if (sub) return { flow, step: sub };
        }
      }
    }
  }
  return undefined;
};

/**
 * Stable anchor ids for sidebar links + storyboard targets. Flow-level uses
 * the existing `flow-${slug}` already on the h2; step-level uses indices so
 * placeholder steps (no screenSlug) still anchor.
 */
export const flowAnchorId = (flow: Flow): string => `flow-${flow.slug}`;
export const branchAnchorId = (
  flow: Flow,
  stepIndex: number,
  branchIndex: number,
): string => `branch-${flow.slug}-${stepIndex}-${branchIndex}`;

export const totals = () => {
  const mainSteps = flows.flatMap((f) => f.steps);
  const branchSteps = mainSteps.flatMap((s) => s.branches?.flatMap((b) => b.steps) ?? []);
  const allSteps = [...mainSteps, ...branchSteps];
  const drawn = allSteps.filter((s) => s.render).length;
  return { drawn, total: allSteps.length, flowCount: flows.length };
};
