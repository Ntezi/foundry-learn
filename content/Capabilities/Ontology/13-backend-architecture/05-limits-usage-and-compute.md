# 05 — Limits, usage and compute

*Sources: [Ontology volume](https://www.palantir.com/docs/foundry/ontologies/volume-usage/) · [Ontology indexing compute](https://www.palantir.com/docs/foundry/ontologies/compute-usage/) · [Ontology query compute](https://www.palantir.com/docs/foundry/ontologies/query-compute-usage/) · [OSS limitations](https://www.palantir.com/docs/foundry/ontologies/oss-limitations/) · [Aggregation considerations](https://www.palantir.com/docs/foundry/object-backend/aggregation-considerations/) · [Ontology architecture overview](https://www.palantir.com/docs/foundry/object-backend/overview/) · [Scale and property limits](https://www.palantir.com/docs/foundry/action-types/scale-property-limits/) · checked October 2, 2026 · Ready for Review*

A worksheet in three parts: **what you pay for** (volume and compute), **how to estimate it** (a Kestrel example), and **the limits** collected from across these notes on one page. Prices aren't covered here: compute-seconds turn into money under your contract. **[Docs]** "If you have an enterprise contract with Palantir, contact your Palantir representative before proceeding with compute usage calculations."

## Part 1 — Three meters

| Meter | Unit | Driven by | Doc notes |
|---|---|---|---|
| **Ontology volume** | GB (instant), **GB-month** (averaged hourly over a month) | Objects × properties × property size; **join-table links** | "Can be larger than dataset volume because Ontology data cannot be compressed" and indexes need extra space |
| **Indexing compute** | compute-seconds (Spark) | Records, properties, property size, **and how often you re-index** | Upstream schedules trigger re-indexes; changelog or incremental indexing "can produce orders-of-magnitude" savings |
| **Query compute** | compute-seconds | Number of queries (users **and agents**) × query type × set size | Attributed to the **resource** the query came from, otherwise to the queried **object types** |

**[Docs] The indexing formula** (Spark): `max(vCPU, GiB_RAM / 7.5) × runtime`, summed over the driver and executors. The docs' worked example (1 driver and 2 executors, 10 s each) gives **30 compute-seconds**. Indexing jobs appear in **Builds**. **Ontology export** jobs, which persist edits to datasets, are smaller.

**[Docs] Query compute minimums** (the model effective **January 1, 2026**):

| Query type | Minimum compute-seconds |
|---|---|
| Base query (return, basic filter) | 2 |
| Search Around | 5 |
| Aggregation | 5 |
| Ontology SQL | 5 |
| Advanced (e.g. semantic search over a full set) | 10 |
| Derived property | 10 |
| **Action** | **18**, plus 1 per object edited beyond the first |
| OSv1 query (legacy) | 16 |

These are **minimums**. "Actual compute usage may be higher depending on query complexity and the size of the object set". Function executions add a **4 compute-second** overhead each ([09-03](../09-functions/03-function-lifecycle.md)).

**[Docs] Attribution.** Compute is charged to the **resource** for:

- Workshop, Carbon, Quiver, Vertex, Slate, Machinery, Foundry Rules;
- **Automate**, **AIP Logic**, SQL Console;
- **OSDK applications**.

It is charged to the **object types** queried (split evenly across them) for **Object Explorer** and **Object APIs, including the OSDK** when no resource is involved.

## Part 2 — Estimating Ama's queue

The numbers below are **hypothetical**: Kestrel is a teaching example. They show the method.

| Item | Assumption | Minimum per event | Events per day | Minimum compute-seconds per day |
|---|---|---|---|---|
| Queue refresh | 1 base + 1 Search Around + 1 aggregation | 2 + 5 + 5 = 12 | 40 agents × 30 refreshes = 1,200 | 14,400 |
| Risk column | 1 function call per refresh (on a set, per [09-03](../09-functions/03-function-lifecycle.md#020--make-it-fast)) | 4 + its own queries (≥ 2) = 6 | 1,200 | 7,200 |
| *Hold order* | 1 object edited | 18 | 150 | 2,700 |
| *Cancel order* | Order + 3 lines + 1 shipment + 1 new Refund = 6 objects | 18 + 5 = 23 | 40 | 920 |
| **Total (minimum)** | | | | **≈ 25,000** |

**[Explanation]** What the worksheet shows:

- **Refresh frequency dominates.** Halving the auto-refresh rate saves more than any action redesign.
- **The function-per-row anti-pattern** from 09-01 would multiply the risk row by the number of rows, which would be 400 times larger.
- **Agents count.** The Delivery Desk agent issuing 5 queries per drafted message is a new line in this table ([16](../16-ai-and-agents/03-ontology-tools-for-agents.md)). "Query volume grows linearly with… agentic transformations."

## Part 3 — Limits on one page

Limits from across the notes, with where each was read. **[Docs]** unless stated otherwise. The complete, dated list, including time windows and AI limits, is [99 — Limits and thresholds](../99-reference/limits-and-thresholds.md).

| Area | Limit | Value | Note |
|---|---|---|---|
| Object type | Properties per type | **2,000** | [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) |
| Property | String size | **12 MB** | [02](02-indexing-and-funnel.md) |
| Property | Array elements | **100,000** | [02](02-indexing-and-funnel.md) |
| Property | Vector dimensions | **2,048** | [05-08](../05-properties/08-time-series-media-geo-and-vectors.md) |
| Streaming type | Properties / record size / throughput | **250** / **1 MB** / **~2 MB/s** | [02](02-indexing-and-funnel.md) |
| MDO | Datasources | **70** | [04-02](../04-object-types/02-backing-datasources-and-mapping.md) |
| OSS | In-memory threshold | **100,000** objects | then Spark |
| OSS | Search Around leaf set | **10 million** | **⚠ RQ-24**: the architecture overview says the default Search Around limit is **100,000** and that support can raise it |
| OSS | Total objects loaded per query | **30 million** | |
| OSDK / TSv1 | `.all()` / `.allAsync()` | **100,000** | |
| TSv1 | Search Arounds per search | **3** | [06-03](../06-links/03-traversal-and-search-arounds.md) |
| Action | Objects edited / types edited / edit size | **10,000** / **50** / **3 MB** | [08-04](../08-actions/04-function-backed-actions.md) |
| Action | Batch calls (function-backed without batching) | **10,000** (**20**) | |
| Action | Notification recipients (template / function) | **500** / **50** | [08-05](../08-actions/05-side-effects.md) |
| Function | Elapsed time / TSv1 CPU | **60 s** default / **30 s** | [09-03](../09-functions/03-function-lifecycle.md) |
| Automate | Objects per real-time evaluation | **10,000** | [10-06](../10-applications/06-automate-and-ontology-events.md) |
| Interface | Implementing types (searchable / not) | **75** / **1,000** | [07-01](../07-interfaces/01-interfaces.md) |
| Developer Console | Resources per app | **1,000** | [10-04](../10-applications/04-osdk-and-apis.md) |
| Object Explorer | Selected objects for an action | **1,000** | [10-02](../10-applications/02-object-views-and-object-explorer.md) |

## Aggregations aren't always exact

**[Docs]** With high cardinality, results can be **inexact**. OSS takes `AggregationExecutionMode` (`PREFER_SPEED` or `PREFER_ACCURACY`) and returns `AggregateResultAccuracy`.

| Client | Mode | Effect |
|---|---|---|
| Object Explorer, Workshop | Default **PREFER_SPEED** | Counts shown are made accurate for the buckets shown, but the "top 100" buckets **may not be the real top 100** |
| Quiver and Workshop **pivot tables** | — | Sorting is done in the browser on the returned buckets. Messages such as "Showing approximate results…" |
| **OSDK** | **PREFER_ACCURACY** | Responses are accurate (limited aggregation complexity) |
| **Functions** | **PREFER_ACCURACY** | Bucket values correct. You can't group and order in one call, so sort in memory |

**[Explanation]** For Lena's finance figures, compute "top 10 refund reasons" in a **function** or **pipeline**, not from a pivot table's sort. Treat dashboard rankings as indicative, and totals from functions or OSDK as authoritative.

---
[Module index](README.md) · Previous: [04 — Object Storage v1 vs v2](04-object-storage-v1-vs-v2.md) · Next module: [14 — Lifecycle and operations](../14-lifecycle-and-operations/README.md)
