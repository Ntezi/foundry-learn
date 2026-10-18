# 01 — Introduction: understand the system you are building

Imagine being asked to build an internal order-management application. You might normally start with a database schema, backend endpoints and a frontend. This course starts one step earlier: the business already has two order systems, and the useful data is split between them. Your job is to make that existing information usable in one workflow.

The outcome is an orders inbox. A fulfillment worker can find orders that need attention, inspect an order and, later in the course, assign responsibility. The important learning is how information travels from the source systems to that decision.

## Follow one order through the architecture

| Stage | What happens to the order | Familiar software-engineering connection |
|---|---|---|
| Ingestion | Its exported CSV row becomes available in a Foundry dataset. | Loading external data into a staging table. |
| Transformation | Its fields are standardized and customer details are attached. | An integration adapter producing a shared data contract. |
| Dataset output | The prepared row is written to `all_orders`. | A persisted read model that other components can consume. |
| Ontology | The row is mapped to an identifiable Order with properties. | A shared domain model with platform-supported access and operations. |
| Workshop | The Order appears in filters, tables, charts and details. | An internal frontend built from configured components. |
| Action | An authorized user submits an assignment change. | A domain command, such as `assignOrder`, rather than an arbitrary field edit. |

These are analogies, not exact implementation equivalences. In particular, an Ontology object is not simply a class instantiated in your backend process, and a dataset is not necessarily an OLTP database table that your UI updates directly.

## Why the whole chain matters

A beautifully designed UI can still tell a worker the wrong thing. If an order disappeared during a customer join, the worker cannot assign it. If two orders share an identity, the user may not be addressing the entity they think they are. If the input CSV is old, a technically correct application can show an outdated queue.

That is why this course spends time preparing data before building screens. Each stage establishes something the next stage relies on: readable data, consistent meaning, stable identity, then a useful interaction.

The course's approximate one-hour pace is a guided tour. For your first exposure, spend longer on the boundaries between components. Being able to explain why the customer join comes before the union is more valuable than remembering where a toolbar button was.

## Where you could apply this pattern

A similar design could combine support tickets from two systems, reconcile inventory after an acquisition, or present transactions requiring investigation. These are illustrative applications of the pattern, not additional features built in this speedrun. In each case, start with the person's decision and work backward to the facts they need.

**Remember:** the deliverable is a better operational decision supported by a connected system. The individual Foundry tools are the means of constructing that system.

**Try explaining it:** why isn't uploading both order files enough to create an orders inbox?

A strong answer mentions inconsistent schemas, separate customer identifiers, the need to identify individual Orders and the missing user interaction. Uploading solves availability; it does not solve those other problems.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790982) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
