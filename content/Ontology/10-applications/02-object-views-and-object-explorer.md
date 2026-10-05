# 02 — Object Views and Object Explorer

*Sources: [Object Views](https://www.palantir.com/docs/foundry/object-views/overview/) · [Standard Object Views](https://www.palantir.com/docs/foundry/object-views/standard-object-views/) · [Configured Object View overview](https://www.palantir.com/docs/foundry/object-views/config-overview/) · [Object View versioning](https://www.palantir.com/docs/foundry/object-views/manage-versions/) · [Object Explorer](https://www.palantir.com/docs/foundry/object-explorer/overview/) · [Apply actions](https://www.palantir.com/docs/foundry/object-explorer/apply-actions/) · [Save lists](https://www.palantir.com/docs/foundry/object-explorer/save-lists/) · [Analyze using SQL](https://www.palantir.com/docs/foundry/object-explorer/analyze-sql/) (beta) · [Configure Object Explorer](https://www.palantir.com/docs/foundry/object-explorer/configure/) · [Getting started](https://www.palantir.com/docs/foundry/object-explorer/getting-started/) · [Explore with charts](https://www.palantir.com/docs/foundry/object-explorer/explore-charts/) · [View results](https://www.palantir.com/docs/foundry/object-explorer/view-results/) · [Save explorations](https://www.palantir.com/docs/foundry/object-explorer/save-explorations/) · [Compare object sets](https://www.palantir.com/docs/foundry/object-explorer/compare-object-sets/) · [Object Explorer URLs](https://www.palantir.com/docs/foundry/object-explorer/generate-urls/) · [Full](https://www.palantir.com/docs/foundry/object-views/use-full-views-in-platform/) and [panel](https://www.palantir.com/docs/foundry/object-views/use-panel-views-in-platform/) Object Views · [Configure full](https://www.palantir.com/docs/foundry/object-views/config-object-views/) and [panel](https://www.palantir.com/docs/foundry/object-views/config-panel-views/) views · [Branching Object Views](https://www.palantir.com/docs/foundry/object-views/branching-object-views/) · [Object Views in Marketplace](https://www.palantir.com/docs/foundry/object-views/marketplace-object-views/) · [Object View URLs](https://www.palantir.com/docs/foundry/object-views/generate-urls/) · [Comments](https://www.palantir.com/docs/foundry/object-views/comment-on-objects/) · checked October 2, 2026; extended October 3, 2026 · Ready for Review*

A guided tour: Ama's first morning with the Kestrel Ontology, with no apps built yet. Each stop shows what she sees, and which modelling decision (or configuration) made it so.

## Stop 1 — An order, before anyone configured anything

Ama searches for `O-10442` and opens it.

**[Docs]** What she sees is the **standard Object View**, created automatically for every object type. It "matches the object type's configuration":

- **prominent** properties at the top, with special displays by type:
  - media in a viewer;
  - time series as charts;
  - geo properties (geohash, geoshape, geotemporal series) on a **map**;
  - everything else as larger cards;
- normal properties in a table; **hidden** properties not shown;
- a **Linked objects** component: links grouped by link type, inline previews, a subset in a new tab, or a side-panel preview.

What made it good, from earlier modules:

| She sees… | Because of… |
|---|---|
| "O-10442" as the heading, not a hash | The title key ([04-03](../04-object-types/03-primary-keys-and-titles.md)) |
| Status, promised date and total as cards | Prominent properties ([03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md)) |
| "€182.40", not `182.4` | Value formatting ([05-07](../05-properties/07-formatting-and-reducers.md)) |
| "Customer", "Shipments", "Order lines" as link groups | Named link sides ([06-01](../06-links/01-link-types-and-cardinality.md)) |
| The delivery address on a map | A geopoint marked prominent ([05-08](../05-properties/08-time-series-media-geo-and-vectors.md)) |
| *Hold order* in the actions menu | An action type on Order ([08-08](../08-actions/08-using-actions-in-the-platform.md#object-explorer)) |

## Stop 2 — The question that isn't about one order

"Which of today's late shipments are for Gold customers?"

**[Docs]** **Object Explorer** is "a search and analysis tool for answering questions about anything in the Ontology". It runs keyword searches, property filters and Search Arounds, and shows the results in three ways:

- an **exploration view** of preset and configurable charts and maps that you can drill into;
- a **results table**;
- a single object's **Object View**.

It "requires minimal configuration" and is "geared towards less technical users".

Ama starts from Shipment, filters `isLate`, pivots to Order and then to Customer, and filters on tier ([06-03](../06-links/03-traversal-and-search-arounds.md)). That's the whole analysis.

**Where she started.** **[Docs]** The Object Explorer home page offers:

- the **global search bar**, which matches object titles and properties, plus object type, property and saved-exploration names and descriptions. How its matching works is in [07 — Searching the Ontology](07-searching-the-ontology.md);
- object types in **groups**, each with a **graph** of the links between its types;
- a **preview** card per type (description, properties, linked types) and **favourites**.

**[Docs]** If more than **250** object types are visible to a user, the global keyword search covers only the first 250. Narrow by object type group instead. **[Explanation]** One more reason to keep the type count down and the groups meaningful ([11-01](../11-design/01-best-practices.md)).

**What the exploration showed her.** **[Docs]** One chart per **prominent** property by default:

| Chart | For | Filters by |
|---|---|---|
| **Listogram** (or pie) | Strings, booleans, arrays; counts or another aggregation | Clicking values; keep or exclude |
| **Histogram** | Numbers and dates, auto-bucketed | A bucket or a dragged range |
| **Grid plot** | Two properties against each other | A segment |
| **Single statistic** | Sum, average, min, max, count, unique count | Can't filter |
| **Statistics table** | Numeric aggregates grouped by a property | A row |
| **Cluster map** / **choropleth** | Geopoints; region codes with a `choropleth_map_config_id` type class | A bubble or region |

- **[Docs]** Charts can aggregate **linked** objects' properties too. Undo and redo keep the last **5** exploration states.
- **[Docs]** A **layout** saves the charts, table columns and sorts for an object type. Anyone can set a personal default; administrators can set a **global** default, and a personal default wins over it.
- **[Docs]** The **Results** table sorts only on properties with the **Sortable** render hint. Time series columns show the latest value and a sparkline. Properties with an **inline edit** action can be edited in the table, subject to its submission criteria ([08-08](../08-actions/08-using-actions-in-the-platform.md)). Selecting two objects allows *Compare objects*.
- **[Recommendation]** An administrator saves a global default layout for Shipment, built to Daniel's design (late-reason listogram, ETA histogram, region choropleth), so every agent starts from the same picture.

**Saving her work.** **[Docs]**

| Save as | What it keeps | Changes later? |
|---|---|---|
| **Exploration** | The filters | Yes. "Revisit them at any time to see the latest results" |
| **List** | A **static** set of objects, all results or ticked rows | No, unless you update it manually |

Explorations and lists are **private** (your home *Explorations* folder) or **public** (a location you choose). Neither shares the data: "Sharing your list will not share access to the underlying objects", and the explorations page says the same. **[Docs]** If the enrollment blocks saving in home folders, private saves are disabled too.

**Comparing two sets.** **[Docs]** *Compare* puts a second set beside the current one: a saved exploration, all objects of the type, or a new filtered set. Every chart then shows both sets side by side, and filters apply to both. A **comparison view** can be saved and shared like an exploration, again without sharing the underlying data. **[Example]** Lena compares refunds for orders shipped by DHL with those shipped by other carriers, on the same charts.

**[Explanation]** Ama saves *late shipments for Gold customers* as an **exploration**, because tomorrow's answer will be different. She saves *the 14 customers we called on Oct 2* as a **list**, because that is a record of what happened.

## Stop 3 — Acting on a set

Ama selects the 14 orders and opens **Actions**.

**[Docs]** Object Explorer groups the options:

- **Actions**: writeback through action types. The current selection, or all objects if none are selected, is passed to the form. Actions are unavailable for selections over **1,000** objects.
- **Open In**: other apps.
- **Export**: Excel, or copying IDs.

If it isn't clear which parameter the objects belong in, Object Explorer doesn't prefill.

**[Docs]** Two configuration touches, set as **type classes** on action parameters:

- `view_object_with_type:<OBJECT_TYPE_ID>` adds a link to the created or modified object in the success toast;
- `hubble-oe:hide-action` hides an action from Object Explorer.

The home page groups object types by **object type group** ([03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md)). Ungrouped, non-hidden types appear under *Other*.

## Stop 4 — Priya checks the numbers in SQL (beta)

**[Docs]** **Analyze using SQL** opens a read-only Spark SQL scratchpad on an exploration. Reference an object type by RID, or by `` `ontologyApiName`.`objectTypeApiName` ``, and a many-to-many link type by its RID. How it works:

- It queries the **backing datasource** when edits are disabled and there is a single datasource. Otherwise it queries the **materialization**. Types with edits, edit-only properties or several datasources *require* one ([08-01](../08-actions/01-action-types.md#where-the-edit-goes)).
- Edits can take up to **30 seconds** to appear.
- It returns at most **1,000 rows**, and runs on the Contour backend, billed as Contour.
- You can't mix datasets and Ontology inputs in one query.

**[Explanation]** It's a quick consistency check for a data engineer, not a reporting tool. Priya uses it to confirm that object counts match her pipeline output after a rebuild.

## Stop 5 — Daniel configures the Order view

Ama asks for a payment-risk badge and a "contact history" tab on every order.

**[Docs]** A **configured Object View** is built in **Workshop**, in two form factors:

- **full**, for the complete picture;
- **panel**, the most critical data, for embedding in other apps.

Once one exists it becomes the **default**, but users can switch back to the standard view. That toggle isn't yet available inside Workshop.

**[Docs]** Default configured views also exist. They **update automatically** with the object type, until someone edits them. "Once an Object View is edited it becomes user-managed and all further updates must be made manually."

**[Explanation]** That means after Daniel's edit, a new property on Order *won't* appear in the configured view. It will still appear in the standard one. Put "check configured Object Views" on the checklist for schema changes ([04-04](../04-object-types/04-creating-and-editing-object-types.md)).

**Who can edit it.** **[Docs]** It depends on the object type's permission model:

- **project-based**: Editor on the project;
- **Ontology roles**: Ontology Editor on the type;
- **legacy datasource-derived**: the *Object View Admin* application permission, plus Editor on an input datasource.

The Workshop modules inside are permissioned **by the object type**, so viewers of the type can view the modules.

**Versions.** **[Docs]** Each save is a version, and each tab's Workshop module has its own version too. **Automatically publish new versions** is **on by default**. For views with many users or several editors, the docs recommend **turning it off**, so that you save first and publish deliberately. Older versions can be previewed and republished.

**[Recommendation]** Kestrel turns auto-publish off for Order, Shipment and Payment, its high-traffic views.

**Full and panel, in practice.** **[Docs]**

- The **full** view is the object's main page: in Object Explorer, in a Workshop **Object View widget** (often in an overlay), and in a modal opened from a panel's title.
- **Panels** appear in Vertex, Map, Gaia and Workshop. There are two kinds: an **object instance** panel (one object; default: a Property List of prominent properties) and an **object set** panel (several objects of one type; default: a *Charts* tab with up to five XY charts and a *List* tab showing up to three properties per object).
- **[Docs]** In the editor, each tab of a full view is one Workshop module. **Deleting a tab deletes its module.** With a single tab, the tab title is hidden.
- **[Docs]** The default configured full view is a Property List of prominent properties plus a Links widget.

**Branching it.** **[Docs]** Object Views work with Global Branching ([14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md)):

- Two kinds of resource go on a branch: the **OV-managed modules** (one per full-view tab, plus the instance panel and the set panel) and the **full Object View tabs** resource (adding, deleting, renaming tabs, profiles, visibility).
- A branched view can use object and action types created on the same branch, and be previewed in Ontology Manager's *Object views* tab.
- Before merge: edit permission, a **rebase** on main for each resource, and no legacy fields changed. Rebasing tab configuration is separate from rebasing tab content.
- If the object type uses **datasource-derived** permissions, merging needs **Editor on every backing datasource** plus *Object View Admin*. That's stricter than editing on main, which needs Editor on any one datasource. With project-based permissions or Ontology roles, edit access on the type is enough.
- An object type's **project approval policy** also applies to its Object Views and their modules.
- **Inherited protection isn't released yet.** "An object view and the modules that make up its tabs and panels can still be edited directly on main even if the parent object type is protected." Legacy tabs can't be edited on a branch.

**[Explanation]** Kestrel's change policy ([14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md)) protects `Order`, but until inherited protection ships, its Object View can still be changed on main. Turning auto-publish off (above) is the interim guard.

**Packaging it.** **[Docs]** Marketplace products can include Object View tabs built with the **Workshop tab builder** only; legacy tabs must be rebuilt first ([14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md)).

## Stop 6 — Linking in from elsewhere

Kestrel's ticketing tool needs a link from each ticket to the order.

**[Docs]** URL patterns (paths below `/workspace/hubble/`):

| To open | Path |
|---|---|
| An object, by primary key | `external/object/v0/<object-type-id>?<primary-key-property-id>=<value>` |
| An object, by RID (recommended when the key may contain special characters) | `external/search/v2/?objectId=<objectRid>` |
| An object with no Object Explorer wrapping | `objects/<objectRid>` |
| A keyword search | `external/keyword/v0/<url-encoded text>` |
| A new exploration of a type | `exploration?objectTypeId=<id>`, plus `&perspectiveId=results` for the table |
| A saved exploration or object set | `exploration/saved/<rid>`, or `external/objectSet/v0/<rid>` for a set made elsewhere |
| A filtered search | `external/search/v2/{<url-encoded filter JSON>}`: many property filters, only **one** link filter |

- **[Docs]** Add `embedded=true` to load a view in an iframe without the workspace sidebar.
- **[Docs]** The docs' tip for building the filter JSON: build the search by hand, then run `await hubble_get_current_search()` in the browser console. The example format "may be out of date".
- **[Recommendation]** Kestrel's tickets link to orders by primary key (`orderId=O-10442`). Links to shipments use the **RID** form, because shipment keys contain `|` (`DHL|77812`, [04-03](../04-object-types/03-primary-keys-and-titles.md#kestrel-decisions)).

**Comments.** **[Docs]** Any Object View has *View comments*: comments with mentions, files and images, attached to the object. They're unrelated to Workshop's Comment widget. **[Example]** Ama leaves a note on `O-10442` for the night shift instead of a spreadsheet row.

---
[Module index](README.md) · Previous: [01 — Choosing an Ontology-aware app](01-choosing-an-ontology-aware-app.md) · Next: [03 — Workshop and Slate](03-workshop-and-slate.md)
