# 05 — Lineage and builds

*Sources: [Builds](https://www.palantir.com/docs/foundry/data-integration/builds/) · [Schedules](https://www.palantir.com/docs/foundry/data-integration/schedules/) · [Branching](https://www.palantir.com/docs/foundry/data-integration/branching/) · [Data Lineage overview](https://www.palantir.com/docs/foundry/data-lineage/overview/) · [Funnel batch pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/) · [Markings](https://www.palantir.com/docs/foundry/security/markings/) · checked October 2, 2026 · Ready for Review*

- **[Docs]** A **build** computes new versions of datasets. It is made of **jobs**; each job is defined by a **JobSpec** (its inputs and logic) and writes one or more outputs together. **Schedules** run builds over time, from **triggers**.
- **[Docs]** Builds skip **fresh** outputs, meaning inputs and logic unchanged; a **force build** overrides this. A build **locks** its outputs by opening transactions, and fails on cycles.
- **[Docs]** **Branching** applies to both code and data. A build runs on one branch, reading inputs through a **fallback chain** (for example `feature → master`), and never touches other branches.
- **[Docs]** Ontology indexing is made of builds too. Each object type's Funnel pipeline is a chain of build jobs (changelog → merge → index → hydrate) that you can find in the **Builds** app by object type. **Data Health monitoring views** can alert on failures and sync delays.
- **[Docs]** **Data Lineage** shows how data flows: ancestors, descendants, schemas, build times, the code that produced a dataset. It can colour out-of-date tables.
- **[Explanation]** Lineage is how you answer, about any property in an app: *where did this value come from, and is it fresh?* It is also the path along which **markings** propagate.

## Why lineage matters for operational apps
**[Concept]** An operational app is only trustworthy if you can explain each number:
- Which source produced it?
- Which logic transformed it?
- When did it last update?
- Who is allowed to see it?

Without builds and lineage you can't answer those questions, and you can't keep data flowing reliably.

## Three ideas
**[Concept]**
- **Directed acyclic graph (DAG):** datasets are nodes and transformations are edges. A build executes a sub-graph in dependency order.
- **Idempotent, incremental recomputation:** recompute only what is stale.
- **Provenance:** a record of how each output was produced.

## How builds, schedules and branches work

### Builds, jobs and JobSpecs
**[Docs]**
- A job is a unit of work with shared logic producing one or more outputs. Multi-output jobs **always update together**. JobSpecs are published when logic changes, for example when code is committed in a Code Repository.
- Many kinds of logic run as jobs:
  - Data Connection syncs;
  - transforms;
  - health checks;
  - analytical-application logic;
  - exports.
- **Job states:** `WAITING`, `RUN_PENDING`, `RUNNING`, `ABORT_PENDING`, `ABORTED`, `FAILED`, `COMPLETED`.
- **Build resolution:**
  1. Detect cycles.
  2. Validate the inputs and their schemas.
  3. Open transactions on the outputs (**build locking**).
  4. Queue behind other builds that would change the inputs.
- **Execution:**
  - Independent jobs run in parallel.
  - If a job fails, its dependent jobs are terminated; optionally, all jobs are aborted.
  - Earlier completed jobs may already have written their outputs.
- **Staleness:** an output is **fresh** if its inputs and JobSpec are unchanged since it was last built, and then it is skipped. A **force build** recomputes everything.
- **Monitoring:** you can cancel a single job, and **live logs** stream from running jobs.

### Schedules
**[Docs]**
- **Triggers:** a schedule runs a build when its **trigger** is satisfied. A trigger that fires while the previous run is active waits.
- **Run outcomes:**

  | Outcome | Meaning |
  |---|---|
  | **Succeeded** | A build started (the build itself may still fail) |
  | **Ignored** | Nothing was stale |
  | **Failed** | The schedule itself failed to run |

- **Pausing:** pausing **resets the trigger state** and forgets observed events.
- **Scope:** **project-scoped** schedules run independently of any user's permissions. **User-mode** schedules run as the user and break if that user's access changes. Project scope "is more consistent".

### Branching
**[Docs]**
- **Dataset branches:** pointers to the latest transaction on that branch.
  - At most one open transaction per branch.
  - Each non-root branch has one parent.
  - **No merging of dataset branches**; logic is merged through Git pull requests.
- **Builds on branches:**
  - JobSpecs are collected from the build branch, falling back along the chain.
  - Inputs are read from the build branch where they exist, otherwise from the first fallback branch.
  - Outputs are written only on the build branch.
  - A build never modifies other branches and never creates branches on inputs.
- **Example:** a build on `feature` uses dataset A from `master` by fallback, and writes new B and C only on `feature`.

### Data Lineage
**[Docs]** Data Lineage is an interactive graph of how data flows. You can:
- search by project, table or column name;
- expand ancestors and descendants;
- colour nodes, for example out-of-date tables;
- drill into schemas, build times and the generating code;
- save and share **pipeline snapshots**.

[Recommended project structure](https://www.palantir.com/docs/foundry/building-pipelines/recommended-project-structure/) suggests saving lineage graphs in each project's `/documentation` folder.

### Lineage and the Ontology
**[Docs]**
- **Funnel jobs are builds** (*Funnel batch pipelines*).
  - Changelog, merge changes, indexing and hydration jobs appear in the **Builds** application, where you can filter by object type.
  - Users with View on the backing datasource can debug failed jobs from the object type's **Datasources** tab.
  - **Live** pipelines run when datasources update, and every six hours when there are edits.
  - **Replacement** pipelines run in the background after schema changes.
- **Monitoring:** *Monitor the health of this object type* in Ontology Manager opens **Data Health monitoring views**. There you can set rules for live and replacement pipelines, and **Sync Propagation Delay** rules for index freshness.
- **Markings and lineage** (*Markings*): markings propagate along **data dependencies**, which are exactly the lineage edges. An object type's backing dataset inherits upstream markings unless they are explicitly removed.

## Compared with Airflow and dbt

| Familiar tool | Foundry | Difference |
|---|---|---|
| Airflow / Dagster DAG | Builds, JobSpecs and schedules | JobSpecs come from published logic; staleness is computed from inputs and logic, not only time |
| dbt `ref()` lineage graph | Data Lineage | Spans syncs, transforms, health checks, exports and Ontology indexing, plus security propagation |
| Git feature branches with dev schemas | Branching with fallback chains | Data branches can't be merged; the logic is merged |
| Data observability alerts | Data Health checks and monitoring views | The same mechanism covers Ontology sync delays |

## Kestrel: a wrong delivery date
**[Example]** Ama reports that an order shows "Promised by 3 Oct", but the customer says the site said 2 Oct. Daniel traces the property:

1. **Object → datasource:** the `Order` type's Datasources tab shows `/data/ontology/order` in `Commerce [Ontology]`.
2. **Lineage upstream:** Data Lineage shows `promised_date` computed in a transform from `clean/orders.placed_at` plus `carrier_sla_days` from `clean/carriers`.
3. **Freshness:** `clean/carriers` was last built 9 days ago, so it is out of date. Its schedule is **user-mode**, and the user who created it left the team.
4. **Fix:** recreate the schedule as **project-scoped** and add a health check on the age of `clean/carriers`.
5. **Ontology freshness:** add a Sync Propagation Delay rule on the `Order` object type, so stale indexing alerts the team.

**[Example]** Priya tests a new delivery-promise formula on branch `promise-v2`. The build uses `master` inputs through the fallback, writes `order` only on `promise-v2`, and the production objects stay unchanged until the pull request is merged and built on `master`. (How Ontology *definitions* themselves are branched is covered in [14 — Branching and proposals](../14-lifecycle-and-operations/02-branching-and-proposals.md).)

## Advice and pitfalls
- **[Recommendation]** Use project-scoped schedules for production pipelines that feed the Ontology.
- **[Recommendation]** Monitor two freshness signals: **dataset build** health, and **Ontology sync** delay. A dataset can be fresh while indexing is failing.
- **[Recommendation]** Keep a saved lineage graph for each Ontology project, showing which datasets back which object types.
- **[Explanation]** A partially failed build can leave some outputs updated and others not. Joined object types can then briefly disagree. Design apps and checks with this in mind.

**Pitfalls**
- Debugging an "object not updating" issue only at the dataset level, without checking the Funnel jobs.
- Leaving a production schedule in user mode.
- Assuming a branch build changes what production apps see.
- Removing or adding a marking upstream without looking at what depends on it downstream.

## In our courses
- [Ontology deep dive 08–11 — Data lineage](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/08-why-data-lineage-matters.md): the Fresh Air pipeline.
- [E2E speedrun 19 — Finalize and run the pipeline](../../../Tracks/Speedrun/Your%20First%20End-to-End%20Workflow/19-finalize-and-run-pipeline.md)
- [Intro course 19 — Branching](../../../Tracks/Courses/Introduction%20to%20Foundry%20&%20AIP%20for%20Enterprise%20Organizations/19-branching.md)

---
[Module index](README.md) · Previous: [04 — Projects, spaces and markings](04-projects-spaces-and-markings.md) · Next: [03 — Ontology fundamentals](../03-ontology-fundamentals/README.md)
