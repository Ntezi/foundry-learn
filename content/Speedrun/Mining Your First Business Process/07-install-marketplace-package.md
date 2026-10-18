# 07 — Installing the Marketplace Package

*Module: Uploading the Data · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Install the foundation, then understand its contract

Open Marketplace from Applications. Use Search products, not Search stores, to find **Speedrun: Mining Your First Business Process**. Follow its installation prompts and save the resources in your course folder. The source recommends an installation suffix on the General page and an Ontology prefix on the Outputs page to distinguish copies.

The lesson delegates detailed installation prompts to a linked application deep-dive. Do not invent package-specific model inputs or settings from the previous agentic course. Inspect what this package actually requests during practice.

**Source correction:** the opening sentence mentions adding agentic functionality. The instructions here supply claims, customers and logs for process mining. Treat that sentence as apparent copied wording, not evidence of an LLM requirement. The earlier use-case page's manual-upload description is also broader than this actual Marketplace route.

## The three data roles

| Asset | Role | Required for this mining setup? |
|---|---|---|
| Claims | Identified business entities undergoing the process | Yes |
| Claim logs | Timestamped records of states entered by each claim | Yes |
| Customers | Related context for investigation | Helpful, not a mining prerequisite |

A Claim needs a unique identifier and a current-state property. Each log row needs the corresponding process-entity identifier, the state entered and the timestamp of entry.

The log's `claim_id` is a reference to the process entity, not necessarily a unique identifier for the log row itself. One claim normally has many transitions. Making `claim_id` alone the primary key of a hand-built log representation could collapse its history. Let the course's generated log setup handle its intended representation and inspect the actual generated identity later; the source does not prescribe a custom event-key algorithm.

## Why the current object and history coexist

The Claim object supports current operational context. The logs support sequence and elapsed-time analysis. If you repeatedly overwrite only the current state, you lose the history needed to explain how long a claim waited or whether it revisited a stage.

Customer data enriches the investigation but is not the case identifier. A customer may have multiple claims. Grouping events by customer instead of claim would mix distinct processes and create a misleading path.

## Installation is not data validation

After installation, inspect the expected assets and their locations. Confirm that you are using the intended prefixed types and logs dataset. A successful install does not prove that timestamps parsed as required, that log IDs resolve to claims or that objects have finished indexing.

A reusable package saves setup effort; it does not eliminate the need to understand the input contract. That understanding is what lets you apply the technique to your own service logs later.

**Review question:** why are customers optional but claim identifiers essential? Customer context enriches analysis. The claim identifier is what correlates separate log entries into the history of one entity, without which the process cannot be reconstructed meaningfully.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102640) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
