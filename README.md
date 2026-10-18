# Foundry Learn

A reading app on top of the study notes in `Learn/`. It turns the markdown notes into a site with a learning path, module and note navigation, instant search, the "I need to…" finder, the glossary, Mermaid diagrams, label focus (Docs / Explanation / …) and reading progress saved in the browser.

Live site: see the **Deploy to GitHub Pages** workflow in the Actions tab (the URL is `https://<user>.github.io/foundry-learn/`).

## How it fits together

```
Learn/Ontology/**.md   --npm run sync-->   content/Ontology/**.md   --npm run build-->   dist/
   (your notes)                              (copy, committed)                        (static site)
```

- `scripts/config.mjs` lists which note folders are included. Today: `Ontology` and `AIP`. Add a row to include `Courses`, `Speedrun`, … later.
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
