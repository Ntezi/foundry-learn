# 03 — Variable types

*Sources: [Variable recompute behavior](https://www.palantir.com/docs/foundry/workshop/variable-recompute/) · [Variable transformations](https://www.palantir.com/docs/foundry/workshop/variable-transformations/) · [Object set filter variables](https://www.palantir.com/docs/foundry/workshop/object-set-filter-variables/) · [Struct variables](https://www.palantir.com/docs/foundry/workshop/struct-variables/) · [SQL query variables](https://www.palantir.com/docs/foundry/workshop/sql-query-variables/) · checked October 18, 2026 · Ready for Review*

Five topics from the docs' *Variable types and usage* group, each answering one practical question. The basics (types, definition types, lazy loading) are in [01-03](../01-workshop-foundations/03-variables-and-interfaces.md).

## Recompute behaviour

*When does a computed value update?*

**[Docs]** For supported definitions (function, object set aggregation, object property, variable transformation, object set filter, SQL query), choose under **Recompute variable value**:

| Option | Computes | Inputs change or data refreshes | Good for |
|---|---|---|---|
| **Automatically** (default) | When needed | Recomputes, even if the value ends up unchanged | Totals that track selections |
| **Only when triggered by an event** | On a *Recompute {variable}* event only | Doesn't recompute | A calculation run after the user finishes several inputs and clicks |
| **On module load, and when triggered by an event** | Once when first needed, then on events | Doesn't recompute | A calculated default the user decides when to refresh |

**[Docs]** Behaviours that surprise people:

- **Object set definition** variables don't support recompute settings. Control their inputs (an object set filter, say) or define the set with a function instead.
- Recomputing a variable **doesn't recompute its inputs** if those inputs are themselves event-only. Make sure they are ready first.
- Recomputation **overwrites user changes**. If a widget or *Set variable value* edits a computed variable, the next recompute replaces it. Keep user-entered values in a separate static variable.
- Controlling when a function returning an object set recomputes **doesn't freeze the table**: the widget can still reload its objects after an action or refresh.
- Actions, *Refresh data* and auto-refresh can recompute automatic variables.
- Events don't wait: *Recompute* followed by *Set variable value* in one list can copy the old value or a loading state ([01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md#order-of-execution-the-trap)).

**[Docs]** To find what is recomputing, use the variable lineage graph ([01-03](../01-workshop-foundations/03-variables-and-interfaces.md#the-variable-lineage-graph)).

## Variable transformations

*Can I compute this without writing a function?*

**[Docs]** Variable transformations chain simple operations and **run in the browser**; operations on primitive types don't call Foundry services. The families:

| Family | Examples |
|---|---|
| General | String concatenation (also the way to turn any primitive into a string), if/else, casts from string to numeric, date, timestamp, geopoint, geoshape; timestamp ↔ date with a chosen time zone |
| Object set | Is empty / is not empty, object property, aggregation (min, max, sum, average, cardinality), object RID |
| Maths | Add, subtract, multiply, divide, absolute, negate, ceil, floor, round, max, min |
| Date and time | Relative date or time, between dates or times, current date; before/after/equal comparisons |
| Numeric, string, Boolean comparisons | Equal, less than, contains, starts with, is null… |
| Geospatial | Geohash, latitude, longitude, MGRS from a geopoint |
| Arrays | Compose, intersection, update or get element, length; contains, is subset of |
| Struct | Extract a struct field |

**[Example]** A section with a *Hold order* button that shows only for orders promised in the next two days: *Relative date* (today + 2) → *Is on or before* (`promisedDeliveryDate`, that date) → a Boolean that is **true** for those orders. Conditional visibility hides a section when its variable is true by default, so switch the selector to hide it when **false** ([02-04](04-embedding-modules.md#variable-backed-layouts)). No function to write, deploy or permission.

## Object set filter variables

*How do I reuse what a user filtered?*

**[Docs]** An object set filter variable holds a filter state, usually the output of a Filter List, XY Chart, Vega Chart or Pivot Table, and can be applied to object set variables or widgets. It can start empty or with a default filter. Default filters support:

- **IS**: exact match;
- **NULL**: property is null;
- **CONTAIN**: currently **prefix** matching only (`id0001` matches `id000123`; `d0001` doesn't).

**[Docs]** With several object types in one filter, filter on properties they all share, or behaviour can be unexpected (especially after a Marketplace install).

**[Docs]** **Filter value extraction** copies values out of a user's filter into ordinary variables: set the default filter's values to variables and turn on *Update used variables on filter value changes*. Only **numeric ranges**, **date/time ranges** and **values into an array variable** can be extracted (a non-array variable gets only the first value). It works only when the user's filter has the same **shape** as the default. Nested or disjoint ranges from pivot tables and some charts, an XY Chart with a numeric axis, and negations that the default doesn't also negate all break it.

**[Docs]** Extraction doesn't itself filter anything else. To carry a filter to another property, use the extracted variables in a **second** filter on the target property. Filter variables can't be used as values inside another filter, so the values must pass through primitive variables. If the user's filter drops the source property, the extracted variables clear and the second filter is dropped (not matched to nothing).

**[Example]** Ama's team filters orders by `promisedDeliveryDate`. A shipments panel should show the same date window on `Shipment.eta`. Default filter on the orders filter variable: `promisedDeliveryDate` between `$from` and `$to`, extraction on. A second filter on the shipments set: `eta` between `$from` and `$to`. When the agent clears the date filter, the shipments panel shows all dates again.

## Structs

*How do I carry several related values, or non-Ontology rows, through a module?*

**[Docs]** A **struct variable** has named fields of other Workshop types; nested structs aren't supported, and fields of unsupported types are dropped. It can be set statically, from an object's struct property, from a function returning a custom type, or from a SQL query. **Struct arrays** come from struct array properties, functions or SQL.

**[Docs]** Widgets and transformations can't use a whole struct: extract a field first (*Extract struct field*). Structs can be function **inputs**; *Preview schema* shows the fields the function expects. Struct arrays can drive a **loop layout**, which needs fewer load calls than looping over objects and can show data that isn't in the Ontology ([04](04-embedding-modules.md#loop-layouts)).

## SQL query variables

*What if the calculation is natural in SQL?*

**[Docs]** A SQL query variable runs one **Ontology SQL `SELECT`** against the module's object set (and interface set) variables, bound as **tables**, with other variables bound as **parameters**. It recomputes when a bound parameter changes. Nothing is published separately: the query lives in the module, and isn't reusable elsewhere (use a SQL function for that).

**[Docs]** The result must fit the variable type:

| Variable type | Query must return |
|---|---|
| String, numeric, Boolean, date, timestamp | Exactly one row and one column (more fails; it doesn't take the first) |
| Array of those | One column, fewer than **10,000** rows (10,000 or more fails and asks for a `LIMIT`); nulls skipped; array cells flattened |
| Struct | One row (more fails; none leaves it unset); each column becomes a field |
| Struct array | Fewer than 10,000 rows; each row becomes a struct; no rows gives an empty array |

Object set, geopoint and geoshape variables can't be SQL-backed.

**[Docs]** Rules that catch people out:

- Reference tables and parameters as `@alias`; a column as `@alias.column`; escape a column called `date` with backticks.
- Every bound table needs at least one **selected column**, including every column used in a `JOIN … ON`.
- Joins must be primary key to foreign key. **Many-to-many** isn't supported yet.
- Struct fields need unique, plain names: alias computed columns (`COUNT(*) AS order_count`). Expand a struct column with `@t.addr.*`; selecting it directly fails.
- Each successful run **re-derives struct fields**, so a widget bound to a field the new query no longer returns breaks.
- The **Query preview** shows up to 50 raw rows, even for queries the variable would reject. AIP can generate a query from a description, limited to your bound aliases.

**[Example]** Kofi wants the five carriers with the most late shipments in his region, as a struct array for a ranked list. Table `@late`: his region's shipments where `isLate` is true, with `carrierCode` selected.

```sql
SELECT carrierCode AS carrier,
       COUNT(*) AS late_shipments
FROM @late
GROUP BY carrierCode
ORDER BY late_shipments DESC
LIMIT 5;
```

**[Explanation]** Each row becomes a struct `{carrier, late_shipments}`, ready for a loop layout or a list. Untested: the docs' examples don't show `GROUP BY`, so check it against the Ontology SQL dialect reference before relying on it. The page doesn't say how the query treats row-level security on the bound sets; we assume it respects Shipment's regional policy like the object set itself, but haven't confirmed it ([RQ-03](../SOURCES.md#open-research-questions)).

---
[Module index](README.md) · Previous: [02 — Functions and derived properties](02-functions-and-derived-properties.md) · Next: [04 — Embedding modules](04-embedding-modules.md)
