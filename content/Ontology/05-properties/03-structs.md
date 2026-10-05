# 03 — Structs

*Sources: [Structs overview](https://www.palantir.com/docs/foundry/object-link-types/structs-overview/) · [Create a struct type](https://www.palantir.com/docs/foundry/object-link-types/create-struct-type/) · [Automapping](https://www.palantir.com/docs/foundry/object-link-types/struct-automapping/) · [Structs and shared properties](https://www.palantir.com/docs/foundry/object-link-types/struct-shared-properties/) · [Struct main fields](https://www.palantir.com/docs/foundry/object-link-types/struct-main-fields/) · [Ontology design: Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) · [Edit struct types](https://www.palantir.com/docs/foundry/object-link-types/edit-struct-type/) · checked October 2, 2026 · Ready for Review*

**[Docs]** A struct lets **one property hold several named, typed fields**. The docs' examples are a *Full Name* with `firstName` and `lastName`, and an *Address* with `street`, `city`, `postalCode` and `country`. [Design 02 §2](../11-design/02-structural-guidance.md#2-structs-group-fields-that-belong-together) already argues *when* to use one: fields that belong together, and AI outputs together with their evidence. This note covers how structs behave, including one query behaviour that surprises almost everyone.

## The rules

**[Docs]**

- **Backing:** one **dataset column whose type is a struct**, chosen as the property's *backing column*. Fields can come from different sources, but must be combined into one struct column **before** the Ontology.
- **No nesting:** a struct can't contain a struct.
- **No array fields:** a field can't be an array. A property *can* be an **array of structs**.
- **At least one field.**
- **Field types:** Boolean, Byte, Date, Decimal, Double, Float, Geopoint, Integer, Long, Short, String, Timestamp.
- **Sources:** structs can be created from datasets and restricted views only. **OSv1 will never support them.**
- **Not keys:** structs can be neither primary keys nor title keys.

**Open question** [RQ-18](../SOURCES.md#open-research-questions): the *Create an object type* page says a backing datasource "may not contain `MapType` or `StructType` columns". The struct pages say a struct property is backed by a struct-type column. These can't both hold everywhere. Most likely the creation helper's automatic mapping can't handle struct columns, and struct properties are created afterwards as described below. That is unconfirmed.

## The surprise: fields are matched independently

**[Docs]** Structs are indexed like Elasticsearch object fields: **each field condition is evaluated on its own**. For an **array of structs**, a query can match an object even if no single struct satisfies all the conditions.

**[Example]** A `Customer` has `addresses` as an array of structs:

```json
[ {"city": "Accra", "type": "billing"},
  {"city": "Kumasi", "type": "delivery"} ]
```

Ama filters for *city = Accra AND type = delivery*. **This customer matches**: "Accra" comes from one struct and "delivery" from the other.

**[Recommendation]** If combinations matter ("delivery address in Accra"), don't rely on multi-field filters over an array of structs. Instead:

- add a precomputed property (`deliveryCity`); or
- model addresses as a linked `Address` object type, where each address is its own object; or
- keep a single delivery-address struct rather than an array.

## Creating one

**[Docs]**

1. In the object type's **Properties** tab, choose **Create property**.
2. Set the base type to **Struct**, then pick the **backing column**.
3. Under **Struct fields**, choose **Add field → New field**, name it, and map it to a field of the column.
4. Alternatively, use **Automap all** on an existing property's column mapping. Pipeline Builder's create-object-type wizard can also automap struct fields when it creates the type.

**Editing a field later.** **[Docs]** Struct fields are edited from the property editor's *Struct fields* section. **Changing a field's API name generates a new field RID**, which "will override the existing index", like changing a property's ID, and every application that references the field must be updated. **[Explanation]** Treat a field rename as a breaking change and use the [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md#part-2--a-deprecation-playbook-worked-once) playbook.

## Main fields (beta)

**[Docs]** Mark one or more fields as the struct's **main fields**: the core value, as opposed to metadata about it. Compact views such as Workshop tables show only main fields, with the rest on hover or expand. Queries still use **all** fields; storage is unchanged. You can map **any** struct field to an interface property, whether or not it's a main field.

**[Example]** Kestrel's fraud model writes a `riskAssessment` struct onto `Payment`:

| Field | Main field? |
|---|---|
| `score` | yes |
| `band` | yes |
| `modelVersion` | no |
| `scoredAt` | no |
| `topReason` | no |

Tomás sees "0.91 · HIGH" in his table and hovers for the model version and the reason. That is the *AI output with its evidence* pattern from Design 02, displayed sensibly.

## Structs and shared properties

**[Docs]**

- A struct can be a **shared property**. Converting a local struct property into a shared one needs its fields **re-mapped**.
- Local struct properties backed by a shared property inherit field metadata (display name, description, aliases) but keep their own field RIDs.
- New fields must be added to the **shared** property first, then mapped on every object type that uses it.

## Where structs work today

**[Docs]** Support is "still expanding":

| Area | Support |
|---|---|
| Ontology Manager, Pipeline Builder | Define and edit |
| Actions | Create and modify values |
| Workshop | Display; use as variables |
| Marketplace | Package and install |
| Object Explorer | Search by struct values; struct *field* search still in development |
| OSDK | Some SDKs; check unsupported types |
| Functions | TypeScript v2 and Python support struct parameters and edits |

Derived-property queries in current TypeScript OSDK versions can't include struct properties; exclude them with `$select` ([05 — Derived properties](05-derived-properties.md)).

## Struct, separate properties, or linked object?

| Use… | When |
|---|---|
| **Struct** | The fields form one value, change together, and nobody searches for the value as a thing in itself (an address on an order, a model output with its metadata) |
| **Separate properties** | Users filter, sort or aggregate on each field independently and often |
| **Linked object type** | The value has its own identity, lifecycle or relationships (a customer's saved addresses that can be edited and reused), or you need reliable multi-field queries over many values |

---
[Module index](README.md) · Previous: [02 — Value types](02-value-types.md) · Next: [04 — Shared properties](04-shared-properties.md)
