# Quality review

*Phase 8 · October 4, 2026 · covers all 94 pages written in Phases 3–7*

This page records what was checked, what was found and fixed, and what is known to be imperfect. It is the place to start before trusting a note for an exam answer or a design review.

## What was checked

| Check | How | Result |
|---|---|---|
| **Quotes against the live docs** | Every quoted phrase on a **[Docs]** line (191 quotes, 61 notes) was matched by script against the current text of the 321 pages the notes cite, fetched October 4 | 179 matched as written. Of the other 12: 6 had drifted from the docs' wording and were corrected; 1 matched once the docs' inner double quotes were allowed for (09-01); 4 were Kestrel example text in quote marks, not doc quotes; 1 was our own phrase in quote marks (14-05), now un-quoted |
| **Numbers against the live docs** | Every number in [Limits and thresholds](99-reference/limits-and-thresholds.md) (about 60 values: sizes, counts, time windows, compute rules) searched for in the same 321 pages, October 4 | All found as stated, including the function memory limits (128 MB TSv1, 2 GB deployed Python, 1,024 MiB serverless default, 512–5,120 range) |
| **Claim checks during writing** | Each batch had its load-bearing claims matched by script when written | About 300 claims, all found (see [SOURCES](SOURCES.md)) |
| **Docs coverage** | Every page in the docs' *Ontology building* sidebar mapped to a note | 274 cited, 123 out of scope by decision, 0 missing ([docs index](99-reference/docs-index.md)) |
| **Links** | Every relative link in the area resolved | All resolve (the 5 template placeholders in `_templates/` are expected) |
| **Stale cross-references** | Search for "planned", "will be", "later modules" and links to a module README where one note answers the sentence | Re-checked after the pre-ship review: 4 stale statements fixed (MAP, 00-03, GLOSSARY, 05-08) and 22 links retargeted from module READMEs to the specific note. README links kept where the sentence means the whole module |
| **Section anchors** | Every `#anchor` link checked against the target's headings | All resolve |
| **Diagrams** | All 32 Mermaid diagrams parsed with Mermaid 11 | All parse |
| **Navigation** | Previous / Next links follow the reading order in every module | Fixed 8 pages (11-04, 17-01, 17-02, 18-02 and the four reference pages) |
| **Shared format** | Every note has the one-line *Sources · checked · status* header and a footer | Converted: the four design notes (table header from the old folder), the course-review case study and the three practice pages. Pages built on no official page (the running example, the practice pages) say so in the *Sources* part of the header |
| **Running-example consistency** | Self-reviews after each batch, then the [reference model](17-case-studies/02-kestrel-reference-model.md) as a single source | More than 50 fixes across the self-reviews, logged in [SOURCES → Corrections log](SOURCES.md#corrections-log) |
| **Style** | Scan for filler words and repeated phrasing | 5 instances of "genuinely" removed from the design notes; no repeated openers found across notes |

## Doc conflicts still open (re-checked October 4)

These are disagreements **between official pages**, not errors in the notes. Each note says which page it follows.

| RQ | Conflict | Status Oct 4 |
|---|---|---|
| RQ-21 | Notification default: *Notifications* says the action fails if a recipient lacks access; *Permissions* says edits may still succeed | Still conflicting |
| RQ-24 | Search Around limit: 100,000 (architecture overview) vs 10,000,000 leaf limit (OSS limitations) | Still conflicting |
| RQ-26 | Run history: 30 days (*Run history*) vs 7 days (*Observability*, *Action metrics*) | Still conflicting |
| RQ-29 | Leading wildcards in the Object Explorer global bar: supported (*Search syntax*) vs not (*Understanding text search*) | Still conflicting |
| RQ-22, 23, 25 | Staged writes and Logic; OSv1-era wording; interface-link traversal | Unchanged; see [SOURCES](SOURCES.md#open-research-questions) |

## Known limitations

- **Untested in a live enrollment.** Nothing here was clicked through in Foundry for this area; claims rest on the docs. Rows marked *Untested* in notes (for example interface implementations in Marketplace, RQ-28) need a hands-on check.
- **Other sidebars not coverage-checked.** Workshop, OSDK, Automate and AIP pages are cited where needed, but not mapped page by page. Known gap: the TSv2, Python and OSDK search-filter APIs ([10-07](10-applications/07-searching-the-ontology.md#functions)).
- **Fictional example.** Kestrel's numbers (match rates, eval scores, cost estimates) are illustrations, labelled **[Example]**.
- **Paraphrased facts.** The October 4 re-check covered quoted wording and the numbers in *Limits and thresholds*. Other paraphrased statements were checked when written (October 2–3), not re-matched.
- **Dates.** Most pages were checked October 2–3, 2026. The docs change; re-run the quote check before relying on a note months from now.

## How to re-run the checks

On the computer with the Learn folder, scripts in `~/work/`:

- `verify.py` (links), `anchors.py` (section anchors), `qa.py` (format and style scan);
- `coverage.py` then `docsindex.py` (docs index);
- the quote check needs the browser: build the quote list from notes, fetch the cited pages, match. The method is described in [SOURCES](SOURCES.md#how-sources-are-recorded).

---
[Ontology home](README.md) · [Sources](SOURCES.md) · [Topic map](MAP.md)
