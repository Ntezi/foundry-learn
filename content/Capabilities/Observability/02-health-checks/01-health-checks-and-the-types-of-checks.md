# 01 — Health checks and the types of checks

*Sources: [Health checks](https://www.palantir.com/docs/foundry/health-checks/overview/) · [Types of checks](https://www.palantir.com/docs/foundry/health-checks/check-types/) · checked October 23, 2026 · Ready for Review*

The second feature set of Data Health, written as the **questions a check can ask** about one dataset: did it build, when, how big, what's in it, what shape. The overview page says where checks live and how to see them; the types page explains the three distinctions that decide which check to place where: job versus schedule, three kinds of freshness, and checks that run after a build versus expectations that run inside it.

## What a health check is

**[Docs]** Health checks "enable monitoring and alerting on common issues across datasets and other resource types", covering "dataset status, time, size, content, and schema" with customizable checks; failures produce in-platform notifications and emails. The page is the reference; the design guidance is in the *maintaining pipelines* section of the docs (the *recommended health checks* page), which sits outside this sidebar. And the hand-off the other way: if the resources aren't covered, if you want coverage that scales, or if you have "many similar resources", "consider using monitoring views instead of health checks" ([01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md)).

**[Docs]** Checks can be created on **datasets** (the page adds that you can also create checks "through code", the route the types page later names as data expectations), **schedules** and **tables**. Where to find them, the **Health tab**: for a dataset or a table, in Dataset Preview, to add, modify and "view historic check results"; for a schedule, in Data Lineage under *Metrics > Health*, listing health checks and monitoring views "each listed in its own view". The same check can be added to **several datasets at once** from Data Lineage: select them (Cmd or Ctrl), right-click, *Add health check*, configure once.

**[Docs]** Seeing health at three levels: a **resource's** Health tab; a **pipeline's** health in Data Lineage, colouring datasets by check status, with a *Data Health* tab at the bottom (toggled on in Settings) listing every check in the graph; and **platform-wide** in the Data Health application, filtering and sorting datasets by status or name, toggling to "only the datasets that you are watching", and adding checks from the top-right button.

**[Explanation]** Two of these are the operational views module 01 lacks for datasets: the Data Lineage colouring is the dataset counterpart of Workflow Lineage's *Monitoring status* mode, and the Health tab's history is the dataset counterpart of the alert debug page's chart ([01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md)). Neither covers functions; the function tools cover neither datasets. Which tool you open depends on what kind of resource failed.

## Job, build, schedule

**[Docs]** The types page defines the units first. A **job** is "a Spark computation defined by the logic in a single transform", producing one dataset (or several from a multi-output transform), broken into stages. A **schedule** is "a collection of jobs with defined target datasets that are configured to run on a reoccurring basis", which "can be used to represent a subset of a pipeline that builds together".

| Check | Triggered when | Passes when | Watch out |
|---|---|---|---|
| **Job status** | The dataset it sits on "is refreshed or is created as a part of any build" | The target dataset builds, "even if the build it is a part of fails downstream" | If the build fails *upstream*, the dataset "will register as having a canceled build and the job status will not be evaluated" |
| **Schedule status**, **Schedule duration** | Only when the configured schedule runs | The schedule's build, "including all intermediates", succeeds or finishes in time | Recommended on "all schedules"; with one in place, job status checks on the schedule's other datasets are "not recommended, as any job failing on the schedule will trigger a schedule status check" |

([02-03](03-checks-reference.md#status-checks) adds **build status**, which the reference page defines, and the rule for choosing among the three.)

**[Explanation]** The trap is the cancelled build. A job status check on a downstream dataset stays silent when the failure is upstream, because its job never ran; it only reports failures of *its own* transform. So a job status check answers *did my transform break?*, a schedule status check answers *did the pipeline deliver?*, and the second is the one an operator wants. The monitoring-view equivalent, *consecutive schedule failures*, replaced the schedule status check for scope-wide use ([01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md)).

## Three freshnesses

**[Docs]** Three checks are all "concerned with" freshness ("how up-to-date some aspect of your data is") and measure it differently:

| Check | Measures | Runs when | Fooled by |
|---|---|---|---|
| **Time since last updated** | The **dataset**: time from the last committed transaction to now, "even if the transaction was empty" | On update and when the threshold passes ([02](02-schedules-watching-and-notifications.md)) | An empty transaction counts as an update |
| **Data freshness** | The **data**: time from the last committed transaction to the maximum of a timestamp column | "only run when a transaction is committed" | Nothing arriving at all, since no transaction means no run |
| **Sync freshness** | The data in a **synced** dataset: time from the latest sync to the maximum of a datetime column | On sync | — |

**[Docs]** For data and sync freshness, "it is ideal if the timestamp in the column represents the time when the row was added in the source system".

**[Explanation]** Pair them. *Time since last updated* catches the pipeline that stopped; *data freshness* catches the pipeline that runs on time and delivers stale rows, which is the failure a source-system outage produces upstream of a healthy Foundry schedule. The monitoring rule *time since job last succeeded* ([01-02](../01-monitoring-views/02-monitoring-rules-reference.md#time-series-syncs-datasets-geotemporal-observations)) is a third thing again: it passes on an aborted transaction and on an empty one, so it only says the job ran.

## After the build, or inside it

**[Docs]** "Most standard health checks depend on jobs to finish in order to compute." To stop a bad build from landing, a dataset built in a Code Repository can use **data expectations**, "checks that run during build time", which "abort the build on error" and still report into Data Health.

**[Explanation]** That one paragraph is the boundary between this area and the transforms docs. A health check is an observer: the data is already committed when it runs, and a failing check tells people. An expectation is a gate: the transaction never commits. Choose by what the downstream can tolerate: a wrong `customerId` reaching the Ontology is a gate case; a slightly low row count is an observer case. [02-04](04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md) adds that expectations travel with the transform when a product is packaged, where ordinary checks must be added by hand.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)), the placement rules before the checks themselves ([03](03-checks-reference.md#for-kestrel) picks them):

- **Schedule status on every schedule** in `Storefront [Datasource]`, `Commerce [Transform]` and `Kestrel Pay [Datasource]`, and **no job status checks** on their intermediate datasets, following the page's recommendation; the only job status checks sit on datasets built outside a schedule, if any exist (17-02 records none).
- **Both freshnesses on `customer_master` and the shipments dataset** behind `Shipment`: *time since last updated* for the pipeline, *data freshness* on the storefront's own event timestamp for the data, because Ama's queue depends on the rows being current, not on the transform having run ([Ontology 13-02](../../Ontology/13-backend-architecture/02-indexing-and-funnel.md)).
- **Data expectations, not checks, for the keys**: uniqueness and non-null on `customer_master.customerId` and on `policyRegion` ([Security 02-02](../../Security/02-markings-and-mandatory-controls/02-granular-policies.md#for-kestrel) made the latter an invariant transform; an expectation in that transform is the same intent with Data Health reporting), so a bad key never reaches the Ontology. This answers the question the plan left open: the invariant stays in the transform, as an expectation.
- Every check is added to the matching monitoring view from [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#for-kestrel), so subscriptions and routing live in one place.

---
[Module index](README.md) · Next: [02 — Schedules, watching and notifications](02-schedules-watching-and-notifications.md)
