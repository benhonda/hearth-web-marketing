import type { ScreenRender } from "~/lib/design/flows";
import WelcomeScreen from "./WelcomeScreen.astro";
import LibraryEmpty from "./LibraryEmpty.astro";
import MobileSafariRecipe from "./MobileSafariRecipe.astro";
import ShareSheet from "./ShareSheet.astro";
import ImportPreview from "./ImportPreview.astro";
import LibraryOneRecipe from "./LibraryOneRecipe.astro";
import RecipeDetail from "./RecipeDetail.astro";
import RecipeDetailTappable from "./RecipeDetailTappable.astro";
import RecipeDetailPhotoTappable from "./RecipeDetailPhotoTappable.astro";
import RecipeDetailOverlay from "./RecipeDetailOverlay.astro";
import RecipeDetailScaled from "./RecipeDetailScaled.astro";
import RecipeEditMenu from "./RecipeEditMenu.astro";
import RecipePhotoMenu from "./RecipePhotoMenu.astro";
import RecipeEdit from "./RecipeEdit.astro";
import RecipeSaved from "./RecipeSaved.astro";
import LibraryPopulated from "./LibraryPopulated.astro";
import BookInvitation from "./BookInvitation.astro";
import BookOccasion from "./BookOccasion.astro";
import BookRecipes from "./BookRecipes.astro";
import BookLayout from "./BookLayout.astro";
import BookTitleCover from "./BookTitleCover.astro";
import BookPreview from "./BookPreview.astro";
import BookPageEdit from "./BookPageEdit.astro";
import BookSettings from "./BookSettings.astro";
import BookTitle from "./BookTitle.astro";
import BookSubtitle from "./BookSubtitle.astro";
import BookRecipesEdit from "./BookRecipesEdit.astro";
import BookReview from "./BookReview.astro";
import BookOnItsWay from "./BookOnItsWay.astro";

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
  "recipe-detail-tappable": RecipeDetailTappable,
  "recipe-detail-photo-tappable": RecipeDetailPhotoTappable,
  "recipe-detail-overlay": RecipeDetailOverlay,
  "recipe-detail-scaled": RecipeDetailScaled,
  "recipe-edit-menu": RecipeEditMenu,
  "recipe-photo-menu": RecipePhotoMenu,
  "recipe-edit": RecipeEdit,
  "recipe-saved": RecipeSaved,
  "library-populated": LibraryPopulated,
  "book-invitation": BookInvitation,
  "book-occasion": BookOccasion,
  "book-recipes": BookRecipes,
  "book-layout": BookLayout,
  "book-title-cover": BookTitleCover,
  "book-preview": BookPreview,
  "book-page-edit": BookPageEdit,
  "book-settings": BookSettings,
  "book-title": BookTitle,
  "book-subtitle": BookSubtitle,
  "book-recipes-edit": BookRecipesEdit,
  "book-review": BookReview,
  "book-on-its-way": BookOnItsWay,
};
