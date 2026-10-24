# 03 — Normalization and denormalization

*Sources: [Ontology design: Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) (via [Design 02](../11-design/02-structural-guidance.md)) · [Recommended project and team structure](https://www.palantir.com/docs/foundry/building-pipelines/recommended-project-structure/) · [Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) · Codd (1970) and the Kimball Group, see *Additional references* · checked October 2, 2026 · Ready for Review*

- **[Concept]** **Normalization** means storing each fact once, on the thing it belongs to. **Denormalization** means copying facts onto other records so reads are simpler or faster, at the cost of keeping the copies in sync.
- **[Concept]** **Dimensional modelling** (facts and dimensions, star schemas) is a deliberate denormalization designed for analytics.
- **[Docs]** The Ontology's design guidance is normalization-first. Store each fact once, on the object it belongs to, and derive the rest at query time. Denormalize only as a conscious, documented trade-off, for example above about 10k objects per query.
- **[Docs]** A same-object value with stable inputs, such as a full name, is computed **in the pipeline**. A value that depends on **links or action edits** becomes a **derived property**.
- **[Explanation]** A value copied *at the moment something happened*, such as the price at checkout, is **not** denormalization. It is a different fact.

## Every copy is a promise
**[Concept]** Every copy of a fact is a promise to update it. Break the promise and two parts of the system disagree. Classic database theory names three **update anomalies**:

| Anomaly | What goes wrong | Kestrel example |
|---|---|---|
| **Update** | A fact stored in many places is changed in only some | A supplier's phone number copied onto 10,000 products; it changes; half get updated |
| **Insertion** | You can't record one fact without inventing another | You can't add a new carrier until it has carried a shipment, because carriers only exist as columns on shipments |
| **Deletion** | Deleting one record destroys an unrelated fact | Deleting a supplier's last product loses the supplier's contact details |

The Ontology is edited by people and agents through actions. That makes the update anomaly much worse than in a read-only warehouse: [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) notes that **every** action able to affect a copied value would also have to update it.

## The theory you actually need

### Normal forms, briefly
**[Concept]** You rarely need the formal theory. The intuition:

| Normal form | Rule | In plain words |
|---|---|---|
| **1NF** | Atomic values; no repeating groups | No `product1, product2, product3` columns; one value per cell |
| **2NF** | Every non-key attribute depends on the *whole* key | On `Order Line(order_id, line_no)`, the customer's email depends only on `order_id`, so it belongs on `Order` |
| **3NF** | Non-key attributes depend only on the key, not on each other | `supplier_phone` depends on `supplier_id`, not on the product, so it belongs on `Supplier` |

**[Explanation]** Mapped to the Ontology: each property should describe **the object it sits on**, and only that object. If a property really describes another entity, it is a candidate for a link.

### When denormalization is right
**[Concept]** Denormalization trades write complexity for read simplicity or speed. It is reasonable when:

- the data is read far more often than it changes;
- the copy is rebuilt from source on every pipeline run, so it never drifts from user edits;
- performance at scale demands it, and someone owns keeping it in sync.

### Snapshot facts are not copies
**[Concept]** `unit_price` on an order line is **the price the customer agreed to at checkout**. It is a fact about the order line, not a copy of the product's current price. If the product's price changes tomorrow, past orders must not change.

**[Recommendation]** Ask: *if the source value changed, should this record change too?*

- **No:** it's a snapshot fact; keep it.
- **Yes:** it's a copy; derive it through a link instead.

### Dimensional modelling
**[Concept]** Kimball-style dimensional models organize analytics around:

- **Facts:** measurable events at a declared **grain**, for example one row per order line, with measures such as quantity and amount.
- **Dimensions:** descriptive context (customer, product, date), often denormalized into wide tables.
- **Slowly changing dimensions (SCDs):** strategies for attributes that change over time. Type 1 overwrites; Type 2 adds a new row per version.

**[Analogy]** A fact table at the order-line grain looks a lot like an `Order Line` object type, and a product dimension looks like a `Product` object type.

**[Analogy] Where it breaks:**
- Dimensional models flatten dimensions for query speed. The Ontology keeps entities separate and **links** them, so they can be navigated, edited and secured independently.
- A Type 2 SCD creates **one row per version**. As an Ontology pattern, that is the **Time Machine** anti-pattern: one object per version ([Design 03](../11-design/03-anti-patterns.md#the-time-machine)). The Ontology prefers **one object plus linked history** or a time series.
- Aggregated facts ("monthly revenue by category") are analytical outputs. They usually stay as datasets, or are computed in apps, rather than becoming object types.

## What Foundry recommends
**[Docs]** [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) gives the decision:

| Kind of value | Where it is computed |
|---|---|
| Depends only on the **same object's** columns, which change only through pipeline ingestion | **Pipeline transform** (pre-computed, no runtime cost) |
| Depends on **linked objects**, or on values changed by **actions or automations** | **Derived property**, evaluated at query time |
| Derived, but query scale is above about **10k objects** and latency is unacceptable | **Documented denormalization** with an explicit sync strategy |

**[Docs]** The *Recommended project structure* page says **Transform** projects "normalize or de-normalize relationships to create object-centric or time-centric datasets". **Ontology** projects then produce "the canonical tables representing discrete operational objects". In other words, reshaping happens in pipelines **before** the Ontology.

**[Docs]** OSv2's *Data restrictions* recommend **link types** over array properties once relationships would exceed **100,000 elements**, and **media references** over string properties above **12 MB**.

## Where the Ontology sits between OLTP and BI

| Layer | Typical shape | Normalization stance |
|---|---|---|
| Source systems (OLTP) | Highly normalized, many small tables | 3NF for write integrity |
| Clean datasets (Datasource project) | One-to-one with source tables, typed and renamed | As the source |
| Ontology datasets (Ontology project) | **One row per object** at entity grain, with keys for links | Normalized by **entity**, not by source table. Snapshot facts kept |
| Analytical marts | Wide, denormalized, star schemas | Denormalized for BI |

**[Explanation]** The Ontology sits between the extremes. It is normalized around **real-world entities** (one fact, one place) but not shredded into the source system's dozens of tables. One `Customer` object might be built from five source tables.

## Kestrel: an order line, field by field
**[Example]** The storefront's `order_lines` table carries copies of product data:

```text
order_id | line_no | sku    | product_name    | category_name | unit_price | supplier_name
O-10442  | 1       | TNT-02 | 2-person tent   | Camping       | 149.00     | Northpeak Ltd
```

Priya decides field by field:

| Field on Order Line | Snapshot or copy? | Decision |
|---|---|---|
| `unit_price` | **Snapshot**: the agreed price | Keep on `Order Line` as `unitPriceAtCheckout` |
| `product_name` | **Snapshot**: the name the customer saw | Keep as `productNameAtCheckout`; the current name lives on `Product` |
| `category_name` | **Copy** of the product's current category | **Drop.** Follow `Order Line → Product → Category` |
| `supplier_name` | **Copy** of the product's current supplier | **Drop.** Follow `Product → Supplier` |
| `line_total = qty × unit_price` | Same-object value, pipeline-only inputs | **Pre-compute in the pipeline** |
| "Order is fully shipped?" | Depends on linked `Shipment` objects that change through actions | **Derived property**, or a function (see [05 — Properties](../05-properties/README.md)) |

**[Example]** Net revenue by category per month (question 6 in the [running example](../00-orientation/04-running-example.md)) is an **analytical aggregate**. It stays a dataset or a Quiver analysis, not an object type.

## Advice and pitfalls
- **[Recommendation]** Record every deliberate denormalization in the property description: the source of truth and what keeps it in sync. [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once) requires this.
- **[Recommendation]** Name snapshot properties so their meaning is obvious (`…AtCheckout`, `…AtSubmission`). That stops someone "fixing" them into copies later.
- **[Explanation]** Normalization interacts with security. A copied sensitive value spreads that value to every object type that holds a copy, each with its own permissions.

**Pitfalls**
- Copying a parent's attribute onto every child "for convenience", then updating the parent through an action and forgetting the children. This is the `customerRegion` story in [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once).
- "Normalizing" snapshot facts, which rewrites history when the product changes.
- Importing a wide BI star schema straight into the Ontology as object types.
- Using a derived property for a value that only ever depends on the same row (a Golden Hammer, see [Design 03](../11-design/03-anti-patterns.md#the-golden-hammer)).

## In our courses
- [Pipeline deep dive 18 — An operationally valuable dataset](../../../Tracks/Deep%20Dive/Building%20Your%20First%20Pipeline/18-create-an-operationally-valuable-dataset.md) and [Case study 01 §7](../17-case-studies/01-course-ontologies-reviewed.md#7-deep-dive-building-your-first-pipeline--per-customer-revenue): pre-computed per-customer revenue.
- [Design exercise D — Normalize or derive?](../18-practice/01-design-exercises.md#d-normalize-or-derive)

## Additional references
- E. F. Codd, "A Relational Model of Data for Large Shared Data Banks", *Communications of the ACM* 13(6), 1970 ([doi:10.1145/362384.362685](https://doi.org/10.1145/362384.362685)). The origin of normalization.
- Kimball Group, [Dimensional Modeling Techniques](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/): grain, facts, dimensions and slowly changing dimensions. Useful for spotting which analytical structures shouldn't become object types.

---
[Module index](README.md) · Previous: [02 — Keys and identity](02-keys-and-identity.md) · Next: [04 — Semantic layers and domain models](04-semantic-layers-and-domain-models.md)
