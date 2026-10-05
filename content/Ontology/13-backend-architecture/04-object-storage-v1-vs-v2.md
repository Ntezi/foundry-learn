# 04 — Object Storage v1 vs v2

*Sources: [Ontology architecture overview](https://www.palantir.com/docs/foundry/object-backend/overview/) · [Breaking changes OSv1 → OSv2](https://www.palantir.com/docs/foundry/object-backend/object-storage-v2-breaking-changes/) · [Migrate from OSv1 to OSv2](https://www.palantir.com/docs/foundry/object-backend/osv1-osv2-migration/) · [Indexing FAQ](https://www.palantir.com/docs/foundry/object-indexing/faq/) · [Object Storage v1 (Phonograph)](https://www.palantir.com/docs/foundry/object-databases/object-storage-v1/) · checked October 2, 2026 · Ready for Review*

**[Docs]** OSv1 (Phonograph) is "in the planned deprecation phase" and "will be unavailable after June 30, 2026". Migration "is mandatory for all object types". The check date for these notes is **after** that deadline, but the docs still describe the migration in the present tense. Whether any OSv1 types survive in a given enrollment is [RQ-05](../SOURCES.md#open-research-questions). This note is for anyone who meets an old type, or reads older notes that assume OSv1.

## Why OSv2 exists

**[Docs]** OSv1 tied indexing and querying to one "distributed document store and search engine", with a large API surface exposing "low-level database functionality directly". OSv2 separates the subsystems so they scale independently. Its listed gains:

| Area | OSv2 |
|---|---|
| Indexing | **Incremental** by default; throughput "on the order of tens of billions of objects" per type |
| Security | Column-level permissions through **MDOs** |
| Edits | Up to **10,000 objects per action** (support can raise it); lower latency; **schema migrations** for edits |
| Streaming | **Streaming datasources** |
| Schema | Up to **2,000 properties** per type |
| Queries | Spark-based execution for larger Search Arounds and more accurate aggregations |

## Breaking changes, as a checklist

**[Docs]** Permanent changes. Fix these before migrating:

- [ ] **Edits only through actions.** Direct OSv1 edit APIs must become actions. Migration is **blocked** until *Only allow edits via actions* is on.
- [ ] **Writeback datasets become materializations** (optional; [03](03-edits-and-materializations.md#mapping-from-osv1-terms)).
- [ ] **Edit history:** choose whether to **preserve** it. That costs compute. If you don't, only the latest state migrates, and history can't be recovered, "except for Action Logs". OSv2 history then needs *Track user edit history* turned on, plus the Edit History widget.
- [ ] **Data restrictions:** OSv2 rejects things OSv1 accepted, such as empty strings, `NaN`, duplicate keys in one transaction, and stricter geopoints ([02](02-indexing-and-funnel.md#part-2--my-objects-are-wrong-or-missing)).
- [ ] **Changelog datasets:** OSv2 doesn't use OSv1's "latest timestamp wins" semantics, and the changelog Python decorator is obsolete.
- [ ] **Monitoring:** health checks become **monitoring views**.
- [ ] **OSS:** no query-string support; no cardinality metrics on sets mixing OSv1 and OSv2 objects.

**[Docs]** Temporary gaps listed at the check date:

- schedules can't connect *through* a materialization;
- no custom analyzers;
- Foundry Rules archetypes lack some OSv2 features, such as MDOs and multiple materializations.

## Migration runbook

**[Docs]** These steps come from *Migrate from OSv1 to OSv2*.

**Before.**

- Check the **Incompatible usage** view, which covers the last 30 days. Some usage **blocks** migration (edits not limited to actions). Some **doesn't block** it but will fail afterwards, such as direct OSv1 API calls. Re-point those at **OSS** for reads, **actions** for edits, and **OMS** for metadata.
- Freeze the schema. A change that triggers a **replacement pipeline aborts** the migration.
- **Decimal** properties may need a precision and scale set. The **Fix** button sets them from the data.

**Configure** (Datasources tab → *Indexing metadata* → select *Object Storage v2*):

- **Transition windows:** quiet periods in which the read switch may happen. The first Funnel pipeline can take about **30 minutes** to start. The window counts only after the first OSv2 sync succeeds.
- **Soak period:** up to **14 days**. During it, OSv1 is kept up to date, **all reads go to OSv2**, and requests to OSv1 are **rejected**. You can **abort** back to OSv1 at any point. Afterwards you can't roll back. A soak of 0 days deletes the OSv1 index straight away. Dual indexing costs compute.
- **Writeback dataset:** optionally migrate it as a materialization with the **same columns**, for downstream compatibility. Unmapped columns are dropped. If you don't migrate it, the old dataset stays, frozen at its last build.

**During.** **User edits are disabled** for the whole migration, soak included. Reads continue. Watch for `PIPELINE_FAILED` in Indexing metadata.

**Bulk.** Select several types, with shared windows and soak. The docs recommend **fewer than 100 entities at a time**.

**After.** Re-save automations to turn on **live monitoring**, which needs OSv2 ([10-06](../10-applications/06-automate-and-ontology-events.md#why-each-choice)).

**[Explanation]** The two decisions that matter are **edit history** and the **soak length**. For a type with audit value, preserve history *and* soak for a week, with an agreed abort criterion. A dropped edit history can't be rebuilt.

## How OSv1 worked, for reading old screens

**[Docs]** From the OSv1 page:

- A datasource added to an object or link type is **registered** in Phonograph before it can be queried. Unregistered types show a red "not registered" label.
- **Unregistering** a datasource hides its data and **removes the history of user edits** stored in Phonograph. Ontology Manager warns before such changes.
- Each data or schema change triggers a **reindex**. Its status (success, in progress, failed) shows in the Datasources tab, and a failure puts a red "failed" label on the type.
- OSv1 indexes **APPEND** and **UPDATE** transactions incrementally. A **SNAPSHOT** transaction always reindexes every object.

## Reading older notes

**[Explanation]** Many course notes and older doc pages describe OSv1 behaviour. Translate as follows:

| OSv1 phrase | OSv2 reading |
|---|---|
| "Create a writeback dataset to enable edits" | Turn on the **Edits** toggle; materialize only if needed |
| "Phonograph sync / registration" | Funnel pipeline; indexing |
| "Search Around limited to 100,000" | In-memory up to 100,000, then Spark, up to 10M per leaf set (but see RQ-24 in [05](05-limits-usage-and-compute.md)) |
| "StaleObject error" | Rarer in OSv2. Conflicts are now explained by isolation levels ([08-07](../08-actions/07-consistency-reverts-and-logs.md)) |
| "Health check on the sync" | Monitoring view |

---
[Module index](README.md) · Previous: [03 — Edits and materializations](03-edits-and-materializations.md) · Next: [05 — Limits, usage and compute](05-limits-usage-and-compute.md)
