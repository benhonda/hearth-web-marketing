/**
 * Sample library used by Flow II screens that render the photo
 * waterfall (LibraryPopulated, BookRecipes). Keeping this in one place
 * means continuity holds — the same 27 recipes appear across screens I
 * and V of the book flow, and the corn ragù anchors both to the real
 * photo used everywhere else in the binder.
 *
 * Voice is the archetype's: farmers-market-y, Chez Panisse / Ottolenghi
 * register, mixed day-parts. Not tech-bro meal-prep.
 */

import type { LibraryTileData } from "~/components/design/ui/LibraryGrid.astro";
import { sampleRecipe } from "./sample-recipe";

export const sampleLibraryTiles: LibraryTileData[] = [
  { title: sampleRecipe.title, meta: `${sampleRecipe.minutes} min · Serves ${sampleRecipe.serves}`, photo: sampleRecipe.photo, aspect: "4 / 5" },
  { title: "Olive oil & yogurt cake",        meta: "55 min · Serves 8", aspect: "3 / 4", tone: "ochre" },
  { title: "Wild mushroom toast",            meta: "20 min · Serves 2", aspect: "1 / 1", tone: "sage" },
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
  { title: "Charred leeks vinaigrette",      meta: "25 min · Serves 4", aspect: "4 / 5", tone: "sage" },
  { title: "Smoked-trout rillette",          meta: "10 min · 1 jar", aspect: "3 / 4", tone: "ochre" },
  { title: "Fig & sherry galette",           meta: "1 hr · Serves 8", aspect: "1 / 1", tone: "corn" },
  { title: "Plum clafoutis",                 meta: "45 min · Serves 6", aspect: "4 / 5", tone: "ochre" },
  { title: "Cucumber-buttermilk soup",       meta: "10 min · Serves 4", aspect: "3 / 4", tone: "sage" },
  { title: "Anchovy butter, radishes",       meta: "10 min · Serves 4", aspect: "1 / 1", tone: "ochre" },
];
