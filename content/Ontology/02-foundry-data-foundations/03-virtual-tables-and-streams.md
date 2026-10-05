# 03 — Virtual tables and streams

*Sources: [Streams](https://www.palantir.com/docs/foundry/data-integration/streams/) · [Virtual tables](https://www.palantir.com/docs/foundry/data-integration/virtual-tables/) · [Funnel streaming pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-streaming-pipelines/) · [Direct datasources](https://www.palantir.com/docs/foundry/object-indexing/direct-datasources/) · [Change data capture](https://www.palantir.com/docs/foundry/data-integration/change-data-capture/) · checked October 2, 2026 · Ready for Review*

## The options at a glance
- **[Docs]** Datasets aren't the only thing that can back objects:

  | Backing source | What it is | Ontology latency |
  |---|---|---|
  | **Dataset** | Versioned files | Batch: minutes to hours |
  | **Stream** | Low-latency rows in a hot buffer, archived to a dataset every few minutes | Seconds to minutes |
  | **Virtual table** | A pointer to a table in an external platform (Snowflake, Databricks, BigQuery, S3…). No copy into Foundry | Reindexed when update detection sees changes |
  | **Direct datasource** (beta) | Pipeline Builder writes directly into the Ontology | Lowest; supports edits on streaming data |

- **[Docs]** Stream-backed object types have important limits:
  - **most recent update wins**, by arrival order;
  - no user edits, unless you use direct datasources;
  - no multi-datasource object types;
  - records up to **1 MB**;
  - at most **250 properties**;
  - live refresh only in Workshop.
- **[Docs]** In CDC data, the Ontology **ignores the ordering column** and indexes in arrival order. Out-of-order events can therefore leave stale values.
- **[Recommendation]** Default to datasets. Use a stream only when a decision really needs data in seconds, and a virtual table when copying data is the problem.

## Two pressures: latency and data gravity
**[Concept]** Two pressures push past batch datasets:
- **Latency:** a delivery-tracking scan or a fraud signal loses value by the minute.
- **Data gravity:** a company with years of data in Snowflake doesn't want to copy it all into Foundry.

Streams answer the first, virtual tables the second.

## Delivery, ordering, federation
**[Concept]**

| Delivery guarantee | Meaning | Consequence |
|---|---|---|
| **At-least-once** | Nothing is lost, but duplicates are possible | Consumers must tolerate or deduplicate repeats |
| **Exactly-once** | Every message is processed once | Higher latency for coordination; simpler consumers |

**[Concept]** **Ordering** matters for state. If "delivered" arrives before "out for delivery", a last-write-wins consumer ends on the wrong status.

**[Concept]** **Federation vs replication:**
- **Federation** queries data where it lives: no copy, possibly slower, and with costs on the source side.
- **Replication** copies the data: fast local reads and full platform features, but storage costs and a risk of staleness.

## How each option works

### Streams
**[Docs]** From the *Streams* page:
- **Storage:**
  - **Hot buffer:** low-latency records for downstream apps.
  - **Cold storage:** every few minutes, records are "archived" into an ordinary dataset view, so any Foundry app can read streaming data.
  - Low-latency products read a **hybrid** of both.
- **Primitives:** streams have the same primitives as datasets (branching, versioning, permissions, schema). They are always tabular, stored in formats such as Avro.
- **No transaction boundaries:** each row is its own transaction, which allows push-based processing.
- **Throughput:**
  - **Partitions:** each adds about **5 MB/s** of throughput.
  - **Stream types:** high-throughput, or compressed for repetitive strings.
  - **Checkpoints:** give fault tolerance.
- **Consistency:** Foundry streaming supports `AT_LEAST_ONCE` and `EXACTLY_ONCE`.
  - With exactly-once, records become visible downstream after each checkpoint, which is **two seconds** by default.
  - Streaming sources support only at-least-once for extracts and exports.

### Streams as Ontology datasources
**[Docs]** From *Funnel streaming pipelines*:
- **Latency:** streams index into the Ontology "on the order of seconds or minutes".
- **Ordering:** "Most recent update wins": every stream is treated as a changelog. If events arrive out of order, the Ontology ends up with incorrect data. Partition the stream by **primary key** and order it by event time upstream.
- **Current limitations:**
  - **no user edits** on streaming object types. Workarounds: push edits into the stream, use an auxiliary non-streaming object type, or use **direct datasources**;
  - **no multi-datasource object types**;
  - outside **Workshop**, apps don't refresh live;
  - no monitors or metrics for stream-backed types in the Datasources tab;
  - records up to **1 MB**; object types up to **250 properties**.
- **Configuration:**
  - streams can back many-to-many link types;
  - a **stream compute profile** can be set per object type;
  - the **consistency guarantee** defaults to exactly-once. At-least-once lowers latency but can deliver duplicate object-set updates, for example an automation firing twice;
  - changing the stream configuration restarts the job.
- **Deletions:** set through metadata on input records.

### Change data capture (CDC)
**[Docs]** From *Change data capture*:
- **Changelog metadata** needs:
  - primary key column(s);
  - numeric ordering column(s), where the largest value is the newest;
  - a Boolean deletion column.
- **Resolution:** group by key, keep the largest ordering value, drop the row if it is deleted.
- **Sources:** Data Connection CDC syncs exist for **Db2, SQL Server, Oracle and PostgreSQL**. They are built on Debezium. Other changelog-shaped streams can get metadata through Pipeline Builder's **Key By** board.
- **Streams vs the Ontology:**
  - streams resolve their archive view **using the ordering column**;
  - **the Ontology ignores the ordering column** and indexes by arrival order;
  - if retention is set, records not updated within the retention window **disappear from the Ontology**.
- **Backfill:** syncs are "going forward" only. Combine a snapshot backfill with the CDC stream through a union and Key By.

### Direct datasources (beta)
**[Docs]** From *Direct datasources*:
- **What they are:** low-latency writes **directly into the Ontology**, trading throughput for capability. Only **Pipeline Builder** can write to them today, through a streaming pipeline with an object type output.
- **Edits:** they **support user edits** on stream-like data.
- **Ordering:** an optional **source timestamp property** drops out-of-order writes. It applies only to writes after it was configured, and needs an existing timestamp property.
- **Replay warning:** replaying the pipeline **wipes the object view**, so objects can be missing or empty until it repopulates.
- **Other limits:** no branching; first deployments can time out; invalid writes are dropped, with a banner and logs in the Datasources tab.

### Virtual tables
**[Docs]** From *Virtual tables*:
- **Definition:** a source connection plus a **locator** (database, schema, table).
- **Security:** governed by Foundry permissions like any resource.
- **Supported sources:**

  | Status | Sources |
  |---|---|
  | Generally available | Amazon S3, Azure ADLS Gen2 / OneLake, BigQuery, Databricks, Google Cloud Storage, Snowflake |
  | Beta | Foundry-managed Iceberg |

  There is also support for Iceberg catalogs (Glue, Polaris, Unity, Horizon and others).
- **Ontology:** object creation is supported through **Ontology Manager and Pipeline Builder**.
  - If the external table changes outside Foundry, enable **update detection**, which polls on a schedule.
  - With versioned formats (Delta, Iceberg), only real changes trigger builds; otherwise every poll looks like an update.
  - Objects backed by the virtual table then **reindex automatically**.
- **Incremental builds:** append-only, and only with source prerequisites such as Delta Change Data Feed or Iceberg incremental reads.
- **Benefits:** no duplicate storage, compute pushdown, no sync staleness.
- **Drawbacks:** interactive performance can be slower; compute may rise; no dataset versioning or branching; not every source, egress type or app is supported.

## Choosing between them

| Need | Foundry choice | Analogy | Watch out for |
|---|---|---|---|
| Nightly or hourly state | Dataset (batch or incremental) | Warehouse table load | Latency |
| Seconds-level state of many objects | Stream-backed object type | Kafka topic into a materialized key-value view | Ordering, no edits, 250 properties |
| Seconds-level state **and** user edits | Direct datasource (beta) | Writing to an operational store via an API | Replays wipe objects; beta |
| Large external table, no copy | Virtual table | A federated query or external table | Freshness depends on update detection; performance |

**[Analogy] Where it breaks:** a Kafka consumer chooses its own conflict logic. The Ontology's rule for streams is fixed: the last arrival wins. Correct ordering is **the pipeline's job**.

## Kestrel's choices
**[Example]** Three sources, three choices:

| Source | Choice | Reasoning |
|---|---|---|
| Carrier tracking events | **Stream** → `Shipment Event` object type (later perhaps time series) | Ama needs "out for delivery" within minutes. Events are immutable, so no user edits are needed |
| Current shipment status | Stream into Pipeline Builder, keyed by `shipment_id`, ordered by `event_time` | Arrival order decides the result, so order upstream |
| Kofi's re-routing edits on `Shipment` | `Shipment` stays **batch-backed** from the WMS, with edits enabled; tracking status comes through the event stream | Stream-backed types don't take edits. Direct datasources are beta, so not used in production yet |
| Finance revenue tables in Snowflake | **Virtual tables**, used in pipelines and analysis; not object types | Lena's reports don't need objects. Avoid copying large finance tables |
| Storefront order changes | **CDC stream** (PostgreSQL) feeding `Order` | Minute-level status. Out-of-order risk is low with a native connector, but check the ordering logic |

## Advice
- **[Recommendation]** Stream only the properties that need low latency. Stream-backed types have strict limits, so keep slower-changing context on batch-backed types and link them.
- **[Recommendation]** For any changelog into the Ontology, make ordering explicit upstream: partition by key and sort by event time.
- **[Recommendation]** For virtual-table-backed objects, set update detection deliberately and watch compute costs on the source system.
- **[Explanation]** Use at-least-once consistency only where downstream automations are idempotent.

## Mistakes
- Assuming the Ontology uses a CDC stream's ordering column. It doesn't.
- Planning user edits on a stream-backed object type.
- Replaying a direct-datasource pipeline in production without expecting the object view to empty.
- Treating a virtual table as "always fresh" for objects, without update detection.

## Seen in our courses
- [Intro course 09 — Data sources](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/09-data-sources.md): virtual tables, zero-copy, pushdown compute.
- [Data Connection deep dive — Postgres and REST lessons](../../Deep%20Dive/Creating%20Your%20First%20Data%20Connection/README.md)

---
[Module index](README.md) · Previous: [02 — Pipelines that feed the Ontology](02-pipelines-that-feed-the-ontology.md) · Next: [04 — Projects, spaces and markings](04-projects-spaces-and-markings.md)
