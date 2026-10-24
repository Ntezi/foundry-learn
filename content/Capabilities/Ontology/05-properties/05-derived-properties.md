# 05 — Derived properties

*Sources: [Configure derived properties](https://www.palantir.com/docs/foundry/object-link-types/derived-properties/) (beta) · [Derived properties (Ontology search)](https://www.palantir.com/docs/foundry/ontology/derived-properties/) (beta) · [Object Set Service limitations](https://www.palantir.com/docs/foundry/ontologies/oss-limitations/) · [Ontology design: Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) · checked October 2, 2026 · Ready for Review*

**[Docs]** A derived property is calculated **at runtime** instead of being stored. The **design** question — *should this value be computed in the pipeline or derived?* — is answered in [Design 02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once):

- same-object values with pipeline-only inputs → compute in the pipeline;
- values that depend on links or action edits → derive;
- above roughly 10k objects per query → consider documented denormalization.

This note covers the mechanics, and settles an open question from planning.

## Two features with one name (RQ-01, resolved)

The docs have two "Derived properties" pages. They describe two ways of using the same idea:

| | **Configured in Ontology Manager** | **Defined at query time in the OSDK** |
|---|---|---|
| Page | *Object and link types → Properties → Derived properties* | *Ontology search → Derived properties* |
| Where it lives | On the object type, as a property with source type **Linked objects** | In a single OSDK request, using `withProperties` |
| Who sees it | Every consumer of the type | Only that request |
| Scope | Values from linked objects, up to 3 link hops, with optional aggregation | "Values of other properties or links": aggregating or selecting linked properties, then filtering, sorting or aggregating within the same request |
| Requirements | — | TypeScript OSDK with `@osdk/client` 2.2.0-beta.x or later |
| Status | Beta | Beta |

**[Docs]** Both share two important traits:

- **Security:** they use the security of *all* objects involved, so a derived value never reveals data the user couldn't otherwise see.
- **Read-only:** functions and actions can't edit them.

## Configuring one (Ontology Manager)

**[Docs]**

1. Open the property's configuration panel, then the **Source** tab, and choose **Linked objects**.
2. Pick a link type. Optionally add more links to traverse, **up to 3 levels**, for example Department → Employee → Project.
3. If any link in the chain is "many", choose an **aggregation**:
   - Count, Average, Sum, Minimum, Maximum;
   - Approximate or exact cardinality;
   - Collect list (ordered, keeps duplicates) or Collect set (unique).
4. Choose the property to derive from the final type. Count doesn't need one.
5. For collect aggregations, set a limit. The **default is 10 items**.

**[Docs]** The docs' examples:

- *Average employee salary* on `Department`;
- *Lead engineer name* from a single linked `Engineer`;
- *Product names* collected onto an `Order`.

## What a derived property can't be

**[Docs]** From the two pages' known limitations:

- **Not a primary key.**
- **Not required:** it can't be non-nullable.
- **No constraints:** no property type constraints.
- **No display rules:** no formatting rule sets or base formatters.
- **No conversion from some properties:** properties with **inline actions** or **value types** can't be converted to derived properties.
- **No text search:** not usable in text search or keyword filters.
- **No OSv1:** queries can't include any OSv1-indexed object type.
- **No structs in some OSDK queries:** current TypeScript OSDK queries with derived properties can't include struct properties. Exclude them with `$select`.
- **Automate:** conditions can filter on derived properties only with **scheduled** monitoring, not live monitoring.
- **Marketplace:** functions that use derived properties aren't supported in Marketplace.

## The performance side

**[Docs]** From the OSS limitations page:

- The page says two slightly different things. It lists derived properties among features that "require Spark execution regardless of size". It also gives **100,000 objects** as the threshold at which Search Arounds and derived properties move from in-memory to Spark. Either way, expect derived properties to be slower and to cost more compute than stored ones.
- Filtering, sorting or aggregating on a derived property **can't use indexes**, so it never takes the fast pushdown path.

**[Explanation]** This is why the design guide puts a size limit on "derive freely". A derived *Order count* on `Customer` is cheap when Ama opens one customer. A filter "customers with more than 10 orders" across 2 million customers is a different query entirely.

## Kestrel examples

**[Example]**

| On | Derived property | How | Good idea? |
|---|---|---|---|
| `Order` | `shipmentCount` | Order → Shipment, **Count** | Yes. Changes as shipments are created by actions |
| `Order` | `latestShipmentStatus` | Order → Shipment, **Maximum** of status | No. "Maximum" of a status string is meaningless. Use a function, or a reduced array ([07](07-formatting-and-reducers.md)) |
| `Customer` | `lifetimeOrderValue` | Customer → Order, **Sum** of `totalAmount` | Fine on one customer's page. For "top 1,000 customers" across all customers, pre-compute nightly in the pipeline and document it |
| `Carrier` | `lateShipmentsThisWeek` | Carrier → Shipment, Count | No. Derived properties can't filter linked objects by date. That belongs in a function or a pipeline aggregate |
| `Order` | `customerTier` | Order → Customer, single value | Yes. The tier lives on `Customer` once and is read through the link, not copied ([01 — Normalization](../01-foundations/03-normalization-and-denormalization.md)) |

**[Explanation]** The `lateShipmentsThisWeek` row reflects what the configuration page offers: a link chain, an aggregation, a property. Filtering the linked objects isn't listed. **Open question** [RQ-19](../SOURCES.md#open-research-questions): whether filtered derived properties exist in the configuration UI or only in the OSDK `withProperties` form.

---
[Module index](README.md) · Previous: [04 — Shared properties](04-shared-properties.md) · Next: [06 — Edit-only, required and mandatory control](06-edit-only-required-and-mandatory-control.md)
