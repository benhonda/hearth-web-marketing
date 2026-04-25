/**
 * Sample recipe used by screens V–IX. Keeping this in one place means
 * the import preview, detail, edit, and saved screens all show the
 * same content, so the flow feels continuous.
 *
 * Each method step carries a `mise` — the amounts needed *for that step*,
 * in chef's-mise order. The top ingredient list remains the shopping
 * summary; the mise is what's in hand at the pan. This is the Zuni /
 * Ottolenghi pattern: the cook never scrolls up mid-step to remember
 * "how many kernels?".
 *
 * The original method step iv reads "8 minutes" — the edit flow (VIII)
 * changes it to "10–12 minutes" to reflect a real home-cook correction.
 */

export type MethodStep = {
  text: string;
  mise: string[];
};

export type SampleRecipe = {
  title: string;
  source: string;
  url: string;
  photo: string; // primary photo (keeps existing uses working)
  photos?: string[]; // optional additional photos; slot 0 mirrors `photo`
  serves: number;
  minutes: number;
  lede: string;
  ingredients: string[];
  method: MethodStep[];
  editedMethod: MethodStep[];
  /** Doubled yield — pre-scaled companion used by the portion-scale
   *  candidates in Flow I. We keep this as static data (rather than
   *  parsing quantities at runtime) for the same reason `editedMethod`
   *  is static: the design binder shows outcomes, not runtime math.
   *  Method step TEXT is deliberately NOT doubled — timing and pan
   *  cues are cook judgment. Only top-ingredient quantities and the
   *  per-step `mise` lines change. */
  servesDoubled: number;
  ingredientsDoubled: string[];
  methodDoubled: MethodStep[];
};

/**
 * Photo fixtures used by Flow III (Photographs).
 * `photos` is the as-is state — one hero, the way the recipe lives in
 * the library today. `photosAfter` is the post-add state once the cook
 * has uploaded two phone snaps from last night's dinner: a process shot
 * of the pan and a wider mise-en-place. Slot 0 stays the canonical hero
 * in both arrays, so screens before V (the mosaic) stay visually stable.
 */
export const recipePhotos = ["/summer-corn-pasta.png"];
export const recipePhotosAfter = [
  "/summer-corn-pasta.png",
  "/design/photos/corn-pasta-process.jpg",
  "/design/photos/corn-pasta-mise.jpg",
];

/**
 * Note fixtures used by Flow IV (Notes). Apple Notes grammar — a
 * single free-text block per recipe, no structured metadata, no
 * list-of-entries model. The cook writes whatever they want in one
 * flowing body; two voices (cook-note and memory-note) can coexist
 * inside the same block as they type more over time.
 *
 *   sampleNoteWritten   — one voice (the cook-note, first write); I + IV
 *   sampleNoteExpanded  — both voices flowing into a single block; V
 */
export const sampleNoteWritten =
  "Halved the salt — nicer balance.";

export const sampleNoteExpanded =
  "Halved the salt — nicer balance. — Sam's 30th. Doubled it. Everyone wanted seconds. —";

/**
 * Line-item comment fixtures used by Flow V. One on step iv (method
 * index 3) — the cook's cooking-time adjustment — and one on the
 * butter line (ingredient index 6) — a quality preference. The two
 * voices cover different territory than the global note: the global
 * note is about the recipe as a whole; line-item comments annotate
 * specifics.
 */
export const sampleStepCommentIndex = 3;
export const sampleStepCommentText = "10–12 minutes — thickens better.";

export const sampleIngredientCommentIndex = 6;
export const sampleIngredientCommentText = "Cultured if I have it.";

export const sampleRecipe: SampleRecipe = {
  title: "Summer Corn & Basil Ragù",
  source: "table.kitchen",
  url: "table.kitchen/summer-corn-ragu",
  photo: "/summer-corn-pasta.png",
  photos: recipePhotos,
  serves: 4,
  minutes: 50,
  lede:
    "A brothy, buttery late-summer ragù that happens when you overshop at the farmers' market. Almost all pantry — corn, basil, a little wine, a spoon of white miso to finish.",
  ingredients: [
    "6 ears sweet corn, kernels scraped (cobs reserved)",
    "1 shallot, minced",
    "3 garlic cloves, thinly sliced",
    "1 cup dry white wine",
    "1 tbsp white miso",
    "1 cup basil leaves, torn",
    "3 tbsp unsalted butter",
    "Olive oil, salt, black pepper",
  ],
  method: [
    {
      text: "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
      mise: ["6 ears sweet corn", "3 cups water"],
    },
    {
      text: "Heat a wide pan over medium. Coat with olive oil, sweat shallot until translucent, 4 minutes. Add garlic, 30 seconds.",
      mise: ["olive oil", "1 shallot", "3 garlic cloves"],
    },
    {
      text: "Add kernels and a pinch of salt. Cook 3 minutes, until they pop and turn glossy.",
      mise: ["the scraped kernels", "salt"],
    },
    {
      text: "Deglaze with wine; reduce by half. Add 2 cups stock and the miso. Simmer gently 8 minutes — it should thicken to a loose ragù.",
      mise: ["1 cup white wine", "2 cups corn stock", "1 tbsp white miso"],
    },
    {
      text: "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
      mise: ["3 tbsp butter", "1 cup basil", "black pepper"],
    },
    {
      text: "Spoon onto toasted bread or polenta.",
      mise: ["toasted bread or polenta"],
    },
  ],
  editedMethod: [
    {
      text: "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
      mise: ["6 ears sweet corn", "3 cups water"],
    },
    {
      text: "Heat a wide pan over medium. Coat with olive oil, sweat shallot until translucent, 4 minutes. Add garlic, 30 seconds.",
      mise: ["olive oil", "1 shallot", "3 garlic cloves"],
    },
    {
      text: "Add kernels and a pinch of salt. Cook 3 minutes, until they pop and turn glossy.",
      mise: ["the scraped kernels", "salt"],
    },
    {
      text: "Deglaze with wine; reduce by half. Add 2 cups stock and the miso. Simmer gently 10–12 minutes — it should thicken to a loose ragù.",
      mise: ["1 cup white wine", "2 cups corn stock", "1 tbsp white miso"],
    },
    {
      text: "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
      mise: ["3 tbsp butter", "1 cup basil", "black pepper"],
    },
    {
      text: "Spoon onto toasted bread or polenta.",
      mise: ["toasted bread or polenta"],
    },
  ],
  servesDoubled: 8,
  ingredientsDoubled: [
    "12 ears sweet corn, kernels scraped (cobs reserved)",
    "2 shallots, minced",
    "6 garlic cloves, thinly sliced",
    "2 cups dry white wine",
    "2 tbsp white miso",
    "2 cups basil leaves, torn",
    "6 tbsp unsalted butter",
    "Olive oil, salt, black pepper",
  ],
  methodDoubled: [
    {
      text: "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
      mise: ["12 ears sweet corn", "6 cups water"],
    },
    {
      text: "Heat a wide pan over medium. Coat with olive oil, sweat shallot until translucent, 4 minutes. Add garlic, 30 seconds.",
      mise: ["olive oil", "2 shallots", "6 garlic cloves"],
    },
    {
      text: "Add kernels and a pinch of salt. Cook 3 minutes, until they pop and turn glossy.",
      mise: ["the scraped kernels", "salt"],
    },
    {
      text: "Deglaze with wine; reduce by half. Add 2 cups stock and the miso. Simmer gently 8 minutes — it should thicken to a loose ragù.",
      mise: ["2 cups white wine", "4 cups corn stock", "2 tbsp white miso"],
    },
    {
      text: "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
      mise: ["6 tbsp butter", "2 cups basil", "black pepper"],
    },
    {
      text: "Spoon onto toasted bread or polenta.",
      mise: ["toasted bread or polenta"],
    },
  ],
};
