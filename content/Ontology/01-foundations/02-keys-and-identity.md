# 02 — Keys and identity

*Sources: [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) · [Funnel batch pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/) · [Views](https://www.palantir.com/docs/foundry/data-integration/views/) · checked October 2, 2026 · Ready for Review*

## The rules in brief
- **[Concept]** A **key** is the value that says *which* thing a record is about. **Identity** means two records are the same thing because they have the same key, even if every other value differs.
- **[Docs]** Every Foundry object type needs a **primary key**: a property whose value is **unique for every object**. For a datasource-backed type, that means unique for every row of the backing datasource.
- **[Docs]** The primary key must also be **deterministic**. User edits are attached to the primary key value, and links depend on it. If keys change between builds, "edits can be lost and links may disappear".
- **[Docs]** OSv2 rejects some types as primary keys:
  - geopoints and geoshapes;
  - arrays;
  - time series;
  - real numbers (decimal, double, float).
- **[Docs]** Duplicate primary keys **within one transaction** fail indexing. **Across transactions**, the later transaction wins.
- **[Docs]** The **title key** is separate: it is the display name shown to people, such as a full name or an order number.
- **[Recommendation]** Build keys from stable business identifiers, combining columns where necessary. Never use row numbers, random UUIDs generated in a transform, or values people may correct, such as email addresses.

## What goes wrong without stable keys
**[Concept]** Data platforms rebuild data constantly. If "this customer" is identified differently on Tuesday than on Monday, everything attached to the old identity is orphaned:

- comments;
- edits;
- links;
- audit history;
- model scores.

Keys are the glue between **pipeline data**, which is rebuilt, and **human and agent decisions**, which must persist.

## Kinds of key, and what makes one good

### Kinds of key
**[Concept]**

| Kind | What it is | Kestrel example | Strengths | Risks |
|---|---|---|---|---|
| **Natural / business key** | An identifier the business already uses | `order_id = O-10442`, a product SKU | Meaningful; stable if the business treats it as permanent | May be reused, reformatted or corrected |
| **Composite key** | Several columns that together identify a thing | `order_id + line_no` for an order line; `carrier_code + tracking_no` for a shipment | Precise; no new identifiers invented | Must be combined into one value for systems that need a single key |
| **Surrogate key** | An identifier created by a system, with no business meaning | A database auto-increment ID | Unique, never changes in that system | Meaningless across systems; dangerous if regenerated |
| **Derived (hashed) key** | A deterministic hash of the identifying columns | `sha256("DHL" + "|" + "77812")` | Stable across rebuilds; a fixed-length single value | Opaque; changes if the input columns or the formula change |

### Four properties of a good key
**[Concept]**

1. **Unique:** no two things share it.
2. **Non-null:** every record has one.
3. **Deterministic:** the same input always produces the same key, on every rebuild.
4. **Stable:** it doesn't change while the thing it identifies still exists.

**[Explanation]** The Foundry docs explicitly require 1 and 3. The Views page adds 2 for Foundry views. Property 4 is what protects edits over months.

### Identity vs display
**[Concept]** Machines need a stable identifier. People need a recognisable label. Keep them separate:

| Property | Job | Changes allowed? |
|---|---|---|
| `orderId` (primary key) | Identity, for joins, edits and links | No |
| `orderNumber` or `title` (title key) | What Ama sees in a list | Yes, if the business renames things |

## What Foundry requires
**[Docs]** These rules come from the *Create an object type* page.

- **Primary key:** "the property that acts as a unique identifier for each instance". Every object must have a unique value, and for datasource-backed types each **row** must have a different value.
- **Title key:** "the property that acts as a display name", for example a full-name property for `Employee`.
- **Checking before you start:** check the backing datasource for duplicates before choosing a primary key.
  - On **OSv2**, a duplicate primary key causes Funnel batch pipeline errors and **a build failure**.
  - On **OSv1**, the update appeared successful but could cause "unexpected changes".
- **Determinism:** the key should be a function of one or more columns. Avoid numbered rows and random key generation.
- **Edits are bound to the key:** "Edits are permanently attached to the primary key value you made them for." Changing an object type's primary key prompts you to **delete all existing edits**.
- **Action-created objects:** an object type with no backing datasource still needs a primary key, and each object created by an action needs a unique value.

**[Docs]** These rules come from the *Data restrictions* page (OSv2).

- **Duplicates:** a duplicate key within a single transaction fails indexing. Across transactions, the version in the later transaction is used.
- **Disallowed key types:** geopoint, geoshapes, arrays, time series properties, and real numbers (decimal, double, float).
- **Batch and streaming behave differently:** for batch datasources, violations fail the indexing job; for streaming datasources, violating records are **dropped**.

**[Docs]** These rules come from the *Funnel batch pipelines* page.

- **Merging:** Funnel joins datasource changes and user edits "by the object type's primary key".
- **Incremental datasets:** for these, "most recent transaction wins". Each transaction may hold **at most one row per primary key**, so a changelog dataset usually needs a window transform first to keep one row per key.

**[Docs]** These rules come from the *Views* page. A Foundry **view** with a primary key deduplicates the rows from its backing datasets. The key columns can't contain nulls, and once set the key can't be changed without creating a new view.

## Compared with a database primary key
**[Analogy]** A primary key in a relational database guarantees uniqueness **within one table, now**. A Foundry primary key also has to guarantee identity **over time, across rebuilds**, because edits, links, comments and action history hang off it.

**[Analogy]** That makes it closer to the **business key in a data vault hub** than to an auto-increment ID.

**[Analogy] Where it breaks:** a relational database enforces uniqueness when you insert a row. Foundry checks it at **indexing time**: the build fails, or for streams the record is dropped. The pipeline that produces the backing dataset is responsible for uniqueness.

## Kestrel: Priya picks keys

**[Example]** Priya picks keys for the first object types.

| Object type | Primary key | Why | Title key |
|---|---|---|---|
| `Order` | `order_id` from the storefront (`O-10442`) | A business key, never reused | `order_id`. Ama searches by order number, and the customer is one link away. Copying the customer's name onto `Order` would break the no-copies rule in [01 — Normalization](03-normalization-and-denormalization.md) |
| `Order Line` | `order_id` + `"-"` + `line_no` → `O-10442-1` | Composite; stable because line numbers are fixed at checkout | Product name at checkout |
| `Product` | SKU (`TNT-02`) | Business key shared by the PIM and the storefront | Product name |
| `Shipment` | `carrier_code` + `"|"` + `tracking_no` → `DHL|77812` | Tracking numbers are unique per carrier only | Tracking number |
| `Customer` | **Not** email; a master customer ID | Emails change and get corrected; the same person exists in three systems | Full name |

**[Example]** The customer row is the hard one. The storefront, support desk and payments ledger each have their own customer ID. Priya will need a matching step that assigns one **master customer ID** and keeps a crosswalk of the source IDs. That is entity resolution, covered in [15-04 — Entity resolution across sources](../15-advanced-patterns/04-entity-resolution-across-sources.md).

**[Example]** A safe composite key in a Python transform. It is deterministic, with an explicit separator and handled nulls:

```python
from pyspark.sql import functions as F

shipments = shipments.withColumn(
    "shipment_id",
    F.concat_ws("|", F.upper(F.trim("carrier_code")), F.trim("tracking_no"))
).filter(F.col("carrier_code").isNotNull() & F.col("tracking_no").isNotNull())
# The filter drops shipments with no carrier or tracking number. Write them to a
# quarantine dataset instead if someone needs to investigate them.

# Unsafe alternatives, which change on every build and break edits and links:
# F.monotonically_increasing_id()
# F.expr("uuid()")
# a row_number() over an ordering that isn't unique
```

**[Explanation]** The separator matters. Without one, `("AB", "C")` and `("A", "BC")` both become `ABC`. Normalizing case and whitespace stops "dhl" and "DHL " from becoming different shipments.

## Advice
- **[Recommendation]** Decide the key with the domain owner and write the reason in the object type's description. If the key changes later, all edits must be deleted.
- **[Recommendation]** Add a uniqueness and null check on the key column in the pipeline. A Pipeline Builder output check or a data health check fails earlier and more clearly than an indexing job.
- **[Recommendation]** Prefer string keys. Real-number keys are disallowed, and the docs **discourage** Date, Timestamp, Boolean, Byte and Long keys. Long values above about 1e15 lose precision in JavaScript front ends. Numeric IDs also often lose leading zeros when sources change. The full table is in [04 — Primary keys and titles](../04-object-types/03-primary-keys-and-titles.md).
- **[Explanation]** Think about deletion. If a source row disappears, the object disappears too. The interaction with user edits is covered in [13 — Edits and materializations](../13-backend-architecture/03-edits-and-materializations.md).

## Mistakes that orphan edits
- Generating IDs with `uuid()` or a row number in a rebuildable transform.
- Using a mutable attribute (email, phone, name) as the key.
- Concatenating columns without a separator or null handling.
- Duplicate keys hidden by a bad join. One customer joined to two addresses doubles their orders. See our [Pipeline deep dive lesson 17](../../Deep%20Dive/Building%20Your%20First%20Pipeline/17-identify-a-bad-join.md).
- Confusing the title key (display) with the primary key (identity).

## Caveats
- **[Docs]** Most of the restrictions here are OSv2's. OSv1 behaved differently; for example, duplicates "appear successful".
- **[Docs]** Streaming object types **drop** records that violate restrictions rather than failing. Silent data loss is possible, so monitor streaming inputs.

## Seen in our courses
- [Ontology deep dive 14 — Create an object type](../../Application%20Developer/02-deep-dive-creating-your-first-ontology/14-create-object-type.md): our earlier notes on identity vs display and "never generate a fresh random key".
- [E2E speedrun 22 — Create your object](../../Speedrun/Your%20First%20End-to-End%20Workflow/22-create-your-object.md): `Order Id` as the primary key.
- [AIP Workflow speedrun 15 — Create chunk ID](../../Speedrun/Your%20First%20AIP%20Workflow/15-create-chunk-id.md): building a deterministic ID.

---
[Module index](README.md) · Previous: [01 — Entities, attributes and relationships](01-entities-attributes-relationships.md) · Next: [03 — Normalization and denormalization](03-normalization-and-denormalization.md)
