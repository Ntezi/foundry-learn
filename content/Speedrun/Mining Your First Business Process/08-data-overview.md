# 08 — Data Overview

*Module: Uploading the Data · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Inspect the data before trusting the diagram

The official walkthrough begins in Object Explorer. Find the installed Customer type, open its results and inspect a customer's properties and link to a Claim. Then open the Claim type and verify Claim Id and State. Inspect the state distribution; the source says approved, under investigation and rejected are common in its example. These are course observations, not counts verified in your installation.

If no objects appear immediately after installation, the source identifies unfinished indexing as a possible explanation. Allow initialization and inspect readiness before assuming the dataset is empty. Do not repeatedly install another copy as the first response.

Next open the claim logs dataset and inspect the three required columns: process-entity identifier, state entered and event timestamp. This is the evidence from which paths will be reconstructed.

## One claim, several events

A synthetic example makes the distinction concrete. All times below are explicitly UTC; these rows are teaching data, not the course dataset.

| claim_id | new_state | timestamp |
|---|---|---|
| C-101 | submitted | 2026-09-01 09:00 UTC |
| C-101 | under investigation | 2026-09-01 10:00 UTC |
| C-101 | approved | 2026-09-03 10:00 UTC |
| C-102 | submitted | 2026-09-01 09:00 UTC |
| C-102 | under investigation | 2026-09-01 10:00 UTC |

C-101's observed submitted visit lasts one hour before the next event. Its investigation visit lasts 48 hours before approval. C-102 has no recorded exit from investigation. At an explicitly chosen observation time of September 4 at 10:00 UTC, its current investigation age is 72 hours, assuming the logs and current object agree and no exit is missing.

The 48-hour completed visit and the 72-hour still-open age are different measurements. Do not replace the missing exit with zero duration, or exclude open claims without acknowledging that doing so can hide the oldest unresolved work. These are analytical lessons, not a claim about Machinery's exact built-in metric formula.

## Parse timestamps as meaning, not appearance

The course warns that the timestamp column may be parsed as DateTime rather than Timestamp. If that mismatch occurs in the supported dataset editor, use Update via → Edit Schema, select the timestamp column's type, choose Dates and times, select `yyyy-MM-dd'T'HH:mm:ss`, choose Timestamp, apply, then Save and validate.

This instruction is conditional: inspect the installed schema first. Do not change an already correct type or assume every package-backed dataset exposes the same editing route.

The shown format has no timezone offset. Converting a string into a Timestamp does not prove which timezone the source intended. During practice, verify the parser's interpretation and compare known raw values with parsed results. Do not silently assume that the literal `T` means UTC; it is a date/time separator in this format.

## Check the event contract

The following are supplemental data-quality checks:

- Claim IDs should identify the intended claims; unmatched log references need investigation.
- State labels should use a consistent vocabulary. Spelling, case or whitespace differences can fragment one business state.
- Timestamps should parse without unexpected nulls, shifts or loss of precision.
- Duplicate events and equal timestamps should be understood. Do not invent an event order when the data does not establish one.
- A claim's current state should be compared with its latest reliable log entry, accounting for freshness differences.

A required-column check is necessary but weaker than these semantic checks. A dataset can contain all three columns and still generate a misleading process.

**Review question:** why can a claim's latest state disagree with its latest log? Possible causes include late ingestion, missing events, direct edits, incorrect correlation or different update times. The mismatch is evidence to investigate, not something to overwrite automatically.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102643) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
