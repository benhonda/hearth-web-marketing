/**
 * Flow definitions — single source of truth for /design/*.
 *
 * Each flow is a sequence of screens. Screens with a `render` key map to
 * a concrete screen component registered in `FlowStoryboard.astro`. Steps
 * without one render as "not yet drawn" placeholders.
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
  | "book-settings"
  | "book-title-cover"
  | "book-preview"
  | "book-spread-edit";

export type FlowStep = {
  numeral: string;            // Roman numeral label — "I", "II", "III"
  name: string;               // e.g. "Recipe · detail" — eyebrow on both surfaces
  note: string;               // director's note — rendered verbatim on flow + detail page
  detailTitle?: string;       // poetic h1 shown only on /design/screens/[slug]
  surface?: Surface;          // phone screen background
  tone?: "ink" | "inverse";   // status-bar / home-indicator tint on dark-surface screens
  render?: ScreenRender;      // component key; absent = placeholder
  screenSlug?: string;        // /design/screens/[slug] — absent = not yet linkable
  tap?: string;               // human-readable handoff to the next screen (flow-only)
  tapExternal?: boolean;      // true = action leaves the app; no in-screen halo
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
        note:
          "Step ii. The photo waterfall returns with selection state — three tiles dimmed to read as 'not in the book.' No checkmarks, no saturated accents; opacity alone carries the binary. Below: '24 in the book · about 80 pages · around $139.'",
        render: "book-recipes",
        screenSlug: "book-recipes",
        tap: "Continue",
      },
      {
        numeral: "V",
        name: "Global settings",
        detailTitle: "The shape of the book.",
        note:
          "Step iii. Structural decisions before content. One row for cover layout (2 options — Plate inset or Full-bleed), then three rows of page-layout choices organised by photo count (1 / 2 / 3+). Six tiny typographic thumbnails total, each a miniature spread; chosen one gets the ochre hairline ring.",
        render: "book-settings",
        screenSlug: "book-settings",
        tap: "Continue",
      },
      {
        numeral: "VI",
        name: "Preview & edit",
        detailTitle: "Preview & edit.",
        note:
          "Reached directly from Global settings. Defaults to the cover as the first 'page' — tap it to edit title / subtitle / cover photo (lands on VII). Prev/next chevrons page through; tap a spread to edit it (lands on VIII). 'Review & finalize' proceeds to IX. The pager is interactive in the 1× stage page.",
        render: "book-preview",
        screenSlug: "book-preview",
        tap: "Tap the cover to edit",
      },
      {
        numeral: "VII",
        name: "The cover",
        detailTitle: "Editing the cover.",
        note:
          "The edit landing reached when the user taps the cover in preview. Cover PREVIEW is the interface — tap title / subtitle / photo on the rendered cover to edit each. Below the cover, a horizontal scroller of alternate cover photos. This isn't a numbered step; it's a contextual edit surface.",
        render: "book-title-cover",
        screenSlug: "book-title-cover",
        tap: "Continue",
      },
      {
        numeral: "VIII",
        name: "Editing a spread",
        detailTitle: "Editing this spread.",
        note:
          "The per-spread editor reached from Preview when the user taps a spread. Same spread rendered one step bigger (0.52 vs 0.48 on VI), with an interactive layout picker above: two BookPage thumbnails, click one to swap the left page's layout. For 1-photo recipes, two options. Outlined 'Done' returns to Preview.",
        render: "book-spread-edit",
        screenSlug: "book-spread-edit",
        tap: "Done",
      },
      {
        numeral: "IX",
        name: "Review & finalize",
        note:
          "The colophon. Typographic summary of the book: title, subtitle, recipe count, page count, indicative price, delivery window. Primary foil CTA: 'Send to Hearth Press.' This is the concierge hand-off — Blurb + Stripe defer to manual fulfillment.",
        tap: "Send to Hearth Press",
      },
      {
        numeral: "X",
        name: "On its way",
        note:
          "Closes the way Welcome opened — sage cloth, foil. 'We'll be in touch.' No celebration, no false promises. The cookbook voice holds.",
        surface: "sage",
      },
    ],
  },
];

export const getFlow = (slug: string): Flow | undefined =>
  flows.find((f) => f.slug === slug);

/**
 * Resolve a screen detail page (`/design/screens/[slug]`) back to its flow +
 * step. Detail pages use this so eyebrow/title/note come from a single source.
 */
export const getScreen = (
  screenSlug: string,
): { flow: Flow; step: FlowStep } | undefined => {
  for (const flow of flows) {
    const step = flow.steps.find((s) => s.screenSlug === screenSlug);
    if (step) return { flow, step };
  }
  return undefined;
};

export const totals = () => {
  const screens = flows.flatMap((f) => f.steps);
  const drawn = screens.filter((s) => s.render).length;
  return { drawn, total: screens.length, flowCount: flows.length };
};
