# Quality review

*Phase 7 · October 23, 2026 · covers all 20 notes written in Phases 3–6*

This page records what was checked, what was found and fixed, and what is known to be imperfect. Start here before trusting a note for an exam answer or a design review.

## What was checked

| Check | How | Result |
|---|---|---|
| **Pages against the live docs** | All 26 sidebar pages re-fetched on October 23 (`_tools/obs/fetch_pages.sh`) and their full text compared with the copies read in Phases 3–5 the same day | All 26 returned 200 and were unchanged. A same-day check, not a drift check; see *Known limitations* |
| **Quotes against the live docs** | Every phrase in quote marks of four or more words, in every note and the glossary, matched by two independent scripts: `quotecheck.py` (the page store built during writing, `PG.json`) and `fullcheck.py` (a second extractor over the freshly fetched HTML, letters and digits only) | 253 quotes in the notes with page sources: all found on the cited page, 0 problems. 267 including the practice note and the register, 0 missing; the practice note's quotes show as *elsewhere* because it cites notes, not pages |
| **Numbers against the live docs** | Every bold number on a `[Docs]` line, and all 27 rows of [Limits and thresholds](99-reference/limits-and-thresholds.md), searched for on the cited page | All found. One row reworded to the page's phrasing (the ingest-stream windows, with the page's *and*) |
| **Docs coverage** | Every sidebar page mapped to exactly one note by `obs_modules.py`, which fails if a page is unmapped or mapped twice; the register in [SOURCES](SOURCES.md) lists each page as *read in full* | 26 of 26; the release-notes link is the one out-of-scope entry ([docs index](99-reference/docs-index.md)) |
| **Links and anchors** | Every relative link and `#anchor` across the whole `Learn/` folder resolved by `_tools/learnlinks.py` | 775 files, 10,077 links, 0 problems |
| **Diagrams** | All 11 Mermaid diagrams parsed with Mermaid 11 (`_tools/mmcheck`) | All parse |
| **Navigation and format** | Script over every note: a one-line *Sources · checked · status* header; Previous/Next in reading order; the last note of each module links to the next module; self-checks only in [05 — Practice](05-practice/README.md); no forward-looking wording or leftover *proposed* markers | All pass after one fix (a "Phase 6 revises" sentence in 04-02 made past tense) |
| **Cross-area consistency** | Kestrel's names grepped across all six areas (the two view names, the Slack channels, the compute module, the health page, the two automations); the notes' claims about earlier decisions read against [Ontology 14-06](../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md), [13-02](../Ontology/13-backend-architecture/02-indexing-and-funnel.md), [02-04](../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md), [17-02](../Ontology/17-case-studies/02-kestrel-reference-model.md), [Apps 03-06](../Apps/03-workshop-widgets/06-ai-observability-and-embedding.md), [08-01](../Apps/08-automate/01-automate-concepts.md), [DevTools 03-03](../DevTools/03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md), [09-01](../DevTools/09-kestrel-case/01-customer-portal-built-out.md), [Security 10-02](../Security/10-privacy-governance-and-enterprise-security/02-audit-logs.md) and [11-01](../Security/11-kestrel-case/01-kestrels-access-model-built-out.md) | One spelling of every name. One fix: 02-03 hedged whether Kestrel is on Object Storage v2; 14-06 records that it is, so the sentence now says so |
| **Running-example consistency** | Self-reviews after every phase and a pre-ship review of Phases 3–4, against the Kestrel reference model and Security 11-01's roles table; the 40-row register in [00-02](00-orientation/02-kestrels-monitoring-posture.md) settled in Phase 6 | 36 fixes across Phases 1–7 (6 plan, 4 structure, 4+4+4+3 in Phases 3–6, 8 in the pre-ship review, 3 here), logged in [SOURCES → Corrections log](SOURCES.md#corrections-log). The recurring kind: a Kestrel claim (nightly pipelines, who can see which project, where an automation lives) stated from memory rather than from the recorded model |

## Doc conflicts still open (re-checked October 23)

| RQ | Question | Status |
|---|---|---|
| [Ontology RQ-26](../Ontology/SOURCES.md#open-research-questions) | How far back execution history goes: the *Observability* overview says seven days, the *Ontology and AIP observability* overview, *Run history* and *Metrics* pages say 30 | Still conflicting on the re-fetched pages. [03-01](03-ontology-and-aip-observability/01-overview-and-run-history.md#seven-days-or-thirty-rq-26) records both; the rule from 14-06 stands: plan for seven |

No new research question was opened by this area; one page-level oddity is recorded in the notes rather than as an RQ: the builds-and-checks FAQ prints `--refresh-dependencies` with a single long dash ([02-04](02-health-checks/04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md)).

## Known limitations

- **Untested in a live enrollment.** Nothing here was clicked through in Foundry; claims rest on the docs. Where a note says what a screen shows, it is the page's description.
- **A same-day review.** Fetched, written and reviewed on October 23, 2026, so the re-fetch confirms the notes match the pages as they were that day, not that the pages are stable. The pages themselves flag what is likeliest to move: the alert debug page ("Support for additional rule and resource types is planned"), observability dashboards ("Additional observability widgets are in development"), the failure-rate colour mode for automations ("not yet supported"), and log export ("may not be available in your enrollment").
- **Paraphrased facts.** Quoted wording and bold numbers were re-matched by script. Paraphrased statements (most `[Docs]` lines, and the whole of the two reference catalogues read as decision sheets) were checked when written, by reading the page in full, and not re-matched by script.
- **Kestrel's thresholds are design choices.** Every threshold in module 04 (one hour on `Shipment`, 10% over 10 runs, Moderate 1 hour and Critical 3) is marked **[Example]** and chosen against the docs' examples, not from a recorded Kestrel requirement, except the one-hour shipment freshness from 14-06. Five items are open in [17-02 §9](../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example), the pipeline cadences above all: until they are recorded, the freshness thresholds and the content-check schedule are placeholders.
- **Exam domain tags** in [05-01](05-practice/01-review-questions-by-module.md) are our reading of the [exam guide](../../Tracks/Application%20Developer/07_Exam_Guide.md), not Palantir's.

## How to re-run the checks

On the computer with the Learn folder, from `Learn/_tools/obs/`:

- `sh fetch_pages.sh` re-fetches the 26 pages listed in `paths.txt` into `pages/`;
- `python3 fullcheck.py pages ../../Capabilities/Observability` re-matches every quote and every limits row against them (needs `beautifulsoup4`);
- `python3 quotecheck.py PG.json <notes>` is the finer check used during writing (bold `[Docs]` numbers included); `PG.json` is the page-text store from October 23 and is in the folder;
- `python3 obs_modules.py` asserts the page-to-note mapping; `python3 gen_obs.py ../../Capabilities/Observability <note ids>` and `python3 gen_glossary.py ../../Capabilities/Observability <note ids>` regenerate the READMEs, MAP, SOURCES register, docs index and glossary;
- `python3 ../learnlinks.py ../..` for links and anchors; `python3 ../mmcheck/collect.py ../../Capabilities/Observability blocks.json && node ../mmcheck/check.mjs blocks.json` for diagrams.

---
[Observability home](README.md) · [Sources](SOURCES.md) · [Topic map](MAP.md)
