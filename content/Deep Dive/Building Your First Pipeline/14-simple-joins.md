# 14 — Simple Joins: Join Transactions and Products

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 14/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874820) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Configure a join, a key and a column prefix.
- Understand why the join is needed for revenue.

## Walkthrough with reasoning
**[Course]** Revenue per transaction needs `units` (from transactions) × `price` (from products), so the two must be joined.
1. Select **clean transactions** → **Join** → pick **clean products** → Start → name the join.
2. Condition: `product_id` **equals** `product_id`.
3. Enter a **prefix** `products_` for the product columns, so same-named columns don't collide and you can see where each came from.
4. Check the selected columns → Apply → back to the graph.

## Key concepts
**[Explanation] Left side and right side.** Transactions is the side being enriched. Products supplies attributes. The course doesn't name the **join type**. In the similar E2E lesson, the earlier recorded build used a **left join**, which keeps every transaction even without a product match; an inner join would drop those. Check which type is selected in your own UI. See [docs-verified notes](SOURCES-AND-CORRECTIONS.md#documentation-checks).

**[Explanation] Why prefixes matter.** Both inputs have `product_id`. Without a prefix you can't tell which one you're looking at, and later steps may pick the wrong column. The prefix also documents where each column came from.

## [Docs] Join types available
Checked Sep 24 in [Join data](https://www.palantir.com/docs/foundry/pipeline-builder/transforms-join-data/) and the [join transform reference](https://www.palantir.com/docs/foundry/pb-functions-transform/joinV2/). The join board offers **left, right, inner and outer** joins. The reference adds **full outer, anti, semi and cross**, plus special joins such as lookup and geospatial. The docs tutorial asks you to check that the type is **Left join**, which suggests left is the default, but no page says so. The board previews both inputs and the output. We found no built-in match-rate check, so do that yourself ([lesson 17](17-identify-a-bad-join.md)).

**[Explanation] Quick guide:** *left* keeps all enriched rows; *inner* keeps only matches; *anti* finds rows with **no** match, which is useful for checking unmatched keys; *semi* filters to rows that do match, without adding columns.

## Gotcha to watch for (it appears in lesson 17)
**[Explanation]** This join is built on an assumption: **`product_id` is unique in products**. If it isn't, each transaction matches several rows and gets multiplied. The course sets up this mistake on purpose.

## Review checklist
- [ ] I can say which side is enriched and what a left join keeps.
- [ ] I can say what assumption this join makes about the products key.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Chaining Joins: Join Transactions x Products with Customers](15-chaining-joins.md)
