# 07 — Formatting, render hints and reducers: the display layer

*Sources: [Value formatting](https://www.palantir.com/docs/foundry/object-link-types/value-formatting/) · [Conditional formatting](https://www.palantir.com/docs/foundry/object-link-types/conditional-formatting/) · [Render hints](https://www.palantir.com/docs/foundry/object-link-types/metadata-render-hints/) · [Property reducers](https://www.palantir.com/docs/foundry/object-link-types/property-reducers/) (beta) · [Struct main fields](https://www.palantir.com/docs/foundry/object-link-types/struct-main-fields/) (beta) · checked October 2, 2026 · Ready for Review*

Everything on this page changes **how a value looks**, not what it is. Configure it once on the property and every Ontology-aware app follows. That is the point: Ama's app, Kofi's dashboard and an Object View all show `€182.40`, not `182.4` in one and `182.40 EUR` in another.

## Value formatting

**[Docs]**

- **Numeric:** currency, units, prefixes and suffixes, percentages. Options include compact or scientific notation, grouping separators, and minimum or maximum fraction and significant digits. A preview box lets you test.
- **Date and time:** date only, date and time (long or short), ISO instant, *relative to now*, or time only.
  - *Relative to now* only applies up to 24 hours back, then falls back to the short date and time.
  - Timestamps can be shown in a **fixed time zone** or the **viewer's own**.
- **Foundry IDs:** a stored user or group ID displays as the person's name or the group's name. This is useful for "assigned to" values that actions store as IDs.
- **Resource RIDs and artifact GIDs:** shown as an icon, name and clickable link.

Value formatting takes precedence over older type classes, and works with inline edits.

## Conditional formatting

**[Docs]** Rules that colour or align a property's values. They apply in **Object Explorer, Object Views, Quiver and Workshop**.

- **Rule kinds:** *Standard*; *Always true*, a fallback; *Math*, which applies operators to properties.
- **Driven by another property:** a rule can depend on **another property's** value, for example colour `type` red when `performanceFactor` is low.
- **Comparisons:** depend on the base type (string match, null check, numeric range…) and compare against a constant or another property.
- **Copying rules:** you can copy rules between properties. They overwrite existing rules and keep referencing the original property until you change it.

**[Example]** `Shipment.status`:

| Value | Colour |
|---|---|
| DELAYED | red |
| OUT_FOR_DELIVERY | blue |
| DELIVERED | green |
| anything else | grey (*Always true* fallback) |

`Order.totalAmount` is right-aligned, coloured amber when over €1,000 for manual review.

## Render hints

**[Docs]** Hints tell apps how to treat a property:

- *Searchable*, *sortable* and *selectable*. Selectable enables aggregation and exact-match filters, and requires searchable.
- *Low cardinality*.
- *Long text*, *Keywords*, *Identifier*, *Disable formatting*.
- Leading-wildcard and regex search.

The page is written for **OSv1**: there, several hints added a raw index and needed a reindex, so turning off unneeded hints sped up indexing. (See also [03 — Type metadata](../03-ontology-fundamentals/04-type-metadata-and-statuses.md#visibility-groups-type-classes-render-hints).)

**[Explanation]** Whatever the backend, the hints still describe *intent*. Mark identifiers as *Identifier* so numeric IDs aren't formatted with thousands separators. Mark free-text notes as *Long text*.

## Reducers (beta): one value from an array

**[Docs]** A reducer shows **one element of an array property** in compact views, such as the latest date or the highest score, without changing the stored data. The full array stays queryable and visible on hover or expand.

| Array of… | Reducer options |
|---|---|
| Numbers | Highest, lowest |
| Date, Timestamp | Most recent, least recent |
| String | First, last (lexicographic) |
| Boolean | True first, false first |
| Structs | By any supported field, with optional **fallback reducers** for ties |

**[Docs]** Behaviour to know:

- **Not for some types:** media references, geoshapes, vectors, markings, attachments and a few other types can't be reduced.
- **No querying the reduced value:** you can't filter on it; queries see the full array.
- **Edit-only properties:** reducers work on them.
- **No reindex:** changes take effect immediately.
- **Ties:** without a fallback reducer, ties return one value "deterministic but unordered".
- **Unsupported apps:** apps that don't support reducers still show the array.

**[Docs] Reducers with interfaces.** A reducer lets an array property satisfy a **single-value** interface property. For example, a `maintenanceHistory` date array implements `lastMaintenanceDate` on an `Asset` interface.

Combined with struct main fields, one struct-array property can satisfy interface properties of type struct array, string array, struct or string. The limitation: **interface actions that edit a property implemented through a reducer or main field fail**, because there's no way to turn the reduced value back into the full array.

**[Example]** `Product.customerReviews` is an array of structs (`rating`, `reviewDate`, `reviewerName`, `verifiedPurchase`):

- **Primary reducer:** most recent `reviewDate`.
- **Fallback:** highest `rating`.

The product table shows the latest review; the full history is a hover away.

---
[Module index](README.md) · Previous: [06 — Edit-only, required and mandatory control](06-edit-only-required-and-mandatory-control.md) · Next: [08 — Time series, media, geo and vectors](08-time-series-media-geo-and-vectors.md)
