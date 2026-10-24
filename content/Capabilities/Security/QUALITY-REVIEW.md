# Quality review

*Phase 8 · October 23, 2026 · covers all 43 notes written in Phases 3–7*

This page records what was checked, what was found and fixed, and what is known to be imperfect. Start here before trusting a note for an exam answer or a design review.

## What was checked

| Check | How | Result |
|---|---|---|
| **Pages against the live docs** | All 104 sidebar pages re-fetched on October 23 (`_tools/sec/fetch_pages.sh`) and their main text compared with the copies read in Phases 3–6 the same day | All 104 returned 200 and their text was unchanged. The area was written and reviewed within one day, so this is a same-day check, not a drift check; see *Known limitations* |
| **Quotes against the live docs** | Every phrase in quote marks of four or more words, in every note, the glossary and the open questions, matched by two independent scripts: `quotecheck.py` (the store built during writing) and `fullcheck.py` (a second extractor over the freshly fetched HTML, comparing letters and digits only) | 295 quotes in the notes, 311 including SOURCES and the glossary: all found on the cited page (`quotecheck.py` reports 0 problems; `fullcheck.py` 0 missing). Kestrel wording is in italics, never in quote marks, so none had to be set aside |
| **Numbers against the live docs** | Every bold number on a `[Docs]` line, and all 27 rows of [Limits and thresholds](99-reference/limits-and-thresholds.md), searched for on the cited page | All found. 6 values were phrased differently from the page and were reworded to match it (fewer than 50 members; the scanner schedule wording; 100 GiB of log data and 10k files *per append*; 10 GiB for audit.2; `Art. 9(1)` is the page's spelling of Article 9(1)) |
| **Docs coverage** | Every sidebar page mapped to exactly one note by `sec_modules.py`, which fails if a page is unmapped or mapped twice; the register in [SOURCES](SOURCES.md) lists each page as *read in full* | 104 of 104 covered; the release-notes link is the one out-of-scope sidebar entry ([docs index](99-reference/docs-index.md)) |
| **Links and anchors** | Every relative link and `#anchor` across the whole `Learn/` folder resolved by `_tools/learnlinks.py` | 743 files, 9,398 links, 0 problems |
| **Diagrams** | All 15 Mermaid diagrams parsed with Mermaid 11 (`_tools/mmcheck`) | All parse |
| **Navigation and format** | Script over every note: a one-line *Sources · checked · status* header; Previous/Next in reading order; the last note of each module links to the next module; self-checks only in [12 — Practice](12-practice/README.md); no forward-looking wording | All pass. The reference pages carry *Module index · Security home* only, as in the DevTools area |
| **Cross-area consistency** | Kestrel's names (projects, markings, groups, people) grepped across all five areas; the Security notes' claims about earlier decisions read against [Ontology 02-04](../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout), [12-03](../Ontology/12-security-and-governance/03-object-and-property-security.md), [17-02](../Ontology/17-case-studies/02-kestrel-reference-model.md), [AIP 08-03](../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md) and [DevTools 09](../DevTools/09-kestrel-case/README.md) | One spelling of every name everywhere (66 uses of `Kestrel Pay – Financial`, all with the en dash). Two fixes: 01-02 had the `kestrel-pay` template apply the project marking to `Payments [Ontology]`, which 02-04 deliberately leaves unmarked so the object types' existence stays visible; and 01-02 called the constraint *prohibited markings* where 03-03 uses *allowed markings*. Both corrected in 01-02, 04-01, 00-02, 11-01, 11-02 and 17-02 §7 |
| **Running-example consistency** | Self-reviews after every phase against the [Kestrel reference model](../Ontology/17-case-studies/02-kestrel-reference-model.md); the 45-row register in [00-02](00-orientation/02-kestrels-security-posture.md) settled in Phase 7 | 22 fixes in the Phase 3–8 self-reviews (plus 12 in the plan and structure reviews), logged in [SOURCES → Corrections log](SOURCES.md#corrections-log) |

## Doc conflicts still open (re-checked October 23)

These are disagreements **between official pages**, or gaps in them, not errors in the notes. Each note says which reading it follows. The pages were unchanged at the re-check, so every question stands as logged in [SOURCES](SOURCES.md#open-research-questions).

| RQ | Question | Status |
|---|---|---|
| RQ-01 | What property security marking pills show when a property policy references no marking | Open |
| RQ-02 | Whether markings apply to columns and transactions (*Access control propagation*) or to files, folders and projects (*Markings*) | Open; the notes follow the *Markings* page |
| RQ-03 | Whether `stop_propagating` needs only a protected branch or also *Require security approvals before merging* | Open; Kestrel sets both |
| RQ-04 | Which role grants *Read restricted view* for Contour | Open |
| RQ-05 | Whether *AIP Analyst save analysis* is one checkpoint type or two | Open |
| RQ-06 | The `refresh_token` parameter's description in *Writing OAuth2 clients* (likely a doc error) | Open; the notes follow the endpoint table |
| RQ-07 | Copy-paste sentences on the Cipher operations page | Open; harmless |
| RQ-08 | Whether *Namespace Viewer* (Data Lifetime) is Viewer on a space | Open; the notes assume so |
| RQ-09 | Whether Central Auth's 30-day disablement is separate from the 30-day inactivity rule | Open; the notes treat them as two rules |

## Known limitations

- **Untested in a live enrollment.** Nothing here was clicked through in Foundry; claims rest on the docs. Where a note says what a screen shows, it is the page's description.
- **A same-day review.** The whole area was fetched, written and reviewed on October 23, 2026, so the re-fetch confirms the notes match the pages as they were that day, not that the pages are stable. Features the docs themselves mark as new, beta or in migration (property security markings' widget list, the two deprecated settings' migration pages, code scanning's rule editor, Central Auth) are the likeliest to change. Re-run `fetch_pages.sh` and `fullcheck.py` before an exam sitting.
- **Paraphrased facts.** Quoted wording and bold numbers were re-matched. Paraphrased statements (most `[Docs]` lines) were checked when written, by reading the page in full, and not re-matched by script; a paraphrase can drift without a script noticing.
- **Long tables summarized.** The audit-log category table (10-02), the checkpoint-type catalogue (06-02), the Data Lifetime permission matrices (09-03) and the Sky Industries walkthroughs (04) are summarized; read the page for the full row.
- **Kestrel decisions are illustrations.** Everything labelled **[Example]** is a fictional company designed with the docs' rules. Three per-person role grants in [11-01](11-kestrel-case/01-kestrels-access-model-built-out.md#who-holds-what) are marked *new here* because no earlier note recorded them; six items are open in [17-02 §9](../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example) because they need Palantir, legal or Kestrel's own records.
- **Exam domain tags** in [12-01](12-practice/01-review-questions-by-module.md) are our reading of the [exam guide](../../Tracks/Application%20Developer/07_Exam_Guide.md), not Palantir's.

## How to re-run the checks

On the computer with the Learn folder, from `Learn/_tools/sec/`:

- `sh fetch_pages.sh` re-fetches the 104 pages listed in `paths.txt` into `pages/`;
- `python3 fullcheck.py pages ../../Capabilities/Security` re-matches every quote and every limits row against them (needs `beautifulsoup4`);
- `python3 quotecheck.py PG.json <notes>` is the finer check used during writing (bold `[Docs]` numbers included); `PG.json` is the page-text store from October 23 and is not in the folder because of its size, so rebuild it from `pages/` if needed;
- `python3 sec_modules.py` asserts the page-to-note mapping; `python3 gen_sec.py ../../Capabilities/Security <note ids>` regenerates the READMEs, MAP, SOURCES register and docs index;
- `python3 ../learnlinks.py ../..` for links and anchors; `python3 ../mmcheck/collect.py ../../Capabilities/Security blocks.json && node ../mmcheck/check.mjs blocks.json` for diagrams (always pass the area root as the first argument).

---
[Security home](README.md) · [Sources](SOURCES.md) · [Topic map](MAP.md)
