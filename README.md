# Foundry Learn

A reading app on top of the study notes in `Learn/`. It turns the markdown notes into a site with a learning path, module and note navigation, instant search, the "I need to…" finder, the glossary (with term definitions on hover inside every note), flashcards with a simple spaced-repetition box per card, "referenced by" backlinks, Mermaid diagrams you can enlarge, claim callouts and label focus (Docs / Explanation / Example / …), and reading progress saved in the browser.

Live site: see the **Deploy to GitHub Pages** workflow in the Actions tab (the URL is `https://<user>.github.io/foundry-learn/`).

## The Ontology Lab

`#/lab` is a hands-on simulator (`src/lab.js`, data in `src/lab-data.js`): you build Kestrel's Ontology from seven small, deliberately imperfect source tables, station by station: object types (keys, titles, naming), links (cardinality inferred from the data, many-to-many through a join table, search around), interfaces (define, implement, the shared view), actions (rule, parameter, criteria, permissions; run as a user, read the log, revert) and an explorer with export. Every mission step is checked against the model you build; "try the trap" steps make you see the failure. Progress lives in the browser.

## How it fits together

```
Learn/Capabilities/*/**.md   --npm run sync-->   content/Capabilities/*/**.md   --npm run build-->   dist/
   (your notes)                              (copy, committed)                        (static site)
```

- `scripts/config.mjs` lists which note folders are included: the `Capabilities/` areas (Ontology, AIP, Apps, DevTools, Security, Observability, Model integration). The Learn `Tracks/` (course notes) are left out on purpose; links to them say so when clicked.
- `scripts/sync.mjs` copies those folders from `../Learn` (or `$LEARN_DIR`) into `content/`.
- `scripts/build.mjs` renders the markdown into JSON (`dist/data/`): one file per note, a navigation index, a search index, and the parsed topic map and glossary.
- `scripts/bundle.mjs` bundles the app (`src/app.js`) with esbuild; Mermaid loads on demand.
- `scripts/check-links.mjs` fails the build if a link between notes, or an anchor, is broken.
- `site/` holds the page shell and styles; `src/app.js` is the app.

## Update the site after editing notes

```bash
npm run sync      # pull the latest notes from ../Learn
npm run build     # render + bundle into dist/
npm run check     # optional: verify links
git add -A && git commit -m "Update notes" && git push
```

Pushing to `main` triggers the GitHub Pages deploy (about a minute).

## Run locally

```bash
npm install
npm run dev       # builds, then serves http://localhost:4321
```

## Notes on behaviour

- Routes are hash-based (`#/ontology/04-object-types/01-object-types`), so the site works on GitHub Pages without server configuration and every heading is linkable.
- Heading anchors follow GitHub's slug rules, so the anchors already used inside the notes keep working.
- Links to Learn notes outside the included folders (course notes, speedruns) render dotted and explain that the note isn't in the app yet. Add the folder to `config.mjs` to make them live.
- Reading progress, checklist ticks and the theme are stored in `localStorage` only.
