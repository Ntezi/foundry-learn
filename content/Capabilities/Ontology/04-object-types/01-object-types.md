# 01 — Object types: three ways to look at one

*Sources: [Object types overview](https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/) · [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/) · [Ontology architecture overview](https://www.palantir.com/docs/foundry/object-backend/overview/) · [Ontology design: Best practices](https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/) · checked October 2, 2026 · Ready for Review*

**[Docs]** The official definition is short. An object type is "the schema definition of a real-world entity or event". An object is one instance of it, and an object set is a group of instances. The docs' example is an `Employee` type, the employee "Melissa Chang", and the set "all tenured employees".

That definition is right but thin. In practice an object type is three things at once, and each one explains a different class of decision and mistake.

## 1. A definition of meaning

An object type says *this is a thing the business recognizes*. It has a name people use, a plural, a description, an icon, and properties that describe it.

**[Docs]** The design guidance makes this the first principle. Object types should be real-world concepts — a patient, a work order, a vessel — not database tables, API responses or spreadsheet tabs ([Design 01](../11-design/01-best-practices.md#1-domain-driven-design-model-the-world-not-the-source-data)).

**[Explanation]** The test for this lens is a person, not a schema. Could Ama explain what a `Shipment` is to a new colleague without mentioning the WMS? If the honest description is "a row from `wms_shp_hdr`", it is a source table wearing an object type's name.

## 2. An index of data

The same object type is also a physical thing.

**[Docs]** It has:

- a primary key that identifies each object;
- one or more backing datasources, or none if every object is created through actions;
- a Funnel pipeline that indexes the data into the object databases, merging user edits by primary key.

OSv2 sets hard edges on this side:

- up to **2,000 properties** per object type;
- up to **70 datasources** per object type (see [02 — Backing datasources](02-backing-datasources-and-mapping.md));
- data restrictions on keys and values (see [01 — Keys and identity](../01-foundations/02-keys-and-identity.md)).

**[Explanation]** This lens explains operational surprises. An object type with a beautiful definition can still:

- fail to index because of a duplicate key;
- show stale data because its pipeline is broken;
- be slow to query because it's enormous.

## 3. A contract with consumers

Once something uses it, an object type is an interface other people's work depends on:

- Workshop modules
- functions
- OSDK applications
- Object Views
- automations
- AIP agents

**[Docs]** That's why active object types can't be deleted and their API names can't change ([Statuses](https://www.palantir.com/docs/foundry/object-link-types/metadata-statuses/)). It's also why Ontology Manager tracks usage per type, and why breaking schema changes need explicit migrations (see [04 — Creating and editing](04-creating-and-editing-object-types.md)).

**[Explanation]** This lens is where [Design 01's open/closed principle](../11-design/01-best-practices.md#3-open-for-extension-closed-for-modification) comes from. Extend a widely used type by adding linked types or interfaces. Don't keep changing its core shape.

## When the three lenses disagree

Most object type design problems are a conflict between the lenses:

| Symptom | Lens that's winning | Lens that's losing | Usual fix |
|---|---|---|---|
| `OrderRow`, `OrderHeaderSAP`, `OrderWeb` | Index: mirrors sources | Meaning | Merge in the pipeline into one `Order` ([System Silos](../11-design/03-anti-patterns.md#system-silos)) |
| `Order` with 600 properties, mostly empty | Meaning, stretched to "everything about orders" | Index and contract | Split into linked types: `Shipment`, `Payment`, `Return` ([God Object](../11-design/03-anti-patterns.md#the-god-object)) |
| Nobody dares rename a confusing property | Contract | Meaning | Deprecate and replace; document the old name in aliases |
| Each team builds its own `Customer` | Each team's own meaning | Contract | One shared type, with security for team-specific facts ([Department Silos](../11-design/03-anti-patterns.md#department-silos)) |

## Kestrel: which object types first?

**[Example]** Priya doesn't model everything at once. She starts from Ama's first question in the [running example](../00-orientation/04-running-example.md): *which open orders will miss their promised date, and why?*

1. **`Order`** — the thing Ama acts on. Backed by the storefront orders dataset.
2. **`Shipment`** — the thing that's late. Backed by the WMS dataset; status from the tracking stream later.
3. **`Customer`** — the person Ama calls. Backed by the master-customer dataset.
4. **`Carrier`** — the usual cause. Small, slowly changing reference data.

`Product`, `Payment` and the rest wait until a question needs them.

Each type gets a one-sentence description written for Ama, not for Priya. For example, "*Shipment — one parcel or pallet sent to a customer from one warehouse by one carrier; an order can have several.*"

**[Explanation]** Starting from a decision rather than the source catalogue is what keeps the model small and meaningful.

## Related

[02 — Backing datasources and mapping](02-backing-datasources-and-mapping.md) · [03 — Primary keys and titles](03-primary-keys-and-titles.md) · [04 — Creating and editing](04-creating-and-editing-object-types.md) · [00 — What the Ontology is](../00-orientation/01-what-the-ontology-is.md) (where the dataset analogy breaks)

---
[Module index](README.md) · Next: [02 — Backing datasources and mapping](02-backing-datasources-and-mapping.md)
