# Sources, corrections and open questions

The register for every source used in the Observability notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about product behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's own wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated** and collected in [99 — Limits and thresholds](99-reference/README.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.
- **How pages are read:** each page is fetched into Claude's workspace (`_tools/obs/fetch_pages.sh`) and its full text is read there and kept in a page store for the quote and number checks; the quality review re-fetches every page. Nothing is summarised by a fetch tool.

## Register

<!-- register:start -->
### Sidebar inventory (October 23, 2026)

The *Observability* sidebar was read from the fetched HTML of the overview page on October 23, 2026: **27 links**, 26 documentation pages and the release-notes filter. `_tools/obs/raw.tsv` holds the list (SHA-256 `395878272acb483550e0317f68d9135a2c0e8bfc62e5637ab29c3ecdd44f93d3`). All 26 pages were fetched the same day and answered 200.

| Section | Pages |
|---|---|
| Observability (top) | 3 |
| Monitoring views | 7 |
| Health checks | 8 |
| Ontology and AIP observability | 8 |
| **Total** | **26** |

### Pages and notes

| Page | Section | Note | Read |
|---|---|---|---|
| [Overview](https://www.palantir.com/docs/foundry/observability/overview/) | Observability (top) | 00-01 The observability map | read in full (Oct 23) |
| [Data Health](https://www.palantir.com/docs/foundry/observability/data-health/) | Observability (top) | 00-01 The observability map | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/monitoring-views/overview/) | Monitoring views | 01-01 Monitoring views and core concepts | read in full (Oct 23) |
| [Alert debug page](https://www.palantir.com/docs/foundry/monitoring-views/alert-debug-page/) | Monitoring views | 01-03 Alerts: the debug page and external systems | read in full (Oct 23) |
| [Core concepts](https://www.palantir.com/docs/foundry/monitoring-views/core-concepts/) | Monitoring views | 01-01 Monitoring views and core concepts | read in full (Oct 23) |
| [Sending alerts to external systems](https://www.palantir.com/docs/foundry/monitoring-views/external-systems/) | Monitoring views | 01-03 Alerts: the debug page and external systems | read in full (Oct 23) |
| [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | Monitoring views | 01-02 Monitoring rules reference | read in full (Oct 23) |
| [Monitoring FAQ](https://www.palantir.com/docs/foundry/monitoring-views/monitoring-faq/) | Monitoring views | 01-04 Monitoring FAQ and the check-groups sunset | read in full (Oct 23) |
| [Check groups (Sunset)](https://www.palantir.com/docs/foundry/monitoring-views/check-groups/) | Monitoring views | 01-04 Monitoring FAQ and the check-groups sunset | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/health-checks/overview/) | Health checks | 02-01 Health checks and the types of checks | read in full (Oct 23) |
| [Types of checks](https://www.palantir.com/docs/foundry/health-checks/check-types/) | Health checks | 02-01 Health checks and the types of checks | read in full (Oct 23) |
| [Check evaluation](https://www.palantir.com/docs/foundry/health-checks/check-evaluation/) | Health checks | 02-02 Schedules, watching and notifications | read in full (Oct 23) |
| [Watching checks](https://www.palantir.com/docs/foundry/health-checks/watching-checks/) | Health checks | 02-02 Schedules, watching and notifications | read in full (Oct 23) |
| [Notifications and issues](https://www.palantir.com/docs/foundry/health-checks/notifications/) | Health checks | 02-02 Schedules, watching and notifications | read in full (Oct 23) |
| [Add health checks to a Marketplace product](https://www.palantir.com/docs/foundry/health-checks/marketplace-data-health/) | Health checks | 02-04 Builds and checks FAQ; health checks in a Marketplace product | read in full (Oct 23) |
| [Builds and checks FAQ](https://www.palantir.com/docs/foundry/health-checks/builds-checks-faq/) | Health checks | 02-04 Builds and checks FAQ; health checks in a Marketplace product | read in full (Oct 23) |
| [Checks reference](https://www.palantir.com/docs/foundry/health-checks/checks-reference/) | Health checks | 02-03 Checks reference | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/aip-observability/overview/) | Ontology and AIP observability | 03-01 Overview and run history | read in full (Oct 23) |
| [Execution history](https://www.palantir.com/docs/foundry/aip-observability/run-history/) | Ontology and AIP observability | 03-01 Overview and run history | read in full (Oct 23) |
| [Tracing](https://www.palantir.com/docs/foundry/aip-observability/trace-view/) | Ontology and AIP observability | 03-02 Trace views, service logs and debugging | read in full (Oct 23) |
| [Logging and debugging](https://www.palantir.com/docs/foundry/aip-observability/service-logs-and-debugging/) | Ontology and AIP observability | 03-02 Trace views, service logs and debugging | read in full (Oct 23) |
| [Log search](https://www.palantir.com/docs/foundry/aip-observability/log-search/) | Ontology and AIP observability | 03-03 Log search and log permissions | read in full (Oct 23) |
| [Log permissions](https://www.palantir.com/docs/foundry/aip-observability/log-permissioning/) | Ontology and AIP observability | 03-03 Log search and log permissions | read in full (Oct 23) |
| [Metrics](https://www.palantir.com/docs/foundry/aip-observability/metrics/) | Ontology and AIP observability | 03-04 Metrics, performance and observability dashboards | read in full (Oct 23) |
| [Performance monitoring and optimization](https://www.palantir.com/docs/foundry/aip-observability/performance-monitoring-and-optimization/) | Ontology and AIP observability | 03-04 Metrics, performance and observability dashboards | read in full (Oct 23) |
| [Dashboards](https://www.palantir.com/docs/foundry/observability/dashboards/) | Observability (top) | 03-04 Metrics, performance and observability dashboards | read in full (Oct 23) |
<!-- register:end -->

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 23, 2026 | Phase 7 (quality review) | All 26 pages re-fetched and found unchanged. 267 quotes matched by two independent scripts, 0 missing; every bold `[Docs]` number and all 27 limits rows found on their pages (1 row reworded: the ingest-stream windows with the page's *and*). Cross-area: 02-03 now states that Kestrel is on Object Storage v2, as 14-06 records, instead of hedging. Format: one "Phase 6 revises" sentence in 04-02 made past tense. Links 775 files, 0 problems; 11 diagrams parse; navigation and format checked by script. Results and known limitations in [QUALITY-REVIEW](QUALITY-REVIEW.md) |
| Oct 23, 2026 | Phase 6 | No new pages. 5 notes: the two Kestrel build records (04-01, 04-02), 36 review questions (05-01), the limits list and the decision guide (99). The 40-row register in 00-02 settled: 34 adopted into Ontology 17-02 §7 (three new bullets), 4 considered and not adopted, 2 open plus 3 partly open items recorded in 17-02 §9; Ontology 14-06's calendar revised with a dated paragraph and three reference-card rows; every *proposed* marker in modules 01–03 changed to *adopted* with a link to module 04 |
| Oct 23, 2026 | Phase 5 | Read 9 pages in full (module 03 and the Dashboards page). 5 notes, including the register 00-02 (40 rows). 80 quotes and 8 bold doc numbers matched by script for module 03; 253 and 17 across the area, 0 problems: 2 quotes split or trimmed where the page sets a link before punctuation, 2 own phrases to italics, 1 quote from the Observability overview added to 03-01's sources for RQ-26. All 26 pages now read in full. GLOSSARY 66 terms. Forward links to module 03 and 00-02 retargeted to the notes |
| Oct 23, 2026 | Review before shipping (Phases 3–4) | 8 fixes on re-reading the nine notes against the pages and the Kestrel model: the *High-risk payment hold* automation is project-scoped in `Payments [Ontology]` (17-02 §6), so its rules move from the `Commerce operations` view to `Kestrel Pay operations`, and that view's HIGH severity gets the PagerDuty integration too, since integrations are per view (01-02, 01-03); the `Kestrel Pay operations` view was described as behind a project marking that `Payments [Ontology]` doesn't carry (01-01); enabling exports on a Slack source needs the Information Security Officer role, not a Data Governance Officer (01-03); SOPs are per rule, not per view (01-04); fixed-severity rules were said to "come for free" (01-02); the FAQ's `—refresh-dependencies` is now written with two hyphens and the page's rendering noted (02-04); "through code" no longer asserted to mean data expectations (02-01); two recommendation sentences relabelled from [Explanation] (01-02, 02-03) |
| Oct 23, 2026 | Phase 4 | Read 8 pages in full (module 02). 4 notes. 61 quotes matched by script against the page store: 2 quotes trimmed to the page's wording. GLOSSARY 50 terms. Forward links from module 01 to module 02 retargeted from the module README to the notes |
| Oct 23, 2026 | Phase 3 | Read 9 pages in full (the two top pages, module 01). 5 notes. 112 quotes and 9 bold doc numbers matched by script against the page store: 3 quotes trimmed to the page's wording (two sentence-final periods that the page sets after a link; "based on your dataset's expected update frequency"), 3 own phrases moved from quote marks to italics. GLOSSARY 29 terms. Forward links to unwritten notes point at the module README until the note exists |
| Oct 23, 2026 | Plan | Self-review, 6 fixes: the *Observability dashboards* page moved from Orientation to 03-04; four page titles that differ from their sidebar labels recorded; Apps 08 (Automate replaced Object Monitoring) added to the overlap table; the boundary with the unwritten Data integration area stated; RQ-26 reused rather than duplicated; counts to be checked by script |

## Open research questions

Questions this area reuses from earlier areas are listed with their original ID.

| ID | Question | Status |
|---|---|---|
| [Ontology RQ-26](../Ontology/SOURCES.md#open-research-questions) | The *Observability* overview says Workflow Lineage shows seven days of execution history; *Run history* and *Metrics* say 30 days | Re-checked October 23, 2026 on the fresh pages: still conflicting (one sentence on the Observability overview against the Ontology and AIP observability overview, the Run history page and the Metrics page). [03-01](03-ontology-and-aip-observability/01-overview-and-run-history.md#seven-days-or-thirty-rq-26) records both readings and keeps the Ontology area's rule: plan for seven |

---
[Observability home](README.md) · [Topic map](MAP.md) · [Glossary](GLOSSARY.md)
