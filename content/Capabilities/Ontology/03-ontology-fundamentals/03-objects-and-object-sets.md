# 03 — Objects and object sets

*Sources: [Ontology architecture overview](https://www.palantir.com/docs/foundry/object-backend/overview/) · [Object Set Service limitations](https://www.palantir.com/docs/foundry/ontologies/oss-limitations/) · [Types reference](https://www.palantir.com/docs/foundry/object-link-types/type-reference/) · [Object types overview](https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/) · checked October 2, 2026 · Ready for Review*

Apps and agents rarely ask for one object. They ask for *sets* — "open orders in Ghana", "shipments on those orders". This note explains what an object set is, and what actually happens when you query one, because the answer explains most Ontology performance limits.

## Definitions versus data

**[Docs]** The docs draw a firm line between two things:

- **Object type definitions** (metadata): display name, property names and types, description.
- **Object instances** (Ontology data): the actual primary key and property values.

The same split applies to link types and links. It matters for security as well: being able to see a definition doesn't mean you can see any instances (see [02 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#what-this-means-for-the-ontology)).

## Object sets

**[Docs]** An object set is a collection of objects. Saved object sets are resources you can share. They come in two pairs:

- **By definition**
  - **Static:** a saved list of primary keys. It never changes when data changes.
  - **Dynamic:** the saved *filters*. New objects that match join the set automatically.
- **By lifetime**
  - **Temporary:** passed between applications and services; only the creator can open it, and it expires within 24 hours.
  - **Permanent:** stored for reuse across the platform.

**[Example]** For Kestrel:

- Ama's list "the 37 orders I called today" is **static**. It should not grow.
- Kofi's "shipments from Accra that are late" is **dynamic**. Tomorrow it should contain tomorrow's late shipments.

## How a query runs

**[Docs]** The **Object Set Service (OSS)** serves every read: search, filter, aggregate, load. It picks one of three execution strategies automatically, sometimes several within one query:

| Strategy | Used for | Speed and cost |
|---|---|---|
| **Pushdown to storage** | Simple filters and aggregations answered from indexes | Fastest, lowest cost |
| **In-memory** | Most Search Arounds and moderate queries, up to about 100,000 objects | Fast, moderate cost |
| **Spark** | Larger sets, and some features regardless of size: derived properties, intermediary link types, interface Search Arounds | Slower, more compute-seconds |

**[Docs]** The default thresholds on OSv2:

- **100,000 objects:** switch from in-memory to Spark for Search Arounds and derived properties.
- **25 pages:** if loading data from OSv2 needs more than this, OSS falls back to Spark.
- **10 million objects:** maximum result of one Search Around (the "leaf" set from one datasource).
- **30 million objects:** maximum total loaded across all datasets in one query.
- **100,000 objects:** maximum for `.all()` / `.allAsync()` in the OSDK. The `getAllObjects` endpoints can load more.
- **More than 10,000 objects** loaded in a Functions-on-Objects call may time out, depending on the logic.

OSS also *estimates* sizes. A query estimated at more than twice a limit may fail before reaching the exact threshold.

**[Docs]** A **Search Around** (following a link from one set to another) is a left-semi join. It returns the distinct linked objects without duplicating the starting set, and the 10 million limit applies to that result.

**[Docs] Paging:** a page can come back shorter than requested because of memory limits. Keep requesting until the page token is empty. The older `loadObjects` endpoint is deprecated; it fails with `ObjectSet:ResultSizeLimitExceeded` rather than returning part of the result.

## Writing queries that scale

These come from the OSS page's best practices, with Kestrel examples added.

1. **Filter before you traverse.** "Late shipments in Accra → their orders" beats "all orders → their shipments → filter late".
2. **Keep filters index-friendly.** A range filter on `orderDate` uses the index. Extracting the month and year from the date forces every row to be evaluated. The same goes for filtering or sorting on derived properties and computed SQL columns.
3. **Count first.** Aggregate to see a set's size before running an expensive Search Around.
4. **Page in functions.** Process large sets in batches rather than loading everything.
5. **Let the model help.** If you keep hitting limits, the docs suggest reshaping the Ontology: more targeted object types or links, or deliberately denormalizing a value onto the object. That is the documented-denormalization trade-off in [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once).

**[Example]** Daniel's first version of the Delivery Desk view loaded every open `Order` (about 60,000), then searched around to `Shipment` to find late ones. It worked in testing and slowed down in production.

The fix reversed the direction: start from the dynamic set of late shipments (a few hundred), then search around to their orders. The query stays in-memory, and the result is far smaller.

## Why this matters for AI

**[Explanation]** An agent's object-query tool runs on the same OSS. An agent that "loads all customers to find the right one" hits the same 100,000-object ceilings as a function. Good tool design gives the agent filters and aggregations, not bulk loads. See [16 — Ontology tools for agents](../16-ai-and-agents/03-ontology-tools-for-agents.md).

## Caveats

- **[Docs]** OSv1 had stricter limits: 100,000 objects for loads and for Search Around results, with no Spark fallback. The OSS page repeats that OSv1 is unavailable after June 30, 2026 ([RQ-05](../SOURCES.md#open-research-questions)).
- Compute costs of Spark-backed queries are covered in [13 — Limits, usage and compute](../13-backend-architecture/05-limits-usage-and-compute.md).

---
[Module index](README.md) · Previous: [02 — Ontology Manager](02-ontology-manager.md) · Next: [04 — Type metadata and statuses](04-type-metadata-and-statuses.md)
