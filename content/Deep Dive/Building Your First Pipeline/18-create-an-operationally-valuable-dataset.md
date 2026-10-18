# 18 — Create an Operationally Valuable Dataset

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 18/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875645) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Compute a derived metric, then aggregate it to a new grain.
- Materialize the final output.

## Walkthrough with reasoning
**[Course]**
1. On **transactions x customers** → Transform (for example *customer lifetime value*).
2. **Multiply numbers:** `units` × `products_price` → `revenue`.
3. **Aggregate:** sum `revenue` per customer, keeping important customer detail columns.
4. **Add output → New dataset** → name it → **Save and deploy**.

## Key concepts
**[Course]** CLV is defined as the total net profit a company can expect from a customer over the whole relationship.

**[Explanation / correction]** What this pipeline computes is **total historical revenue per customer**: no costs (so not *profit*) and no forecast (so not *expected*). That's fine for a training exercise, but name it honestly in real work, for example `total_revenue_to_date`. A business user reading "lifetime value" will assume profit or projected value.

**[Explanation] Grain change.** The aggregation turns *one row per transaction* into *one row per customer*. Any customer detail you keep must be the same on every one of that customer's rows: group by it, or take something like its first value. Otherwise it's ambiguous.

**[Explanation] Why the earlier fixes matter here.** If the bad join hadn't been fixed, revenue would be inflated up to 9 times for affected transactions. If the customer duplicates hadn't been removed, the second join would have multiplied rows again. Aggregates hide these errors, because a sum doesn't look wrong on its own.

## Real-project relevance
**[Explanation]** A per-customer output like this is a natural **Ontology** input: a `Customer` object with a revenue property. That feeds Workshop apps, as in the E2E speedrun and the Ontology deep dive. Decide the property's name and meaning with the people who will read it.

## Review checklist
- [ ] I can say what this "CLV" actually measures and why the name matters.
- [ ] I can explain how the aggregation changes the grain and what that means for the kept columns.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Introduction](19-additional-considerations-introduction.md)
