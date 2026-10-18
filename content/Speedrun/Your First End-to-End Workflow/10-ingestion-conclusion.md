# 10 — Ingestion conclusion: what is now true, and what is still unproven?

At this checkpoint, the intended result is three readable Foundry datasets. Their arrival mechanism may be manual upload or the optional Marketplace alternative. Transformation can now work with those resources.

The deeper lesson is an interface boundary. Once an input provides the agreed fields and meanings, downstream logic can be designed around that contract instead of knowing how the file arrived.

## Relate this to an adapter interface

Suppose a backend service consumes an `OrderSource` interface. One implementation reads fixtures and another calls a remote service. The consumer can reuse its processing logic if both implementations satisfy the same contract.

Similarly, a future managed ingestion route could feed equivalent datasets. But “equivalent” requires more than matching names. A column changing from a date to arbitrary text, an ID losing leading zeros, or the feed changing from full snapshots to update events would affect the downstream logic.

For example, a full snapshot might contain one current row per order. An event feed might contain three rows describing three changes to that same order. Simply substituting the event feed could triple apparent workload unless the pipeline first constructs the intended current state. This is an explanatory extension; the speedrun uses static files.

## Check the handoff

Before opening Pipeline Builder, you should be able to answer:

- Which two resources contain orders, and which is the customer reference?
- Can each resource be opened as rows and columns?
- Which fields carry order identity and source customer identity?
- When were the values obtained, and what would make them refresh?

These questions test availability, interpretation and freshness separately. “The dataset exists” answers only part of the handoff.

The local files contain 746 Office Goods rows, 746 Bureau rows and 59 customer-reference rows. Use those counts as a comparison point if importing these exact files. A discrepancy should lead to investigation of the selected input or parser; it should not be silently normalized away to force a preferred count.

## What has not happened yet

The two schemas still need alignment, customer information has not yet been attached to each order, and there is no built combined output. No Order object or operational application follows automatically from ingestion. There is also no refresh schedule in this exercise.

**Takeaway for your own work:** define an explicit input contract and inspect it before writing downstream logic. That reduces the chance of diagnosing a parsing or source-freshness problem as a UI problem later.

**Self-check:** if you replaced manual upload with a scheduled connector but preserved field names only, could you promise the same output? No. Types, record grain, identity and update semantics must also remain compatible.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790976) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
