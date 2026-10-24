# 02 — Rules and parameters

*Sources: [Rules](https://www.palantir.com/docs/foundry/action-types/rules/) · [Parameters overview](https://www.palantir.com/docs/foundry/action-types/parameter-overview/) · [Default values](https://www.palantir.com/docs/foundry/action-types/parameters-default-value/) · [Filter dropdowns](https://www.palantir.com/docs/foundry/action-types/parameters-filter/) · [Dropdown security](https://www.palantir.com/docs/foundry/action-types/dropdown-security/) · [Overrides](https://www.palantir.com/docs/foundry/action-types/parameters-override/) · [Performance considerations](https://www.palantir.com/docs/foundry/action-types/parameter-performance-considerations/) · [Actions on structs](https://www.palantir.com/docs/foundry/action-types/actions-on-structs/) · checked October 2, 2026 · Ready for Review*

A build log. Kofi needs **Re-route shipment**: move a shipment that hasn't left yet to another warehouse in his region. Each step below adds one piece and notes the doc rule it depends on.

## Step 1 — The rule

The change is that the shipment now ships from a different warehouse. `Shipment → Warehouse` is a **foreign-key** link ([06-01](../06-links/01-link-types-and-cardinality.md)).

**[Docs]** "To create or delete one-to-many or one-to-one links, object rules need to be used and the foreign key property on the object needs to be modified." **Create link** and **Delete link** are for **many-to-many** links only.

So the rule is **Modify object(s)** on Shipment, not a link rule:

| Property | Value comes from | Why |
|---|---|---|
| `warehouseId` | **Object parameter property**: `newWarehouse.warehouseId` | The user picks a warehouse, not a string |
| `rerouteReason` | **From parameter**: `reason` | |
| `reroutedBy` | **Current user** | Can't be faked from the form |
| `reroutedAt` | **Current time** | Same |

**[Docs]** Those are the four value sources:

- **From parameter**, the default: each property you add creates a parameter with the same name;
- **Object parameter property**: the types must match;
- **Static value**: fixed in the rule and invisible in apps;
- **Current user / time**, for string and timestamp properties.

"Rules on links can only take object reference parameters."

## Step 2 — The parameters

**[Docs]** Parameters are "the inputs of an action type … the interface between the Rules and other Foundry applications". Each parameter has a type, and can be shown or hidden, editable or fixed. A parameter can also be constrained with a **value type**, which reuses its validation ([05-02](../05-properties/02-value-types.md)).

| Parameter | Type | Configuration |
|---|---|---|
| `shipment` | Object reference → Shipment | Default *current object* in the app; **hidden** |
| `newWarehouse` | Object reference → Warehouse | Dropdown **filtered** (step 3) |
| `reason` | String | Multiple choice: *capacity*, *stock-out*, *customer request*, *carrier issue* |
| `note` | String | Optional, hidden, until step 4 changes that |
| `previousWarehouseId` | String | Hidden; **default** = `shipment.warehouseId` |

**[Docs]** That last row is a pattern from the docs. A hidden parameter captures a property's value *before* the action changes it. Kestrel puts it in the notification text ("moved from ACC-1 to KSI-2") and uses it to check the change in step 5.

**[Docs] Defaults are global.** A default set on the action type applies in Workshop, Object Explorer, Object Views, Quiver and Slate. Local defaults, such as a Workshop variable, **take precedence**. If you move to global defaults, remove the local overrides.

**[Docs]** An object-property default can only reference object parameters that sit **above** it in the parameter list. Order matters.

**[Docs]** Type-class prefills can supply special values such as generated UUIDs or the current user's ID. Keep those parameters hidden.

## Step 3 — Filter the warehouse dropdown

Kofi should only see active warehouses in his region, and never the shipment's current warehouse.

**[Docs]** Object-reference dropdowns take **filters and Search Arounds**, and the selected value "is also validated before the action is executed". A filter can compare a property with:

- a static value;
- another parameter;
- a property of an object-reference parameter.

Several values are combined with OR. The starting set can be changed, for example to a list parameter.

Kestrel's filter is `Warehouse.region` = `shipment.region` and `status` = `active`. The "not the current warehouse" part goes in a submission criterion ([03](03-submission-criteria.md)). **[Explanation]** The documented property filter only *matches* values ("any of the provided values"), and an exclusion is easier to read as a rule with its own failure message.

**[Docs] Watch static filter values.** A static value in a dropdown filter is visible "to all users who can view the action type". It ends up in an object-set request, even for users who can't see the filtered objects. The docs' example is a filter on a secret investigation name.

**[Explanation]** For Kestrel, a static filter `region = "EU-restricted"` would reveal that such a region exists. Filter through a parameter or an object property instead. Those carry no hidden values.

## Step 4 — Make the note required, sometimes

When the reason is *customer request*, Ama's team wants a note for the audit trail.

**[Docs]** An **override block** is *if conditions → then overrides*. It can change a parameter's constraints, visibility, requiredness and default. Conditions use the submission-criteria condition builder, but they can only reference parameters **above** the current one. "If more than one block is true, only the first override is executed."

- **Block on `note`:** if `reason` is `customer request`, then the note becomes **visible** and **required**.

**[Explanation]** Overrides are the alternative to building a second action, *Re-route shipment (customer request)*. Two near-identical action types are the start of [Action Sprawl](../11-design/03-anti-patterns.md#action-sprawl).

## Step 5 — Keep the form fast

The chain so far: `shipment` sets the default for `previousWarehouseId`, and `shipment` also filters `newWarehouse`.

**[Docs]** The form resolves dependent parameters **in sequence**. The guidance is to keep "the dependency hierarchy as flat as possible". Reference the root parameter directly, not a parameter that is derived from it.

Kestrel's dropdown filter reads `shipment.region`, not `previousWarehouseId → warehouse → region`. Both `previousWarehouseId` and `newWarehouse` then resolve in parallel.

## When an action has several rules

*Re-route shipment* later gains a second rule: **Create object** on `ShipmentEvent` (type `rerouted`), giving the shipment a timeline entry.

**[Docs]** Multiple rules are compiled into **one edit per object**, so "the order of rules affects the final object edit". These combinations aren't supported:

- deleting an object before it is added or modified;
- modifying an object before it is added;
- creating the same object twice in one submission.

Two further restrictions:

- **Modify** and **Delete** "cannot reference an object created as a part of the current action".
- **Create object** can add **many-to-many links** to the new object in the same rule (*Add link*). For foreign-key links, set the key property instead.

Kestrel's two rules touch different objects, so the order doesn't matter here.

## Writing a struct property

**[Docs]** A struct property is written through a **struct parameter**: a parameter of base type STRUCT whose fields have their own names and base types (BOOLEAN, DATE, DOUBLE, GEOPOINT, INTEGER, LONG, STRING, TIMESTAMP). The rules:

- The mapping must be **complete**: every field of the struct property maps to a struct parameter field of the **same base type**.
- A struct property can be written **only** through **one** struct parameter: no static values, no references to other properties. A struct parameter can't feed non-struct properties.
- The form shows the fields as a group. Each field can have its own **constraints** (e.g. a string length of 10–500). **Defaults** come only from another object's struct property, chosen through an object reference parameter.
- Adding, deleting or retyping a struct field is a breaking change for every action that writes it.

**[Example]** *Record delivery exception* writes `Shipment.exception`, a struct of `reasonCode` (STRING), `reportedAt` (TIMESTAMP) and `location` (GEOPOINT), through one `exception` struct parameter.

## Rule cheat sheet

| Rule | Key constraint from the docs |
|---|---|
| Create object | Primary key required |
| Modify object(s) | Object from a reference parameter; not one created in this action |
| Create or modify object(s) | Creates if no object is supplied, with a generated ID or a user-supplied key |
| Delete object(s) | Not one created in this action |
| Create link / Delete link | Many-to-many only; object reference parameters only |
| Function rule | **Must be the only Ontology rule** ([04](04-function-backed-actions.md)) |
| Interface rules | Create, modify, delete or link implementers ([07-03](../07-interfaces/03-interface-links-and-action-constraints.md#interface-action-rules)) |
| Notification · Webhook · Schedule | Side effects ([05](05-side-effects.md)) |

---
[Module index](README.md) · Previous: [01 — Action types](01-action-types.md) · Next: [03 — Submission criteria](03-submission-criteria.md)
