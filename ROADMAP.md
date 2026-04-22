# Roadmap

Scope-creep shield for Hearth V1. No dates on purpose. Sequential order. Each item has a weight dot and a one-line scope cap.

**When tempted to add something:** scroll the full length of this doc. If it still feels essential, something else comes OUT of Phase 1 first. The list does not grow.

**Weight legend:** ● light · ●● medium · ●●● heavy. Relative only — not day estimates, not commitments.

---

## Phase 0 — Validate before any app code

●● **Concierge cookbook for her**
Figma → Blurb → wrap → give it to her. Watch her reaction, her mom's, her friends'. If the object doesn't land in her hands, no app rescues this. Strike this line once done.

---

## Phase 1 — Ship the wedge

In order. Each row is locked to its cap.

●●● **1. Design system + the book template**
One template. One trim (8×10 hardcover, premium paper). Typography continuity app ≡ book. **Cap:** must pass the book-spine test before a single feature ships on top.

● **2. Auth**
Apple + Google. No email/password. No profile screen, no avatar, no settings beyond sign-out.

●● **3. Manual recipe entry**
Title, ingredients, method, photos. **Cap:** no categories, no tags, no ratings, no cook-time math.

● **4. Library**
Flat chronological (Apple Music model). Basic title search. **Cap:** no folders, no tags, no collections.

●●● **5. Make-a-book flow**
Multi-select → title + subtitle → cover photo → spread-by-spread preview. **Cap:** one template, one trim, no dedication page, no custom layouts.

●● **6. Stripe checkout**
Three SKUs: $99 / $119 / $139 for 40 / 60 / 80 pages. **Cap:** no upsells, no discounts, no multi-copy flow.

●● **7. Blurb fulfillment wiring**
Order submit → print → ship. Webhooks for status updates.

● **8. Order confirmation email**
Transactional only. Noun-led copy. **Cap:** no marketing, no newsletter opt-in, no referral.

● **9. Order tracking**
Status + carrier tracking link. **Cap:** no rich timeline UI beyond what's essential.

●● **10. Web URL import**
`schema.org/Recipe` JSON-LD parse. User can edit the extracted result before save.

●● **11. iOS share extension**
Share sheet → app. Android stays shelved.

●●● **12. TikTok / Instagram import**
Caption → LLM extraction → **user review step** → save. The review step is non-negotiable — it's how bad extractions get caught.

●● **13. Edit + version history**
Every save writes a version. No per-change notes, no branching.

●● **14. "Compare to original" diff view**
Strikethrough old / highlight new. This is the emotional moment — TikTok caption → her version of the recipe. Screenshot-worthy.

---

## Phase 2 — Ship-week polish

Only starts once all fourteen above are done. No polish while core is incomplete.

● **Empty states** — designed objects, not to-do lists.
● **Loading states** — calm, never bouncy.
●● **Craft moments** — pick **2–3** small unexpected touches. Ship them. Stop.
●● **Copy pass** — every confirmation, toast, error. Noun-led: *"Saved — it's in your library."* Never *"Great job!"*.
● **First-import hero flow** — the one screenshot that sells the app.

---

## Phase 3 — After ship

Nothing builds here. The only work is the validation ladder in `MVP.md`:

- 4–6 weeks post-launch: does she reach for it unprompted?
- First book order: does the output match the concierge version?
- 3–6 months: does anyone outside her circle want one?
- **6-month check-in:** honest evaluation against signals written down *now*. Don't move goalposts.

New feature ideas go through the `MVP.md` **Shelved** table. Every row there has a trigger. If the trigger isn't met, the answer is no.

---

## Scope-creep protocol

Before you add anything above the line:

1. Is it in the Shelved table? → Read its trigger. Met? If not, no.
2. Not in the table? → Write it down as a new Shelved row with a trigger *before* adding it anywhere else.
3. Still want it in Phase 1? → Something else has to come out. The list does not grow.

The point of this doc is to be long enough to scare you.
