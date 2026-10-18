# 21 — The Ontology: give prepared data shared business meaning

You now have a dataset intended to contain prepared order records. The Ontology stage defines how those records represent Orders that applications can identify and use consistently.

The course introduces the Ontology as a representation of the business and creates an Order object type over `all_orders`. The important shift is from a transformation output to a shared application-facing model.

## Vocabulary through one concrete Order

An **object type** is the model definition: for example, Order. An **object instance** is one particular Order identified by a primary-key value. A **property** is a modeled attribute such as Item Name or Assignee. A **link type** can describe a relationship between object types, while an **Action type** defines an operation that can change modeled state.

The tutorial creates the Order type and maps its prepared fields. It does not create a separate Customer object and Order-to-Customer link merely because customer columns are present. An enriched dataset join and an Ontology relationship are different modeling constructs.

Palantir describes the Ontology as combining the business representation with operational capabilities over it. The course's single Order model is a small starting point within that broader concept. [Official Ontology overview](https://www.palantir.com/docs/foundry/ontology/overview).

## How to relate this to domain modeling

In a backend, you might define an `Order` model and expose operations such as `assignOrder`. Consumers rely on the meaning of that model instead of repeatedly interpreting vendor payloads.

The Ontology serves a comparable architectural purpose, with platform-managed definitions, data access and operational capabilities. It is not simply an ORM declaration over a SQL table. Do not assume creating a property has implemented business validation, a transactional endpoint or a synchronization rule to the original systems.

Likewise, a “digital twin” here means a modeled representation of relevant business entities and relationships. It does not promise a perfect, real-time copy of every event. The representation is only as current and accurate as its data and update mechanisms.

## Why not put all meaning in the application?

Imagine a second team builds a supervisor dashboard. If each app independently chooses what counts as an Order and which field identifies it, the teams can disagree. A shared model gives them a common place to define and reference those choices.

That reuse creates responsibility. Changing primary-key meaning can affect existing object references. Renaming or changing a property used by consumers requires coordination. Modeling decisions can outlive the first screen you build.

## Why the pipeline came first

The input data needed compatible fields and reliable identities before it could support this shared model. The Ontology does not make duplicate IDs unique or correct a wrong customer join by itself. Those problems originate in the data contract you prepared.

For this training mapping, think:

```text
one prepared row with a valid unique order_id
    → one intended Order instance
    → properties used by Workshop
```

That is the intended mapping for this exercise, not a universal restriction on every possible Ontology datasource design.

**What to retain:** a business model gives data a reusable interpretation and operational interface. The fact that a model exists does not establish that its data, permissions or operations are already correct.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791243) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
