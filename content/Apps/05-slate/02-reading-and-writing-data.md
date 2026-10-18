# 02 — Reading and writing data

*Sources: [Read and write data](https://www.palantir.com/docs/foundry/slate/read-write-overview/) · [Write back data with Actions](https://www.palantir.com/docs/foundry/slate/applications-writeback/) · [Read and write to data systems](https://www.palantir.com/docs/foundry/slate/concepts-queries/) · [Create or retrieve object sets](https://www.palantir.com/docs/foundry/slate/concepts-object-sets/) · [Retrieve individual objects](https://www.palantir.com/docs/foundry/slate/concepts-object-context/) · [OSDK in Slate](https://www.palantir.com/docs/foundry/slate/concepts-osdk/) · [Foundry Functions in Slate](https://www.palantir.com/docs/foundry/slate/concepts-foundry-functions/) · [Upload data for public applications](https://www.palantir.com/docs/foundry/slate/public-applications-data-upload/) · [Write back data to Phonograph](https://www.palantir.com/docs/foundry/slate/references-writeback/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Everything that reaches a Slate app arrives as **JSON**. The docs put it plainly: once data lands in Slate it "loses this context". An object read through a query is just a row of values; Slate no longer knows it's an `Order` with links and actions. The Ontology-aware routes keep more of that context and need less setup; queries are the flexible, generic route.

| Route | Reads or writes | Referenced as | Use it for |
|---|---|---|---|
| **Object Set panel** (Platform tab) | Reads objects, simple aggregations | `{{s_name.data.prop}}`, `{{s_name.objectRids}}` | Most Ontology reads |
| **Object Context panel** | Reads one object by RID | `{{o_name.prop}}` | An app or tab centred on one object |
| **Foundry Functions panel** | Calls a published function | `{{ff_name}}` | Typed business logic kept in a repository |
| **OSDK** (in the Functions editor) | Reads objects and links, applies actions, calls functions | JavaScript in Slate functions | Code-level Ontology access |
| **Action widget** | Writes through an action type | Widget events | **The recommended write path** |
| **Queries** | Reads and writes through admin-configured data sources | `{{q_name}}` | API Gateway, external HTTP and SQL systems, legacy Postgres syncs |

## Reading the Ontology

**[Docs]** The **Object Set panel** builds a set in **builder mode** (base object type, nested AND/OR filters, Handlebars in filter values, multi-term filters) or in **RID mode** (an object set RID or versioned RID). Options:

- **Limit**, applied after sorting, with `getNextPage` / `getPreviousPage` to page through results.
- **Sort** by several properties, applied top to bottom.
- **Aggregations**: count, average, sum, max, min or cardinality.

Grouping by a dimension needs a **function** that buckets the data first.

**[Docs]** The **Object Context panel** takes a single object RID, static or from a function, and exposes its properties directly. The docs name its typical use: a Slate app built as a tab or custom widget inside an Object View.

**[Docs]** **Foundry Functions** turn Slate into a thin client: the app is the client, the function the server, the Ontology the database. You pick a function and its **version**, pass typed inputs (object sets through Handlebars) and read the typed output.

- In a **thin** approach, functions just fetch data and Slate JavaScript does the shaping.
- In a **thick** approach, business and display logic lives in the function, often with custom output types shaped for a chart or HTML widget.

The docs list the gains of thick functions: strong typing, versioning and collaboration in a repository, and logic other apps can reuse.

**[Docs]** The **OSDK in Slate** is generated per app from the object, link and action types and functions you pick ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md#the-same-queue-sketched-in-slate) has the summary). It's OSDK **version 1**, in JavaScript, with IntelliSense. Things to know:

- Functions without an API name, or that edit the Ontology, can't be selected.
- Links are traversed with `pivotTo` on a set, or directly from one object.
- Regenerate it after Ontology changes. **Delete** it, which can't be undone, to switch ontology.
- Its loading errors appear in the health check dialog ([06](06-troubleshooting-and-query-performance.md)).
- Best practice in the docs: start with few entities, check response types, and page with `fetchPage()` rather than loading everything.

**[Example]** The Delivery Desk queue sketched in Slate (from [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md#the-same-queue-sketched-in-slate)):

- `s_openOrders`: an object set of `Order` filtered to open statuses, sorted by `promisedDeliveryDate`, limited to 50 rows with paging events on a Next button.
- `ff_atRiskOrders`: a Foundry Function (thick approach; hypothetical, part of the sketch only and not in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)) that takes `s_openOrders` and returns rows ready for the table: order ID, customer tier, risk score from `deliveryRisk`, latest shipment status. In Workshop the same logic is a function-backed column ([03-01](../03-workshop-widgets/01-core-display-widgets.md)).
- `o_selectedOrder`: an object context bound to the RID of the selected row.

**[Explanation]** The function is the important choice. `deliveryRisk` is per-**shipment** ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent)); computing it in Slate JavaScript would mean an OSDK call per row in the browser.

## Writing to the Ontology

**[Docs]** The recommended write path is **Ontology actions**. Directly, that means OSDK actions or API Gateway queries; as a form, the **Action widget**. Two patterns:

- Put the Action widget in a **Dialog** container and open it with an event.
- Hide the form: the widget's configuration becomes a template filled from other widgets, and an event, usually a button click, submits it.

The widget's events report validation state and submission success or failure. Details of the widget are in [05](05-styles-and-widgets.md#platform-widgets).

**[Example]** *Hold order* in the Slate sketch: the Hold button opens `w_holdDialog`, which contains an Action widget for *Hold order* with the order parameter prefilled from `o_selectedOrder`. Its success event closes the dialog and shows a toast. How the queue's object set then picks up the new status isn't covered by the pages read here; untested. The action's own rules still apply: CS agents only, not after SHIPPED or DELIVERED ([Ontology 08-01](../../Ontology/08-actions/01-action-types.md)).

## Queries

**[Docs]** Every query data source is configured by an administrator. The panel validates JSON templates and previews results. Two security rules apply to Handlebars in queries against **non-Foundry** sources, to prevent injection:

- **SQL**: every template must go through a SQL helper: `schema` and `table` (checked against an allowlist you can't template), `column`, `alias` (constant strings only) or `param` (a prepared-statement value; front-end values are strings or numbers, so cast other types).
- **HTTP JSON**: every template must be wrapped in `jsonStringify`, and `..` isn't allowed in the path. The query object has `path`, optional `queryParams`, `method` (GET, POST, PUT, DELETE), `bodyJson`, `extractors` (JSONPath) and optional `headers`.

**[Docs]** Templates that reference user attributes such as `{{user.firstName}}` take the value from the server, not from the browser.

**[Docs]** **API Gateway** queries call Foundry's public APIs, limited to the endpoints enabled for the data source. They need no security helper. Common uses are dataset metadata, last update time, health checks, schedules and schema; for Ontology reads, the docs prefer the panels or the OSDK. **Preview** endpoints need their `preview` parameter set to true, or the call fails with `ApiFeaturePreviewUsageOnly`, shown in Slate as a 400. When a call fails, open the raw response (`< / >`), read `errorName` first and keep `errorInstanceId` for support.

**[Docs]** **Legacy Postgres queries** read Foundry datasets synced to Postgres. They're supported but no longer developed, and only available where dataset syncs are enabled. Other query rules:

- SQL and Foundry query results are capped at **5,000,000 bytes**. A query over the cap **fails**, so a working query can break as data grows.
- **Partials** (`{{>name arg=value}}`) reuse query text and can be nested.
- **Conditional queries** run only when all dependencies are non-null, or when a Handlebars condition is true.

## Writing elsewhere

**[Docs]** **Phonograph writeback** (Object Storage v1) is **legacy**: no new workflows. It synced a dataset with a primary key to an editing cache, posted row events (`rowAdded`, `rowModified`, `rowDeleted`) and built the edits into a separate writeback dataset. The docs recommend moving to Object Storage v2 and actions.

**[Explanation]** Kestrel is on OSv2 ([Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md)), so Phonograph only matters when you inherit an old app.

### Public apps uploading data

**[Docs]** A public app can't read Foundry data, but it can **upload**. The setup uses secure-upload data sources:

1. Create an empty dataset.
2. Create a **channel** with a manual query (`secure-upload` or `secure-upload-raw-oauth`) that names the dataset RID.
3. Create a **token** with an expiry. It's shown once and can't be recovered.
4. Create the upload query on `secure-upload-raw`. Every field must map to a **string** (use `jsonStringify` or a function).

Submissions land in a sibling dataset with the suffix **`_buffer_v2`**; only Foundry users with permissions can read them. To stop uploads, **unpublish and delete the token**. Unpublishing alone isn't enough: unauthenticated callers could still call the secure-upload source.

**[Explanation]** For the feedback-form candidate in [01](01-slate-apps.md#integrated-and-public-apps): the pipeline that reads the `_buffer_v2` dataset has to treat every row as untrusted input and do the matching to `Order` itself.

---
[Module index](README.md) · Previous: [01 — Slate apps and how they're managed](01-slate-apps.md) · Next: [03 — Functions, variables and Handlebars](03-functions-variables-and-handlebars.md)
