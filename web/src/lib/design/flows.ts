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
  | "mobile-safari-recipe"
  | "share-sheet"
  | "import-preview"
  | "library-one-recipe"
  | "recipe-detail"
  | "recipe-edit-menu"
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
  | "book-settings"
  | "book-title"
  | "book-subtitle"
  | "book-recipes-edit"
  | "book-review"
  | "book-on-its-way";

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
      "Sign in, share a web recipe into Hearth, read it, edit a step, save. From the sage cover to a library of one — end to end.",
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
        note: "Designed empty state, not a to-do. Typography-only chapter opener.",
        render: "library-empty",
        screenSlug: "library-empty",
        tap: "User leaves the app to Safari",
        tapExternal: true,
      },
      {
        numeral: "III",
        name: "Mobile Safari · article",
        detailTitle: "The open internet.",
        note:
          "User is reading a recipe on the web. The ochre halo marks where the share tap happens.",
        surface: "neutral",
        tone: "ink",
        render: "mobile-safari-recipe",
        screenSlug: "mobile-safari-recipe",
        tap: "Safari share button",
      },
      {
        numeral: "IV",
        name: "Share sheet",
        detailTitle: "The handoff.",
        note: "iOS share sheet over the dimmed article. Hearth halo'd as the destination.",
        tone: "ink",
        render: "share-sheet",
        screenSlug: "share-sheet",
        tap: "Hearth app",
      },
      {
        numeral: "V",
        name: "Import · preview",
        detailTitle: "Extracted, in Hearth's voice.",
        note:
          "Hearth's share extension — extracted recipe in Hearth type, Save as the primary.",
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
        note: "The cookbook-page moment. Hero photo, Lora title, method set in Roman numerals. No Edit button in the chrome — editing is per-item via long-press. The ochre halo marks step iv as the long-press target.",
        render: "recipe-detail",
        screenSlug: "recipe-detail",
        tap: "Long-press step iv",
      },
      {
        numeral: "VIII",
        name: "Recipe · long-press menu",
        detailTitle: "The long-press menu.",
        note: "iOS-style context menu. The page blurs and dims; step iv is plucked above the dim layer with a soft shadow; a quiet two-row menu — Edit · Delete — floats below. This is the discoverability answer: there is no Edit button, long-press is the single entry point.",
        render: "recipe-edit-menu",
        screenSlug: "recipe-edit-menu",
        tap: "Edit",
      },
      {
        numeral: "IX",
        name: "Recipe · editing step iv",
        detailTitle: "Editing step iv.",
        note: "Inline edit — step iv is swapped for a live textarea inside the recipe page, '8 minutes' updated to '10–12 minutes.' The page stays put so the cook keeps their bearings; the iOS keyboard is docked at the foot. Save creates a new version; Cancel discards.",
        render: "recipe-edit",
        screenSlug: "recipe-edit",
        tap: "Save",
      },
      {
        numeral: "X",
        name: "Recipe · saved",
        detailTitle: "The book, quietly changed.",
        note: "Same page, quietly updated. Folio now reads 'page 1 · version ii.' No celebration — the book-spine test holds.",
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
