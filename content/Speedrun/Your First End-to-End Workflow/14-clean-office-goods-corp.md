# 14 — Clean Office Goods: two adapters, one output contract

Office Goods is the original company, but that does not make its data the universal schema. Its raw fields differ from Bureau's. This branch performs a different sequence of operations to arrive at the same intended representation.

Create **Clean Office Goods** from `orders_office_goods`.

## Translate the differences explicitly

| Input difference | Course operation | Reason |
|---|---|---|
| `dueDateTime` needs the shared temporal type | Cast to Timestamp | Align the type used by the two branches. |
| `orderId` may be missing | Keep non-null IDs and treat empty strings as null | Require an addressable record. |
| `orderPlacementDate` is outside the target schema | Drop the column | Keep this tutorial's output focused on the selected fields. |
| `dueDateTime` differs from Bureau's due-date name | Rename to `order_due_date` | Establish a common field name with the intended meaning. |
| Naming styles differ | Normalize column names | Make references consistent and inspect the resulting `order_id`. |

Apply the operations in that order, close the transform editor and save. The intended result has nine columns, compared with ten in the source.

## Why renaming and normalization are separate

Changing `dueDateTime` into a snake-case name would give something like `due_date_time`; it would not necessarily produce the deliberately chosen `order_due_date`. Normalization changes naming style. An explicit rename expresses a mapping between source and target concepts.

This is familiar from API integration: an automatic serializer can change capitalization, but it cannot know that one provider's `deliveryDeadline` belongs in your domain's `orderDueDate`. You must supply that meaning.

After normalization, confirm both branches actually expose `order_id`. If a naming difference remains, fix it here before the union. Do not rely on the human ability to recognize `orderId` and `order_id` as similar; the configured operation needs a definite mapping.

## Dropping a field is a scope decision

The course removes `orderPlacementDate` from this transformation output. That does not mean placement time is useless. It would be important for questions such as “How long have orders waited?” or “How long does fulfillment take?”

A transform's dropped column does not rewrite the original local CSV. Preserving the raw source allows later work to revisit such a decision. In a production design, choose fields from consumer requirements and retention needs, rather than dropping them simply because one chart does not display them.

The earlier execution notes described this field as a struct in that run's imported schema; the local CSV itself contains ISO-style timestamp text. Inspect the actual imported type instead of assuming the historical parser result always applies.

## Verify more than the column count

Nine columns are expected, but nine wrong columns would still be wrong. Check the names and types against the Bureau branch, trace one retained order and confirm its due date and identity still refer to the original record.

The source also contains `days_until_due`. This course does not calculate it during cleaning. A stored value does not automatically decrease as the calendar advances; this matters when the second half uses it in a chart.

**What to remember:** source adapters may perform different work while delivering the same contract. Consistency belongs at their outputs; their internal steps need not be identical.

**Self-check:** if a future requirement asks for time from placement to fulfillment, what would you revisit? The decision to omit placement time and the source data needed for the new calculation, not just the application's layout.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791217) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
