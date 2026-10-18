# 17 — Identify a Bad Join: Drill into Transactions x Products

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 17/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875633) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Spot a join that has multiplied rows.
- Use **Contour** to find the cause across the full dataset.
- Fix the join key.

## Key concepts
**[Course]** A **bad join** combines datasets wrongly and produces inaccurate, duplicated or missing rows. Usual causes: the **wrong key**, or **missing keys** in the condition. The result is too big (duplicates) or too small (lost rows). **Preview** is fine for quick checks on small data. **Contour** analyses the *whole* dataset, which exposes bugs Preview can't. Docs: [Contour](https://www.palantir.com/docs/foundry/contour/overview/).

## Walkthrough with reasoning
**[Course]**
1. **Preview:** transactions x products has **172 rows**, but clean transactions has **50**. A join that only enriches should keep 50.
2. **Analyze in Contour** from the materialized dataset, then **Save as** into your folder.
3. **Insert board → Histogram** of the count of `transaction_id`. Any count above 1 is duplication. Some IDs appear up to **9 times**.
4. Click the top bar to filter, then **Show data**. Every column is the same except the `products_` ones, and `products_variation_id` differs.
5. **Conclusion:** `product_id` isn't unique in products. Each product has several **variations**, each with a unique `variation_id`.
6. **Fix:** change the join condition to **`variation_id`**, then apply.

## Why the fix works
**[Explanation]** Transactions records *which variation* was bought (`variation_id`), and products has one row per variation. Joining on `variation_id` is **many-to-one**: many transactions to one variation row. That preserves the transaction grain and gives each transaction the price of the variation actually sold. Joining on `product_id` was **many-to-many**, and it also meant the price attached might be a different variation's.

## A reusable validation routine
**[Explanation]** Our checklist for any join:
1. **Row count:** after a left join enriching a fact table, the count should equal the left side's.
2. **Key uniqueness on the right:** group the right-side key and count. Anything over 1 is a problem.
3. **Match rate:** how many left rows got nulls from the right? Too many means a wrong key or bad data.
4. **Spot-check** one duplicated or unmatched key end to end, as the course does.

## Why Contour and not Preview?
**[Course]** Preview samples. Contour reads the full data. **[Explanation]** Duplicates can be rare. A handful among millions of rows won't show in a preview but will still inflate revenue.

## Real-project relevance
**[Explanation]** This is the most common silent data bug in real engagements. The build succeeds, the dashboard renders, and the numbers are wrong. Upstream, "product" meant variation; downstream, someone assumed product. Record the key and its grain in the output's description, and turn the uniqueness check into a **data expectation** ([lesson 23](23-pipeline-maintainability.md)) so it can't come back quietly.

## Review checklist
- [ ] I can explain the 50 → 172 jump.
- [ ] I can say why joining on `variation_id` fixes both the multiplication and the pricing.
- [ ] I can list the four checks I'd run on any join.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Create an Operationally Valuable Dataset](18-create-an-operationally-valuable-dataset.md)
