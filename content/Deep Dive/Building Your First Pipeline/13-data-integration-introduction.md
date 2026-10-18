# 13 — Introduction

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Integration, Joining, and Aggregations | 13/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874812) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Understand why joining cleaned sources creates more value than any one source alone.
- Know the module's three themes: **joins and aggregations**, **materializing outputs**, and **validating joins**.

## Key concepts
**[Course]** The goal is a **Customer Lifetime Value (CLV)** dataset. Clean data is a foundation, and it becomes more valuable once integrated, because that **breaks down silos**. The course warns about join pitfalls: **duplicates, wrong join conditions and computational cost**.

## Practical mental model
**[Explanation]** Before building, write down the **grain** (what one row means) of each input and of the output you want:

| Dataset | One row = |
|---|---|
| transactions | one purchase |
| products | one product **variation** (you'll find this out in lesson 17) |
| customers | one customer |
| **CLV output** | **one customer** |

A join shouldn't change the grain of the side you are enriching. An aggregation changes the grain on purpose, from transactions to customers. Most join bugs come from not knowing an input's real grain.

## Review checklist
- [ ] I can state the intended grain of each input and of the output.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Simple Joins: Join Transactions and Products](14-simple-joins.md)
