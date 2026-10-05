# 01 — Interfaces

*Sources: [Interfaces overview](https://www.palantir.com/docs/foundry/interfaces/interface-overview/) · [Interface metadata](https://www.palantir.com/docs/foundry/interfaces/interface-metadata/) · [Implement an interface](https://www.palantir.com/docs/foundry/interfaces/implement-interface/) · checked October 2, 2026 · Ready for Review*

## The problem: three queues that are really one

By month six, Kestrel has three object types that all mean "something a person has to resolve":

- **Support Ticket**, from the support desk. Ama's team works these.
- **Chargeback**, from the Kestrel Pay ledger. Lena's team works these.
- **Fraud Case**, created by Tomás when he escalates a payment.

They have different keys, sources and permissions. Each also has a status, a priority, an opened-at time, an owner and a customer. Management wants one thing: *"show me every open case older than 48 hours, whoever owns it"*.

Daniel's first Workshop page has three tables and three filters. When a fourth type arrives (*Return Request*), he will have to edit the page again. Every new type means more rework. Interfaces exist for exactly this problem.

## What the docs say an interface is

**[Docs]** An interface is "an Ontology type that describes the shape of an object type and its capabilities". It has four parts:

- **interface properties**, defined locally on the interface (recommended) or reused from shared properties;
- **link type constraints**;
- **action type constraints**;
- metadata.

Object types *implement* it. One object type can implement several interfaces, and interfaces can *extend* other interfaces.

**[Docs]** Interfaces are abstract: they "are not backed by datasets, and cannot be instantiated directly". Every object you see through an interface is still a Support Ticket or a Chargeback underneath. In apps, the icon has a dashed outline.

**[Docs]** Implementing an interface buys you two things:

1. **Search returns the objects.** An Object Set Service search against the interface returns objects of every implementing type.
2. **Two vocabularies.** Each object can be read with its own API names, or with the interface's names when it is typed as the interface.

The docs' headline benefit is that a workflow written against the interface works with any new implementing type "without additional refactors".

## A data engineer's mental model, and where it breaks

To a data engineer, `Case` looks like a **`UNION ALL` view**:

```sql
CREATE VIEW all_cases AS
SELECT ticket_id  AS case_id, status, priority, opened_at, 'ticket'     AS kind FROM support_tickets
UNION ALL
SELECT cb_id      AS case_id, cb_state AS status, ...,     'chargeback' AS kind FROM chargebacks
UNION ALL
SELECT fraud_case_id ...                                                         FROM fraud_cases;
```

That intuition is right in three ways:

- each source keeps its own table;
- columns are *renamed* onto a common schema, which is the property **mapping** in [02](02-implementing-and-extending-interfaces.md);
- consumers query one thing.

It breaks in four ways:

- **The union is a contract, not a query.** The view silently drops a source nobody added to it. With an interface, a type declares that it implements it, and Ontology Manager **refuses to save** a type that is missing a required property, link or action mapping.
- **Behaviour comes along too.** A view has columns. An interface can also require *links* (every Case links to one Customer) and *actions* (every Case can be escalated). Those are covered in [03](03-interface-links-and-action-constraints.md).
- **No `kind` column hack.** The objects keep their concrete type. A consumer can narrow from Case back to Chargeback and see chargeback-only properties.
- **Not every surface supports it yet.** A SQL view works everywhere SQL works. Interface support varies by application, as the support table below shows. Check it before you design the workflow.

An application developer might reach for a different analogy: an interface in TypeScript or Java. That one is closer, and the docs use it: you "extend an interface to create a child interface", "much like interfaces in programming languages". The difference is that a Foundry interface describes *data and governed capabilities*, not methods.

## Three ways to model "a case", compared

| Approach | What it looks like | Where it fails |
|---|---|---|
| **One wide `Case` type** with a `caseKind` column | One dataset unioned upstream; chargeback-only columns null for tickets | Kestrel Pay's restricted data has to live in the same type as support tickets. Permissions, actions and keys all become `if kind = …`. This is the God Object of [Design 03](../11-design/03-anti-patterns.md). |
| **Shared properties only** (`caseStatus`, `casePriority` on all three) | Consistent names and value types | Nothing lets an app treat the three *as one set*. You still build three tables. See [05-04](../05-properties/04-shared-properties.md#shared-property-or-interface). |
| **`Case` interface**, implemented by all three | Each type stays separate and is governed on its own; one interface object set | Partial support in some apps. Designing a good shape takes upfront work. |

**[Explanation]** Use the interface when the *consumers* need to treat types as interchangeable. If only the *builders* want consistent names, a shared property is enough.

## When not to use one

- **The variants are the same entity.** "Priority = high" is a property value, not a sub-type. [Design 02 §3](../11-design/02-structural-guidance.md#3-interfaces-reusable-future-proof-abstractions) says the same.
- **Only one type will ever implement it.** You pay the abstraction cost and get no polymorphism. The exception is a Marketplace package, where future implementers are the point.
- **You need to search across more than 75 types.** **[Docs]** A *searchable* interface is limited to **75** implementing object types; a non-searchable one to **1,000**. Interfaces are searchable by default. **[Explanation]** A "thing" interface over hundreds of types is a sign that the abstraction is too broad.

## The support table

**[Docs]** This is the support table as of the check date. Re-check it before you build anything on it.

| Level | Where |
|---|---|
| Supported | Ontology Manager (define, edit, implement) · Marketplace (package, install) · Functions: **TypeScript v2** |
| Partial | Actions (interface rules; action type constraints are beta) · Object Set Service (search and sort; aggregation and interface link types in development) · OSDK (TypeScript yes; Java and Python in development) · Workshop (some widgets treat interface sets as object-type sets) |
| Not yet | Functions: **TypeScript v1 and Python** |

**[Explanation]** For Kestrel, the older TSv1 *case-ageing report* function that Daniel inherited can't take a `Case` parameter. It would have to be rewritten in TSv2 to report across all case types. This is one more reason the [module 09](../09-functions/README.md) notes favour TSv2 for new work.

## Permissions: one open question

**[Docs]** The overview says interfaces "are permissioned through Ontology roles". Elsewhere, Ontology resources have moved to project-based permissions ([03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md)). The page doesn't say whether that sentence predates the move, or how it combines with each implementing type's own object permissions.

**[Explanation]** The safe assumption is that seeing a Chargeback through `Case` still requires access to Chargeback data, because interfaces have no data of their own. Kestrel will **test this with a restricted user before launch**. The question is logged as [RQ-20](../SOURCES.md#open-research-questions).

## Where Kestrel lands

The design gets two interfaces:

- **`Case`**, implemented by Support Ticket, Chargeback and Fraud Case, with Return Request to follow. This is the polymorphism problem above.
- **`Location`**, implemented by Warehouse and Pickup Point. It has a geopoint and an address struct, so one map layer shows both. This is the small example promised in the [running example](../00-orientation/04-running-example.md).

The next note builds both.

---
[Module index](README.md) · Next: [02 — Implementing and extending interfaces](02-implementing-and-extending-interfaces.md)
