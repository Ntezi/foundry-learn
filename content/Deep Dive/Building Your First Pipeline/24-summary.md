# 24 — Summary

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Conclusion | 24/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/2044811) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## What you built
**[Course]** Your first pipeline in Pipeline Builder, Foundry's no-code pipelining tool. Next: the [Data Engineer training track](https://learn.palantir.com/page/training-track-data-engineer).

## The whole course on one page
**[Explanation]**

```text
Clean Transactions (extract JSON rows, cast date & units) ─┐
                                                          ├─ join on variation_id ─▶ [output] transactions x products
Clean Products (trim name, cast price) ────────────────────┘            │
                                                                        ├─ join on customer_id ─▶ [output] transactions x customers
Clean Customers (drop incomplete rows, readable address) ───────────────┘            │
                                                                                     └─ revenue = units × price, summed per customer ─▶ [output] CLV
```

**Five habits to keep:**
1. Profile before you transform (Preview, stats).
2. Clean per source, and fix types and keys before joining.
3. Know every input's grain, and validate each join (row count, key uniqueness, match rate).
4. Materialize deliberately: reuse and debugging vs latency.
5. Make checks permanent (expectations), make changes safe (branches), and keep data fresh (schedules).

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md)
