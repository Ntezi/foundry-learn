# 02 — Many-to-many and object-backed links

*Sources: [Create a link type](https://www.palantir.com/docs/foundry/object-link-types/create-link-type/) · [Link types overview](https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/) · checked October 2, 2026 · Ready for Review*

A comparison note: one relationship modelled three ways.

Kestrel Commerce has one relationship that keeps coming back in design reviews: **an order contains products**. One order has many products and one product appears in many orders, so it is many-to-many. Priya (data engineer) and Daniel (application developer) have modelled it three ways. This note compares them. A foreign key isn't one of the options, because a foreign key only gives you one-to-one or many-to-one.

## The data behind all three

Every option starts from the same pipeline output, `order_lines`, with one row per product on an order:

| order_id | product_sku | quantity | unit_price | line_status |
|---|---|---|---|---|
| ORD-1001 | SKU-TEE-BLK-M | 2 | 18.00 | shipped |
| ORD-1001 | SKU-MUG-001 | 1 | 9.50 | backordered |
| ORD-1002 | SKU-TEE-BLK-M | 1 | 18.00 | shipped |

The options differ in how much of this row the Ontology keeps.

## Option 1 — Join-table link

**[Docs]** Choose **Join table dataset** when creating the link. The dataset needs a column that matches each side's primary key, and "a column can only be mapped to one primary key". For a new link with no data yet, **Generate join table** creates a dataset with the right schema.

For Kestrel, Priya publishes `order_product_links(order_id, product_sku)`, a distinct projection of `order_lines`.

- **What you get:** `order.products` and `product.orders`. This is the simplest graph to traverse.
- **What you lose:** `quantity`, `unit_price` and `line_status`. A link in a join table has **no properties**. "Two T-shirts, one backordered mug" can't be expressed.
- **Editing:** **[Docs]** the create-link page says that a many-to-many link "which requires a backing datasource, is required to enable users to edit or write back to the link type". **[Explanation]** This is a reason to *have* the join table, not a reason to prefer it over the other options. Option 2 edits ordinary objects instead.
- **One datasource, one link:** **[Docs]** the error `Phonograph2:DatasetAndBranchAlreadyRegistered` means the dataset is already backing a different link type. You can't reuse `order_product_links` for a second relationship.

## Option 2 — Promote the row to an object

Create an **OrderLine** object type (primary key `orderLineId`, built deterministically from `order_id` + `product_sku`; see [04-03](../04-object-types/03-primary-keys-and-titles.md)). Then create two ordinary foreign-key links:

```text
Order 1 ──< OrderLine >── 1 Product
         (orderId FK)   (productSku FK)
```

- **What you get:** every column survives as a property. OrderLine can have its own actions (*Mark line backordered*), its own permissions, and its own place in apps.
- **What it costs:** going from an order to its products is now **two hops**: `order → orderLines → product`. In TSv1 functions, each hop counts toward the three-search-around limit (see [03](03-traversal-and-search-arounds.md)).

## Option 3 — Object-backed link on top of option 2

**[Docs]** An object-backed link type "expand[s] on many-to-one cardinality link types, providing first class support for object types as a link type storage solution". It "allow[s] for the inclusion of additional metadata on the link and support[s] restricted views". The docs' example is a *Flight Manifest* object between Aircraft and Flight, carrying Pilot and First Mate.

The prerequisites are fixed and come in this order:

1. Create both end object types (Order, Product).
2. Create the backing object type (OrderLine).
3. Create the two many-to-one links from each end to the backing type.
4. Then create the link type with **Backing object type**. Pick OrderLine as the middle object, and pick the two links if there are several candidates.

You can also **convert** an existing link: open it, set the join method to *Object type*, then choose the backing type and its links in the *Update link type to object-backed link type* dialog.

- **What you get:** Order ↔ Product reads as one link again, and each link instance shows OrderLine's properties. **[Docs]** "Currently, object-backed link types can be viewed in Object Explorer, Vertex, and Workshop." In Vertex, the link's title is the backing object's title.
- **What to check:** **[Explanation]** the docs list those three apps and nothing else. Before you rely on the one-hop form, test the surface you plan to use, such as OSDK, functions or Quiver. If it isn't supported there, fall back to option 2's two hops, which work everywhere because they are plain links.

## Side by side

| | Join-table link | OrderLine object + 2 links | Object-backed link |
|---|---|---|---|
| Link carries properties | No | Yes, on OrderLine | Yes, on OrderLine |
| Hops from Order to Product | 1 | 2 | 1 in supported apps, 2 elsewhere |
| Extra Ontology resources | 1 dataset, 1 link type | 1 object type, 2 link types | Option 2 plus 1 more link type |
| Restricted views on the relationship | No | Through OrderLine | **[Docs]** supported |
| Edits | Link edits (needs the join table) | Ordinary object edits | Edit OrderLine objects |

## What Kestrel chose

Kestrel chose **option 2, with option 3 layered on for Workshop**. Ama's customer service team needs `line_status` and the quantity on every line ("which item is backordered?"). That rules out option 1 on its own. The object-backed link is cheap to add once option 2 exists, and it makes the order view in Workshop read naturally.

Daniel asked to keep `order_product_links` as well, "for a simple *bought together* panel". It was **declined**: it would be a second source of truth for the same relationship. "Bought together" is an aggregation over OrderLine.

**[Explanation]** This leads to a rule of thumb. If the relationship has *attributes*, a *lifecycle* or its own *permissions*, it's an object. Use a join-table link only for a bare association that will never need any of those, such as *Product ↔ Tag*.

---
[Module index](README.md) · Previous: [01 — Link types and cardinality](01-link-types-and-cardinality.md) · Next: [03 — Traversal and Search Arounds](03-traversal-and-search-arounds.md)
