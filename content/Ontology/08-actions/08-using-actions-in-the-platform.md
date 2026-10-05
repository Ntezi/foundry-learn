# 08 — Using actions in the platform

*Sources: [Use actions in the platform](https://www.palantir.com/docs/foundry/action-types/use-actions/) · [Inline edits](https://www.palantir.com/docs/foundry/action-types/inline-edits/) · [Configure sections](https://www.palantir.com/docs/foundry/action-types/configure-sections/) · [Upload media](https://www.palantir.com/docs/foundry/action-types/upload-media/) · [Upload attachments](https://www.palantir.com/docs/foundry/action-types/upload-attachments/) · [Test run](https://www.palantir.com/docs/foundry/action-types/test-run/) · [Consistency and isolation](https://www.palantir.com/docs/foundry/action-types/consistency-guarantees/) · checked October 2, 2026 · Ready for Review*

A field guide. One action type can appear in many places. This note covers what each place adds or takes away, and then the form features that travel with the action type wherever it goes.

**[Docs]** Terms used below: a **single** action type takes one object-reference parameter; a **bulk** action type takes an object-reference **list**. Each surface only offers actions that fit the current selection.

## Object Views

**[Docs]** In an Object View, add an **Actions** section. Each button can:

- have its own label and colour;
- **apply immediately** using defaults, if they're valid, instead of opening the form;
- be **hidden or disabled** when a *non-visible* parameter is invalid;
- set parameter **defaults**: a property of the current object, current user, current time, current object, or a typed value;
- override parameter **visibility**.

The docs' tip is that one generic action can become several structured buttons, such as "Delay 10 minutes" and "Delay 30 minutes".

**Kestrel:** the Shipment view has **Hold 24h**, **Hold 72h** and **Re-route…**. The first two are the same *Hold shipment* action, applied immediately with a fixed duration. The third opens the form.

## Object Explorer

**[Docs]** Actions appear without any configuration in three places:

- the **Actions** dropdown in the exploration view (bulk actions on the current set);
- **Object Actions** on an object view (single and bulk);
- the **Linked objects** section (actions on the selected linked objects).

**[Explanation]** That makes Object Explorer the quickest way to check that a new action is wired up correctly, before anyone builds an app around it.

## Workshop

**[Docs]** Workshop uses the **Button group** widget. It offers the same options as Object Views, plus three layouts, icons and styles, and buttons that fire a Workshop **event**, a URL or an object-set export. Defaults can come from a Workshop **variable**. Those local defaults beat the action type's own defaults ([02](02-rules-and-parameters.md#step-2--the-parameters)).

## Inline edits: the surface with the most traps

Ama's queue is a table. Her team wants to type a new priority straight into a cell.

**[Docs]** For an action-backed inline edit, "every parameter is optional and defaults to the existing value of the object", so users change one property at a time. Edits are **validated and submitted in bulk**, not one after another.

**In Object Explorer and Object Views**, configure it at **Ontology Manager → object type → Properties → Interaction → Inline edit**. Each property gets *one* inline-edit action. The action must:

- modify **one object of one type**;
- take its defaults from the object-reference parameter, so edited properties can't be static, *current user* or *current time*;
- have **no side-effect webhooks or notifications**.

Visibility settings and overrides are ignored there.

**In Workshop**, no extra configuration is needed, but the bulk-submission rules apply.

**[Docs] When inline edits go wrong:**

- Two actions in the same table that write the **same object**, create the **same link**, or keep an **aggregate** consistent. Editing the same object twice is an error.
- **Join-table link** adds and deletes aren't supported.
- **Submission criteria that read shared or linked objects** are checked once per edit *against the unedited values*, then everything is submitted together. The docs' example: a per-airport limit of "50 minutes of total delay" can be exceeded when several cells are edited at once.
- In a **scenario**, inline edits are applied *sequentially in a non-deterministic order*, so some will succeed that would fail outside a scenario. The docs say not to rely on that.

**Kestrel:** *Set case priority* is fine inline, because it touches one property on one object. *Assign to agent*, which enforces "max 15 open cases per agent", is **not**: that is an aggregate criterion, and a bulk paste could give one agent 40 cases. It stays a form action.

**[Explanation]** Function-backed actions used inline need **batched execution** to get past the 20-call limit ([04](04-function-backed-actions.md#batched-execution-inline-edits-and-automate)).

## Form features that travel with the action type

**Sections.** **[Docs]** A form can group parameters into **sections**. A section has a title, a description that is always visible, and one or two columns. It can be collapsible or hidden, and it can have **conditional overrides**. A section can start hidden and appear when an earlier parameter calls for it. Drag parameters into sections in the **Form** tab, where the order is the display order.

*Re-route shipment* gets a **Customer request details** section that appears only when `reason = customer request`. It's the same idea as the parameter override in [02](02-rules-and-parameters.md#step-4--make-the-note-required-sometimes), applied to a group of parameters.

**Files.** **[Docs]** There are two ways to accept a file:

| | Media reference property (recommended) | Attachment property |
|---|---|---|
| Backed by | A media set | String column (array for multiple) |
| Scale | "Billions of files" | 200 MB per file; each attachment can be linked to **10 objects** in its lifetime |
| Extras | Transformations, LLM capabilities, rich previews, formats such as DICOM and GeoTIFF | — |
| Permissions | Submission criteria decide who may upload. Referencing the media set hands its upload control to whoever manages the action. | Follow the object it is attached to |
| Lifecycle | Persisted on successful submission | Uploaded immediately; orphaned files from failed or cancelled forms are deleted later |

**[Docs]** Note from the limits page: media-reference **arrays** aren't supported in actions.

Kestrel's *Log damaged parcel* takes a photo as a media reference ([05-08](../05-properties/08-time-series-media-geo-and-vectors.md)).

## From code and agents

**[Docs]** The same action types can be applied through the **OSDK** and the API. When an optional parameter is omitted in an OSDK request, the configured default fills it in. If that default is "current value of a property", the value is **written back** to the property.

**[Explanation]** Every rule in this module applies to code-driven callers too: criteria, side effects, logs and limits. That is why the Delivery Desk agent will get *actions* as its tools, not raw edit APIs ([16-03](../16-ai-and-agents/03-ontology-tools-for-agents.md#the-rules-kestrel-drew)). Calling actions from code is covered in [10-04 — OSDK and APIs](../10-applications/README.md).

## Before go-live checklist

- [ ] Test-run every action with users from each group ([03](03-submission-criteria.md#test-cases-run-before-go-live)).
- [ ] Parameters the context decides are hidden and defaulted.
- [ ] Inline-edit actions touch one object and don't depend on aggregates.
- [ ] Destructive actions are revertible, or soft deletes ([07](07-consistency-reverts-and-logs.md#incident-3--undo-after-lunch)).
- [ ] An action log exists where decisions need an audit trail.
- [ ] Monitoring rules exist on the important actions.

---
[Module index](README.md) · Previous: [07 — Consistency, reverts and logs](07-consistency-reverts-and-logs.md) · Next module: [09 — Functions](../09-functions/README.md)
