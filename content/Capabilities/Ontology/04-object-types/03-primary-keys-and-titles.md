# 03 — Primary keys and titles: the field checklist

*Sources: [Properties overview](https://www.palantir.com/docs/foundry/object-link-types/properties-overview/) · [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) · [Manage schema changes](https://www.palantir.com/docs/foundry/object-edits/schema-migrations/) · [Edit object type properties](https://www.palantir.com/docs/foundry/object-link-types/edit-properties/) · checked October 2, 2026 · Ready for Review*

The *why* of keys — identity, determinism, composite keys — is in [01 — Keys and identity](../01-foundations/02-keys-and-identity.md). This page is the short version to use while you're actually setting up an object type.

## Which types can be a key or a title?

**[Docs]** From the *Properties overview* table:

| Base type | Primary key? | Title key? | Why |
|---|---|---|---|
| String, Integer, Short | **Yes** | Yes | — |
| Date, Timestamp | Discouraged | Yes | Storage and display formats can differ, so values collide unexpectedly. Use a String |
| Boolean | Discouraged | Yes | Only two possible objects |
| Byte | Discouraged | Yes | Actions can only set it through an Integer parameter |
| Long | Discouraged | Yes | JavaScript loses precision above about 1e15, and some front-end code breaks |
| Float, Double, Decimal | **No** | Yes | — |
| Array | No | Yes, if its inner type can be a title | No null elements; no nested arrays in OSv2 |
| Geopoint | No | Yes | — |
| Cipher | No | Yes | — |
| Vector, Struct, Geoshape, Marking, Media reference, Time series, Geotemporal series, Attachment | No | No | — |

**[Explanation]** In practice: **make the primary key a String** unless there's a clear reason not to. Numeric source IDs can be converted to strings in the pipeline.

## Before you pick the primary key

- [ ] **Unique per row** in every backing datasource. On OSv2, a duplicate within one transaction fails the build.
- [ ] **Never null.**
- [ ] **Deterministic:** the same source row produces the same key on every rebuild. No row numbers, no `uuid()` in transforms.
- [ ] **Stable:** it won't be corrected or recycled. Emails and names fail this.
- [ ] **Shared by every datasource** if the type will have several (an MDO).
- [ ] **Agreed with the domain owner** and written into the type's description.

## Before you pick the title key

- [ ] People **recognize** it in a list: an order number, a person's name, a product name.
- [ ] It's **on the object itself**, not copied from another object. If the best label lives on a linked object (the customer's name for an order), use the object's own identifier instead. Apps can show the linked value next to it.
- [ ] It's **reasonably unique** in practice. Five shipments all titled "Parcel" are hard to tell apart.

## What you can't easily undo

**[Docs]** These come from the edit, status and schema-migration pages.

| Change | Consequence |
|---|---|
| Change the **primary key** | Prompts you to **delete all existing edits**. Schema migrations can't apply to the primary key property. Not allowed at all while the type is **active** |
| Change the key's **values** upstream (a reformatted ID) | Objects with the old keys disappear and new ones appear. Edits and links attached to the old keys are orphaned |
| Change the **title key** | Non-breaking. Edits are unaffected |

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Funnel build fails right after a data change | Duplicate keys within one transaction. Check uniqueness in the pipeline |
| Object count lower than row count | Duplicates across transactions, where the later one wins, or a streaming source dropping invalid records |
| User edits "vanished" after a pipeline change | Key values changed, so the edits still exist but on keys that no longer exist |
| Links disappeared | Key values changed on one side; the foreign keys no longer match |
| Long IDs display oddly in apps | Long key past JavaScript's safe range. Use String |

## Kestrel decisions

**[Example]**

| Object type | Primary key (String) | Title key |
|---|---|---|
| `Order` | `orderId` (`O-10442`) | `orderId` — Ama searches by order number. The customer is one link away |
| `OrderLine` | `orderLineId` (`O-10442-1`) | `productNameAtCheckout` |
| `Shipment` | `shipmentId` (`DHL|77812`) | `trackingNumber` |
| `Customer` | `customerId` (master ID) | `fullName` |
| `Carrier` | `carrierCode` (`DHL`) | `carrierName` |

---
[Module index](README.md) · Previous: [02 — Backing datasources and mapping](02-backing-datasources-and-mapping.md) · Next: [04 — Creating and editing object types](04-creating-and-editing-object-types.md)
