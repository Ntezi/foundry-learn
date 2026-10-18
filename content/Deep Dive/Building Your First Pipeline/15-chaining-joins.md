# 15 — Chaining Joins: Join Transactions x Products with Customers

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 15/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875591) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Walkthrough
**[Course]** **Chaining** means the output of one join feeds the next. Select **transactions x products** → Join with **clean customers** → name it (for example *transactions x customers*) → condition `customer_id` = `customer_id` → check → Apply.

## Reasoning
**[Explanation]**
- **Errors compound.** If the first join multiplied rows, the second join carries the inflated rows forward, and every aggregate after it is wrong. Validate each join before chaining the next. The course validates only after both are built ([lesson 17](17-identify-a-bad-join.md)), which works but makes the fault harder to trace.
- **Order and grain.** Enrich the fact table (transactions) with dimensions (products, then customers). The grain stays one row per transaction the whole way, *provided each dimension key is unique*.
- **Customer duplicates matter here.** The cleaning in [lesson 11](11-advanced-transforms-clean-customers.md) is what keeps this second join from multiplying rows.

## Review checklist
- [ ] I can explain why validating after each join localizes errors.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Add a Dataset Output](16-add-a-dataset-output.md)
