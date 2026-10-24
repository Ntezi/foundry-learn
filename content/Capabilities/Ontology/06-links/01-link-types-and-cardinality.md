# 01 — Link types and cardinality

*Sources: [Link types overview](https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/) · [Create a link type](https://www.palantir.com/docs/foundry/object-link-types/create-link-type/) · [Edit link types](https://www.palantir.com/docs/foundry/object-link-types/edit-link-types/) · [Link type metadata](https://www.palantir.com/docs/foundry/object-link-types/link-type-metadata/) · [Add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/) · checked October 2, 2026 · Ready for Review*

**[Docs]** A link type is "the schema definition of a relationship between two object types". A link is one instance of that relationship between two objects in the **same** ontology. Links across ontologies aren't supported; the docs point to shared ontologies instead.

Three ideas about links trip people up, so this note takes them in turn: links have **two sides**, cardinality is **declared rather than enforced** for one-to-one, and there are **three ways to store** a link.

## One link type, two sides

**[Docs]** Every link type has exactly two sides, one per object type. Each side has its own **display name**, **plural display name** (for a "many" side), **API name** and **visibility**.

Creating `Flight ↔ Aircraft` once gives you both directions:

- `flight.assignedAircraft`
- `aircraft.flights`

You **don't** create a second, reverse link type.

**[Docs]** You can have several link types between the same two object types, provided each is a different real-world relationship. For example, *assigned aircraft* and *scheduled maintenance* between Flight and Aircraft. A type can also link to **itself**, such as `Employee` *Direct report ↔ Manager*.

**[Docs]** Rules for link API names:

- start lowercase and use only alphanumeric characters;
- unique among the link types on that object type;
- 1–100 characters, NFKC-normalized, not a reserved word;
- can't change while the link type is **active**.

**[Recommendation]** Name each side for what you find when you follow it, read from the other object.

| Link | From Order you see… | From Customer you see… |
|---|---|---|
| Order ↔ Customer | `customer` ("Customer") | `orders` ("Orders") |
| Shipment ↔ Carrier | `carrier` | `shipments` |
| Employee ↔ Employee | `manager` | `directReports` |

If one side's name would just be the object type's name, check that it's still meaningful in context. For example, `placedBy` may say more than `customer` if a `Customer` can also *receive* orders placed by someone else.

## Cardinality

**[Docs]** Ontology Manager offers four cardinalities:

| Cardinality | Storage | Notes |
|---|---|---|
| **One-to-one** | Foreign key | "Serves as an indicator of the intended relationship"; **not enforced** |
| **Many-to-one** / **one-to-many** | Foreign key on the "many" side, pointing to the "one" side's primary key | The key on the "one" side must be that type's primary key, so the "one" side is unique |
| **Many-to-many** | A **join table** dataset with pairs of primary keys | Needs a datasource of its own. Required if users should be able to edit the link |

**[Docs]** This resolves [RQ-16](../SOURCES.md#open-research-questions). One-to-one links **can** be created in Ontology Manager (through foreign keys). **Pipeline Builder's** Ontology outputs support only one-to-many and many-to-many.

**[Explanation]** "Not enforced" matters. If two `Chargeback` rows point to the same `Payment`, the one-to-one link will happily show two. Enforce uniqueness in the pipeline if the business rule is real.

## Three ways to store a link

**[Docs]** The creation helper asks first for the *relationship type*:

1. **Object type foreign keys** — one-to-one or many-to-one. Pick the foreign-key property on one type and the other type's primary key. The helper auto-selects a foreign key if names and types match.
2. **Join table dataset** — many-to-many. Pick a dataset with a column for each side's primary key, or **Generate join table** to get an empty dataset with the right schema, useful when links will come from user edits.
3. **Backing object type** — an **object-backed link**. A third object type sits in the middle and carries metadata about the relationship. It is covered in [02 — Many-to-many and object-backed links](02-many-to-many-and-object-backed-links.md).

**[Docs]** The rest of the helper:

- names for both sides, and API names;
- a **save location**, a project;
- **Save** in Ontology Manager.

One datasource can back only one link type (error `Phonograph2:DatasetAndBranchAlreadyRegistered`).

## Changing a link later

**[Docs]**

- **Active link types** can't be deleted, and their API names can't change.
- **Status follows the object types:** if either object type becomes experimental, example or deprecated, the link type follows. The same happens if a foreign-key property changes status ([03 — Statuses](../03-ontology-fundamentals/04-type-metadata-and-statuses.md#statuses)).
- **Datasource swaps:** changing a many-to-many link's datasource remaps the keys automatically only when the schema matches.
- **Key types:** a join-table column's type must match the primary key type it maps to.
- **OSv1:** the edit page also warns that changing cardinality, the foreign key, the join datasource, or deleting the link unregistered and reregistered the datasource. Links were unavailable during the reindex, and writeback edit history could be lost.

## Kestrel's first links

**[Example]**

| Link type | Cardinality | Stored as | Why |
|---|---|---|---|
| Order ↔ Customer | many-to-one | FK `Order.customerId` → `Customer.customerId` | Every order has one customer |
| Shipment ↔ Order | many-to-one | FK `Shipment.orderId` | An order can ship in several parcels |
| Shipment ↔ Carrier | many-to-one | FK `Shipment.carrierCode` | — |
| Shipment ↔ Warehouse | many-to-one | FK `Shipment.warehouseId` | — |
| Payment ↔ Chargeback | one-to-one | FK `Chargeback.paymentId` | Intent only; uniqueness checked in the pipeline |
| Order ↔ Product | many-to-many | **Through `OrderLine`** — see the next note | It carries quantity and price |

**[Example]** Two links Priya decided **against**:

- *Order ↔ Warehouse*: it's derivable through the shipment, and an order can ship from two warehouses.
- *Customer ↔ Carrier*: no real-world relationship; it would only be a convenience join.

[Design 02 §4](../11-design/02-structural-guidance.md#4-links-and-object-backed-link-types-relationships-with-meaning) says every link should answer a domain question.

---
[Module index](README.md) · Next: [02 — Many-to-many and object-backed links](02-many-to-many-and-object-backed-links.md)
