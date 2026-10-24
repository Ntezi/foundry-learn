# 05 — Specialized apps

*Sources: [Vertex](https://www.palantir.com/docs/foundry/vertex/overview/) · [Vertex: explore object relationships](https://www.palantir.com/docs/foundry/vertex/explore-object-relationships/) · [Vertex: events](https://www.palantir.com/docs/foundry/vertex/events-overview/) · [Vertex: configure events](https://www.palantir.com/docs/foundry/vertex/configure-events/) · [Machinery](https://www.palantir.com/docs/foundry/machinery/overview/) · [Machinery core concepts](https://www.palantir.com/docs/foundry/machinery/core-concepts/) · [Connect data to Machinery](https://www.palantir.com/docs/foundry/machinery/connect-data/) · [Map](https://www.palantir.com/docs/foundry/map/overview/) · [Quiver](https://www.palantir.com/docs/foundry/quiver/overview/) · [Foundry Rules](https://www.palantir.com/docs/foundry/foundry-rules/overview/) · [Foundry Rules object model](https://www.palantir.com/docs/foundry/foundry-rules/object-model/) · [Dynamic scheduling](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-overview/) · [Scheduling Ontology primitives](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-ontology-primitives/) · [Draw a Machinery process](https://www.palantir.com/docs/foundry/machinery/draw-a-graph/) · [Process mining](https://www.palantir.com/docs/foundry/machinery/process-mining/) · [Analyze and monitor a process](https://www.palantir.com/docs/foundry/machinery/analyze-and-monitor/) · [Vulcan](https://www.palantir.com/docs/foundry/vulcan/overview/) · [Gotham integration](https://www.palantir.com/docs/foundry/object-link-types/enable-gotham-integration/) · [Objects from Gaia](https://www.palantir.com/docs/foundry/object-link-types/create-ontology-objects-from-gaia/) · checked October 2, 2026 · Ready for Review*

Each specialized app expects the Ontology to have a particular **shape**. This note is a set of cards. Each card says what the app is for, what it needs from the model, and what Kestrel would have to add. Read it as a modelling checklist, not a product tour.

---

### Quiver — analysis and dashboards

**For:** point-and-click analysis on **object and time series** data; dashboards that embed in Workshop; charts for Notepad. **[Docs]** It has two modes:

- **canvas** mode, for organizing and presenting cards;
- **graph** mode, for inspecting card dependencies and data flow.

It also has a formula language, transform tables, parameterization, and **writeback through actions**.

**Needs from the Ontology.** **[Docs]** Links, so "users do not have to perform joins or identify primary or foreign keys". Quiver is optimized for **time series properties**, with a time series library and a dedicated time series database.

**Kestrel.** Lena's weekly refunds dashboard needs Refund → Order → Product category links, and a `reason` property with an enum value type, so the groups are clean. **Nothing new.**

---

### Map — geospatial

**For:** geospatial and temporal analysis: network traversal, bounding-box and polygon search, imagery, movement paths, drawing shapes, geospatial actions, and map templates.

**Needs.** **[Docs]** Geo properties in **WGS 84** (EPSG:4326) latitude and longitude. Map renders in Web Mercator. Geoshapes and geotemporal series appear on maps elsewhere too ([02](02-object-views-and-object-explorer.md)).

**Kestrel.** `Warehouse.location`, `Order.deliveryLocation` and the `DeliveryZone.boundary` geoshape ([05-08](../05-properties/08-time-series-media-geo-and-vectors.md)). **[Explanation]** Check what coordinate system the WMS exports. If it isn't WGS 84, convert it in the pipeline, not in the app.

---

### Vertex — graphs, cause and effect, simulation

**For:** "visualize and quantify cause and effect across the digital twin". **[Docs]** It offers:

- graph exploration through right-click **Search Arounds**;
- **multi-step, filtered, parameterized** Search Arounds;
- derived-property **functions** on nodes;
- **events and time series**;
- **scenarios** and chained models;
- templates and embedding in Workshop.

It displays object-backed links with the backing object's title ([06-02](../06-links/02-many-to-many-and-object-backed-links.md)).

**Needs.** **[Docs]** Meaningful **links**, because a graph is only as good as its edges. **Events** are object types with "minimally, two timestamps that indicate the start and end". Severity colours come from a Vertex **type class** (`kind: vertex`, `name: event_intent.warning` / `danger` / `primary` / `success`), usually set on the primary key.

**Kestrel.** Tomás's fraud-ring view needs `Payment ↔ CardFingerprint` and `Payment ↔ Device` links, which the model doesn't have yet. *Delivery exceptions* as Vertex events need `startedAt` and `resolvedAt`. **[Explanation]** If the fraud question is "which payments *share* a fingerprint", promote the fingerprint to its own object type, `CardFingerprint`. A property can't be an edge (see the *property or link?* question in the [topic map](../MAP.md#by-design-question)).

---

### Machinery — processes and process mining

**For:** modelling a process as **states and transitions**, mining it from event logs, monitoring bottlenecks, and orchestrating AIP automations. The docs' examples include *order-to-cash*.

**Needs.** **[Docs]** This is the strictest card:

- A **process object** type with a **string state property**, whose values are **enumerable**. "Every object must be in one of the possible states at any given time." Use separate processes for parallel states.
- Backing the state with an **enum value type** keeps Machinery in sync ([05-02](../05-properties/02-value-types.md)).
- **Actions** cause transitions.
- A **log object type**, maintained by Machinery. Don't define actions on it. It has required fields `Log ID`, `Process ID`, `Old state`, `New state` and `Timestamp`, plus optional ones such as duration, path, action type RID and owning RID.
- Machinery installs a **Marketplace product**: a Pipeline Builder pipeline plus the log type, linked to the process type. It is fed by:
  - a **changelog dataset** (`processId`, `state`, `timestamp`, optional `isDeleted`) for changes made outside Foundry;
  - **edit history** on the process type, for platform edits. That isn't supported for types with **multiple datasources or row-level permissions**.
- Changing a state in Machinery **doesn't** update the Ontology data, or anything that depends on the state, such as criteria or automations.

**Kestrel.** `Order.status` already has an enum value type, which makes Order a good candidate for an *order-to-cash* process. Order also has a **single datasource and no row-level security** ([12-03](../12-security-and-governance/03-object-and-property-security.md#three-kestrel-requirements)). So platform edits, such as *Hold order* and *Cancel order*, **can** be tracked through edit history ([13-03](../13-backend-architecture/03-edits-and-materializations.md#edit-history-more-closely)).

**[Explanation]** A *shipment* process would be different. Shipment has a **regional object security policy**, which Machinery's docs exclude ("row-level permissions"). Its transitions would need a changelog derived in the pipeline instead. This modelling and security decision is made long before anyone opens Machinery.

---

**Building and using the model.** **[Docs]**

- **Drawing:** a *process container* stands for one entity type and its states. Edges into an action are its allowed **input states** (enforceable through submission criteria); edges out are possible **output states** (not enforced). Automations are actions triggered when an input state is reached. Renaming a state in Machinery doesn't change the data.
- **Mining:** derives states and transitions from process objects, log objects or both; a **log object type is recommended**. New elements show in amber, known ones in grey, and modelled-but-unseen ones dashed. A transition filter keeps the most frequent top x %, and excluded values are remembered.
- **Monitoring:** the **Machinery widget** in Workshop takes one object set per root process, derives subprocess sets through links, and shows count and duration views, a path explorer and a duration distribution. Graph selections drive **output object sets**. Only **conforming** processes are counted, unless a log type has more than **1M** objects, when conformance filtering switches off.

### Foundry Rules — business rules as data

**For:** low-code rules over datasets, objects and time series, for **alerting** (AML-style transaction flags) or **categorization** (cohorts). It was previously called *Taurus*.

**Needs.** **[Docs]** Rules are themselves **objects**: metadata, custom output properties, and a **logic property** stored as compressed JSON. Changes can go through **proposals**, which are objects too, with old and new values and a status, like pull requests built from objects and actions.

**Kestrel.** Tomás's fraud rules ("more than 3 payments from one fingerprint in 10 minutes") are a natural fit. The outputs land as alerts that Automate can act on ([06](06-automate-and-ontology-events.md)).

---

### Dynamic Scheduling — resources and time

**For:** Gantt-style scheduling and resource allocation in Workshop, with drag and drop, suggestions, validation rules, and actions.

**Needs.** **[Docs]** At least two object types:

- a **Schedule** object with a **string foreign key** to the resource, plus **start and end timestamps**;
- a **Resource** object, linked many-to-one or many-to-many.

More resource types (aircraft *and* mechanic) are allowed.

**Kestrel.** Warehouse pick-wave planning: `PickWave` is the schedule, and `Warehouse` and `Picker` are resources. **[Explanation]** The string foreign key is required, so it makes the many-to-one form the simplest. Decide that when you design the link ([06-01](../06-links/01-link-types-and-cardinality.md)).

---

### Vulcan — 3D models

**For:** viewing CAD models, engineering drawings and point clouds, with annotations, measurements and sections.

**Needs.** **[Docs]** A **CAD object**: an object with a property carrying the `cad_media_reference` type class, pointing at a model file (GLB, GLTF, STL, OBJ, PLY, 3MF; DXF drawings; LAS/LAZ point clouds). Annotations, measurements and section planes saved in Vulcan are themselves Ontology objects. **Kestrel:** no use today.

### Gotham and Gaia — for enrollments with both platforms

**[Docs]**

- **Type mapping** exposes Foundry object types to Gotham, which then queries them through the Object Set Service. An administrator enables it; once on, it can't be turned off, and only one ontology per Gotham install can use it. Enrollments with *Map Rendering Service* can skip it. Type-mapped objects need a **geopoint** to appear on a Gaia map, and Gotham carries over Foundry's dataset security and markings.
- **Creating objects from Gaia**: shapes, points or tactical graphics drawn on a map become objects of a type implementing the *Creatable Geoshape*, *Creatable Geopoint* or *MILSTD 2525C Symbol* **interface**, with the interface's **action type constraint** fulfilled ([07-03](../07-interfaces/03-interface-links-and-action-constraints.md)). The older *Gaia … Creatable* interfaces are being deprecated.

**[Explanation]** Not relevant to Kestrel, but a clean example of interfaces as a **platform contract**: Gaia works with any type that implements the interface.

## What the cards have in common

| Requirement | Apps that depend on it |
|---|---|
| Named, meaningful links | Quiver, Vertex, Dynamic Scheduling, Object Explorer |
| Enum value types on status-like properties | Machinery, Quiver grouping |
| Start and end timestamps on event-like types | Vertex events, Dynamic Scheduling, Machinery logs |
| WGS 84 geo properties | Map, Object Views |
| Single datasource, no row-level security | Machinery edit tracking, SQL without materializations ([02](02-object-views-and-object-explorer.md#stop-4--priya-checks-the-numbers-in-sql-beta)) |

**[Explanation]** None of these is exotic. They are the modelling habits from modules 04–07. The specialized apps just make it **visible** when you skipped one.

---
[Module index](README.md) · Previous: [04 — OSDK and APIs](04-osdk-and-apis.md) · Next: [06 — Automate and Ontology events](06-automate-and-ontology-events.md)
