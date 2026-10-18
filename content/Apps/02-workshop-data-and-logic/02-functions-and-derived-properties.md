# 02 — Functions and derived properties

*Sources: [Functions on objects](https://www.palantir.com/docs/foundry/workshop/functions-overview/) · [Use Functions in Workshop](https://www.palantir.com/docs/foundry/workshop/functions-use/) · [Derived properties in Workshop](https://www.palantir.com/docs/foundry/workshop/derived-properties/) · checked October 18, 2026 · Ready for Review*

Workshop has several ways to show a value the Ontology doesn't store. This note covers the two that come up most, **functions** and **Workshop derived properties**, and ends with a table for choosing among all of them.

## Three places a function plugs in

**[Docs]** Functions on objects are used in a module in three ways:

1. **Function-backed variables**: a variable whose value is a function's output, shown in a widget such as a Metric Card.
2. **Function-defined object sets**: a function returns the object set a widget loads.
3. **Function-backed actions**: a function as the rule of an action type, for edits beyond the built-in *add/modify/delete object* and *add/delete link* rules. In Workshop it is offered like any other action ([01](01-actions-in-workshop.md)).

## A function-backed variable, step by step

**[Docs]** The docs' example counts an aircraft's flights to an airport. Wiring it up:

1. Create a variable of the function's return type (here **Numeric**) and choose **Function** as its definition.
2. Pick the function. It appears in the picker only if it is **tagged with a release version**.
3. Map each input to a variable: the aircraft from the selected object, the airport code from another variable. (Python functions show their inputs in snake_case.)
4. Show the variable in a widget, such as a Metric Card.

**[Docs]** Two behaviours to plan for:

- **Caching.** "Function-backed variables cache their results": the same inputs return the cached value. To force a new run, use a *Set variable value* event or change the variable's [recompute behaviour](03-variable-types.md#recompute-behaviour).
- **OAuth sources.** A function that calls a source using an OAuth 2.0 outbound application can't show the authorization prompt when it runs as a variable or widget content; if the user hasn't authorized yet, it fails. Wrap it in a **function-backed action**, which can show the prompt.

**[Docs]** The page shows the same function in TypeScript v1, TypeScript v2 and Python, and the difference matters for a variable that recomputes whenever its inputs change: TypeScript v1 loads every linked flight with `.all()` and counts in memory, while TypeScript v2 and Python filter the linked object set and ask the Ontology for a count.

**[Example]** The Delivery Desk queue's metric *Open orders for this customer* is the same shape:

```typescript
// TypeScript v2: count on the server, return one number
import { Osdk } from "@osdk/client";
import { Integer } from "@osdk/functions";
import { Customer } from "@ontology/sdk";

export default async function openOrdersForCustomer(
    customer: Osdk.Instance<Customer>
): Promise<Integer> {
    // `orders`: the many side of Order → Customer (Ontology 17-02); the API name is our assumption
    const result = await customer.$link.orders
        .where({ status: { $in: ["PAID", "PICKING", "ON_HOLD"] } })
        .aggregate({ $select: { $count: "unordered" } });
    return result.$count;
}
```

**[Explanation]** The variable's input is the selected order's customer, so it recomputes on every row click. Counting on the server keeps that click fast for Kestrel's large customers; loading every order to count them would not. It counts all open orders (PAID, PICKING or ON_HOLD), not just the at-risk ones in the queue, which also limit the promised date.

## Workshop derived properties

**[Docs]** A Workshop derived property is computed at query time and **declared in the module**, per object type. It is not stored in the Ontology and exists only in that module. Two kinds:

- **Linked property / aggregation**: a property from a one-to-one link, or an aggregation across a one-to-many link, optionally with **statically defined** filters on the linked type. Aggregations use the linked type's native properties only.
- **Column math**: arithmetic over one type's native properties and linked-property derived properties. One column math property can't reference another, so write the whole formula in one place: `(salary + bonus) * 1.1`, not `totalCompensation * 1.1`.

**[Docs]** Add them from the module's **Overview** tab under **Capabilities › Derived properties**, or from the object type.

**[Docs]** Limits that shape the choice:

| Limit | Value |
|---|---|
| Link traversals | **One** (an Ontology-defined derived property allows up to three) |
| Sorting an object set that uses them | Up to **200** rows |
| Widgets | A subset, including Object Table, Pivot Table and Waterfall (hover the info icon for the full list) |
| Saved states | Not supported for object sets that reference them |
| Cost | Computed at query time, so they can slow the module |

The Kestrel tier column and the RQ-19 discussion of static filters are in [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md#built-in-workshop).

## Choosing how to compute a value

**[Docs]** with **[Explanation]** in the last column:

| Option | Lives in | Sortable in a table | Best for |
|---|---|---|---|
| **Workshop derived property** | This module | Yes, up to 200 rows | A linked value or simple arithmetic shown as a column, including in pivot tables |
| **Ontology-defined derived property** | The Ontology | (see [Ontology 05-05](../../Ontology/05-properties/05-derived-properties.md)) | The same value needed in several apps; up to three traversals |
| **Function-backed column** | A published function | Yes, up to **10,000** objects; above that, no end-user sort and a default sort only sorts each loaded page | Logic too complex for a derived property |
| **Function-backed variable** | A published function | — (one value) | A metric, or an input to other variables |
| **Variable transformation** | This module, runs in the browser | — | Simple maths, comparisons and string building ([03](03-variable-types.md#variable-transformations)) |
| **SQL query variable** | This module | — | Rankings, running totals, joins: anything natural in SQL ([03](03-variable-types.md#sql-query-variables)) |

---
[Module index](README.md) · Previous: [01 — Actions in Workshop](01-actions-in-workshop.md) · Next: [03 — Variable types](03-variable-types.md)
