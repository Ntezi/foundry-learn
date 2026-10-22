# 03 — Effects

*Sources: [Effects](https://www.palantir.com/docs/foundry/automate/effects/) · [Action effects](https://www.palantir.com/docs/foundry/automate/effect-actions/) · [Logic effects](https://www.palantir.com/docs/foundry/automate/effect-logic/) · [Function effects](https://www.palantir.com/docs/foundry/automate/effect-function/) · [Notification effect](https://www.palantir.com/docs/foundry/automate/effect-notification/) · [Fallback effect](https://www.palantir.com/docs/foundry/automate/effect-fallback/) · [Effect settings](https://www.palantir.com/docs/foundry/automate/effect-settings/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Effects are what an automation **does**. Three of them change or compute things and run as the automation's **owner**: actions, Logic and functions. The fourth, notifications, runs **per recipient** with each recipient's permissions. That split explains most surprises in this note.

| Effect | Runs | Can change the Ontology? | Retries | Fallback |
|---|---|---|---|---|
| **Action** | Action types, with parameters from static values or the condition's objects | Yes, through the action | Per effect, and event retries | Yes |
| **Logic** | An AIP Logic function, pinned to a version (auto-upgrade within a major version is optional, not in project scope) | Only if the function **returns** Ontology edits | Per effect, and event retries | Yes |
| **Function** *(beta)* | A function, run **asynchronously** (polled) for up to **4 hours** | **No**: returned edits aren't applied | Event retries; per-effect retries are a doc conflict ([RQ-10](../SOURCES.md#open-research-questions)) | Yes |
| **Notification** | In-platform and email messages, with attachments | No | — | — |

## Getting objects into an effect

**[Docs]** *Added*, *removed* and *modified* conditions expose **effect inputs**: an object set, an object list, a single object or a property reference. The input's type must match the effect's parameter: a condition on `Alert` needs an action that takes `Alert`. Sets and lists can't be mixed with single-object inputs in one effect.

**[Docs]** With set or list inputs, the **execution mode** groups objects:

| Mode | Runs the effect | Use it when |
|---|---|---|
| **Once for all objects** (default) | Once per trigger, with everything that triggered | Almost always ([06](06-operating-automations.md#performance-three-levers)) |
| **Once per batch** | Once per batch of up to N objects. N is a **maximum**: Automate doesn't wait to fill a batch | Very large triggers |
| **Once per group** | Once per distinct value of chosen properties (exact matches; arrays must match in order) | The action assumes all objects share, say, a category |

With single-object inputs, the effect runs once **per object**; a parallelization setting controls how many at a time. Logic functions with a single object parameter run in groups of **20** by default.

**[Docs]** With several actions in one action effect, their **order isn't guaranteed**.

## Actions, Logic and functions

**[Docs]** The rules the three share:

- They run **as the owner**, who must pass each action's **submission criteria**. If the owner's account is disabled or deleted, they stop.
- An action type can be kept out of Automate: *Security & Submission Criteria → Frontend consumers*.
- **Logic**: only functions that return a list of Ontology edits can be a Logic effect. A **staged-write** Logic function returns nothing to apply, so it shows as disabled; use Logic's *Create action* button and call it through an **action effect** ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#staged-writes-the-execution-model-underneath)). Turning on staged writes publishes a new **major** version, and auto-upgrade never crosses a major version, so existing automations stay on the old one.
- **Functions**: edits returned by a function aren't applied. Wrap the function in a function-backed action to apply them.

**[Example]** The invoice-dispute flow re-extracts one document when a dispute is flagged, through a per-document function triggered by an automation ([AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md)). **[Explanation]** A **function effect** fits: extraction can be slow, and the effect polls for up to 4 hours instead of timing out. It's beta, so check it's available on the enrollment. If the function's result must update objects, call it through a function-backed action instead.

## Notifications

**[Docs]** **Recipients** are static users and groups, or **dynamic**: user or group IDs held in a String or String-array property of the triggering objects. To receive anything, a recipient needs:

- at least **Viewer on the automation**;
- Viewer on the triggering objects (and on every property, for a multi-datasource object type);
- Viewer on every object a function-backed notification reads.

**[Docs]** Content:

- **Plain**: heading, message and link, with template values (`/` menu) such as the recipient's name or, per object, a property's current and previous value. Previous values need live monitoring. An *advanced email* section can use HTML and, for dataset conditions, append up to **50** preview rows.
- **Function-generated**: a function returns `Notification`, or `undefined` to send nothing. It can take the **recipient** and the condition's objects as inputs.
- **Attachments**: a Notepad document, a **Notepad template** (filled from the condition's objects), or a Contour dashboard, rendered per recipient as a PDF or **inline** image, with a chosen locale. Notepad templates don't check object types, so match them yourself.

**[Docs]** Grouping works as for actions: one notification for all objects, one per group of property values, or one per object.

**[Explanation]** Because each notification is rendered as its recipient, the same automation can notify some people and not others, and show them different content. That's correct behaviour under row-level security, but it means *the automation fired* and *Kofi got an email* are different questions. For a regional `Shipment` alert, an agent outside the region gets nothing at all.

## Fallbacks

**[Docs]** A **fallback** (*Add failure effect*) is an action that runs when an action, Logic or function effect **fails**. It receives the original input, the **error message**, the automation RID and the **event ID**. It runs **per object**: only the objects that failed go to it, and the rest carry on. It runs after a non-retryable error or the last retry; fallbacks aren't themselves eligible for event retries. Fallbacks run as the owner and need **sequential** execution.

**[Docs]** The docs' uses: error notifications, logging failures to a **failure object type** (which another automation can watch), a simpler alternative when an AI step fails, or retrying with different parameters.

## Effect settings

**[Docs]** Separate automations run independently and in no fixed order. Within one automation:

- **Sequential** (at least two action, Logic or function effects): effect 1 runs for every partition, then effect 2. If an effect fails for an object, later effects don't run for **that object**, even when its fallback succeeds.
- **Parallel**: effects run independently; one failure doesn't stop the others.
- **Rapid edits to one object**: under live monitoring, each batch of concurrent edits triggers separately, processed in sequence per object unless you turn that off. Under scheduled monitoring, all edits since the last evaluation become one trigger.

**[Docs]** Effects are **at-least-once**: occasionally the same effect runs twice for one trigger. Make actions and functions **idempotent** (a consistent ID for anything created, a check before acting), or design data to tolerate duplicates.

**[Example]** Kestrel's *High-risk payment hold* already handles the duplicate: *Hold order for payment* has the criterion `status is not ON_HOLD`, so a second run fails instead of holding twice ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#what-can-go-wrong)). **[Explanation]** That failure triggers the fallback alert, so the on-call analyst gets an alert that needs no action. It won't realistically auto-mute the automation: that needs all effects to fail in at least 80% of the last 30 events ([04](04-execution-settings.md#muting-pausing-and-expiration)), and duplicates are rare. A function-backed version that **returns without editing** when the order is already on hold would be idempotent without creating noise.

---
[Module index](README.md) · Previous: [02 — Conditions](02-conditions.md) · Next: [04 — Execution settings](04-execution-settings.md)
