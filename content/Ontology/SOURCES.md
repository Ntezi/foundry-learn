# Sources, corrections and open questions

The single register for every source used in the Ontology notes. Each topic note also lists its own sources in its header table.

## How sources are recorded

- **Official Palantir pages first.** A factual claim about Foundry behaviour links to the exact page, ideally the section. It is labelled **[Docs]** only when the page says it.
- **Interpretation is labelled.** Reasoning is **[Explanation]**, advice is **[Recommendation]**, and anything not yet confirmed is an **Open question** with an ID below.
- **Version-sensitive facts are dated:** limits, feature support, deprecations. They are collected in [99 — Reference](99-reference/README.md) (limits and thresholds).
- **External sources are few and authoritative**, each with one sentence on why it matters for Foundry, listed under *Additional references* in the note that uses it.
- **Read depth** is recorded honestly: *read in full*, *read in part*, or *surveyed for planning*. Navigation titles and search snippets are never treated as reading the page.

## Register

### Ontology design pages (compiled September 25, 2026)
Used by [11 — Design](11-design/README.md), [Case study 01](17-case-studies/01-course-ontologies-reviewed.md) and [18 — Practice](18-practice/README.md). Moved here from `Ontology Design/SOURCES.md` on October 2, 2026, content unchanged apart from heading levels and link paths.

### What was read
Read in the in-app browser on **September 25, 2026**. All four are public Palantir documentation pages; no sign-in was needed.

| Page | URL | Notes |
|---|---|---|
| Ontology design: Best practices | https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/ | Read in full |
| Ontology design: Structural guidance | https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/ | Read in full |
| Ontology design: Anti-patterns | https://www.palantir.com/docs/foundry/ontology/ontology-anti-patterns/ | Read in full |
| Ontology design: Validation | https://www.palantir.com/docs/foundry/ontology/ontology-design-validation/ | Read in full, including the 7 collapsed example-question sets |

### How it was compiled
- **[Docs]** sections **paraphrase** the pages. They keep the structure, meaning, tables and thresholds, but not the wording. The docs' own examples and "avoid / prefer" diagrams are **described, not reproduced**. The worked examples and diagrams in these notes are our own (**[Example]**).
- The Validation page's 42 example questions are **summarized as a pattern** in [04 §2](11-design/04-validation.md), not copied. Our own question sets are clearly labelled.
- **[Explanation]** sections are our reasoning: links to our courses, software-engineering analogies and FDE practice. [05](17-case-studies/01-course-ontologies-reviewed.md) and [06](18-practice/01-design-exercises.md) are entirely our own material.
- Platform facts outside these four pages (for example AIP Evals, Automate, or Pipeline Builder's struct and flattening behaviour) come from our existing course notes and are linked there.

### Corrections to earlier study material
| Earlier material | Issue | Treatment |
|---|---|---|
| Original practice-exam file, question 7 ("Derived Property" for a first + last name concatenation) | Contradicts Structural guidance: same-object values with stable inputs should be **pre-computed in the pipeline**. Anti-patterns also names a function-backed full-name column as a Golden Hammer | Our [study_notes.json](../Foundry%20Practices/study_notes.json) accuracy note on this question already flagged it. This compilation confirms it with the current docs |
| Pipeline deep dive, lesson 11 (address concatenated into one string) | Fine as a training dataset step, but as an Ontology property the docs recommend a **struct** | Cross-referenced in [02 §2](11-design/02-structural-guidance.md) and [05 §7](17-case-studies/01-course-ontologies-reviewed.md). The course notes are left unchanged |

### Limitations
- The pages' **thresholds** ("~10k objects per query", "more than 10 action types") are the docs' heuristics as of the check date. They may change.
- The Validation page names **Insight, AIP Analyst and AI FDE**. Their availability in your enrollment wasn't checked.
- Interface support in specific contexts changes over time. The Structural guidance page points to the interface docs for current details, which weren't read for this compilation.

### Pages surveyed for planning (October 2, 2026)
Read for the Phase 1 plan, to design the module structure. **Not yet compiled.** Each will be re-read in full when its canonical note is written.

| Page | URL | Date | Depth | Used in |
|---|---|---|---|---|
| Ontology overview | https://www.palantir.com/docs/foundry/ontology/overview/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Why create an Ontology? | https://www.palantir.com/docs/foundry/ontology/why-ontology/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Core concepts | https://www.palantir.com/docs/foundry/ontology/core-concepts/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Models in the Ontology | https://www.palantir.com/docs/foundry/ontology/models/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontology-aware applications | https://www.palantir.com/docs/foundry/ontology/applications/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontologies overview | https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontology architecture overview | https://www.palantir.com/docs/foundry/object-backend/overview/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Object permissioning overview | https://www.palantir.com/docs/foundry/object-permissioning/overview/ | Oct 2, 2026 | Surveyed for planning: summary read, not yet compiled | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontology system (Architecture center) | https://www.palantir.com/docs/foundry/architecture-center/ontology-system/ | Oct 2, 2026 | Surveyed for planning; **read in full in Phase 3** (see below) | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontology SDK overview | https://www.palantir.com/docs/foundry/ontology-sdk/overview/ | Oct 2, 2026 | Surveyed for planning: summary read, not yet compiled | [GLOSSARY](GLOSSARY.md); module READMEs |
| Ontology augmented generation | https://www.palantir.com/docs/foundry/ontology/ontology-augmented-generation/ | Oct 2, 2026 | Surveyed for planning: summary read, not yet compiled | [GLOSSARY](GLOSSARY.md); module READMEs |
| AIP Chatbot Studio tools | https://www.palantir.com/docs/foundry/agent-studio/tools/ | Oct 2, 2026 | Surveyed for planning: summary read, not yet compiled | [GLOSSARY](GLOSSARY.md); module READMEs |

### Phase 3 pages (read in full, October 2, 2026)
Read in the built-in browser with full page text. A research sub-agent also read some security pages through a summarizing fetch tool; only claims re-checked in the browser were used.

**Fact-check (October 2, 2026):** 22 load-bearing claims (limits, defaults, "only"/"cannot" statements) were independently re-checked. A verification sub-agent confirmed 17 against the pages, with none wrong. The other 5 (datasets APPEND/UPDATE, stream partitions and checkpoint delay, CDC ordering column, Pipeline Builder one-to-one links, incremental APIs) were confirmed against the browser page text quoted during research.

| Page | URL | Used in |
|---|---|---|
| Ontology building overview | https://www.palantir.com/docs/foundry/ontology/overview/ | 00-01 |
| Why create an Ontology? | https://www.palantir.com/docs/foundry/ontology/why-ontology/ | 00-02, 01-05 |
| Core concepts | https://www.palantir.com/docs/foundry/ontology/core-concepts/ | 00-01, 01-01, 01-04 |
| Models in the Ontology | https://www.palantir.com/docs/foundry/ontology/models/ | 00-02 |
| Ontology-aware applications | https://www.palantir.com/docs/foundry/ontology/applications/ | 00-03 |
| The Ontology system (Architecture center) | https://www.palantir.com/docs/foundry/architecture-center/ontology-system/ | 00-02, 00-03, 01-04 |
| Ontology architecture overview | https://www.palantir.com/docs/foundry/object-backend/overview/ | 00-03 |
| Object types overview | https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/ | 00-01 |
| Create an object type | https://www.palantir.com/docs/foundry/object-link-types/create-object-type/ | 01-02, 02-01 |
| Indexing overview | https://www.palantir.com/docs/foundry/object-indexing/overview/ | 00-03 |
| Funnel batch pipelines | https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/ | 00-03, 01-02, 01-05, 02-01, 02-05 |
| Funnel streaming pipelines | https://www.palantir.com/docs/foundry/object-indexing/funnel-streaming-pipelines/ | 02-03 |
| Direct datasources | https://www.palantir.com/docs/foundry/object-indexing/direct-datasources/ | 02-03 |
| Data restrictions | https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/ | 01-01, 01-02, 01-03, 02-01 |
| Data integration overview | https://www.palantir.com/docs/foundry/data-integration/overview/ | 02 module |
| What is a data pipeline? | https://www.palantir.com/docs/foundry/data-integration/data-pipeline/ | 02-02 |
| Datasets | https://www.palantir.com/docs/foundry/data-integration/datasets/ | 02-01 |
| Streams | https://www.palantir.com/docs/foundry/data-integration/streams/ | 02-03 |
| Virtual tables | https://www.palantir.com/docs/foundry/data-integration/virtual-tables/ | 02-03 |
| Change data capture | https://www.palantir.com/docs/foundry/data-integration/change-data-capture/ | 01-05, 02-03 (page read to ~15k characters: backfill and limitations section truncated) |
| Views | https://www.palantir.com/docs/foundry/data-integration/views/ | 01-02, 02-01 |
| Branching | https://www.palantir.com/docs/foundry/data-integration/branching/ | 02-05 |
| Builds | https://www.palantir.com/docs/foundry/data-integration/builds/ | 02-05 |
| Schedules | https://www.palantir.com/docs/foundry/data-integration/schedules/ | 02-05 |
| Data Lineage overview | https://www.palantir.com/docs/foundry/data-lineage/overview/ | 02-05 |
| Types of pipelines | https://www.palantir.com/docs/foundry/building-pipelines/pipeline-types/ | 01-05, 02-02 |
| Recommended project and team structure | https://www.palantir.com/docs/foundry/building-pipelines/recommended-project-structure/ | 01-03, 02-02 |
| Pipeline Builder overview | https://www.palantir.com/docs/foundry/pipeline-builder/overview/ | 02-02 |
| Add an Ontology output (Pipeline Builder) | https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/ | 01-01, 02-02 |
| Organizations and spaces | https://www.palantir.com/docs/foundry/security/orgs-and-spaces/ | 02-04 |
| Projects and roles | https://www.palantir.com/docs/foundry/security/projects-and-roles/ | 02-04 |
| Markings | https://www.palantir.com/docs/foundry/security/markings/ | 02-04, 02-05 |
| Access control propagation | https://www.palantir.com/docs/foundry/security/access-control-propagation/ | 02-04 |
| Restricted views | https://www.palantir.com/docs/foundry/security/restricted-views/ | 02-04 |
| Securing a data foundation | https://www.palantir.com/docs/foundry/security/securing-a-data-foundation/ | 02-04 (checked for the Discoverer default-role passage only) |
| Projects and resources (Getting started) | https://www.palantir.com/docs/foundry/getting-started/projects-and-resources/ | 02-04 |
| Ontologies overview | https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/ | 00-01, 01-04, 02-04 |
| Ontology permissions | https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/ | 00-01, 02-04 |

### Phase 4, first batch (read in full, October 2, 2026)
Read in the built-in browser by fetching each page's own HTML and extracting the article text (no summarizing tool). Pages listed by their entry URL; grouped rows cover the sibling pages named.

| Page | URL | Used in |
|---|---|---|
| Shared ontologies | https://www.palantir.com/docs/foundry/ontologies/shared-ontologies/ | 03-01 |
| Ontology Manager overview | https://www.palantir.com/docs/foundry/ontology-manager/overview/ | 03-02 |
| Navigation | https://www.palantir.com/docs/foundry/ontology-manager/navigation/ | 03-02 |
| Viewing usage | https://www.palantir.com/docs/foundry/ontology-manager/view-usage/ | 03-02 |
| Save changes | https://www.palantir.com/docs/foundry/ontology-manager/save-changes/ | 03-02 |
| Review and restore changes | https://www.palantir.com/docs/foundry/ontology-manager/restore-changes/ | 03-02 |
| Object Set Service limitations | https://www.palantir.com/docs/foundry/ontologies/oss-limitations/ | 03-03, 05-05 |
| Types reference | https://www.palantir.com/docs/foundry/object-link-types/type-reference/ | 03-03, 05-01 |
| Object type metadata | https://www.palantir.com/docs/foundry/object-link-types/object-type-metadata/ | 03-04 |
| Statuses | https://www.palantir.com/docs/foundry/object-link-types/metadata-statuses/ | 03-04, 04-04 |
| Type classes | https://www.palantir.com/docs/foundry/object-link-types/metadata-typeclasses/ | 03-04 |
| Render hints | https://www.palantir.com/docs/foundry/object-link-types/metadata-render-hints/ | 03-04, 05-07 |
| Object type groups | https://www.palantir.com/docs/foundry/object-link-types/type-groups/ | 03-04 |
| Edit object types | https://www.palantir.com/docs/foundry/object-link-types/edit-object-type/ | 04-02, 04-04 |
| Multi-datasource object types | https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/ | 04-02 |
| Object edits overview | https://www.palantir.com/docs/foundry/object-edits/overview/ | 04-04 |
| How user edits are applied | https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/ | 04-04, 05-06; conflict strategies used later in 13 |
| Manage schema changes | https://www.palantir.com/docs/foundry/object-edits/schema-migrations/ | 04-03, 04-04 |
| Properties overview | https://www.palantir.com/docs/foundry/object-link-types/properties-overview/ | 04-03, 05-01 |
| Base types | https://www.palantir.com/docs/foundry/object-link-types/base-types/ | 05-01, 05-08 |
| Edit object type properties | https://www.palantir.com/docs/foundry/object-link-types/edit-properties/ | 04-03, 05-01 |
| Property metadata | https://www.palantir.com/docs/foundry/object-link-types/property-metadata/ | 05-01, 05-08 |
| Value types (overview, create, use, versions, permissions, constraints) | https://www.palantir.com/docs/foundry/object-link-types/value-types-overview/ | 05-02 |
| Structs (overview, create, automapping, shared properties, main fields) | https://www.palantir.com/docs/foundry/object-link-types/structs-overview/ | 05-03 |
| Property reducers | https://www.palantir.com/docs/foundry/object-link-types/property-reducers/ | 05-07 |
| Shared properties (overview, use, metadata) | https://www.palantir.com/docs/foundry/object-link-types/shared-property-overview/ | 05-04 |
| Configure derived properties | https://www.palantir.com/docs/foundry/object-link-types/derived-properties/ | 05-05 |
| Derived properties (Ontology search) | https://www.palantir.com/docs/foundry/ontology/derived-properties/ | 05-05 |
| Edit-only properties | https://www.palantir.com/docs/foundry/object-link-types/edit-only-properties/ | 05-06 |
| Required properties | https://www.palantir.com/docs/foundry/object-link-types/required-properties/ | 05-06 |
| Mandatory control properties | https://www.palantir.com/docs/foundry/object-link-types/mandatory-control-properties/ | 05-06 |
| Value formatting | https://www.palantir.com/docs/foundry/object-link-types/value-formatting/ | 05-07 |
| Conditional formatting | https://www.palantir.com/docs/foundry/object-link-types/conditional-formatting/ | 05-07 |
| Time series overview; create a time series object type; add time series properties | https://www.palantir.com/docs/foundry/time-series/time-series-overview/ | 05-08 |
| Using media in the Ontology | https://www.palantir.com/docs/foundry/media-sets-advanced-formats/media-in-ontology/ | 05-08 |
| Use geospatial data in the Ontology | https://www.palantir.com/docs/foundry/geospatial/ontology/ | 05-08 |
| Process multimodal and embedding models | https://www.palantir.com/docs/foundry/ontology/aip-multimodal-and-embedding-models/ | 05-08 |

### Phase 4, second batch (read in full, October 2, 2026)
Same method as the first batch. Grouped rows cover the sibling pages named.

| Page | URL | Used in |
|---|---|---|
| Link types overview | https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/ | 06-01, 06-02 |
| Create a link type (incl. object-backed links) | https://www.palantir.com/docs/foundry/object-link-types/create-link-type/ | 06-01, 06-02 |
| Edit link types; link type metadata | https://www.palantir.com/docs/foundry/object-link-types/edit-link-types/ | 06-01 |
| Add an Ontology output (Pipeline Builder) | https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/ | 06-01 |
| Pivot to explore linked objects | https://www.palantir.com/docs/foundry/object-explorer/pivot-linked/ | 06-03 |
| Objects and links (TSv1) | https://www.palantir.com/docs/foundry/functions/api-objects-links/ | 06-03 |
| Object sets (TSv1) | https://www.palantir.com/docs/foundry/functions/api-object-sets/ | 06-03 |
| TypeScript OSDK reference (Links section) | https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk/ | 06-03 |
| TypeScript v2 migration (link traversal mapping) | https://www.palantir.com/docs/foundry/functions/typescript-v2-migration/ | 06-03 |
| Interfaces overview | https://www.palantir.com/docs/foundry/interfaces/interface-overview/ | 07-01 |
| Create / implement / edit implementation / extend an interface | https://www.palantir.com/docs/foundry/interfaces/create-interface/ | 07-02 |
| Interface metadata | https://www.palantir.com/docs/foundry/interfaces/interface-metadata/ | 07-01, 07-02 |
| Interface link type constraints | https://www.palantir.com/docs/foundry/interfaces/interface-link-types-overview/ | 07-03 |
| Interface action type constraints (beta) | https://www.palantir.com/docs/foundry/interfaces/interface-action-type-constraints/ | 07-03 |
| Actions on interfaces | https://www.palantir.com/docs/foundry/action-types/actions-on-interfaces/ | 07-03 |
| Action types overview; getting started; explore other action types | https://www.palantir.com/docs/foundry/action-types/overview/ | 08-01 |
| Allow users to edit objects and links | https://www.palantir.com/docs/foundry/object-link-types/allow-editing/ | 08-01 (OSv1 wording noted) |
| Object edits: overview, how edits are applied, materializations | https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/ | 08-01 |
| Rules | https://www.palantir.com/docs/foundry/action-types/rules/ | 06-03, 08-01, 08-02 |
| Parameters: overview, defaults, filters, dropdown security, overrides, performance | https://www.palantir.com/docs/foundry/action-types/parameter-overview/ | 08-02 |
| Submission criteria | https://www.palantir.com/docs/foundry/action-types/submission-criteria/ | 08-03 |
| Test run | https://www.palantir.com/docs/foundry/action-types/test-run/ | 08-03, 08-05 |
| Function-backed actions: overview, getting started, batched execution | https://www.palantir.com/docs/foundry/action-types/function-actions-overview/ | 08-04 |
| Scale and property limits | https://www.palantir.com/docs/foundry/action-types/scale-property-limits/ | 08-04, 08-08 |
| Side effects: overview, notifications, webhooks, trigger schedule build | https://www.palantir.com/docs/foundry/action-types/side-effects-overview/ | 08-05 |
| Permissions; read and write authorizations (beta) | https://www.palantir.com/docs/foundry/action-types/permissions/ | 08-06 |
| Consistency and isolation | https://www.palantir.com/docs/foundry/action-types/consistency-guarantees/ | 08-07, 09-02 |
| Undo or revert actions; action log; action metrics; monitoring | https://www.palantir.com/docs/foundry/action-types/action-log/ | 08-07 |
| Use actions; inline edits; configure sections; upload media; upload attachments | https://www.palantir.com/docs/foundry/action-types/use-actions/ | 08-08 |
| Functions overview; functions on objects; feature support by language | https://www.palantir.com/docs/foundry/functions/language-feature-support/ | 09-01 |
| Import object, interface and link types | https://www.palantir.com/docs/foundry/functions/ontology-imports/ | 09-01 |
| Ontology edits (overview); TSv2 Ontology edits; TSv2 staged writes (beta) | https://www.palantir.com/docs/foundry/functions/edits-overview/ | 09-02 |
| Query functions and API gateway | https://www.palantir.com/docs/foundry/functions/query-functions/ | 09-02 |
| Versioning; version range dependencies; permissions; manage functions; metrics; monitoring | https://www.palantir.com/docs/foundry/functions/functions-versioning/ | 09-03 |
| Optimize performance | https://www.palantir.com/docs/foundry/functions/optimize-performance/ | 06-03, 09-03 |
| Functions on models; language models in TSv2/Python; model aliases; function interfaces | https://www.palantir.com/docs/foundry/functions/functions-on-models/ | 09-04 |

### Phase 5, first batch (read in full, October 2, 2026)
Same method as Phase 4. Grouped rows cover the sibling pages named.

| Page | URL | Used in |
|---|---|---|
| Ontology-aware applications | https://www.palantir.com/docs/foundry/ontology/applications/ | 10-01 |
| Object Views: overview, standard, configured, versions | https://www.palantir.com/docs/foundry/object-views/overview/ | 10-02 |
| Object Explorer: overview, apply actions, save lists, analyze using SQL (beta), configure | https://www.palantir.com/docs/foundry/object-explorer/overview/ | 10-02 |
| Workshop: overview, variables, interfaces, permissions, functions, derived properties, unsupported property types, actions | https://www.palantir.com/docs/foundry/workshop/overview/ | 10-03 |
| Slate: overview, read and write data, object sets, OSDK in Slate, writeback | https://www.palantir.com/docs/foundry/slate/overview/ | 10-03 |
| Ontology SDK: overview, unsupported types, TypeScript subscriptions, other languages | https://www.palantir.com/docs/foundry/ontology-sdk/overview/ | 10-04 |
| Developer Console: overview, application restrictions, permissions, standalone OAuth clients | https://www.palantir.com/docs/foundry/developer-console/overview/ | 10-04 |
| Quiver, Map, Vertex (relationships, events), Machinery (core concepts, connect data), Foundry Rules (overview, object model), Dynamic scheduling (overview, Ontology primitives) | https://www.palantir.com/docs/foundry/vertex/overview/ | 10-05 |
| Automate: overview, object set conditions, evaluation frequency, effects, action effects, effect settings, permissions, third-party ownership, limits; Object Monitors (sunset) | https://www.palantir.com/docs/foundry/automate/overview/ | 10-06 |
| Object permissioning overview; Ontology permissions; legacy Ontology permissions; migrate to project-based permissions | https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/ | 12-01, 12-02 |
| Managing object security; object and property security policies; restricted-view-backed object types | https://www.palantir.com/docs/foundry/object-permissioning/object-security-policies/ | 12-03 |
| Access control propagation | https://www.palantir.com/docs/foundry/security/access-control-propagation/ | 12-03, 12-04 |
| Permission checks for actions | https://www.palantir.com/docs/foundry/object-edits/permission-checks/ | 12-04 |
| Ontologies overview (private vs shared); shared ontologies; cross-organization collaboration; migrating between ontologies | https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/ | 12-05 |
| Ontology architecture overview | https://www.palantir.com/docs/foundry/object-backend/overview/ | 13-01, 13-04, 13-05 |
| Indexing: overview, Funnel batch and streaming pipelines, direct datasources, data restrictions, FAQ | https://www.palantir.com/docs/foundry/object-indexing/overview/ | 13-02 |
| Change data capture (re-read in full) | https://www.palantir.com/docs/foundry/data-integration/change-data-capture/ | 13-02; confirms 02-03 |
| User edit history; materializations | https://www.palantir.com/docs/foundry/object-edits/user-edit-history/ | 13-03 |
| Breaking changes OSv1 → OSv2; migrate from OSv1 to OSv2 | https://www.palantir.com/docs/foundry/object-backend/osv1-osv2-migration/ | 13-04 |
| Ontology volume; indexing compute; query compute; OSS limitations; aggregation considerations | https://www.palantir.com/docs/foundry/ontologies/query-compute-usage/ | 13-05 |

### Phase 5, second batch (read in full, October 3, 2026)
Same method. Grouped rows cover the sibling pages named.

| Page | URL | Used in |
|---|---|---|
| Save changes; review and restore changes | https://www.palantir.com/docs/foundry/ontology-manager/save-changes/ | 14-01 |
| Branching the ontology (Global Branching for the Ontology) | https://www.palantir.com/docs/foundry/ontologies/branching-ontology/ | 14-01, 14-02 |
| Global Branching: overview, core concepts, integrations, branch security, resource protection and approval policies | https://www.palantir.com/docs/foundry/global-branching/overview/ | 14-02 |
| Review ontology proposals; Ontology branches [Legacy]; branching action types | https://www.palantir.com/docs/foundry/ontologies/review-ontology-proposals/ | 14-02 |
| Manage schema changes (schema migrations); metadata statuses | https://www.palantir.com/docs/foundry/object-edits/schema-migrations/ | 14-03 |
| Foundry DevOps: overview, core concepts, create products; Ontology types and action types in Marketplace | https://www.palantir.com/docs/foundry/foundry-devops/create-products/ | 14-04, 14-05 |
| Migrating between ontologies | https://www.palantir.com/docs/foundry/ontologies/ontology-migration/ | 14-05 |
| Export, edit and import an Ontology | https://www.palantir.com/docs/foundry/ontology-manager/export-import/ | 14-05 |
| Ontology metrics (viewing usage) | https://www.palantir.com/docs/foundry/ontology-manager/view-usage/ | 14-01, 14-03, 14-06 |
| Ontology cleanup | https://www.palantir.com/docs/foundry/ontology-manager/cleanup/ | 14-03, 14-06 |
| Observability overview; Ontology and AIP observability: run history, metrics, service logs and debugging; action metrics | https://www.palantir.com/docs/foundry/observability/overview/ | 14-06 |

### Coverage-check additions (read in full, October 3, 2026)
Pages found missing by the [docs index](99-reference/docs-index.md) sidebar check. Long reference pages (types reference, media, TSv1 unit testing) were read for limits and rules rather than line by line.

| Page | URL | Used in |
|---|---|---|
| Understanding text search; Object Explorer search syntax; Ontology (regex) search syntax; search for objects; filter results; render hints | https://www.palantir.com/docs/foundry/object-explorer/understanding-text-search/ | 10-07 |
| Object Explorer: getting started, explore with charts, view results, compare object sets, save explorations, URLs | https://www.palantir.com/docs/foundry/object-explorer/getting-started/ | 10-02 |
| Object Views: full and panel (use, configure), branching, URLs, comments, Marketplace | https://www.palantir.com/docs/foundry/object-views/branching-object-views/ | 10-02 |
| Edit struct types; create and edit shared properties | https://www.palantir.com/docs/foundry/object-link-types/edit-struct-type/ | 05-03, 05-04 |
| Actions on structs; set up a notification; set up a webhook | https://www.palantir.com/docs/foundry/action-types/actions-on-structs/ | 08-02, 08-05 |
| Edit an interface definition | https://www.palantir.com/docs/foundry/interfaces/edit-interface-definition/ | 07-02 |
| Ontology roles migration (legacy) | https://www.palantir.com/docs/foundry/ontology-manager/ontology-roles-migration/ | 12-02 |
| Object Storage v1 (Phonograph) | https://www.palantir.com/docs/foundry/object-databases/object-storage-v1/ | 13-04 |
| Machinery: draw a graph, process mining, analyze and monitor; Vulcan overview; Gotham type mapping; objects from Gaia | https://www.palantir.com/docs/foundry/machinery/process-mining/ | 10-05 |
| Functions: 50 pages across getting started (all languages), types, local SDKs, edits (Python, TSv1), staged writes (Python), IDs, identifiers, errors, telemetry, API calls, aliases, platform SDK, settings, deployment, streaming, use in the platform, Pipeline Builder, Workshop, branching, Marketplace, TSv1 tooling and unit testing, attachments, media | https://www.palantir.com/docs/foundry/functions/getting-started/ | 09-05 (full list at the end of the note) |

### Phase 6 (read in full, October 3, 2026)
Same method. Grouped rows cover the sibling pages named.

| Page | URL | Used in |
|---|---|---|
| Ontology scenarios: overview, temporary, persisted, merge, OSDK | https://www.palantir.com/docs/foundry/ontology/overview-ontology-scenario/ | 15-02 |
| Time series overview (incl. sensor object types) | https://www.palantir.com/docs/foundry/time-series/time-series-overview/ | 15-01 |
| Models in the Ontology; model connectivity and development; direct model deployments | https://www.palantir.com/docs/foundry/ontology/models/ | 15-03 |
| Multi-datasource object types (re-read) | https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/ | 15-04 |
| Semantic search; document processing; multimodal and embedding models; OAG; workflows with Palantir-provided and custom models | https://www.palantir.com/docs/foundry/ontology/overview-semantic-search/ | 16-01, 16-02 |
| AIP Chatbot Studio: overview, tools, retrieval context, citations, application state | https://www.palantir.com/docs/foundry/chatbot-studio/overview/ | 16-01, 16-03 |
| Ontology MCP | https://www.palantir.com/docs/foundry/ontology-mcp/overview/ | 16-03 |
| AIP Logic overview; staged writes in Logic; Logic with Automate | https://www.palantir.com/docs/foundry/logic/overview/ | 16-01, 16-04 |
| AIP Evals: evaluation functions and Ontology edits | https://www.palantir.com/docs/foundry/aip-evals/ontology-edits/ | 16-04 |
| Control LLM data access with markings | https://www.palantir.com/docs/foundry/aip/control-llm-data-access-with-markings/ | 16-01 |
| Staged writes (TSv2) | https://www.palantir.com/docs/foundry/functions/typescript-v2-staged-writes/ | 16-04 |

**Checking (October 2, 2026, second batch):** every note in modules 06–09 was written straight from the full page text listed above, read in this session. Limits and "only"/"cannot" statements were compared again with that text before publishing. That comparison found two errors in drafts, both fixed (see the corrections log), plus three conflicts between pages (RQ-21, RQ-22, RQ-23). **Second pass (same day, after self-review):** 50 load-bearing claims were re-fetched from the live pages and matched word for word against the page text by script. All 50 were found (one table row needed a manual check because of how table text is extracted). This was a separate pass, but it was done by the same author, not a sub-agent. It confirms that the quoted claims exist on the pages; it doesn't test our interpretations.

**Checking (October 2, 2026, Phase 5 first batch):** 60 load-bearing claims from modules 10, 12 and 13 were re-fetched and matched word for word against the page text by script. All 60 were found. As before, this was done by the same author, not a sub-agent, and it checks quotes, not interpretations. **Re-run October 3** after the self-review fixes: 65 claims, including the 5 new ones behind the fixes (matching effect-input types, static-only filters, interface-link traversal versus "in development", generator "log the error", the Passenger example's "stop inheriting"). All 65 were found.

**Checking (October 3, 2026, Phase 5 second batch):** 58 claims from module 14 were re-fetched and matched against the page body by script (navigation text excluded). All 58 were found, including the action failure categories and the "seven days" wording behind RQ-26. **Re-run after the self-review:** 2 more claims (packaged action criteria must not reference a user; interfaces with action type constraints are packageable). All 60 found. Three sat on a sibling page the note also cites: the protected-resource Save dialog and the project-permissions requirement (*Branching the ontology*), and "will affect main" (*Global Branching core concepts*). Same caveat as before: this checks quotes, not interpretations.

**Checking (October 3, 2026, coverage-check additions):** 60 claims from 10-07, the 10-02 extension, the top-ups and 09-05 were matched by script against page bodies (navigation excluded). All 60 were found.

**Checking (October 3, 2026, Phase 6):** 49 claims from modules 15 and 16 were matched by script against page bodies. All 49 were found. Every relevant page in the *Ontology building* sidebar is now cited by a note ([docs index](99-reference/docs-index.md): 274 cited, 123 out of scope).

**Phase 7 (October 3, 2026):** no new pages were read. The reference model, decision guide, limits and troubleshooting pages compile facts already checked in the notes they link; numbers in *Limits and thresholds* were copied from those notes, not re-fetched.

**Phase 8 (October 4, 2026):** all 191 quoted phrases on **[Docs]** lines were matched against the current text of the 321 cited pages. 179 matched; 6 had drifted from the docs' wording and were corrected; 1 matched after allowing for the docs' inner quotes; 5 were our own text in quote marks (4 examples, 1 phrase now un-quoted). Every number in *Limits and thresholds* (about 60 values) was also searched for in the same pages and found as stated. Doc conflicts RQ-21, 24, 26 and 29 re-checked and still present. Details: [QUALITY-REVIEW](QUALITY-REVIEW.md).

## Corrections log
New corrections are added here. Earlier corrections from the design compilation are in its section above.

| Date | Earlier material | Issue | Treatment |
|---|---|---|---|
| Oct 2, 2026 | Glossary entry *Roles (Ontology)* (seeded from Core concepts) | Core concepts calls roles "the central permissioning model"; the Ontology permissions page says project-based permissions replace roles for new ontologies | Glossary rewritten; inconsistency recorded in [00-01](00-orientation/01-what-the-ontology-is.md#caveats) and [02-04](02-foundry-data-foundations/04-projects-spaces-and-markings.md#caveats) |
| Oct 2, 2026 | Intro course note 06 calls the Ontology "a semantic layer" | The Architecture center says it "is not a semantic layer" | Reconciled in [01-04](01-foundations/04-semantic-layers-and-domain-models.md#what-palantir-means-by-ontology); course note unchanged |
| Oct 2, 2026 | Intro course note 08: "three pillars" plus security | The docs count four components (data, logic, action, security) | Noted in [00-02](00-orientation/02-why-an-ontology.md#reading-this-page-critically); course note unchanged |
| Oct 2, 2026 | [01-02](01-foundations/02-keys-and-identity.md) listed only the disallowed primary-key types | *Properties overview* also **discourages** Date, Timestamp, Boolean, Byte and Long keys | Added to 01-02; full table in [04-03](04-object-types/03-primary-keys-and-titles.md) |
| Oct 2, 2026 | Draft of [06-03](06-links/03-traversal-and-search-arounds.md) said links are edited with "link rules" | *Rules*: Create/Delete link rules are for many-to-many only; foreign-key links are edited with Modify object on the key | 06-03 corrected before publication; detail in [08-02](08-actions/02-rules-and-parameters.md) |
| Oct 2, 2026 | Draft of 08-05 said recipients without access are skipped | *Notifications*: default is **Require all users to have permissions**, which fails the action | 08-05 rewritten; page conflict logged as RQ-21 |
| Oct 2, 2026 | Modules 06–09 worked examples (self-review) | Example details contradicted the docs or other notes. 08-06 showed creating an object in a project the user can't see, but the docs require seeing the type and its datasources. 08-07's double refund used *Approve refund*, which acts on an existing refund. The action log captured properties of non-parameters. The 08-03 criteria followed links. 07-03 misread ONE/MANY. Property and key names didn't match 04–05 (`carrierCode`, `promisedDeliveryDate`, `riskAssessment`). | All fixed in place. Untested assumptions marked in 07-02 (value types and whole structs on interface properties). Running example gained a "types added in 06–09" table. |
| Oct 2, 2026 | 02-04, 08-06 used **restricted views** as Kestrel's row-level mechanism | *Managing object security* recommends **object and property security policies** "in most cases"; types with no datasource **require** them | 12-03 states the new default; 08-06's `ChargebackQuery` now uses an object security policy; 02-04 left as written, with 12-03 linked as the update |
| Oct 2, 2026 | 08-01, 08-04, 09-02 used lowercase order statuses (`held`, `cancelled`), and *Hold order* set a value outside the enum | 05-02 defines `OrderStatus` as an uppercase enum | Enum gained `ON_HOLD`; notes changed to `ON_HOLD`, `CANCELLED`, `SHIPPED`, `DELIVERED`, `PAID` |
| Oct 2, 2026 | Drafts of 10-05 and 12-01 said Order is a multi-datasource type, and that an app shows "Payment (no access)" | Neither is in the model or the docs | Corrected before publishing |
| Oct 3, 2026 | Modules 10, 12, 13 worked examples (self-review) | 10-06's automation passed Payments to an Order action, but the docs require matching types. The portal's service user would fail Shipment's regional policy. 12-03 put `deliveryAddress` on Customer (it's on Order) and missed the inherited `Customer PII` marking. Diagrams used a nonexistent `status = open`. 10-03/10-05 implied Order is regional. 10-03 treated "this week" as a static filter. Cancel order cost undercounted the new Refund | All fixed in place. Added *Hold order for payment*, a service-user policy branch, a separate Order PII policy and the declassification step. Order is now explicitly non-regional. New RQ-25 |
| Oct 3, 2026 | Draft of [14-03](14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) step 5 used the Usage tab to verify a single struct field was no longer read | *Ontology metrics* are per **object type and link type** | Step 5 now relies on the consumer list and code search; noted in 14-06 |
| Oct 3, 2026 | Module 14 worked examples (self-review) | 01 put deprecation in the breaking tier, while 03 shows it breaks nothing; 03 called deprecation the "first" step but its playbook makes it step 3; 01's audit assumed a History filter by tier; 02 re-added the existing `Shipment.eta`; 02 and 03 ignored the dev/test/prod split 04 introduced; 04 cited a service-user criterion as rewritten while 10-06 still named the user; 06 listed "has user edits" as a cleanup flag | Fixed in 01–06 and 10-06; 04 now has a *Which environment changes what* table; Update lines added to 03-01 and 00-04 |
| Oct 3, 2026 | Coverage-check additions (self-review) | 10-07's own recommendation (not analyzed for `Warehouse.code`) broke a prefix search its lab showed working; the Language-analyzer example was unlabelled interpretation; 10-07 pointed to 09-01 for TSv2/Python/OSDK search filters, which no note covers; 09-05's repository rule contradicted the docs' cost advice; 09-05 said test runs test edits (they write nothing); a docs recommendation on deployed upgrades read as a rule; 10-02 gave Daniel an admin-only action; 14-01 didn't reflect the Object View protection gap; 07-02 overstated MoneyCase's rationale | Fixed in 10-07, 09-05, 10-02, 14-01, 07-02; running example and docs index tidied |
| Oct 3, 2026 | Modules 15–16 (self-review) | 15-02 sent all agent re-routes to scenarios while 16-03/16-04 use `RerouteProposal` objects; 15-02's criteria example didn't match Kofi's role as Accra lead; 15-04 cited 04-02 option B for billing data (it was about the risk profile); 16-03 put a function-backed context function in TSv2 against 09-05's rule without saying it must be TSv1; 16-05 redefined `ON_HOLD` as payment/fraud only and renamed a `reason` parameter that 08-01 already defines | Fixed in 15-02, 15-04, 16-03, 16-05 |
| Oct 4, 2026 | Quoted wording in 00-03, 01-04, 06-03, 08-02, 09-04, 10-02 (quality review) | The live pages say "is not a 'semantic layer'", "It is possible to pivot through multiple links", "only the first override is executed", "automatically generated wrappers around live model deployments" and "matches the object type's configuration"; 14-05 put our own phrase in quote marks | Quotes corrected to the current wording |
| Oct 2, 2026 | Research sub-agent summary of *Projects and roles* said folder and file role grants are allowed by default | The page says they are **disabled by default** | Browser text used; sub-agent claim discarded |

## Open research questions

| ID | Question | Status |
|---|---|---|
| RQ-01 | There are two "Derived properties" pages (`object-link-types/derived-properties/` and `ontology/derived-properties/`). Same feature, versions, or different scopes? | **Resolved Oct 2:** one is configured on the object type in Ontology Manager, the other is defined per request in the TypeScript OSDK (`withProperties`); both beta. See [05-05](05-properties/05-derived-properties.md) |
| RQ-02 | How do resource permissions, datasource permissions, restricted views, object security policies and markings combine, and how does the result show up in OSDK and agent tools? | **Mostly answered Oct 2** (agent tool design is left for module 16): [12-01](12-security-and-governance/01-two-layer-permission-model.md), [12-03](12-security-and-governance/03-object-and-property-security.md), [12-04](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| RQ-03 | Project-based Ontology permissions vs legacy roles: what changed, and which applies in our enrollment? | **Mostly answered Oct 2:** [12-02](12-security-and-governance/02-ontology-resource-permissions.md). Which model our own enrollment uses is unchecked |
| RQ-04 | Conflict rules when user edits and pipeline updates collide (OSv2 Funnel, materializations); which schema changes break edits? | **Answered Oct 2:** conflict strategies and materializations in [08-01](08-actions/01-action-types.md#when-the-source-and-an-edit-disagree); schema migrations in [04-04](04-object-types/04-creating-and-editing-object-types.md) |
| RQ-05 | OSv1's planned deprecation after June 30, 2026 has passed. Is any behaviour still OSv1-only? | Open |
| RQ-06 | Current documented limits: ~10k objects per derived-property query, 2,000 properties per type, action scale and property limits, OSS limitations, aggregation accuracy. | **Answered Oct 2:** collected in [13-05](13-backend-architecture/05-limits-usage-and-compute.md#part-3--limits-on-one-page) |
| RQ-07 | Interface support matrix: where interfaces work today in Workshop, OSDK, actions and functions. | **Answered Oct 2** (as of that date): see [07-01](07-interfaces/01-interfaces.md#the-support-table) and [07-03](07-interfaces/03-interface-links-and-action-constraints.md). Re-check before relying on it |
| RQ-08 | Ontology branching vs Global Branching vs legacy ontology branches vs proposals: scope of each. | **Answered Oct 3:** [14-02](14-lifecycle-and-operations/02-branching-and-proposals.md#which-branching). Global Branching is current; legacy ontology branches are sunset; ontology proposals are created automatically on a global branch |
| RQ-09 | Shared ontologies and spaces: what can link across ontologies? (The Ontology deep-dive lesson 15 case.) | **Partly answered Oct 2:** links across ontologies are not supported; the docs point to shared ontologies ([06-01](06-links/01-link-types-and-cardinality.md)). Functions can import only one ontology per project ([09-01](09-functions/01-functions-on-objects.md)). Spaces still open |
| RQ-10 | Action consistency and isolation guarantees; revert limits; what the action log records. | **Answered Oct 2:** [08-07](08-actions/07-consistency-reverts-and-logs.md) |
| RQ-11 | Functions: TypeScript v1 → v2 migration, Python feature parity, version-range dependencies. | **Mostly answered Oct 2:** [09-01](09-functions/01-functions-on-objects.md#choosing-a-language), [09-03](09-functions/03-function-lifecycle.md). The full TSv1→TSv2 migration guide is not yet summarised |
| RQ-12 | Compute cost model for indexing and queries, and the design levers that control it. | **Answered Oct 2:** [13-05](13-backend-architecture/05-limits-usage-and-compute.md) |
| RQ-13 | Object Monitors (sunset) → Automate: the migration path. | **Partly answered Oct 2:** Automate is "fully backwards-compatible" and Object Monitors are in sunset ([10-06](10-applications/06-automate-and-ontology-events.md)); the step-by-step migration wasn't read |
| RQ-14 | Agent behaviour: native vs prompted tool calling on Ontology tools; citations; what the legacy semantic-search tool implies. | **Answered Oct 3:** [16-03](16-ai-and-agents/03-ontology-tools-for-agents.md#the-rules-kestrel-drew) (tool modes), [16-01](16-ai-and-agents/01-ontology-as-ai-context.md#citations-close-the-loop) (citations), [16-02](16-ai-and-agents/02-semantic-search-and-embeddings.md#5-retrieve) (legacy tool: no citations, no object set returned) |
| RQ-15 | Embedding/vector property support and limits. | **Mostly answered Oct 3:** 2,048 dimensions ([05-08](05-properties/08-time-series-media-geo-and-vectors.md)); dimension and similarity function, KNN limits and model choice ([16-02](16-ai-and-agents/02-semantic-search-and-embeddings.md)). Not covered: index-time costs of vectors |
| RQ-16 | Are one-to-one link types available when created in Ontology Manager? Pipeline Builder's Ontology outputs say they are not supported there. | **Resolved Oct 2:** yes in Ontology Manager, as an indicator that is not enforced; Pipeline Builder offers one-to-many and many-to-many only ([06-01](06-links/01-link-types-and-cardinality.md)) |
| RQ-17 | Does an object type's own file inherit the markings of its backing datasource, beyond affecting who can see its objects? | **Partly answered Oct 2:** object security policies inherit all mandatory controls from their datasources by default ([12-03](12-security-and-governance/03-object-and-property-security.md)). Whether the type's own file inherits markings is still open |
| RQ-18 | *Create an object type* says a backing datasource may not contain `StructType` columns; the struct pages say a struct property is backed by a struct-type column. Which applies where (helper only?) | Open |
| RQ-19 | Can a derived property configured in Ontology Manager filter the linked objects (e.g. only this week's shipments), or only the OSDK form? | **Partly answered Oct 2:** Workshop's module-level derived properties accept **static** filters on the linked type, so `isLate = true` works but relative dates such as "this week" don't ([10-03](10-applications/03-workshop-and-slate.md)). The Ontology Manager form is still unclear |
| RQ-20 | *Interfaces overview* says interfaces "are permissioned through Ontology roles", while Ontology resources have moved to project-based permissions. Which applies, and does viewing objects through an interface still require access to each implementing type? | **Partly answered Oct 2:** the legacy-permissions page lists interfaces among resources that can be project resources ([12-02](12-security-and-governance/02-ontology-resource-permissions.md)); the overview sentence likely predates this. Still test with a restricted user |
| RQ-21 | *Notifications* says the default **Require all users to have permissions** fails the action if any recipient lacks access; *Permissions* says such recipients are skipped and edits may still succeed. | Open: treat the notification page's setting as authoritative ([08-05](08-actions/05-side-effects.md#notifications)) |
| RQ-22 | *Consistency and isolation* lists staged writes for "TypeScript v2, Python, and AIP Logic" function-backed actions; *Feature support by language* marks AIP Logic staged writes **No**; the staged-writes page shows AIP Logic only as a nested participant. | Open ([09-02](09-functions/02-query-functions-and-ontology-edits.md#staged-writes-beta)) |
| RQ-23 | Some pages still describe OSv1 mechanics as current: *Allow editing* (writeback datasets as the prerequisite), *Edit object types* and *Edit link types*. Which statements still apply on OSv2? | Open (related to RQ-05) |
| RQ-24 | *Ontology architecture overview*: "By default, the Search Around limit is 100,000 objects" (support can raise it). *OSS limitations* and *Object sets (TSv1)*: 100,000 is the in-memory threshold, and the leaf limit is 10 million. | Open: notes use the OSS-limitations figures and flag this ([13-05](13-backend-architecture/05-limits-usage-and-compute.md#part-3--limits-on-one-page)) |
| RQ-25 | *Workshop: Ontology interfaces* says interface-based object sets can "traverse interface links"; *Interfaces overview* says OSS support for interface link types is "in development". | Open: test before relying on it ([10-03](10-applications/03-workshop-and-slate.md)) |
| RQ-26 | The *Observability* overview says Workflow Lineage shows "seven days of execution history"; *Run history* says "all executions over the past 30 days"; *Action metrics* says run history covers "the past seven days". Which applies? | Open (doc conflict). [14-06](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#sources-disagree) tells readers to plan for seven |
| RQ-27 | *Ontology metrics* defines a write as one edit request "sent to Object Storage v1 (Phonograph)". How are edits on OSv2 types counted? | Open. [14-06](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#reference-card-the-instruments) treats writes as request counts and flags the gap |
| RQ-28 | When a Marketplace product packages an interface (`Case`) but not the object types that implement it, does an installation carry the implementations, or must each environment implement it again? The Marketplace pages say interfaces and their action constraints are packageable, and nothing more. | Open. Marked untested in [14-04](14-lifecycle-and-operations/04-marketplace-packaging.md#outputs-created-by-every-installation) |
| RQ-29 | *Object Explorer search syntax* lists leading wildcards (`*smith`) as global-search-bar syntax, given the render hint. *Understanding text search* says the global bar does **not** support them; only property filters do. | Open (doc conflict). [10-07](10-applications/07-searching-the-ontology.md#sources-disagree) follows the more detailed page |
| RQ-30 | What happens when a scenario's 10-minute auto-rebase meets a conflict (main edits or deletes an object the scenario edited)? | Open. [15-02](15-advanced-patterns/02-scenarios.md#open-questions) |
| RQ-31 | Do an action's side effects (notifications, webhooks) fire when the action runs inside a scenario? The scenario pages don't say. | Open. [15-02](15-advanced-patterns/02-scenarios.md#open-questions): Kestrel keeps side-effect rules off actions planners use in scenarios |

---
[Ontology home](README.md) · [Migration record](MIGRATION.md)
