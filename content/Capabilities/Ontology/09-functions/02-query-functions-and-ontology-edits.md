# 02 — Query functions and Ontology edits

*Sources: [Ontology edits](https://www.palantir.com/docs/foundry/functions/edits-overview/) · [TypeScript v2 Ontology edits](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits/) · [TypeScript v2 staged writes](https://www.palantir.com/docs/foundry/functions/typescript-v2-staged-writes/) (beta) · [Query functions](https://www.palantir.com/docs/foundry/functions/query-functions/) · [Consistency and isolation](https://www.palantir.com/docs/foundry/action-types/consistency-guarantees/) · checked October 2, 2026 · Ready for Review*

Functions come in two families, and the difference is what they're allowed to change:

| | **Query** | **Ontology edit function** |
|---|---|---|
| Changes anything? | **No**: "cannot have any side effects" | Returns *proposed* edits |
| Who applies the edits | — | **Only an action** ([08-04](../08-actions/04-function-backed-actions.md)) |
| Exposed through the API gateway | Yes, with an `apiName` | No. Use an action. |
| Kestrel example | `lateOrdersForRegion(region)` for the support portal | `cancelOrder(order, reason)` |

## Edits: one change in three languages

Here is part of *Cancel order*: mark the order cancelled and **unlink it from a promotion**. `Order ↔ Promotion` is many-to-many, so this is a real link edit, not a foreign-key update.

**TypeScript v1**

```typescript
@Edits(Order, Promotion)
@OntologyEditFunction()
public cancel(order: Order, promo: Promotion): void {
    order.status = "CANCELLED";
    order.promotions.remove(promo);
}
```

**TypeScript v2**

```typescript
type OntologyEdit = Edits.Object<Order> | Edits.Link<Order, "promotions">;

export default function cancel(client: Client, order: Osdk.Instance<Order>,
                               promo: Osdk.Instance<Promotion>): OntologyEdit[] {
    const batch = createEditBatch<OntologyEdit>(client);
    batch.update(order, { status: "CANCELLED" });
    batch.unlink(order, "promotions", promo);
    return batch.getEdits();
}
```

**Python**

```python
@function(edits=[Order, OntologyLinkType(Order, "promotions")])
def cancel(order: Order, promo: Promotion) -> list[OntologyEdit]:
    edits = FoundryClient().ontology.edits()
    o = edits.objects.Order.edit(order)
    o.status = "CANCELLED"
    o.promotions.remove(promo)
    return edits.get_edits()
```

**[Docs] What the three have in common**, and what each declares:

- **Provenance is declared up front.**
  - TSv1: `@Edits(...)`.
  - TSv2: the `Edits.Object` / `Edits.Link` / `Edits.Interface` union type.
  - Python: `@function(edits=[...])`.

  Actions use it "to enforce permissions", and the action log needs it ([08-07](../08-actions/07-consistency-reverts-and-logs.md#incident-4--who-changed-this-and-why)). Declare many-to-many link edits as links. Declare one-to-one and one-to-many link edits as edits **to the object type that holds the foreign key**.
- **Foreign-key links are property updates.**
  - TSv2: `batch.update({ $apiName: "Ticket", $primaryKey: 13 }, { assignedEmployeeId: 52 })`, or `undefined` to unlink.
- **Creating objects** needs a primary key.
  - TSv2: `batch.create(Ticket, {...})`.
  - Through an interface: `create(Person, { $objectType: "Employee", ... })`. One of the supplied properties must map to the primary key.
- **Primary keys can't be updated.** The same goes for an interface property backed by one.
- **You can reference objects without loading them**, as `{ $apiName, $primaryKey }`. That includes objects created earlier in the same function.

## The two surprises

**1. Running it doesn't change anything.** **[Docs]** Running an edit function in the functions helper doesn't apply its edits. "The only way to update objects using a function is by configuring an action." That makes the helper a safe place to test edit functions.

**[Docs]** Two related details:

- **Automate** doesn't apply edits returned by functions used as effects. Use a function-backed action there.
- An omitted optional array is `undefined` in Code Repositories but **an empty array** when the function runs through an action.

**2. Searches don't see your edits (edit batches).** **[Docs]** "Changes to objects and links are propagated to the object set APIs after your function has finished executing." The docs' example sets a name to "Bob", then counts employees named Bob: "Expected: 1, Actual: 0".

**[Docs]** Fetching a *specific* object you already edited, by primary key, does return the pending values in TSv1. In TSv2, though, "subsequent access to the … property value … will not reflect the changes" made through `batch.update`.

**[Explanation]** For *Cancel order*, step 4 computes the refund from the *uncancelled* lines and partial refunds. That is what we want. A function that edits and then **aggregates over what it edited**, such as "after re-assigning, does anyone have more than 15 cases?", gets the wrong answer in batch mode.

## Staged writes (beta)

**[Docs]** Staged writes (TSv2 and Python) change the execution model:

- **Read-after-write.** Searches and aggregations later in the function include the staged edits.
- **No return value needed.** Edits are applied when the action completes, so the function can return something else.
- **Nested staged-write calls**, including **AIP Logic**, share the same staged edits.
- **Atomic.** If the function throws, everything is discarded "before the function is retried by the action".
- A **`WriteableClient`** replaces the edit batch: `await client.create(...)`, `.update`, `.delete`, `.link`, `.unlink`.

**Limits.** **[Docs]** Interface edits aren't supported in staged writes. Action types that use staged writes currently run only in **legacy** isolation ([08-07](../08-actions/07-consistency-reverts-and-logs.md)).

**[Docs]** The consistency page lists staged writes for "TypeScript v2, Python, and AIP Logic function-backed action types". The feature table marks AIP Logic **No**. The staged-writes page describes AIP Logic only as a *nested* participant. Logged as RQ-22.

**Kestrel:** `assignCase` (create assignment → count the agent's open cases → throw if above 15) is written as a staged-write function. It needs read-after-write. **[Explanation]** It also gives up the snapshot guarantee, so two simultaneous assignments can both pass the count check: the write skew of [08-07 incident 1](../08-actions/07-consistency-reverts-and-logs.md#incident-1--two-refunds-for-one-order). The fix is the same as there: also write an `Agent.openCaseCount` property, so that two assignments to the same agent conflict.

## Queries and the API gateway

**[Docs]** A query is the read-only subset of functions, and it can be exposed through the **API gateway**:

- **Declaring one.** TSv1 uses `@Query({ apiName })`. TSv2 exports `config = { apiName }`. Python uses `@function(api_name=...)`.
- **API name rules.** lowerCamelCase, under 100 characters, no leading numbers, unique across the imported ontologies. The repository must import at least one ontology. TSv1 may need `"enableQueries": true` in `functions.json`.
- **Versioning is different.** API-named queries always run the **latest tagged version**. Renaming or removing the API name breaks consumers. To evolve a query without breaking them, copy it under a new name, such as `getLateOrdersV2`.
- **Calling one from another function.** Import it with Resource imports. TSv1 static analysis may need `@Uses({ queries: [...] })`.

**[Explanation]** Kestrel's support portal calls `lateOrdersForRegion` through the gateway. Because there's no version pinning, a breaking change means a `V2` query and a migration window. It works like a public API, not an internal function.

---
[Module index](README.md) · Previous: [01 — Functions on objects](01-functions-on-objects.md) · Next: [03 — Function lifecycle](03-function-lifecycle.md)
