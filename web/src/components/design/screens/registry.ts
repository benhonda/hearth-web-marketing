import type { ScreenRender } from "~/lib/design/flows";
import WelcomeScreen from "./WelcomeScreen.astro";
import LibraryEmpty from "./LibraryEmpty.astro";
import ImportSurface from "./ImportSurface.astro";
import ImportSurfacePasted from "./ImportSurfacePasted.astro";
import MobileSafariRecipe from "./MobileSafariRecipe.astro";
import ShareSheet from "./ShareSheet.astro";
import ImportPreview from "./ImportPreview.astro";
import LibraryOneRecipe from "./LibraryOneRecipe.astro";
import RecipeDetail from "./RecipeDetail.astro";
import RecipeDetailTappable from "./RecipeDetailTappable.astro";
import RecipeDetailPhotoTappable from "./RecipeDetailPhotoTappable.astro";
import RecipeDetailCarousel from "./RecipeDetailCarousel.astro";
import RecipePhotoGallery from "./RecipePhotoGallery.astro";
import RecipeDetailOverlay from "./RecipeDetailOverlay.astro";
import RecipeDetailScaled from "./RecipeDetailScaled.astro";
import RecipeEditMenu from "./RecipeEditMenu.astro";
import RecipePhotoMenu from "./RecipePhotoMenu.astro";
import RecipeSourceSheet from "./RecipeSourceSheet.astro";
import PhotoPicker from "./PhotoPicker.astro";
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
import BookPageEditPickHero from "./BookPageEditPickHero.astro";
import BookPreviewPromoted from "./BookPreviewPromoted.astro";
import BookPreviewHeroSwapped from "./BookPreviewHeroSwapped.astro";
import BookSettings from "./BookSettings.astro";
import BookTitle from "./BookTitle.astro";
import BookSubtitle from "./BookSubtitle.astro";
import BookRecipesEdit from "./BookRecipesEdit.astro";
import BookReview from "./BookReview.astro";
import BookOnItsWay from "./BookOnItsWay.astro";
import RecipeDetailEmptyNote from "./RecipeDetailEmptyNote.astro";
import RecipeNoteCompose from "./RecipeNoteCompose.astro";
import RecipeDetailWithNote from "./RecipeDetailWithNote.astro";
import RecipeNoteEdit from "./RecipeNoteEdit.astro";
import RecipeDetailExpandedNote from "./RecipeDetailExpandedNote.astro";
import RecipeDetailPreComment from "./RecipeDetailPreComment.astro";
import RecipeStepCommentMenu from "./RecipeStepCommentMenu.astro";
import RecipeStepCommentCompose from "./RecipeStepCommentCompose.astro";
import RecipeDetailStepCommented from "./RecipeDetailStepCommented.astro";
import RecipeIngredientCommentCompose from "./RecipeIngredientCommentCompose.astro";
import RecipeDetailFullyAnnotated from "./RecipeDetailFullyAnnotated.astro";
import RecipeDetailUnits from "./RecipeDetailUnits.astro";
import RecipeDetailUnitsPicker from "./RecipeDetailUnitsPicker.astro";
import RecipeDetailInGrams from "./RecipeDetailInGrams.astro";
import LibraryWithFriendsDoorway from "./LibraryWithFriendsDoorway.astro";
import CircleFriends from "./CircleFriends.astro";
import SharedCollection from "./SharedCollection.astro";
import RecipeWithCreditChain from "./RecipeWithCreditChain.astro";
import LibraryAfterFriendSave from "./LibraryAfterFriendSave.astro";
import ImportTranscription from "./ImportTranscription.astro";
import ImportPreviewPhoto from "./ImportPreviewPhoto.astro";
import ImportProcessing from "./ImportProcessing.astro";
import ImportPreviewUnitPicker from "./ImportPreviewUnitPicker.astro";

/**
 * Maps a FlowStep's `render` key to its Astro component. Shared by
 * FlowStoryboard (storyboard canvas) and ScreenDetail (1× detail pages) so
 * the mapping is defined once.
 *
 * Partial because a render key can be added to the union before its
 * component lands; the storyboard renders missing entries as "Next pass"
 * placeholders, which is exactly the behavior we want during
 * in-progress drafts.
 */
export const screenComponents: Partial<Record<ScreenRender, any>> = {
  welcome: WelcomeScreen,
  "library-empty": LibraryEmpty,
  "import-surface": ImportSurface,
  "import-surface-pasted": ImportSurfacePasted,
  "mobile-safari-recipe": MobileSafariRecipe,
  "share-sheet": ShareSheet,
  "import-preview": ImportPreview,
  "library-one-recipe": LibraryOneRecipe,
  "recipe-detail": RecipeDetail,
  "recipe-detail-tappable": RecipeDetailTappable,
  "recipe-detail-photo-tappable": RecipeDetailPhotoTappable,
  "recipe-detail-carousel": RecipeDetailCarousel,
  "recipe-photo-gallery": RecipePhotoGallery,
  "recipe-detail-overlay": RecipeDetailOverlay,
  "recipe-detail-scaled": RecipeDetailScaled,
  "recipe-edit-menu": RecipeEditMenu,
  "recipe-photo-menu": RecipePhotoMenu,
  "recipe-source-sheet": RecipeSourceSheet,
  "photo-picker": PhotoPicker,
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
  "book-page-edit-pick-hero": BookPageEditPickHero,
  "book-preview-promoted": BookPreviewPromoted,
  "book-preview-hero-swapped": BookPreviewHeroSwapped,
  "book-settings": BookSettings,
  "book-title": BookTitle,
  "book-subtitle": BookSubtitle,
  "book-recipes-edit": BookRecipesEdit,
  "book-review": BookReview,
  "book-on-its-way": BookOnItsWay,
  "recipe-detail-empty-note": RecipeDetailEmptyNote,
  "recipe-note-compose": RecipeNoteCompose,
  "recipe-detail-with-note": RecipeDetailWithNote,
  "recipe-note-edit": RecipeNoteEdit,
  "recipe-detail-expanded-note": RecipeDetailExpandedNote,
  "recipe-detail-pre-comment": RecipeDetailPreComment,
  "recipe-step-comment-menu": RecipeStepCommentMenu,
  "recipe-step-comment-compose": RecipeStepCommentCompose,
  "recipe-detail-step-commented": RecipeDetailStepCommented,
  "recipe-ingredient-comment-compose": RecipeIngredientCommentCompose,
  "recipe-detail-fully-annotated": RecipeDetailFullyAnnotated,
  "recipe-detail-units": RecipeDetailUnits,
  "recipe-detail-units-picker": RecipeDetailUnitsPicker,
  "recipe-detail-in-grams": RecipeDetailInGrams,
  "library-with-friends-doorway": LibraryWithFriendsDoorway,
  "circle-friends": CircleFriends,
  "shared-collection": SharedCollection,
  "recipe-with-credit-chain": RecipeWithCreditChain,
  "library-after-friend-save": LibraryAfterFriendSave,
  "import-transcription": ImportTranscription,
  "import-preview-photo": ImportPreviewPhoto,
  "import-processing": ImportProcessing,
  "import-preview-unit-picker": ImportPreviewUnitPicker,
};
