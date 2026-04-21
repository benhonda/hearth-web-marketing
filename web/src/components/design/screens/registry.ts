import type { ScreenRender } from "~/lib/design/flows";
import WelcomeScreen from "./WelcomeScreen.astro";
import LibraryEmpty from "./LibraryEmpty.astro";
import MobileSafariRecipe from "./MobileSafariRecipe.astro";
import ShareSheet from "./ShareSheet.astro";
import ImportPreview from "./ImportPreview.astro";
import LibraryOneRecipe from "./LibraryOneRecipe.astro";
import RecipeDetail from "./RecipeDetail.astro";
import RecipeEditMenu from "./RecipeEditMenu.astro";
import RecipeEdit from "./RecipeEdit.astro";
import RecipeSaved from "./RecipeSaved.astro";
import LibraryPopulated from "./LibraryPopulated.astro";
import BookInvitation from "./BookInvitation.astro";
import BookOccasion from "./BookOccasion.astro";
import BookRecipes from "./BookRecipes.astro";
import BookSettings from "./BookSettings.astro";
import BookTitleCover from "./BookTitleCover.astro";
import BookPreview from "./BookPreview.astro";
import BookSpreadEdit from "./BookSpreadEdit.astro";

/**
 * Maps a FlowStep's `render` key to its Astro component. Shared by
 * FlowStoryboard (storyboard canvas) and ScreenDetail (1× detail pages) so
 * the mapping is defined once.
 */
export const screenComponents: Record<ScreenRender, any> = {
  welcome: WelcomeScreen,
  "library-empty": LibraryEmpty,
  "mobile-safari-recipe": MobileSafariRecipe,
  "share-sheet": ShareSheet,
  "import-preview": ImportPreview,
  "library-one-recipe": LibraryOneRecipe,
  "recipe-detail": RecipeDetail,
  "recipe-edit-menu": RecipeEditMenu,
  "recipe-edit": RecipeEdit,
  "recipe-saved": RecipeSaved,
  "library-populated": LibraryPopulated,
  "book-invitation": BookInvitation,
  "book-occasion": BookOccasion,
  "book-recipes": BookRecipes,
  "book-settings": BookSettings,
  "book-title-cover": BookTitleCover,
  "book-preview": BookPreview,
  "book-spread-edit": BookSpreadEdit,
};
