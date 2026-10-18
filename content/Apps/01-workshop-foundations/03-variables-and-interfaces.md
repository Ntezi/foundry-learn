# 03 — Variables and interfaces

*Sources: [Variables](https://www.palantir.com/docs/foundry/workshop/concepts-variables/) · [Use ontology interfaces in Workshop](https://www.palantir.com/docs/foundry/workshop/ontology-interfaces/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Variables are a module's state. Widgets read them as inputs and write them as outputs; events change them; other variables are computed from them. Nearly every Workshop question ("why didn't this update?", "why is this slow?") is a question about a variable.

## Two choices per variable: type and definition

**[Docs]** A variable has a **type** (what it holds) and a **definition type** (where its value comes from).

| Type | Holds | Can be initialised from |
|---|---|---|
| String, Numeric, Boolean, Date, Timestamp | One value | Static value, function, aggregation, object property |
| Array | Booleans, dates, numbers, geopoints, geoshapes, strings, timestamps or structs | (as its element type) |
| GeoPoint | A geopoint | Object property |
| GeoShape | A geoshape | Object property, function |
| **Object set** | One or more objects | Object type, **ontology interface** or another object set variable; then filters, Search Arounds, pivots through shared property types or object-backed links |
| **Object set filter** | Property/value pairs that filter object sets | Object type plus filter pairs ([02-03](../02-workshop-data-and-logic/03-variable-types.md#object-set-filter-variables)) |
| **Struct** | Named fields of other types; no nesting | Function output ([02-03](../02-workshop-data-and-logic/03-variable-types.md#structs)) |
| Time series set | One object's time series property | Object property |

| Definition type | Use it for |
|---|---|
| Static | A value set by hand or by events |
| Function | A value computed by a published function ([02-02](../02-workshop-data-and-logic/02-functions-and-derived-properties.md)) |
| Object set aggregation | A count, sum, min/max or similar over a set |
| Object set definition | An object set built from a type or interface, filters and traversals |
| Variable transformation | A chain of simple operations, run in the browser ([02-03](../02-workshop-data-and-logic/03-variable-types.md#variable-transformations)) |
| SQL query | One Ontology SQL `SELECT` over the module's object sets ([02-03](../02-workshop-data-and-logic/03-variable-types.md#sql-query-variables)) |

**[Docs]** "Complex non-performant object properties are not supported as variables in Workshop."

## The Variables panel

**[Docs]** Things worth knowing:

- **Names** must be unique, compared without case (`MyVar` and `myvar` clash; Workshop adds a number). There are **no folders**; the docs suggest prefixes such as `$page_Dashboard_filterState` or `$tab_Overview_selectedObject` to group names.
- **New variable from current** (object sets only) creates a new set that takes the current one as its input.
- **Settings** gives a variable an **external ID** and switches on three features: **module interface** (embedding and URLs, [02-04](../02-workshop-data-and-logic/04-embedding-modules.md)), **routing** and **state saving** ([04-03](../04-workshop-in-production/03-routing-state-and-presentation.md)).
- Unused variables can be deleted; used ones can't.

**[Example]** The Delivery Desk queue's variables ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)):

| Variable | Type · definition |
|---|---|
| `atRiskOrders` | Object set · object set definition (Order, status PAID, PICKING or ON_HOLD, promised within 3 days) |
| `orderFilters` | Object set filter · output of the Filter List |
| `selectedOrder` | Object set · Object Table active object |
| `customerCases` | Object set · interface `Case`, filtered to the selected order's customer |

As the queue grows more pages, the prefix convention would turn these into `$page_Queue_atRiskOrders` and so on, so the panel sorts them by page.

## When values are computed

**[Docs]** **Lazy loading**: in view and edit mode, a variable is computed only when a visible widget, layout or another required variable needs it, including inside embedded modules. A variable used only in a hidden tab can wait until the tab opens. Some uses, such as layout visibility, still force computation while a section is hidden.

**[Docs]** **Recompute**: supported definitions can recompute automatically (the default), only on a *Recompute* event, or on load and then on events. The options and their limits are in [02-03](../02-workshop-data-and-logic/03-variable-types.md#recompute-behaviour).

## The variable lineage graph

**[Docs]** The lineage graph (from the Variables panel header) draws variables and widgets as nodes. Chevrons expand parents (upstream) and children (downstream); *Show all* expands everything. Two toggles help debugging:

- **Show pages and overlays** tags nodes with where they are used.
- **Show computation time** shows when each value was last computed in the app, not when the data last changed. Slow variables are candidates for splitting or for event-only recompute.

**[Recommendation]** Open the graph before changing a variable that more than one page uses. It answers "what breaks if I change this?" faster than clicking through widgets.

## Interfaces: one widget for several object types

**[Docs]** An object set variable can start from an **ontology interface** (*All resources › Interfaces* in the starting set picker). It then holds objects of every type that implements the interface, subject to the user's permissions; a newly implementing type joins without rebuilding the set.

**[Docs]** Supported widgets configure against the **interface's** properties: Object List, Object Table, Filter List, Metric Card, Object Dropdown and Property List. Others show *Interfaces not yet supported* and fall back to the implementing types' own properties.

**[Docs]** **Cast as** switches a set between an interface and a compatible object type. Casting a type-based set to an interface keeps the same objects; casting an interface set to one type narrows it. An object set definition allows **one** type-changing step: one cast *or* one traversal.

**[Explanation]** The Cases tab on the Delivery Desk queue is the worked example, including the open question about traversing interface links ([RQ-25](../../Ontology/SOURCES.md#open-research-questions)): see [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md). Don't confuse **ontology interfaces** with the **module interface**, which is the set of variables a module exposes to its parent or URL ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md#the-module-interface)).

---
[Module index](README.md) · Previous: [02 — Layouts, widgets and events](02-layouts-widgets-and-events.md) · Next: [04 — Permissions](04-permissions.md)
