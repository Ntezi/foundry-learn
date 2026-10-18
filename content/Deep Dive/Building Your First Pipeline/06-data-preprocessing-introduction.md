# 06 — Introduction

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 06/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874630) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Understand why raw data needs cleaning before anything else uses it.
- Know the kinds of fixes Pipeline Builder's pre-built transforms handle.

## Key concepts
**[Course]** Raw data straight from a source is often inconsistent. Cleaning makes it **consistent, accurate and ready** for downstream work: operational insight and further integration. Pipeline Builder's pre-built Spark transforms cover common problems such as **type casting, file-format conversion and string formatting**. The techniques go beyond cleaning.

By the end of the module there is **one cleaning transform per raw dataset** (products, customers, transactions). Docs: [Pipeline Builder overview](https://www.palantir.com/docs/foundry/pipeline-builder/overview/).

## Practical mental model
**[Explanation]** Treat each "clean" node as a **contract boundary**: after it, the column types, names and nullability are what downstream consumers can rely on. That's why cleaning happens *per source, before joining*. A join on a mis-typed or whitespace-padded key fails quietly, producing no match rather than an error.

## Real-project relevance
**[Explanation]** On a team, "raw → clean" is often owned by whoever knows the source system best, and "clean → joined → Ontology" by whoever knows the business use case. Clean, predictable nodes let those people work independently.

## Review checklist
- [ ] I can explain why cleaning comes before joining, with a concrete failure example.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Download the Data Sources](07-download-the-data-sources.md)
