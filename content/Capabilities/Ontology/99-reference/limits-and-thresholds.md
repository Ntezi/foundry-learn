# Limits and thresholds

*Sources: the official pages cited by each linked note · values as read between October 2 and 3, 2026 · Ready for Review*

Every documented number in the notes, in one place. Each row links to the note that quotes it; that note links the official page. **Numbers change**: re-check the page before relying on one in a design review, and log any change in [SOURCES](../SOURCES.md#corrections-log). Rows marked ⚠ are where the docs disagree with themselves.

## Size and scale

| Area | Limit | Value | Note |
|---|---|---|---|
| Object type | Properties per type | **2,000** | [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) |
| Property | String size (use a media reference above it) | **12 MB** | [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| Property | Array elements (use links above it) | **100,000** | [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| Property | Vector dimensions | **2,048** | [05-08](../05-properties/08-time-series-media-geo-and-vectors.md) |
| Streaming type | Properties / record size / throughput | **250** / **1 MB** / **~2 MB/s** | [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| MDO | Datasources per type | **70** | [04-02](../04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos) |
| OSS | In-memory execution, then Spark | **100,000** objects | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md#part-3--limits-on-one-page) |
| OSS | Search Around leaf set | **10 million** ⚠ RQ-24 (100,000 default per the architecture overview) | [06-03](../06-links/03-traversal-and-search-arounds.md) |
| OSS | Total objects loaded per query | **30 million** | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md#part-3--limits-on-one-page) |
| OSDK / TSv1 | `.all()` / `.allAsync()` | **100,000** | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md#part-3--limits-on-one-page) |
| TSv1 | Search Arounds per search | **3** | [06-03](../06-links/03-traversal-and-search-arounds.md) |
| Interface | Implementing types: searchable / not | **75** / **1,000** | [07-01](../07-interfaces/01-interfaces.md) |
| Action | Objects edited / types edited / edit size | **10,000** / **50** / **3 MB** | [08-04](../08-actions/04-function-backed-actions.md) |
| Action | Batch calls (function-backed without batching) | **10,000** (**20**) | [08-04](../08-actions/04-function-backed-actions.md) |
| Action | Automatic retries on transient errors (no external calls) | **5** attempts | [08-07](../08-actions/07-consistency-reverts-and-logs.md) |
| Action | Notification recipients: template / function | **500** / **50** | [08-05](../08-actions/05-side-effects.md) |
| Object Explorer | Objects selected for an action | **1,000** | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-3--acting-on-a-set) |
| Object Explorer | Object types covered by global keyword search | first **250** | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-2--the-question-that-isnt-about-one-order) |
| Object Explorer | Undo / redo depth | **5** states | [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| Object Explorer | SQL scratchpad rows (beta) | **1,000** | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-4--priya-checks-the-numbers-in-sql-beta) |
| Object Views | Object set panel defaults | **5** XY charts; **3** properties per list item | [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| URLs | Link filters in a generated search URL | **1** | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-6--linking-in-from-elsewhere) |
| Developer Console | Resources per application | **1,000** | [10-04](../10-applications/04-osdk-and-apis.md) |
| Automate | Objects per real-time evaluation | **10,000** | [10-06](../10-applications/06-automate-and-ontology-events.md) |
| Automate | Scheduled added/removed inputs / *run on all objects* / manual runs | **100,000** / **1,000,000** / **5,000,000** objects | [10-06](../10-applications/06-automate-and-ontology-events.md#what-can-go-wrong) |
| Automate | Recipients / batch size | **10,000** / **1,000** | [10-06](../10-applications/06-automate-and-ontology-events.md#what-can-go-wrong) |
| Machinery | Log objects before conformance filtering switches off | **1M** | [10-05](../10-applications/05-specialized-apps.md) |
| Marketplace | Inputs + outputs per product (warning at 75%) | **15,000** | [14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md#size-and-permissions) |
| Schema | Migrations applied at once (batch above it) | **500** | [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md#changes-this-playbook-cant-soften) |

## Functions

| Limit | Value | Note |
|---|---|---|
| Elapsed time (default) / TSv1 CPU | **60 s** / **30 s** | [09-03](../09-functions/03-function-lifecycle.md) |
| Memory: TSv1 / serverless TSv2 and Python (default, range) / deployed Python | **128 MB** / **1,024 MiB** (512–5,120) / **2 GB** | [09-03](../09-functions/03-function-lifecycle.md) |
| Attachments and media in TSv1 | under **20 MB** | [09-05](../09-functions/05-writing-functions-in-practice.md#9-files-and-media) |
| Functions as Automate effects | up to **4 hours**, asynchronous | [09-05](../09-functions/05-writing-functions-in-practice.md#5-where-it-runs) |
| Extended-execution token lifetime | up to **4 hours** | [09-05](../09-functions/05-writing-functions-in-practice.md#4-calling-outside-the-function) |
| TSv1 aggregation buckets: `.topValues()` / `.exactValues()` | **1,000** / **10,000** | [09-05](../09-functions/05-writing-functions-in-practice.md#6-where-its-used) |

## Search and AI

| Limit | Value | Note |
|---|---|---|
| KNN object set in Workshop | K from **1 to 100**; no relevance sort | [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md#5-retrieve) |
| KNN in TSv1 / TSv2 | K ≤ **100** / **1–500** | [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md#5-retrieve) |
| Most non-Ada embedding models | about **512** tokens | [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md#3-embed-it) |
| Automate proposals (Logic) | visible **24 hours**, to the automation's creator only | [16-04](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#proposals-from-automations) |

## Time windows and retention

| What | Value | Note |
|---|---|---|
| Ontology metrics (usage) window | **30 days** | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#reference-card-the-instruments) |
| Ontology metrics toggle takes effect | up to **60 minutes** | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| Action, function and Logic metrics | **30 days**, near real-time | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| Run history | **30 days** or **7 days** ⚠ RQ-26 | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#sources-disagree) |
| Automate event: wait in queue / run time | at most **45 minutes** / **4 hours** | [10-06](../10-applications/06-automate-and-ontology-events.md#what-can-go-wrong) |
| Own execution logs without project log access | **24 hours** | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| Global branch goes inactive | **35 days** idle; data deleted **7 days** later | [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md#after--the-branchs-life-cycle) |
| Scenario lifespan / auto-rebase | **30 days** / every **10 minutes** | [15-02](../15-advanced-patterns/02-scenarios.md#what-a-scenario-is-not) |
| SQL scratchpad edit lag | up to **30 seconds** | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-4--priya-checks-the-numbers-in-sql-beta) |
| Direct model deployment: add a replica / scale down | at **75%** capacity / after **30 minutes** idle | [15-03](../15-advanced-patterns/03-models-in-the-ontology.md) |
| Object Storage v1 | unavailable after **June 30, 2026** | [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) |

## Compute

| What | Value | Note |
|---|---|---|
| Indexing compute (Spark) | `max(vCPU, GiB_RAM / 7.5) × runtime`, summed over driver and executors | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| Query compute minimums | model effective **January 1, 2026** | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |

---
[Reference index](README.md) · Previous: [Docs index](docs-index.md) · Next: [Troubleshooting](troubleshooting.md) · [Ontology home](../README.md)
