# 01 — Course Introduction

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Learn the process from what was recorded

Machinery is Foundry's application for understanding and managing processes whose entities change state over time. This speedrun focuses on **process mining**: using existing records of those changes to reconstruct and inspect a process. It does not begin by designing a new workflow or asking an LLM to decide the next step.

The scenario is an insurance-claims operation with unresolved claims. You receive claims, customers and historical logs, connect them to the Ontology, and mine a process map. The later application module makes that map interactive and supports further investigation. The published course duration is 60–90 minutes; deeper understanding and verification may take longer.

## Translate it into familiar engineering concepts

A claims service might store its current status in a row and emit events when that status changes. The row answers “where is this claim now?” The events answer “how did it get here, and when?” Process mining depends on the second kind of information while connecting it to the identified claim.

A directed process map resembles a state-machine diagram: nodes represent states and arrows represent transitions. The important difference from a design document is where the structure comes from. A mined map describes patterns in the supplied logs. An authored state machine expresses a model you intentionally define. The observed path is not automatically the intended or permitted path.

This distinction protects you from treating every observed transition as acceptable business behavior. An unexpected arrow could represent a valid exception, a data-quality problem or an actual process deviation. Investigation is needed before deciding which.

## Why the Ontology is involved

The claim is the business entity passing through the process. Customer information supplies context. Logs record the claim's history. Connecting these through the Ontology lets an application move from an aggregate process view to the actual objects involved.

That is useful when a chart identifies a problem but a person must inspect specific work items to resolve it. A standalone count of delayed claims is less actionable than a count connected to the claims and their relevant context.

The official Machinery overview also describes broader authoring and AIP orchestration capabilities. Those capabilities do not mean this first-half exercise performs AI inference or configures automation. [Machinery overview](https://www.palantir.com/docs/foundry/machinery/overview/).

**What to remember:** mining builds a view from evidence. Its completeness and accuracy are limited by what was recorded, how it was correlated and how time was interpreted.

**Review question:** why is the current status column insufficient to explain a delay? Two claims can have the same current status while having different arrival times, earlier paths and repeated visits. The historical logs preserve distinctions that a current snapshot cannot.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102601) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
