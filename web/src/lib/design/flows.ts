/**
 * Flow definitions — single source of truth for /design/*.
 *
 * Each flow is a sequence of screens. Screens with a `render` key map to
 * a concrete screen component registered in `FlowStoryboard.astro`. Steps
 * without one render as "not yet drawn" placeholders.
 *
 * A step can carry a `branch` — a secondary strip of screens that live
 * OFF the main line. Branch steps use `numeral: ""` (no numeral) because
 * they're not part of the numbered sequence; the storyboard draws them
 * as a descending row beneath the branch point.
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
  | "library-book-in-progress"
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
  | "recipe-detail-fully-annotated";

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
  branch?: FlowBranch;        // a sub-flow descending from this step
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
          "Designed empty state, not a to-do — typography-only chapter opener with an italic-Ochre invitation at the foot. Tap is internal now: the invitation opens the Import surface inside the app. Rhymes with Flow II's 'When you're ready —' but stays one line so the chapter-opener above carries the editorial weight.",
        render: "library-empty",
        screenSlug: "library-empty",
        tap: "Tap — import a recipe →",
      },
      {
        numeral: "III",
        name: "Import · surface",
        detailTitle: "Bring a recipe home.",
        note:
          "The new first-class action: paste a web URL inside Hearth. Quiet bar at the top (Cancel · BRING IN A RECIPE), chapter-opener mid-page, single paste field beneath. The halo lands on the field. The share-sheet path off Safari (the original III + IV of this flow) lives below as a sub-flow — another way to land in the same Import preview.",
        render: "import-surface",
        screenSlug: "import-surface",
        tap: "Paste a recipe link",
        branch: {
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
        },
      },
      {
        numeral: "IV",
        name: "Import · surface, pasted",
        detailTitle: "A link, just pasted.",
        note:
          "Same composition as III with the URL filled in (table.kitchen/summer-corn-ragu). A full-width Foil-Light Primary pill — the same grammar as Flow II's 'Send to Hearth Press' — appears below the field, halo'd as the next tap. The next tap lands in the Import preview where Hearth has already extracted the recipe in its own voice.",
        render: "import-surface-pasted",
        screenSlug: "import-surface-pasted",
        tap: "Tap Import",
      },
      {
        numeral: "V",
        name: "Import · preview",
        detailTitle: "Extracted, in Hearth's voice.",
        note:
          "Hearth's import preview — the same screen whether the cook arrived by pasting a URL on the main line or via the share sheet from Safari (sub-flow under III). The extracted recipe is rendered in Hearth's own type — From card carrying the source URL, hero photo, Lora title field, ingredients and method laid out as the cookbook-page they'll become. Save is the primary; tap any section to edit before saving.",
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
        tap: "The recipe row",
      },
      {
        numeral: "VII",
        name: "Recipe · detail",
        detailTitle: "The cookbook page.",
        note: "The cookbook-page moment. Hero photo, Lora title, method set in Roman numerals. The Ingredients eyebrow reads INGREDIENTS · serves 4, with 'serves 4' typeset as an inline-link cross-reference (Lora italic Ochre, 1px ochre underline). The ochre halo marks it as the next tap.",
        render: "recipe-detail-tappable",
        screenSlug: "recipe-detail-tappable",
        tap: "Tap serves 4",
      },
      {
        numeral: "VIII",
        name: "Portion · overlay",
        detailTitle: "A theatrical dim-down.",
        note: "The dreamy moment. The page lightens under a cream wash and blurs behind, and the scale strip floats centered in the viewport — '— 2 · 4 · 6 · 8 · 12 —'. The current yield (4) sits currently-selected and larger, carrying the chapter-rule hairline beneath. The ochre halo lands on 8 as the next tap. No card, no border, no pill — the blur is the container. Scale is a lens over a fixed recipe; no Save.",
        render: "recipe-detail-overlay",
        screenSlug: "recipe-detail-overlay",
        tap: "Tap 8",
      },
      {
        numeral: "IX",
        name: "Recipe · detail, scaled",
        detailTitle: "Tonight's a double batch.",
        note: "The page quietly rerendered at serves 8 — ingredient quantities and each method step's mise doubled. Step TEXT is unchanged; timing and pan cues are cook judgment, not math. Long-press is the structural-edit entry; the ochre halo returns to step iv to mark the handoff into the edit arc.",
        render: "recipe-detail-scaled",
        screenSlug: "recipe-detail-scaled",
        tap: "Long-press step iv",
      },
      {
        numeral: "X",
        name: "Recipe · long-press menu",
        detailTitle: "The long-press menu.",
        note: "iOS-style context menu. The page blurs and dims; step iv is plucked above the dim layer with a soft shadow; a quiet two-row menu — Edit · Delete — floats below. This is the discoverability answer: there is no Edit button, long-press is the single entry point.",
        render: "recipe-edit-menu",
        screenSlug: "recipe-edit-menu",
        tap: "Edit",
      },
      {
        numeral: "XI",
        name: "Recipe · editing step iv",
        detailTitle: "Editing step iv.",
        note: "Inline edit — step iv is swapped for a live textarea inside the recipe page, '8 minutes' updated to '10–12 minutes.' The page stays put so the cook keeps their bearings; the iOS keyboard is docked at the foot. Save commits the change; Cancel discards.",
        render: "recipe-edit",
        screenSlug: "recipe-edit",
        tap: "Save",
      },
      {
        numeral: "XII",
        name: "Recipe · saved",
        detailTitle: "The book, quietly changed.",
        note: "Same page, quietly updated. Step iv now reads '10–12 minutes.' No celebration, no banner — the book-spine test holds.",
        render: "recipe-saved",
        screenSlug: "recipe-saved",
      },
    ],
  },
  {
    slug: "02-make-a-book",
    numeral: "II",
    title: "A cookbook of your own.",
    lede:
      "From a library of saved recipes to a book made with you — the boutique route, not the template.",
    steps: [
      {
        numeral: "I",
        name: "Library · populated",
        detailTitle: "When you're ready to make these into a book.",
        note:
          "A library at depth — twenty-seven recipes in the photo waterfall. The typographic invitation at the foot — 'When you're ready to make these into a book —' — is where the book flow begins.",
        render: "library-populated",
        screenSlug: "library-populated",
        tap: "The italic invitation at the foot of the library",
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
        name: "Preview & edit",
        detailTitle: "Preview & edit.",
        note:
          "Reached directly from The recipes — Layout has been moved into the Settings sub-flow. Defaults to the cover as the first 'page' — tap it to edit title / subtitle / cover photo (lands on VI). Prev/next chevrons page through; tap a spread to edit a page (lands on VII). 'Review & finalize' proceeds to VIII. A right-nav 'Settings' mark opens the sub-flow: Title / Subtitle / Layout / Recipes.",
        render: "book-preview",
        screenSlug: "book-preview",
        tap: "Tap the cover to edit",
        branch: {
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
                "The structural picker — cover layout (Plate / Full-bleed), then three rows of page layouts organised by photo count (1 / 2 / 3+). Same screen that used to live at step V on the main line; moved into Settings so the main line lands in Preview sooner. Copy lead: 'Layout. The shape of the book.' The selected thumb carries the ochre hairline ring.",
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
        },
      },
      {
        numeral: "VI",
        name: "The cover",
        detailTitle: "Editing the cover.",
        note:
          "Reached from Preview when the user taps the cover. Cover PREVIEW is the interface — tap title / subtitle / photo on the rendered cover to edit each. Below the cover, a horizontal scroller of alternate cover photos. Contextual edit surface, not a numbered step on the main line.",
        render: "book-title-cover",
        screenSlug: "book-title-cover",
        tap: "Done",
      },
      {
        numeral: "VII",
        name: "The page",
        detailTitle: "Editing a page.",
        note:
          "Reached from Preview when the user taps one of the two pages on a spread. Edits ONE page at a time (not the whole spread). Display → LAYOUT row (interactive 2 thumbs) → PHOTO row (scrollable) → Done. Both layout variants pre-rendered; clicking a thumb swaps which is visible.",
        render: "book-page-edit",
        screenSlug: "book-page-edit",
        tap: "Done",
      },
      {
        numeral: "VIII",
        name: "Review & finalize",
        detailTitle: "The review.",
        note:
          "The traditional review surface. Cover shown prominently at the top with a shadow-lift, like a product laid on the table. Title + italic subtitle beneath. Thin ochre rule, then four labeled rows — IN THE BOOK, FORMAT, DELIVERY, INDICATIVE PRICE — each stacking a small-caps Ochre label over an italic Lora value with --b-divider between. A quiet italic aside sets expectations (proof before printing). Foot carries the ONE Primary foil CTA in Flow II: 'Send to Hearth Press.'",
        render: "book-review",
        screenSlug: "book-review",
        tap: "Send to Hearth Press",
      },
      {
        numeral: "IX",
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
    slug: "03-photographs",
    numeral: "III",
    title: "Photographs.",
    lede:
      "A photograph after dinner. Then another. And a book that knew what to do — adding photos to a recipe, and watching the layout quietly recompose around them.",
    steps: [
      {
        numeral: "I",
        name: "Recipe · detail, one photo",
        detailTitle: "The cookbook page at rest.",
        note:
          "The recipe as it lives in the library today — one hero photo, title, lede, method. The cook took two more photos at dinner last night. Long-press on the hero is the entry point into the photo arc, mirroring the long-press-step grammar from Flow I.",
        render: "recipe-detail-photo-tappable",
        screenSlug: "recipe-detail-photo-tappable",
        tap: "Long-press the hero",
      },
      {
        numeral: "II",
        name: "Recipe · long-press menu",
        detailTitle: "The long-press menu.",
        note:
          "iOS-style context menu, sibling of the step-edit menu in Flow I. The page blurs and dims; the hero is plucked above the dim layer with a soft shadow; a two-row menu — Add photo · Replace photo — floats below. Discoverability through gesture, not chrome.",
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
        branch: {
          label: "In the book · sub-flow",
          steps: [
            {
              numeral: "",
              name: "Library · book in progress",
              detailTitle: "Back to the library.",
              note:
                "Later — the cook navigates back to the library. Same waterfall, same 27 recipes — the shift is the foot invitation. Where a fresh library reads 'When you're ready to make these into a book —', an in-progress library reads 'Your book in progress', with '24 recipes →' sitting where 'Begin your book' used to. The invitation block is still the tap target.",
              render: "library-book-in-progress",
              screenSlug: "library-book-in-progress",
              tap: "The book-in-progress invitation",
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
        },
      },
    ],
  },
  {
    slug: "04-notes",
    numeral: "IV",
    title: "Notes.",
    lede:
      "A cookbook lives because it's cooked in. From an empty margin to a first note to a later one, gathered into one flowing block — the annotation layer that grows as the cook returns.",
    steps: [
      {
        numeral: "I",
        name: "Recipe · empty block",
        detailTitle: "The margin, waiting.",
        note:
          "The onboarding moment. Notes live as a peer section to Ingredients and Method, placed BETWEEN meta and ingredients — reading order is author's voice → cook's voice → what you need → how to make it. The block is empty, so the section carries only the eyebrow and the typographic invitation '— add a note —' in italic Ochre, mirroring Flow II's 'When you're ready to make these into a book —' grammar. The halo lands on the invitation.",
        render: "recipe-detail-empty-note",
        screenSlug: "recipe-detail-empty-note",
        tap: "Tap — add a note —",
      },
      {
        numeral: "II",
        name: "Notes · compose",
        detailTitle: "Writing in the margin.",
        note:
          "The invitation is replaced in place by an empty textarea, high in the body between meta and ingredients. No field border, hairline underline only — the voice is a cookbook margin, not a form. Cancel (tertiary Ash) · Save (Ochre) floats to the right under the textarea. iOS keyboard docks at the foot; the page auto-scrolls the textarea into the visible band above it. Save is halo'd as the handoff. Apple Notes grammar — the cook types whatever they want, no metadata imposed.",
        render: "recipe-note-compose",
        screenSlug: "recipe-note-compose",
        tap: "Tap Save",
      },
      {
        numeral: "III",
        name: "Recipe · with note",
        detailTitle: "One voice in the margin.",
        note:
          "The page quietly updated. The block now shows the cook's first voice — 'Halved the salt — nicer balance.' — as one Lora italic paragraph. No chrome, no date, no per-note affordance. Tap anywhere on the block to reopen the editor; the whole block is halo'd as the handoff into IV. Weeks later, the cook returns to add more.",
        render: "recipe-detail-with-note",
        screenSlug: "recipe-detail-with-note",
        tap: "Tap the note",
      },
      {
        numeral: "IV",
        name: "Notes · edit",
        detailTitle: "Coming back to the margin.",
        note:
          "The same editor surface from II, now populated with the note's current text. Cook is about to add the memory-note — '— Sam's 30th. Doubled it. Everyone wanted seconds. —' — into the same block, flowing after the first voice. Same hairline underline, same Cancel/Save grammar. Save halo'd as the handoff into V. The block is one note that grows, not a list of notes.",
        render: "recipe-note-edit",
        screenSlug: "recipe-note-edit",
        tap: "Tap Save",
      },
      {
        numeral: "V",
        name: "Recipe · expanded note",
        detailTitle: "Two voices in one block.",
        note:
          "The close of the flow. The block carries both voices in one continuous Lora italic body — the cook-note and the memory-note running together, no separation, no metadata between them. Apple Notes honest: one block, everything the cook wanted to remember. No halo — the flow is done. The book-spine test holds.",
        render: "recipe-detail-expanded-note",
        screenSlug: "recipe-detail-expanded-note",
      },
    ],
  },
  {
    slug: "05-line-comments",
    numeral: "V",
    title: "A line in the margin.",
    lede:
      "Comments at the scope they belong to — a note on a step, a mark beside an ingredient. Same quiet annotation grammar as the page-level notes, closer to the thing it annotates. The layer that makes someone else's recipe yours.",
    steps: [
      {
        numeral: "I",
        name: "Recipe · pre-comment",
        detailTitle: "The recipe, already yours.",
        note:
          "Starting state. Picks up where Flow IV left off — the global Notes block already carries both voices ('Halved the salt — nicer balance. — Sam's 30th. Doubled it. Everyone wanted seconds. —'). No line-item comments yet. The halo lands on step iv — long-press opens the step menu.",
        render: "recipe-detail-pre-comment",
        screenSlug: "recipe-detail-pre-comment",
        tap: "Long-press step iv",
      },
      {
        numeral: "II",
        name: "Step · long-press menu",
        detailTitle: "Comment, primary.",
        note:
          "The same three-row context menu Flow I · X uses, now with Comment as the first row and halo'd as the tap target. Edit is secondary (rare — it changes the recipe body); Delete tertiary. Flow I still halos Edit via the same shared component; the halo is the storyboard's overlay, not a UI state. Discoverability through gesture, not chrome.",
        render: "recipe-step-comment-menu",
        screenSlug: "recipe-step-comment-menu",
        tap: "Tap Comment",
      },
      {
        numeral: "III",
        name: "Step · comment compose",
        detailTitle: "Writing beside the step.",
        note:
          "A textarea opens beneath step iv, indented under the step's text column so it's visually anchored to what it annotates. Cancel · Save in the now-familiar grammar. Save halo'd. iOS keyboard docked; page auto-scrolls the textarea into the visible band above it. Same editor voice as Notes, smaller register — a pencil in the margin, not a form field.",
        render: "recipe-step-comment-compose",
        screenSlug: "recipe-step-comment-compose",
        tap: "Tap Save",
      },
      {
        numeral: "IV",
        name: "Recipe · step commented",
        detailTitle: "A voice next to step iv.",
        note:
          "Step iv now carries an inline comment — '10–12 minutes — thickens better.' — in Lora italic Ash, indented under the step text. No chrome, no date, no ceremony. The cook moves on to the ingredients: the halo lands on the butter line, where the same long-press gesture repeats at ingredient scope.",
        render: "recipe-detail-step-commented",
        screenSlug: "recipe-detail-step-commented",
        tap: "Long-press butter",
      },
      {
        numeral: "V",
        name: "Ingredient · comment compose",
        detailTitle: "Same grammar, smaller scope.",
        note:
          "Same compose surface, this time beneath the butter line. Menu screen skipped — the long-press menu from II is the same menu for ingredients, and the binder doesn't need to teach it twice. Save halo'd.",
        render: "recipe-ingredient-comment-compose",
        screenSlug: "recipe-ingredient-comment-compose",
        tap: "Tap Save",
      },
      {
        numeral: "VI",
        name: "Recipe · fully annotated",
        detailTitle: "Megan's version.",
        note:
          "The close of the flow. Global note at the top carries both voices. Step iv carries its own. The butter line carries a comment beneath it — 'Cultured if I have it.' Nothing destroyed — the recipe body still reads as it was imported. What's on the page now is the personalization layer: the comments are what make a recipe that came from somewhere else into hers. This is the content the printed book will carry beyond the bare recipe — the proof-of-authorship that a library of saved URLs can't give you.",
        render: "recipe-detail-fully-annotated",
        screenSlug: "recipe-detail-fully-annotated",
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
      if (step.branch) {
        const sub = step.branch.steps.find((s) => s.screenSlug === screenSlug);
        if (sub) return { flow, step: sub };
      }
    }
  }
  return undefined;
};

export const totals = () => {
  const mainSteps = flows.flatMap((f) => f.steps);
  const branchSteps = mainSteps.flatMap((s) => s.branch?.steps ?? []);
  const allSteps = [...mainSteps, ...branchSteps];
  const drawn = allSteps.filter((s) => s.render).length;
  return { drawn, total: allSteps.length, flowCount: flows.length };
};
