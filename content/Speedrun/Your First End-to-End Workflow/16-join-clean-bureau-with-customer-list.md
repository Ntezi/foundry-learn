# 16 — Join Bureau to customers: reconcile identity across systems

This lesson repeats the enrichment pattern with a crucial semantic change: Bureau's `customer_id` must match the reference's `bureau_customer_id`, not its Office Goods key.

```text
Clean Bureau.customer_id = consolidated_customers.bureau_customer_id
```

Create **Join Bureau**, retain the nine cleaned order fields, and add `consolidated_customer_id` plus `customer_name`. Exclude both reference-side source lookup columns from the output. As with Office Goods, inspect the join type: the earlier build used a left join, while the reviewed current written instructions identify the key without explicitly specifying that type.

## Why the similar-looking columns are not interchangeable

The column name `customer_id` answers “Which customer did this source system refer to?” It does not answer “Which customer in every system?” The system that issued an identifier is part of its meaning, even if the value itself is only a number or short string.

Imagine an invented customer mapping:

| Office Goods ID | Bureau ID | Consolidated ID | Name |
|---|---|---|---|
| 17 | 82 | C-9 | Example Supplies |
| 82 | 51 | C-4 | Another Customer |

A Bureau order for customer `82` should resolve to `C-9`. Matching it against the Office Goods ID column would instead find `C-4`. This failure is especially dangerous because the join returns a plausible, non-null customer name. A non-null result is not proof of a correct match.

This is the same problem a software engineer faces when two external services both return an `id` field. Without the issuing system's context, the identifier is ambiguous.

## Observe the common model emerging

The Office Goods and Bureau branches now attach the same two shared customer fields through different source keys. After enrichment, both can say “this order belongs to consolidated customer C-9,” even though their original customer IDs differ.

The customer reference already provides that correspondence. This speedrun does not teach an algorithm that discovers matching customers from names or addresses. In a real project, someone must own the accuracy and maintenance of that mapping. A wrong reference can propagate a consistent-looking error to every downstream application.

## Check grain and completeness again

For the recorded left-join pattern, unmatched Bureau orders remain with null enrichment, and duplicate Bureau lookup keys can multiply rows. Check the Bureau lookup column independently; a uniqueness check on the Office Goods column does not establish uniqueness on Bureau's column.

The current local files contain 746 Bureau orders, all with a reference match, and no duplicate nonempty Bureau lookup keys. Those observations help explain the expected sample result but do not replace inspecting a live build.

**Where to use this reasoning:** account reconciliation, customer migration, multi-vendor integrations and any application that combines independently issued identifiers.

**Before the union:** explain how the two `customer_id` columns can have the same name and type while referring to different namespaces. Then explain why `consolidated_customer_id` is useful for cross-company grouping. That distinction is the main learning outcome of this lesson.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791226) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
