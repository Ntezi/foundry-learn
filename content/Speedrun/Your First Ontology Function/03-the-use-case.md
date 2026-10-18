# 03 — The use case: connect a clinic metric to a decision

The course's hospital-billing scenario asks how effectively clinics collect the amounts they bill. It introduces **Days Sales Outstanding (DSO)** as the displayed measure, then later uses clinic-level results to support review and improvement goals.

The operational story is: inspect financial facts, calculate a measure, compare performance and decide where attention is needed. In this first half, the result is an overall metric card. The later per-clinic column and Action are separate stages.

## Understand the facts before interpreting the number

**Amount billed** is the amount recorded as billed for a reporting period. **Revenue collected** is the amount recorded as collected. Those monthly totals do not tell you which individual invoice was paid on which date.

The supplied algorithm groups monthly Financial records and counts backward through collected amounts, beginning with the newest month's billed total. It does not average observed invoice-by-invoice settlement delays. The phrase “days to collect payment” is business shorthand in the course, not proof that this dataset contains those individual durations.

Keep the metric owner involved when applying this outside training. A field name and a plausible result do not establish that the formula matches an organization's approved financial definition.

## An illustrative question from the customer

Suppose a manager sees 40.5 days and asks whether Clinic A needs intervention. Before answering, establish whether that card covers Clinic A or all clinics, what reporting months are available and whether the latest period is complete.

If the card covers all clinics, it may conceal variation between them. If one clinic has missing reports, comparisons may be distorted. If the latest month is still partial, the calculation may reflect an incomplete reporting window rather than a meaningful change in collection performance.

These are questions for interpretation, not conclusions about the actual supplied clinics.

## What your software background contributes

You already know that an API contract needs inputs, outputs and error behavior. A business metric needs the same discipline:

- Population: which clinics and Financial records contribute?
- Time basis: which months, in what format, and which are complete?
- Calculation: what does the algorithm actually do with billed and collected values?
- Missing-data behavior: does it report unknown, return a partial result or silently use zero?
- Consumer: what decision will a user make from the number?

This is requirements work as much as coding. The first implementation can be concise while the meaning behind it requires careful explanation.

## Why the Function is useful here

The calculation needs to query modeled facts, group them by period and walk the resulting history in a particular order. It is more specialized than displaying a stored property, and it can be reused for different scopes if those inputs are bound correctly.

**What to retain:** a metric is a contract between data, an algorithm and a decision. Validate all three; compiling TypeScript validates only part of the engineering.

**Check yourself:** would reproducing the course's reference value prove a clinic should be put under review? No. It is evidence about the example calculation, not a validated intervention policy or a conclusion about an individual clinic.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131541) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
