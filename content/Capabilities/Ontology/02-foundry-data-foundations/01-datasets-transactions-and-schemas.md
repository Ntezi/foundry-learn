# 01 — Datasets, transactions and schemas

*Sources: [Datasets](https://www.palantir.com/docs/foundry/data-integration/datasets/) · [Views](https://www.palantir.com/docs/foundry/data-integration/views/) · [Funnel batch pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/) · [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) · checked October 2, 2026 · Ready for Review*

## Key facts
- **[Docs]** A **dataset** is a wrapper around a collection of files in a backing file system. It adds permissions, a schema, version control and updates over time. It is "the most essential representation of data", from when the data lands in Foundry until it is mapped into the Ontology.
- **[Docs]** Datasets change through **transactions**. There are four types:

  | Type | What it does |
  |---|---|
  | `SNAPSHOT` | Replaces everything |
  | `APPEND` | Adds files |
  | `UPDATE` | Adds files and may overwrite existing ones |
  | `DELETE` | Removes file references |

  What you see when you open a dataset is the **current view**: the files left after applying transactions from the latest `SNAPSHOT`.
- **[Docs]** A **schema** lives on a dataset view and says how to read its files: format, column names and types. Nothing guarantees the files actually conform to it.
- **[Docs]** For the Ontology:
  - Funnel indexes each new transaction **incrementally**, and switches to a full reindex when more than **80%** of rows change in one transaction.
  - A backing datasource can't contain `MapType` or `StructType` columns.
  - One datasource can back only **one** object type.
- **[Explanation]** The transaction type you choose upstream decides how cheaply and how correctly objects update downstream.

## Why datasets, not files
**[Concept]** Files in object storage have no history, no schema guarantees and no permissions of their own. Teams that share raw files end up overwriting each other, losing track of versions, and arguing about what a column means. Foundry datasets add versioning, schemas and security to files, so pipelines and the Ontology can rely on them.

## Three ideas borrowed from software
**[Concept]** Three ideas, each borrowed from software engineering:

| Idea | Software analogy | In a dataset |
|---|---|---|
| **Atomic change** | A Git commit | A transaction: open, then committed or aborted |
| **Current state from history** | Replaying commits | A view: the files that survive the transaction history |
| **Interpretation contract** | A type declaration | A schema |

## The details

### What a dataset can hold
**[Docs]**

| Kind of data | How it is stored |
|---|---|
| **Structured** | Files in an open format such as Parquet, plus a schema |
| **Unstructured** | Emails, images, PDFs: a schema-less dataset or a **media set** |
| **Semi-structured** | JSON or XML: upload to a schema-less dataset and infer a tabular schema downstream |

The files sit in a backing file system (HDFS or, more commonly, cloud storage such as S3). Foundry keeps the mapping from logical to physical paths.

### Transactions
**[Docs]**
- **Lifecycle:** `OPEN` → `COMMITTED` (files join the view) or `ABORTED` (files ignored). The docs compare a transaction to a Git commit: "Git for data".

| Type | Effect on the view | Basis of |
|---|---|---|
| `SNAPSHOT` | Replaces the view with a new set of files | Batch pipelines |
| `APPEND` | Adds files; can't modify existing ones (commit fails if it tries) | Incremental pipelines |
| `UPDATE` | Adds files **and may overwrite** existing ones | Use sparingly. Overwriting breaks downstream incremental processing, which falls back to snapshot |
| `DELETE` | Removes file references from the view (files stay in storage) | Retention workflows |

- **Worked sequence:**
  1. A `SNAPSHOT` writes A and B.
  2. An `APPEND` adds C.
  3. An `UPDATE` changes A to A′.
  4. A `DELETE` removes B.

  The view is now **A′ and C**. A new `SNAPSHOT` with D would start a new view containing only D.
- **Ingestion patterns** for file syncs:

  | Pattern | Transaction | Use it when |
  |---|---|---|
  | Batch mirror | `SNAPSHOT` | Full reload each run |
  | Incremental mirror | `APPEND` | Files are only ever added (recommended in that case) |
  | Incremental mirror | `UPDATE` | The source modifies files. It blocks incremental processing downstream |

- **Retention:** because `DELETE` doesn't remove the stored data, **retention policies** remove data from transactions that are no longer needed.

### Views, branches and schemas
**[Docs]**
- **Dataset view:** the effective files for a branch at a point in time. The number of views equals the number of `SNAPSHOT` transactions; other types extend the current view.
- **Branches:** let several people change a dataset in isolation (see [05 — Lineage and builds](05-lineage-and-builds.md)).
- **Schema:** metadata on a view defining how to parse the files and the column names and types.
  - Schemas can change over time, for example a new column.
  - Field types: `BOOLEAN`, `BYTE`, `SHORT`, `INTEGER`, `LONG`, `FLOAT`, `DOUBLE`, `DECIMAL` (precision and scale; 38/18 is a safe default), `STRING`, `MAP`, `ARRAY`, `STRUCT`, `BINARY`, `DATE`, `TIMESTAMP`.
  - Common file formats: Parquet, Avro, Text (CSV and JSON variants).

### Views (the resource type)
**[Docs]** Separate from a "dataset view", a **View** is a resource that holds no files. It reads the **union** of backing datasets with identical columns.
- With a **primary key**, it **deduplicates**, keeping the row with the highest value in chosen ordering columns. A **deletion column** can then exclude rows.
- A View can be a transform **input** but never an output.
- It's best suited to `APPEND` or additive `UPDATE` inputs; snapshot-heavy inputs force costly projection rebuilds.
- Views over incremental datasets shouldn't be read incrementally downstream, because deduplication then happens only within the transaction range read.
- Where enabled, a View can also stop propagation of mandatory **markings** (not organizations).

### What the Ontology needs from a dataset
**[Docs]**
- **Column types:** a backing datasource may not contain `MapType` or `StructType` columns (*Create an object type*). The struct pages contradict this for struct properties; see [RQ-18](../SOURCES.md#open-research-questions) and [05 — Structs](../05-properties/03-structs.md).
- **One type per datasource:** a single datasource can back only one object type. Reusing one gives the error `Phonograph2:DatasetAndBranchAlreadyRegistered`.
- **Incremental indexing:** OSv2 computes the difference for every new transaction and indexes only changed rows. In the docs' example, 10 changed rows out of 100 produce one changelog `APPEND` containing only those 10. That holds "regardless of the transaction type in the input datasource".
- **Full reindex:** happens when more than **80%** of rows change in one transaction, after schema changes that need a replacement pipeline, or on a manual trigger.
- **Incremental (changelog) datasets:** "most recent transaction wins" per primary key, with **at most one row per key per transaction**. A column named `is_deleted` is **not** treated as a deletion column by default.
- **Views as backing data:**
  - Views with deletion columns are always fully reindexed.
  - Deduplication values that conflict with transaction order can give inconsistent incremental results.
  - Retention that deletes old data can give unexpected results until a full reindex.
- **Value restrictions** (*Data restrictions*):
  - no empty strings (OSv1 turned them into nulls; OSv2 rejects them);
  - no `NaN` or ±infinity;
  - no nested arrays, and no null elements inside arrays;
  - strings up to **12 MB** and arrays up to **100,000** elements.

## Compared with lakehouse tables

| Familiar idea | Foundry dataset | Difference |
|---|---|---|
| Delta Lake / Iceberg table versions | Transactions and views | Foundry tracks files per transaction with typed semantics (`APPEND` vs `UPDATE`) that downstream incremental logic depends on |
| Git branches | Dataset branches | No merging of dataset branches; branches are pointers to transactions |
| Hive schema | Dataset schema | Not enforced against the files; a mismatch shows up as read errors |
| A database view | Foundry View | Can deduplicate by primary key and handle deletes, and is maintained by an automatic build |

## Kestrel: three sources, three transaction patterns
**[Example]** Priya lands three sources:

| Dataset | Transaction pattern | Why | Effect on Ontology indexing |
|---|---|---|---|
| `products_raw` (PIM export) | `SNAPSHOT` daily | Small table, full export | Funnel still indexes incrementally by diff. A full reindex happens only if more than 80% of products change |
| `tracking_events_raw` | `APPEND` hourly | Events are only added | Efficient end-to-end incremental pipeline |
| `orders_cdc` (storefront changelog) | `APPEND`, many rows per order | Every status change is a new row | Must be reduced to **one row per `order_id` per transaction** before backing `Order`, or indexing fails |

**[Example]** Reducing the changelog, following the docs' window-transform pattern:

```python
from pyspark.sql import functions as F
from pyspark.sql.window import Window

w = Window.partitionBy("order_id").orderBy(F.col("changed_at").desc())
latest = (orders_cdc
          .withColumn("rn", F.row_number().over(w))
          # coalesce: a null delete flag counts as "not deleted", so the row is kept
          .filter((F.col("rn") == 1) & ~F.coalesce(F.col("is_deleted"), F.lit(False)))
          .drop("rn"))
```

**[Example]** The PIM sends empty strings for missing colours. OSv2 rejects empty strings, so Priya converts them to nulls in the clean step: `F.when(F.col("colour") == "", None).otherwise(F.col("colour"))`.

## Advice and pitfalls
- **[Recommendation]** Prefer `APPEND` for event-like data and avoid overwriting `UPDATE`s. Downstream incrementality, including cheap Ontology indexing, depends on it.
- **[Recommendation]** Shape Ontology backing datasets as **one row per object**, with clean types and no empty strings, so violations fail early in your pipeline rather than at indexing.
- **[Explanation]** Treat the backing dataset's schema as a **contract** with the Ontology. Renaming a column breaks the property mapping.

**Pitfalls**
- Feeding a raw changelog with several rows per key straight into an object type.
- Assuming an `is_deleted` column deletes objects. For batch-backed object types it doesn't, unless the schema carries legacy OSv1 changelog metadata identifying it. Filter deleted rows out in the pipeline instead.
- Using one dataset to back two object types.
- Relying on the schema to validate file contents.

## Seen in our courses
- [Data Connection deep dive 07 — Basic concepts](../../../Tracks/Deep%20Dive/Creating%20Your%20First%20Data%20Connection/07-basic-concepts.md)
- [Pipeline deep dive 12 — Work with different file types](../../../Tracks/Deep%20Dive/Building%20Your%20First%20Pipeline/12-work-with-different-file-types.md)
- [E2E speedrun 08 — Manual upload](../../../Tracks/Speedrun/Your%20First%20End-to-End%20Workflow/08-manual-upload.md)

---
[Module index](README.md) · Next: [02 — Pipelines that feed the Ontology](02-pipelines-that-feed-the-ontology.md)
