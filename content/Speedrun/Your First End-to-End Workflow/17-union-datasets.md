# 17 — Union the datasets: assemble one population of orders

The two branches now have compatible schemas and shared customer context. A **union** puts their rows into one output population. It answers “Which orders exist across both companies?” rather than “Which customer matches this order?”

Select `Join Office Goods`, add a union with `Join Bureau` and name the node **Union Orders**. Confirm that the two distinct branches are selected. The intended course configuration aligns columns by name and produces the same eleven-column schema.

## Join and union solve different problems

Consider an invented two-row Office Goods result and one-row Bureau result. After combining them, the intended output is three order rows with the same fields.

| Operation | What determines the result | Intended effect here |
|---|---|---|
| Customer join | Matching customer IDs | Add two attributes to each order. |
| Order union | Compatible columns across two inputs | Collect both companies' order rows. |

In programming terms, the union is closer to concatenating two collections of the same record shape. The join is closer to enriching each record through a lookup, with the important caveat that a relational join can produce multiple matches.

Do not assume a visual Union operation removes duplicates because SQL's `UNION` keyword commonly does. Inspect the operation's configured behavior. This course does not establish a deduplication policy; the intended order population must be validated separately.

## Why the column names and types matter

Both branches should now expose `order_id`, `order_due_date` and the same remaining fields. Aligning by name avoids relying on column position. However, a lingering `orderId` field is still a different name. Correct the upstream mapping rather than accepting an accidental split in the schema.

Types must be compatible too. The earlier date casts prepared the shared due-date representation. A column count of eleven alone cannot prove alignment: verify the names and corresponding types.

## Global identity is a new question

Each source can have unique IDs internally while the combined population has a collision. For example, an invented Office Goods order `1001` and a separate Bureau order `1001` are distinct business records with the same raw key. If both later use that key in one Order type, their identity is ambiguous.

A production integration might create an identity such as `officegoods:1001` and `bureau:1001`, preserving the source identifier separately. That is an explanatory design option, not an extra transform required by this speedrun. Do not retrofit a new primary-key scheme casually after applications already depend on existing objects.

The local files inspected for this revision have no repeated order IDs within or across the two sources. All 1,492 supplied order records also match the customer reference once. Thus 1,492 rows are expected for the intended combination of these exact files, assuming the configured transforms preserve the described records. A live output must still be inspected.

## One view is not automatic authority

`all_orders` will become a shared prepared view for this workflow. Calling it a “single source of truth” should not imply it is automatically current or that the original order systems stopped being authoritative. Its usefulness depends on the integration contract and refresh process.

**Remember:** union combines populations; it does not reconcile identity, correct business meaning or prove freshness.

**Check yourself:** why do we expect eleven columns rather than twenty-two? Both sources contribute records into the same eleven-field shape. We are not appending a second set of attributes to each existing row.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791225) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
