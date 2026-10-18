# Quality review

*Phase 7 · October 14, 2026 · covers all 44 notes written in Phases 3–6*

This page records what was checked, what was found and fixed, and what is known to be imperfect. Start here before trusting a note for an exam answer or a design review.

## What was checked

| Check | How | Result |
|---|---|---|
| **Sidebar against the live docs** | The *AI Platform (AIP)* sidebar re-read from the page DOM in the built-in browser, October 14, and compared with the October 7 list | Same 96 links in the same order, except one moved page: the Agent Stack overview is now `aip/agent-stack/` (was `agent-stack/overview/`). All references updated |
| **Quotes against the live docs** | Every phrase in quote marks in the notes was extracted by script and matched against the current text of all 95 sidebar pages, fetched October 14. 116 of them are doc wording; the other 38 are Kestrel examples (user questions, evaluator criteria, prompt text) and were set aside | 111 matched as written. Of the other 5: 1 is no longer on the page (*Supported LLMs* now words its experimental-model definition differently; [01-01](01-models-and-llms/01-supported-llms-and-model-catalog.md) updated); 1 differed only in quote marks (*Struct*, [03-02](03-aip-logic/02-building-a-logic-function.md)); 1 is a marked edit (`respect[s]`); 2 come from the official exam guide and were re-checked there, and [03-01](03-aip-logic/01-logic-concepts.md) now links that guide. The 38 one- or two-word terms in quote marks outside [Docs] lines were matched too: 24 appear in the docs; the other 14 are Kestrel names, our own labels or example values |
| **Numbers against the live docs** | All 50 values in [Limits and thresholds](99-reference/limits-and-thresholds.md) (35 rows) searched for on their cited pages, October 14 | All found as stated. 11 are written differently on the page (for example "five-minute", "10000", "at least three") |
| **Claim checks during writing** | Each phase had its quoted claims matched by script when written | Phase 3: 28; Phase 4: 39; Phase 5: 41 (see [SOURCES](SOURCES.md)) |
| **Docs coverage** | Every sidebar page mapped to a note | 88 covered by notes, 7 pointers to the Ontology area, 1 out of scope (release notes), 0 missing ([docs index](99-reference/docs-index.md)) |
| **Links and anchors** | Every relative link and `#anchor` across the whole `Learn/` folder resolved by `~/work/learnlinks.py` | 558 files, 5,241 links, 0 problems |
| **Diagrams** | All 18 Mermaid diagrams parsed with Mermaid | All parse |
| **Navigation** | Previous / Next follow the reading order; the last note of each module links to the next module | Added "Next module" to the last note of modules 00–11 (12 notes) and Previous/Next to the three reference pages |
| **Shared format** | Every note has the one-line *Sources · checked · status* header and a footer; self-checks only in practice; no forward-looking wording | All pass. The practice page's status is "not yet attempted" by design. The one "coming soon" is the Agent Stack page's own wording, still on the page |
| **Running-example consistency** | Two self-reviews (Oct 8, Oct 14) against the [Kestrel reference model](../Ontology/17-case-studies/02-kestrel-reference-model.md) | 14 fixes, logged in [SOURCES → Corrections log](SOURCES.md#corrections-log) |

## Doc conflicts still open (re-checked October 14)

These are disagreements **between official pages**, not errors in the notes. Each note says which page it follows.

| RQ | Conflict | Status Oct 14 |
|---|---|---|
| RQ-03 | Can a registered model be used in Pipeline Builder? *Supported LLMs* says yes; the BYOM page's *Supported applications* list leaves it out | Still conflicting. As read October 14, the BYOM page's introduction names Pipeline Builder while its own list doesn't, so the page disagrees with itself |
| RQ-05 | *AI ethics and governance* says "eight core themes" but describes seven | Still seven headings |
| RQ-06 | *LLM capacity management* names medium, large and XL tiers; the rate-limits table also has Small | Still conflicting |
| RQ-01, 02, 04 | Provider-API `model` field; Agent Stack vs Chatbot Studio; Logic tool compute per block or per call | Still not stated in the docs; see [SOURCES](SOURCES.md#open-research-questions) |

## Known limitations

- **Untested in a live enrollment.** Nothing here was clicked through in Foundry; claims rest on the docs.
- **Long tables not copied.** Per-model rate limits by tier, the supported-model list and compute rates per model are linked, not reproduced, and were read as a survey, not row by row. Read them on the page.
- **Paraphrased facts.** The October 14 re-check covered quoted wording and the numbers in *Limits and thresholds*. Other paraphrased statements were checked when written (October 8 and 14), not re-matched.
- **Where change showed up.** Between October 8 and 14 the re-check found changes only on *Supported LLMs* (experimental-model wording), *Bring your own model* (introduction) and the Agent Stack overview (new URL). Features the docs themselves mark as new or unfinished are the next most likely to change: BYOM (implementation from March 2026) and the Agent Stack (OSDK and Logic integrations "coming soon"). Re-check these first.
- **Fictional example.** Kestrel's numbers (eval pass rates, capacity shares, cost estimates) are illustrations, labelled **[Example]**.

## How to re-run the checks

On the computer with the Learn folder:

- `~/work/learnlinks.py` (links and anchors across `Learn/`);
- `~/work/aip/check_cov.py` then `~/work/aip/docsindex.py` (coverage and docs index, from `sidebar.tsv` and `aip_modules.py`);
- Mermaid: rebuild `~/mmcheck/aip_blocks.json` from the notes, then `node check_aip.mjs`;
- quotes and numbers need the browser: re-read the sidebar, fetch every page's body into one object, then match the quote list (`~/work/aip/quotes.json`) and the limits rows against it.

---
[AIP home](README.md) · [Sources](SOURCES.md) · [Topic map](MAP.md)
