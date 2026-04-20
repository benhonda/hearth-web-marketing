/**
 * Sample recipe used by screens V–IX. Keeping this in one place means
 * the import preview, detail, edit, and saved screens all show the
 * same content, so the flow feels continuous.
 *
 * The original method step iii reads "8 minutes" — the edit flow (VIII)
 * changes it to "10–12 minutes" to reflect a real home-cook correction.
 */

export type SampleRecipe = {
  title: string;
  source: string;
  url: string;
  serves: number;
  minutes: number;
  lede: string;
  ingredients: string[];
  method: string[];
  editedMethod: string[];
};

export const sampleRecipe: SampleRecipe = {
  title: "Summer Corn & Basil Ragù",
  source: "table.kitchen",
  url: "table.kitchen/summer-corn-ragu",
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
    "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
    "Heat a wide pan over medium. Coat with olive oil, sweat shallot until translucent, 4 minutes. Add garlic, 30 seconds.",
    "Add kernels and a pinch of salt. Cook 3 minutes, until they pop and turn glossy.",
    "Deglaze with wine; reduce by half. Add 2 cups stock and the miso. Simmer gently 8 minutes — it should thicken to a loose ragù.",
    "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
    "Spoon onto toasted bread or polenta.",
  ],
  editedMethod: [
    "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
    "Heat a wide pan over medium. Coat with olive oil, sweat shallot until translucent, 4 minutes. Add garlic, 30 seconds.",
    "Add kernels and a pinch of salt. Cook 3 minutes, until they pop and turn glossy.",
    "Deglaze with wine; reduce by half. Add 2 cups stock and the miso. Simmer gently 10–12 minutes — it should thicken to a loose ragù.",
    "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
    "Spoon onto toasted bread or polenta.",
  ],
};
