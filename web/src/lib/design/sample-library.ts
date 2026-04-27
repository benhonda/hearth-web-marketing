/**
 * Sample library used by Flow II screens that render the photo
 * waterfall (LibraryPopulated, BookRecipes). Keeping this in one place
 * means continuity holds — the same set of recipes appears across
 * screens I and V of the book flow, and the corn ragù anchors both to
 * the real photo used everywhere else in the binder.
 *
 * The first N tiles are derived from the `recipes` registry — adding a
 * recipe there automatically populates the head of the waterfall and
 * gives that tile a working `href` into its `/design/screens/recipes/
 * <slug>` detail page. The trailing tiles are phantom decoration —
 * titles + meta + tone, no destination — there to give the waterfall
 * length and texture without inventing detail-screen content for them.
 *
 * Voice for the phantom tiles is the same farmers-market-y, Chez
 * Panisse / Ottolenghi register, mixed day-parts. Not tech-bro
 * meal-prep.
 */

import type { LibraryTileData } from "~/components/design/ui/LibraryGrid.astro";
import { recipes } from "./sample-recipe";

const recipeTiles: LibraryTileData[] = recipes.map((r) => ({
  title: r.title,
  meta: `${r.minutes} min · Serves ${r.serves}`,
  photo: r.photo,
  tone: r.tone,
  aspect: r.tileAspect ?? "4 / 5",
  href: `/design/screens/recipes/${r.slug}`,
}));

const phantomTiles: LibraryTileData[] = [
  { title: "Slow-roast tomato pasta",        meta: "1 hr 30 · Serves 4", aspect: "4 / 5", tone: "corn" },
  { title: "Brown-butter brassicas",         meta: "30 min · Serves 4", aspect: "3 / 4", tone: "sage" },
  { title: "Chickpea & preserved-lemon stew", meta: "45 min · Serves 4", aspect: "1 / 1", tone: "ochre" },
  { title: "Honey-rye sourdough",            meta: "Overnight · 1 loaf", aspect: "4 / 5", tone: "corn" },
  { title: "Burrata with stone fruit",       meta: "10 min · Serves 4", aspect: "3 / 4", tone: "ochre" },
  { title: "Fennel confit",                  meta: "2 hr · Serves 6", aspect: "1 / 1", tone: "sage" },
  { title: "Anchovy salsa verde",            meta: "10 min · 1 jar", aspect: "4 / 5", tone: "ochre" },
  { title: "Black-sesame banana bread",      meta: "1 hr · 1 loaf", aspect: "3 / 4", tone: "corn" },
  { title: "Whole roasted cauliflower",      meta: "1 hr · Serves 4", aspect: "1 / 1", tone: "sage" },
  { title: "Ricotta gnudi",                  meta: "40 min · Serves 4", aspect: "4 / 5", tone: "corn" },
  { title: "Tahini soft-serve",              meta: "5 min · Serves 6", aspect: "3 / 4", tone: "ochre" },
  { title: "Grilled apricots, ricotta",      meta: "15 min · Serves 4", aspect: "1 / 1", tone: "corn" },
  { title: "Brown-rice congee",              meta: "1 hr · Serves 4", aspect: "4 / 5", tone: "sage" },
  { title: "Saffron-onion tart",             meta: "1 hr 15 · Serves 6", aspect: "3 / 4", tone: "ochre" },
  { title: "Late-summer panzanella",         meta: "20 min · Serves 4", aspect: "1 / 1", tone: "corn" },
  { title: "Sweet-potato dahl",              meta: "45 min · Serves 6", aspect: "4 / 5", tone: "ochre" },
  { title: "Brûléed grapefruit",             meta: "5 min · Serves 2", aspect: "3 / 4", tone: "corn" },
  { title: "Cardamom buns",                  meta: "3 hr · 12 buns", aspect: "1 / 1", tone: "ochre" },
  { title: "Smoked-trout rillette",          meta: "10 min · 1 jar", aspect: "3 / 4", tone: "ochre" },
  { title: "Fig & sherry galette",           meta: "1 hr · Serves 8", aspect: "1 / 1", tone: "corn" },
  { title: "Plum clafoutis",                 meta: "45 min · Serves 6", aspect: "4 / 5", tone: "ochre" },
  { title: "Cucumber-buttermilk soup",       meta: "10 min · Serves 4", aspect: "3 / 4", tone: "sage" },
  { title: "Anchovy butter, radishes",       meta: "10 min · Serves 4", aspect: "1 / 1", tone: "ochre" },
];

export const sampleLibraryTiles: LibraryTileData[] = [
  ...recipeTiles,
  ...phantomTiles,
];
