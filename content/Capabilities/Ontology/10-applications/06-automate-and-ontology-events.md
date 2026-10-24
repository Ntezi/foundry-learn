# 06 — Automate and Ontology events

*Sources: [Automate](https://www.palantir.com/docs/foundry/automate/overview/) · [Object set conditions](https://www.palantir.com/docs/foundry/automate/condition-objects/) · [Evaluation frequency](https://www.palantir.com/docs/foundry/automate/evaluation-frequency/) · [Effects](https://www.palantir.com/docs/foundry/automate/effects/) · [Action effects](https://www.palantir.com/docs/foundry/automate/effect-actions/) · [Effect settings](https://www.palantir.com/docs/foundry/automate/effect-settings/) · [Permissions](https://www.palantir.com/docs/foundry/automate/permissions/) · [Third-party application ownership](https://www.palantir.com/docs/foundry/automate/third-party-app-ownership/) · [Limits](https://www.palantir.com/docs/foundry/automate/limits/) · [Object Monitors (sunset)](https://www.palantir.com/docs/foundry/object-monitors/overview/) · checked October 2, 2026 · Ready for Review*

**[Docs]** Automate "replaces Object Monitoring as the single entry point for all business automation". It is "fully backwards-compatible". **Object Monitors** are in **sunset**: still fully supported, but you should migrate. An automation is a **condition**, checked continuously or on a schedule, plus **effects** that run when it is met.

This note is written as a **spec sheet** for one Kestrel automation. Every line of the spec has a doc rule behind it.

## The spec: *High-risk payment hold*

> When a payment scores **HIGH** fraud risk, put its order on hold and tell the fraud team. Nobody should have to watch a screen.

| Field | Value | Doc rule |
|---|---|---|
| **Condition** | *Objects added to set*: Payment where `riskAssessment.band = HIGH` | Fires when a new object appears in the set, **or an existing one changes into it** (it is the filter that makes this work) |
| **Evaluation** | **Live** | Within minutes of the change being **indexed**. Needs **OSv2**. Not for stream-backed types on *added/removed* conditions |
| **Effect 1** | Action *Hold order for payment*, which takes the triggering **Payment** | Effect inputs are single object, object list, object set or property reference, and must **match the action's parameter type** |
| **Effect 2** | Notification to the *kestrel-pay-fraud* group | Uses **each recipient's** permissions |
| **Fallback** | Notify the on-call fraud analyst if the action fails | Fallbacks are available on action, logic and function effects |
| **Owner** | Kestrel Pay's **third-party application** (service user) | Not Tomás personally |
| **Execution mode** | Once per object | Parallelization setting applies |

## Why each choice

**Condition: "added", not "modified".** **[Docs]** *Objects modified in set* fires on changes to objects that are **already in** the set, with options to include objects added or removed. *Objects added to set* with a filter fires when an object **enters** the filter. A payment becoming HIGH is an *entry*.

**[Docs]** Two further details:

- **Removed** doesn't fire for objects **deleted** from the Ontology.
- **Run on all objects** is scheduled, for periodic sweeps.

**[Explanation]** Watch out for the struct filter. `riskAssessment.band` is a struct field ([05-03](../05-properties/03-structs.md)). The live-monitoring page doesn't list struct filters as unsupported, but it does exclude "certain filter types". Check that the UI shows *Live*. If it doesn't, copy `band` into its own property in the pipeline.

**Live vs scheduled.** **[Docs]** Live monitoring isn't available for:

- relative time conditions;
- more than one object type, or joined sets;
- some filters (prefix, terms, phrase);
- **filters on derived properties**;
- **function-generated** object sets;
- **interfaces**.

These fall back to **scheduled** monitoring, which "can result in high compute usage". **[Explanation]** So "any open `Case` older than 48 hours" ([07-01](../07-interfaces/01-interfaces.md)) can't be live, because it is both an interface *and* a relative-time condition. Kestrel runs it as a schedule every hour.

**Effect: an action, not a function.** **[Docs]** "Automate does not apply edits returned by functions used as effects". The Ontology edits page says the same ([09-02](../09-functions/02-query-functions-and-ontology-edits.md#the-two-surprises)). Changes go through an **action effect**. That action can be function-backed, and **Automate counts as batched** for batched execution ([08-04](../08-actions/04-function-backed-actions.md#batched-execution-inline-edits-and-automate)).

**Why a new action.** **[Docs]** To use the trigger's objects in an action, "the type of the action parameter needs to align with the type of the exposed condition effect input". The condition watches **Payment**, while *Hold order* takes an **Order** ([08-01](../08-actions/01-action-types.md#the-anatomy)). So Kestrel adds a small function-backed action, *Hold order for payment*. It takes a `payment` parameter and edits the linked order, using the same logic and the same `ON_HOLD` status. **[Explanation]** The alternative, a property-reference input carrying `Payment.orderId`, only works if the action accepts an order ID string. That would weaken the parameter's type checking.

**[Docs]** An action type can opt out of Automate: *Security & Submission Criteria → Frontend consumers*.

**Owner: a service user.** **[Docs]** Condition evaluation, and action, logic and function effects, run **as the automation owner**:

- submission criteria are checked **against the owner**;
- edit history and audit logs show **the owner**;
- the automation **stops** if the owner's account is disabled or deleted.

**[Docs]** A **third-party application** can own the automation instead, through its service user: a confidential client with the client credentials grant, **unrestricted**, and Editor on the automation or its folder. Editing an automation owned by an application later needs its client ID and secret.

**[Explanation]** *Hold order*'s criteria require the *CS agents* group ([08-01](../08-actions/01-action-types.md#the-anatomy)). Give *Hold order for payment* its own criterion instead: the user is in a *Kestrel Pay automation* group, which holds only the Kestrel Pay service user, **or** is in the fraud group. Don't put a service account into a human team's group, and don't name the user directly: criteria that reference a user also block packaging the action ([14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md)). Without a criterion it can pass, every run fails as an *authentication failure* in the action metrics ([08-07](../08-actions/07-consistency-reverts-and-logs.md#incident-4--who-changed-this-and-why)).

**Notification: per recipient.** **[Docs]** Recipients need:

- Viewer on the automation;
- Viewer on the triggering objects;
- for a multi-datasource type, Viewer on **all its properties**.

An automation may therefore notify some recipients and not others. The docs' example is a restricted-view object set split by region.

## What can go wrong

| Failure | Doc behaviour | Kestrel design response |
|---|---|---|
| The effect runs **twice** | "Effects follow **at-least-once** execution semantics" | A second hold on the same order must be harmless. Add `status is not ON_HOLD` to the criteria, so the duplicate changes nothing and sends no second notification. **[Explanation]** The duplicate *fails*, so it also triggers the fallback alert. Tell the on-call analyst that an "already on hold" failure is expected, or have the fallback filter out that error |
| The action fails on a transient error | Per-effect retries (constant or exponential backoff, plus jitter); event retries; fallback effect | Retry three times, then fallback to the on-call analyst |
| A burst of 50,000 HIGH payments, e.g. a model bug | Real-time evaluation processes **10,000 objects** per evaluation; the system may **auto-pause** on excessive activity | Treat an auto-pause as an incident: check the model before resuming |
| The queue backs up | Events wait at most **45 min** in the execution queue; an event runs for at most **4 h** | — |
| The model team retires the account that owned it | The automation stops | Avoided by application ownership |

**[Docs]** Other limits:

- **100,000** objects for scheduled added/removed inputs;
- **1,000,000** for *run on all objects*;
- **10,000** recipients;
- batch size **1,000**;
- manual runs up to **5,000,000** objects.

Automate integrates with **Global Branching**, so automations can be built and tested on a branch ([14](../14-lifecycle-and-operations/02-branching-and-proposals.md)).

## Ontology events, more broadly

**[Explanation]** Automate makes **changes to objects into events**. It does that by watching object sets, not by reading an event log. Three consequences for modelling:

1. **The filter is the event definition.** "HIGH risk" has to be a **filterable property**, or a function-generated set, which is scheduled only. A score buried in a long-text field can't trigger anything.
2. **Latency includes indexing.** "Within minutes" starts **after indexing**. User edits are patches and arrive faster than dataset rebuilds ([13](../13-backend-architecture/03-edits-and-materializations.md)).
3. **History isn't in the trigger.** An automation knows that a payment *became* HIGH. It doesn't know what it was before. If the *transition* matters, model it as an event or log type. Machinery's log type is one example ([05](05-specialized-apps.md)).

**Revised October 21, 2026.** The Apps area found that this automation can't be project-scoped while it has a notification effect, so its effect history was visible only to the service user. It's now two automations: the project-scoped hold and a separate *High-risk payment alert* ([Apps 08-05](../../Apps/08-automate/05-security-ownership-and-history.md#who-can-see-what-happened), [17-02](../17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent)).

---
[Module index](README.md) · Previous: [05 — Specialized apps](05-specialized-apps.md) · Next: [07 — Searching the Ontology](07-searching-the-ontology.md)
