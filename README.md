# Deronbit — Field Notes

Personal site of Ryan Anan Saputra Sinaga, built as a paper field notebook: a
cover, a log you read by scrolling — the page turns itself on its spine — a set
of loose leaves for personal projects, and an inside back cover.

## Stack

- React 19 + Vite
- anime.js v4 — every animation on the page (intro timeline, scroll-scrubbed 3D
  page turn, scroll reveals, progress rail, draggable portrait, text scramble)
- Plain CSS (no framework), design tokens in `src/index.css`
- ESLint

## Layout

```
src/
  data.js               all copy: profile, entries, projects, education, contacts
  index.css             tokens, components, responsive + reduced-motion rules
  lib/motion.js         anime.js helpers: reveals, settle, environment probes
  lib/scatter.js        seeded junk-journal placement for the photo pile
  hooks/useTheme.js     kraft / night theme, persisted in localStorage
  components/
    Cover.jsx           masthead, portrait, easter egg host
    PaperGrid.jsx       cursor easter egg (pointer devices only)
    Notebook.jsx        the scroll score: pin, page turns, index, counter
    Leaf.jsx            one page of the notebook + its photo pile
    LooseLeaves.jsx     personal projects
    Kit.jsx             technical skills, as a checked-off inventory
    BackCover.jsx       education, activities, contacts
    ProgressRail.jsx    scroll-linked hairline
```

## How the log works

`.notebook` is stretched by JS to `pin height + total scroll`, and everything
inside stays pinned while you scroll through it. That scroll distance is split
per entry — first enough to read the note, then a turn zone — and handed to a
single anime.js timeline that a `ScrollObserver` scrubs. Because the timeline is
played by scroll position rather than by time, it runs in both directions and
never fights the browser's own scrolling. Under
`prefers-reduced-motion: reduce` the pin is dropped entirely and the log falls
back to a plain column of pages.

A page can change height long after it was first measured — a photo finally
decoding, a rotation, a phone's URL bar sliding away — so the score is rebuilt
whenever that happens. Two things make that safe:

- **The section's height is replaced, never removed.** Dropping it first would
  collapse the section by thousands of pixels; the browser clamps the scroll
  position to the shrunken document and then restores it to the new maximum,
  which throws the reader to the bottom of the page.
- **A reading anchor** (which entry, how far through it) is taken before the
  rebuild and restored after, so a page that grows or shrinks does not slide
  the document under whoever is reading it.

## Scripts

```bash
npm run dev       # vite dev server
npm run build     # production build
npm run preview   # serve the build
npm run lint
npm run deploy    # build + publish dist/ to gh-pages
```

## Notes

- Screenshots: resize to ~1200px and save as webp in `public/` (full-size
  originals live in `originals/`, which is not deployed), then list them in
  `images` on the matching entry in `src/data.js`, widest first. They are
  scattered junk-journal style from a seed derived from the entry id, so the
  layout is random-looking but stable, and portrait shots are detected at load
  and pinned on as small snaps. An empty array renders the dashed placeholder
  instead, and `caption` may be null.
- Nothing in `data.js` is numbered by hand. `Entry 04` and the folio come from
  an entry's position in the array, and plates carry on from `fig. 02` because
  the author's portrait is `fig. 01`. Adding or pulling an entry (an NDA, say)
  can never leave the page counting wrong.
- Motion is fully disabled under `prefers-reduced-motion: reduce`, and the
  content is always rendered visible if an animation never runs.
