# MVP

Build plan for Hearth V1. Living doc — update as features ship, shelve, or move.

## V1 (in)

The minimum to put a beautiful hardcover cookbook in your girlfriend's hands.

### 1. Auth
Apple + Google sign-in. No email/password.

### 2. Recipe import (share extension)
- iOS share sheet. Android shelved.
- **Web URLs**: parse `schema.org/Recipe` JSON-LD.
- **TikTok / Instagram**: caption → LLM extraction → user review step before save.
- User can edit extracted result before saving.

### 3. Manual recipe entry
Title, ingredients, method, photos. Fallback when no import source.

### 4. Recipe edit + history
- Edit after save.
- Every edit saves a version.
- "Compare to original" view with diff highlighting (strikethrough old / highlight new).
- Key emotional moment: diff against imported original (TikTok → my version).

### 5. Library
- Flat chronological list (Apple Music model).
- Basic title search.
- No folders, tags, or collections.

### 6. Make-a-book flow
- Multi-select recipes.
- Enter book title + subtitle.
- Pick cover photo from selected recipes.
- **One** template. **One** trim size (8×10 hardcover, premium paper).
- Spread-by-spread preview.

### 7. Checkout + fulfillment
- Stripe for payment.
- Blurb API for print + ship.
- Order confirmation email.

### 8. Order tracking
Order status + shipping tracking.

## Shelved

| Feature | Why shelved | Trigger to revisit |
| ------- | ----------- | ------------------ |
| AI photo enhancement | Template + typography can carry quality at V1. | After 10+ real books — if photo quality is the top complaint. ~1-day build via API (Topaz / Pixelcut). |
| Video transcript + keyframe extraction | Caption extraction covers most cases. | When caption-only misses >25% of imports based on user review corrections. |
| Multiple templates | One is enough to validate the wedge. | Post-V1 — add 2–3 based on user wishes. Each is real design work. |
| Multiple trim sizes | One covers 90% of use cases. | User demand for a specific alternative. |
| Collections / playlists | Pattern-based starters substitute. | Users asking "how do I organize these?" |
| Pattern-based book starters ("Your most-cooked", "Your desserts") | Needs usage data we don't have yet. | Users consistently have 50+ recipes. |
| Apple Music Replay–style suggestions | Needs usage history. | 6+ months of activity data. |
| Premium checkout upsells (dust jacket, linen cover, foil stamping) | Margin optimization, not core loop. | Shipping 20+ books/month. Highest-leverage ASP lever when ready. |
| Multi-copy discount flow | Add when someone asks. | First CS request for bulk. Easy build. |
| Personalized dedication page | Upsell, adds template work. | Alongside other upsells. |
| Occasion-triggered marketing (Mother's Day, anniversary) | Marketing layer, not product. | Any meaningful user base. CRM/email work. |
| Rich inline-diff edit history with per-change notes | Tier B diff solves the core pain. | User feedback asks for it. |
| Web app | Mobile is where photos live. | Clear user demand. |
| Android share extension | iOS-first. | Your girlfriend (or user #2) asks. |
| Family / shared libraries | Big scope, niche at V1. | Multiple direct requests. |
| Recipe scaling / unit conversion | Off-wedge. | Probably never. |
| Meal planning, shopping lists, nutrition tracking | Actively off-brand. | **Never.** |
| Ancillary products (recipe cards, aprons, cloth) | Margin extension, not a product need. | Primary cookbook business is stable and profitable. |
| Direct printer (replacing Blurb) | Complexity only worth it at scale. | ~500+ books/month. COGS cut 25–40%. |

## Build order (suggested, not binding)

1. **Design system + typography + the book template.** Non-technical, load-bearing. If the template doesn't look like a real cookbook, nothing else matters.
2. Auth + manual recipe entry + library (plumbing).
3. Make-a-book flow + preview (the magic moment — needs the template).
4. Blurb integration + Stripe checkout.
5. Share extension + web URL import.
6. TikTok/IG import with LLM extraction.
7. Edit history + diff view.
8. Polish: empty state, loading states, craft details.

Template first. Everything else assumes it's beautiful.
