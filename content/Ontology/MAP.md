# Topic map

Find the right note without reading the whole course. Three indexes: **by concept**, **by task** and **by design question**. Where the canonical note is still planned, the entry points to its module README and to whatever already covers the topic.

Last updated October 2, 2026 (modules 00–10, 12, 13). Rows are added as notes are written.

## By concept

| Concept | Canonical home | Already covered in |
|---|---|---|
| Architecture (Language, Engine, Toolchain; backend services) | [00 — Architecture at a glance](00-orientation/03-architecture-at-a-glance.md) | [13 — Backend services](13-backend-architecture/01-backend-services.md) |
| Action types (anatomy, enabling edits, where edits go) | [08 — Action types](08-actions/01-action-types.md) | [Design 03 — Action Sprawl](11-design/03-anti-patterns.md#action-sprawl) |
| Action rules and parameters (defaults, filters, overrides) | [08 — Rules and parameters](08-actions/02-rules-and-parameters.md) | — |
| Action log, reverts, metrics, monitoring | [08 — Consistency, reverts and logs](08-actions/07-consistency-reverts-and-logs.md) | — |
| Action permissions, read and write authorizations | [08 — Action permissions](08-actions/06-action-permissions.md) | [12 — Security across actions, functions and APIs](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| API names, IDs, RIDs | [03 — Type metadata and statuses](03-ontology-fundamentals/04-type-metadata-and-statuses.md) | [04 — Creating and editing](04-object-types/04-creating-and-editing-object-types.md) |
| Anti-patterns (all eight) | [Design 03 — Anti-patterns](11-design/03-anti-patterns.md) | [Diagnostic table](11-design/03-anti-patterns.md#spot-it-diagnostic-table-our-addition) |
| Backend services (OMS, OSS, Funnel); three request traces | [13 — Backend services](13-backend-architecture/01-backend-services.md) | [00 — Architecture](00-orientation/03-architecture-at-a-glance.md) |
| Access control propagation (mandatory vs read-time controls) | [12 — Security across the stack](12-security-and-governance/04-security-across-actions-functions-and-apis.md) | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md#propagation-where-discretionary-controls-stop) |
| Aggregation accuracy | [13 — Limits, usage and compute](13-backend-architecture/05-limits-usage-and-compute.md#aggregations-arent-always-exact) | — |
| Apps: which one to use | [10 — Choosing an app](10-applications/01-choosing-an-ontology-aware-app.md) | — |
| Automate, Ontology events | [10 — Automate](10-applications/06-automate-and-ontology-events.md) | — |
| Base types (property types) | [05 — Properties and base types](05-properties/01-properties-and-base-types.md) | [04 — Primary keys and titles](04-object-types/03-primary-keys-and-titles.md) |
| Builds, schedules, branching | [02 — Lineage and builds](02-foundry-data-foundations/05-lineage-and-builds.md) | — |
| Change data capture (CDC) | [02 — Virtual tables and streams](02-foundry-data-foundations/03-virtual-tables-and-streams.md#change-data-capture-cdc) | [01 — Operational vs analytical](01-foundations/05-operational-vs-analytical-systems.md) |
| Datasets, transactions, schemas | [02 — Datasets](02-foundry-data-foundations/01-datasets-transactions-and-schemas.md) | — |
| Decision data, decision lineage | [00 — Why an Ontology](00-orientation/02-why-an-ontology.md) | — |
| Derived properties | [05 — Derived properties](05-properties/05-derived-properties.md) | [Design 02 §1](11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) |
| Design principles | [Design 01 — Best practices](11-design/01-best-practices.md#the-four-core-principles-in-priority-order) | [Cheat sheet](11-design/README.md#one-page-cheat-sheet) |
| Edit-only, required, mandatory-control properties | [05 — Edit-only, required and mandatory control](05-properties/06-edit-only-required-and-mandatory-control.md) | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md) |
| Entities, attributes, relationships | [01 — Entities, attributes and relationships](01-foundations/01-entities-attributes-relationships.md) | [Design 01 §1](11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data) |
| Funnel (indexing pipeline) | [00 — Architecture at a glance](00-orientation/03-architecture-at-a-glance.md#how-data-gets-in-the-funnel-pipeline) | [13 — Indexing and the Funnel](13-backend-architecture/02-indexing-and-funnel.md) |
| Formatting (value, conditional), render hints, reducers | [05 — Formatting and reducers](05-properties/07-formatting-and-reducers.md) | [03 — Type metadata](03-ontology-fundamentals/04-type-metadata-and-statuses.md) |
| Functions (languages, imports) | [09 — Functions on objects](09-functions/01-functions-on-objects.md) | — |
| Function-backed actions, batched execution | [08 — Function-backed actions](08-actions/04-function-backed-actions.md) | [09 — Edits](09-functions/02-query-functions-and-ontology-edits.md) |
| Function versioning, permissions, limits, metrics | [09 — Function lifecycle](09-functions/03-function-lifecycle.md) | — |
| Inline edits, sections, file uploads | [08 — Using actions in the platform](08-actions/08-using-actions-in-the-platform.md) | — |
| Isolation levels, conflicts, write skew | [08 — Consistency, reverts and logs](08-actions/07-consistency-reverts-and-logs.md) | — |
| Geospatial, media, time series, vector properties | [05 — Special property kinds](05-properties/08-time-series-media-geo-and-vectors.md) | — |
| Interfaces | [07 — Interfaces](07-interfaces/01-interfaces.md) · [implementing](07-interfaces/02-implementing-and-extending-interfaces.md) · [links and action constraints](07-interfaces/03-interface-links-and-action-constraints.md) | [Design 01 §4](11-design/01-best-practices.md#4-composition-over-deep-hierarchies) · [Design 02 §3](11-design/02-structural-guidance.md#3-interfaces-reusable-future-proof-abstractions) · [God Object](11-design/03-anti-patterns.md#the-god-object) |
| Kestrel Commerce (running example) | [00 — The running example](00-orientation/04-running-example.md) | — |
| Link types, cardinality, storage | [06 — Link types and cardinality](06-links/01-link-types-and-cardinality.md) | — |
| Many-to-many, join tables, object-backed links | [06 — Many-to-many and object-backed links](06-links/02-many-to-many-and-object-backed-links.md) | [Design 02 §4](11-design/02-structural-guidance.md#4-links-and-object-backed-link-types-relationships-with-meaning) |
| Models and LLMs in functions | [09 — Functions on models and LLMs](09-functions/04-functions-on-models-and-llms.md) | [15-03 — Models in the Ontology](15-advanced-patterns/03-models-in-the-ontology.md), [16-03 — Ontology tools for agents](16-ai-and-agents/03-ontology-tools-for-agents.md) |
| Markings, mandatory vs discretionary controls | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md) | [12 — Security across the stack](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| Materializations, edit history | [13 — Edits and materializations](13-backend-architecture/03-edits-and-materializations.md) | [08 — Action types](08-actions/01-action-types.md#where-the-edit-goes) |
| Object and property security policies, restricted views | [12 — Object and property security](12-security-and-governance/03-object-and-property-security.md) | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md) |
| Object Views, Object Explorer | [10 — Object Views and Object Explorer](10-applications/02-object-views-and-object-explorer.md) | — |
| OSv1 vs OSv2, migration | [13 — Object Storage v1 vs v2](13-backend-architecture/04-object-storage-v1-vs-v2.md) | — |
| Multi-datasource object types (MDOs) | [04 — Backing datasources](04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos) | [05 — Required properties](05-properties/06-edit-only-required-and-mandatory-control.md) |
| Naming | [04 — Object types](04-object-types/README.md) | [Design 02 §5](11-design/02-structural-guidance.md#5-naming-conventions-readable-by-humans-navigable-by-agents) · [The Misnomer](11-design/03-anti-patterns.md#the-misnomer) |
| Operational vs analytical, writeback | [01 — Operational vs analytical](01-foundations/05-operational-vs-analytical-systems.md) | [00 — Why an Ontology](00-orientation/02-why-an-ontology.md) |
| Normalization | [01 — Foundations](01-foundations/README.md) | [Design 02 §1](11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) |
| Object, object set, type vs instance | [03 — Objects and object sets](03-ontology-fundamentals/03-objects-and-object-sets.md) | [00 — Architecture: object sets](00-orientation/03-architecture-at-a-glance.md#object-sets-four-flavours) |
| Object types | [04 — Object types](04-object-types/01-object-types.md) | [Design 01 §1](11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data) |
| Ontologies as resources (spaces, shared) | [03 — Ontologies as resources](03-ontology-fundamentals/01-ontologies-as-resources.md) | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md) |
| Ontology Manager | [03 — Ontology Manager tour](03-ontology-fundamentals/02-ontology-manager.md) | — |
| Organizations, spaces, projects, roles | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md) | — |
| Pipelines, project stages | [02 — Pipelines that feed the Ontology](02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md) | — |
| OSDK, Developer Console, tokens, subscriptions | [10 — OSDK and APIs](10-applications/04-osdk-and-apis.md) | [12 — Security across the stack](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| Primary keys, title keys, identity | [01 — Keys and identity](01-foundations/02-keys-and-identity.md) | [04 — Primary keys and titles](04-object-types/03-primary-keys-and-titles.md) |
| Permissions: two layers, resource permissions | [12 — Two-layer model](12-security-and-governance/01-two-layer-permission-model.md) · [12 — Resource permissions](12-security-and-governance/02-ontology-resource-permissions.md) | [Design 02 §6](11-design/02-structural-guidance.md#6-security-design-semantic-and-least-privilege) |
| Schema changes and migrations | [04 — Creating and editing (Part B)](04-object-types/04-creating-and-editing-object-types.md#part-b--change-it-safely) | [14 — Consumer impact matrix](14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md#part-1--who-breaks-when-the-schema-changes) |
| Search Around, OSS limits | [03 — Objects and object sets](03-ontology-fundamentals/03-objects-and-object-sets.md#how-a-query-runs) | [06 — Traversal and Search Arounds](06-links/03-traversal-and-search-arounds.md) |
| Side effects: notifications, webhooks, schedule builds | [08 — Side effects](08-actions/05-side-effects.md) | — |
| Submission criteria, test runs | [08 — Submission criteria](08-actions/03-submission-criteria.md) | — |
| Query functions, Ontology edits, staged writes | [09 — Query functions and edits](09-functions/02-query-functions-and-ontology-edits.md) | — |
| User edits vs source updates (conflict strategies), materializations | [08 — Action types](08-actions/01-action-types.md#when-the-source-and-an-edit-disagree) | — |
| Shared properties | [05 — Shared properties](05-properties/04-shared-properties.md) | — |
| Statuses (experimental, active, deprecated, promoted) | [03 — Type metadata and statuses](03-ontology-fundamentals/04-type-metadata-and-statuses.md#statuses) | — |
| Semantic layers, DDD, knowledge graphs | [01 — Semantic layers and domain models](01-foundations/04-semantic-layers-and-domain-models.md) | — |
| Shared ontologies, cross-organization work | [12 — Shared ontologies](12-security-and-governance/05-shared-ontologies-and-cross-org.md) | [03 — Ontologies as resources](03-ontology-fundamentals/01-ontologies-as-resources.md) |
| Specialized apps (Quiver, Map, Vertex, Machinery, Rules, Scheduling) | [10 — Specialized apps](10-applications/05-specialized-apps.md) | — |
| Change management (save, review, conflicts, restore) | [14 — Change policy](14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) | — |
| Global Branching, proposals, approval policies | [14 — Branching and proposals](14-lifecycle-and-operations/02-branching-and-proposals.md) | [02 — Lineage and builds](02-foundry-data-foundations/05-lineage-and-builds.md) |
| Marketplace products and installations | [14 — Packaging with Marketplace](14-lifecycle-and-operations/04-marketplace-packaging.md) | [05 — Migration routes](14-lifecycle-and-operations/05-migration-and-export-import.md#the-four-routes) |
| Ontology metrics, observability, cleanup | [14 — Monitoring and cleanup](14-lifecycle-and-operations/06-monitoring-and-cleanup.md) | [13 — Indexing monitoring](13-backend-architecture/02-indexing-and-funnel.md#part-2--my-objects-are-wrong-or-missing) |
| Usage and compute (volume, indexing, queries) | [13 — Limits, usage and compute](13-backend-architecture/05-limits-usage-and-compute.md) | — |
| Workshop and Slate | [10 — Workshop and Slate](10-applications/03-workshop-and-slate.md) | — |
| Keyword search, analyzers, search syntax | [10 — Searching the Ontology](10-applications/07-searching-the-ontology.md) | [05 — Formatting and render hints](05-properties/07-formatting-and-reducers.md) |
| Writing, deploying and releasing functions | [09 — Writing functions in practice](09-functions/05-writing-functions-in-practice.md) | [09 — Function lifecycle](09-functions/03-function-lifecycle.md) |
| Semantic search, embeddings, chunking | [16 — Semantic search and embeddings](16-ai-and-agents/02-semantic-search-and-embeddings.md) | [05 — Vector properties](05-properties/08-time-series-media-geo-and-vectors.md) |
| AI context, OAG, citations | [16 — The Ontology as AI context](16-ai-and-agents/01-ontology-as-ai-context.md) | [12 — Security across actions, functions and APIs](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| Agent tools, MCP | [16 — Ontology tools for agents](16-ai-and-agents/03-ontology-tools-for-agents.md) | [AIP 05 — Chatbot Studio](../AIP/05-chatbot-studio/README.md) |
| Scenarios (what-if sandboxes) | [15 — Scenarios](15-advanced-patterns/02-scenarios.md) | — |
| Models and predictions in the Ontology | [15 — Models in the Ontology](15-advanced-patterns/03-models-in-the-ontology.md) | [09 — Functions on models](09-functions/04-functions-on-models-and-llms.md) |
| Entity resolution, master data | [15 — Entity resolution](15-advanced-patterns/04-entity-resolution-across-sources.md) | [01 — Keys and identity](01-foundations/02-keys-and-identity.md) |
| Streams, direct datasources | [02 — Virtual tables and streams](02-foundry-data-foundations/03-virtual-tables-and-streams.md) | — |
| Structs | [05 — Structs](05-properties/03-structs.md) | [Design 02 §2](11-design/02-structural-guidance.md#2-structs-group-fields-that-belong-together) |
| Time and history | [15 — Events, history and time](15-advanced-patterns/01-events-history-and-time.md) | [The Time Machine](11-design/03-anti-patterns.md#the-time-machine) |
| Value types | [05 — Value types](05-properties/02-value-types.md) | — |
| Virtual tables | [02 — Virtual tables and streams](02-foundry-data-foundations/03-virtual-tables-and-streams.md#virtual-tables) | — |
| Validation (people and agents) | [Design 04 — Validation](11-design/04-validation.md) | [Practice 02 — Drill kit](18-practice/02-validation-drill-kit.md) |

## By task: "I need to…"

| I need to… | Go to |
|---|---|
| look up a documented limit or time window | [Limits and thresholds](99-reference/limits-and-thresholds.md) |
| diagnose a symptom quickly | [Troubleshooting](99-reference/troubleshooting.md) |
| see the whole Kestrel model in one place | [17-02 Reference model](17-case-studies/02-kestrel-reference-model.md) |
| find which note covers an official docs page | [Docs index](99-reference/docs-index.md) |
| decide whether a value is computed in the pipeline or as a derived property | [Design 02 §1 decision tree](11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) |
| choose between an action, function, automation or pipeline | [Decision guide §4](99-reference/decision-guide.md#4-which-mechanism-changes-the-data) · [Golden Hammer](11-design/03-anti-patterns.md#the-golden-hammer) |
| review someone's Ontology design | [Design 01 checklist](11-design/01-best-practices.md#review-checklist) · [Design 02 checklist](11-design/02-structural-guidance.md#review-checklist) · [Case study 01](17-case-studies/01-course-ontologies-reviewed.md) |
| spot what's wrong with an existing model | [Anti-pattern diagnostic table](11-design/03-anti-patterns.md#spot-it-diagnostic-table-our-addition) |
| prove a model works for users and agents | [Design 04](11-design/04-validation.md) · [Drill kit](18-practice/02-validation-drill-kit.md) |
| extend a core type without breaking consumers | [Design 01 §3](11-design/01-best-practices.md#3-open-for-extension-closed-for-modification) · [Exercise E](18-practice/01-design-exercises.md#e-extend-without-modifying-openclosed) |
| turn a flat dataset into a domain model | [Design 01 §1](11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data) · [Exercise A](18-practice/01-design-exercises.md#a-find-the-entities-domain-driven-design) |
| create an object type, link or action in Foundry | [04 — Lab](04-object-types/04-creating-and-editing-object-types.md) · [06 — Link types](06-links/01-link-types-and-cardinality.md) · [08 — Action types](08-actions/01-action-types.md#the-smallest-working-example) · [08 — Build log](08-actions/02-rules-and-parameters.md) |
| model a relationship that has its own attributes | [06 — Many-to-many and object-backed links](06-links/02-many-to-many-and-object-backed-links.md) |
| write a link traversal that doesn't time out | [06 — Traversal](06-links/03-traversal-and-search-arounds.md) · [09 — Lifecycle 0.2.0](09-functions/03-function-lifecycle.md#020--make-it-fast) |
| let several object types share one workflow | [07 — Interfaces](07-interfaces/01-interfaces.md) · [07 — Implementing](07-interfaces/02-implementing-and-extending-interfaces.md) |
| encode a business policy as who-can-do-what | [08 — Submission criteria](08-actions/03-submission-criteria.md) |
| write back to an external system when a user acts | [08 — Side effects](08-actions/05-side-effects.md#writeback-webhook-vs-side-effect-webhook) |
| stop two users doing the same thing at once | [08 — Incident 1](08-actions/07-consistency-reverts-and-logs.md#incident-1--two-refunds-for-one-order) |
| keep an audit trail of decisions | [08 — Incident 4](08-actions/07-consistency-reverts-and-logs.md#incident-4--who-changed-this-and-why) |
| choose a function language | [09 — Choosing a language](09-functions/01-functions-on-objects.md#choosing-a-language) |
| release a function without breaking its consumers | [09 — Function lifecycle](09-functions/03-function-lifecycle.md) |
| call a model or LLM from the Ontology | [09 — Functions on models and LLMs](09-functions/04-functions-on-models-and-llms.md) |
| choose a primary key that survives rebuilds | [01 — Keys and identity](01-foundations/02-keys-and-identity.md#kestrel-priya-picks-keys) |
| prepare a dataset to back an object type | [02 — Pipelines: checks](02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md#kestrel-working-backwards-from-the-object-types) · [02 — Datasets: what the Ontology needs](02-foundry-data-foundations/01-datasets-transactions-and-schemas.md#what-the-ontology-needs-from-a-dataset) |
| decide between a dataset, a stream and a virtual table | [02 — Virtual tables and streams](02-foundry-data-foundations/03-virtual-tables-and-streams.md#choosing-between-them) |
| find out why objects aren't updating | [02 — Lineage and builds](02-foundry-data-foundations/05-lineage-and-builds.md#lineage-and-the-ontology) · [00 — Architecture](00-orientation/03-architecture-at-a-glance.md#how-data-gets-in-the-funnel-pipeline) |
| trace a property back to its source | [02 — Lineage and builds: worked example](02-foundry-data-foundations/05-lineage-and-builds.md#kestrel-a-wrong-delivery-date) |
| decide where to save an object type and who can see its objects | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md#what-this-means-for-the-ontology) |
| change a live object type without losing edits | [04 — Creating and editing, Part B](04-object-types/04-creating-and-editing-object-types.md#part-b--change-it-safely) |
| make a query or app scale | [03 — Writing queries that scale](03-ontology-fundamentals/03-objects-and-object-sets.md#writing-queries-that-scale) |
| validate values (enums, formats) in one place | [05 — Value types](05-properties/02-value-types.md) |
| hide some columns of an object from some users | [05 — Mandatory control](05-properties/06-edit-only-required-and-mandatory-control.md#mandatory-control-rows-that-carry-their-own-markings) · [04 — MDOs](04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos) |
| restrict who sees certain rows or columns | [12 — Object and property security](12-security-and-governance/03-object-and-property-security.md) · [Design 02 §6](11-design/02-structural-guidance.md#6-security-design-semantic-and-least-privilege) |
| pick the right app for a request | [10 — Choosing an app](10-applications/01-choosing-an-ontology-aware-app.md#sorting-kestrels-backlog) |
| build an app for people outside Foundry | [10 — OSDK design review](10-applications/04-osdk-and-apis.md) |
| trigger something automatically when objects change | [10 — Automate spec sheet](10-applications/06-automate-and-ontology-events.md) |
| explain why someone can't see an object | [12 — Five questions](12-security-and-governance/01-two-layer-permission-model.md#when-an-object-doesnt-show-up) |
| migrate to project-based permissions | [12 — Migration runbook](12-security-and-governance/02-ontology-resource-permissions.md#migration-runbook) |
| work with another company on shared objects | [12 — Shared ontologies decision log](12-security-and-governance/05-shared-ontologies-and-cross-org.md) |
| debug objects that are missing or stale | [13 — Troubleshooting table](13-backend-architecture/02-indexing-and-funnel.md#part-2--my-objects-are-wrong-or-missing) |
| estimate the compute cost of an app | [13 — Worksheet](13-backend-architecture/05-limits-usage-and-compute.md#part-2--estimating-amas-queue) |
| make a breaking schema change without breaking consumers | [14 — Deprecation playbook](14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md#part-2--a-deprecation-playbook-worked-once) |
| work on a branch and get it reviewed | [14 — Branch diary](14-lifecycle-and-operations/02-branching-and-proposals.md) |
| move types to another ontology or promote dev → prod | [14 — The four routes](14-lifecycle-and-operations/05-migration-and-export-import.md#the-four-routes) |
| find out who uses an object type before changing it | [14 — Before any breaking change](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#before-any-breaking-change) |
| clean up unused or test object types | [14 — Monthly cleanup](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#every-month-cleanup-session-about-an-hour) |
| debug a failing action, function or automation | [14 — Triage path](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#when-something-fails-the-triage-path) |
| find out why a search doesn't match | [10 — The search lab](10-applications/07-searching-the-ontology.md#the-lab) |
| link to an object or exploration from another system | [10 — Stop 6: URLs](10-applications/02-object-views-and-object-explorer.md#stop-6--linking-in-from-elsewhere) |
| call an external API from a function | [09 — Calling outside the function](09-functions/05-writing-functions-in-practice.md#4-calling-outside-the-function) |
| let an agent read or edit objects safely | [16 — Tool sheet](16-ai-and-agents/03-ontology-tools-for-agents.md) · [16 — Control ladder](16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) · [AIP area](../AIP/README.md) |
| test a plan before changing live data | [15 — Scenarios](15-advanced-patterns/02-scenarios.md) |
| merge customers from several systems | [15 — Entity resolution](15-advanced-patterns/04-entity-resolution-across-sources.md) |
| make an object type understandable to an agent | [16 — Checklist](16-ai-and-agents/05-designing-the-ontology-for-agents.md#the-checklist) |

## By design question

| Question | Short answer | Where |
|---|---|---|
| Is this value a snapshot fact or a copy? | If the source changes, should this record change? No → snapshot; yes → derive through a link | [01 — Normalization](01-foundations/03-normalization-and-denormalization.md#snapshot-facts-are-not-copies) |
| Who owns this property: the source system or the Ontology? | Decide per property; document writeback | [01 — Operational vs analytical](01-foundations/05-operational-vs-analytical-systems.md#a-read-model-with-a-governed-write-path) |
| Marking or restricted view? | Must stay protected downstream → marking; read-time filter only → restricted view or policy; both → both | [02 — Projects, spaces and markings](02-foundry-data-foundations/04-projects-spaces-and-markings.md#propagation-where-discretionary-controls-stop) |
| MDO or a separate linked type? | One real-world thing split across sources → MDO; things users think of separately, or with their own lifecycle → linked type | [04 — Backing datasources](04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos) |
| Struct, separate properties or linked object? | One value that changes together → struct; filtered field by field → properties; own identity → object | [05 — Structs](05-properties/03-structs.md#struct-separate-properties-or-linked-object) |
| Is this one entity or two? | Separate identity from observation; one row can describe several entities | [Design 01 §1](11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data) |
| One type with a property, or several types with an interface? | Same real-world key → one type; different entities sharing behaviour → interface | [Design 01 §2](11-design/01-best-practices.md#2-do-not-repeat-yourself-the-rule-of-three) |
| Property or link? | If the value is itself an entity people search or reason about, link to it | [Design 01 §1](11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data) · [Case study 01](17-case-studies/01-course-ontologies-reviewed.md) |
| Plain link or object-backed link? | If the relationship has its own attributes, back it with an object | [Design 02 §4](11-design/02-structural-guidance.md#4-links-and-object-backed-link-types-relationships-with-meaning) |
| Flat properties or a struct? | Fields that belong together → struct | [Design 02 §2](11-design/02-structural-guidance.md#2-structs-group-fields-that-belong-together) |
| Object security policy or restricted view? | Policy by default; restricted view only when the raw dataset needs row security outside the Ontology | [12 — Two families](12-security-and-governance/03-object-and-property-security.md#two-families-of-mechanism) |
| Is a policy enough to protect PII downstream? | No: policies filter reads only; keep a marking for propagation | [12 — Following one value](12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| Batch, stream or direct datasource? | Batch by default; stream for read-only seconds-fresh data; direct for fresh data with edits (beta) | [13 — Which path?](13-backend-architecture/02-indexing-and-funnel.md#which-path) |
| Workshop, Slate or an OSDK app? | Workshop unless you need custom look, public access or non-Ontology data | [10 — Workshop and Slate](10-applications/03-workshop-and-slate.md#choosing-between-them) |
| New version of an object, or history? | One object plus linked history or a time series | [The Time Machine](11-design/03-anti-patterns.md#the-time-machine) |
| Many small actions or one? | One action per business operation; use overrides for variants | [Action Sprawl](11-design/03-anti-patterns.md#action-sprawl) · [08 — Overrides](08-actions/02-rules-and-parameters.md#step-4--make-the-note-required-sometimes) |
| Join-table link or an object in the middle? | Attributes, lifecycle or own permissions → object (optionally object-backed link) | [06 — What Kestrel chose](06-links/02-many-to-many-and-object-backed-links.md#what-kestrel-chose) |
| Interface or shared property? | Consumers treat types as interchangeable → interface; consistent names only → shared property | [07 — Interfaces](07-interfaces/01-interfaces.md#three-ways-to-model-a-case-compared) |
| Rules or a function-backed action? | Linked objects, multi-object calculations, several types created → function | [08 — Function-backed actions](08-actions/04-function-backed-actions.md) |
| Writeback or side-effect webhook? | Foundry mustn't change before the external system → writeback; best effort → side effect | [08 — Side effects](08-actions/05-side-effects.md) |
| Pin a function version or use a range? | Can't tolerate breaks or security-sensitive action → pin | [09 — Lifecycle 1.0.0](09-functions/03-function-lifecycle.md#100--stable) · [08-04](08-actions/04-function-backed-actions.md) |
| Hard delete or soft delete? | Destructive actions: prefer a status change; reverts are one-shot | [08 — Incident 3](08-actions/07-consistency-reverts-and-logs.md#incident-3--undo-after-lunch) |
| Save directly or use a branch? | Cosmetic → save; additive on active resources or breaking → branch with review | [14 — Three tiers](14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md#1-three-tiers-of-change) |
| Migrate, export/import JSON or Marketplace? | Wrong ontology → migrate; dev → prod → Marketplace; bulk metadata edits → JSON | [14 — The four routes](14-lifecycle-and-operations/05-migration-and-export-import.md#the-four-routes) |
| Delete or deprecate an unused type? | Zero usage and no user edits → delete; otherwise deprecate with a deadline | [14 — Monthly cleanup](14-lifecycle-and-operations/06-monitoring-and-cleanup.md#every-month-cleanup-session-about-an-hour) |
| Which analyzer for a string property? | Prose → language; names → standard; codes and IDs looked up whole → not analyzed | [10 — What Kestrel changed](10-applications/07-searching-the-ontology.md#the-lab) |
| Serverless or deployed function? | Serverless, unless you need third-party clients, GPUs or local caching | [09 — Where it runs](09-functions/05-writing-functions-in-practice.md#5-where-it-runs) |
| Events, edit history, time series or process log? | Let the question decide: acted-on changes → events; who edited → edit history; measurements → time series; durations → process log | [15 — Five questions](15-advanced-patterns/01-events-history-and-time.md#five-questions-five-structures) |
| Model output as a property or a function? | Filter and sort across many → batch property with provenance; must be minutes-fresh → live function; often both | [15 — ADR-007](15-advanced-patterns/03-models-in-the-ontology.md) |
| How much can an agent do on its own? | Climb the control ladder one rung at a time, after evals | [16 — Control ladder](16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#the-control-ladder) |

---
[Ontology home](README.md) · [Glossary](GLOSSARY.md) · [Reference](99-reference/README.md)
