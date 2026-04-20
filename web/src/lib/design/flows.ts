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
  | "recipe-edit"
  | "recipe-saved";

export type FlowStep = {
  numeral: string;            // Roman numeral label — "I", "II", "III"
  name: string;               // e.g. "Recipe · detail"
  note: string;               // director's note for the caption
  surface?: Surface;          // phone screen background
  render?: ScreenRender;      // component key; absent = placeholder
  screenSlug?: string;        // /design/screens/[slug] — absent = not yet linkable
  tap?: string;               // human-readable handoff to the next screen
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
        note: "Designed empty state, not a to-do. Typography-only chapter opener.",
        render: "library-empty",
        screenSlug: "library-empty",
        tap: "User leaves the app to Safari",
        tapExternal: true,
      },
      {
        numeral: "III",
        name: "Mobile Safari · article",
        note:
          "User is reading a recipe on the web. The ochre halo marks where the share tap happens.",
        surface: "neutral",
        render: "mobile-safari-recipe",
        screenSlug: "mobile-safari-recipe",
        tap: "Safari share button",
      },
      {
        numeral: "IV",
        name: "Share sheet",
        note: "iOS share sheet over the dimmed article. Hearth halo'd as the destination.",
        render: "share-sheet",
        screenSlug: "share-sheet",
        tap: "Hearth app",
      },
      {
        numeral: "V",
        name: "Import · preview",
        note:
          "Hearth's share extension — extracted recipe in Hearth type, Save as the primary.",
        render: "import-preview",
        screenSlug: "import-preview",
        tap: "Save",
      },
      {
        numeral: "VI",
        name: "Library · one recipe",
        note: "The emotional payoff. A library of one. Same header, same folio.",
        render: "library-one-recipe",
        screenSlug: "library-one-recipe",
        tap: "The recipe row",
      },
      {
        numeral: "VII",
        name: "Recipe · detail",
        note: "The cookbook-page moment. Hero photo, Lora title, method set in Roman numerals.",
        render: "recipe-detail",
        screenSlug: "recipe-detail",
        tap: "Edit",
      },
      {
        numeral: "VIII",
        name: "Recipe · edit",
        note: "Inline edit on step iv — '8 minutes' becomes '10–12 minutes.' Save creates a version.",
        render: "recipe-edit",
        screenSlug: "recipe-edit",
        tap: "Save",
      },
      {
        numeral: "IX",
        name: "Recipe · saved",
        note: "Same page, quietly updated. Folio now reads 'page 1 · version ii.' No celebration — the book-spine test holds.",
        render: "recipe-saved",
        screenSlug: "recipe-saved",
      },
    ],
  },
];

export const getFlow = (slug: string): Flow | undefined =>
  flows.find((f) => f.slug === slug);

export const totals = () => {
  const screens = flows.flatMap((f) => f.steps);
  const drawn = screens.filter((s) => s.render).length;
  return { drawn, total: screens.length, flowCount: flows.length };
};
