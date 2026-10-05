# 01 — Properties and base types

*Sources: [Properties overview](https://www.palantir.com/docs/foundry/object-link-types/properties-overview/) · [Base types](https://www.palantir.com/docs/foundry/object-link-types/base-types/) · [Property metadata](https://www.palantir.com/docs/foundry/object-link-types/property-metadata/) · [Edit object type properties](https://www.palantir.com/docs/foundry/object-link-types/edit-properties/) · [Types reference](https://www.palantir.com/docs/foundry/object-link-types/type-reference/) · [Datasets](https://www.palantir.com/docs/foundry/data-integration/datasets/) · checked October 2, 2026 · Ready for Review*

**[Docs]** A property is "the schema definition of a characteristic" of an entity or event. A property value is that characteristic on one object. The docs' example is an `Employee` with properties *employee number*, *start date* and *role*, which take the values 11502, October 9 2016 and software engineer for Melissa Chang.

The choice that matters most for each property is its **base type**. It decides what users and apps can *do* with the value: filter by range, draw it on a timeline, put it on a map, search it semantically.

## Three layers of type

**[Docs]** Foundry has three layers:

| Layer | Example | Who defines it |
|---|---|---|
| **Field type** (dataset column) | `STRING`, `DOUBLE`, `ARRAY`, `STRUCT`… | Fixed by the platform |
| **Base type** (property) | String, Double, Geopoint, Media reference… | Fixed by the platform. Every field type is a valid base type except Map and Binary, plus some advanced types |
| **Value type** | "Email address", "ISO country code" | You, per space; see [02 — Value types](02-value-types.md) |

**[Docs]** The types reference says Foundry's data types are "inspired by" RDF, OWL and XSD. That is a nod to the semantic-web tradition discussed in [01 — Semantic layers](../01-foundations/04-semantic-layers-and-domain-models.md).

## The base types

**[Docs]**

| Group | Base types | Notes |
|---|---|---|
| Text | String | The usual choice for identifiers and codes |
| Whole numbers | Integer, Short, Byte, Long | Byte and Short have *limited support*: the property metadata page says they can't be used in action types. The properties overview instead says Byte can only be set through an Integer parameter; the two pages differ. Long is unsafe above about 1e15 in JavaScript |
| Decimals | Float, Double, Decimal | Float has *limited support*: not usable in actions |
| Logical | Boolean | — |
| Time | Date, Timestamp | Timestamps can be shown in a fixed or the viewer's time zone ([07 — Formatting](07-formatting-and-reducers.md)) |
| Collections | Array of any base type except Vector and Time series | No null elements; no nested arrays on OSv2; at most 100,000 elements |
| Structured | Struct | Several named fields in one property ([03 — Structs](03-structs.md)) |
| Geospatial | Geopoint, Geoshape | Indexed for geospatial search ([08](08-time-series-media-geo-and-vectors.md)) |
| Rich content | Media reference, Attachment | Media references point into media sets |
| Temporal series | Time series, Geotemporal series | Values come from a time series sync |
| AI | Vector | For semantic search. KNN queries only; at most 2,048 dimensions |
| Security | Marking (mandatory control), Cipher text | [06 — Mandatory control properties](06-edit-only-required-and-mandatory-control.md) |

The full primary-key and title-key validity per type is on [04 — Primary keys and titles](../04-object-types/03-primary-keys-and-titles.md).

## Choosing a base type

**[Recommendation]** Ask what users will do with the value, then pick the type that enables it:

| Users want to… | Choose | Not |
|---|---|---|
| Filter "orders this week", show a timeline | Timestamp or Date | String with a date in it |
| Sum, average, compare ranges | Integer, Long, Double, Decimal | String with a number in it |
| Use an identifier, even a numeric one | String | Long (precision) or Integer (leading zeros) |
| Use money | Decimal for exact amounts, or a value type; the currency in its own property or a struct | Double, if exactness matters for finance |
| Plot it on a map | Geopoint or Geoshape | Separate lat and lon numbers. The `geo` latitude/longitude type classes are deprecated |
| Pick from a fixed list (status, tier) | String plus a value type with an **enum** constraint | Free text |
| Show an image, PDF or audio | Media reference | A URL string |

**[Explanation]** Money is a good example of the trade-off. Exact decimal arithmetic matters for Lena's refund totals, so `refundAmount` is Decimal. Currency is a separate property (`currency` with an enum value type), or the two travel together in a struct.

## Property metadata you'll touch

**[Docs]** Each property has:

- an **ID**, used when configuring apps;
- an **API name** in camelCase, used in code;
- a **display name** and a **description**;
- a **status**;
- **keys** (whether it's the primary or title key);
- a **base type**;
- **value** and **conditional formatting**;
- **type classes** and **render hints**;
- **visibility**: prominent, normal or hidden.

**[Docs]** Editing rules:

- An **active** property can't be deleted, and its API name can't change.
- Deleting a property breaks views that reference it, once saved.
- Several properties can be bulk-edited: base type, type classes, render hints, visibility and formatting.
- **Changing a base type** must match the backing column's type, and you must also update the expected type in every action that writes the property. On OSv2 it is a breaking change when the property has edits ([04 — Creating and editing](../04-object-types/04-creating-and-editing-object-types.md)).

## Kestrel: `Order` properties

**[Example]**

| Property (API name) | Base type | Why |
|---|---|---|
| `orderId` | String | Primary key |
| `placedAt` | Timestamp | Timelines; "last 24 hours" filters |
| `status` | String + enum value type | Fixed list: PLACED, PAID, PICKING, SHIPPED, DELIVERED, CANCELLED |
| `totalAmount` | Decimal | Exact money |
| `currency` | String + enum value type | ISO code |
| `deliveryAddress` | Struct | Street, city, postcode, country together ([03 — Structs](03-structs.md)) |
| `deliveryLocation` | Geopoint | Map of today's deliveries |
| `promisedDeliveryDate` | Date | Compare with today in apps; no stored "days until due" ([Case study 01 §1](../17-case-studies/01-course-ontologies-reviewed.md#1-speedrun-your-first-end-to-end-workflow--order)) |
| `holdReason` | String | Edit-only: set by the *Hold order* action ([06](06-edit-only-required-and-mandatory-control.md)) |

`customerId` is kept only as the **foreign key** behind the Order → Customer link (see [06 — Links](../06-links/README.md)). It's hidden from users, who follow the link instead.

---
[Module index](README.md) · Next: [02 — Value types](02-value-types.md)
