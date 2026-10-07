# How to maintain the Tsiardaka Apartment website

## The golden rules

1. **Edit only `index.html` (Greek) and `js/language-switcher.js` (all texts, Greek + English).**
2. **Never edit `en/index.html` by hand.** It is generated. GitHub rebuilds it automatically
   a minute after every push (Actions tab -> "Build pages"), so **you do not need to run anything**.
   The bot adds a commit "chore: refresh pages...": always run `git pull --rebase origin main`
   before your next push. (Optional, only if you want to test locally: `python3 tools/build.py`;
   on Windows try `python` or `py` instead of `python3`, and install Node.js from nodejs.org.)
3. Save, then **commit and push** (see "Publishing" below).

(`python3` and `node` must be installed. If `python3 tools/build.py` prints
`untranslated keys: none`, everything is fine.)

## Where things live

| I want to change... | File | What to look for |
|---|---|---|
| Any visible text (Greek or English) | `js/language-switcher.js` | Find the text; the Greek block is first (`el:`), the English block second (`en:`) |
| Prices / offers | `js/language-switcher.js` | `offers.offer1.new_price`, `old_price` ... (change both languages) |
| Phone, email, Airbnb/Booking links | `js/site/config.js` and `index.html` | Search for `306987589044` or the link |
| Photos in the gallery | `images/gallery/` + `index.html` | See "Add a photo" below |
| Colours | `css/style.css` | Top of the file, `:root { --cream ... }` |

## When your Booking.com rating changes (example: 9.4 -> 9.5, 15 -> 17 reviews)

Google reads the rating from a hidden data block, so it must be updated too.
There are **4 places**, all easy to find with Search (Ctrl+Shift+F in VS Code):

1. `index.html` - search `ratingValue` -> change `"9.4"` to the new rating.
2. `index.html` - search `reviewCount` -> change `"15"` to the new number of reviews.
3. `index.html` - search `data-target="9.4"` -> change to the new rating (this is the big number in "About").
4. `js/language-switcher.js` - search `15 κριτικές` and `15 reviews` -> change the number (2 places, one per language).

Then run `python3 tools/build.py`, commit, and push.

**Important rules for Google:** only write ratings that are real and visible on the page.
Never invent numbers. Do not change `bestRating` (it is 10 for Booking.com).
After publishing, you can check the page with Google's "Rich Results Test"
(search that name on Google, paste your site address).

New guest review cards: copy an existing `<div class="review-card">` block in `index.html`
(inside `id="reviews"`), change the name, text and score.

## Changing prices / the New Year offer

`js/language-switcher.js`, search `offers.offer1` (New Year), `offer2` (weekdays), `offer3` (7+ days).
Change the `title`, `subtitle`, `old_price`, `new_price` and features in **both** language blocks.
**The discount percentage is automatic.** Only edit `old_price` and `new_price` (both languages);
the "Έκπτωση X%" line is calculated by the site as (old - new) / old. Leave the last feature line
(`feature3`) as it is - just keep a number and a `%` in it.
If an old (crossed-out) price was not really charged recently, set `old_price` to `""` (empty quotes):
the crossed-out price and the discount line then disappear by themselves - EU rules.

## Add a photo to the gallery

1. Put the original photo in `images/gallery/` (name it like `kitchen-new.jpg`, no spaces).
2. Make web sizes: install sharp once (`npm install --no-save sharp`), add the file name to the list
   in `tools/optimize-images.mjs`, then run `node tools/optimize-images.mjs`.
3. In `index.html` copy one `<div class="gallery-strip-item" ...>` block, change the file names and
   the caption, and put it in the right room group. Keep the `data-room` word the same as the room.
4. Update the counter in `<div class="gallery-counter">1/30</div>` (the total number).
5. `python3 tools/build.py`, commit, push.

## Availability calendar

It updates **by itself every hour** from your Airbnb calendar (GitHub: Actions tab -> "Update availability").
Booking.com or direct bookings do not appear there - block those dates in your Airbnb calendar too.
To refresh immediately: GitHub -> Actions -> Update availability -> Run workflow.

## Seasonal checklist (do this each season)

- Check the New Year offer dates and prices.
- Footer year (`footer.copyright`, both languages) once a year.
- Hero photo: Christmas photo all year may feel seasonal - swap in spring/summer if bookings drop.
- Look at Google Analytics (Reports -> Realtime / Acquisition) to see which buttons visitors press.
- `sitemap.xml`: change the `<lastmod>` date when you make big changes.

## Publishing (Git) - step by step

The branch is called **`main`** (not "mai").

```
git status                      # see what you changed
git add -A                      # prepare all changes
git commit -m "Short message"   # save them with a description
git pull --rebase origin main   # get anyone else's changes first (safe habit)
git push origin main            # publish
```

If `git push` says "rejected", run `git pull --rebase origin main` then push again.
The site updates a minute or two after the push (GitHub Pages).

## Testing before you publish

Open `index.html` by double-click, or run `python3 -m http.server 8000` in the folder and visit
`http://localhost:8000`. (Some outside things like the map and fonts need internet.)
Check both languages: `/` and `/en/`.

## If something breaks

`git log --oneline` shows your last saves. `git revert <id>` undoes one safely.
Nothing is ever really lost: every earlier version is kept in git.

## Share image and icons

- Share preview (Facebook, Viber, WhatsApp...): `images/social-share-v2.jpg` (1200x630). If you change the picture, save it under a NEW name
  (for example `social-share-v3.jpg`) and update the two `social-share-v2.jpg` lines in `index.html`, because the networks remember the old file name.
  After publishing, refresh Facebook's memory: https://developers.facebook.com/tools/debug (paste the site address, press "Scrape Again").
- Icons live in `images/favicon/` (`favicon.svg` is the source).

## Uploading to the hosting (Papaki)

Upload the **whole project**, replacing old files: `index.html`, `en/`, `css/`, `js/` (including the sub-folders `js/modules` and `js/site`),
`images/` (all sub-folders), `sw.js`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `privacy.html`, `404.html` and `availability.json`.
You do NOT need: `tools/`, `.github/`, `*.md`, `node_modules/`.
After uploading: open the site in a private/incognito window, and press Ctrl+F5.
Check that `https://YOUR-DOMAIN/css/style.css` shows the NEW file (first line contains `TSIARDAKA APARTMENT - MODERN ELEGANT DESIGN SYSTEM`, and it has `--cream: #EEE7DC`).
Booked dates (`availability.json`) are refreshed on GitHub every hour: re-upload that one file regularly, or ask for an automatic upload.

## Try changes safely: branches (nothing goes live until you merge)

Only the branch called `main` is published. Work on a separate branch and the live site does not change.

```
git switch main
git pull --rebase origin main        # start from the latest version
git switch -c my-new-idea            # create and enter a branch (any name)
# ... edit files ... test locally ...
git add -A
git commit -m "Describe the change"
git push -u origin my-new-idea       # saves it on GitHub, still NOT live
```

Look at it locally: `python3 -m http.server 8000` in the folder, then open `http://localhost:8000` (and `/en/`).
(Run `python3 tools/build.py` first so the English page is refreshed. On `main` the bot does this for you.)

When you like it, publish by merging:

```
git switch main
git pull --rebase origin main
git merge my-new-idea
git push origin main                 # now it goes live
git branch -d my-new-idea            # tidy up
```

If you do not like it, just do not merge: `git switch main` and the live site was never touched.
The bot adds small "refresh pages" commits on `main`, so always `git pull --rebase origin main` before merging or pushing.

## Hosting: GitHub Pages

The site is published by GitHub Pages from the `main` branch (root folder). It is free, with unlimited publishes.
The Airbnb calendar link is NOT in the code: it is the GitHub secret `AIRBNB_ICS_URL`
(Settings -> Secrets and variables -> Actions). If Airbnb gives you a new link, replace the secret's value.
