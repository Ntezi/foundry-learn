# 04 — Function-backed actions

*Sources: [Function-backed actions](https://www.palantir.com/docs/foundry/action-types/function-actions-overview/) · [Getting started](https://www.palantir.com/docs/foundry/action-types/function-actions-getting-started/) · [Batched execution](https://www.palantir.com/docs/foundry/action-types/function-actions-batched-execution/) · [Scale and property limits](https://www.palantir.com/docs/foundry/action-types/scale-property-limits/) · [Rules](https://www.palantir.com/docs/foundry/action-types/rules/) · checked October 2, 2026 · Ready for Review*

## The point where rules stop being enough

Ama's next request is **Cancel order**. Cancelling an order means:

1. setting `Order.status` to `CANCELLED`;
2. cancelling **every** OrderLine on the order (there could be one or forty);
3. cancelling any Shipment that hasn't left the warehouse;
4. creating a `Refund` for the amount actually paid, which is the line totals minus any partial refunds already issued.

Rules can't do steps 2 to 4. **[Docs]** The overview gives three triggers for moving to a function:

- modifying **linked** objects ("set the status of all linked Alert objects");
- writing a value computed from **several objects**;
- creating **several object types and linking them**.

*Cancel order* hits all three.

## What changes when a function backs the action

**[Docs]** You publish an **Ontology edit function**. In TSv1 it is annotated `@OntologyEditFunction()`, not `@Function()`. You then add a **single Function rule**: "A function rule cannot be combined with other Ontology rules." The function's inputs become the action's **parameters** automatically, and you can configure them like any others: defaults, filters, overrides.

```typescript
// TSv1 shape, as in the docs' tutorial. TSv2 and Python edits are covered in 09-02.
@OntologyEditFunction()
public cancelOrder(order: Order, reason: string): void {
    order.status = "CANCELLED";
    for (const line of order.orderLines.all()) {
        line.lineStatus = "cancelled";
    }
    for (const s of order.shipments.all()) {
        if (s.shipmentStatus === "awaiting_pick") s.shipmentStatus = "cancelled";
    }
    // ...create Refund, link it to order and payment (see 09-02 for creating objects)
}
```

**[Explanation]** Some things stay on the **action type**. The function only computes edits.

| Stays on the action type | Moves into the function |
|---|---|
| Parameters and their form behaviour | Which objects change, and to what |
| **Submission criteria** | Business calculations (the refund amount) |
| Side effects: notifications, webhooks | Creating and linking new objects |
| Permissions, the action log | |

Kestrel keeps the *who may cancel* check as a submission criterion, so it shows in the form with a proper failure message. The function only throws for states the form can't see. **[Explanation]** An error thrown by a function is a worse user experience than a criterion that fails up front.

## Limits apply twice

**[Docs]** Function-backed actions "are subject to both action type limits and function execution limits". The action-side limits are:

| Limit | Maximum |
|---|---|
| Object types edited in one submission | 50 |
| Objects edited in one submission | 10,000 |
| Size of one object edit | 3 MB on OSv2 (32 KB on OSv1) |
| Object-reference list parameter | 1,000 elements |
| Primitive list parameter | 10,000 elements |
| Batch calls of one action | 10,000, **but 20** for a function-backed action without batched execution |

**[Docs]** No action can edit a **primary key**. Changing a key means deleting one object and creating another.

**[Explanation]** *Cancel order* touches four types and, at most, a few dozen objects. The 10,000-object ceiling matters for actions like "cancel every order from this fraud ring", which should be designed as a batch job, not as one click.

## Version pinning, and why auto-upgrade is a security decision

**[Docs]** By default the action stays on the function version you picked. New releases do nothing until someone upgrades the reference in **Rules**.

You can turn on **auto upgrade** from a minimum version. The action then resolves a **version range** at runtime: compatible minor and patch releases. Auto upgrade is disabled for `0.y.z` versions.

**[Docs]** Three consequences:

- **Security.** With auto upgrade on, "users who do not have edit permissions on the action can modify the action's behavior by making changes to the backing function".
- **Breaking changes.** A bad release can make the action fail.
- **Provenance.** It is fixed by the minimum version. A newer release that edits an *extra* object type fails.

**[Explanation]** Kestrel's rule: **pin** finance and payment actions (*Cancel order*, *Approve refund*). Use auto upgrade only where the function and the action share one owning team, and only after the function reaches `1.0.0`. Versioning itself is covered in [09-03](../09-functions/03-function-lifecycle.md).

## Batched execution: inline edits and Automate

Ama's team sometimes cancels twenty orders from a Workshop table at once.

**[Docs]** When an action runs "in batches, such as in Workshop inline edits or in Automate", the function is normally called **once per request in sequence**, and the edits are applied atomically at the end. You can opt into **batched execution** instead. The function then takes **one parameter: a list of structs**, and processes all the requests in one execution.

```typescript
@OntologyEditFunction()
public cancelOrders(batch: { order: Order, reason: string }[]): void {
    batch.forEach(({ order, reason }) => { /* same logic */ });
}
```

**[Explanation]** That is the reason for the 20-call limit above. Without batching, a 200-row bulk cancel **fails**. With batching it is one execution, and the combined edits must fit within the 10,000-object limit. The docs also offer batching as a way to "resolve edit conflicts". Two requests in one batch that touch the same Shipment are reconciled in your code, not by the order the calls happen to run in.

---
[Module index](README.md) · Previous: [03 — Submission criteria](03-submission-criteria.md) · Next: [05 — Side effects](05-side-effects.md)
