# 10 — Basic Transforms: Clean the Products Dataset

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 10/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874635) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Build a first transform node and chain two pre-built transforms.
- Understand why types and whitespace matter before joins and calculations.

## Walkthrough with reasoning
**[Course]** Two problems in `products`:
1. `product_name` has **trailing whitespace**. Fix it with **Trim whitespace** on that column.
2. `price` was read as a **string**. Fix it with **Cast** to **double**.

Select the node → **Transform** → name it (for example *Clean Products*) → add the transforms → **Apply all changes** → Close.

## Why each fix matters
- **[Explanation] Whitespace.** `"Stapler "` and `"Stapler"` are different values. Grouping, filtering, deduplicating or joining on the untrimmed name silently splits one product into two.
- **[Explanation] Type.** A string price can't be multiplied. The revenue calculation in [lesson 18](18-create-an-operationally-valuable-dataset.md) depends on this cast. A string can also sort wrongly: `"100"` sorts before `"9"`.

## Money and doubles
**[Course]** In production, currency is often stored as **integers in the smallest unit** (for example cents) to avoid rounding errors. The course uses double for simplicity, since its values are small.

**[Explanation]** Doubles are binary floating point, so values like 0.1 aren't exact. Summing many of them (as the CLV aggregation does) can drift by fractions of a cent. For financial reporting, use integer cents or a decimal type, and round only for display.

## Practical mental model
**[Explanation]** A transform node is an ordered list of steps ("boards") applied top to bottom to the incoming table, producing one output table. Order matters. Trimming before you cast or match is the natural sequence.

## Review checklist
- [ ] I can give a concrete failure caused by the untrimmed name and one caused by the string price.
- [ ] I can explain the integer-cents recommendation.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Advanced Transforms: Clean the Customers Dataset](11-advanced-transforms-clean-customers.md)
