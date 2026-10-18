# 15 — Join Office Goods to customers: enrich an order without losing its identity

An Office Goods order carries a source customer ID. The consolidated customer reference tells us which shared customer that ID represents and supplies a readable name. A **join** matches rows using a condition and attaches selected fields from the matching reference row.

Use `Clean Office Goods` as the left input and `consolidated_customers` as the right input. The course's condition is:

```text
Clean Office Goods.customer_id = consolidated_customers.officegoods_customer_id
```

Name the node **Join Office Goods**. Keep the nine order fields and the reference's `consolidated_customer_id` and `customer_name`. Exclude the right-side `officegoods_customer_id` and `bureau_customer_id` from the output. The intended schema therefore contains eleven columns.

## Walk through one match

Here is an invented example, with shortened IDs for readability:

| Order ID | Office Goods customer ID | Item |
|---|---|---|
| OG-101 | A-17 | Stapler |

| Office Goods lookup ID | Bureau lookup ID | Consolidated ID | Customer name |
|---|---|---|---|
| A-17 | B-82 | C-9 | Example Supplies |

The condition matches `A-17` to `A-17`. The enriched order is still `OG-101`; it now also has consolidated customer `C-9` and name `Example Supplies`. You have added context to one order, not created a customer object or changed the source system.

The retained order `customer_id` still belongs to Office Goods. The newly attached consolidated ID provides the shared identity. Keeping these meanings separate will matter when Bureau rows enter the same output.

## Join type determines what happens when there is no match

The prior training build recorded a **left join**. The reviewed current written lesson specifies the matching key but does not explicitly name the join type. Inspect the actual selected setting; do not treat the historical default as a universal UI guarantee.

For a left join, an unmatched order remains in the output with null customer enrichment. An inner join would omit it. For an operational queue, retaining visible work while investigating its missing customer mapping can be important. The choice is a business completeness decision, not just a database preference.

## A left join does not guarantee unchanged row counts

Suppose the customer reference accidentally contains two rows for `A-17`. That order can match both rows and appear twice. This is **join cardinality**: the number of matches determines how many output rows are produced.

The intended relationship is many orders to one customer-reference row. Validate uniqueness of the nonempty reference lookup key. Otherwise a chart can overcount workload even though the join executed without errors.

The local course files currently have one match for every Office Goods order and no duplicate nonempty Office Goods reference keys. That is evidence about these files, not a permanent guarantee or fresh Foundry validation.

## What you should inspect

Check the left/right inputs, exact key columns, selected join type and eleven output fields. Compare order counts before and after the join and inspect unmatched or multiply matched IDs. A 500-row preview from the older build was a preview size, not proof of the full population.

**The lesson to retain:** enrichment should add useful context while preserving the intended order grain. A join is correct only when its matching behavior serves that intention.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791222) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
