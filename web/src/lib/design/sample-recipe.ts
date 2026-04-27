/**
 * Recipe fixtures for the design binder.
 *
 * The shape splits cleanly in two:
 *
 *   · Core (required) — slug, title, source, url, serves, minutes, lede,
 *     ingredients, method. Anything a real recipe page needs to render.
 *
 *   · Rich extras (optional) — editedMethod, methodDoubled,
 *     ingredientsDoubled, servesDoubled, ingredientsInGrams, methodInGrams,
 *     photo, photos, tone, tileAspect. These power specific story
 *     moments in flows (Flow I portion-scaling, VI grams, VIII edits)
 *     and are static outcomes rather than runtime computation — the
 *     binder shows the result, not the math.
 *
 * Adding a new example recipe = append a `Recipe` object to `recipes`.
 * Library tiles and the `/design/screens/recipes/[slug]` detail page
 * both pick it up automatically. With no `photo`, the library tile
 * falls back to the `tone` gradient and the detail hero uses a tone
 * band — so a new recipe renders end-to-end without any new image
 * assets.
 *
 * The corn-ragù-specific story exports below (`recipePhotos`,
 * `sampleNoteWritten`, `sampleStepCommentText`, etc.) stay as separate
 * exports rather than recipe properties because they are scene state
 * for one specific story arc, not data that any other recipe could
 * meaningfully carry.
 */

export type MethodStep = {
  text: string;
  mise: string[];
};

/** Background gradient used by both the library tile and the detail
 *  hero when a recipe has no `photo`. Same palette as LibraryTile so
 *  a tile and its detail page read as the same recipe. */
export type RecipeTone = "corn" | "sage" | "ochre";

/** Library waterfall aspect ratio. Mixed across recipes to keep the
 *  two-column waterfall from feeling rigid. */
export type TileAspect = "4 / 5" | "3 / 4" | "1 / 1";

export type Recipe = {
  /** URL slug — drives the dynamic detail route. */
  slug: string;
  title: string;
  source: string;
  url: string;
  serves: number;
  minutes: number;
  lede: string;
  ingredients: string[];
  method: MethodStep[];

  /** Hero / library photo. Falls back to the `tone` gradient when omitted. */
  photo?: string;
  /** Additional hero photos for the detail carousel. Slot 0 mirrors `photo`. */
  photos?: string[];
  tone?: RecipeTone;
  tileAspect?: TileAspect;

  /** Doubled-yield companion used by Flow I's portion-scale moment.
   *  Method step TEXT is deliberately NOT doubled — timing and pan
   *  cues are cook judgment. Only ingredients and per-step `mise`. */
  servesDoubled?: number;
  ingredientsDoubled?: string[];
  methodDoubled?: MethodStep[];

  /** Edited variant — Flow VIII shows a real home-cook correction
   *  (the cook bumps step iv from "8 minutes" to "10–12"). */
  editedMethod?: MethodStep[];

  /** Unit-converted variants — Flow VI (Measures). Static outcomes,
   *  not runtime conversion (same reason `methodDoubled` is static). */
  ingredientsInGrams?: string[];
  methodInGrams?: MethodStep[];
};

/* ──────────────────────────────────────────────────────────────────
 * Corn ragù — the fully loaded story recipe. Anchors Flow I and is
 * the recipe every flow in the binder ultimately threads through.
 * ────────────────────────────────────────────────────────────────── */

export const cornRagu: Recipe = {
  slug: "summer-corn-ragu",
  title: "Summer Corn & Basil Ragù",
  source: "table.kitchen",
  url: "table.kitchen/summer-corn-ragu",
  photo: "/summer-corn-pasta.png",
  photos: ["/summer-corn-pasta.png"],
  tileAspect: "4 / 5",
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
  /* Densities follow the obvious USDA-ish numbers (1 cup wine = 240 g,
   * 1 tbsp miso ≈ 20 g, 1 cup torn basil ≈ 25 g, 1 tbsp butter = 14 g,
   * 1 cup water/stock ≈ 237 g rounded). Count-based lines (corn ears,
   * shallot, cloves) and seasoning-without-amount lines pass through
   * unchanged — there's nothing to convert. */
  ingredientsInGrams: [
    "6 ears sweet corn, kernels scraped (cobs reserved)",
    "1 shallot, minced",
    "3 garlic cloves, thinly sliced",
    "240 g dry white wine",
    "20 g white miso",
    "25 g basil leaves, torn",
    "42 g unsalted butter",
    "Olive oil, salt, black pepper",
  ],
  methodInGrams: [
    {
      text: "Scrape kernels into a bowl. Simmer the stripped cobs in 3 cups water for 20 minutes for a quick corn stock. Strain.",
      mise: ["6 ears sweet corn", "710 g water"],
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
      mise: ["240 g white wine", "475 g corn stock", "20 g white miso"],
    },
    {
      text: "Off heat, stir in butter and torn basil. Taste; pepper heavily.",
      mise: ["42 g butter", "25 g basil", "black pepper"],
    },
    {
      text: "Spoon onto toasted bread or polenta.",
      mise: ["toasted bread or polenta"],
    },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * Stub recipes — core only, no rich extras, no photos. Each renders
 * end-to-end via the toned-gradient hero in RecipeDetail. Drop a real
 * `photo` later (one-line edit) and the gradient gives way.
 *
 * Voice and titles continue the corn-ragù register: Chez Panisse /
 * Ottolenghi farmers-market grammar.
 * ────────────────────────────────────────────────────────────────── */

export const oliveOilCake: Recipe = {
  slug: "olive-oil-yogurt-cake",
  title: "Olive Oil & Yogurt Cake",
  source: "the marginalia",
  url: "themarginalia.cooking/olive-oil-yogurt-cake",
  tone: "ochre",
  tileAspect: "3 / 4",
  serves: 8,
  minutes: 55,
  lede:
    "The cake to keep on the counter under a glass dome. Bakes into something dense and tender — moss-yellow crumb, the smallest bitterness from the oil, the smallest tang from the yogurt.",
  ingredients: [
    "1 ¼ cups all-purpose flour",
    "¾ cup almond flour",
    "1 tsp baking powder",
    "½ tsp fine sea salt",
    "3 large eggs",
    "1 cup sugar",
    "1 cup whole-milk yogurt",
    "¾ cup good olive oil, plus more for the pan",
    "Zest of 1 lemon",
    "1 tbsp orange-flower water (optional)",
  ],
  method: [
    {
      text: "Heat oven to 350°F. Oil a 9-inch round pan; line with parchment.",
      mise: ["olive oil", "9-inch pan", "parchment"],
    },
    {
      text: "Whisk both flours, baking powder, and salt in a bowl.",
      mise: ["1 ¼ cups flour", "¾ cup almond flour", "1 tsp baking powder", "½ tsp salt"],
    },
    {
      text: "In a second bowl, whisk eggs and sugar until pale and ribbony, 1 minute. Whisk in yogurt, oil, zest, and orange-flower water.",
      mise: ["3 eggs", "1 cup sugar", "1 cup yogurt", "¾ cup olive oil", "lemon zest", "orange-flower water"],
    },
    {
      text: "Fold the dry into the wet in three additions. Stop when no streaks remain — do not overmix.",
      mise: ["the dry mix"],
    },
    {
      text: "Pour into the pan. Bake 40–45 minutes, until the top is deep gold and a tester comes out with a few damp crumbs.",
      mise: ["the batter"],
    },
    {
      text: "Cool 15 minutes in the pan, then turn out. Eat at room temp, with stewed fruit or just a finger of cream.",
      mise: ["a wire rack"],
    },
  ],
};

export const mushroomToast: Recipe = {
  slug: "wild-mushroom-toast",
  title: "Wild Mushroom Toast",
  source: "Sunday Suppers",
  url: "sundaysuppers.com/wild-mushroom-toast",
  tone: "sage",
  tileAspect: "1 / 1",
  serves: 2,
  minutes: 20,
  lede:
    "The fall lunch when the farmer's-market haul is too good to do anything fussy with. Mushrooms hard-seared in a single layer, finished with sherry, piled on grilled bread rubbed with garlic.",
  ingredients: [
    "½ lb mixed wild mushrooms (chanterelle, maitake, oyster), torn",
    "2 tbsp olive oil",
    "1 tbsp unsalted butter",
    "2 thyme sprigs",
    "1 garlic clove, smashed (plus 1 raw clove for the toast)",
    "2 tbsp dry sherry",
    "2 thick slices country sourdough",
    "Flaky salt, black pepper",
    "Lemon, parsley, to finish",
  ],
  method: [
    {
      text: "Heat a wide cast-iron pan over high until smoking. Add olive oil, then the mushrooms in a single layer. Do not stir for 2 minutes — let them sear.",
      mise: ["cast-iron pan", "2 tbsp olive oil", "the mushrooms"],
    },
    {
      text: "Toss once. Add butter, thyme, smashed garlic. Cook 2 more minutes, until deeply browned at the edges.",
      mise: ["1 tbsp butter", "2 thyme sprigs", "1 smashed garlic clove"],
    },
    {
      text: "Off heat, deglaze with sherry. Swirl until the pan is glossy. Salt heavily.",
      mise: ["2 tbsp sherry", "salt"],
    },
    {
      text: "Grill the bread over a flame or in a dry pan until charred at the edges. Rub the warm toasts with the raw garlic clove.",
      mise: ["2 slices sourdough", "1 raw garlic clove"],
    },
    {
      text: "Pile the mushrooms on. Black pepper, parsley, a squeeze of lemon. Eat immediately.",
      mise: ["lemon", "parsley", "black pepper"],
    },
  ],
};

export const carrotCake: Recipe = {
  slug: "broma-carrot-cake",
  title: "The Best Carrot Cake in the World",
  source: "Broma Bakery",
  url: "bromabakery.com/the-best-carrot-cake-in-the-world",
  photo: "/design/library/carrot-cake-hero.jpg",
  photos: [
    "/design/library/carrot-cake-hero.jpg",
    "/design/library/carrot-cake-slice.jpg",
  ],
  tone: "ochre",
  tileAspect: "3 / 4",
  serves: 16,
  minutes: 45,
  lede:
    "The carrot cake that ends the argument. Crushed pineapple keeps every crumb wet for days; coconut and raisins disappear into the spice. Cream cheese frosting on top because anything else is a compromise.",
  ingredients: [
    "2 cups shredded carrots",
    "8 oz crushed pineapple, drained",
    "¾ cup sweetened shredded coconut",
    "½ cup raisins",
    "1 ½ cups sugar",
    "1 cup vegetable oil",
    "4 large eggs, room temperature",
    "2 tsp vanilla extract",
    "2 cups all-purpose flour",
    "1 ½ tsp baking powder",
    "2 tsp baking soda",
    "2 tsp cinnamon",
    "1 tsp salt",
    "—",
    "For the cream cheese frosting:",
    "½ cup unsalted butter, room temperature",
    "5 oz cream cheese, softened",
    "1 tsp vanilla extract",
    "½ tsp salt",
    "3 cups powdered sugar",
  ],
  method: [
    {
      text: "Heat oven to 350°F. Butter and flour two 8-inch round pans.",
      mise: ["two 8-inch pans", "butter and flour for the pans"],
    },
    {
      text: "In a large bowl, whisk together the wet team — carrots, pineapple, coconut, raisins, sugar, oil, eggs, and vanilla. It will look loose and wrong; it's right.",
      mise: [
        "2 cups carrots",
        "8 oz pineapple",
        "¾ cup coconut",
        "½ cup raisins",
        "1 ½ cups sugar",
        "1 cup oil",
        "4 eggs",
        "2 tsp vanilla",
      ],
    },
    {
      text: "In a second bowl, whisk the dry — flour, baking powder, baking soda, cinnamon, salt.",
      mise: [
        "2 cups flour",
        "1 ½ tsp baking powder",
        "2 tsp baking soda",
        "2 tsp cinnamon",
        "1 tsp salt",
      ],
    },
    {
      text: "Fold the dry into the wet in three additions. Stop when no streaks remain — overmixing tightens the crumb.",
      mise: ["the dry mix"],
    },
    {
      text: "Divide between the pans. Bake 25 minutes, until the tops spring back and a tester comes out clean. Cool completely in the pans on a rack.",
      mise: ["the batter", "a wire rack"],
    },
    {
      text: "Whip butter and cream cheese in a stand mixer on medium-high until pale and fluffy, 4 minutes. Scrape the bowl.",
      mise: ["½ cup butter", "5 oz cream cheese"],
    },
    {
      text: "Add vanilla, salt, and powdered sugar. Whip 2 more minutes — it should hold a soft peak.",
      mise: ["1 tsp vanilla", "½ tsp salt", "3 cups powdered sugar"],
    },
    {
      text: "Set the first layer on the plate. Spread a third of the frosting across the top. Stack the second layer; frost the top and sides in long, easy strokes.",
      mise: ["the cooled cakes", "the frosting"],
    },
  ],
};

export const charredLeeks: Recipe = {
  slug: "charred-leeks-vinaigrette",
  title: "Charred Leeks Vinaigrette",
  source: "the marginalia",
  url: "themarginalia.cooking/charred-leeks",
  tone: "sage",
  tileAspect: "4 / 5",
  serves: 4,
  minutes: 25,
  lede:
    "Leeks cooked dark — black on the outside, sweet and silky inside — over a sharp mustard vinaigrette and chopped egg. The room-temperature first course you bring to a dinner party.",
  ingredients: [
    "6 medium leeks, trimmed to white and pale green",
    "Olive oil, for the pan",
    "2 hard-boiled eggs, finely chopped",
    "1 tbsp Dijon mustard",
    "1 tbsp sherry vinegar",
    "1 small shallot, minced",
    "3 tbsp olive oil",
    "1 tbsp capers, rinsed",
    "Flat-leaf parsley, finely chopped",
    "Flaky salt, black pepper",
  ],
  method: [
    {
      text: "Halve the leeks lengthwise. Soak in cold water; rinse thoroughly between the layers. Pat dry.",
      mise: ["6 leeks", "a bowl of cold water"],
    },
    {
      text: "Heat a heavy pan over medium-high. Coat with olive oil. Lay the leeks cut-side down. Cook undisturbed 6–8 minutes — they should char black at the edges.",
      mise: ["olive oil", "the leeks"],
    },
    {
      text: "Flip. Add a splash of water, cover, and cook 4 more minutes until tender all the way through. Transfer to a platter, cut-side up.",
      mise: ["a splash of water"],
    },
    {
      text: "Whisk mustard, vinegar, and shallot. Stream in olive oil. Stir in capers and parsley. Season.",
      mise: ["1 tbsp mustard", "1 tbsp vinegar", "1 shallot", "3 tbsp olive oil", "1 tbsp capers", "parsley"],
    },
    {
      text: "Spoon the vinaigrette over the warm leeks. Scatter the chopped egg across the top. Pepper, flaky salt. Serve at room temperature.",
      mise: ["the vinaigrette", "2 chopped eggs", "flaky salt", "black pepper"],
    },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * Registry. Append a new `Recipe` here and it shows up in the library
 * waterfall AND gets a working detail page at
 * `/design/screens/recipes/<slug>` automatically.
 * ────────────────────────────────────────────────────────────────── */

export const recipes: Recipe[] = [
  cornRagu,
  carrotCake,
  oliveOilCake,
  mushroomToast,
  charredLeeks,
];

/** The canonical "the recipe" used by every story screen in the binder.
 *  Aliased so existing imports of `sampleRecipe` keep working — the
 *  story flows (I, IV, V, VI, VII, book) are written *about* the
 *  corn ragù specifically, so they stay coupled to it by name. */
export const sampleRecipe = cornRagu;

/** SampleRecipe is kept as a back-compat type alias for screens
 *  (BookPage, BookSpread, BookEdit, etc.) that imported it. */
export type SampleRecipe = Recipe;

/* ──────────────────────────────────────────────────────────────────
 * Corn-ragù-specific story state. These are scene fixtures (one cook's
 * note here, one comment on step iv there) — not data any other recipe
 * could meaningfully carry — so they live as standalone exports rather
 * than as fields on the recipe object.
 * ────────────────────────────────────────────────────────────────── */

/** Photo fixtures used by Flow III (Photographs).
 *  `recipePhotos` is the as-is state — one hero. `recipePhotosAfter` is
 *  the post-add state once the cook has uploaded two phone snaps from
 *  last night's dinner. Slot 0 stays the canonical hero in both. */
export const recipePhotos = ["/summer-corn-pasta.png"];
export const recipePhotosAfter = [
  "/summer-corn-pasta.png",
  "/design/photos/corn-pasta-process.jpg",
  "/design/photos/corn-pasta-mise.jpg",
];

/** Note fixtures used by Flow IV (Notes). Apple Notes grammar — a single
 *  free-text block per recipe, no structured metadata.
 *
 *    sampleNoteWritten   — one voice (the cook-note, first write); I + IV
 *    sampleNoteExpanded  — both voices flowing into a single block; V */
export const sampleNoteWritten =
  "Halved the salt — nicer balance.";
export const sampleNoteExpanded =
  "Halved the salt — nicer balance. — Sam's 30th. Doubled it. Everyone wanted seconds. —";

/** Line-item comment fixtures used by Flow V. One on step iv (the
 *  cook's cooking-time adjustment) and one on the butter line (a
 *  quality preference). */
export const sampleStepCommentIndex = 3;
export const sampleStepCommentText = "10–12 minutes — thickens better.";
export const sampleIngredientCommentIndex = 6;
export const sampleIngredientCommentText = "Cultured if I have it.";

/** Re-exports of the corn-ragù grams variants — kept as standalone
 *  exports because RecipeDetail and a couple of Flow VI screens import
 *  them by name. New code should prefer `recipe.ingredientsInGrams` /
 *  `recipe.methodInGrams`. */
export const ingredientsInGrams = cornRagu.ingredientsInGrams!;
export const methodInGrams = cornRagu.methodInGrams!;
