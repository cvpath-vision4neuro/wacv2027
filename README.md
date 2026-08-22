# Vision for Biomedical Discovery (CVPath + Vision4Neuro) — WACV 2027 workshop website

Website of the combined full-day workshop at IEEE/CVF WACV 2027
(January 4–5, 2027, Disney Springs, Lake Buena Vista, Florida).

Plain HTML, one CSS file and one small JavaScript file. **No build step, no
framework, no dependencies.** You edit the `.html` files directly and push; that
is the whole workflow. Anyone in the repository can change a date or a name
without installing anything.

---

## 1. Files

```
index.html          Home: hero, the two tracks, shared themes, important dates,
                    submission types, OWL teaser, program preview, FAQ, contacts
cvpath.html         CVPath track — full call for papers + submission instructions
vision4neuro.html   Vision4Neuro track — full call for papers + submission instructions
program.html        Preliminary full-day schedule (filterable by track)
challenge.html      OWL challenge — task, data, evaluation, rules, timeline, team
speakers.html       Confirmed invited speakers, both tracks
organizers.html     Organizing committees, program committee, contacts
404.html            Not-found page (GitHub Pages serves it automatically)

assets/css/styles.css   All styling, light and dark theme, print styles
assets/js/main.js       Theme toggle, mobile menu, program filter, scroll reveal
assets/img/             Favicons, social preview image, track artwork

robots.txt, sitemap.xml, site.webmanifest   SEO and icon metadata
.nojekyll                                    Tells GitHub Pages to serve files as they are
```

The WACV workshop guidelines require a call for papers, submission instructions,
important dates, program details, contact information, and a clear statement on
publication in the WACV 2027 proceedings. All six are present; the proceedings
statement is on `index.html`, `cvpath.html` and `vision4neuro.html`.

## 2. Editing

Open the `.html` file, find the text, change it, commit. The pages are ordinary
readable HTML with comments marking each section.

**One thing to watch:** the header, the footer, the important-dates table and the
submission-types table are repeated in every page, because each page has to work
on its own without JavaScript. If you change one of them, change it everywhere —
a find-and-replace across all `.html` files is the safe way.

Where the things you are most likely to edit actually live:

| What | Files |
| --- | --- |
| Regular paper deadline (`October 9, 2026`) | `index.html` ×2, `cvpath.html`, `vision4neuro.html` |
| Short paper / abstract deadline (`November 6, 2026`) | `index.html`, `cvpath.html`, `vision4neuro.html` |
| Notification (`October 30, 2026`) | `index.html`, `cvpath.html`, `vision4neuro.html`, `program.html`, `speakers.html` |
| Contact addresses | `index.html`, `organizers.html`, `cvpath.html`, `vision4neuro.html` |
| Topics of a call for papers | `cvpath.html`, `vision4neuro.html` (`<ul class="topics">`) |
| Timetable | `program.html` (`<article class="slot">` blocks) |
| Speakers | `speakers.html` (`<article class="person">` blocks) |
| Organizers, roles, program committee | `organizers.html`, plus the committee blocks in the two track pages |
| FAQ | `index.html` (`<details class="qa">` blocks) |
| Site colours | `assets/css/styles.css`, the `--cvpath`, `--neuro` and `--brand` variables at the top |

To add a person, copy an existing `<article class="person">` block and change the
name, affiliation and the two initials in the coloured square.

## 3. Before the site goes public

1. **The public address is already set** to
   `https://cvpath-vision4neuro.github.io/wacv2027`, in the canonical links, the
   social tags, the structured data and `sitemap.xml` / `robots.txt`. If it ever
   changes — a custom domain, a different repository — find and replace that
   string across the 8 HTML files, `sitemap.xml` and `robots.txt`. Internal links
   are all relative, so the site keeps working either way; the address only
   affects link previews and clean indexing.
2. **Confirm the deadlines marked "to be confirmed"** on the site: regular papers
   October 9, 2026; short papers and extended abstracts November 6, 2026;
   non-archival notification November 20, 2026. Fixed by WACV: notification
   October 30, 2026 and camera-ready November 20, 2026.
3. **Add the OpenReview link** when the workshop chairs create the venue. The
   site currently says it will be published here; search for `OpenReview` in
   `cvpath.html` and `vision4neuro.html`.
4. **Double-blind reviewing** is stated in the submission instructions. Change it
   if either track decides otherwise.
5. Speaker talk titles, the Vision4Neuro program committee and organizer bios
   are still to be filled in, and the OWL challenge dates are marked "to be
   announced" until the new timeline is set.

## 4. Looking at the site locally

Double-click `index.html` — it opens in the browser and everything works.

For something closer to production, use any static server: the *Live Server*
extension in VS Code (right-click `index.html` → *Open with Live Server*) is the
simplest.

## 5. Publishing

The site lives in the `wacv2027` repository of the `cvpath-vision4neuro`
organization, and is served by GitHub Pages from the `main` branch, root folder,
at `https://cvpath-vision4neuro.github.io/wacv2027/`.

To publish a change: commit and push to `main`. The live site follows within a
minute or two.

```bash
git add -A
git commit -m "Update the important dates"
git push
```

If Pages is ever switched off, re-enable it under **Settings → Pages → Build and
deployment → Deploy from a branch → `main` / `(root)`**. Co-organizers get write
access under **Settings → Collaborators and teams**.

Keeping each edition in its own repository means this address stays valid for
good: a future edition becomes a new repository, and no link ever breaks.

For a custom domain, add a file named `CNAME` containing the domain, point the
DNS at GitHub Pages, and update the address as in section 3.

## 6. Adding a photo to the hero

`index.html` contains a commented-out block right after the hero text with
instructions. In short: put the image in `assets/img/`, delete the two comment
markers, and remove `hero__grid--solo` from the enclosing `div`. Keep the image
under roughly 1600 px wide and 400 KB so the page stays fast.

## 7. What is already in place for SEO and accessibility

- A unique title and meta description per page, canonical URLs
- Open Graph and Twitter card tags with a 1200×630 preview image
- JSON-LD structured data: `Event` (with WACV 2027 as `superEvent` and the two
  tracks as `subEvent`), `WebSite`, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` and `robots.txt`
- Semantic headings, descriptive links, `lang="en"`, a skip link, ARIA labels,
  keyboard-accessible menu and filters
- Responsive from 320 px up, light and dark theme, print stylesheet
- No cookies, no analytics, no trackers — so no consent banner is needed
- No render-blocking JavaScript: the site is fully readable with JS disabled

Once the address is final, submit `sitemap.xml` to Google Search Console and ask
for a link from the WACV 2027 workshop page — one inbound link from
`wacv.thecvf.com` is worth more than any on-page tuning.

## 8. The branding assets

The favicons, the social preview image and the artwork in the two track cards
(`assets/img/`) were generated once and are committed as ordinary files. Changing
a colour in `styles.css` does not regenerate them, so if the palette changes
significantly those images need to be re-exported.
