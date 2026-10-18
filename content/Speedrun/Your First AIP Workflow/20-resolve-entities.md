# 20 — Resolve Entities

## The lesson title is broader than its operation

Create **Deduplicate Entities** from Get Entities. Add **Select columns** to keep only `entityName`, then **Drop duplicates** using entityName as the deduplication basis. The result is a distinct-name catalogue for the future Entity object type.

This is useful, but it is not complete semantic entity resolution. The shown operations do not add case normalization, whitespace cleanup, alias matching, abbreviation expansion or disambiguation of different concepts with the same label. Do not infer those capabilities from the title Resolve Entities.

## Work through the distinction

If the occurrence rows contain Entity A once and Entity B in several chunks, selecting entityName and deduplicating produces one row for A and one for B. That is the intended reduction from occurrences to distinct keys.

Now imagine names `Example Institute` and `EI`. They might refer to the same organization, but the shown transformation has no alias mapping that establishes that equivalence. Conversely, the same short name can refer to different organizations. Deduplicating a name alone can merge mentions that a richer domain model would separate.

Use this example to distinguish three problems: repeated identical values, different labels for one concept, and one label for different concepts. The course directly addresses the first with a simple name-based representation.

## Why selecting columns comes first

Get Entities still has chunk context. Two occurrences of Entity B in different chunks can have different values in the other columns. Reducing to the intended entity key makes the desired catalogue grain explicit.

That does not mean the relationship context is unimportant. It survives on the original Get Entities branch, which will supply Join Table. The graph branches so one output can discard occurrence detail without destroying it for every other consumer.

This resembles creating a dimension table and a bridge table from the same staging records. As a software engineer, think about the contract of each table rather than trying to make one table serve every purpose.

## What to check later

Inspect null and blank names, inconsistent spelling and a few repeated names across chunks. Decide which findings are merely display issues and which change identity. If adding normalization later, apply a consistent mapping to both the Entities output and the join-table keys; changing only one side can create broken references.

The course's instructions contain no such canonicalization implementation. Preserve the walkthrough first and record any supplemental change clearly rather than silently claiming that entity resolution is solved.

**Remember:** distinct strings are not necessarily distinct real-world entities. Explain what the deduplication proves and what it leaves uncertain before trusting a graph built from these names.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962236) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
