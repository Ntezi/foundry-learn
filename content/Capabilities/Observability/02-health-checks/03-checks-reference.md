# 03 — Checks reference

*Sources: [Checks reference](https://www.palantir.com/docs/foundry/health-checks/checks-reference/) · checked October 23, 2026 · Ready for Review*

The catalogue of health checks, read as a **decision sheet** like [01-02](../01-monitoring-views/02-monitoring-rules-reference.md) for rules: five categories, twenty-seven checks, the parameters that matter, and the page's own guidance on choosing between the status checks. Every check also takes *Notes* (free text) and *Issues* (file one on failure); most take a *Severity* of Moderate or Critical; those two columns are left out below. Example values are the page's, dated October 23, 2026.

## The catalogue

**[Docs]**

| Category | Check | Supported resources |
|---|---|---|
| **Status** | Schedule status; Sync status | Datasets |
| **Status** | Build status; Job status | Datasets, Iceberg tables, Virtual tables |
| **Time** | Build duration; Data freshness; Sync duration; Sync freshness; Time since sync last updated | Datasets |
| **Time** | Time since last updated | Datasets, Iceberg tables, Virtual tables |
| **Size** | Dataset file count; Dataset partition; Row count; Transaction file count; Transaction file size | Datasets |
| **Content** | Allowed column values; Approximate unique percentage; Column regex; Approximate column relation; Date range; Null percentage; Numeric mean; Numeric median; Numeric range | Datasets |
| **Content** | Primary key | Datasets, Iceberg tables, Virtual tables |
| **Schema** | Column count | Datasets |
| **Schema** | Column; Schema | Datasets, Iceberg tables, Virtual tables |

**[Explanation]** The resources column is the first filter. Six checks reach Iceberg and virtual tables: the two per-build statuses, time since last updated, primary key, column, and schema. Everything that needs a Foundry transaction or a Foundry sync (sizes, freshness by column, content statistics) is datasets only.

## Status checks

| Check | Asks | Parameters beyond severity | Note from the page |
|---|---|---|---|
| **Schedule status** | Did the schedule's most recent build succeed? | *Escalate* (raise severity after consecutive failures) | "representative of the status of the pipeline or set of datasets that always build together" |
| **Build status** | Did the dataset's most recent build succeed? | *Escalate* | Reports "the whole process leading to a final dataset"; intermediate datasets with their own build status check "will not be updated", though their job status is |
| **Job status** | Did the most recent job on the dataset succeed? | *Escalate* | Runs "for each and every build of a particular dataset", whether or not the dataset is the build's final output |
| **Sync status** | Did the latest sync to another database succeed? | *Sync destination* (the page's examples: `phonograph2-cache-worker`, `jdbc-worker`) | For datasets that sync to several destinations |

**[Docs]** Choosing: schedule status on all schedules; no job status checks on a schedule's other datasets once it has one; job status "with intermediate datasets if you want to check whether the dataset got updated, regardless of whether other datasets in the build were successfully updated"; build status "if the dataset is a build output and you want to check that the entire build and all datasets, including this dataset, succeeded". Build and job status "will be equivalent if the dataset is the only output of a build" and differ when the dataset is intermediate or the build has several outputs and *other* jobs fail.

## Time checks

| Check | Asks | Parameters | Notes |
|---|---|---|---|
| **Build duration** | How long did the build take? | *Build duration* (between, ≥, ≤, equal; days, hours or minutes); *Median deviation* (standard deviations from the median of recent builds, e.g. 1 deviation over 10 builds) | "only be updated for the terminal output of the build" |
| **Data freshness** | How old is the newest row? | *Column name* (`LAST_UPDATED`); *Freshness range* | Measures "exact data freshness" when the column is the row's insertion time |
| **Sync duration** | How long did the sync take? | *Sync destination*; *Sync duration*; *Median deviation* | |
| **Sync freshness** | How old is the newest synced row? | *Column name*; *Freshness range* | |
| **Time since last updated** | How long since any transaction? | *Last updated*; *Median deviation*; **Ignore empty transactions** (required choice: transactions "with no files will be ignored, as if they had not existed"); *Schedule* (Automatic or Custom, [02](02-schedules-watching-and-notifications.md)) | The one check with a schedule setting |
| **Time since sync last updated** | How long since the last sync? | *Last sync*; *Median deviation* | |

**[Explanation]** *Ignore empty transactions* closes the gap [01](01-health-checks-and-the-types-of-checks.md#three-freshnesses) described: with it on, an empty commit no longer counts as an update, so *time since last updated* starts to behave like *data arrived* rather than *something ran*. It is required, so the choice is made consciously every time.

## Size checks

| Check | Asks | Parameters |
|---|---|---|
| **Dataset file count** | Files in the latest view | *File count* (required); *Median deviation* |
| **Dataset partition** | Is the file layout performant? | None. Passes with fewer than **50** files; with 50 or more, passes "if at least 90% of the files are more than 96MB in size" |
| **Row count** | Rows in the dataset | *Row count* (required; the examples: between 500 and 1000, ≥ 100); *Median deviation*. Against the last successful result, "will not consider the results in failed checks" |
| **Transaction file count** | Files committed in one transaction, excluding log files | *File size* (the page's label for the count); *Median deviation* |
| **Transaction file size** | Bytes committed in one transaction (MB or KB), excluding log files | *File size*; *Median deviation* |

## Content checks

| Check | Asks | Parameters | The page's caveat |
|---|---|---|---|
| **Allowed column values** | Are all values in the list? | *Column name*; *Allowed values* | |
| **Approximate unique percentage** | What share of values is unique? | *Column name*; *Unique percentage* | "not suitable for checking if a column is a primary key (100% unique values), use the primary key check instead" |
| **Column regex** | Do values match a pattern? | *Column name*; *Regex* (`^Pre`, `post$`, `.*any.*`) | |
| **Approximate column relation** | How similar are two columns across datasets? | *Other dataset*; *Column 1 name*; *Column 2 name*; *Percentage match* (85%) | "For an exact check, use data expectations instead" |
| **Date range** | Are dates within a range? | *Column name*; *Allowed date range* | No severity |
| **Null percentage** | What share is null? | *Column name*; *Null percentage*; *Median deviation* | |
| **Numeric mean / median** | Does the average or median meet a threshold? | *Column name*; *Mean* or *Median*; **Difference from last check** ("greater than the last check + 5") | |
| **Numeric range** | Are values within a range? | *Column name*; *Allowed range* (3-5) | |
| **Primary key** | Are values "100% unique and non-null"? | *Column name* | No severity: it either holds or it doesn't |

## Schema checks

| Check | Asks | Parameters |
|---|---|---|
| **Column** | Does a column exist with a type? | *Column name*; *Is Present*; *Type* |
| **Column count** | How many columns? | *Column count* |
| **Schema** | Does the schema match a listed one, under a comparison policy? | *Columns* (full type match or existence only); *Comparison type* |

**[Docs]** The four comparison types:

| Value | Allows |
|---|---|
| `EXACT_MATCH_ORDERED_COLUMNS` | Nothing: order, names, types and count must match |
| `EXACT_MATCH_UNORDERED_COLUMNS` | A different order |
| `COLUMN_ADDITIONS_ALLOWED` | Extra columns; "columns cannot be missing" |
| `COLUMN_ADDITIONS_ALLOWED_STRICT` | Extra columns, but each new column "is added to the check" and can't go missing afterwards |

## Approximate standard deviation

**[Docs]** The *median deviation* parameters don't use the true standard deviation, "Since dataset builds can easily have outliers". They use the **median absolute deviation** (MAD), "the median of the absolute deviations from the median of the data", scaled: σ = MAD × 1.4826.

**[Recommendation]** This is why *median deviation* is the parameter to prefer over fixed bounds for anything that drifts with business volume: row counts, file sizes, durations. A fixed *row count ≥ 100* is right on day one and wrong after a year of growth; *within one deviation of the median of the last ten builds* follows the data and ignores the one freak build.

## Reading the sheet

**[Recommendation]**

1. **Statuses** go on schedules; a job status only where a transform runs outside one.
2. **Freshness** needs two checks, pipeline and data ([01](01-health-checks-and-the-types-of-checks.md#three-freshnesses)); turn *ignore empty transactions* on unless an empty commit is a meaningful heartbeat.
3. **Sizes and statistics** use *median deviation*; fixed bounds only for hard business limits.
4. **Keys** use the *primary key* check or an expectation, never *approximate unique percentage*.
5. **Schema** uses `COLUMN_ADDITIONS_ALLOWED_STRICT` on datasets feeding the Ontology: additions are safe, removals break the mapping ([Ontology 04-02](../../Ontology/04-object-types/02-backing-datasources-and-mapping.md)).

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)), the checks behind the placement rules in [01](01-health-checks-and-the-types-of-checks.md#for-kestrel):

| Dataset | Checks |
|---|---|
| Every schedule in the three pipeline projects | **Schedule status**, Critical, *Escalate* on; **Schedule duration** with *median deviation* 1 over 10 builds (Moderate) and a fixed Critical bound at twice the expected duration |
| `customer_master` | **Time since last updated** (ignore empty on); **Data freshness** on the storefront event timestamp; **Row count** by median deviation; **Null percentage** on `region` by median deviation (the contact columns live in `customer_contact`, [Security 11-03](../../Security/11-kestrel-case/03-the-customer-data-lifecycle.md)); **Schema** `COLUMN_ADDITIONS_ALLOWED_STRICT`; key uniqueness as an expectation, not a check |
| The shipments dataset behind `Shipment` | **Data freshness** Moderate 1 hour, Critical 3 hours; **Schema** strict |
| The orders dataset behind `Order` | **Allowed column values** on `status` against the `OrderStatus` values ([Ontology 17-02 §2](../../Ontology/17-case-studies/02-kestrel-reference-model.md#2-object-types)); **Schema** strict |
| The ledger datasets in `Kestrel Pay [Datasource]` | **Row count** and **Transaction file size** by median deviation (a half-size ledger drop is the failure Lena's reconciliation would otherwise find a day later); **Numeric range** on amounts ≥ 0; **Primary key** on the payment ID |
| `shared_shipments` for Northwind | **Schema** `EXACT_MATCH_UNORDERED_COLUMNS`, Critical: the projection's columns are the contract with another company ([Security 04-04](../../Security/04-securing-data-and-applications/04-cross-organization-collaboration.md#for-kestrel)) |
| `Storefront [Datasource]/raw` | **Dataset partition** on the large source tables, Moderate, as a hint to Priya rather than an alert |

Not adopted: sync checks (the Phonograph sync checks are for Object Storage v1, [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md); on v2, where Kestrel is ([Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) turns the Phonograph flag off for that reason), the object and link rules in [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#objects-and-links) do the watching); *approximate column relation* (the entity-resolution match quality in [Ontology 15-04](../../Ontology/15-advanced-patterns/04-entity-resolution-across-sources.md) is measured in the pipeline, not approximated by a check).

---
[Module index](README.md) · Previous: [02 — Schedules, watching and notifications](02-schedules-watching-and-notifications.md) · Next: [04 — Builds and checks FAQ; health checks in a Marketplace product](04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md)
