# 01 — Core display widgets

*Sources: [Core display widgets](https://www.palantir.com/docs/foundry/workshop/widgets-core-display/) · [Object Table](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/) · [Object List](https://www.palantir.com/docs/foundry/workshop/widgets-object-list/) · [Object View](https://www.palantir.com/docs/foundry/workshop/widgets-object-view/) · [Property List](https://www.palantir.com/docs/foundry/workshop/widgets-property-list/) · [Links](https://www.palantir.com/docs/foundry/workshop/widgets-links/) · [Object Set Title](https://www.palantir.com/docs/foundry/workshop/widgets-object-set-title/) · [Formatting](https://www.palantir.com/docs/foundry/workshop/formatting/) · checked October 18, 2026 · Ready for Review*

The widgets that show objects. Most modules are built from the first two; the Object Table alone has more settings than some whole apps, so it gets most of this note.

## The family at a glance

| Widget | Shows | Outputs | Pick it when |
|---|---|---|---|
| **Object Table** | An object set as rows | Active object; selected objects (multi-select on) | Many attributes, comparison, sorting, bulk work |
| **Object List** | An object set as cards, in a list or grid, optionally with images | Active object; selected objects | Few attributes, quick review, images |
| **Object View** | One object's full or panel Object View | — | A detail pane for the selected row |
| **Property List** | Chosen properties of **one** object (the first in the set) | — | A compact detail block, optionally editable |
| **Links** | An object's link types and linked objects, expandable | — | Exploring relationships |
| **Object Set Title** | One object's title, or the type name and count | — (drag source) | A heading or a count |

**[Docs]** The overview also lists a *Header text* widget (two rows of text for a header) with no page of its own.

## Object Table

### Columns

**[Docs]** Columns can be properties, linked objects, parameterised URLs, **time series** (latest value plus a sparkline), **derived properties** declared in the module, and **function-backed columns**. Viewers can choose and reorder columns themselves unless *Hide column configuration* is on. A column's display name is copied when added; renaming the property in the Ontology later doesn't rename the column.

**[Docs]** *Variable-backed visibility and order* drives the visible columns and their order from a string array of column API names (empty means all). With **state saving**, that array is how a user's column layout is kept: give the array an external ID and enable it for state saving.

**[Docs]** Large properties (geoshape, vector) aren't loaded by default; viewers select the cell's "…" to load one.

### Function-backed columns

**[Docs]** The function must take an `ObjectSet<T>` (an array works but is slower) and return a map from object to a value or custom type: `FunctionsMap<T, V>` in TypeScript v1, `Record<ObjectSpecifier<T>, V>` in TypeScript v2, `dict[T, V]` in Python. One function returning a custom type can fill **several** columns at once, which the docs recommend for performance.

**[Docs]** When configuring inputs, **Use a runtime input** passes only the objects currently displayed; **Use a variable input** passes the whole object set and can be slower.

**[Docs]** Sorting on a function-backed column waits for the function to run for every row. It can't be combined with property sorts; above **10,000** objects users can't sort it, and a default sort on it only sorts each loaded page.

### Writing from the table

**[Docs]** Two ways:

- **Inline editing**: users edit cells, then submit. The backing action must use a single *Modify object* rule (or be function-backed); every edited property must come **from a parameter**; parameters must be single primitive types; none may be hidden. Users can stage up to **20** rows for function-backed actions and **200** for others. Matching parameter IDs to property IDs maps columns automatically.
- **Custom right-click menu**: items that run an action or an event on the right-clicked row, through a *right-clicked object* variable.

### Selection and display

**[Docs]** The first row becomes the **active object** on load (when the widget becomes visible) unless auto-selection is disabled. *On active object selection* runs events. Display options include rows per line, frozen columns, wrapping (including struct values), narrow headers (50 → 30 px), conditional formatting colouring the whole cell, security marking pills, a custom empty state, and an image from a URL property tagged with the `hubble:icon` type class.

**[Docs]** **CSV export** from the right-click menu handles up to **10,000** rows, including function-backed and linked columns.

**[Example]** On the Delivery Desk queue ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)):

| Need | Setting |
|---|---|
| Risk score per order | Function-backed column: a function taking the orders and returning, per order, `deliveryRisk` of its latest shipment; **runtime input** so only the visible page is scored |
| Hold from the row | Right-click item *Hold order*, with `order` = the right-clicked object |
| Agents keep their own column layout, when they save a queue | Variable-backed visibility + a string array enabled for state saving (saved only when the user saves a state, [04-03](../04-workshop-in-production/03-routing-state-and-presentation.md#state-saving)) |
| No export of Kofi's regional view | Leave CSV export off ([01-04](../01-workshop-foundations/04-permissions.md#what-row-and-column-controls-dont-cover)) |

**[Explanation]** Sorting by risk would make the queue wait for every row's score, and there is no sorting at all above 10,000 orders. The queue stays small (open orders due within three days), so a default sort on risk is acceptable here; on a full order table it wouldn't be.

## Object List

**[Docs]** Cards in a list or grid, with an optional image (URL, attachment or media reference) as a large picture or an icon. One default sort; users can sort if enabled; nulls can be hidden per object; a title and an object count can show above the list.

**[Docs]** **Reordering** by drag and drop writes the new order into a **primary key array** variable. It works within one list, not in grid layout, and shows only the first **500** objects. The array isn't saved anywhere: pass it to an action (the *Reordered array* parameter) to persist it.

## Object View, Property List, Links, Object Set Title

**[Docs]**

- **Object View**: full or panel form factor; standard or configured view. The full form shows only the **first** object; the panel can show one object, a set, or adapt (*Adaptive*: one object → object view, zero or many → set view). Tabs can be hidden, and an initial tab set. *Interface configuration* maps module variables to a configured view tab's module interface (not supported for legacy tabs).
- **Property List**: properties of the first object; stacked or side-by-side labels; columns; can load from a scenario. Inline editing works when the property has an **inline action** configured in Ontology Manager.
- **Links**: all link types, or chosen ones with label overrides and sorts; buttons to open a link type or a linked object in Object Explorer; hover previews.
- **Object Set Title**: one object's title, or "type name + count". *Enable drag* makes it a drag source (fewer than **500** objects); it can render a placeholder or nothing when empty.

## Formatting

**[Docs]** Workshop's own **value formatting** (decimals via *Fraction digits*, significant digits, grouping, notation) and **conditional formatting** apply to **time series** columns in the Object Table and time series displays in the Metric Card, and are local to the module. Ordinary property columns use the formatting set on the property in Ontology Manager; function-backed columns get conditional formatting in the widget.

---
[Module index](README.md) · Next: [02 — Charts and maps](02-charts-and-maps.md)
