# 04 — Shared properties

*Sources: [Shared properties overview](https://www.palantir.com/docs/foundry/object-link-types/shared-property-overview/) · [Use shared properties](https://www.palantir.com/docs/foundry/object-link-types/use-shared-property/) · [Shared property metadata](https://www.palantir.com/docs/foundry/object-link-types/shared-property-metadata/) · [Structs and shared properties](https://www.palantir.com/docs/foundry/object-link-types/struct-shared-properties/) · [Create shared properties](https://www.palantir.com/docs/foundry/object-link-types/create-shared-property/) · [Edit shared properties](https://www.palantir.com/docs/foundry/object-link-types/edit-shared-property/) · checked October 2, 2026 · Ready for Review*

A short note, because the idea is small. It's still worth understanding precisely, because it's easy to confuse with interfaces.

## What gets shared, and what doesn't

**[Docs]** A shared property is a property definition that several object types use, so the same concept is modelled consistently and its **metadata** is managed in one place. In the docs' words, "while property metadata is shared across objects, the underlying object data is not."

The docs' example: `Employee` and `Contractor` both have *start date*. Make *start date* a shared property and its description, formatting and render hints are defined once. Each object type still has its own start-date values from its own data.

Shared properties show a **globe icon** in Ontology Manager. Their metadata includes:

- name and description;
- base type (and optionally a value type);
- value formatting, type classes, render hints and visibility;
- **usage**: which object types use it.

## Attaching one to an existing property

**[Docs]** In the property editor's *Shared property* section, pick an existing shared property or convert the property into a new one. What happens next:

| Behaviour | Detail |
|---|---|
| **IDs stay put** | The property's own ID and API name don't change, so downstream code keeps working |
| **Metadata becomes read-only** | Fields inherited from the shared property can't be edited directly on the object type |
| **Type classes merge** | You can still add or remove type classes locally. The effective set is the union of local and shared ones |
| **Render hints are overwritten** | The shared property's render hints replace the local ones. Check them first |
| **You can detach** | *Detach* removes the association |

**[Docs]** For **struct** shared properties, see [03 — Structs](03-structs.md#structs-and-shared-properties). Fields must be re-mapped, and new fields are added to the shared definition first.

## Creating, editing and deleting

**[Docs]**

- Shared properties are created on Ontology Manager's **Shared properties** page (*New shared property*). They carry a **subset** of property metadata: name, description, base type, value formatting, type classes, render hints and visibility. The base type must match the column type of any object type that uses it.
- Editing groups the same settings into *General*, *Display*, *Interaction* and *Details* tabs. The **Usage** tab lists the object types using the shared property, and the **Permissions** tab controls who can edit it.
- **Deleting** a shared property doesn't delete data: "all object types using this shared property will revert to regular properties".
- The docs' render-hint example: if nobody searches or sorts on *start date*, turn off *Searchable* and *Sortable* on the shared property to speed up reindexing of every type that uses it ([10-07](../10-applications/07-searching-the-ontology.md#configuration-checklist)).

## Shared property or interface?

They solve different problems:

| | Shared property | Interface ([07](../07-interfaces/README.md)) |
|---|---|---|
| Unit of sharing | **One property's** definition | A **shape**: several properties, links and actions |
| What you gain | Consistent metadata | Polymorphism: query and act on "anything that is a `Location`" across object types |
| Typical use | `startDate`, `country`, `createdAt` on many types | Warehouses, stores and delivery addresses all treated as `Location` |

**[Explanation]** In practice, shared properties are often the building blocks that interfaces are made of. Use a shared property for a concept that recurs. Reach for an interface when you also want to treat the object types themselves as interchangeable.

## Kestrel

**[Example]** Priya creates three shared properties:

- `countryCode`, with the `CountryCode` value type from [02](02-value-types.md);
- `createdAt`, a Timestamp shown in the viewer's time zone;
- `sourceSystem`, a hidden String recording which system a record came from.

`Order`, `Customer`, `Warehouse` and `Supplier` use all three. When finance asks for timestamps in UTC everywhere, she changes `createdAt` once. Every type follows; no object data changes.

---
[Module index](README.md) · Previous: [03 — Structs](03-structs.md) · Next: [05 — Derived properties](05-derived-properties.md)
