# 07 — Consistency, reverts and logs

*Sources: [Consistency and isolation](https://www.palantir.com/docs/foundry/action-types/consistency-guarantees/) · [Undo or revert actions](https://www.palantir.com/docs/foundry/action-types/action-reverts/) · [Action log](https://www.palantir.com/docs/foundry/action-types/action-log/) · [Action metrics](https://www.palantir.com/docs/foundry/action-types/action-metrics/) · [Monitoring](https://www.palantir.com/docs/foundry/action-types/monitoring/) · [Scale and property limits](https://www.palantir.com/docs/foundry/action-types/scale-property-limits/) · checked October 2, 2026 · Ready for Review*

Kestrel's first month of live actions produced four incident reviews. Each one teaches one part of this topic. The incidents are fictional; the behaviour they rely on is documented.

## Incident 1 — Two refunds for one order

**What happened.** A customer complained twice, through two channels. Two Kestrel Pay analysts opened the same order within seconds of each other. Both ran *Issue refund*, which creates a `Refund` for the order, and both saw "no refund issued yet". **Two `Refund` objects** were created, and both were later approved, so the customer was paid twice.

**Why the platform allowed it.** **[Docs]** Actions are ACID transactions. A new action type with batched writes defaults to **snapshot isolation**:

- every read comes from one snapshot, taken when the action starts;
- the action fails if another action changed an object **it writes**;
- "objects the action only reads do not contribute to conflict failures".

The two actions *read* the same order but *wrote* two different, brand-new Refund objects. No write-write conflict, so both committed. The docs call this **write skew** and give an on-call-rotation example of it.

**Fix.** **[Docs]** "Express the invariant as a write to a single shared object." *Issue refund* now also writes `Order.refundState = 'issued'`. The second concurrent action fails with a conflict. A submission criterion then blocks any later attempt with *refundState is not issued*.

```text
Before: read Order (no refund?) → create Refund          ← two can commit
After:  read Order (no refund?) → create Refund
                                 → write Order.refundState ← now they conflict
```

## Incident 2 — The re-route that failed for no reason

**What happened.** Kofi re-routed a shipment. At the same moment, an *Update ETA* action (the Delivery Desk agent, after human approval) wrote the same shipment's `eta`. Kofi's action failed with a conflict, and he had to retry. **Nothing was lost**, but Kofi filed a bug: "my action failed for no reason".

**Why.** **[Docs]** Conflict detection works **at the object level**. Two actions that write the same object conflict "even if the actions write to different properties". A rebuild of the backing dataset can also cause **transient** conflicts, even for objects the rebuild doesn't change.

**Why it didn't retry by itself.** **[Docs]** By default the platform retries transient errors, conflicts included, up to **5 attempts**, re-running the action from scratch. It does this **only for actions without external calls**. *Re-route shipment* has a WMS webhook ([05](05-side-effects.md)), so no automatic retry. Re-running would call the WMS twice. You can change this per action type under **Capabilities → Retry mode on transient errors**: *only without external calls* (the default), *all actions*, or *disabled*.

**Fix.** The WMS endpoint is now idempotent, so *Re-route shipment* was switched to **All actions**. **[Explanation]** Only do this once the external call really is safe to repeat.

**Why "read committed" wasn't the answer.** **[Docs]** A coming *read committed* level skips conflict checks entirely. The last commit wins and "the earlier action's edit is discarded", **including properties the later action didn't touch**. In the docs' example, a priority change wipes out a concurrent status change. Under read committed, Kofi's re-route could have silently wiped out the new ETA, or the other way round.

| Level | Reads | Conflicts | Kestrel use |
|---|---|---|---|
| Legacy | Not guaranteed to be one point in time | Write-write | Only for old action types; switch them to snapshot |
| **Snapshot isolation** (default) | One snapshot | Write-write | Everything |
| Read committed (coming) | Latest at each read | **None**: last commit wins | None |

**[Docs] Write modes.** By default, an action **can't read its own edits** (*batched writes*). **Staged writes** let later reads see earlier edits. They're available for TSv2, Python and AIP Logic function-backed actions, but today they run in **legacy** isolation only. **[Explanation]** A TSv2 *Cancel order* that reads back the lines it just cancelled gets that convenience, and gives up the single-snapshot guarantee in exchange.

## Incident 3 — "Undo" after lunch

**What happened.** A customer service agent deleted the wrong `ReturnRequest`, went to lunch, and came back looking for Undo.

**What the docs say.** **[Docs]**

- Reverts are **OSv2 only**. They're on by default for actions created after May 2024 that only modify OSv2 types (*Form* tab, **Allow revert after action submission**).
- **Only the user who applied the action can revert it**, and only from the success toast. "The toast below is your only opportunity to revert the action."
- A revert fails if **any later edit** has touched the object, on any property, or if reverts were turned off in between.
- A revert **doesn't undo side effects**: notifications and webhooks stay sent.
- For a delete whose toast is gone, the documented options are drastic: migrate to a new object type and copy the edits with functions, or **drop all edits** on the type.

**Fix.** **[Explanation]** For destructive actions, prefer a **soft delete**: *Close return request* sets `status = 'closed'`, and the queue filters closed requests out. A real *Delete* is kept for admins, with a confirmation-style required parameter.

## Incident 4 — "Who changed this, and why?"

**What happened.** Lena's audit asked why a €2,400 refund was approved. The object showed the new state, not the decision behind it.

**Fix: an action log.** **[Docs]** The action log turns each **successful** submission into an object of a generated type, `[Log] <action type name>`, **linked to every object it edited**. Required fields include:

- action RID, action type RID and **version**;
- timestamp and user;
- edited objects' primary keys;
- webhook and notification identifiers, the scenario RID, and revert status.

Optional fields are parameter values and properties of single object-reference parameters. Those can include properties the action *didn't* edit, which is the context of the decision.

Kestrel's *Approve refund* log captures the parameters, plus `Refund.amount` from the `refund` parameter. The other context lives on other objects, so Kestrel adds two **hidden, single-value object-reference parameters**, `payment` and `customer`. Each gets the default *from single result of object set*, which the parameter performance page mentions, set to the refund's linked payment or customer ([02](02-rules-and-parameters.md#step-5--keep-the-form-fast)). The log can then capture `payment.riskAssessment.score` and `customer.tier` at approval time. Lena can now ask "how many approvals over €1,000 had a risk score above 0.8?"

**[Explanation]** Only properties of *single* object-reference parameters can be logged, so context that isn't a parameter is lost. Decide what the audit will ask *before* you design the parameters. Whether a struct field like `riskAssessment.score` can be logged on its own, or only the whole struct, isn't stated. Test it.

**[Docs] Configuring it:**

- On the action type: **Capabilities → Create action log objects → Generate object type**.
- To *require* it: on the object type, **Datasources → Edits → Only allow Action types with action logs**. This toggle only appears once edits are enabled.
- Function-backed actions need **Edits provenance** on the function.

**[Docs] Limits worth knowing:**

- no backfill;
- log property types are fixed once created;
- media-reference parameters are excluded;
- summaries can't reference object parameters;
- submitters need permissions on the log type ([06](06-action-permissions.md)).

**[Docs]** Write authorization is **not enforced** on the log ([06 Q4](06-action-permissions.md#q4--can-an-action-quietly-declassify-data)). **[Explanation]** Put the log type in the Kestrel Pay project, with its marking.

**Which tool for which question.** **[Docs]**

| Question | Use |
|---|---|
| What decision, by whom, when, in what context? | **Action log** (successes only; any client, including API and inline edits) |
| Every edit to this object, by any path? | **Edit history** |
| How often does it fail, and how slowly does it run? | **Action metrics**: 30 days, success and failure by category, P95 duration, 7-day run history |
| Undo my last action | **Revert** |
| Alert me when it breaks | **Monitoring**: p95 duration and failure-count rules; Workshop, OSDK app or Workflow Lineage as dynamic scopes |

**[Docs]** Metrics sort failures into categories:

- invalid parameter;
- scale limit;
- *authentication* (failed security submission criteria);
- side effect;
- function, and user-facing function;
- **conflict**;
- unclassified.

Incident 2 would have shown up as a spike in *conflict* failures, before Kofi filed the bug.

---
[Module index](README.md) · Previous: [06 — Action permissions](06-action-permissions.md) · Next: [08 — Using actions in the platform](08-using-actions-in-the-platform.md)
